import React, { Component } from 'react';
import firebase from 'react-native-firebase'
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default class SongViewEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songTitle: '',
      linesRender: []
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const songTitle = navigation.getParam('songTitle', 'Untitled');
    // this.setState({ songTitle })

    this.getSongDetails()

  }

  getSongDetails() {
    const docRef = firebase.firestore().collection('tabs').doc('2tQQOXTctNcCV9usGqHV');
    const thisClass = this;

    docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        const { title } = doc.data();
        thisClass.setState({ songTitle: title })
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    const linesRef = firebase.firestore().collection('tabs').doc('2tQQOXTctNcCV9usGqHV').collection('lines');

    let linesRender = [];

    linesRef.get().then(snapshot => {
      const values = snapshot.docs.map(this.flattenDoc);
      console.log(values);
      values.sort((a, b) => {
        return a.position - b.position;
      });
      thisClass.setState({ linesRender: values })
    })

    // linesRef.get().then(function (doc) {
    //   if (doc.exists) {
    //     console.log("Line data:", doc.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // }).catch(function (error) {
    //   console.log("Error getting document:", error);
    // });
  }

  flattenDoc(doc) {
    return { key: doc.id, ...doc.data() };
  }


  render() {

    return (
      <View style={styles.container}>

        <Text
          style={styles.tabTitle}
        >
          {this.state.songTitle}
        </Text>

        <FlatList
          data={this.state.linesRender}
          renderItem={
            ({ item }) => {
              if (item.type === 'blank') {
                return <View style={styles.blankLine} />
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
  tabTitle: {
    fontSize: 45,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    color: '#222'
  },
  blankLine: {
    height: 40,
    backgroundColor: '#eee',
    borderBottomColor: '#000',
    borderBottomWidth: 1
  }
});
