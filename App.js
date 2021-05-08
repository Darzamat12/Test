import React from 'react';
import {View} from 'react-native';

import {AppRoot} from './src/routes/routes';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <AppRoot />
    </View>
  );
};

export default App;
