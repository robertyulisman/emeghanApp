import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TopLabel from '../../components/atoms/TopLabel';
import GuruItem from '../../components/molecules/GuruItem';
import {apiUrl, Warna} from '../../utils/Data';
import moment from 'moment';
import 'moment/locale/id';
import GambarCustom from '../../components/atoms/GambarCustom';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import Dash from 'react-native-dash';
import RatingDefault from '../../components/atoms/RatingDefault';
// import 'moment/min/locales/min';

const Rincian = ({
  dataGuru,
  dataPaket,
  dataSiswa,
  dataPertemuanTerpilih,
  dataPelajaran,
}) => {
  // console.log('data guru fix', dataGuru);
  // console.log('data paket fix', dataPaket);
  // console.log('data siswa fix', dataSiswa);
  // console.log('data pertemuan fix', dataPertemuanTerpilih);
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

  return (
    <View>
      {/* rincian data siswa */}
      <View style={styles.wrapperInfo}>
        <TulisanFix keyTulisan="Nama Siswa" valueTulisan={dataSiswa.nama} />
        <TulisanFix
          keyTulisan="Jenis Kelamin"
          valueTulisan={dataSiswa.jenisKelamin}
        />
        <TulisanFix keyTulisan="Umur Siswa" valueTulisan={dataSiswa.umur} />
        <TulisanFix
          keyTulisan="Alamat Lengkap"
          valueTulisan={dataSiswa.alamatLengkap}
        />
        <TulisanFix keyTulisan="Pelajaran" valueTulisan={dataPelajaran?.nama} />
        <TulisanFix
          keyTulisan="Jam Pertemuan"
          valueTulisan={dataSiswa.jamPertemuan}
        />
      </View>
      {/* line */}
      <View
        style={{
          height: 8,
          backgroundColor: Warna.grayscale.empat,
        }}
      />

      {/* rincian paket dan pertemuan */}
      <View style={styles.wrapperInfo}>
        <TextJudul title="Paket Belajar" />
        <TulisanFix
          keyTulisan={dataPaket.nama}
          valueTulisan={`${
            dataPertemuanTerpilih.jumlahPertemuan === undefined
              ? dataPaket.jumlahPertemuan
              : dataPertemuanTerpilih.jumlahPertemuan
          } x pertemuan`}
        />

        <TulisanFix
          keyTulisan={dataPaket.keterangan}
          valueTulisan={`${formatNumber(
            parseInt(`${dataPaket.harga}000`),
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
          valueTulisan={
            dataPertemuanTerpilih.totalHarga !== undefined
              ? formatNumber(parseInt(`${dataPertemuanTerpilih.totalHarga}000`))
              : formatNumber(parseInt(`${dataPaket.harga}000`))
          }
        />
      </View>
      {/* line */}
      <View
        style={{
          height: 8,
          backgroundColor: Warna.grayscale.empat,
        }}
      />
      {/* rincian data guru */}
      <View style={{flexDirection: 'row', padding: 14}}>
        <GambarCustom
          resizeMode="cover"
          source={
            dataGuru.image === ''
              ? {
                  uri: `${apiUrl}/asset/images/noImage.png`,
                }
              : {
                  uri: `${apiUrl}/${dataGuru.image}`,
                }
          }
          style={{
            height: 48,
            width: 48,
            borderRadius: 24,
            borderColor: Warna.grayscale.empat,
            borderWidth: 1,
          }}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <TextJudul title={dataGuru.nama} />

          <RatingDefault
            rating={1}
            review={dataGuru.Review?.length}
            style={{alignItems: 'center'}}
          />
        </View>
      </View>
      {/* line */}
      <View
        style={{
          height: 20,
          backgroundColor: Warna.grayscale.empat,
        }}
      />
    </View>
  );
};

export default Rincian;

const styles = StyleSheet.create({
  wrapperCard: {
    flex: 1,
    borderColor: Warna.abuAbuMuda,
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },
  wrapperInfo: {margin: 10},
});
