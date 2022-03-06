import React from 'react';
import {View, ScrollView, Alert, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {withNavigation} from 'react-navigation';

// component
import {apiUrl, Warna} from '../../utils/Data';
import axios from 'axios';
import {ToastDefault} from '../../utils/Fungsi';
import LoadingComp from '../../components/atoms/LoadingComp';
import TopBarNew from '../../components/molecules/TopBarNew';
import Tombol from '../../components/atoms/Tombol';
import TextJudul from '../../components/atoms/TextJudul';
import TextBody from '../../components/atoms/TextBody';

const AbsenGuru = ({navigation}) => {
  const {profile} = useSelector(state => state.profile);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dataOnGoing, setDataOnGoing] = React.useState([]);

  React.useEffect(() => {
    const pesananonGoing = profile.pesanan.filter(
      data =>
        data.statusDiterima === 'diterima' &&
        data.statusPembayaran === 'lunas' &&
        data.statusPesanan === 'sedang berlangsung',
    );
    setDataOnGoing(pesananonGoing);
  }, [profile]);

  const handleSentOtp = item => {
    console.log(`item._id`, item._id);
    setIsLoading(true);
    axios.post(`${apiUrl}/api/absensi/sendotp/${item._id}`).then(res => {
      ToastDefault('kode OTP berhasil dikirim');
      setIsLoading(false);
      navigation.navigate('AbsenGuruOtp', {
        data: item,
      });
      console.log(`berhasil kirim kode otp`, res.data);
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      <StatusBar backgroundColor={Warna.grayscale.lima} />
      <TopBarNew title="Absensi" />
      {isLoading && <LoadingComp primary />}
      <ScrollView showsVerticalScrollIndicator={false}>
        {dataOnGoing.map(item => {
          return (
            <View
              key={item._id}
              style={{
                marginHorizontal: 20,
                backgroundColor: Warna.grayscale.lima,
                borderRadius: 16,
                marginVertical: 8,
                shadowColor: Warna.grayscale.tiga,
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,

                elevation: 25,
                padding: 15,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextJudul title={item.namaSiswa} />
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
                      title={item.sisaPertemuan}
                    />
                  </View>
                </View>
              </View>
              <TextBody
                style={{marginBottom: 10}}
                title={`${item.daftarPaket.nama} ${item.totalPertemuan} Pertemuan`}
              />

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    backgroundColor: Warna.primary.lima,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                  }}>
                  <TextBody title={item.mataPelajaran.nama} />
                </View>
                <TextBody
                  style={{marginBottom: 10}}
                  title={`Pertemuan ke ${item.absensiGuru.length + 1}`}
                />
              </View>

              <Tombol
                disabled={isLoading}
                onPress={() => handleSentOtp(item)}
                style={{paddingHorizontal: 15, marginTop: 20}}
                title="Request Absensi"
                secondary
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default withNavigation(AbsenGuru);
