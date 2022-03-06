import React from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Warna} from '../../utils/Data';
import TextBody from '../atoms/TextBody';
import TextJudul from '../atoms/TextJudul';

const DropDownAlamat = ({
  title,
  placeholder,
  selectedValue,
  onChangeValue,
  mapData,
  isUpdate,
  value,
  style,
  error,
  errorText,
}) => {
  return (
    <>
      <View
        style={[
          {
            borderBottomWidth: error ? null : isUpdate ? 1 : 1,
            borderBottomColor: error ? null : Warna.grayscale.empat,
            marginTop: 10,
            paddingHorizontal: 20,
            borderWidth: error ? 2 : null,
            // borderColor: isUpdate ? Warna.grayscale.empat : null,
            flex: 1,
            borderRadius: error ? null : isUpdate ? 10 : null,
          },
          style,
        ]}>
        {title && (
          <TextJudul
            style={{
              marginBottom: isUpdate ? -15 : 0,
              marginTop: isUpdate ? 10 : 0,
            }}
            title={title}
          />
        )}
        {isUpdate ? (
          <Picker
            selectedValue={selectedValue}
            mode="dropdown"
            style={{
              color: Warna.grayscale.satu,
            }}
            onValueChange={onChangeValue}>
            <Picker.Item
              style={{fontSize: 16, fontFamily: 'Nunito-Regular'}}
              label={placeholder}
            />
            {mapData.length > 0 &&
              mapData.map(item => (
                <Picker.Item
                  style={{fontSize: 16, fontFamily: 'Nunito-Regular'}}
                  key={item.id}
                  label={item.nama}
                  value={item}
                />
              ))}
          </Picker>
        ) : (
          <View style={{paddingVertical: 10, marginLeft: 5}}>
            <Text
              style={{
                fontSize: 15,
                color: Warna.grayscale.satu,
                fontFamily: 'Nunito-Regular',
              }}>
              {value}
            </Text>
          </View>
        )}
      </View>
      {error && (
        <Text
          style={{
            color: Warna.merah,
            fontSize: 14,
            marginLeft: 10,
            marginTop: 5,
            fontFamily: 'Nunito-Regular',
          }}>
          *{errorText}
        </Text>
      )}
    </>
  );
};

export default DropDownAlamat;
