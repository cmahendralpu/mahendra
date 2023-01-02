/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import React from 'react';

const Countdown = ({countdownTimer, unixEndDate, countdownInfoMessage}) => {
  console.log(countdownTimer);
  return (
    <View style={styles.containerButton}>
      <View style={styles.containerTime}>
        <Text style={styles.countdownValue}>
          {countdownTimer.days} Days : {countdownTimer.hours} Hours :{' '}
          {countdownTimer.mins} Min : {countdownTimer.secs} Sec
        </Text>

        <Text style={styles.countdownValue}>
          Counting down on{' '}
          {moment.unix(unixEndDate).format('dddd, MMM Do, YYYY | h:mm A')}
        </Text>
      </View>
    </View>
  );
};

export default Countdown;

const styles = StyleSheet.create({
  containerButton: {
    flex: 1,
  },
  containerTime: {
    flex: 1,
    margin: 7,
    paddingBottom: 5,
    flexDirection: 'column',
  },
  countdownValue: {
    fontSize: 14,
    fontStyle: 'bold',
    marginBottom: 5,
  },
  countdownUnit: {
    textTransform: 'capitalize',
  },
});
