import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Warna} from '../../utils/Data';
import Icon from 'react-native-ico-flags';

const InputNoPhone = ({
  error,
  onChangeText,
  value,
  disabled,
  onFocus,
  style,
}) => {
  return (
    <View
      style={[
        {
          backgroundColor: !disabled ? Warna.pink : Warna.putih,
          marginTop: 20,
          marginHorizontal: 20,
          borderRadius: 10,
          flexDirection: 'row',
          borderWidth: error ? 2 : 0,
          borderBottomWidth: error ? null : 1,

          borderColor: error ? Warna.merah : Warna.grayscale.empat,
        },
        style,
      ]}>
      <View
        style={{
          // backgroundColor: Warna.abuAbuMuda,
          height: 56,
          width: 60,
          marginHorizontal: 10,
          // marginVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          // borderRightWidth: 1,
          borderRightColor: Warna.grayscale.empat,
        }}>
        <Icon name="indonesia" height="20" width="20" />
        {/* <Text style={{marginLeft: 5, color: Warna.abuAbuTua}}>+62</Text> */}
      </View>
      <View
        style={{
          // backgroundColor: Warna.abuAbuMuda,
          height: 56,
          flex: 1,
          // marginVertical: 10,
          marginRight: 10,
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingLeft: 10,
        }}>
        <TextInput
          style={{
            color: Warna.hitam,
            fontFamily: 'Nunito-Regular',
            width: '100%',
            fontSize: 16,
          }}
          onChangeText={onChangeText}
          value={value}
          placeholder="Nomor Handphone"
          placeholderTextColor={Warna.grayscale.dua}
          keyboardType="phone-pad"
          editable={disabled}
          onFocus={onFocus}
        />
      </View>
    </View>
  );
};

export default InputNoPhone;
