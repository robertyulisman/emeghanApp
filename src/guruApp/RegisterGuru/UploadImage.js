import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import GambarCustom from '../../components/atoms/GambarCustom';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import {Warna} from '../../utils/Data';

const UploadImage = ({
  form,
  onPress,
  error,
  errorText,
  style,
  title,
  deskripsi,
}) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 10,
          borderWidth: error ? 2 : null,
          borderColor: error ? Warna.merah : null,
          borderRadius: 10,
          marginVertical: 5,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={onPress}
          style={[
            {
              height: 56,
              width: 56,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',

              backgroundColor: Warna.grayscale.empat,
            },
            style,
          ]}>
          {form === '' ? (
            <GambarCustom
              resizeMode="cover"
              source={require('../../assets/figma/send_icon.png')}
              style={{width: 25, height: 25, borderRadius: 10}}
            />
          ) : (
            <GambarCustom
              resizeMode="cover"
              source={{uri: form[0]?.uri}}
              style={{width: 50, height: 50, borderRadius: 10}}
            />
          )}
        </TouchableOpacity>
        <View style={{marginLeft: 20}}>
          <TextJudul title={title} />
          <TextBody style={{color: Warna.primary.satu}} title={deskripsi} />
        </View>

        {/* {form !== '' && (
        <Text style={{textAlign: 'center', color: Warna.putih}}>
          {form[0]?.name}
        </Text>
      )}
     
      )} */}
      </View>
      {error && (
        <Text
          style={{
            color: Warna.merah,
            fontSize: 14,
            marginLeft: 10,
            marginBottom: 5,
            fontFamily: 'Nunito-Regular',
          }}>
          *{errorText}
        </Text>
      )}
    </>
  );
};

export default UploadImage;
