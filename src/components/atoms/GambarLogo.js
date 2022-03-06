import React from 'react';
import {View, Image} from 'react-native';

const GambarLogo = ({hitam, kecil}) => {
  return (
    <View
      style={{
        height: kecil ? 32 : 50,
        width: kecil ? 78 : 100,
        marginTop: kecil ? 10 : 20,
      }}>
      <Image
        style={{
          resizeMode: 'contain',
          flex: 1,
          width: undefined,
          height: undefined,
        }}
        source={
          hitam
            ? require('../../../src/assets/images/logoHitam.png')
            : require('../../../src/assets/images/logoPutih.png')
        }
      />
    </View>
  );
};

export default GambarLogo;
