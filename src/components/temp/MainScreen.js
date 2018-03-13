import React from 'react';
import { StyleSheet, View , Button} from 'react-native';

import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const MainScreen = () => (
  <View style={styles.container}>
    <LoginStatusMessage />
    <AuthButton />
  </View>
);

MainScreen.navigationOptions = {
  title: 'Home Screen',
  headerLeft: <Button
    onPress={() => navigation.dispatch({ type: 'Login' })}
    title="Log in"
  />
};

export default MainScreen;
