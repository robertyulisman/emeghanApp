import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import GambarCustom from '../components/atoms/GambarCustom';
import GambarLogo from '../components/atoms/GambarLogo';
import {Warna} from '../utils/Data';
import {ToastDefault} from '../utils/Fungsi';
import {withNavigation} from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IntroPage = ({navigation}) => {
  const slides = [
    {
      key: 1,
      title: 'Online Shop',
      text: 'dapatkan berbagai kemudahan dalam membeli produk ataupun kebutuha harianmu dalam 1 aplikasi',
      image: require('../assets/gambar/intro1.png'),
    },
    {
      key: 2,
      title: 'Futsal Booking',
      text: 'kamu akan menjadi lebih mudah dalam mencari dan melakukan booking lapangan futsal',
      image: require('../assets/gambar/intro2.png'),
    },
    {
      key: 3,
      title: 'Reservasi Hotel',
      text: 'gak usah bingung untuk mencari penginapan, kami juga melayani booking kamar hotel juga kok, kamu bisa memilih tipe kamar dari apa yang tersedia di aplikasi kami',
      image: require('../assets/gambar/intro3.png'),
    },
  ];

  const _renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Warna.grayscale.lima,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <StatusBar
          barStyle="dark-content"
          animated={true}
          translucent
          backgroundColor="transparent"
        />
        <View
          style={{
            flex: 1,
            backgroundColor: Warna.grayscale.lima,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <GambarCustom source={item.image} style={{width: 300, height: 300}} />
          <Text
            style={{
              color: Warna.grayscale.satu,
              fontSize: 24,
              fontFamily: 'Nunito-ExtraBold',
              marginVertical: 10,
              marginHorizontal: 20,
              textAlign: 'center',
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              color: Warna.grayscale.satu,
              fontSize: 16,
              textAlign: 'center',
              marginHorizontal: 40,
              fontFamily: 'Nunito-Regular',
            }}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  const _onDone = async () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    // this.setState({showRealApp: true});
    const token = '1hjfghvibfirirugeb';
    await AsyncStorage.setItem('intro', token);
    navigation.navigate('DaftarMenu');
  };

  const _renderNextButton = () => {
    return (
      <View
        style={{
          // backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}>
        <Text style={{fontSize: 16, color: Warna.primary.satu}}>
          Berikutnya
        </Text>
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View
        style={{
          // backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}>
        <Text style={{fontSize: 16, color: Warna.primary.satu}}>Daftar</Text>
      </View>
    );
  };
  const _renderPrevButton = () => {
    return (
      <View
        style={{
          // backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}>
        <Text style={{fontSize: 16, color: Warna.grayscale.tiga}}>Kembali</Text>
      </View>
    );
  };
  const _renderSkipButton = () => {
    return (
      <View
        style={{
          // backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}>
        <Text style={{fontSize: 16, color: Warna.grayscale.tiga}}>Skip</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      doneLabel="Daftar"
      renderItem={_renderItem}
      data={slides}
      onDone={_onDone}
      activeDotStyle={{backgroundColor: Warna.primary.satu}}
      renderNextButton={_renderNextButton}
      renderPrevButton={_renderPrevButton}
      renderSkipButton={_renderSkipButton}
      renderDoneButton={_renderDoneButton}
      showSkipButton
      showPrevButton
    />
  );
};

export default withNavigation(IntroPage);
