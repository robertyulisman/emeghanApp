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
import UploadImage from './UploadImage';
import UploadFile from './UploadFile';
import RNFS from 'react-native-fs';
import DropDownAlamat from '../../components/molecules/DropDownAlamat';
import {useDispatch, useSelector} from 'react-redux';
import {
  registerGuru,
  registerUser,
} from '../../config/redux/actions/authAction';
import LoadingComp from '../../components/atoms/LoadingComp';

import IconVector from 'react-native-vector-icons/AntDesign';
import TextBody from '../../components/atoms/TextBody';
import InputNoPhone from '../../components/molecules/InputNoPhone';
import TombolBack from '../../components/atoms/TombolBack';

const RegisterGuru = ({navigation}) => {
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
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    nama: '',
    jenisKelamin: '',
    tempatLahir: '',
    tanggalLahir: '',
    pendidikanTerakhir: '',
    umur: '',
    alamatLengkap: '',
    kecamatan: '',
    kelurahan: '',
    kabupaten_kota: '',
    provinsi: '',
    profile: '',
    hafalan: '',
    noHp: '',
  });

  const [provinsi, setProvinsi] = React.useState('Provinsi');
  const [kabupaten, setKabupaten] = React.useState('Kabupaten');
  const [kecamatan, setKecamatan] = React.useState('Kecamatan');
  const [kelurahan, setKelurahan] = React.useState('Kelurahan');

  const [dataProvinsi, setDataProvinsi] = React.useState([]);
  const [dataKabupaten, setDataKabupaten] = React.useState([]);
  const [dataKecamatan, setDataKecamatan] = React.useState([]);
  const [dataKelurahan, setDataKelurahan] = React.useState([]);

  React.useEffect(() => {
    console.log(`component did mount profile page`);
    axios
      .get(`https://dev.farizdotid.com/api/daerahindonesia/provinsi`)
      .then(response => {
        // console.log(`sukses get alamat indonesia`, response.data);
        setDataProvinsi(response.data.provinsi);
      })
      .catch(err => console.log(`err get alamat indonesia`, err));
  }, []);

  const onChangeTextInput = (value, type) => {
    setForm({
      ...form,
      [type]: value,
    });
  };

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
        type: [DocumentPicker.types.pdf],
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
        type: [DocumentPicker.types.pdf],
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
        type: [DocumentPicker.types.pdf],
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

  const onChangeProvinsi = itemValue => {
    // console.log(`itemValue`, itemValue);
    setProvinsi(itemValue);
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${itemValue.id}`,
      )
      .then(response => {
        // console.log(`sukses get alamat indonesia`, response.data);
        setDataKabupaten(response.data.kota_kabupaten);

        setDataKecamatan([]);
        setDataKelurahan([]);
      })
      .catch(err => console.log(`err get alamat indonesia`, err));
  };

  const onChangeKabupaten = itemValue => {
    // console.log(`itemValue`, itemValue);
    setKabupaten(itemValue);
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${itemValue.id}`,
      )
      .then(response => {
        // console.log(`sukses get Kecamatan`, response.data);
        setDataKecamatan(response.data.kecamatan);
        setDataKelurahan([]);
      })
      .catch(err => console.log(`err get alamat indonesia`, err));
  };

  const onChangeKecamatan = itemValue => {
    // console.log(`itemValue`, itemValue);
    setKecamatan(itemValue);
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${itemValue.id}`,
      )
      .then(response => {
        // console.log(`sukses get alamat indonesia`, response.data);
        setDataKelurahan(response.data.kelurahan);
      })
      .catch(err => console.log(`err get alamat indonesia`, err));
  };

  const onChangeKelurahan = itemValue => {
    setKelurahan(itemValue);
  };

  const handleSubmit = () => {
    // setLoading(true);
    // const formData = new FormData();
    // formData.append('email', form.email);
    // formData.append('password', form.password);
    // formData.append('nama', form.nama);
    // formData.append('jenisKelamin', form.jenisKelamin);
    // formData.append('tempatLahir', form.tempatLahir);
    // formData.append('tanggalLahir', form.tanggalLahir);
    // formData.append('pendidikanTerakhir', form.pendidikanTerakhir);
    // formData.append('umur', form.umur);
    // formData.append('alamatLengkap', form.alamatLengkap);
    // kecamatan.nama !== undefined &&
    //   formData.append('kecamatan', kecamatan.nama);
    // kelurahan.nama !== undefined &&
    //   formData.append('kelurahan', kelurahan.nama);
    // kabupaten.nama !== undefined &&
    //   formData.append('kabupaten_kota', kabupaten.nama);
    // provinsi.nama !== undefined && formData.append('provinsi', provinsi.nama);
    // formData.append('profile', form.profile);
    // formData.append('hafalan', form.hafalan);
    // formData.append('noHp', form.noHp);
    // imageData !== '' &&
    //   formData.append('image', {
    //     uri: imageData[0].uri,
    //     type: 'image/jpeg',
    //     name: imageData[0].name,
    //   });
    // ktpData !== '' &&
    //   formData.append('scanKtp', {
    //     uri: ktpData[0].uri,
    //     type: 'application/pdf',
    //     name: ktpData[0].name,
    //   });

    // ijazahData !== '' &&
    //   formData.append('scanIjazah', {
    //     uri: ijazahData[0]?.uri,
    //     type: 'application/pdf',
    //     name: ijazahData[0]?.name,
    //   });

    // sertifikatData !== '' &&
    //   formData.append('scanSertifikat', {
    //     uri: sertifikatData[0]?.uri,
    //     type: 'application/pdf',
    //     name: sertifikatData[0]?.name,
    //   });

    // // const userType = 'guru';
    console.log(`form ajaa=======`, form);
    const newForm = {
      ...form,
      kecamatan: kecamatan.nama,
      kelurahan: kelurahan.nama,
      provinsi: provinsi.nama,
      kabupaten_kota: kabupaten.nama,
    };
    navigation.navigate('RegisterGuru2', {data: newForm});
    // console.log(`formData`, formData);

    // disptach(registerGuru(formData, navigation));

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
    if (auth.isAuthenticated) {
      console.log('auth register', auth);
      setLoading(false);
      navigation.navigate('Dashboard');
    }
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
            Daftar Sebagai Guru
          </Text>
          <TextBody
            style={{marginTop: 16}}
            title="Hay, Calon Guru Proo, Harap diisi semua Form dibawah ini dengan
            lengkap dan sempurna, karena kami akan mereview semua calon Guru
            Kami berdasarkan informasi yang telah anda berikan."
          />
        </View>

        <InputCustom
          // label="masukkan nama kamu dengan lengkap"
          value={form.nama}
          onChangeText={value => onChangeTextInput(value, 'nama')}
          placeholder="Nama"
          error={error?.nama}
          errorText={error?.nama}
        />
        <InputCustom
          // label="email harus valid, karena akan menjadi akses login kamu"
          value={form.email}
          onChangeText={value => onChangeTextInput(value, 'email')}
          placeholder="Email"
          error={error?.email}
          errorText={error?.email}
        />
        <InputNoPhone
          disabled={true}
          value={form.noHp}
          onChangeText={value => onChangeTextInput(value, 'noHp')}
          style={{marginHorizontal: 0, marginTop: 0}}
          // error={error?.noHp}
        />
        {error?.noHp && (
          <TextBody
            style={{
              color: Warna.merah,
              marginTop: 5,
              marginBottom: 15,
              marginLeft: 10,
            }}
            title={`*${error?.noHp}`}
          />
        )}

        {/* <InputCustom
          // label="no whatsapp harus valid, agar kami mudah menghubungi kamu"
          value={form.noHp}
          onChangeText={value => onChangeTextInput(value, 'noHp')}
          placeholder="No Hp/ Whatsapp"
          error={error?.noHp}
          errorText={error?.noHp}
        /> */}
        <InputCustom
          // label="silahkan buat password serumit mungkin, tapi mudah diingat"
          value={form.password}
          onChangeText={value => onChangeTextInput(value, 'password')}
          secureTextEntry={true}
          placeholder="Password"
          error={error?.password}
          errorText={error?.password}
        />
        <InputCustom
          // label="pilih jenis kelamin kamu"
          value={form.jenisKelamin}
          onChangeText={value => onChangeTextInput(value, 'jenisKelamin')}
          placeholder="Jenis Kelamin"
          error={error?.jenisKelamin}
          errorText={error?.jenisKelamin}
        />
        <InputCustom
          value={form.tempatLahir}
          onChangeText={value => onChangeTextInput(value, 'tempatLahir')}
          placeholder="Tempat Lahir"
          error={error?.tempatLahir}
          errorText={error?.tempatLahir}
        />
        <InputCustom
          value={form.tanggalLahir}
          onChangeText={value => onChangeTextInput(value, 'tanggalLahir')}
          placeholder="Tanggal Lahir"
          error={error?.tanggalLahir}
          errorText={error?.tanggalLahir}
        />

        <InputCustom
          value={form.umur}
          onChangeText={value => onChangeTextInput(value, 'umur')}
          placeholder="Umur"
          error={error?.umur}
          errorText={error?.umur}
        />
        <InputCustom
          label="isi alamat lengkap Anda berikut nomor Rumah dan detail lainnya."
          value={form.alamatLengkap}
          onChangeText={value => onChangeTextInput(value, 'alamatLengkap')}
          placeholder="Alamat Lengkap"
          error={error?.alamatLengkap}
          errorText={error?.alamatLengkap}
        />
        {form.alamatLengkap !== '' && (
          <DropDownAlamat
            error={error?.provinsi}
            errorText={error?.provinsi}
            isUpdate={true}
            placeholder="Pilih Provinsi"
            selectedValue={provinsi}
            onChangeValue={(itemValue, itemIndex) => {
              onChangeProvinsi(itemValue);
            }}
            mapData={dataProvinsi}
            style={{
              backgroundColor: Warna.putih,
              borderRadius: 10,
              marginHorizontal: 0,
            }}
          />
        )}
        {provinsi.nama !== undefined && (
          <DropDownAlamat
            error={error?.kabupaten_kota}
            errorText={error?.kabupaten_kota}
            isUpdate={true}
            style={{
              backgroundColor: Warna.putih,
              borderRadius: 10,
              marginHorizontal: 0,
            }}
            placeholder="Pilih Kabupaten/ Kota"
            selectedValue={kabupaten}
            onChangeValue={itemValue => onChangeKabupaten(itemValue)}
            mapData={dataKabupaten}
          />
        )}
        {kabupaten.nama !== undefined && (
          <DropDownAlamat
            error={error?.kecamatan}
            errorText={error?.kecamatan}
            isUpdate={true}
            style={{
              backgroundColor: Warna.putih,
              borderRadius: 10,
              marginHorizontal: 0,
            }}
            placeholder="Pilih Kecamatan"
            selectedValue={kecamatan}
            onChangeValue={itemValue => onChangeKecamatan(itemValue)}
            mapData={dataKecamatan}
          />
        )}
        {kecamatan.nama !== undefined && (
          <DropDownAlamat
            error={error?.kelurahan}
            errorText={error?.kelurahan}
            isUpdate={true}
            style={{
              backgroundColor: Warna.putih,
              borderRadius: 10,
              marginHorizontal: 0,
            }}
            placeholder="Pilih Kelurahan"
            selectedValue={kelurahan}
            onChangeValue={itemValue => onChangeKelurahan(itemValue)}
            mapData={dataKelurahan}
          />
        )}
        <InputCustom
          label="isi latar belakang pendidikan Anda, ini bisa menjadi pertimbangan bagi calon murid untuk memilih Anda"
          value={form.pendidikanTerakhir}
          onChangeText={value => onChangeTextInput(value, 'pendidikanTerakhir')}
          placeholder="Pendidikan Terakhir"
          error={error?.pendidikanTerakhir}
          errorText={error?.pendidikanTerakhir}
        />
        <InputCustom
          // label="isi background atau latar belakang pendidikan kamu, karena ini bisa menjadi pertimbangan bagi calon Murid untuk memilih kamu"
          value={form.profile}
          onChangeText={value => onChangeTextInput(value, 'profile')}
          placeholder="Profile/ Background Pendidikan"
          error={error?.profile}
          errorText={error?.profile}
        />
        <InputCustom
          label="kamu sudah hafal berapa juz dari Al-Qur'an ? semakin banyak hafalan kamu, semakin kamu akan menjadi pilihan bagi calon Murid kamu"
          value={form.hafalan}
          onChangeText={value => onChangeTextInput(value, 'hafalan')}
          placeholder="Hafalan Juz (Contoh: 30 Juz)"
          error={error?.hafalan}
          errorText={error?.hafalan}
        />

        {/* attachment document */}
        {/* <View style={{flexDirection: 'row', marginVertical: 10}}>
          <UploadImage
            error={error?.image}
            errorText={error?.image}
            form={imageData}
            onPress={uploadPhoto}
            style={{marginRight: 5}}
          />
          <UploadFile
            error={error?.scanKtp}
            errorText={error?.scanKtp}
            title="Pilih file Ktp"
            deskripsi="format harus pdf"
            form={ktpData}
            onPress={uploadKtp}
            style={{marginLeft: 5}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <UploadFile
            error={error?.scanIjazah}
            errorText={error?.scanIjazah}
            title="Pilih file Ijazah"
            deskripsi="format harus pdf"
            form={ijazahData}
            onPress={uploadIjazah}
            style={{marginRight: 5}}
          />
          <UploadFile
            error={error?.scanSertifikat}
            errorText={error?.scanSertifikat}
            title="Pilih file Sertifikat"
            deskripsi="format harus pdf"
            form={sertifikatData}
            onPress={uploadSertifikat}
            style={{marginLeft: 5}}
          />
        </View> */}
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

export default withNavigation(RegisterGuru);
