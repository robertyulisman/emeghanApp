import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';
import GambarCustom from '../../components/atoms/GambarCustom';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import Tombol from '../../components/atoms/Tombol';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';
import {formatNumber} from '../../utils/Fungsi';

const DetailHotel = ({navigation}) => {
  const {data} = navigation.state.params;
  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <TopBarNew title="Detail Kamar" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 20, marginTop: 20, flex: 1}}>
        <GambarCustom
          resizeMode="cover"
          style={{width: '100%', height: 250, borderRadius: 20}}
          source={{uri: data.gambar}}
        />
        <TextJudul style={{marginTop: 10}} title={data.nama} />
        <TextBody title={`Rating ${data.rating}`} />
        <TextJudul style={{marginTop: 10}} title="Lokasi" />
        <TextBody title={`Rating ${data.lokasi}`} />
        <TextJudul style={{marginTop: 10}} title="Fasilitas" />
        <View style={{flexDirection: 'row'}}>
          {data.fasilitas.map(item => (
            <View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: Warna.grayscale.empat,
                marginRight: 10,
                marginTop: 10,
              }}
              key={item}>
              <TextJudul style={{color: Warna.primary.satu}} title={item} />
            </View>
          ))}
        </View>
        <TextJudul style={{marginTop: 10}} title="Keterangan" />
        <TextBody title={`Rating ${data.keterangan}`} />
      </ScrollView>
      <View
        style={{flexDirection: 'row', marginHorizontal: 20, paddingTop: 10}}>
        <TextJudul title={`${formatNumber(data.harga)}`} />
        <TextBody style={{marginLeft: 10}} title="/jam" />
      </View>
      <Tombol
        onPress={() => navigation.navigate('OrderHotel', {data: data})}
        style={{marginHorizontal: 20, marginBottom: 20, marginTop: 10}}
        primary
        title="Lanjut"
      />
    </View>
  );
};

export default withNavigation(DetailHotel);
