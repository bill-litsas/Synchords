import React, { Component } from 'react';
import { BackHandler } from "react-native";
import { Dimensions, Button, TextInput, StyleSheet, Text, View } from 'react-native';

export default class TabCreation extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );

    this.state = {
      canSave: false,
      tabTitle: 'Title'
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Text
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10, fontSize: 16 }}
        >Exit</Text>
      ),
      headerRight: (
        <Text
          onPress={() => alert('Saved Tab')}
          style={{ marginRight: 10, fontSize: 16 }}
        >Save</Text>
      )
    };
  };

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  onBackButtonPressAndroid = () => {
    if (this.state.canSave) {
      return true; // don't go back
    } else {
      return false;
    }
  };

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
            onSubmitEditing={() => this.setState({ enteringTitle: false })}
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
  }
});
