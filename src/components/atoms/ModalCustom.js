import Modal from 'react-native-modal';

import React from 'react';
import {View, Text} from 'react-native';

const ModalCustom = ({isModalVisible, content, onBackButtonPress}) => {
  return (
    <Modal
      style={{margin: 5}}
      backdropOpacity={0.7}
      useNativeDriver={true}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackButtonPress}
      isVisible={isModalVisible}>
      <View>{content}</View>
    </Modal>
  );
};

export default ModalCustom;
