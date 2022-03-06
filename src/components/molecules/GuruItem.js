import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Warna} from '../../utils/Data';
import GambarCustom from '../atoms/GambarCustom';
import RatingDefault from '../atoms/RatingDefault';
import TextBody from '../atoms/TextBody';
import TextJudul from '../atoms/TextJudul';
import Tombol from '../atoms/Tombol';
import TopLabel from '../atoms/TopLabel';

const GuruItem = ({
  nama,
  umur,
  alamat,
  profile,
  hafal,
  onPress,
  onPressDetail,
  onSelect,
  rating,
  review,
  image,
  ratingView,
}) => {
  const Tulisan = ({title, value}) => (
    <View style={{flexDirection: 'row', marginBottom: 5}}>
      <Text
        style={{
          flex: 1,
          color: Warna.biruMuda,
          fontSize: 14,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
      <Text
        style={{
          marginHorizontal: 5,
          color: Warna.biruMuda,
          fontSize: 14,
          fontFamily: 'Nunito-Regular',
        }}>
        :
      </Text>
      <Text
        style={{
          flex: 2.5,
          color: Warna.biruMuda,
          fontSize: 14,
          fontFamily: 'Nunito-Regular',
        }}>
        {value}
      </Text>
    </View>
  );
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        borderColor: onSelect ? null : Warna.grayscale.empat,
        borderWidth: onSelect ? null : 1,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 10,
        backgroundColor: onSelect ? Warna.primary.lima : null,
      }}>
      {/* <TopLabel title="Biodata Guru" /> */}
      <View style={{flexDirection: 'row', padding: 14}}>
        <GambarCustom
          resizeMode="cover"
          source={image}
          style={{
            height: 48,
            width: 48,
            borderRadius: 24,
            borderColor: Warna.grayscale.empat,
            borderWidth: 1,
          }}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <TextJudul title={nama} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {ratingView ? (
              <RatingDefault
                rating={rating}
                review={review}
                style={{alignItems: 'center'}}
              />
            ) : (
              <Text
                style={{
                  color: Warna.grayscale.dua,
                  fontFamily: 'Nunito-Regular',
                }}>
                (Belum ada review)
              </Text>
            )}
            <TouchableOpacity
              onPress={onPressDetail}
              style={{
                borderWidth: 1,
                borderColor: Warna.primary.satu,
                paddingVertical: 5,
                paddingHorizontal: 25,
                borderRadius: 8,
              }}>
              <TextBody style={{color: Warna.primary.satu}} title="Detail" />
            </TouchableOpacity>

            {/* <Tombol
              title="Detail"
              onPress={onPressDetail}
              secondary
              // aksi
              // style={{alignSelf: 'flex-end'}}
            /> */}
          </View>
        </View>

        {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> */}
        {/* <Icon name="user" size={60} color={Warna.biruMuda} /> */}
        {/* </View> */}

        {/* <View style={{flex: 2, marginRight: 10}}>
          {ratingView ? (
            <RatingDefault rating={rating} review={review} />
          ) : (
            <Text style={{color: Warna.biruMuda}}>(Belum Ada Review)</Text>
          )}

          <Tulisan title="Nama" value={nama} />
          <Tulisan title="Alamat" value={alamat} />
          <Tulisan title="Profile" value={profile} />
          <Tulisan title="Hafalan" value={hafal} />
        </View> */}
      </View>
      <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
        {/* alamat */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <GambarCustom
            resizeMode="cover"
            source={require('../../assets/figma/alamat_icon.png')}
            style={{
              height: 18,
              width: 18,
              borderRadius: 24,
            }}
          />
          <TextBody
            style={{color: Warna.grayscale.dua, marginLeft: 5}}
            title={alamat}
          />
        </View>
        {/* profile */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <GambarCustom
            resizeMode="cover"
            source={require('../../assets/figma/pendidikan_icon.png')}
            style={{
              height: 18,
              width: 18,
              borderRadius: 24,
            }}
          />
          <TextBody
            style={{color: Warna.grayscale.dua, marginLeft: 5}}
            title={profile}
          />
        </View>
        {/* hafalan */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <GambarCustom
            resizeMode="cover"
            source={require('../../assets/figma/hafalan_icon.png')}
            style={{
              height: 18,
              width: 18,
              borderRadius: 24,
            }}
          />
          <TextBody
            style={{color: Warna.grayscale.dua, marginLeft: 5}}
            title={`Hafalan ${hafal}`}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GuruItem;
