import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Warna} from '../../utils/Data';
import GambarCustom from '../atoms/GambarCustom';
import TextBody from '../atoms/TextBody';
import TextJudul from '../atoms/TextJudul';

const CardItem = ({title, rating, harga, source, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: Warna.grayscale.empat,
        alignItems: 'center',
        marginTop: 10,
      }}>
      <GambarCustom
        resizeMode="cover"
        style={{width: 60, height: 60, borderRadius: 10}}
        source={source}
      />
      <View style={{flex: 1, marginLeft: 10}}>
        <TextJudul title={title} />
        <TextBody title={rating} />
        <View style={{flexDirection: 'row'}}>
          <TextJudul title={harga} />
          <TextBody style={{marginLeft: 10}} title="/jam" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;
