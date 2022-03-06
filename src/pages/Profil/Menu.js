import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import GambarCustom from '../../components/atoms/GambarCustom';
import TextBody from '../../components/atoms/TextBody';
import {Warna} from '../../utils/Data';

const Menu = ({iconLeft, title, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
      }}>
      <GambarCustom style={{width: 22, height: 22}} source={iconLeft} />
      <View style={{flex: 1, marginLeft: 20}}>
        <TextBody title={title} />
      </View>
      <GambarCustom
        style={{width: 13, height: 13}}
        source={require('../../assets/icon/rightArrow.png')}
      />
    </TouchableOpacity>
  );
};

export default Menu;
