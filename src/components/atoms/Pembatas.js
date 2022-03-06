import React from 'react';
import {View, Text} from 'react-native';
import {Warna} from '../../utils/Data';

const Pembatas = ({style}) => {
  return (
    <View
      style={[
        {
          width: '100%',
          height: 10,
          backgroundColor: Warna.grayscale.empat,
        },
        style,
      ]}
    />
  );
};

export default Pembatas;
