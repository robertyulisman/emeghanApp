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

const Withdraw = ({navigation}) => {
  const {profile} = useSelector(state => state.profile);
  const TextList = ({title}) => (
    <View style={{flexDirection: 'row'}}>
      <View
        style={{
          width: 5,
          height: 5,
          backgroundColor: Warna.grayscale.satu,
          borderRadius: 5,
          alignSelf: 'center',
          marginRight: 10,
        }}
      />
      <TextBody style={{fontSize: 12}} title={title} />
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      <TopBarNew title="Withdraw" />
      <View style={{alignItems: 'center'}}>
        <TextBody title="Nominal Saldo Proo" />
        <TextHeading
          style={{paddingVertical: 10}}
          title={formatNumber(profile.saldo)}
        />
      </View>
      <View style={{paddingHorizontal: 20}}>
        <InputCustom
          label="Nominal Penarikan Saldo"
          editable={true}
          //    value={form.nilaiMengaji}
          //    onChangeText={value => handleOnchange(value, 'nilaiMengaji')}
          placeholder="Rp."
          keyboardType="number-pad"
        />
        <View
          style={{
            padding: 10,
            backgroundColor: Warna.secondary.lima,
            borderRadius: 8,
            marginVertical: 20,
          }}>
          <TextList title="Tarik saldo hanya bisa dilakukan 1 kali sehari" />
          <TextList title="Minimal penarikan Rp. 50.000" />
          <TextList title="Maksimal penarikan rp. 5.000.000" />
        </View>
        <TextBody title="Rekening Tujuan" />
      </View>
      <Tombol
        icon
        iconImage="plus"
        style={{margin: 20}}
        secondary
        title="Tambah Rekening Tujuan"
        onPress={() => navigation.navigate('WithdrawRek')}
      />
    </View>
  );
};

export default withNavigation(Withdraw);
