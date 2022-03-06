import React from 'react';
import {View, Text} from 'react-native';
import IconCustom from '../../components/atoms/IconCustom';
import LoadingComp from '../../components/atoms/LoadingComp';
import InputProfile from '../../components/molecules/InputProfile';
import {Warna} from '../../utils/Data';

const InputKontak = ({
  valueInput,
  onChangeInput,
  handleGetContact,
  loading,
  title,
  placeholder,
}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          marginHorizontal: 10,
        }}>
        <InputProfile
          image={require('../../assets/icon/call.png')}
          title={title ? title : 'Masukkan No Hp'}
          keyboardType="number-pad"
          value={valueInput}
          placeholder={placeholder ? placeholder : 'nomor Handphone'}
          onChangeText={onChangeInput}
        />
        <IconCustom
          styleIcon={{width: 40, height: 40}}
          style={{marginBottom: 10}}
          onPress={handleGetContact}
          name={require('../../assets/icon/kontak.png')}
        />
      </View>
      {loading && <LoadingComp primary style={{marginTop: 100}} />}
    </>
  );
};

export default InputKontak;
