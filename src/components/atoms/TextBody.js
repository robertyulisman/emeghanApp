import React from 'react';
import {View, Text} from 'react-native';
import {Warna} from '../../utils/Data';

const TextBody = ({title, style}) => {
  return (
    <Text
      style={[
        {
          fontSize: 14,
          color: Warna.grayscale.dua,
          lineHeight: 24,
          fontFamily: 'Nunito-Regular',
        },
        style,
      ]}>
      {title}
    </Text>
  );
};

export default TextBody;
