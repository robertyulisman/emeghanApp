import React from 'react';
import {View, Text} from 'react-native';
import {Warna} from '../../../utils/Data';
import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderHighlight = item => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: Warna.hijau,
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 15,
          alignItems: 'center',
          justifyContent: 'flex-start',
          borderBottomRightRadius: 20,
        }}>
        <Icon name="file" size={25} color={Warna.biruTua} />
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              color: Warna.biruTua,
              fontWeight: 'bold',
            }}>
            Highlight
          </Text>
          <Text style={{color: Warna.biruTua}}>Pembelajaran</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          // backgroundColor: 'yellow',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingRight: 20,
        }}>
        <Text style={{color: Warna.biruTua, fontWeight: 'bold'}}>
          {item.daftarPaket !== undefined &&
            item.daftarPaket.nama.toUpperCase()}
        </Text>
        <Text style={{color: Warna.biruTua}}>
          {item.totalPertemuan} pertemuan
        </Text>
        {item.totalPertemuan !== item.sisaPertemuan && (
          <Text style={{color: Warna.biruTua}}>
            sisa {item.sisaPertemuan} x pertemuan
          </Text>
        )}
      </View>
    </View>
  );
};

export default HeaderHighlight;
