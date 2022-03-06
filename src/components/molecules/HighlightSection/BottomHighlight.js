import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {apiUrl, Warna} from '../../../utils/Data';
import GambarCustom from '../../atoms/GambarCustom';
import RatingDefault from '../../atoms/RatingDefault';

const BottomHighlight = item => {
  // const hasilRating =
  //         item.Review.length !== 0 &&
  //         item.Review.reduce((item, cur) => ({
  //           jumlahRating: item.jumlahRating + cur.jumlahRating,
  //         }));

  const hasilRating =
    item.dataGuru.Review.length !== 0 &&
    item.dataGuru.Review.reduce((item, cur) => ({
      jumlahRating: item.jumlahRating + cur.jumlahRating,
    }));

  return (
    <View style={{flexDirection: 'row', marginTop: 10}}>
      <View style={{flex: 1.5, paddingHorizontal: 10}}>
        <RatingDefault
          review={
            item.dataGuru !== undefined &&
            item.dataGuru.Review !== undefined &&
            item.dataGuru.Review.length
          }
          rating={
            item.dataGuru !== undefined &&
            item.dataGuru?.Review !== undefined &&
            item.dataGuru?.Review.length === 0
              ? '0'
              : hasilRating?.jumlahRating / item.dataGuru?.Review.length
          }
          style={{marginTop: 20}}
        />

        <Text style={{color: Warna.biruTua}}>
          {item.dataGuru !== undefined && item.dataGuru.nama}
        </Text>
        <Text style={{color: Warna.biruTua}}>
          {item.dataGuru !== undefined && item.dataGuru.profile}
        </Text>
        <Text style={{marginBottom: 20, color: Warna.biruTua}}>
          {item.dataGuru !== undefined && item.dataGuru.umur}th,
          {item.dataGuru !== undefined && item.dataGuru.kecamatan}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <View>
          <View
            style={{
              flex: 1,
              backgroundColor: Warna.hijau,
              flexDirection: 'row',
              paddingVertical: 5,
              alignItems: 'center',
              justifyContent: 'flex-start',
              borderTopLeftRadius: 20,
              paddingHorizontal: 10,
            }}>
            <Icon name="users" size={25} color={Warna.biruTua} />
            <View style={{marginLeft: 10}}>
              <Text style={{color: Warna.biruTua, fontWeight: 'bold'}}>
                Biodata
              </Text>
              <Text style={{color: Warna.biruTua}}>Guru</Text>
            </View>
          </View>
          <View
            style={{
              // width: 50,
              // height: 50,
              // borderRadius: 25,
              // backgroundColor: Warna.abuAbuMuda,

              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <GambarCustom
              resizeMode="cover"
              source={{
                uri:
                  item.dataGuru !== undefined &&
                  item.dataGuru.image !== undefined
                    ? `${apiUrl}/${item.dataGuru.image}`
                    : `${apiUrl}/asset/images/noImage.jpg`,
                // item.dataGuru.image !== undefined
                // ? `http://192.168.100.20:5000/${item.dataGuru.image}`

                //   `http://192.168.100.20:5000/asset/images/noImage.jpg`
                // : item.dataGuru.image === ''
                // ? `http://192.168.100.20:5000/asset/images/noImage.jpg`
                // : `http://192.168.100.20:5000/asset/images/noImage.jpg`,
              }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                borderWidth: 1,
                borderColor: Warna.abuAbuMuda,
              }}
            />
            {/* <Icon name="user" size={40} color={Warna.putih} /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default BottomHighlight;
