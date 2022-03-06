import React from 'react';
import {View, Text} from 'react-native';
import {Flow} from 'react-native-animated-spinkit';
import {Warna} from '../../utils/Data';

const LoadingComp = ({top, primary, style}) => {
  return (
    <View style={[{alignItems: 'center', marginTop: top}, style]}>
      <Flow
        size={48}
        color={primary ? Warna.primary.satu : Warna.grayscale.lima}></Flow>
    </View>
  );
};

export default LoadingComp;
