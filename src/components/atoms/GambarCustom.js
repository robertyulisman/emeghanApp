import React from 'react';
import {View, Image} from 'react-native';
import {Warna} from '../../utils/Data';

const GambarCustom = ({source, style, resizeMode}) => {
  return (
    <View
      style={[
        {
          overflow: 'hidden',
        },
        style,
      ]}>
      <Image
        style={{
          resizeMode: resizeMode ? resizeMode : 'contain',
          flex: 1,
          width: undefined,
          height: undefined,
        }}
        source={source}
      />
    </View>
  );
};

export default GambarCustom;
