import React from 'react';
import {View, ScrollView, StatusBar} from 'react-native';
import Tombol from '../../components/atoms/Tombol';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import DropDownAlamat from '../../components/molecules/DropDownAlamat';
import {ToastDefault} from '../../utils/Fungsi';
import {
  getProfileUser,
  updateProfileUser,
} from '../../config/redux/actions/profileActions';
import TopBarNew from '../../components/molecules/TopBarNew';
import InputProfile from '../../components/molecules/InputProfile';
import {Warna} from '../../utils/Data';

const ProfileAlamat = () => {
  const dispatch = useDispatch();
  const {profile} = useSelector(state => state.profile);
  const {user} = useSelector(state => state.auth);
  const User = user.userType === 'Guru' ? 'guru' : 'siswa';

  const [provinsi, setProvinsi] = React.useState('Provinsi');
  const [kabupaten, setKabupaten] = React.useState('Kabupaten');
  const [kecamatan, setKecamatan] = React.useState('Kecamatan');
  const [kelurahan, setKelurahan] = React.useState('Kelurahan');

  const [dataProvinsi, setDataProvinsi] = React.useState([]);
  const [dataKabupaten, setDataKabupaten] = React.useState([]);
  const [dataKecamatan, setDataKecamatan] = React.useState([]);
  const [dataKelurahan, setDataKelurahan] = React.useState([]);

  const [isUpdate, setIsUpdate] = React.useState(false);
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

  const handleUpdateProfile = () => {
    if (isUpdate) {
      const newForm = {
        nama: form.nama,
        email: form.email,
        noHp: form.noHp,
        alamatLengkap: form.alamatLengkap,
        provinsi: provinsi.nama,
        kabupaten_kota: kabupaten.nama,
        kecamatan: kecamatan.nama,
        kelurahan: kelurahan.nama,
      };

      dispatch(updateProfileUser(profile._id, newForm, User));
      ToastDefault('profil berhasil di perbarui');

      setIsUpdate(false);
    } else {
      console.log(`oke`, isUpdate);
      setIsUpdate(true);
    }
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

  React.useEffect(() => {
    if (isUpdate === false) {
      setTimeout(() => {
        console.log(`component did update profile page`);

        dispatch(getProfileUser(profile._id, user.userType));
      }, 5000);
    }
    // if (Object.keys(profile).length > 0) {

    // }
  }, [isUpdate]);

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

  // const handleCancelProfile = () => {
  //   // setForm({
  //   //   nama: profile.nama,
  //   //   email: profile.email,
  //   //   noHp: profile.noHp,
  //   //   alamatLengkap: profile.alamatLengkap,
  //   // });
  //   if (isUpdate === true) {
  //     setIsUpdate(false);
  //   } else {

  //   }

  // };
  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      <StatusBar
        backgroundColor={Warna.primary.satu}
        barStyle="light-content"
      />
      <TopBarNew
        onPress={isUpdate ? () => setIsUpdate(false) : false}
        title={isUpdate ? 'Ubah Alamat Saya' : 'Alamat Saya'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: Warna.grayscale.lima,

          flex: 1,
        }}>
        <View>
          <InputProfile
            title="Alamat Lengkap"
            editable={isUpdate}
            value={isUpdate ? form.alamatLengkap : profile.alamatLengkap}
            onChangeText={value => handleOnchangeText(value, 'alamatLengkap')}
          />

          <View>
            <DropDownAlamat
              isUpdate={isUpdate}
              value={profile.provinsi === '' ? '-' : profile.provinsi}
              title="Provinsi"
              placeholder={
                profile.provinsi === '' ? 'Pilih Provinsi' : profile.provinsi
              }
              selectedValue={provinsi}
              onChangeValue={(itemValue, itemIndex) => {
                onChangeProvinsi(itemValue);
              }}
              mapData={dataProvinsi}
            />

            <DropDownAlamat
              isUpdate={isUpdate}
              title="Kabupaten/ Kota"
              value={
                profile.kabupaten_kota === '' ? '-' : profile.kabupaten_kota
              }
              placeholder={
                profile.kabupaten_kota === ''
                  ? 'Pilih Kabupaten/ Kota'
                  : profile.kabupaten_kota
              }
              selectedValue={kabupaten}
              onChangeValue={(itemValue, itemIndex) => {
                onChangeKabupaten(itemValue);
              }}
              mapData={dataKabupaten}
            />
          </View>
          <View
            style={{
              marginBottom: 20,
            }}>
            <DropDownAlamat
              isUpdate={isUpdate}
              value={profile.kecamatan === '' ? '-' : profile.kecamatan}
              title="Kecamatan"
              placeholder={
                profile.kecamatan === '' ? 'Pilih Kecamatan' : profile.kecamatan
              }
              selectedValue={kecamatan}
              onChangeValue={(itemValue, itemIndex) => {
                onChangeKecamatan(itemValue);
              }}
              mapData={dataKecamatan}
            />
            <DropDownAlamat
              isUpdate={isUpdate}
              value={profile.kelurahan === '' ? '-' : profile.kelurahan}
              title="Kelurahan"
              placeholder={
                profile.kelurahan === '' ? 'Pilih Kelurahan' : profile.kelurahan
              }
              selectedValue={kelurahan}
              onChangeValue={(itemValue, itemIndex) => {
                onChangeKelurahan(itemValue);
              }}
              mapData={dataKelurahan}
            />
          </View>
        </View>

        <Tombol
          onPress={handleUpdateProfile}
          style={{margin: 20}}
          primary
          title={isUpdate ? 'Simpan Alamat' : 'Ubah Alamat'}
        />
      </ScrollView>
    </View>
  );
};

export default ProfileAlamat;
