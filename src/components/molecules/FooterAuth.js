import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Warna} from '../../utils/Data';

const FooterAuth = ({leftText, rightText, onPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 20,
      }}>
      <Text
        style={{
          fontSize: 14,
          color: Warna.grayscale.satu,
          fontFamily: 'Nunito-Regular',
        }}>
        {leftText}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={{
            fontSize: 15,
            color: Warna.primary.satu,
            fontWeight: 'bold',
            marginLeft: 5,
          }}>
          {rightText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterAuth;
