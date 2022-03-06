import React from 'react';
import {View, Text} from 'react-native';
import {Warna} from '../../utils/Data';

const TextCustom = ({big, title, style, center}) => {
  return (
    <Text
      style={[
        {
          fontSize: big ? 16 : 14,
          color: Warna.biruMuda,
          textAlign: center && 'center',
          fontFamily: 'Nunito-Regular',
        },
        style,
      ]}>
      {title}
    </Text>
  );
};

export default TextCustom;
