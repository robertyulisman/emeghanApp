import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Warna} from '../../utils/Data';
import Pdf from 'react-native-pdf';

const UploadFile = ({
  form,
  onPress,
  title,
  error,
  errorText,
  deskripsi,
  style,
}) => {
  return (
    <View style={{flex: 1, borderRadius: 10, overflow: 'hidden'}}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          {
            flex: 1,
            height: 100,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Warna.putih,
            // marginHorizontal: 5,
            borderWidth: error ? 2 : null,
            borderColor: error ? Warna.merah : null,
          },
          style,
        ]}>
        {form === '' ? (
          <>
            <Text style={{color: Warna.biruMuda, fontSize: 15}}>
              Pilih {title}
            </Text>
            <Text
              style={{
                color: Warna.biruMuda,
                fontSize: 12,
                fontStyle: 'italic',
              }}>
              *{deskripsi}
            </Text>
          </>
        ) : (
          <Pdf
            style={{height: 100, width: '100%', borderRadius: 10}}
            source={{uri: form[0]?.uri}}
          />
        )}
      </TouchableOpacity>

      {form !== '' && (
        <Text style={{textAlign: 'center', color: Warna.putih}}>
          {form[0]?.name}
        </Text>
      )}
      {error && (
        <Text
          style={{
            color: Warna.merah,
            fontSize: 15,
            marginLeft: 10,
            marginTop: 5,
          }}>
          *{errorText}
        </Text>
      )}
    </View>
  );
};

export default UploadFile;
