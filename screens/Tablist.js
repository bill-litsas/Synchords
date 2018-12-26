import React, { Component } from 'react';
import { Dimensions, Button, StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase'

export default class Tablist extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Tablist',
      headerRight: (
        <Text
          onPress={() => navigation.navigate('TabCreation')}
          style={{ marginRight: 10, fontSize: 16 }}
        >Add tab</Text>
      )
    };
  };

  componentDidMount() {
    const serverTime = firebase.database().getServerTime();
    alert(serverTime);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Tablist</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
