import React from 'react';
import {View, Text} from 'react-native';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';
import {useSelector} from 'react-redux';
import TextHeading from '../../components/atoms/TextHeading';
import TextBody from '../../components/atoms/TextBody';
import {formatNumber} from '../../utils/Fungsi';
import InputProfile from '../../components/molecules/InputProfile';
import InputCustom from '../../components/molecules/InputCustom';
import Tombol from '../../components/atoms/Tombol';
import {withNavigation} from 'react-navigation';
import {dataBank} from '../../../dataBank';
import DropDownAlamat from '../../components/molecules/DropDownAlamat';
import DropDownSiswa from '../../components/molecules/DropDownSiswa';
import axios from 'axios';

const InfoPembayaran = () => {
  const {profile} = useSelector(state => state.profile);
  const [namaBank, setNamaBank] = React.useState(null);
  const [form, setForm] = React.useState({
    noRek: '',
  });

  const handleOnchange = (value, type) => {
    setForm({
      ...form,
      [type]: value,
    });
  };

  const handleCekRek = () => {
    const data = {
      nomer: form.noRek,
      code: namaBank?.nama,
    };

    console.log(`no rek`, data);

    axios
      .post('https://irfan.co.id/nama-rek/api', data)
      .then(res => console.log(`respon sukses cek bank`, res.data))
      .catch(err => console.log(`respon error cek bank`, err));
  };

  const handleAddBank = () => {
    const data = {
      nomer: form.noRek,
      code: namaBank?.nama,
    };

    console.log(`no rek`, data);
  };

  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      <TopBarNew title="Tambah Rekening Tujuan" />

      <View style={{marginHorizontal: 20, height: 90}}>
        <TextBody title="Pilih Rekening Bank" />
        <DropDownAlamat
          isUpdate={true}
          placeholder="Pilih Nama Bank"
          selectedValue={namaBank}
          mapData={dataBank}
          onChangeValue={value => setNamaBank(value)}
        />
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <InputCustom
          label="Masukkan Nomor Rekening"
          editable={true}
          value={form.noRek}
          onChangeText={value => handleOnchange(value, 'noRek')}
          placeholder="Nomor rekening"
          keyboardType="number-pad"
        />
      </View>

      <Tombol
        onPress={handleAddBank}
        style={{margin: 20}}
        primary
        title="Tambah Rekening Tujuan"
      />
    </View>
  );
};

export default InfoPembayaran;
