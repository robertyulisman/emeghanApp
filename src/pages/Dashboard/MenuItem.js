import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import GambarCustom from '../../components/atoms/GambarCustom';
import {Warna} from '../../utils/Data';

const MenuItem = ({title, source, onPress, style}) => {
  return (
    <View style={[{flex: 1, alignItems: 'center'}, style]}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: 50,
          height: 50,
          borderRadius: 40,
        }}>
        <GambarCustom style={{width: 50, height: 50}} source={source} />
      </TouchableOpacity>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 14,
          color: Warna.grayscale.satu,
          marginTop: 10,
          fontFamily: 'Nunito-Regular',
        }}>
        {title}
      </Text>
    </View>
  );
};

export default MenuItem;
