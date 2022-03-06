import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';
import TopLabel from '../../components/atoms/TopLabel';
import TopBar from '../../components/molecules/TopBar';
import {apiUrl, Warna} from '../../utils/Data';
import moment from 'moment';
import GambarCustom from '../../components/atoms/GambarCustom';
import {formatNumber} from '../../utils/Fungsi';

const DetailRiwayat = ({navigation}) => {
  const {data} = navigation.state.params;
  const TextCustom = ({textKey, textValue}) => (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 16,
            color: Warna.biruMuda,
            fontFamily: 'Nunito-Regular',
          }}>
          {textKey}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 16,
          color: Warna.biruMuda,
          fontFamily: 'Nunito-Regular',
        }}>
        :
      </Text>
      <View style={{flex: 2, marginLeft: 10}}>
        <Text
          style={{
            fontSize: 16,
            color: Warna.hitam,
            fontFamily: 'Nunito-Regular',
          }}>
          {textValue}
        </Text>
      </View>
    </View>
  );
  console.log(`data`, data);

  return (
    <View style={{flex: 1, backgroundColor: Warna.abuAbuMuda}}>
      <TopBar left title="Detail" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: Warna.putih,
          marginHorizontal: 10,
          marginTop: -60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        }}>
        <TopLabel title={`id Transaksi : ${data._id}`} />
        <View style={{margin: 10}}>
          <Text style={{fontSize: 16, fontFamily: 'Nunito-Regular'}}>
            {' '}
            Pengirim :{' '}
          </Text>
          <TextCustom textKey="nama" textValue={data.pengirim} />
          <Text style={{fontSize: 16, marginTop: 10}}> Penerima : </Text>
          <TextCustom textKey="nama" textValue={data.guru.nama} />
          <TextCustom textKey="Nama Bank" textValue={data.namaBank} />
          <TextCustom textKey="No Rek" textValue={data.noRek} />
          <TextCustom textKey="Jumlah" textValue={formatNumber(data.nominal)} />
          <TextCustom
            textKey="tanggal"
            textValue={moment(data.createdAt).format('Do MMMM YYYY, h:mm:ss')}
          />
          <TextCustom textKey="Catatan" textValue={data.deskripsi} />
          <View style={{height: 200, width: '100%', marginTop: 20}}>
            <GambarCustom
              resizeMode="cover"
              source={{uri: `${apiUrl}/${data.resi}`}}
              style={{height: 200, width: '100%'}}
            />
          </View>

          {/* <View style={{flex: 1}}>
            <Text style={{fontSize: 16, color: Warna.biruMuda}}>Pengirim</Text>
          </View>

          <Text style={{fontSize: 16, color: Warna.biruMuda}}>:</Text>
          <View style={{flex: 2, marginLeft: 10}}>
            <Text style={{fontSize: 16, color: Warna.biruMuda}}>Pengirim</Text>
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default withNavigation(DetailRiwayat);
