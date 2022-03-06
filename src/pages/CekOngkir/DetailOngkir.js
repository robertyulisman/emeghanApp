import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';
import TextBody from '../../components/atoms/TextBody';
import TextHeading from '../../components/atoms/TextHeading';
import TextJudul from '../../components/atoms/TextJudul';
import Tombol from '../../components/atoms/Tombol';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';
import {formatNumber} from '../../utils/Fungsi';

const DetailOngkir = ({navigation}) => {
  const {data, tujuan, asal, berat, nama} = navigation.state.params;
  console.log(`data`, data, tujuan, asal, berat, nama);
  const handleSentWa = () => {
    navigation.navigate('WaDirect', {
      data: data,
      tujuan: tujuan,
      asal: asal,
      berat: berat,
      nama: nama,
    });
  };

  const TextList = ({title, desc}) => (
    <View
      style={{
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: Warna.grayscale.empat,
        marginTop: 10,
      }}>
      <TextJudul title={title} />
      <TextBody style={{marginBottom: 10}} title={desc} />
    </View>
  );
  return (
    <View style={{flex: 1}}>
      <TopBarNew title="Detail" />
      <ScrollView>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <TextJudul title={`${asal} - ${tujuan}`} />
          <TextHeading
            style={{color: Warna.merah}}
            title={`${formatNumber(data.cost[0].value)}`}
          />
          <TextBody
            style={{fontSize: 16}}
            title={`${nama.toUpperCase()} - ${data.service}`}
          />
        </View>
        <TextList title="Asal" desc={asal} />
        <TextList title="Tujuan" desc={tujuan} />
        <TextList title="Berat" desc={`${berat} gram`} />
        <TextList title="Kurir" desc={`${nama}`} />
        <TextList title="Layanan" desc={`${data.service}`} />
        <TextList title="Deskripsi Layanan" desc={`${data.description}`} />
      </ScrollView>
      <Text></Text>
      <Tombol
        title="Kirim ke Whatsapp"
        primary
        style={{margin: 20}}
        onPress={handleSentWa}
      />
    </View>
  );
};

export default withNavigation(DetailOngkir);
