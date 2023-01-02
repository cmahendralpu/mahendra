// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
//Import basic react native components
import moment from 'moment';
import Countdown from './Countdown';

const CountdownItem = props => {
  const {removeItem, item, addItem} = props;
  const {key} = item;
  const initialCountdownSettings = {
    timeValue: '',
    dateValue: '',
    unixEndDate: '',
  };
  const initialCountdownTimer = {
    hours: '',
    minutes: '',
    seconds: '',
  };

  const [countdownSettings, setCountdownSettings] = useState({
    ...initialCountdownSettings,
  });
  const [countdownTimer, setCountdownTimer] = useState({
    ...initialCountdownTimer,
  });
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const [countdownInfoMessage, setCountdownInfoMessage] = useState('');

  const onStartTimer = key => {
    let unixEndDate;

    const dateValue = date.trim();
    let timeValue = time.trim();

    if (!moment(dateValue, 'MM-DD-YYYY', true).isValid()) {
      Alert.alert('Date input must be a valid date set in MM-DD-YYYY format.');
    } else if (
      timeValue &&
      timeValue === '' &&
      !moment(timeValue, 'HH:mm', true).isValid()
    ) {
      Alert.alert(
        'Time input must be valid according to the clock set in HH:mm format.',
      );
    } else {
      unixEndDate = Number(
        moment(`${dateValue} ${timeValue}`, 'MM-DD-YYYY hh:mm').format('X'),
      );
      if (unixEndDate - moment().format('X') < 1) {
        Alert.alert('The countdown date must be set to a future date.');
      } else {
        addItem(key);

        setCountdownSettings(prevCountdownSettings => {
          return {
            ...prevCountdownSettings,
            dateValue,
            timeValue,
            unixEndDate,
          };
        });
      }
    }
  };
  useEffect(() => {
    let timer = null;

    if (countdownSettings.unixEndDate) {
      timer = setInterval(() => playTimer(countdownSettings.unixEndDate), 1000);
    }

    return () => {
      clearInterval(timer);
      timer = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdownSettings.unixEndDate]);

  function playTimer(currentUnixEndDate) {
    const distance = currentUnixEndDate - moment().format('X');

    if (distance > 0) {
      setCountdownTimer(prevCountdownTimer => {
        return {
          ...prevCountdownTimer,
          days: parseInt(distance / (60 * 60 * 24), 10),
          hours: parseInt((distance % (60 * 60 * 24)) / (60 * 60), 10),
          mins: parseInt((distance % (60 * 60)) / 60, 10),
          secs: parseInt(distance % 60, 10),
        };
      });
      setCountdownInfoMessage('');
    } else {
      setCountdownInfoMessage(
        'Countdown ended. Click the button to start a new countdown.',
      );
      setCountdownSettings({...initialCountdownSettings});
      setCountdownTimer({...initialCountdownTimer});
    }
  }

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.metaDataContainer}>
        {!item.timer ? (
          <View style={styles.metaDataContent}>
            <View style={styles.containerTime}>
              <TextInput
                style={styles.textInput}
                placeholder="MM-DD-YYYY"
                maxLength={15}
                returnKeyType="next"
                keyboardType="numeric"
                onChangeText={text => setDate(text)}
              />

              <TextInput
                style={styles.textInput}
                placeholder="HH:mm"
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={text => setTime(text)}
              />
            </View>
          </View>
        ) : (
          <Countdown
            countdownTimer={countdownTimer}
            unixEndDate={countdownSettings.unixEndDate}
            countdownInfoMessage={countdownInfoMessage}
          />
        )}

        <View style={styles.containerButton}>
          {!item.timer ? (
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                title="Start"
                onPress={() => onStartTimer(key)}
              />
            </View>
          ) : (
            <View style={styles.buttonContainerRemove}>
              <Button
                style={styles.button}
                // Some properties given to Button
                title="Remove"
                onPress={() => removeItem(key)}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default CountdownItem;

const styles = StyleSheet.create({
  container: {
    height: 100,
    elevation: 1,
    borderColor: 'gray',
    borderRadius: 2,
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  containerTime: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  metaDataContainer: {
    flex: 2,
  },
  textInput: {
    height: 35,
    fontSize: 14,
  },

  containerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonContainerRemove: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  thumbnail: {
    width: 70,
    height: 70,
  },
  button: {
    width: 50,
    height: 50,
  },
  metaDataContent: {
    marginTop: 5,
    marginLeft: 15,
  },
});
