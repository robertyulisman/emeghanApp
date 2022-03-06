import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Warna} from '../../utils/Data';
import Tombol from '../atoms/Tombol';

const TombolAksi = ({
  titleNegative,
  titlePositive,
  onPressNegative,
  onPressPositive,
  style,
}) => {
  return (
    <View
      style={[
        style,
        {
          flexDirection: 'row',
        },
      ]}>
      <Tombol onPress={onPressNegative} secondary title={titleNegative} aksi />
      <Tombol
        style={{marginLeft: 5}}
        onPress={onPressPositive}
        primary
        title={titlePositive}
        aksi
      />
      {/* <TouchableOpacity
        onPress={onPressNegative}
        style={{
          backgroundColor: Warna.putih,
          paddingHorizontal: 15,
          paddingVertical: 8,
          borderRadius: 10,
          borderColor: Warna.abuAbuSedang,
          borderWidth: 1,
        }}>
        <Text style={{color: Warna.hitam}}>{titleNegative}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressPositive}
        style={{
          backgroundColor: Warna.biruTua,
          paddingHorizontal: 15,
          paddingVertical: 8,
          borderRadius: 10,
          marginLeft: 5,
        }}>
        <Text style={{color: Warna.putih}}>{titlePositive}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default TombolAksi;
