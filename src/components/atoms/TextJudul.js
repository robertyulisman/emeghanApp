import React from 'react';
import {View, Text} from 'react-native';

const TextJudul = ({title, style}) => {
  return (
    <Text
      style={[
        {fontSize: 16, fontFamily: 'Nunito-ExtraBold', lineHeight: 24},
        style,
      ]}>
      {title}
    </Text>
  );
};

export default TextJudul;
