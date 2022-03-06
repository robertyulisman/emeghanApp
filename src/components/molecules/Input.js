import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Warna} from '../../utils/Data';
import TextBody from '../atoms/TextBody';
import TextJudul from '../atoms/TextJudul';

const Input = ({
  title,
  editable,
  value,
  onChangeText,
  placeholder,
  style,
  keyboardType,
}) => {
  return (
    <View style={{marginTop: 10}}>
      <TextJudul title={title} />
      <View
        style={[
          {
            borderWidth: 1,
            borderColor: Warna.grayscale.empat,
            paddingHorizontal: 10,
            flex: 1,
            borderRadius: 10,
            backgroundColor: editable ? Warna.abuAbuMuda : null,
            marginTop: 5,
          },
          style,
        ]}>
        <TextInput
          style={{
            color: Warna.grayscale.satu,
            fontSize: 16,
            textAlignVertical: 'top',
            fontFamily: 'Nunito-Regular',
          }}
          keyboardType={keyboardType}
          editable={editable}
          multiline
          scrollEnabled
          numberOfLines={1}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Warna.grayscale.tiga}
        />
      </View>
    </View>
  );
};

export default Input;
