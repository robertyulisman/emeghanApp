import React from 'react';
import {View, Text, TextInput} from 'react-native';
import StarRating from 'react-native-star-rating';
import GambarCustom from '../../components/atoms/GambarCustom';
import Tombol from '../../components/atoms/Tombol';
import TopLabel from '../../components/atoms/TopLabel';
import {Warna} from '../../utils/Data';

const FormUlasanRating = ({
  namaGuru,
  editable,
  onPressTombol,
  titleTombol,
  image,
  alamat,
  komentar,
  jumlahRating,
  value,
  onChangeText,
  disabledStart,
  selectedStar,
}) => {
  return (
    <View
      style={{
        margin: 10,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Warna.biruMuda,
      }}>
      <TopLabel title="Rating" />
      <View style={{flexDirection: 'row', margin: 10}}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: Warna.abuAbuMuda,
          }}>
          <GambarCustom
            resizeMode="cover"
            style={{height: 60, width: 60, borderRadius: 30}}
            source={image}
          />
        </View>
        <View style={{flex: 1, marginHorizontal: 10}}>
          <Text>{namaGuru}</Text>
          <Text>{alamat}</Text>
          <View style={{width: '60%'}}>
            <StarRating
              disabled={disabledStart}
              maxStars={5}
              rating={jumlahRating}
              fullStarColor={Warna.orange}
              starSize={25}
              selectedStar={selectedStar}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: Warna.biruMuda,
          marginHorizontal: 10,
          marginBottom: 20,
        }}>
        <TextInput
          editable={editable}
          multiline
          scrollEnabled
          value={value}
          onChangeText={onChangeText}
          numberOfLines={4}
          placeholder={komentar}
          placeholderTextColor={Warna.abuAbuTua}
          style={{
            textAlign: 'left',
            paddingTop: 10,
            paddingLeft: 10,
            textAlignVertical: 'top',
            color: Warna.hitam,
          }}
        />
      </View>

      <View
        style={{
          alignItems: 'flex-end',
          marginRight: 10,
          marginBottom: 10,
        }}>
        <Tombol onPress={onPressTombol} primary title={titleTombol} />
      </View>
    </View>
  );
};

export default FormUlasanRating;
