import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';
import moment from 'moment';
import {Warna} from '../../utils/Data';
import TopLabel from '../../components/atoms/TopLabel';

const DetailPesananPerpanjang = data => {
  const Tulisan = ({title, large, style, primary}) => (
    <Text
      style={[
        {
          fontSize: large ? 18 : 14,
          fontWeight: large ? 'bold' : null,
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
      }}>
      <View style={{flex: 1}}>
        <Tulisan title={keyTulisan} />
      </View>
      <Text style={{marginHorizontal: 10}}>:</Text>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <Tulisan primary title={valueTulisan} />
      </View>
    </View>
  );

  const formatNumber = num =>
    `Rp. ${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;

  const formatDate = date => {
    const lokal = moment(date).locale('id');
    return moment(lokal).format('dddd, Do MMM YYYY');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
      <View style={styles.textTitleWrapper}>
        <Tulisan title="STATUS :" />
        <Tulisan primary large title={data.statusPesanan} />
      </View>
      {/* info siswa */}

      {/* info paket */}
      <View style={styles.cardWrapper}>
        <TopLabel title="Detail Pesanan Saat Ini" />

        <View style={styles.dataWrapper}>
          <TulisanFix keyTulisan="Nama Pemesan" valueTulisan={data.user.nama} />
          <TulisanFix
            keyTulisan="Tanggal Mulai"
            valueTulisan={formatDate(data.mulai)}
          />
          <TulisanFix
            keyTulisan="Tanggal Selesai"
            valueTulisan={formatDate(data.selesai)}
          />
          <TulisanFix
            keyTulisan="Status Pembayaran"
            valueTulisan={data.statusPembayaran}
          />
          <TulisanFix
            keyTulisan="Nama Paket"
            valueTulisan={data.daftarPaket.nama}
          />
          <TulisanFix
            keyTulisan="deskripsi paket"
            valueTulisan={data.daftarPaket.keterangan}
          />
          <TulisanFix
            keyTulisan="Harga Paket"
            valueTulisan={`${data.daftarPaket.harga} @pertemuan`}
          />
          <TulisanFix
            keyTulisan="Total Pertemuan"
            valueTulisan={data.totalPertemuan}
          />
          {data.totalPertemuan !== data.sisaPertemuan && (
            <TulisanFix
              keyTulisan="Sisa Pertemuan"
              valueTulisan={data.sisaPertemuan}
            />
          )}
          <TulisanFix
            keyTulisan="Total Harga"
            valueTulisan={formatNumber(parseInt(data.totalHarga))}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default withNavigation(DetailPesananPerpanjang);

const styles = StyleSheet.create({
  container: {backgroundColor: Warna.abuAbuMuda, flex: 1},
  wrapper: {
    flex: 1,
    backgroundColor: Warna.putih,
    marginHorizontal: 10,
    marginTop: -60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
