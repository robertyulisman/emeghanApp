import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import GambarLogo from '../../components/atoms/GambarLogo';
import GambarCustom from '../../components/atoms/GambarCustom';
import Tombol from '../../components/atoms/Tombol';
import FooterAuth from '../../components/molecules/FooterAuth';
import TopBar from '../../components/molecules/TopBar';
import {apiUrl, Warna} from '../../utils/Data';
import Input from '../../components/molecules/Input';
import {withNavigation} from 'react-navigation';
import {ToastDefault} from '../../utils/Fungsi';
import ModalCustom from '../../components/atoms/ModalCustom';
import InputCustom from '../../components/molecules/InputCustom';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import DropDownAlamat from '../../components/molecules/DropDownAlamat';
import {useDispatch, useSelector} from 'react-redux';
import {
  registerGuru,
  registerUser,
} from '../../config/redux/actions/authAction';
import LoadingComp from '../../components/atoms/LoadingComp';
import CheckBox from '@react-native-community/checkbox';

import IconVector from 'react-native-vector-icons/AntDesign';
import TextBody from '../../components/atoms/TextBody';
import InputNoPhone from '../../components/molecules/InputNoPhone';
import UploadFile from '../RegisterGuru/UploadFile';
import UploadImage from '../RegisterGuru/UploadImage';
import TombolBack from '../../components/atoms/TombolBack';

