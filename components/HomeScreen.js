import React from 'react';
import {Button, StyleSheet, TouchableOpacity, View} from 'react-native';
// navigate to countdown screen and world clock screen
const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.containerButton}>
      <TouchableOpacity style={styles.buttonContainer}>
        <Button
          title="Go to Countdown Timers"
          onPress={() => navigation.push('CountDown')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer2}>
        <Button
          title="Go to World Clock"
          onPress={() => navigation.push('WorldClcok')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginLeft: 30,
    marginRight: 30,
  },
  buttonContainer2: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
});

export default HomeScreen;
