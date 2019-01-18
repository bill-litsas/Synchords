import React, { Component } from 'react';
import { FlatList, Dimensions, Button, StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase'

export default class Tablist extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('tabs');
    this.unsubscribe = null;
    this.state = {
      textInput: '',
      loading: true,
      tabs: [],
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Songlist',
      headerRight: (
        <Text
          onPress={() => navigation.navigate('TabCreation')}
          style={{ marginRight: 10, fontSize: 16 }}
        >Add song</Text>
      )
    };
  };

  componentDidMount() {
    // this.ref.add({
    //   title: 'Trooper'
    // });

    this.getTabs();

    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const tabs = [];
    querySnapshot.forEach((doc) => {
      const { title } = doc.data();
      tabs.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title
      });
    });
    this.setState({
      tabs,
      loading: false
    });
  }

  getTabs = () => {
    const tabs = [];

    this.ref.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        snapshot.forEach(doc => {
          const { title } = doc.data();
          tabs.push({
            key: doc.id,
            title
          })

        });

        this.setState({ tabs })

      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

  }

  goToSong = (title, songId) => {
    this.props.navigation.navigate('SongViewEdit', {
      songTitle: title,
      songId
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <FlatList
          data={this.state.tabs}
          renderItem={({ item }) => {
            if (1) {
              return <Text
                style={styles.lyricSong}
                key={item.key}
                onPress={() => this.goToSong(item.title, item.key)}
              >
                {item.title}
              </Text>
            }
          }
          }

        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  lyricSong: {
    padding: 10,
    paddingVertical: 20,
    fontSize: 24,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2
  }
});
