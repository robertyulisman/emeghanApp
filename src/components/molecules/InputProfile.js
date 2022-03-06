import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Warna} from '../../utils/Data';
import GambarCustom from '../atoms/GambarCustom';
import TextBody from '../atoms/TextBody';
import TextJudul from '../atoms/TextJudul';

const InputProfile = ({
  title,
  editable,
  value,
  onChangeText,
  placeholder,
  style,
  keyboardType,
  image,
  styleHead,
  styleInput,
}) => {
  return (
    <View
      style={[
        {
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: Warna.grayscale.empat,
          // borderWidth: editable ? 1 : null,
          // borderColor: editable ? Warna.grayscale.empat : null,
          borderRadius: editable ? 10 : null,
          flex: 1,
        },
        styleHead,
      ]}>
      {/* <TextJudul title={title} /> */}
      <TextJudul
        style={{
          marginHorizontal: 20,
          // marginBottom: editable ? -10 : 0,
          marginTop: editable ? 10 : 0,
        }}
        title={title}
      />
      <View
        style={[
          {
            paddingHorizontal: 10,
            flexDirection: image ? 'row' : null,

            // alignItems: 'center',

            // flex: 1,
          },
          style,
        ]}>
        {image && (
          <GambarCustom
            style={{
              width: 24,
              height: 24,
              marginRight: 10,
              alignSelf: 'center',
            }}
            source={image}
          />
        )}

        <TextInput
          style={[
            {
              color: Warna.grayscale.satu,
              fontSize: 16,
              textAlignVertical: 'top',
              fontFamily: 'Nunito-Regular',
              paddingLeft: 10,

              flex: 1,
            },
            styleInput,
          ]}
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

export default InputProfile;
