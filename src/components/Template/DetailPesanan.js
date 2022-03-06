import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {apiUrl, Warna} from '../../utils/Data';
import GambarCustom from '../atoms/GambarCustom';
import Dash from 'react-native-dash';
import RatingDefault from '../atoms/RatingDefault';
import TextBody from '../atoms/TextBody';
import TextJudul from '../atoms/TextJudul';

// import TopLabel from '../../components/atoms/TopLabel';
// import TopBar from '../../components/molecules/TopBar';
// import moment from 'moment';
// import TopLabel from '../atoms/TopLabel';
// import TopBar from '../molecules/TopBar';
// import GambarCustom from '../../components/atoms/GambarCustom';

const DetailPesanan = ({chatGuru, onPressChatGuru, data}) => {
  //   const {data} = navigation.state.params;
  //   console.log(`prop apa ??`, navigation.state.params.data);
  // const Tulisan = ({title, large, style, primary}) => (
  //   <Text
  //     style={[
  //       {
  //         fontSize: large ? 18 : 14,
  //         fontWeight: large ? 'bold' : null,
  //         color: primary ? Warna.biruTua : Warna.abuAbuTua,
  //       },
  //       style,
  //     ]}>
  //     {title}
  //   </Text>
  // );

  // const TulisanFix = ({keyTulisan, valueTulisan}) => (
  //   <View
  //     style={{
  //       flexDirection: 'row',
  //       justifyContent: 'space-between',
  //     }}>
  //     <View style={{flex: 1}}>
  //       <Tulisan title={keyTulisan} />
  //     </View>
  //     <Text style={{marginHorizontal: 10}}>:</Text>
  //     <View style={{flex: 1, alignItems: 'flex-start'}}>
  //       <Tulisan primary title={valueTulisan} />
  //     </View>
  //   </View>
  // );

  const formatNumber = num =>
    `Rp. ${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;

  // const formatDate = date => {
  //   const lokal = moment(date).locale('id');
  //   return moment(lokal).format('dddd, Do MMM YYYY');
  // };

  const TulisanFix = ({keyTulisan, valueTulisan, bold}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginVertical: 2,
      }}>
      <View style={{flex: 1}}>
        <TextBody
          style={{
            fontWeight: bold ? 'bold' : 'normal',
            color: bold ? Warna.grayscale.satu : Warna.grayscale.dua,
          }}
          title={keyTulisan}
        />
      </View>

      <View style={{flex: 1}}>
        <TextBody
          style={{
            fontWeight: bold ? 'bold' : 'normal',
            color: bold ? Warna.grayscale.satu : Warna.grayscale.dua,
          }}
          title={valueTulisan}
        />
      </View>
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
      {/* column 1 */}
      <View style={{marginHorizontal: 20}}>
        <TextJudul title={data.daftarPaket.nama.toUpperCase()} />
        <TulisanFix keyTulisan={`ID Pesanan #${data._id.slice(0, 6)}`} />
        <TulisanFix
          keyTulisan="Status Diterima"
          valueTulisan={`${data.statusDiterima}`}
        />
        <TulisanFix
          keyTulisan="Status Pembayaran"
          valueTulisan={`${data.statusPembayaran}`}
        />
        <TulisanFix
          keyTulisan="Status Pesanan"
          valueTulisan={`${data.statusPesanan}`}
        />
      </View>

      {/* line */}
      <View
        style={{
          height: 8,
          backgroundColor: Warna.grayscale.empat,
          marginTop: 20,
        }}
      />
      {/* column 2 */}
      <View style={styles.wrapperInfo}>
        <TulisanFix keyTulisan="Nama Siswa" valueTulisan={data.namaSiswa} />
        <TulisanFix
          keyTulisan="Jenis Kelamin"
          valueTulisan={data.jenisKelamin}
        />
        <TulisanFix keyTulisan="Umur Siswa" valueTulisan={data.umur} />
        <TulisanFix
          keyTulisan="Alamat Lengkap"
          valueTulisan={data.alamatLengkap}
        />
        <TulisanFix
          keyTulisan="Pelajaran"
          valueTulisan={data.mataPelajaran?.nama}
        />
        <TulisanFix
          keyTulisan="Jam Pertemuan"
          valueTulisan={data.jamPelajaran}
        />
      </View>
      {/* line */}
      <View
        style={{
          height: 8,
          backgroundColor: Warna.grayscale.empat,
          marginVertical: 20,
        }}
      />
      {/* column 3 */}
      {/* rincian paket dan pertemuan */}
      <View style={styles.wrapperInfo}>
        <TextJudul title="Paket Belajar" />
        <TulisanFix
          keyTulisan={data.daftarPaket.nama}
          valueTulisan={`${data.totalPertemuan} x pertemuan`}
        />

        <TulisanFix
          keyTulisan={data.daftarPaket.keterangan}
          valueTulisan={`${formatNumber(
            parseInt(`${data.daftarPaket.harga}000`),
          )}/pertemuan`}
        />
        <Dash
          dashColor={Warna.grayscale.empat}
          dashGap={4}
          style={{
            width: '100%',
            height: 1,
            marginVertical: 10,
          }}
        />

        <TulisanFix
          bold
          keyTulisan="Total Pembayaran"
          valueTulisan={formatNumber(parseInt(`${data.totalHarga}`))}
        />
      </View>
      {/* line */}
      <View
        style={{
          height: 8,
          backgroundColor: Warna.grayscale.empat,
          marginTop: 20,
        }}
      />
      {/* column 4 */}
      {/* rincian data guru */}
      <View
        style={{
          marginVertical: 10,
          flexDirection: 'row',
          marginHorizontal: 20,
          paddingVertical: 10,
        }}>
        <GambarCustom
          resizeMode="cover"
          source={
            data.dataGuru.image === ''
              ? {
                  uri: `${apiUrl}/asset/images/noImage.png`,
                }
              : {
                  uri: `${apiUrl}/${data.dataGuru.image}`,
                }
          }
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
          <TextJudul title={data.dataGuru.nama} />
          <RatingDefault
            rating={1}
            review={data.dataGuru.Review?.length}
            style={{alignItems: 'center'}}
          />
        </View>
        {chatGuru && (
          <TouchableOpacity
            onPress={onPressChatGuru}
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
            }}>
            <Text style={{fontSize: 14, color: Warna.primary.satu}}>
              Chat Guru
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          height: 20,
          backgroundColor: Warna.grayscale.empat,
        }}
      />
    </ScrollView>
  );
};

export default withNavigation(DetailPesanan);

const styles = StyleSheet.create({
  container: {backgroundColor: Warna.abuAbuMuda, flex: 1},
  wrapper: {
    flex: 1,
    backgroundColor: Warna.putih,
    marginHorizontal: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  wrapperInfo: {
    marginHorizontal: 20,
    paddingTop: 10,
  },
  textTitleWrapper: {alignItems: 'center', marginTop: 10},
  cardWrapper: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Warna.biruMuda,
    borderRadius: 20,
    overflow: 'hidden',
  },
  dataWrapper: {padding: 10},
});
