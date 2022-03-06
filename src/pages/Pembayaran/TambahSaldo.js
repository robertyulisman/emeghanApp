import React from 'react';
import {View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import Tombol from '../../components/atoms/Tombol';
import InputProfile from '../../components/molecules/InputProfile';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';
import {formatNumber} from '../../utils/Fungsi';

const TambahSaldo = ({navigation}) => {
  const [nominal, setNominal] = React.useState('');
  console.log(`nominal`, nominal);

  const handleLanjut = () => {
    const data = {
      total: parseInt(nominal),
    };

    console.log(`nominal`, data);
    navigation.navigate('Pembayaran', {dataOrder: data, type: 'deposit'});
    // dataOrder.total
  };
  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      <TopBarNew title="Isi Saldo" />
      <View style={{flex: 1}}>
        <InputProfile
          styleHead={{flex: 0}}
          image={require('../../assets/icon/tag.png')}
          title="Masukkan Nominal Saldo"
          keyboardType="number-pad"
          value={nominal}
          placeholder="Rp. 0"
          onChangeText={value => setNominal(value)}
        />
      </View>
      <Tombol
        onPress={handleLanjut}
        title="Selanjutnya"
        primary
        style={{margin: 20}}
      />
    </View>
  );
};

export default withNavigation(TambahSaldo);
