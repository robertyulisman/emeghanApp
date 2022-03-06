import React from 'react';
import {View, Text} from 'react-native';
import {Flow} from 'react-native-animated-spinkit';
import {Warna} from '../../utils/Data';

const Loading = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      }}>
      <Flow size={48} color={Warna.biruMuda}></Flow>
    </View>
  );
};

export default Loading;
