import React from 'react';
import {SafeAreaView} from 'react-native';

import {AppRoot} from './src/routes/routes';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppRoot />
    </SafeAreaView>
  );
};

export default App;
