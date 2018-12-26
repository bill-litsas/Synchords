import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder
} from 'react-native';

export default class Chord extends Component {
  constructor() {
    super();
    this.state = {
      valX: 0
    };
  }

  componentWillMount() {
    this.animatedValue = new Animated.ValueXY();
    this._value = { x: 0, y: 0 }
    this.animatedValue.addListener((value) => {
      this._value = value, this.setState({ valX: Math.round(this._value.x) })
    });
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.animatedValue.setOffset({
          x: this._value.x,
          y: this._value.y,
        })
        this.animatedValue.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.animatedValue.x, dy: 0 }
      ]),
      onPanResponderRelease: (e, gestureState) => {
        this.animatedValue.flattenOffset();
      },
    })
  }

  render() {
    const animatedStyle = {
      transform: this.animatedValue.getTranslateTransform()
    }
    console.log(animatedStyle)
    return (
      <Animated.View style={[styles.box, animatedStyle]} {...this.panResponder.panHandlers}>
        <Text style={styles.text}>C#m</Text>
        <Text style={styles.text}>X : {this.state.valX}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: 80,
    height: 80,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFF",
  }
});