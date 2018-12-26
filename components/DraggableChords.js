import React, { Component } from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { createResponder } from 'react-native-gesture-responder'


const fullWidth = Dimensions.get('window').width;
const chordWidth = (fullWidth * 15) / 100;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    height: '100%',
    width: '100%',
    position: 'relative'
  },
  draggable: {
    height: 50,
    width: chordWidth,
    position: 'absolute'
  },
  chordBlock: {
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  }
})


export default class DraggableChords extends Component {
  constructor(props) {
    super(props)

    this.state = {
      x: new Animated.Value((fullWidth * this.props.posX) / 100),
      y: new Animated.Value(0),
    }

  }
  componentWillMount() {
    this.Responder = createResponder({
      onStartShouldSetResponder: () => true,
      onStartShouldSetResponderCapture: () => true,
      onMoveShouldSetResponder: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onResponderMove: (evt, gestureState) => {
        this.pan(gestureState)
      },
      onPanResponderTerminationRequest: () => true,
    })
  }
  pan = (gestureState) => {
    const { x, y } = this.state
    const maxX = fullWidth - chordWidth
    const minX = 0
    const maxY = 0
    const minY = 0

    const xDiff = gestureState.moveX - gestureState.previousMoveX
    const yDiff = gestureState.moveY - gestureState.previousMoveY
    let newX = x._value + xDiff
    let newY = y._value + yDiff

    if (newX < minX) {
      newX = minX
    } else if (newX > maxX) {
      newX = maxX
    }

    if (newY < minY) {
      newY = minY
    } else if (newY > maxY) {
      newY = maxY
    }

    this.setState({ posX: Math.round((newX * 100) / fullWidth) })

    x.setValue(newX)
    y.setValue(newY)
  }

  componentDidMount() {
    this.setState({ posX: this.props.posX });
  }

  render() {
    const {
      x, y,
    } = this.state
    const imageStyle = { left: x, top: y }

    return (

      <Animated.View
        {...this.Responder}
        style={[styles.draggable, imageStyle, styles.chordBlock]}
      >
        <Text style={styles.text}>X : {this.state.posX}%</Text>
        <Text style={styles.text}>{this.props.chord}</Text>
      </Animated.View>


    )
  }
}

DraggableChords.propTypes = {
  chord: PropTypes.string.isRequired,
  posX: PropTypes.number.isRequired
}