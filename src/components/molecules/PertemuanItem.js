import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Warna} from '../../utils/Data';
import TextBody from '../atoms/TextBody';
import TextJudul from '../atoms/TextJudul';
import TopLabel from '../atoms/TopLabel';

const PertemuanItem = ({
  namaPaket,
  jumlah,
  durasi,
  harga,
  deskripsi,
  catatan,
  onPress,
  onSelect,
  primary,
}) => {
  const Tulisan = ({title, large, style}) => (
    <Text
      style={[
        {
          fontSize: large ? 20 : 12,
          fontWeight: large ? 'bold' : null,
          marginVertical: large ? null : -5,
          color: primary ? Warna.putih : Warna.biruTua,
        },
        style,
      ]}>
      {title}
    </Text>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        borderColor: onSelect ? null : Warna.grayscale.empat,
        borderWidth: onSelect ? 0 : 1,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: onSelect ? Warna.primary.lima : Warna.grayscale.lima,
      }}>
      <TopLabel title={namaPaket.toUpperCase()} />
      <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
        <View
          style={{
            flex: 2,
            paddingVertical: 20,
          }}>
          <View>
            <TextJudul title={`${jumlah} Pertemuan`} />
            <TextBody title={`Durasi ${durasi} Hari`} />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            paddingVertical: 20,
            justifyContent: 'center',
          }}>
          <TextJudul
            style={{color: Warna.secondary.satu}}
            title={`Rp. ${harga}.000`}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PertemuanItem;
