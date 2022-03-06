import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Warna} from '../../utils/Data';
import GambarCustom from '../atoms/GambarCustom';
import TextBody from '../atoms/TextBody';
import TextJudul from '../atoms/TextJudul';
import TopLabel from '../atoms/TopLabel';

const PaketItem = ({
  style,
  judul,
  namaPaket,
  deskripsi,
  harga,
  onPress,
  isSelect,
  footerNote,
  jmlhPertemuan,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: isSelect ? Warna.primary.lima : Warna.grayscale.lima,

          borderColor: isSelect ? null : Warna.grayscale.empat,
          borderWidth: isSelect ? null : 1,
          borderRadius: 20,
          overflow: 'hidden',
          marginVertical: 10,
          paddingBottom: 10,
        },
        style,
      ]}>
      <TopLabel title={`95% Rekomendasi`} />
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
        }}>
        <TextJudul title={namaPaket} />
        <TextBody style={{color: Warna.grayscale.satu}} title={deskripsi} />
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <TextJudul
            style={{color: Warna.secondary.satu}}
            title={`Rp. ${harga}.000/ `}
          />
          <TextBody title={`${jmlhPertemuan} pertemuan`} />
        </View>
        <TextBody title={`${footerNote}`} />
      </View>
    </TouchableOpacity>
  );
};

export default PaketItem;
