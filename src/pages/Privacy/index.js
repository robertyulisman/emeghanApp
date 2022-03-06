import React from 'react';
import {View, Text, ScrollView, StatusBar} from 'react-native';
import GambarCustom from '../../components/atoms/GambarCustom';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';

const Privacy = () => {
  return (
    <ScrollView style={{backgroundColor: Warna.grayscale.lima, flex: 1}}>
      <StatusBar
        backgroundColor={Warna.primary.satu}
        barStyle="light-content"
      />
      <TopBarNew title="Privacy Policy" />

      <View
        style={{
          margin: 10,
        }}>
        <View style={{alignItems: 'flex-start'}}>
          <GambarCustom
            style={{height: 300, width: '100%'}}
            source={require('../../../src/assets/gambar/role.png')}
          />
          <View style={{margin: 20}}>
            <TextJudul title="Kebijakan Privasi" />
            <TextBody
              style={{marginTop: 20}}
              title="Kebijakan privasi e-meghan"
            />
            <TextBody
              style={{marginTop: 20}}
              title="Kebijakan privasi e-meghan"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Privacy;
