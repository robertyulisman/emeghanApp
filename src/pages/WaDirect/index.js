import React from 'react';
import {View, Text, Linking} from 'react-native';
import {withNavigation} from 'react-navigation';
import TextBody from '../../components/atoms/TextBody';
import Tombol from '../../components/atoms/Tombol';
import InputProfile from '../../components/molecules/InputProfile';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';
import {formatNumber} from '../../utils/Fungsi';

const WaDirect = ({navigation}) => {
  const data = navigation.state.params;
  // const {data, tujuan, asal, berat, nama} = navigation.state.params;

  console.log(`params wa direct`, data);
  const [form, setForm] = React.useState({
    noHp: '',
    text: '',
  });

  React.useEffect(() => {
    const text =
      data !== undefined &&
      `pengiriman dari ${data?.asal} ke ${data?.tujuan} dengan berat ${
        data?.berat
      } gram menggunakan ${data?.nama} - ${
        data?.data.service
      } dengan harga perKg ${formatNumber(data?.data.cost[0].value)}`;

    setForm({
      ...form,
      text: text,
    });
  }, []);

  const handleOnchangeText = (value, input) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  const handleSentWa = () => {
    const url = `whatsapp://send?text=${form.text}&phone=${form.noHp}`;

    Linking.openURL(url)
      .then(() => {
        setForm({
          noHp: '',
          text: '',
        });
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('Make sure Whatsapp installed on your device');
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <TopBarNew title="Kirim Pesan ke Whatsapp" />
      <View style={{flex: 1}}>
        <InputProfile
          styleHead={{flex: 0}}
          styleInput={{flex: 0}}
          title="Masukkan No whatsapp"
          keyboardType="number-pad"
          // editable={isUpdate}
          value={form.noHp}
          placeholder="cth:62822"
          onChangeText={value => handleOnchangeText(value, 'noHp')}
        />
        <TextBody
          style={{marginHorizontal: 20, marginTop: 10, marginBottom: 20}}
          title="*pastikan Anda menulis nomor Whatsap diawali dengan angka 62"
        />
        <InputProfile
          styleHead={{flex: 0}}
          styleInput={{flex: 0}}
          title="Masukkan Pesan"
          // editable={isUpdate}
          value={form.text}
          placeholder="tulis pesan"
          onChangeText={value => handleOnchangeText(value, 'text')}
        />
      </View>
      <Tombol
        title="Kirim"
        primary
        style={{margin: 20}}
        onPress={handleSentWa}
      />
    </View>
  );
};

export default withNavigation(WaDirect);
