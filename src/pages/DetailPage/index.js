import React from 'react';
import {View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import GambarCustom from '../../components/atoms/GambarCustom';
import TextBody from '../../components/atoms/TextBody';
import TextHeading from '../../components/atoms/TextHeading';
import TextJudul from '../../components/atoms/TextJudul';
import Tombol from '../../components/atoms/Tombol';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';

const DetailPage = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <TopBarNew
        title="Detail Transaksi"
        onPress={() => navigation.navigate('Dashboard')}
      />
      {/* <View style={{zIndex: 999}}>
       
      </View> */}
      <View
        style={{
          margin: 20,
          alignItems: 'center',
          // justifyContent: 'center',
          marginTop: 50,
          // flex: 1,
        }}>
        <View
          style={{
            // zIndex: 999,
            backgroundColor: Warna.grayscale.lima,
            borderRadius: 20,
            width: '100%',
            padding: 20,
            // alignItems: 'center',
            marginTop: 40,
            shadowColor: Warna.grayscale.tiga,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            // zIndex: 9,

            elevation: 7,
          }}>
          <GambarCustom
            style={{width: 96, height: 96, alignSelf: 'center', marginTop: -60}}
            source={require('../../assets/icon/sukses.png')}
          />
          <TextJudul
            style={{marginTop: 20, textAlign: 'center'}}
            title="Transaksi Berhasil"
          />
          <TextBody
            style={{textAlign: 'center'}}
            title="Terima kasih, Pesanan kamu Berhasil"
          />
          <Tombol
            title="Kembali Ke Dashboard"
            secondary
            style={{marginTop: 20, borderWidth: 0}}
            onPress={() => navigation.navigate('Dashboard')}
          />
        </View>
      </View>

      {/* <Tombol
        title="Lihat Detail Transaksi"
        secondary
        style={{marginHorizontal: 20, marginBottom: 20}}
      /> */}
    </View>
  );
};

export default withNavigation(DetailPage);
