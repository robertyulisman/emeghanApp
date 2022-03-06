import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {apiUrl, Warna} from '../../utils/Data';
import TopLabel from '../atoms/TopLabel';
import StarRating from 'react-native-star-rating';
import Tombol from '../atoms/Tombol';
import GambarCustom from '../atoms/GambarCustom';
import moment from 'moment';
import TextJudul from '../atoms/TextJudul';
import TextBody from '../atoms/TextBody';

const FormUlasan = ({
  item,
  editable,
  tombol,
  onPressTombol,
  titleTombol,
  guru,
  // nama,
  // image,
  // alamat,
  // komentar,
  // jumlahRating,
}) => {
  return (
    <View
      style={{
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 16,
        backgroundColor: Warna.grayscale.lima,
        shadowColor: Warna.grayscale.tiga,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 25,
      }}>
      <View style={{flexDirection: 'row', margin: 10}}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            backgroundColor: Warna.abuAbuMuda,
            alignSelf: 'center',
          }}>
          <GambarCustom
            resizeMode="cover"
            style={{height: 50, width: 50, borderRadius: 20}}
            source={{
              uri: guru
                ? item.user?.image
                : item.guru?.image === ''
                ? `${apiUrl}/asset/images/noImage.png`
                : `${apiUrl}/${guru ? item.user?.image : item.guru?.image}`,
            }}
          />
        </View>
        <View style={{flex: 1, marginHorizontal: 10}}>
          <TextJudul title={guru ? item.user?.nama : item.guru?.nama} />

          {/* <Text>{guru ? item.user?.nama : item.guru?.nama}</Text> */}
          {/* <Text>
            {guru ? item.user?.kelurahan : item.guru?.kelurahan} -
            {guru ? item.user?.kecamatan : item.guru?.kecamatan}
          </Text> */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: '40%'}}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={item.jumlahRating}
                fullStarColor={Warna.orange}
                starSize={14}
              />
            </View>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: Warna.grayscale.tiga,
                marginHorizontal: 10,
              }}
            />
            <TextBody
              style={{fontSize: 12}}
              title={moment(item.createdAt).calendar()}
            />
          </View>
        </View>
      </View>
      <View style={{flex: 1, padding: 10}}>
        <TextInput
          editable={editable}
          multiline
          scrollEnabled
          numberOfLines={5}
          placeholder={
            item.komentar === '' ? '"belum ada ulasan"' : item.komentar
          }
          placeholderTextColor={Warna.abuAbuTua}
          style={{
            textAlign: 'left',
            paddingTop: 10,
            textAlignVertical: 'top',
            color: Warna.hitam,
            marginHorizontal: 10,
            fontSize: 14,
            color: Warna.grayscale.dua,
            fontFamily: 'Nunito-Regular',
            width: '100%',
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}>
          <GambarCustom
            style={{width: 25, height: 25, marginRight: 5}}
            source={require('../../assets/figma/likes_icon.png')}
          />
          <TextBody title="Suka" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1.5,
            justifyContent: 'center',
          }}>
          <GambarCustom
            style={{width: 25, height: 25, marginRight: 5}}
            source={require('../../assets/figma/dislike_icon.png')}
          />
          <TextBody title="Tidak Suka" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1.5,
            justifyContent: 'center',
          }}>
          <GambarCustom
            style={{width: 25, height: 25, marginRight: 5}}
            source={require('../../assets/figma/comment_icon.png')}
          />
          <TextBody title="Komentar" />
        </View>
      </View>
    </View>
  );
};

export default FormUlasan;
