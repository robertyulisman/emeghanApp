import React from 'react';
import {View, Text} from 'react-native';
import {Warna} from '../../utils/Data';
import TextCustom from './TextCustom';
import Icon from 'react-native-vector-icons/FontAwesome';

const TextFormImage = ({title, value, icon}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      }}>
      <View style={{flex: 1}}>
        <TextCustom title={title} />
      </View>
      <TextCustom title=":" />
      <View
        style={{
          flexDirection: 'row',
          flex: 2,
        }}>
        <View style={{flex: 1}}>
          <TextCustom
            style={{
              marginRight: 10,
              textAlign: 'right',
              color: Warna.abuAbuTua,
            }}
            title={value}
          />
        </View>

        <View
          style={{
            width: 25,
            height: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name={icon} size={24} color={Warna.abuAbuTua} />
        </View>
      </View>
    </View>
  );
};

export default TextFormImage;
