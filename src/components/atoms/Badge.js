import React from 'react';
import {View, Text} from 'react-native';
import {Warna} from '../../utils/Data';

const Badge = ({title, top, right}) => {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: Warna.merah,
        height: 18,
        width: 18,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        top: top,
        right: right,
        zIndex: 999,
      }}>
      <Text style={{color: Warna.putih, fontSize: 10}}>{title}</Text>
    </View>
  );
};

export default Badge;