const RegisterGuru2 = ({navigation}) => {
  // params navigation
  const {data} = navigation.state.params;
  console.log(`data registrasi`, data);
  const disptach = useDispatch();
  const {auth, errors} = useSelector(state => state);
  const [showModal, setShowModal] = React.useState(false);
  const [error, setError] = React.useState(null);
  const handleModal = () => {
    setShowModal(!showModal);
  };
  const [loading, setLoading] = React.useState(false);
  const [imageData, setImageData] = React.useState('');
  const [ktpData, setKtpData] = React.useState('');
  const [ijazahData, setIjazahData] = React.useState('');
  const [sertifikatData, setSertifikatData] = React.useState('');
  // const [form, setForm] = React.useState({
  //   email: '',
  //   password: '',
  //   nama: '',
  //   jenisKelamin: '',
  //   tempatLahir: '',
  //   tanggalLahir: '',
  //   pendidikanTerakhir: '',
  //   umur: '',
  //   alamatLengkap: '',
  //   kecamatan: '',
  //   kelurahan: '',
  //   kabupaten_kota: '',
  //   provinsi: '',
  //   profile: '',
  //   hafalan: '',
  //   noHp: '',
  // });

  // const [provinsi, setProvinsi] = React.useState('Provinsi');
  // const [kabupaten, setKabupaten] = React.useState('Kabupaten');
  // const [kecamatan, setKecamatan] = React.useState('Kecamatan');
  // const [kelurahan, setKelurahan] = React.useState('Kelurahan');

  // const [dataProvinsi, setDataProvinsi] = React.useState([]);
  // const [dataKabupaten, setDataKabupaten] = React.useState([]);
  // const [dataKecamatan, setDataKecamatan] = React.useState([]);
  // const [dataKelurahan, setDataKelurahan] = React.useState([]);

  const [isSelected, setIsSelected] = React.useState(false);

  const handleCheckBox = () => {
    setIsSelected(!isSelected);
    // console.log('new value check box', newValue);
  };

  // React.useEffect(() => {
  //   console.log(`component did mount profile page`);
  //   axios
  //     .get(`https://dev.farizdotid.com/api/daerahindonesia/provinsi`)
  //     .then(response => {
  //       // console.log(`sukses get alamat indonesia`, response.data);
  //       setDataProvinsi(response.data.provinsi);
  //     })
  //     .catch(err => console.log(`err get alamat indonesia`, err));
  // }, []);

  // const onChangeTextInput = (value, type) => {
  //   setForm({
  //     ...form,
  //     [type]: value,
  //   });
  // };

  const uploadPhoto = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res[0].name);
      setImageData(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const uploadKtp = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      setKtpData(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const uploadIjazah = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      setIjazahData(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const uploadSertifikat = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      setSertifikatData(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  // const onChangeProvinsi = itemValue => {
  //   // console.log(`itemValue`, itemValue);
  //   setProvinsi(itemValue);
  //   axios
  //     .get(
  //       `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${itemValue.id}`,
  //     )
  //     .then(response => {
  //       // console.log(`sukses get alamat indonesia`, response.data);
  //       setDataKabupaten(response.data.kota_kabupaten);

  //       setDataKecamatan([]);
  //       setDataKelurahan([]);
  //     })
  //     .catch(err => console.log(`err get alamat indonesia`, err));
  // };

  // const onChangeKabupaten = itemValue => {
  //   // console.log(`itemValue`, itemValue);
  //   setKabupaten(itemValue);
  //   axios
  //     .get(
  //       `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${itemValue.id}`,
  //     )
  //     .then(response => {
  //       // console.log(`sukses get Kecamatan`, response.data);
  //       setDataKecamatan(response.data.kecamatan);
  //       setDataKelurahan([]);
  //     })
  //     .catch(err => console.log(`err get alamat indonesia`, err));
  // };

  // const onChangeKecamatan = itemValue => {
  //   // console.log(`itemValue`, itemValue);
  //   setKecamatan(itemValue);
  //   axios
  //     .get(
  //       `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${itemValue.id}`,
  //     )
  //     .then(response => {
  //       // console.log(`sukses get alamat indonesia`, response.data);
  //       setDataKelurahan(response.data.kelurahan);
  //     })
  //     .catch(err => console.log(`err get alamat indonesia`, err));
  // };

  // const onChangeKelurahan = itemValue => {
  //   setKelurahan(itemValue);
  // };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('nama', data.nama);
    formData.append('jenisKelamin', data.jenisKelamin);
    formData.append('tempatLahir', data.tempatLahir);
    formData.append('tanggalLahir', data.tanggalLahir);
    formData.append('pendidikanTerakhir', data.pendidikanTerakhir);
    formData.append('umur', data.umur);
    formData.append('alamatLengkap', data.alamatLengkap);

    formData.append('kecamatan', data.kecamatan);

    formData.append('kelurahan', data.kelurahan);

    formData.append('kabupaten_kota', data.kabupaten);
    formData.append('provinsi', data.provinsi);
    formData.append('profile', data.profile);
    formData.append('hafalan', data.hafalan);
    formData.append('noHp', data.noHp);
    imageData !== '' &&
      formData.append('image', {
        uri: imageData[0].uri,
        type: 'image/jpeg',
        name: imageData[0].name,
      });
    ktpData !== '' &&
      formData.append('scanKtp', {
        uri: ktpData[0].uri,
        type: 'application/pdf',
        name: ktpData[0].name,
      });

    ijazahData !== '' &&
      formData.append('scanIjazah', {
        uri: ijazahData[0]?.uri,
        type: 'application/pdf',
        name: ijazahData[0]?.name,
      });

    sertifikatData !== '' &&
      formData.append('scanSertifikat', {
        uri: sertifikatData[0]?.uri,
        type: 'application/pdf',
        name: sertifikatData[0]?.name,
      });

    // const userType = 'guru';
    // console.log(`form ajaa=======`, form);

    if (isSelected === false) {
      alert('silahkan dicentang');
    } else {
      setLoading(true);
      disptach(registerGuru(formData, navigation));
      console.log(`data registrasi`, formData);
    }

    //   axios
    //     .post(`${apiUrl}/api/guru`, formData, {
    //       'Content-Type': 'multipart/form-data',
    //     })
    //     .then(response => {
    //       console.log('response :', response.data);
    //       Alert.alert(
    //         'Sukses',
    //         'pesanan Kamu berhasil dibuat dan menunggu konfirmasi dari Guru',
    //         [
    //           {
    //             text: 'Oke',
    //             onPress: () => {
    //               navigation.navigate('Dashboard');
    //             },
    //           },
    //         ],
    //       );
    //     })
    //     .catch(error => {
    //       console.log('error :', error.response.data);
    //       setError(error.response.data);
    //     });
  };
  React.useEffect(() => {
    // if (auth.isAuthenticated) {
    //   console.log('auth register', auth);
    //   setLoading(false);
    //   navigation.navigate('Dashboard');
    // }
    if (errors) {
      setLoading(false);
      setError(errors);
    }
  }, [auth.isAuthenticated, errors]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Warna.grayscale.lima,
      }}>
      {/* ========== FORM =============== */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 20, marginTop: 10}}>
        <View>
          <TombolBack />
          <Text
            style={{
              color: Warna.grayscale.satu,
              marginTop: 30,
              fontSize: 24,
              fontFamily: 'Nunito-ExtraBold',
              // letterSpacing: 5,
            }}>
            Upload Dokumen Pendaftaran Guru
          </Text>
        </View>

        {/* attachment document */}
        <View style={{marginVertical: 10}}>
          <UploadImage
            error={error?.image}
            errorText={error?.image}
            form={imageData}
            onPress={uploadPhoto}
            style={{marginRight: 5}}
            title="Foto Profil"
            deskripsi="Upload Foto Profil"
          />
          <UploadImage
            error={error?.scanKtp}
            errorText={error?.scanKtp}
            form={ktpData}
            onPress={uploadKtp}
            style={{marginRight: 5}}
            title="Foto KTP"
            deskripsi="Upload Foto KTP"
          />
          <UploadImage
            error={error?.scanIjazah}
            errorText={error?.scanIjazah}
            form={ijazahData}
            onPress={uploadIjazah}
            style={{marginRight: 5}}
            title="Foto Ijazah"
            deskripsi="Upload Foto Ijazah"
          />

          <UploadImage
            error={error?.scanSertifikat}
            errorText={error?.scanSertifikat}
            form={sertifikatData}
            onPress={uploadSertifikat}
            style={{marginRight: 5}}
            title="Foto Sertifikat"
            deskripsi="Upload Foto Sertifikat"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <CheckBox
            value={isSelected}
            onValueChange={handleCheckBox}
            style={{marginRight: 10}}
            tintColors={{
              true: Warna.primary.satu,
              false: Warna.grayscale.tiga,
            }}
          />
          <Text
            style={{
              color: Warna.grayscale.satu,
              fontSize: 14,
              fontFamily: 'Nunito-Regular',
            }}>
            Saya setuju dengan{' '}
            <Text
              style={{
                color: Warna.primary.satu,
                fontSize: 14,
                fontFamily: 'Nunito-Regular',
              }}>
              Syarat dan Ketentuan{' '}
            </Text>
            dan{' '}
            <Text
              style={{
                color: Warna.primary.satu,
                fontSize: 14,
                fontFamily: 'Nunito-Regular',
              }}>
              Kebijakan Privasi{' '}
            </Text>
            yang berlaku
          </Text>
        </View>

        {loading ? (
          <LoadingComp primary />
        ) : (
          <View style={{marginBottom: 20}}>
            <Tombol
              style={{marginTop: 20}}
              primary
              title="Lanjutkan"
              onPress={handleSubmit}
            />

            <FooterAuth
              rightText="Masuk disini"
              leftText="Sudah Punya Akun Guru ?"
              onPress={() => navigation.navigate('LoginGuru')}
            />
          </View>
        )}
      </ScrollView>

      <ModalCustom
        isModalVisible={showModal}
        content={
          <View
            style={{
              backgroundColor: Warna.putih,
              marginHorizontal: 10,
            }}>
            <View
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: Warna.abuAbuMuda,
                // flex: 1,
              }}>
              <Text style={{fontSize: 16, fontFamily: 'Nunito-Regular'}}>
                Harap Dipersiapkan
              </Text>
            </View>

            <Text
              style={{
                margin: 10,
                fontSize: 14,
                marginBottom: 20,
                color: Warna.abuAbuSedang,
                lineHeight: 24,
                fontFamily: 'Nunito-Regular',
              }}>
              Sebelum antum mendaftar, Harap Siapkan KTP/ Pas Poto/ Ijazah
              Terakhir/ Sertifikat Prestasi agar proses pendaftaran berlangsung
              cepat
            </Text>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Tombol onPress={handleModal} primary title="Daftar" />
            </View>
          </View>
        }
        onBackButtonPress={handleModal}
      />
    </View>
  );
};

export default withNavigation(RegisterGuru2);
