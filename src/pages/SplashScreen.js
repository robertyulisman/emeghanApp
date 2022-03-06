import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import GambarCustom from '../components/atoms/GambarCustom';
import GambarLogo from '../components/atoms/GambarLogo';
import {Warna} from '../utils/Data';
import {Flow} from 'react-native-animated-spinkit';
import TextJudul from '../components/atoms/TextJudul';
import TextHeading from '../components/atoms/TextHeading';

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Warna.primary.empat,
        justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <StatusBar translucent animated={true} backgroundColor="transparent" />
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{marginTop: 100, marginBottom: 20}}>
          <TextHeading title="e-meghan" />
        </View>
        <Flow size={48} color="#FFF"></Flow>
        <GambarCustom
          style={{
            width: '100%',
            height: 350,
          }}
          source={require('../assets/gambar/gambarSplashscreen.png')}
        />
        <Text style={{color: Warna.putih, fontFamily: 'Nunito-Regular'}}>
          Version 1.0
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
