import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Warna} from '../../utils/Data';
import GambarCustom from './GambarCustom';

const BottomNavBarItem = ({
  title,
  active,
  source,
  onPress,
  badge,
  badgeNumber,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{flex: 1, alignItems: 'center'}}>
      {badge ? (
        <View
          style={{
            backgroundColor: Warna.merah,

            height: 20,
            width: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            position: 'absolute',
            top: -5,
            right: 20,
            zIndex: 999,
          }}>
          <Text
            style={{
              color: Warna.grayscale.lima,
              fontSize: 12,
              fontFamily: 'Nunito-Regular',
            }}>
            {badgeNumber}
          </Text>
        </View>
      ) : null}

      <GambarCustom
        style={{
          width: 22,
          height: 22,
          // backgroundColor: Warna.grayscale.empat,
        }}
        source={source}
      />
      <Text
        style={{
          fontSize: 12,
          fontFamily: active ? 'Nunito-ExtraBold' : 'Nunito-Regular',
          color: active ? Warna.primary.satu : Warna.grayscale.dua,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default BottomNavBarItem;
