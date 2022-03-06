import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import GambarCustom from '../../components/atoms/GambarCustom';
import TopBar from '../../components/molecules/TopBar';
import {apiUrl, Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation';
import TextForm from '../LaporanBelajar/TextForm';
import Tombol from '../../components/atoms/Tombol';
import TombolAksi from '../../components/molecules/TombolAksi';
import {ToastDefault} from '../../utils/Fungsi';
import axios from 'axios';
import {getProfileUser} from '../../config/redux/actions/profileActions';
import {Flow} from 'react-native-animated-spinkit';
import DropDownAlamat from '../../components/molecules/DropDownAlamat';
import TextCustom from '../LaporanBelajar/TextCustom';
import Input from '../../components/molecules/Input';
import TopLabel from '../../components/atoms/TopLabel';
import DocumentPicker from 'react-native-document-picker';

const {width, height} = Dimensions.get('window');

const ProfileGuru = ({navigation}) => {
  const {profile} = useSelector(state => state.profile);
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    nama: '',
    noHp: '',
    email: '',
    jenisKelaminL: '',
    tempatLahir: '',
    tanggalLahir: '',
    umur: '',
    profile: '',
    hafalan: '',
    alamatLengkap: '',
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

  const handleOnChangeText = (value, input) => {
    setForm({
      ...form,
      [input]: value,
    });
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
              setIsLoading(true);
              const response = await axios.put(
                `${apiUrl}/api/guru/image/${profile._id}`,
                formData,
                {
                  'Content-Type': 'multipart/form-data',
                },
              );
              console.log(`respon sukses`, response.data.image);
              dispatch(getProfileUser(profile._id, user.userType));
              ToastDefault('Poto profile berhasil di perbarui');
              setIsLoading(false);
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
    ]);
  };

  const handleUpdateProfile = () => {
    const newForm = {
      nama: form.nama,
      noHp: form.noHp,
      email: form.email,
      jenisKelaminL: form.jenisKelaminL,
      tempatLahir: form.tempatLahir,
      tanggalLahir: form.tanggalLahir,
      umur: form.umur,
      profile: form.profile,
      hafalan: form.hafalan,
      alamatLengkap: form.alamatLengkap,
      provinsi: provinsi.nama,
      kabupaten_kota: kabupaten.nama,
      kecamatan: kecamatan.nama,
      kelurahan: kelurahan.nama,
    };
    axios
      .put(`${apiUrl}/api/guru/${profile._id}`, newForm)
      .then(res => {
        setIsLoading(true);
        console.log(`respon sukses`, res.data);
        dispatch(getProfileUser(profile._id, user.userType));
        ToastDefault('profile berhasil di perbarui');
      })
      .catch(err => {
        console.log(`respon gagal`, err);
        ToastDefault('profile gagal di perbarui');
      });

    console.log(`form`, form);
  };

  React.useEffect(() => {
    if (profile) {
      setIsLoading(false);
      setIsEdit(true);
    }
  }, [profile]);
  return (
    <View style={{backgroundColor: Warna.abuAbuMuda, flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: 60,
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 999,
        }}>
        <Icon name="arrow-left" size={20} color={Warna.putih} />
      </TouchableOpacity>
      <View>
        <GambarCustom
          resizeMode="cover"
          source={{
            uri:
              profile.image === ''
                ? `${apiUrl}/asset/images/noImage.png`
                : `${apiUrl}/${profile.image}`,
          }}
          style={{
            height: 250,
            width: width,
            backgroundColor: Warna.hitam,
            opacity: 0.3,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: Warna.putih,
          flex: 1,
          marginHorizontal: 10,
          marginTop: -80,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <TouchableOpacity
          onPress={handleChangeImage}
          style={{alignItems: 'center', marginTop: -110}}>
          <GambarCustom
            resizeMode="cover"
            source={{
              uri:
                profile.image === ''
                  ? `${apiUrl}/asset/images/noImage.png`
                  : `${apiUrl}/${profile.image}`,
            }}
            style={{
              height: 150,
              width: 150,
              borderRadius: 75,
              backgroundColor: Warna.hitam,
            }}
          />
        </TouchableOpacity>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            marginHorizontal: 10,
            // marginBottom: 10,
          }}>
          <TextForm
            keyTitle="Nama"
            valueTitle={profile.nama}
            editable={isEdit}
            valueInput={isEdit ? profile.nama : form.nama}
            onChangeText={value => handleOnChangeText(value, 'nama')}
            style={{marginVertical: isEdit ? 0 : 5}}
          />
          <TextForm
            keyTitle="No Handphone"
            valueTitle={profile.noHp}
            valueInput={isEdit ? profile.noHp : form.noHp}
            onChangeText={value => handleOnChangeText(value, 'noHp')}
            editable={isEdit}
            style={{marginVertical: isEdit ? 0 : 5}}
          />
          <TextForm
            keyTitle="Email"
            valueTitle={profile.email}
            valueInput={isEdit ? profile.email : form.email}
            onChangeText={value => handleOnChangeText(value, 'email')}
            editable={isEdit}
            style={{marginVertical: isEdit ? 0 : 5}}
          />
          <TextForm
            keyTitle="Jenis Kelamin"
            valueTitle={profile.jenisKelamin}
            valueInput={isEdit ? profile.jenisKelamin : form.jenisKelamin}
            onChangeText={value => handleOnChangeText(value, 'jenisKelamin')}
            editable={isEdit}
            style={{marginVertical: isEdit ? 0 : 5}}
          />
          <TextForm
            keyTitle="Tempat Lahir"
            valueTitle={profile.tempatLahir}
            valueInput={isEdit ? profile.tempatLahir : form.tempatLahir}
            onChangeText={value => handleOnChangeText(value, 'tempatLahir')}
            editable={isEdit}
            style={{marginVertical: isEdit ? 0 : 5}}
          />
          <TextForm
            keyTitle="Tanggal Lahir"
            valueTitle={profile.tanggalLahir}
            valueInput={isEdit ? profile.tanggalLahir : form.tanggalLahir}
            onChangeText={value => handleOnChangeText(value, 'tanggalLahir')}
            editable={isEdit}
            style={{marginVertical: isEdit ? 0 : 5}}
          />
          <TextForm
            keyTitle="Umur"
            valueTitle={profile.umur}
            valueInput={isEdit ? profile.umur : form.umur}
            onChangeText={value => handleOnChangeText(value, 'umur')}
            editable={isEdit}
            style={{marginVertical: isEdit ? 0 : 5}}
          />
          <TextForm
            keyTitle="Profile"
            valueTitle={profile.profile}
            valueInput={isEdit ? profile.profile : form.profile}
            onChangeText={value => handleOnChangeText(value, 'profile')}
            editable={isEdit}
            style={{marginVertical: isEdit ? 0 : 5}}
          />
          <TextForm
            keyTitle="Hafalan"
            valueTitle={profile.hafalan}
            valueInput={isEdit ? profile.hafalan : form.hafalan}
            onChangeText={value => handleOnChangeText(value, 'hafalan')}
            editable={isEdit}
            style={{marginVertical: isEdit ? 0 : 5}}
          />

          <View
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: Warna.biruMuda,
              overflow: 'hidden',
              paddingBottom: 10,
            }}>
            <TopLabel title="Detail Alamat" />
            <View
              style={{
                borderColor: Warna.biruMuda,
                padding: 10,
              }}>
              <Input
                title="Alamat Lengkap"
                editable={isEdit === false}
                placeholder={profile.alamatLengkap}
                value={isEdit ? profile.alamatLengkap : form.alamatLengkap}
                onChangeText={value =>
                  handleOnChangeText(value, 'alamatLengkap')
                }
              />
              <DropDownAlamat
                isUpdate={isEdit === false}
                value={profile.provinsi === '' ? '-' : profile.provinsi}
                title="Provinsi"
                placeholder={
                  profile.provinsi === '' ? 'Pilih Provinsi' : profile.provinsi
                }
                selectedValue={provinsi}
                onChangeValue={itemValue => onChangeProvinsi(itemValue)}
                mapData={dataProvinsi}
              />
              <DropDownAlamat
                isUpdate={isEdit === false}
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
                onChangeValue={itemValue => onChangeKabupaten(itemValue)}
                mapData={dataKabupaten}
              />
              <DropDownAlamat
                isUpdate={isEdit === false}
                value={profile.kecamatan === '' ? '-' : profile.kecamatan}
                title="Kecamatan"
                placeholder={
                  profile.kecamatan === ''
                    ? 'Pilih Kecamatan'
                    : profile.kecamatan
                }
                selectedValue={kecamatan}
                onChangeValue={itemValue => onChangeKecamatan(itemValue)}
                mapData={dataKecamatan}
              />
              <DropDownAlamat
                isUpdate={isEdit === false}
                value={profile.kelurahan === '' ? '-' : profile.kelurahan}
                title="Kelurahan"
                placeholder={
                  profile.kelurahan === ''
                    ? 'Pilih Kelurahan'
                    : profile.kelurahan
                }
                selectedValue={kelurahan}
                onChangeValue={itemValue => onChangeKelurahan(itemValue)}
                mapData={dataKelurahan}
              />
            </View>
          </View>
        </ScrollView>
        {/* {isLoading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginVertical: 20,
            }}>
            <Flow size={50} color={Warna.biruMuda}></Flow>
          </View>
        ) : isEdit ? (
          <Tombol
            onPress={() => setIsEdit(false)}
            primary
            title="PERBARUI PROFILE"
            style={{margin: 10}}
          />
        ) : (
          <TombolAksi
            titleNegative="BATAL"
            titlePositive="KONFIRMASI"
            onPressNegative={() => setIsEdit(true)}
            onPressPositive={handleUpdateProfile}
            style={{margin: 10, alignSelf: 'center'}}
          />
        )} */}
      </View>
    </View>
  );
};

export default withNavigation(ProfileGuru);
