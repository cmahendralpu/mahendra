import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const WorldClockScreen = () => {
  const url = 'http://worldtimeapi.org/api/timezone/';
  const [timezone, setTimeZone] = useState('');
  const [time, setTime] = useState('');
  const [timezoneList, setTimezoneList] = useState([]);

  // api call for retrive time
  const retrieveTime = () => {
    fetch(url + timezone, {
      method: 'GET',
      //Request Type
    })
      .then(response => response.json())
      //If response is in json then in success
      .then(responseJson => {
        //Success
        console.log(responseJson);
        setTime(JSON.stringify(responseJson));
      })
      //If response is not in json then in error
      .catch(error => {
        //Error
        console.error(error);
      });
  };

  // api call for get list of timzones
  useEffect(() => {
    fetch(url, {
      method: 'GET',
      //Request Type
    })
      .then(response => response.json())
      //If response is in json then in success
      .then(responseJson => {
        //Success
        console.log(responseJson);
        setTimezoneList(responseJson);
      })
      //If response is not in json then in error
      .catch(error => {
        //Error
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.metaDataContainer}>
        <View style={styles.metaDataContent}>
          <SelectDropdown
            data={timezoneList}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setTimeZone(selectedItem);
            }}
            defaultButtonText={'Select timzone '}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#444'}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            selectedRowStyle={styles.dropdown1SelectedRowStyle}
            search
            searchInputStyle={styles.dropdown1searchInputStyleStyle}
            searchPlaceHolder={'Search here'}
            searchPlaceHolderColor={'darkgrey'}
            renderSearchInputLeftIcon={() => {
              return <FontAwesome name={'search'} color={'#444'} size={18} />;
            }}
          />
        </View>
        {timezone && (
          <View style={styles.containerButton}>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                title="retrieve Internet Time"
                onPress={() => retrieveTime()}
              />
            </View>
          </View>
        )}
        {time && (
          <View style={styles.containerButton}>
            <View style={styles.buttonContainer}>
              <Text>{time}</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  dropdown1BtnStyle: {
    width: '90%',
    height: 50,
    margin: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1SelectedRowStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
  dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },

  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderRadius: 12,
  },
  dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2SelectedRowStyle: {backgroundColor: 'rgba(255,255,255,0.2)'},
  dropdown2searchInputStyleStyle: {
    backgroundColor: '#444',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },

  dropdown3BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {backgroundColor: 'slategray'},
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3searchInputStyleStyle: {
    backgroundColor: 'slategray',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  buttonContainer: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default WorldClockScreen;
