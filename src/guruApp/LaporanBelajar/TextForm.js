import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Warna} from '../../utils/Data';
import TextCustom from './TextCustom';

const TextForm = ({
  keyTitle,
  valueTitle,
  editable,
  valueInput,
  onChangeText,
  style,
  keyboardType,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
        },
        style,
      ]}>
      <View style={{flex: 1}}>
        <TextCustom title={keyTitle} />
      </View>
      <TextCustom title=":" />
      <View
        style={{
          backgroundColor: editable ? Warna.putih : Warna.abuAbuMuda,
          flex: 2,
        }}>
        <TextInput
          editable={!editable}
          placeholderTextColor={editable ? Warna.biruMuda : Warna.abuAbuSedang}
          style={{
            marginHorizontal: 10,
            color: editable ? Warna.hitam : Warna.abuAbuTua,
            fontFamily: 'Nunito-Regular',
          }}
          multiline
          numberOfLines={1}
          placeholder={valueTitle}
          value={valueInput}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

export default TextForm;
