import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import IconVector from 'react-native-vector-icons/AntDesign';
import {withNavigation} from 'react-navigation';
import GambarCustom from '../../components/atoms/GambarCustom';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import Tombol from '../../components/atoms/Tombol';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';

const ProoMengaji = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="transparent" />

      <GambarCustom
        resizeMode="cover"
        style={{width: '100%', height: 264}}
        source={require('../../assets/images/prooMengaji.png')}
      />
      <TopBarNew style={{position: 'absolute', top: 0}} />
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          marginBottom: 10,
          flexDirection: 'row',
        }}>
        <GambarCustom
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
          source={require('../../assets/figma/proo_mengaji.png')}
        />
        <View style={{marginLeft: 20}}>
          <TextJudul title="Proo Mengaji" />
          <TextBody title="(124 Review)" />
        </View>
      </View>
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <TextBody title="Lorem ipsum dulur ismet" />
      </View>
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <TextJudul title="Detail Proo Mengaji" />
        <View style={{flexDirection: 'row'}}>
          <TextBody title="1." />
          <TextBody
            style={{marginLeft: 10}}
            title="Lorem ipsum dulur ismet Lorem ipsum dulur ismet Lorem ipsum dulur ismet Lorem ipsum dulur ismet Lorem ipsum dulur ismet"
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextBody title="2." />
          <TextBody
            style={{marginLeft: 10}}
            title="Lorem ipsum dulur ismet Lorem ipsum dulur ismet Lorem ipsum dulur ismet Lorem ipsum dulur ismet Lorem ipsum dulur ismet"
          />
        </View>
      </View>
      <Tombol
        onPress={() => navigation.navigate('Progress')}
        title="Pesan Guru"
        primary
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
        }}
      />
    </View>
  );
};

export default withNavigation(ProoMengaji);
