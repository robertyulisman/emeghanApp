import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import TopLabel from '../../components/atoms/TopLabel';
import TopBar from '../../components/molecules/TopBar';
import {apiUrl, Warna} from '../../utils/Data';
import TextCustom from '../../guruApp/LaporanBelajar/TextCustom';
import DatePicker from 'react-native-date-picker';
import TextForm from '../../guruApp/LaporanBelajar/TextForm';
// import TextFormImage from '../../guruApp/LaporanBelajar/TextFormImage';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import TombolAksi from '../../components/molecules/TombolAksi';
import axios from 'axios';
import {ToastDefault} from '../../utils/Fungsi';
import {getProfileUser} from '../../config/redux/actions/profileActions';
import EmptyOrder from '../../components/molecules/EmptyOrder';
import moment from 'moment';
import TopBarNew from '../../components/molecules/TopBarNew';
import TextJudul from '../../components/atoms/TextJudul';
import TextBody from '../../components/atoms/TextBody';
import Tombol from '../../components/atoms/Tombol';
import {withNavigation} from 'react-navigation';
import GambarCustom from '../../components/atoms/GambarCustom';
import {TouchableOpacity} from 'react-native-gesture-handler';
import InputProfile from '../../components/molecules/InputProfile';
import DropDownAlamat from '../../components/molecules/DropDownAlamat';

