import React from 'react';
import {View, Text} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Warna} from '../../utils/Data';

export default function OtpInPut({
  code,
  onCodeChanged,
  secureTextEntry,
  error,
  onCodeFilled,
}) {
  return (
    <OTPInputView
      style={{
        height: 70,
      }}
      pinCount={6}
      code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
      onCodeChanged={onCodeChanged}
      autoFocusOnLoad={false}
      codeInputFieldStyle={{
        width: 35,
        height: 50,
        borderWidth: error ? 2 : 1,
        // borderBottomWidth: 1,
        // backgroundColor: Warna.abuAbuMuda,
        fontSize: 16,
        color: Warna.hitam,
        borderColor: error ? Warna.merah : Warna.grayscale.empat,
        fontFamily: 'Nunito-Regular',
        borderRadius: 10,
      }}
      placeholderTextColor={Warna.abuAbuSedang}
      codeInputHighlightStyle={{
        borderColor: Warna.primary.satu,
        // borderBottomWidth: error ? null : 2,
      }}
      secureTextEntry={secureTextEntry}
      onCodeFilled={onCodeFilled}
    />
  );
}
