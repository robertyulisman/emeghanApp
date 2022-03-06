import React from 'react';
import {View, Text} from 'react-native';
import {Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tombol from '../atoms/Tombol';

const CaraPesan = ({closeModal}) => {
  const Line = () => (
    <View
      style={{
        width: 2,
        height: 10,
        backgroundColor: Warna.biruMuda,
        marginVertical: 3,
        alignSelf: 'center',
      }}
    />
  );
  const Step = ({title, subtitle, icon, content}) => (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 10,
      }}>
      <View
        style={{
          backgroundColor: content ? null : Warna.biruMuda,
          borderRadius: 25,
          width: 50,
          height: content ? null : 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
          alignSelf: 'center',
        }}>
        {content ? content : <Icon name={icon} color={Warna.putih} size={30} />}
      </View>

      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 16,
            color: Warna.biruMuda,
          }}>
          {title}
        </Text>
        <Text>{subtitle}</Text>
      </View>
    </View>
  );
  return (
    <View
      style={{
        backgroundColor: Warna.putih,
        zIndex: 999,
        margin: 10,
        // paddingBottom: 10,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          color: Warna.biruMuda,
          marginBottom: 20,
          marginTop: 10,
        }}>
        CARA PESAN GURU
      </Text>
      <Step
        title="DAFTAR"
        subtitle="Isi Formulir Pendafaran Secara Lengkap Dan Benar"
        icon="pencil"
      />
      <Step
        content={
          <>
            <Line />
            <Line />
            <Line />
          </>
        }
      />

      <Step
        title="BAYAR"
        subtitle="Lakukan Pembayaran Ke Nomor Rekening Yang Tercantum Setelah Mendaftar"
        icon="money"
      />
      <Step
        content={
          <>
            <Line />
            <Line />
            <Line />
          </>
        }
      />
      <Step
        title="KONFIRMASI"
        subtitle="Konfirmasi Pembayaran Seperti Yang Di Beritahukan Setelah Pembayaran"
        icon="rotate-left"
      />
      <Step
        content={
          <>
            <Line />
            <Line />
            <Line />
          </>
        }
      />
      <Step
        title="VERIFIKASI SUKSES"
        subtitle="Selamat Verifikasi Pembayaranmu Sukses, Data Guru Akan Dikirimkan Melalui Kontak Yang Anda Daftarkan, Belajar Deh"
        icon="check"
      />
      <Tombol title="TUTUP" primary style={{margin: 10}} onPress={closeModal} />
    </View>
  );
};

export default CaraPesan;
