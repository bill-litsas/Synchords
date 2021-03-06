import React, { Component } from 'react';
import firebase from 'react-native-firebase'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import DraggableChords from '../components/DraggableChords';

const fullWidth = Dimensions.get('window').width;
const lyricsTextScale = 30;

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
    const songId = navigation.getParam('songId');
    this.getSongDetails(songId);
  }

  getSongDetails(songId) {
    const docRef = firebase.firestore().collection('tabs').doc(songId);
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
              else if (item.type === 'chords') {
                const chords = [];
                {
                  item.chords.map((chord, index) => {
                    chords.push(
                      <DraggableChords
                        key={index}
                        posX={chord.position}
                        chord={chord.chord_name}
                      />
                    );
                  })
                }
                return <View style={styles.chordLine}>{chords}</View>
              }
              else if (item.type === 'lyrics') {
                return <Text style={styles.lyricsLine}>{item.lyrics}</Text>
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
  },
  lyricsLine: {
    fontSize: Math.round(fullWidth / lyricsTextScale),
    backgroundColor: 'yellow'
  },
  chordLine: {
    marginTop: 5,
    backgroundColor: '#d2dbea',
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'column'
  }
});
