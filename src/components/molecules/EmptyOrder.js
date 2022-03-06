import React from 'react';
import {View, Text} from 'react-native';
import {Warna} from '../../utils/Data';
import GambarCustom from '../atoms/GambarCustom';
import TextBody from '../atoms/TextBody';
import TextJudul from '../atoms/TextJudul';

const EmptyOrder = ({title, deskripsi}) => {
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: Warna.putih,
        padding: 20,
        marginBottom: 10,
        borderRadius: 20,
        // height: 200,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <GambarCustom
        style={{height: 150, width: 150}}
        source={require('../../assets/gambar/empty.png')}
      />
      <TextJudul
        title={title}
        style={{
          color: Warna.grayscale.satu,
          textAlign: 'center',
          marginTop: 10,
        }}
      />
      <TextBody
        style={{
          textAlign: 'center',
          marginHorizontal: 20,
        }}
        title={deskripsi}
      />
    </View>
  );
};

export default EmptyOrder;
