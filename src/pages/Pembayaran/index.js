import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {useSelector} from 'react-redux';
import GambarCustom from '../../components/atoms/GambarCustom';
import Pembatas from '../../components/atoms/Pembatas';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';
import {formatNumber} from '../../utils/Fungsi';
import BottomSheet from 'react-native-bottomsheet-reanimated';
import Tombol from '../../components/atoms/Tombol';
import moment from 'moment';

const Pembayaran = ({navigation}) => {
  const {profile} = useSelector(state => state.profile);
  const sheetRef = React.useRef(null);
  const {dataOrder, type} = navigation.state.params;
  console.log(`dataOrder`, dataOrder.total);
  console.log(`type`, type);
  console.log(`profile`, profile);

  const Card = ({title, desc, image, onPress}) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: Warna.grayscale.lima,
        shadowColor: Warna.grayscale.tiga,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
      }}>
      <GambarCustom style={{width: 50, height: 30}} source={image} />
      <View style={{flex: 1, marginLeft: 10}}>
        <TextJudul title={title} />
        {desc && <TextBody title={desc} />}
      </View>
    </TouchableOpacity>
  );

  const List = ({textKey, textValue, big}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      }}>
      <View style={{flex: 1}}>
        <TextBody title={textKey} />
      </View>
      <View style={{flex: 1}}>
        {big ? <TextJudul title={textValue} /> : <TextBody title={textValue} />}
      </View>
    </View>
  );
  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <TopBarNew title="Pilih Metode Pembayaran" />
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
            marginBottom: 20,
          }}>
          <TextBody title="Total" />
          <TextJudul title={`${formatNumber(dataOrder.total)}`} />
        </View>
        <Pembatas />
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
          }}>
          <TextJudul title="Cash" />
          <Card
            onPress={() => sheetRef.current.snapTo(0)}
            title="Bayar di Tempat"
            desc="kamu bisa melakukan pembayaran di tempat/ toko yang bersangkutan"
            image={require('../../assets/gambar/cod.png')}
          />
          <TextJudul style={{marginTop: 10}} title="Transfer Bank" />
          <Card
            title="Bank Mandiri"
            image={require('../../assets/gambar/mandiri.png')}
          />
          <Card
            title="Bank BCA"
            image={require('../../assets/gambar/bca.png')}
          />
          <Card
            title="Bank BNI"
            image={require('../../assets/gambar/bni.png')}
          />
          <Card
            title="Bank BRI"
            image={require('../../assets/gambar/bri.png')}
          />

          <TextJudul style={{marginTop: 10}} title="C - Store" />
          <Card
            title="Alfamart"
            image={require('../../assets/gambar/alfamart.png')}
          />
          <Card
            title="Indomaret"
            image={require('../../assets/gambar/indomaret.png')}
          />
        </View>
      </ScrollView>

      <BottomSheet
        bottomSheerColor="#FFFFFF"
        ref={sheetRef}
        initialPosition={0} //200, 300
        snapPoints={[600, 200, 0]}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
        header={
          <View>
            <TextJudul title="Detail Transaksi" />
          </View>
        }
        body={
          <View
            style={{
              //   padding: 16,
              height: 450,
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  padding: 16,
                }}>
                <TextJudul title="Data Pemesan" />

                <List textKey="Nama" textValue={profile.nama} />
                <List textKey="No Handphone" textValue={profile.noHp} />
                <List textKey="Email" textValue={profile.email} />
                {/* <List
                  textKey="Alamat"
                  textValue={`${profile.alamatLengkap}, kel. ${profile.kelurahan}, kec. ${profile.kecamatan}, kab. ${profile.kabupaten_kota}, prov. ${profile.provinsi} - Indonesia`}
                /> */}
              </View>
              <Pembatas style={{marginVertical: 10}} />
              <View
                style={{
                  padding: 16,
                }}>
                <TextJudul title="Rincian Pesanan" />

                <List
                  big
                  textKey="id Pesanan"
                  textValue={`#${profile.nama
                    .toLowerCase()
                    .replace(' ', '')
                    .slice(0, 3)}${new Date()
                    .getTime()
                    .toString()
                    .slice(0, 6)}`}
                />
                {type === 'deposit' ? null : (
                  <List textKey="Nama Tempat" textValue={dataOrder.nama} />
                )}
                <List
                  textKey="Waktu dan Tanggal"
                  textValue={`${moment(dataOrder.waktu).format(
                    'DD MMMM YYYY h:mm a',
                  )}`}
                />
                {type === 'deposit' ? null : (
                  <List textKey="Durasi" textValue={dataOrder.durasi} />
                )}
                <List textKey="Keterangan" textValue={type} />
                <List textKey="Metode Pembayaran" textValue="COD" />

                <List
                  big
                  textKey="Total"
                  textValue={`${formatNumber(dataOrder.total)}`}
                />
              </View>

              <Tombol
                onPress={() => {
                  sheetRef.current.snapTo(2), navigation.navigate('DetailPage');
                }}
                style={{margin: 16}}
                primary
                title="Selanjutnya"
              />
            </ScrollView>
          </View>
        }
      />
    </View>
  );
};

export default withNavigation(Pembayaran);
