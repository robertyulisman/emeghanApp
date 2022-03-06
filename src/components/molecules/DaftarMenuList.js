import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Warna} from '../../utils/Data';
import GambarCustom from '../atoms/GambarCustom';
import TextBody from '../atoms/TextBody';
import TextJudul from '../atoms/TextJudul';

const DaftarMenuList = ({
  title,
  description,
  image,
  keyId,
  onPress,
  onChoose,
}) => {
  return (
    <TouchableOpacity
      key={keyId}
      onPress={onPress}
      style={{
        margin: 10,
        borderRadius: 16,
        borderColor: onChoose ? Warna.primary.satu : Warna.grayscale.empat,
        borderWidth: 1,
        padding: 10,
        backgroundColor: Warna.putih,
        flexDirection: 'row',
      }}>
      <GambarCustom
        style={{
          height: 70,
          width: 70,
        }}
        source={image}
      />
      <View style={{flex: 1, marginLeft: 10}}>
        <TextJudul title={title} />
        <TextBody title={description} />
      </View>
    </TouchableOpacity>
  );
};

export default DaftarMenuList;
