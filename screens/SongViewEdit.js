import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SongViewEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songTitle: ''
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const songTitle = navigation.getParam('songTitle', 'Untitled');
    this.setState({ songTitle })
  }


  render() {



    return (
      <View style={styles.container}>

        <Text
          style={styles.tabTitle}
        >
          {this.state.songTitle}
        </Text>

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
