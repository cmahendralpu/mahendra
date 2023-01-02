import React, {useState} from 'react';
import {SafeAreaView, ScrollView, FlatList} from 'react-native';
import CountdownItem from './CountdownItem';

const TimerScreen = () => {
  // useState for set list data with intial start counter
  const [dataSource, setDataSource] = useState([
    {
      key: 0,
      timer: false,
    },
  ]);
  // add countdown timer to list
  const addItem = (() => {
    let key = dataSource.length;
    return () => {
      dataSource.unshift({
        key,
        timer: true,
      });
      setDataSource(dataSource.slice(0));
      key++;
    };
  })();

  // remove countdown timer from list

  const removeItem = key => {
    setDataSource(dataSource.slice().filter(item => item.key !== key));
  };

  // itemview for countdown timer list
  const ItemView = ({item, index}) => {
    console.log(index);
    return (
      // Flat List Item
      <CountdownItem item={item} removeItem={removeItem} addItem={addItem} />
    );
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
          inverted
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TimerScreen;
