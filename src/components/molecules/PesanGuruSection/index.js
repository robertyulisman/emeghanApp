import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Warna} from '../../../utils/Data';
import GambarCustom from '../../atoms/GambarCustom';
import PesanGuruItem from './PesanGuruItem';
import {withNavigation} from 'react-navigation';
import ModalCustom from '../../atoms/ModalCustom';
import CaraPesan from '../CaraPesan';

const PesanGuruSection = ({navigation}) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 10,
        }}>
        <PesanGuruItem
          onPress={() => navigation.navigate('Progress')}
          primary
          titleSatu="PESAN"
          titleDua="GURU"
          gambar={require('../../../assets/images/1.png')}
        />
        <PesanGuruItem
          onPress={() => setShowModal(true)}
          titleSatu="CARA"
          titleDua="PESAN"
          gambar={require('../../../assets/images/5.png')}
          style={{marginLeft: 10}}
        />
      </View>
      <ModalCustom
        isModalVisible={showModal}
        onBackButtonPress={() => setShowModal(false)}
        content={<CaraPesan closeModal={() => setShowModal(false)} />}
      />
    </>
  );
};

export default withNavigation(PesanGuruSection);
