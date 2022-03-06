import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import {Warna} from '../../utils/Data';

const TitleSection = ({title, desc, onPress, style}) => {
  return (
    <View
      style={[
        {
          marginHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        },
        style,
      ]}>
      <View>
        <TextJudul title={title} />
        <TextBody title={desc} />
      </View>

      <TouchableOpacity onPress={onPress}>
        <TextBody style={{color: Warna.primary.satu}} title="Selengkapnya" />
      </TouchableOpacity>
    </View>
  );
};

export default TitleSection;
