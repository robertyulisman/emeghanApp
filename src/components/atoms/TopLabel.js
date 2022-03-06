import React from 'react';
import {View, Text} from 'react-native';
import {Warna} from '../../utils/Data';

const TopLabel = ({title}) => {
  return (
    <View
      style={{
        backgroundColor: Warna.secondary.satu,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderBottomRightRadius: 8,
        alignSelf: 'flex-start',
      }}>
      <Text
        style={{
          fontSize: 12,
          color: Warna.putih,
          fontFamily: 'Nunito-Regular',
        }}>
        {title}
      </Text>
    </View>
  );
};

export default TopLabel;
