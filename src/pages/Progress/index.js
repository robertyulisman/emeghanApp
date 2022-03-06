import React from 'react';
import {Text, View, ToastAndroid, StyleSheet, Alert} from 'react-native';
import GambarLogo from '../../components/atoms/GambarLogo';
import TopBar from '../../components/molecules/TopBar';
import {Warna} from '../../utils/Data';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import Paket from './Paket';
import ProfilSiswa from './ProfilSiswa';
import DaftarGuru from './DaftarGuru';
import DaftarPertemuan from './DaftarPertemuan';
import Rincian from './Rincian';
import {withNavigation} from 'react-navigation';
import {useSelector, useDispatch} from 'react-redux';
import {
  changeStatusCheckout,
  checkoutPesanan,
} from '../../config/redux/actions/checkoutAction';
import {ToastDefault} from '../../utils/Fungsi';
import {getProfileUser} from '../../config/redux/actions/profileActions';
import TopBarNew from '../../components/molecules/TopBarNew';

const Progress = ({navigation}) => {
  const {profile} = useSelector(state => state.profile);
  const {user} = useSelector(state => state.auth);
  const {status} = useSelector(state => state.checkout);
  const dispatch = useDispatch();
  const [errors, setErrors] = React.useState(false);
  const [dataPaket, setDataPaket] = React.useState([]);
  const [dataSiswa, setDataSiswa] = React.useState({
    nama: '',
    umur: '',
    alamatLengkap: '',
  });
  const [jenisKelamin, setJenisKelamin] = React.useState(null);
  const [jamPertemuan, setJamPertemuan] = React.useState(null);
  const [dataGuru, setDataGuru] = React.useState([]);
  const [dataPelajaran, setDataPelajaran] = React.useState(null);
  const [dataPertemuan, setDataPertemuan] = React.useState([]);
  const [dataPertemuanTerpilih, setDataPertemuanTerpilih] = React.useState({});

  const getLastDay = lastDay => {
    const date = new Date();
    const last = new Date(date.getTime() + lastDay * 24 * 60 * 60 * 1000);
    // const lokal = moment(last).locale('id');
    return last;
  };

  const formatNumber = num =>
    num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  const handleSubmit_checkout = () => {
    const idPertemuan =
      dataPertemuanTerpilih.jumlahPertemuan === undefined
        ? dataPaket._id
        : dataPertemuanTerpilih._id;

    const dataPesanan = {
      namaSiswa: dataSiswa.nama,
      jenisKelamin: jenisKelamin?.nama,
      umur: dataSiswa.umur,
      jamPelajaran: jamPertemuan?.nama,
      alamatLengkap: dataSiswa.alamatLengkap,
      selesai:
        dataPertemuanTerpilih.durasi === undefined
          ? getLastDay(parseInt(dataPaket.jumlahPertemuan) + 10)
          : getLastDay(dataPertemuanTerpilih.durasi),
      totalHarga:
        dataPertemuanTerpilih.totalHarga !== undefined
          ? `${dataPertemuanTerpilih.totalHarga}000`
          : `${dataPaket.harga}000`,
      totalPertemuan:
        dataPertemuanTerpilih.jumlahPertemuan === undefined
          ? dataPaket.jumlahPertemuan
          : dataPertemuanTerpilih.jumlahPertemuan,
      sisaPertemuan:
        dataPertemuanTerpilih.jumlahPertemuan === undefined
          ? dataPaket.jumlahPertemuan
          : dataPertemuanTerpilih.jumlahPertemuan,
    };
    if (
      dataSiswa.nama === '' ||
      jenisKelamin === null ||
      dataSiswa.umur === '' ||
      jamPertemuan === null ||
      dataSiswa.alamatLengkap === '' ||
      dataPelajaran === null
    ) {
      Alert.alert(
        'Error',
        'upps, kayaknya ada kesalahan, pastikan semua form sudah kamu isi lengkap',
      );
    } else {
      dispatch(
        checkoutPesanan(
          profile._id,
          dataGuru._id,
          dataPaket._id,
          idPertemuan,
          dataPelajaran._id,
          dataPesanan,
        ),
      );
    }

    // console.log(`profile`, profile._id);
    // console.log(`dataGuru`, dataGuru._id);
    // console.log(`dataPaket`, dataPaket._id);
    // console.log(`idPertemuan`, idPertemuan);
    // console.log(`dataPelajaran`, dataPelajaran._id);
    // console.log(`dataPesanan`, dataPesanan);
  };

  React.useEffect(() => {
    if (status === 'berhasil') {
      Alert.alert(
        'Sukses',
        'pesanan Kamu berhasil dibuat dan menunggu konfirmasi dari Guru',
        [
          {
            text: 'Oke',
            onPress: () => {
              // setShowBox(false);
              dispatch(getProfileUser(profile._id, user.userType));
              dispatch(changeStatusCheckout());
              navigation.navigate('Dashboard');
              console.log(`status`, status);
            },
          },
        ],
      );
      // ToastDefault(
      //   'pesanan Kamu berhasil dibuat dan menunggu konfirmasi dari Guru',
      // );
    }
  }, [status]);

  const onNextStepPaket = () => {
    if (dataPaket.nama !== undefined) {
      setErrors(false);
      // ToastAndroid.show(`Paket ${dataPaket.nama} dipilih`, ToastAndroid.SHORT);
    } else {
      setErrors(true);
      ToastAndroid.show(
        'Pilih salah satu paket yg tersedia',
        ToastAndroid.SHORT,
      );
    }
  };

  // const onNextStepPertemuan = () => {
  //   console.log(`dataPertemuan`, Object.keys(dataPertemuanTerpilih).length);
  //   if (Object.keys(dataPertemuanTerpilih).length > 0) {
  //     setErrors(false);
  //     // ToastAndroid.show(
  //     //   `Paket ${dataPertemuanTerpilih.nama} dipilih`,
  //     //   ToastAndroid.SHORT,
  //     // );
  //     console.log(`dataPertemuan`, dataPertemuanTerpilih);
  //   } else {
  //     setErrors(true);
  //     ToastAndroid.show('Pilih Jumlah Pertemuan', ToastAndroid.SHORT);
  //   }
  // };

  //styling tombol NEXT
  const nextStyle = {
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: Warna.primary.satu,
  };

  //styling tombol PREV
  const prevStyle = {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: Warna.primary.satu,
  };
  //styling text NEXT dan PREV
  const NextTextStyle = {fontSize: 16, color: Warna.putih};
  const NextPrevStyle = {fontSize: 16, color: Warna.primary.satu};
  return (
    <View style={styles.container}>
      {/* <TopBar left title="Pesan Guru" /> */}
      <TopBarNew title="Pesan Guru" />
      <View style={styles.itemPackageWrapper}>
        <ProgressSteps
          activeStepIconBorderColor={errors ? Warna.merah : Warna.primary.satu}
          completedProgressBarColor={Warna.primary.satu}
          completedLabelColor={Warna.primary.satu}
          completedStepIconColor={Warna.primary.satu}
          activeLabelColor={errors ? Warna.merah : Warna.primary.satu}
          labelFontSize={12}
          borderWidth={2}
          topOffset={10}
          activeStep={0}
          // disabledStepNumColor={Warna.grayscale.empat}
          marginBottom={20}>
          {/* Pilih Paket */}
          <ProgressStep
            label="Paket"
            nextBtnTextStyle={NextTextStyle}
            nextBtnStyle={nextStyle}
            nextBtnText="Lanjutkan"
            onNext={onNextStepPaket}
            // nextBtnDisabled={!errors}
            errors={errors}>
            <Paket
              paket={data => {
                setDataPaket(data);
                setDataPertemuan(data.pertemuan);
              }}
            />
          </ProgressStep>

          {/* Pilih pertemuan */}
          <ProgressStep
            nextBtnTextStyle={NextTextStyle}
            previousBtnTextStyle={NextPrevStyle}
            nextBtnText="Lanjutkan"
            previousBtnText="Sebelumnya"
            nextBtnStyle={nextStyle}
            // onNext={onNextStepPertemuan}
            previousBtnStyle={prevStyle}
            errors={errors}
            label="Pertemuan">
            <DaftarPertemuan
              Pertemuan={data => setDataPertemuanTerpilih(data)}
              data={dataPertemuan}
              namaPaket={dataPaket.nama}
            />
          </ProgressStep>

          {/* daftarkan data siswa */}
          <ProgressStep
            nextBtnTextStyle={NextTextStyle}
            previousBtnTextStyle={NextPrevStyle}
            nextBtnText="Lanjutkan"
            previousBtnText="Sebelumnya"
            nextBtnStyle={nextStyle}
            previousBtnStyle={prevStyle}
            label="Daftar"
            onNext={() => {
              // console.log(`ini data yg diambil`, dataSiswa);
            }}>
            <ProfilSiswa
              data={dataSiswa}
              setData={setDataSiswa}
              dataPelajaran={dataPelajaran}
              setDataPelajaran={setDataPelajaran}
              jenisKelamin={jenisKelamin}
              setJenisKelamin={setJenisKelamin}
              jamPertemuan={jamPertemuan}
              setJamPertemuan={setJamPertemuan}
              dataPaket={dataPaket}
              dataPertemuanTerpilih={dataPertemuanTerpilih}
            />
          </ProgressStep>

          {/* Pilih guru */}
          <ProgressStep
            nextBtnTextStyle={NextTextStyle}
            previousBtnTextStyle={NextPrevStyle}
            nextBtnText="Lanjutkan"
            previousBtnText="Sebelumnya"
            nextBtnStyle={nextStyle}
            previousBtnStyle={prevStyle}
            label="Pilih Guru">
            <View style={{flex: 1}}>
              <DaftarGuru
                Guru={data => {
                  setDataGuru(data);
                }}
              />
            </View>
          </ProgressStep>

          {/* halaman rincian dan checkout */}
          <ProgressStep
            nextBtnTextStyle={NextTextStyle}
            previousBtnTextStyle={NextPrevStyle}
            nextBtnText="Lanjutkan"
            previousBtnStyle={prevStyle}
            finishBtnText="Checkout"
            previousBtnText="Sebelumnya"
            nextBtnStyle={nextStyle}
            // previousBtnDisabled={true}
            onSubmit={handleSubmit_checkout}
            // console.log('ini handle onsubmit', form.namaPaket);
            // this.handleOnSubmit;
            // navigation.navigate('CheckOut');

            label="Rincian">
            <Rincian
              dataGuru={dataGuru}
              dataPaket={dataPaket}
              dataSiswa={dataSiswa}
              dataPertemuanTerpilih={dataPertemuanTerpilih}
              dataPelajaran={dataPelajaran}
            />
          </ProgressStep>
        </ProgressSteps>
      </View>
      {/* <View style={styles.background}>
        <View style={styles.cardWrapper}> */}
      {/* <View style={styles.logoWrapper}>
            <GambarLogo hitam kecil />
          </View> */}
      {/* </View>
      </View> */}
    </View>
  );
};

export default withNavigation(Progress);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Warna.grayscale.lima,
  },
  background: {
    marginHorizontal: 20,
    // marginTop: 60,
  },
  cardWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: Warna.putih,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
    paddingBottom: 100,
  },
  logoWrapper: {alignItems: 'center'},
  itemPackageWrapper: {marginHorizontal: 20, marginVertical: 10, flex: 1},
});

// export class Progress extends Component {
//   constructor() {
//     super();
//     this.form = {

//       errors: false,
//       profileIsUpdate: false,
//     };
//   }

//   render() {
//     const {errors, profileIsUpdate} = this.form;

//     return (

//     );
//   }
// }

// export default Progress;
