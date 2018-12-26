import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import Tablist from './screens/Tablist'
import Chords from './screens/Chords'
import TabCreation from './screens/TabCreation'

// create our app's navigation stack
const App = createStackNavigator(
  {
    Tablist,
    Chords,
    TabCreation
  },
  {
    initialRouteName: 'Tablist'
  }
)

export default createAppContainer(App)