import React from 'react';
import {View, Text} from 'react-native';
import {Warna} from '../../../utils/Data';

const MainHighlight = item => {
  const TableSiswa = ({keySiswa, valueSiswa}) => (
    <View style={{flexDirection: 'row', marginHorizontal: 5}}>
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 5}}>
          <Text style={{color: Warna.biruTua}}>{keySiswa}</Text>
        </View>
      </View>
      <Text style={{color: Warna.biruTua}}>:</Text>
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 5}}>
          <Text style={{color: Warna.biruTua}}>{valueSiswa}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <View>
      <TableSiswa keySiswa="Nama Siswa" valueSiswa={item.namaSiswa} />
      <TableSiswa keySiswa="Umur" valueSiswa={item.umur} />
      <TableSiswa
        keySiswa="Mata Pelajaran"
        valueSiswa={item.mataPelajaran.nama}
      />
      <TableSiswa keySiswa="Jam Pertemuan" valueSiswa={item.jamPelajaran} />
      {/* <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,

          // backgroundColor: 'red',
        }}>
        <View style={{flex: 1, backgroundColor: 'red', alignItems: 'center'}}>
          <Text>Nama Murid</Text>
        </View>
        <View
          style={{flex: 1, backgroundColor: 'yellow', alignItems: 'center'}}>
          <Text>: {namaMurid}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <View style={{flex: 1, backgroundColor: 'red', alignItems: 'center'}}>
          <Text>Umur</Text>
        </View>
        <View
          style={{flex: 1, backgroundColor: 'yellow', alignItems: 'center'}}>
          <Text>: 5th</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <View style={{flex: 1}}>
          <Text>Belajar</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>: Al-Qur'an</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <View style={{flex: 1}}>
          <Text>Jam Pertemuan</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>: 15.00 - 16.00</Text>
        </View>
      </View> */}
    </View>
  );
};

export default MainHighlight;
