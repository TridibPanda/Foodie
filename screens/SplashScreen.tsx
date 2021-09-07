import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { local } from '../store/actions/Auth';
import { latestRecipes } from '../store/actions/Recipes';

const DefaultScreen = () => {

  const dispatch = useDispatch();
  const [data, setData] = useState<any>('F');

  useEffect(() => {
    dispatch(latestRecipes());
    var array = ['FO', 'FOO', 'FOOD', 'FOODI', 'FOODIE'];
    var i = 0;
    var settime = setInterval(() => {
      setData(array[i]);
      i += 1;
    }, 500);

    setTimeout(() => {
      dispatch(local());
      clearInterval(settime);
    }, 3000);
  }, [])

  return (
    <View style={styles.screen}>
      <Text style={styles.textcontainer}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  textcontainer: {
    color: "#000",
    fontSize: 70,
  }
});

export default DefaultScreen;