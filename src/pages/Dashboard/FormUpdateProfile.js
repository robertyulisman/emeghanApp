import React from 'react';
import {View, Text, StatusBar, ScrollView} from 'react-native';
import TopLabel from '../../components/atoms/TopLabel';
import {apiUrl, Warna} from '../../utils/Data';
import Tombol from '../../components/atoms/Tombol';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import DropDownAlamat from '../../components/molecules/DropDownAlamat';
import Input from '../../components/molecules/Input';
import {ToastDefault} from '../../utils/Fungsi';
import {
  getProfileUser,
  updateProfileUser,
} from '../../config/redux/actions/profileActions';
import LoadingComp from '../../components/atoms/LoadingComp';
import Toast from 'react-native-toast-message';
import {withNavigation} from 'react-navigation';
import TopBarNew from '../../components/molecules/TopBarNew';
import TextBody from '../../components/atoms/TextBody';
import InputProfile from '../../components/molecules/InputProfile';

const FormUpdateProfile = ({onPress, navigation}) => {
  const dispatch = useDispatch();
  const {profile} = useSelector(state => state.profile);
  const {user} = useSelector(state => state.auth);
  const User = user.userType === 'Guru' ? 'guru' : 'siswa';
  const [provinsi, setProvinsi] = React.useState(null);
  const [kabupaten, setKabupaten] = React.useState(null);
  const [kecamatan, setKecamatan] = React.useState(null);
  const [kelurahan, setKelurahan] = React.useState(null);

  const [dataProvinsi, setDataProvinsi] = React.useState([]);
  const [dataKabupaten, setDataKabupaten] = React.useState([]);
  const [dataKecamatan, setDataKecamatan] = React.useState([]);
  const [dataKelurahan, setDataKelurahan] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    nama: profile.nama,
    email: profile.email,
    noHp: profile.noHp,
    alamatLengkap: profile.alamatLengkap,
  });
  const handleOnchangeText = (value, input) => {
    // console.log(`input`, input);
    // console.log(`value`, value);
    setForm({
      ...form,
      [input]: value,
    });
  };
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
  const onChangeProvinsi = itemValue => {
    // console.log(`itemValue`, itemValue);
    setProvinsi(itemValue);
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${itemValue?.id}`,
      )
      .then(response => {
        // console.log(`sukses get alamat indonesia`, response.data);
        setDataKabupaten(response.data.kota_kabupaten);

        setDataKecamatan([]);
        setDataKelurahan([]);
        setKabupaten(null);
        setKecamatan(null);
        setKelurahan(null);
      })
      .catch(err => console.log(`err get alamat indonesia`, err));
  };

  const onChangeKabupaten = itemValue => {
    // console.log(`itemValue`, itemValue);
    setKabupaten(itemValue);
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${itemValue?.id}`,
      )
      .then(response => {
        // console.log(`sukses get Kecamatan`, response.data);
        setDataKecamatan(response.data.kecamatan);
        setDataKelurahan([]);
        setKelurahan(null);
      })
      .catch(err => console.log(`err get alamat indonesia`, err));
  };
  const onChangeKecamatan = itemValue => {
    // console.log(`itemValue`, itemValue);
    setKecamatan(itemValue);
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${itemValue?.id}`,
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
  const handleUpdateProfile = () => {
    if (form.email === '') {
      Toast.show({
        type: 'error',
        text1: 'error',
        text2: 'Email wajib diisi',
      });
    } else if (form.alamatLengkap === '') {
      Toast.show({
        type: 'error',
        text1: 'error',
        text2: 'alamat wajib diisi',
      });
    } else {
      const newForm = {
        nama: form.nama,
        email: form.email,
        noHp: form.noHp,
        alamatLengkap: form.alamatLengkap,
        provinsi: provinsi?.name,
        kabupaten_kota: kabupaten?.name,
        kecamatan: kecamatan?.name,
        kelurahan: kelurahan?.name,
      };

      dispatch(updateProfileUser(profile._id, newForm, User));
      setTimeout(() => {
        console.log(`component did update profile page`);

        dispatch(getProfileUser(profile._id, user.userType));
        ToastDefault('profil berhasil di perbarui');
        setIsLoading(false);
        navigation.navigate('Dashboard');
      }, 5000);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <TopBarNew single title="Perbarui data diri" />

      <ScrollView
        style={{
          // paddingHorizontal: 10,
          flex: 1,
          paddingBottom: 60,
        }}>
        <StatusBar backgroundColor={Warna.primary.satu} />
        <TextBody
          style={{marginTop: 20, marginHorizontal: 20}}
          title="Lengkapi Biodata sebelum melanjutkan kedalam Aplikasi"
        />

        <View style={{paddingVertical: 10}}>
          <InputProfile
            style={{paddingHorizontal: 20}}
            title="Nama"
            // editable={false}
            value={form.nama}
            onChangeText={value => handleOnchangeText(value, 'nama')}
          />
          <InputProfile
            style={{paddingHorizontal: 20}}
            styleHead={{marginTop: 20}}
            title="Email"
            // editable={isUpdate}
            placeholder="masukkan email"
            value={form.email}
            onChangeText={value => handleOnchangeText(value, 'email')}
          />
          <InputProfile
            style={{paddingHorizontal: 20}}
            styleHead={{marginTop: 20}}
            title="No Handphone"
            keyboardType="number-pad"
            value={form.noHp}
            onChangeText={value => handleOnchangeText(value, 'noHp')}
          />

          <InputProfile
            style={{paddingHorizontal: 20}}
            styleHead={{marginTop: 20}}
            title="Alamat Lengkap"
            //   editable={isUpdate}
            placeholder="masukkan alamat"
            value={form.alamatLengkap}
            onChangeText={value => handleOnchangeText(value, 'alamatLengkap')}
          />

          {/* {dataProvinsi.map(item => (
            <TextBody title={item.name} />
          ))} */}

          <DropDownAlamat
            // style={{height: 60}}
            isUpdate={true}
            // value={profile.provinsi === '' ? '-' : profile.provinsi}
            title="Provinsi"
            placeholder={
              provinsi === undefined ? 'Pilih Provinsi' : provinsi?.name
            }
            selectedValue={provinsi}
            onChangeValue={itemValue => onChangeProvinsi(itemValue)}
            mapData={dataProvinsi}
          />
          {dataKabupaten.length > 0 && (
            <DropDownAlamat
              isUpdate={true}
              title="Kabupaten/ Kota"
              placeholder={
                kabupaten === undefined
                  ? 'Pilih Kabupaten/ Kota'
                  : kabupaten?.nama
              }
              selectedValue={kabupaten}
              onChangeValue={itemValue => onChangeKabupaten(itemValue)}
              mapData={dataKabupaten}
            />
          )}

          {dataKecamatan.length > 0 && (
            <DropDownAlamat
              isUpdate={true}
              title="Kecamatan"
              placeholder={
                kecamatan === undefined ? 'Pilih Kecamatan' : kecamatan?.nama
              }
              selectedValue={kecamatan}
              onChangeValue={itemValue => onChangeKecamatan(itemValue)}
              mapData={dataKecamatan}
            />
          )}

          {dataKelurahan.length > 0 && (
            <DropDownAlamat
              isUpdate={true}
              title="Kelurahan"
              placeholder={
                kelurahan === undefined ? 'Pilih Kelurahan' : kelurahan?.nama
              }
              selectedValue={kelurahan}
              onChangeValue={itemValue => onChangeKelurahan(itemValue)}
              mapData={dataKelurahan}
            />
          )}
        </View>

        {isLoading ? (
          <View style={{margin: 10}}>
            <LoadingComp primary />
          </View>
        ) : (
          <Tombol
            onPress={handleUpdateProfile}
            style={{margin: 20}}
            primary
            title={'SUBMIT'}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default withNavigation(FormUpdateProfile);
