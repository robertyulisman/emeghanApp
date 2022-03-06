import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {apiUrl, Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/FontAwesome';
import GambarCustom from '../atoms/GambarCustom';
import TextJudul from '../atoms/TextJudul';
import TextBody from '../atoms/TextBody';
import {withNavigation} from 'react-navigation';
import {useSelector} from 'react-redux';
import Tombol from '../atoms/Tombol';

const {width} = Dimensions.get('window');

const CardPembelajaran = ({
  item,
  semua,
  berlangsung,
  tertunda,
  selesai,
  batal,
  title,
  navigation,
  terima,
  tolak,
}) => {
  const {user} = useSelector(state => state.auth);
  return (
    <View
      style={{
        backgroundColor: Warna.grayscale.lima,
        width: '100%',
        // marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 20,
        padding: 20,
        shadowColor: Warna.grayscale.tiga,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 25,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <TextBody
            title="Pulsa"
            // title={item.daftarPaket !== undefined && item.daftarPaket.nama}
          />
        </View>
        <View>
          <TextBody title="#123456" />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <TextBody
            title="Pembelian Pulsa 20.000"
            // title={item.daftarPaket !== undefined && item.daftarPaket.nama}
          />
        </View>
        <View>
          <TextJudul title="Rp.22.000" />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View>
          <TextBody
            title="31 oktober 2021"
            // title={item.daftarPaket !== undefined && item.daftarPaket.nama}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
            backgroundColor: Warna.primary.lima,
            borderRadius: 10,
            alignItems: 'flex-start',
          }}>
          <TextBody style={{color: Warna.primary.satu}} title="Tertunda" />
        </View>
      </View>
    </View>
  );
};

export default withNavigation(CardPembelajaran);
