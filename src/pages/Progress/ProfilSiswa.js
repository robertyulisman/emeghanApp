import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {apiUrl, Warna} from '../../utils/Data';
import TopLabel from '../../components/atoms/TopLabel';
// import {Dropdown} from 'react-native-material-dropdown';
import {Picker} from '@react-native-picker/picker';
import {useSelector} from 'react-redux';
import Input from '../../components/molecules/Input';
import DropDownAlamat from '../../components/molecules/DropDownAlamat';
import DropDownSiswa from '../../components/molecules/DropDownSiswa';
import axios from 'axios';
import Tombol from '../../components/atoms/Tombol';
import TextJudul from '../../components/atoms/TextJudul';
import GambarCustom from '../../components/atoms/GambarCustom';
import TextBody from '../../components/atoms/TextBody';

const ProfilSiswa = ({
  data,
  setData,
  dataPelajaran,
  setDataPelajaran,
  jenisKelamin,
  setJenisKelamin,
  jamPertemuan,
  setJamPertemuan,
  dataPaket,
  dataPertemuanTerpilih,
}) => {
  const {profile} = useSelector(state => state.profile);

  const [pelajaranData, setPelajaranData] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [chooseSelf, setChooseSelf] = React.useState(false);
  const [chooseOther, setChooseOther] = React.useState(false);
  console.log(`dataPaket`, dataPaket);
  console.log(`dataPertemuanTerpilih`, dataPertemuanTerpilih);
  React.useEffect(() => {
    axios
      .get(`${apiUrl}/api/pelajaran`)
      .then(res => {
        console.log(`sukses get pelajaran`, res.data);
        setPelajaranData(res.data);
      })
      .catch(err => console.log(`err`, err));
  }, []);

  const jenisKelaminData = [
    {
      _id: '2321e2e2e',
      nama: 'Laki - Laki',
    },
    {
      _id: '43545345',
      nama: 'Perempuan',
    },
  ];

  const jamPertemuanData = [
    {
      _id: '44365657457',
      nama: `12.00 - 13.00`,
    },
    {
      _id: '789363899309',
      nama: '14.00 - 15.00',
    },
    {
      _id: '3242934823946',
      nama: '16.00 - 17.00',
    },
  ];
  // const [form, setData] = React.useState(data);

  const handleOnchangeInput = (value, input) => {
    setData({
      ...data,
      [input]: value,
    });
    // console.log('value', value);
    // console.log('input', input);
  };

  console.log(`profile ================================`, profile);

  const handleClickAlamat = () => {
    const {alamatLengkap, kelurahan, kecamatan, kabupaten_kota, provinsi} =
      profile;
    const newAlamat = `${alamatLengkap}, Kel. ${kelurahan}, Kec. ${kecamatan}, Kab/ Kota. ${kabupaten_kota}, Prov. ${provinsi}`;
    // console.log(`alamat Lengkap`, newAlamat);
    setData({
      ...data,
      alamatLengkap: newAlamat,
    });
  };

  const handleDaftarSendiri = () => {
    const {
      alamatLengkap,
      kelurahan,
      kecamatan,
      kabupaten_kota,
      provinsi,
      nama,
      jenisKelamin,
      umur,
    } = profile;
    const newAlamat = `${alamatLengkap}, Kel. ${kelurahan}, Kec. ${kecamatan}, Kab/ Kota. ${kabupaten_kota}, Prov. ${provinsi}`;
    // console.log(`alamat Lengkap`, newAlamat);
    setData({
      ...data,
      nama,
      jenisKelamin,
      umur,
      alamatLengkap: newAlamat,
    });
    setChooseSelf(true);
    setChooseOther(false);
  };

  const handleDaftarOrangLain = () => {
    setData({
      ...data,
      nama: '',
      jenisKelamin: '',
      umur: '',
      alamatLengkap: '',
    });
    setChooseSelf(false);
    setChooseOther(true);
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
      }}>
      {/* head kontent */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flex: 1}}>
          <TextJudul title="Proo Mengaji" />
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TextJudul
            title={`${dataPertemuanTerpilih.jumlahPertemuan} Pertemuan`}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flex: 1}}>
          <TextJudul title={dataPaket.nama.toUpperCase()} />
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TextJudul title={`Rp. ${dataPertemuanTerpilih.totalHarga}.000`} />
        </View>
      </View>
      {/* role pendaftaran */}
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <TouchableOpacity
          onPress={handleDaftarSendiri}
          style={{
            flex: 1,
            paddingVertical: 20,
            borderColor: chooseSelf ? null : Warna.grayscale.empat,
            backgroundColor: chooseSelf ? Warna.primary.lima : null,
            borderWidth: chooseSelf ? null : 1,
            paddingHorizontal: 10,
            marginRight: 5,
            borderRadius: 10,
          }}>
          <GambarCustom
            style={{width: 20, height: 20, marginBottom: 5}}
            source={
              chooseSelf
                ? require('../../assets/figma/radioActive.png')
                : require('../../assets/figma/radioDeactive.png')
            }
          />
          <TextJudul title="Daftar untuk diri sendiri" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDaftarOrangLain}
          style={{
            flex: 1,
            paddingVertical: 20,
            borderColor: chooseOther ? null : Warna.grayscale.empat,
            backgroundColor: chooseOther ? Warna.primary.lima : null,
            borderWidth: chooseOther ? null : 1,
            paddingHorizontal: 10,
            marginLeft: 5,
            borderRadius: 10,
          }}>
          <GambarCustom
            style={{width: 20, height: 20, marginBottom: 5}}
            source={
              chooseOther
                ? require('../../assets/figma/radioActive.png')
                : require('../../assets/figma/radioDeactive.png')
            }
          />
          <TextJudul title="Daftar untuk orang lain" />
        </TouchableOpacity>
        {/* <Tombol
          primary
          title="DAFTAR SEBAGAI DIRI SENDIRI ?"
          onPress={handleDaftarSendiri}
        />
        <Text
          style={{
            textAlign: 'center',
            margin: 10,
            fontSize: 16,
            color: Warna.hitam,
          }}>
          Atau
        </Text>
        <Tombol
          primary
          title="DAFTARKAN UNTUK ORANG LAIN"
          onPress={() => setShowForm(true)}
        /> */}
      </View>

      {/* input data siswa */}
      {chooseOther === false && chooseSelf === false ? null : (
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            marginBottom: 20,
          }}>
          <TextJudul title="Isi Data" />
          <>
            <Input
              title="Nama Siswa"
              value={data.nama}
              placeholder="Masukkan Nama Siswa"
              onChangeText={value => handleOnchangeInput(value, 'nama')}
            />

            <DropDownSiswa
              title="Jenis Kelamin"
              placeholder={
                jenisKelamin === null
                  ? 'Pilih jenis kelamin'
                  : jenisKelamin?.nama
              }
              mapData={jenisKelaminData}
              selectedValue={jenisKelamin}
              onChangeValue={itemValue => setJenisKelamin(itemValue)}
            />

            <Input
              keyboardType="number-pad"
              title="Umur Siswa:"
              placeholder="Masukkan Umur Siswa"
              value={data.umur}
              onChangeText={value => handleOnchangeInput(value, 'umur')}
            />

            {/* </View> */}

            <Input
              title="Alamat Lengkap"
              placeholder={`Masukkan Alamat Siswa dengan lengkap, atau kamu bisa menggunakan alamat yang sekarang, cukup klik "Gunakan alamat Sekarang"`}
              value={data.alamatLengkap}
              onChangeText={value =>
                handleOnchangeInput(value, 'alamatLengkap')
              }
            />
            {data.alamatLengkap === '' && (
              <TouchableOpacity
                onPress={handleClickAlamat}
                style={{
                  borderWidth: 1,
                  borderColor: Warna.primary.satu,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  // alignSelf: 'flex-end',
                  // marginBottom: -30,
                  marginTop: 20,
                  backgroundColor: Warna.putih,
                  zIndex: 999,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextBody
                  style={{color: Warna.primary.satu}}
                  title="Gunakan Alamat Sekarang"
                />
              </TouchableOpacity>
            )}
            <DropDownSiswa
              title="Mata Pelajaran"
              placeholder={
                dataPelajaran === null
                  ? 'Pilih Mata Pelajaran'
                  : dataPelajaran?.nama
              }
              mapData={pelajaranData}
              selectedValue={dataPelajaran}
              onChangeValue={
                itemValue => setDataPelajaran(itemValue)
                // handleOnchangeInput(itemValue.nama, 'mataPelajaran')
              }
            />
            <DropDownSiswa
              title="Jam Pertemuan"
              placeholder={
                jamPertemuan === null
                  ? 'Pilih jam Pelajaran'
                  : jamPertemuan?.nama
              }
              mapData={jamPertemuanData}
              selectedValue={jamPertemuan}
              onChangeValue={itemValue => setJamPertemuan(itemValue)}
            />
          </>
        </View>
      )}
    </View>
  );
};

export default ProfilSiswa;
