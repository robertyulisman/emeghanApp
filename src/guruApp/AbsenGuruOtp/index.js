import React from 'react';
import {View, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';

// component
import {apiUrl, Warna} from '../../utils/Data';
import {withNavigation} from 'react-navigation';
import OtpInPut from '../../components/molecules/OtpInPut';
import axios from 'axios';
import {ToastDefault} from '../../utils/Fungsi';
import {getProfileUser} from '../../config/redux/actions/profileActions';
import LoadingComp from '../../components/atoms/LoadingComp';
import TopBarNew from '../../components/molecules/TopBarNew';
import TextJudul from '../../components/atoms/TextJudul';
import TextBody from '../../components/atoms/TextBody';
import TextHeading from '../../components/atoms/TextHeading';

const AbsenGuruOtp = ({navigation}) => {
  // params
  const {data} = navigation.state.params;
  console.log(`data absensi`, data.absensiGuru.length + 1);
  const {profile} = useSelector(state => state.profile);
  const {user} = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [otp, setOtp] = React.useState('');

  // React.useEffect(() => {
  //   const pesananonGoing = profile.pesanan.filter(
  //     data =>
  //       data.statusDiterima === 'diterima' &&
  //       data.statusPembayaran === 'lunas' &&
  //       data.statusPesanan === 'sedang berlangsung',
  //   );
  //   setDataOnGoing(pesananonGoing);
  // }, [profile]);

  const handleSentOtp = () => {
    setIsLoading(true);
    axios.post(`${apiUrl}/api/absensi/sendotp/${data._id}`).then(res => {
      ToastDefault('kode OTP berhasil dikirim');
      setIsLoading(false);

      console.log(`berhasil kirim kode otp`, res.data);
    });
  };

  const handleConfirmAbsen = code => {
    setIsLoading(true);
    const newData = {
      pertemuanKe: data.absensiGuru.length + 1,
      otp: code,
    };
    console.log('okeeeee confirmed', newData);
    // console.log('codeeeeee', code);
    axios
      .post(`${apiUrl}/api/absensi/confirm`, newData)
      .then(res => {
        getProfileUser(profile._id, user.userType);
        ToastDefault('berhasil konfirmasi');

        console.log(`kode otp terkonfirmasi`, res.data);
        setOtp('');
        setIsLoading(false);
        navigation.navigate('DashboardGuru');
      })
      .catch(err => {
        console.log(`error konfirmasi`, err.response.data);
        setError(err.response.data);
        setIsLoading(false);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      <StatusBar backgroundColor={Warna.grayscale.lima} />
      <TopBarNew title={data.namaSiswa} />
      <ScrollView showsVerticalScrollIndicator={false} style={{margin: 20}}>
        <TextBody
          style={{marginBottom: 10}}
          title={`Pertemuan ke ${data.absensiGuru.length + 1}`}
        />
        <TextHeading title="Masukkan Kode Absensi" />
        <TextBody
          style={{marginVertical: 10}}
          title="Kode absensi dikirim pada akun siswa, silahkan cek di notifikasi, konfirmasi kepada siswa untuk mendapatkan kode absensi saat hadir pertemuan pembelajaran"
        />

        {/* otp */}
        <OtpInPut
          // secureTextEntry
          code={otp}
          onCodeChanged={value => setOtp(value)}
          onCodeFilled={code => handleConfirmAbsen(code)}
        />
        {error !== '' && (
          <TextBody
            style={{
              color: Warna.merah,
              marginTop: 20,
              textAlign: 'center',
              marginHorizontal: 20,
            }}
            title={error}
          />
        )}

        {isLoading && <LoadingComp primary />}

        <TextBody
          style={{marginTop: 10, textAlign: 'center'}}
          title="Siswa belum menerima kode absensi?"
        />
        <TouchableOpacity onPress={handleSentOtp}>
          <TextJudul
            style={{color: Warna.primary.satu, textAlign: 'center'}}
            title="Kirim Ulang Kode Absensi"
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default withNavigation(AbsenGuruOtp);
