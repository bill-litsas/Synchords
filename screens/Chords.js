import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import DraggableChords from '../components/DraggableChords';

const fullWidth = Dimensions.get('window').width;
const lyricsTextScale = 30;

export default class Chords extends Component {
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Title</Text>

        <View style={styles.chordLine}>
          <DraggableChords
            posX={0}
            chord="Am"
          />
          <DraggableChords
            posX={67}
            chord="E"
          />
        </View>
        <Text size="30" bold style={styles.lyrics}>Απάνω μου έχω πάντοτε στη ζώνη μου σφιγμένο</Text>
        <View style={styles.chordLine}>
          <DraggableChords
            posX={0}
            chord="E"
          />
        </View>
        <Text style={styles.lyrics}>ένα μικρό αφρικάνικο, ατσάλινο μαχαίρι</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 5
  },
  lyrics: {
    fontSize: Math.round(fullWidth / lyricsTextScale),
    backgroundColor: 'yellow'
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    textAlign: 'center',
    width: '100%'
  },
  chordLine: {
    marginTop: 5,
    backgroundColor: '#d2dbea',
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'column'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
