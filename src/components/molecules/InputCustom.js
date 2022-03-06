import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Warna} from '../../utils/Data';
import TextBody from '../atoms/TextBody';

const InputCustom = props => {
  return (
    <>
      {props.label && (
        <TextBody
          style={{
            marginBottom: 5,
            marginTop: 10,
            marginLeft: 10,
          }}
          title={props.label}
        />
      )}
      <View
        style={{
          marginBottom: 10,
          borderWidth: 1,
          borderColor: Warna.grayscale.empat,
          borderRadius: 10,
        }}>
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <TextInput
            placeholderTextColor={Warna.grayscale.dua}
            style={{
              color: Warna.grayscale.satu,
              fontSize: 16,
              textAlignVertical: 'top',
              fontFamily: 'Nunito-Regular',
            }}
            {...props}
          />
        </View>
      </View>
      {props.error && (
        <Text
          style={{
            color: Warna.merah,
            fontSize: 14,
            marginLeft: 10,
            marginTop: -5,
            marginBottom: 15,
            fontFamily: 'Nunito-Regular',
          }}>
          *{props.errorText}
        </Text>
      )}
    </>
  );
};

export default InputCustom;
