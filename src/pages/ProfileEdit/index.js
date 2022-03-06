import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import GambarLogo from '../../components/atoms/GambarLogo';
import TopLabel from '../../components/atoms/TopLabel';
import TopBar from '../../components/molecules/TopBar';
import {apiUrl, Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/FontAwesome';
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
import DocumentPicker from 'react-native-document-picker';
import GambarCustom from '../../components/atoms/GambarCustom';
import BottomNavBar from '../../components/molecules/BottomNavBar';
import TextJudul from '../../components/atoms/TextJudul';
import TextBody from '../../components/atoms/TextBody';
import TopBarNew from '../../components/molecules/TopBarNew';
import InputProfile from '../../components/molecules/InputProfile';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const {profile} = useSelector(state => state.profile);
  const {user} = useSelector(state => state.auth);
  const User = user.userType === 'Guru' ? 'guru' : 'siswa';
  // const State = useSelector(state => state);
  // console.log(`profile`, profile);
  // console.log(`state`, State);

  // const [provinsi, setProvinsi] = React.useState('Provinsi');
  // const [kabupaten, setKabupaten] = React.useState('Kabupaten');
  // const [kecamatan, setKecamatan] = React.useState('Kecamatan');
  // const [kelurahan, setKelurahan] = React.useState('Kelurahan');

  // const [dataProvinsi, setDataProvinsi] = React.useState([]);
  // const [dataKabupaten, setDataKabupaten] = React.useState([]);
  // const [dataKecamatan, setDataKecamatan] = React.useState([]);
  // const [dataKelurahan, setDataKelurahan] = React.useState([]);

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
    // if (isUpdate) {
    const newForm = {
      nama: form.nama,
      email: form.email,
      noHp: form.noHp,
      // alamatLengkap: form.alamatLengkap,
      // provinsi: provinsi.nama,
      // kabupaten_kota: kabupaten.nama,
      // kecamatan: kecamatan.nama,
      // kelurahan: kelurahan.nama,
    };

    dispatch(updateProfileUser(profile._id, newForm, User));
    ToastDefault('profil berhasil di perbarui');

    // setTimeout(() => {
    //   dispatch(getProfileUser(profile._id));
    // }, 5000);

    // setIsUpdate(false);
    // } else {
    //   console.log(`oke`, isUpdate);
    //   setIsUpdate(true);
    // }
  };

  const handleChangeImage = () => {
    Alert.alert('Info', 'Yakin Mau ganti Poto ?', [
      {
        text: 'Oke',
        onPress: async () => {
          // setShowBox(false);
          //
          //   console.log(`oke`);
          try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.images],
            });

            const formData = new FormData();
            formData.append('image', {
              uri: res[0].uri,
              type: 'image/jpeg',
              name: res[0].name,
            });

            try {
              // setIsLoading(true);
              const response = await axios.put(
                `${apiUrl}/api/${User}/image/${profile._id}`,
                formData,
                {
                  'Content-Type': 'multipart/form-data',
                },
              );
              console.log(`respon sukses`, response.data.image);
              dispatch(getProfileUser(profile._id, user.userType));
              ToastDefault('Poto profile berhasil di perbarui');
              // setIsLoading(false);
            } catch (err) {
              console.log(`gagal update poto profile`, err);
              ToastDefault('gagal update poto profile');
            }
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
              throw err;
            }
          }
        },
      },
      {
        text: 'BATAL',
      },
    ]);
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

  // const handleCancelProfile = () => {
  //   setForm({
  //     nama: profile.nama,
  //     email: profile.email,
  //     noHp: profile.noHp,
  //     alamatLengkap: profile.alamatLengkap,
  //   });
  //   setIsUpdate(false);
  // };
  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      <StatusBar
        backgroundColor={Warna.primary.satu}
        barStyle="light-content"
      />
      <TopBarNew title="Ubah Akun" />
      <TouchableOpacity
        onPress={handleChangeImage}
        style={{width: 100, height: 100, alignSelf: 'center', marginTop: 20}}>
        <GambarCustom
          resizeMode="cover"
          source={{
            uri:
              profile.image === ''
                ? `${apiUrl}/asset/images/noImage.png`
                : `${apiUrl}/${profile.image}`,
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: Warna.grayscale.empat,
          }}
        />
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: Warna.primary.lima,
            borderRadius: 10,
            padding: 2,
            position: 'absolute',
            bottom: 0,
            right: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="pencil" size={15} color={Warna.primary.satu} />
        </View>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: Warna.grayscale.lima,

          flex: 1,
        }}>
        <View style={{flex: 1, marginBottom: 20}}>
          <InputProfile
            title="Nama Lengkap"
            // editable={isUpdate}
            value={form.nama}
            onChangeText={value => handleOnchangeText(value, 'nama')}
          />
          <InputProfile
            title="Email"
            // editable={isUpdate}
            value={form.email}
            onChangeText={value => handleOnchangeText(value, 'email')}
          />

          <InputProfile
            title="No Handphone"
            // editable={isUpdate}
            value={form.noHp}
            onChangeText={value => handleOnchangeText(value, 'noHp')}
          />
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            marginHorizontal: 20,
            alignItems: 'center',
          }}>
          <View style={{flex: 1, marginHorizontal: 5, marginLeft: 10}}>
            <TextJudul title={profile.nama} />

            <TextBody
              title={
                profile.email === '' ? 'email tidak tersedia' : profile.email
              }
            />
            <TextBody style={{marginTop: -5}} title={profile.noHp} />
          </View>
        </View> */}

        {/* {isUpdate === false && (
          <>
            <View style={{alignSelf: 'center'}}>
              <GambarLogo hitam kecil />
            </View>

            <View
              style={{
                borderColor: Warna.biruMuda,
                borderWidth: 1,
                borderTopLeftRadius: 20,
                borderBottomRightRadius: 20,
                margin: 10,
                overflow: 'hidden',
              }}>
              <TopLabel title="Akun Saya" />
             
            </View>
          </>
        )} */}

        {/* akun start */}
        {/* {isUpdate && ( */}
        {/* <View
          style={{
            borderColor: Warna.biruMuda,
            borderWidth: 1,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            margin: 10,
            overflow: 'hidden',
          }}>
          <TopLabel title="Akun" />
          
        </View> */}
        {/* )} */}

        {/* akun finish */}

        {/* alamat start */}
        {/* <View
          style={{
            borderColor: Warna.biruMuda,
            borderWidth: 1,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            margin: 10,
            overflow: 'hidden',
          }}>
          <TopLabel title="Detail Alamat" />
      
          <View style={{marginHorizontal: 10}}>
            <Input
              title="Alamat Lengkap"
              editable={isUpdate}
              value={isUpdate ? form.alamatLengkap : profile.alamatLengkap}
              onChangeText={value => handleOnchangeText(value, 'alamatLengkap')}
            />

            <View style={{flexDirection: isUpdate ? null : 'row'}}>
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
                flexDirection: isUpdate ? null : 'row',
                marginBottom: 20,
              }}>
              <DropDownAlamat
                isUpdate={isUpdate}
                value={profile.kecamatan === '' ? '-' : profile.kecamatan}
                title="Kecamatan"
                placeholder={
                  profile.kecamatan === ''
                    ? 'Pilih Kecamatan'
                    : profile.kecamatan
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
                  profile.kelurahan === ''
                    ? 'Pilih Kelurahan'
                    : profile.kelurahan
                }
                selectedValue={kelurahan}
                onChangeValue={(itemValue, itemIndex) => {
                  onChangeKelurahan(itemValue);
                }}
                mapData={dataKelurahan}
              />
            </View>
          </View>
        </View> */}
        {/* alamat finish */}

        {/* <View
          style={{
            flexDirection: isUpdate ? 'row' : null,
            justifyContent: isUpdate ? 'space-between' : null,
          }}>
          {isUpdate && (
            <Tombol
              onPress={handleCancelProfile}
              style={{marginVertical: 20, marginHorizontal: 10}}
              secondary
              title="BATAL"
            />
          )}
          
        </View> */}
        <Tombol
          onPress={handleUpdateProfile}
          style={{margin: 20}}
          primary
          title="Perbarui"
        />
      </ScrollView>
    </View>
  );
};

export default ProfileEdit;
