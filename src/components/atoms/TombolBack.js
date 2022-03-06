import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Warna} from '../../utils/Data';
import IconVector from 'react-native-vector-icons/AntDesign';
import {withNavigation} from 'react-navigation';

const TombolBack = ({navigation, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress ? onPress : () => navigation.goBack()}>
      <IconVector name="arrowleft" size={24} color={Warna.grayscale.satu} />
    </TouchableOpacity>
  );
};

export default withNavigation(TombolBack);
