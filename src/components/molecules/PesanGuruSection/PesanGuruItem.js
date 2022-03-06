import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Warna} from '../../../utils/Data';
import GambarCustom from '../../atoms/GambarCustom';

const PesanGuruItem = ({
  onPress,
  titleSatu,
  titleDua,
  gambar,
  primary,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: 100,
          backgroundColor: primary ? Warna.putih : Warna.biruTua,
          // borderWidth: 1,
          borderRadius: 20,
          // borderColor: Warna.abuAbuSedang,
        },
        style,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <GambarCustom style={{width: 50, height: 50}} source={gambar} />
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: primary ? Warna.biruTua : Warna.putih,
            }}>
            {titleSatu}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: -10,
              color: primary ? Warna.biruTua : Warna.putih,
            }}>
            {titleDua}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PesanGuruItem;
