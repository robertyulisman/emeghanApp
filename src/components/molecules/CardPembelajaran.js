import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {apiUrl, Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/FontAwesome';
import GambarCustom from '../atoms/GambarCustom';
import TextJudul from '../atoms/TextJudul';
import TextBody from '../atoms/TextBody';
import {withNavigation} from 'react-navigation';
import {useSelector} from 'react-redux';
import Tombol from '../atoms/Tombol';

const {width} = Dimensions.get('window');

const CardPembelajaran = ({
  item,
  semua,
  berlangsung,
  tertunda,
  selesai,
  batal,
  title,
  navigation,
  terima,
  tolak,
}) => {
  const {user} = useSelector(state => state.auth);
  return (
    <View
      style={{
        backgroundColor: Warna.grayscale.lima,
        width: '100%',
        // marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 20,
        padding: 20,
        shadowColor: Warna.grayscale.tiga,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 25,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <TextJudul
            title={item.daftarPaket !== undefined && item.daftarPaket.nama}
          />
        </View>
        {tertunda || selesai || batal ? (
          <View
            style={{
              backgroundColor: tertunda
                ? Warna.secondary.lima
                : selesai
                ? Warna.primary.lima
                : batal
                ? Warna.pink
                : Warna.grayscale.empat,
              paddingHorizontal: 10,
              borderRadius: 8,
            }}>
            <TextBody
              style={{
                color: tertunda
                  ? Warna.secondary.satu
                  : selesai
                  ? Warna.primary.satu
                  : batal
                  ? Warna.grayscale.lima
                  : Warna.grayscale.satu,
              }}
              title={title}
            />
          </View>
        ) : (
          <View>
            <View
              style={{
                backgroundColor: Warna.secondary.empat,
                borderRadius: 8,
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{rotate: '60deg'}],
                position: 'absolute',
                top: 0,
              }}
            />
            <View
              style={{
                backgroundColor: Warna.secondary.satu,
                borderRadius: 8,
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextBody
                style={{color: Warna.grayscale.lima, fontSize: 12}}
                title="Sisa"
              />
              <TextBody
                style={{
                  marginTop: -8,
                  color: Warna.grayscale.lima,
                  fontSize: 12,
                }}
                title={title}
              />
            </View>
          </View>
        )}
      </View>

      <TextBody title={`${item.sisaPertemuan} Pertemuan`} />

      <View>
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 3,
                backgroundColor: Warna.primary.lima,
                borderRadius: 10,
                alignItems: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Nunito-ExtraBold',
                  color: Warna.primary.satu,
                }}>
                {item.mataPelajaran.nama}
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: 14,
                color: Warna.grayscale.satu,
                fontFamily: 'Nunito-Regular',
              }}>
              {item.namaSiswa}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text
              style={{
                fontSize: 14,
                color: Warna.grayscale.satu,
                fontFamily: 'Nunito-Regular',
              }}>
              {item.jamPelajaran}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: 14,
                color: Warna.grayscale.satu,
                fontFamily: 'Nunito-Regular',
              }}>
              {item.umur} tahun
            </Text>
          </View>
        </View>
      </View>
      {/* dataGuru */}
      {user.userType === 'Siswa' && (
        <View style={{marginVertical: 10, flexDirection: 'row'}}>
          <GambarCustom
            source={{uri: `${apiUrl}/${item.dataGuru.image}`}}
            style={{
              width: 45,
              height: 45,
              borderRadius: 30,
              borderColor: Warna.grayscale.empat,
              borderWidth: 1,
            }}
          />
          <View
            style={{
              flex: 2,
              marginLeft: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Warna.grayscale.satu,
                fontFamily: 'Nunito-ExtraBold',
              }}>
              {item.dataGuru.nama}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Icon name="star" size={18} color={Warna.secondary.satu} />
              <Text
                style={{
                  fontSize: 14,
                  color: Warna.grayscale.satu,
                  marginLeft: 10,
                  fontFamily: 'Nunito-Regular',
                }}>
                review
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ReviewPesanan', {data: item})}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: Warna.primary.satu,
              paddingVertical: 5,
              paddingHorizontal: 25,
              borderRadius: 10,
              margin: 5,
              alignItems: 'center',
              justifyContent: 'center',
              // height: 40,
              // width: 120,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Warna.primary.satu,
                fontFamily: 'Nunito-Regular',
              }}>
              Detail
            </Text>
          </TouchableOpacity>

          {/* <Tombol style={{flex: 1}} secondary title="Detail" /> */}
        </View>
      )}
      {user.userType === 'Guru' &&
      item.statusDiterima === 'pending' &&
      item.statusPesanan === 'menunggu pembayaran' ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Tombol danger title="Tolak" onPress={() => tolak(item)} />
          <Tombol primary title="Terima" onPress={() => terima(item)} />
          <Tombol
            secondary
            title="Detail"
            onPress={() =>
              navigation.navigate('ReviewPesananGuru', {data: item})
            }
          />
        </View>
      ) : user.userType === 'Guru' ? (
        <Tombol
          style={{marginTop: 20}}
          secondary
          title="Detail"
          onPress={() => navigation.navigate('ReviewPesananGuru', {data: item})}
        />
      ) : // <TouchableOpacity
      //   onPress={
      //     user.userType === 'Guru'
      //       ? () => navigation.navigate('ReviewPesananGuru', {data: item})
      //       : () => navigation.navigate('ReviewPesanan', {data: item})
      //   }
      //   style={{
      //     flex: 1,
      //     borderWidth: 1,
      //     borderColor: Warna.primary.satu,
      //     paddingVertical: 5,
      //     paddingHorizontal: 25,
      //     borderRadius: 10,
      //     margin: 5,
      //     alignItems: 'center',
      //     justifyContent: 'center',
      //     // height: 40,
      //     // width: 120,
      //   }}>
      //   <Text style={{fontSize: 14, color: Warna.primary.satu}}>Detail</Text>
      // </TouchableOpacity>
      null}
    </View>
  );
};

export default withNavigation(CardPembelajaran);