const LaporanBelajarReport = ({navigation}) => {
  const {data} = navigation.state.params;
  const [indek, setIndek] = React.useState(0);
  const [newDate, setNewDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(
    moment(new Date()).format('Do MMMM YYYY'),
  );
  const [form, setForm] = React.useState({
    // targetMengaji: '',
    hasilMengaji: '',
    nilaiMengaji: '',
    // targetHafalan: '',
    hasilHafalan: '',
    nilaiHafalan: '',
  });
  const [dataLaporan, setDataLaporan] = React.useState(
    data.laporanBelajar[indek],
  );

  const handleOnchange = (value, input) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  console.log(`data laporan belajar`, data);
  const [dataPelajaran, setDataPelajaran] = React.useState([]);
  const [dataSubPelajaran, setDataSubPelajaran] = React.useState([]);
  const [dataTargetHafalan, setDataTargetHafalan] = React.useState([]);
  const [pelajaran, setPelajaran] = React.useState(null);
  const [subPelajaran, setSubPelajaran] = React.useState(null);
  const [targetHafalan, setTargetHafalan] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${apiUrl}/api/pelajaran/${data.mataPelajaran._id}`)
      .then(res => {
        console.log(
          `respon pelajaran ==================================`,
          res.data,
        );
        setDataPelajaran(res.data);
        setDataTargetHafalan(res.data.targetHafalan);
      })
      .catch(err => console.log(`err`, err));
  }, []);

  const handleSelectPelajaran = itemValue => {
    // console.log(`itemValue pelajaran nih guys`, itemValue);
    setPelajaran(itemValue);
    setDataSubPelajaran(itemValue?.subMateri);
    setForm({
      ...form,
      hasilMengaji:
        itemValue?.nama === undefined || itemValue === null
          ? ''
          : `Ananda sudah bisa Memahami ${itemValue.nama}`,
    });
  };

  const handleSelectSub = itemValue => {
    setSubPelajaran(itemValue);
    setForm({
      ...form,
      hasilMengaji: form.hasilMengaji + ` tentang ${itemValue.nama}`,
    });
  };

  const handleSelectTargetHafalan = itemValue => {
    setTargetHafalan(itemValue);
    // console.log(`itemValue suuub pelajaran nih guys`, itemValue);
    setForm({
      ...form,
      hasilHafalan:
        itemValue?.nama === undefined
          ? ''
          : `Ananda sudah berhasil menghafal ${itemValue.nama}`,
    });
  };

  const handleSubmitLaporan = () => {
    const newForm = {
      ...form,
      tanggal: newDate,
      pertemuanKe: data.absensiGuru.length + 1,
      idPesanan: data._id,
      targetMengaji: pelajaran.nama + ' ' + subPelajaran?.nama,
      targetHafalan: targetHafalan.nama,
    };
    console.log('ini data submit', newForm);

    axios
      .post(`${apiUrl}/api/laporanbelajar/${data._id}`, newForm)
      .then(res => {
        ToastDefault('Laporan Kamu Berhasil dikirim');

        console.log(`form`, res.data);
        setForm({
          hasilMengaji: '',
          nilaiMengaji: '',

          hasilHafalan: '',
          nilaiHafalan: '',
        });
        setPelajaran(null), setSubPelajaran(null), setTargetHafalan(null);
      });
  };

  const newDataPelajaran = dataPelajaran.length !== 0 && dataPelajaran.materi;
  console.log(`dataPelajaran`, newDataPelajaran);
  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      {/* <TopBar title="Laporan Belajar" left /> */}
      <TopBarNew title="Detail Laporan Hasil Belajar" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextJudul title={data.namaSiswa} />
            <View
              style={{
                backgroundColor: Warna.primary.lima,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 8,
              }}>
              <TextBody title={data.mataPelajaran.nama} />
            </View>
          </View>
          <TextBody
            style={{marginBottom: 10}}
            title={`${data.daftarPaket.nama} ${data.totalPertemuan} Pertemuan`}
          />
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <GambarCustom
              style={{width: 25, height: 25}}
              source={require('../../assets/figma/hasil_icon.png')}
            />

            <View
              style={{
                marginHorizontal: 10,
                flex: 1,
                flexDirection: 'row',
              }}>
              <TextBody title={`Pertemuan ke ${data.absensiGuru.length + 1}`} />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <GambarCustom
              style={{width: 25, height: 25}}
              source={require('../../assets/figma/kalender.png')}
            />

            <View
              style={{
                // justifyContent: 'center',
                marginHorizontal: 10,
                flex: 1,
                flexDirection: 'row',
              }}>
              <TextBody
                title={moment(newDate).format('Do MMMM YYYY, h:mm:ss a')}
              />
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{marginLeft: 10}}>
                <TextBody style={{color: Warna.primary.satu}} title="ubah" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 8,
            backgroundColor: Warna.grayscale.empat,
            marginVertical: 10,
          }}
        />

        {/* hafalan */}
        <View
          style={{
            marginHorizontal: 20,
            // borderWidth: 1,
            // borderColor: Warna.grayscale.empat,
            borderRadius: 8,
            overflow: 'hidden',
            shadowColor: Warna.grayscale.tiga,
            backgroundColor: Warna.grayscale.lima,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 25,
          }}>
          <TopLabel title="Laporan Mengaji" />
          <View style={{padding: 10}}>
            <DropDownAlamat
              isUpdate={true}
              //   value={subPelajaran}
              title="Materi Pelajaran"
              placeholder="Pilih Materi Pelajaran"
              selectedValue={pelajaran}
              onChangeValue={itemValue => handleSelectPelajaran(itemValue)}
              mapData={newDataPelajaran}
            />
            {dataSubPelajaran !== null &&
              dataSubPelajaran !== undefined &&
              dataSubPelajaran.length > 0 && (
                <DropDownAlamat
                  isUpdate={true}
                  //   value={subPelajaran}
                  title="Submateri pelajaran"
                  placeholder="Pilih submateri pelajaran"
                  selectedValue={subPelajaran}
                  onChangeValue={itemValue => handleSelectSub(itemValue)}
                  mapData={dataSubPelajaran}
                />
              )}

            <InputProfile
              title="Hasil Mengaji"
              editable={true}
              value={form.hasilMengaji}
              onChangeText={value => handleOnchange(value, 'hasilMengaji')}
              placeholder="Masukkan hasil pencapaian"
            />
            <InputProfile
              title="Nilai Mengaji"
              editable={true}
              value={form.nilaiMengaji}
              onChangeText={value => handleOnchange(value, 'nilaiMengaji')}
              placeholder="Masukkan nilai hafalan"
              keyboardType="number-pad"
            />
          </View>
        </View>

        {/* mengaji */}
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: Warna.grayscale.lima,
            shadowColor: Warna.grayscale.tiga,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 25,
            borderRadius: 8,
            marginTop: 20,
            overflow: 'hidden',
          }}>
          <TopLabel title="Laporan Hafalan" />
          <View style={{padding: 10}}>
            <DropDownAlamat
              isUpdate={true}
              //   value={subPelajaran}
              title="Materi Pelajaran"
              placeholder="Pilih Materi Target Hafalan"
              selectedValue={targetHafalan}
              onChangeValue={itemValue => handleSelectTargetHafalan(itemValue)}
              mapData={dataTargetHafalan}
            />

            <InputProfile
              title="Hasil Hafalan"
              editable={true}
              value={form.hasilHafalan}
              onChangeText={value => handleOnchange(value, 'hasilHafalan')}
              placeholder="Masukkan hasil pencapaian"
            />
            <InputProfile
              title="Nilai Hafalan"
              editable={true}
              value={form.nilaiHafalan}
              onChangeText={value => handleOnchange(value, 'nilaiHafalan')}
              placeholder="Masukkan nilai hafalan"
              keyboardType="number-pad"
            />
            {/* <TextForm
              valueInput={form.hasilHafalan}
              onChangeText={value => handleOnchange(value, 'hasilHafalan')}
              keyTitle="Hasil"
              valueTitle="hasil pencapaian"
            />
            <TextForm
              valueInput={form.nilaiHafalan}
              onChangeText={value => handleOnchange(value, 'nilaiHafalan')}
              keyTitle="Nilai"
              valueTitle="nilai"
              keyboardType="number-pad"
            /> */}
            {/* <View style={{flexDirection: 'row'}}>
              <GambarCustom
                style={{width: 25, height: 25}}
                source={require('../../assets/figma/target_icon.png')}
              />

              <View
                style={{
                  justifyContent: 'center',
                  marginHorizontal: 10,
                  flex: 1,
                }}>
                <TextBody
                  title={`Pertemuan ke ${dataLaporan?.mengaji?.target}`}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <GambarCustom
                style={{width: 25, height: 25}}
                source={require('../../assets/figma/hafalan_icon.png')}
              />

              <View
                style={{
                  justifyContent: 'center',
                  marginHorizontal: 10,
                  flex: 1,
                }}>
                <TextBody
                  title={`Pertemuan ke ${dataLaporan?.mengaji?.hasil}`}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TextBody title="Nilai Hafalan" />
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <TextBody
                  style={{
                    fontSize: 22,
                    justifyContent: 'center',
                    marginLeft: 10,
                    color: Warna.primary.satu,
                  }}
                  title={`${dataLaporan?.mengaji?.nilai}`}
                />
                <TextBody style={{justifyContent: 'center'}} title="/100" />
              </View>
            </View> */}
          </View>
        </View>
      </ScrollView>
      <DatePicker
        title="Pilih Tanggal"
        modal
        open={open}
        date={newDate}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setNewDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <Tombol
        style={{margin: 20}}
        primary
        title="Submit"
        onPress={handleSubmitLaporan}
      />
    </View>
  );
};

export default withNavigation(LaporanBelajarReport);
