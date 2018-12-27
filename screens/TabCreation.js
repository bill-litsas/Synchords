import React, { Component } from 'react';
import { BackHandler } from "react-native";
import { Dimensions, Button, TextInput, StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase'

export default class TabCreation extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this.tabsRef = firebase.firestore().collection('tabs');
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );

    this.state = {
      canSave: false,
      tabTitle: 'Title'
    }

  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerLeft: (
        <Text
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10, fontSize: 16 }}
        >Exit</Text>
      ),
      headerRight: (
        <Text
          onPress={params.handleSave}
          style={{
            marginRight: 10,
            fontSize: 16,
            color: params.canSave ? '#222' : '#ccc'
          }}
        >Save</Text>
      )
    };
  };

  componentWillMount() {
    this._setNavigationParams();
  }

  _setNavigationParams() {
    this.props.navigation.setParams({
      canSave: this.state.canSave
    });
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
    this.props.navigation.setParams({ handleSave: this.saveTab });
  }

  onBackButtonPressAndroid = () => {
    if (this.state.canSave) {
      return true; // don't go back
    } else {
      return false;
    }
  };

  submitEditTitle = () => {
    this.setState(
      {
        enteringTitle: false,
        canSave: true
      },
      () => { this._setNavigationParams(); }
    )
  }

  saveTab = () => {
    if (this.state.canSave) {
      this.tabsRef.add({
        title: this.state.tabTitle
      });
      alert('Tab Saved!')
    }
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.enteringTitle ?
          <TextInput
            autoFocus={true}
            style={styles.tabTitle}
            onChangeText={(text) => this.setState({ tabTitle: text })}
            onSubmitEditing={() => this.submitEditTitle()}
            value={this.state.tabTitle}
          />
          :
          <Text
            style={styles.tabTitle}
            onPress={() => this.setState({ enteringTitle: true })}
          >
            {this.state.tabTitle}
          </Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabTitle: {
    fontSize: 45,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    color: '#222'
  },
  activeTextColor: {

  }
});
