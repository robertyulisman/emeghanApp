import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import TopLabel from '../../components/atoms/TopLabel';
import GuruItem from '../../components/molecules/GuruItem';
import {apiUrl, Warna} from '../../utils/Data';
import moment from 'moment';
import 'moment/locale/id';
import GambarCustom from '../../components/atoms/GambarCustom';
import {withNavigation} from 'react-navigation';
import TopBar from '../../components/molecules/TopBar';
import Tombol from '../../components/atoms/Tombol';
import {checkoutPesanan} from '../../config/redux/actions/checkoutAction';
import axios from 'axios';
import {getProfileUser} from '../../config/redux/actions/profileActions';
import {useDispatch, useSelector} from 'react-redux';
import {getNotification} from '../../config/redux/actions/notificationAction';

// import 'moment/min/locales/min';

const RincianPerpanjang = ({navigation}) => {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {data} = navigation.state.params;
  console.log(`data`, data);

  const Tulisan = ({title, large, style, primary}) => (
    <Text
      style={[
        {
          fontSize: large ? 18 : 14,
          fontWeight: large ? 'bold' : null,
          // marginVertical: large ? null : -5,
          color: primary ? Warna.biruTua : Warna.abuAbuTua,
        },
        style,
      ]}>
      {title}
    </Text>
  );

  const TulisanFix = ({keyTulisan, valueTulisan}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <Tulisan title={keyTulisan} />
      </View>
      <Text style={{marginHorizontal: 10}}>:</Text>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Tulisan primary title={valueTulisan} />
      </View>
    </View>
  );

  const formatNumber = num =>
    `Rp. ${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;

  const getFirstDay = () => {
    const date = new Date();
    const lokal = moment(date).locale('id');
    return moment(lokal).format('dddd, Do MMM YYYY');
  };

  const getLastDay = lastDay => {
    const date = new Date();
    const last = new Date(date.getTime() + lastDay * 24 * 60 * 60 * 1000);
    const lokal = moment(last).locale('id');
    return moment(lokal).format('dddd, Do MMM YYYY');
  };

  const getLastDay2 = lastDay => {
    const date = new Date();
    const last = new Date(date.getTime() + lastDay * 24 * 60 * 60 * 1000);
    // const lokal = moment(last).locale('id');
    return last;
  };

  const handleConfirm = () => {
    console.log('oke lagi');
    Alert.alert(
      'Perpanjang Pesanan',
      'apa kamu yakin ingin memperpanjang pesanan ?, kamu akan kehilangan data pesanan kamu yang sebelumnya dan kami akan mengganti statusnya menjadi SELESAI',
      [
        {
          text: 'batal',
        },
        {
          text: 'oke',
          onPress: () => {
            handleSubmitConfirm();
          },
        },
      ],
    );
  };

  const handleSubmitConfirm = () => {
    const dataPesanan = {
      namaSiswa: data.namaSiswa,
      jenisKelamin: data.jenisKelamin,
      umur: data.umur,
      jamPelajaran: data.jamPelajaran,
      alamatLengkap: data.alamatLengkap,
      selesai:
        data.pertemuan.durasi === undefined
          ? getLastDay2(
              parseInt(data.daftarPeket.jumlahPertemuan) +
                10 +
                parseInt(data.sisaPertemuan),
            )
          : getLastDay2(
              parseInt(data.pertemuan.durasi) + parseInt(data.sisaPertemuan),
            ),
      totalHarga: data.totalHarga,
      totalPertemuan:
        data.pertemuan.durasi === undefined
          ? `${
              parseInt(data.daftarPaket.jumlahPertemuan) +
              10 +
              parseInt(data.sisaPertemuan)
            }`
          : `${
              parseInt(data.pertemuan.durasi) + +parseInt(data.sisaPertemuan)
            }`,
      sisaPertemuan:
        data.pertemuan.durasi === undefined
          ? `${
              parseInt(data.daftarPaket.jumlahPertemuan) +
              10 +
              parseInt(data.sisaPertemuan)
            }`
          : `${
              parseInt(data.pertemuan.durasi) + +parseInt(data.sisaPertemuan)
            }`,
    };
    axios
      .post(
        `${apiUrl}/api/pesanan/assign/${data.user._id}/${data.dataGuru._id}/${data.daftarPaket._id}/${data.pertemuan._id}/${data.mataPelajaran._id}`,
        dataPesanan,
      )
      .then(res => {
        axios
          .put(`${apiUrl}/api/pesanan/update/${data._id}`, {
            statusPesanan: 'selesai',
          })
          .then(res => {
            console.log(`data selesai`, res.data),
              dispatch(getProfileUser(data.user._id, user.userType));
            dispatch(getNotification(data.user._id));

            // ToastDefault(`pesanan dengan id ${res.data._id} telah diterima`);
          })
          .catch(err => console.log(`err`, err));
        Alert.alert(
          'sukses',
          'Pesanan kamu berhasil dibuat dan menunggu persetujuan dari Guru',
          [{text: 'oke', onPress: () => navigation.navigate('Dashboard')}],
        );
        console.log('sukses perpanjang pesanan', res.data);
      })
      .catch(err => {
        Alert.alert(
          'gagal',
          `upps, mohon maaf, kayaknya ada kesalahan, pesan Error :${err}`,
        );
      });

    console.log(`dataPesanan`, dataPesanan);
  };

  return (
    <View style={{flex: 1}}>
      <TopBar title="Rincian Pesanan" left />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginHorizontal: 10,
          marginTop: -60,
          //   backgroundColor: Warna.putih,
        }}>
        <View style={styles.wrapperCard}>
          <TopLabel title="Rincian" />
          {/* rincian paket dan pertemuan */}
          <View style={styles.wrapperInfo}>
            <Tulisan
              primary
              large
              title={data.daftarPaket.nama.toUpperCase()}
            />
            <TulisanFix
              keyTulisan="Jumlah Pertemuan"
              valueTulisan={`${
                data.pertemuan.jumlahPertemuan === undefined
                  ? parseInt(data.daftarPaket.jumlahPertemuan) +
                    parseInt(data.sisaPertemuan)
                  : parseInt(data.pertemuan.jumlahPertemuan) +
                    parseInt(data.sisaPertemuan)
              } x pertemuan`}
            />
            <TulisanFix
              keyTulisan="Durasi Pertemuan"
              valueTulisan={`${
                data.pertemuan.durasi === undefined
                  ? parseInt(data.daftarPaket.jumlahPertemuan) +
                    10 +
                    parseInt(data.sisaPertemuan)
                  : parseInt(data.pertemuan.durasi) +
                    +parseInt(data.sisaPertemuan)
              } hari`}
            />

            <TulisanFix
              keyTulisan="Harga"
              valueTulisan={formatNumber(
                parseInt(`${data.daftarPaket.harga}000`),
              )}
            />
            <TulisanFix
              keyTulisan="Tanggal Mulai"
              valueTulisan={getFirstDay()}
            />
            <TulisanFix
              keyTulisan="Tanggal Berakhir"
              valueTulisan={
                data.pertemuan.durasi === undefined
                  ? getLastDay(
                      parseInt(data.daftarPeket.jumlahPertemuan) +
                        10 +
                        parseInt(data.sisaPertemuan),
                    )
                  : getLastDay(
                      parseInt(data.pertemuan.durasi) +
                        parseInt(data.sisaPertemuan),
                    )
              }
            />
          </View>
        </View>
        {/* subtotal */}
        <View style={styles.wrapperCard}>
          <TopLabel title="Subtotal" />

          <Tulisan
            style={{textAlign: 'right', marginRight: 20, marginBottom: 10}}
            large
            primary
            title={
              formatNumber(parseInt(`${data.totalHarga}`))

              // data.totalHarga !== undefined
              //   ? formatNumber(parseInt(`${data.pertemuan.totalHarga}000`))
              //   : formatNumber(parseInt(`${data.daftarPeket.harga}000`))
            }
          />
        </View>
        <View style={styles.wrapperCard}>
          <TopLabel title="Detail Data Siswa" />
          {/* rincian data siswa */}
          <View style={styles.wrapperInfo}>
            <TulisanFix keyTulisan="Data Siswa" valueTulisan={data.namaSiswa} />
            <TulisanFix
              keyTulisan="Jenis Kelamin"
              valueTulisan={data.jenisKelamin}
            />
            <TulisanFix keyTulisan="Umur Siswa" valueTulisan={data.umur} />
            <TulisanFix
              keyTulisan="Mata Pelajaran"
              valueTulisan={data.mataPelajaran.nama}
            />
            <TulisanFix
              keyTulisan="Jam Pelajaran"
              valueTulisan={data.jamPelajaran}
            />
            <TulisanFix
              keyTulisan="Alamat Lengkap"
              valueTulisan={data.alamatLengkap}
            />
          </View>
        </View>
        <View style={styles.wrapperCard}>
          <TopLabel title="Detail Data Guru" />
          {/* <GambarCustom
          resizeMode="cover"
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            alignSelf: 'flex-end',
            marginRight: 20,
            marginTop: -20,
            marginBottom: -10,
          }}
          source={
            data.dataGuru.image === ''
              ? {
                  uri: `${apiUrl}/asset/images/noImage.png`,
                }
              : {
                  uri: `${apiUrl}/${dataGuru.image}`,
                }
          }
        /> */}
          {/* rincian data guru */}
          <View style={styles.wrapperInfo}>
            <TulisanFix
              keyTulisan="Data Guru"
              valueTulisan={data.dataGuru.nama}
            />
            <TulisanFix
              keyTulisan="Hafalan"
              valueTulisan={`${data.dataGuru.hafalan} juz`}
            />
            <TulisanFix
              keyTulisan="Profile"
              valueTulisan={data.dataGuru.profile}
            />
            <TulisanFix
              keyTulisan="Alamat"
              valueTulisan={`${data.dataGuru.kelurahan} - ${data.dataGuru.kecamatan}`}
            />
          </View>
        </View>
      </ScrollView>

      <Tombol
        style={{margin: 10}}
        onPress={handleConfirm}
        primary
        title="KONFIRMASI"
      />
    </View>
  );
};

export default withNavigation(RincianPerpanjang);

const styles = StyleSheet.create({
  wrapperCard: {
    // flex: 1,
    // borderColor: Warna.abuAbuMuda,
    backgroundColor: Warna.putih,
    // borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },
  wrapperInfo: {margin: 20},
});
