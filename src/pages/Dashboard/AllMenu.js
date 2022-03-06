import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';
import {useSelector} from 'react-redux';
import Pembatas from '../../components/atoms/Pembatas';
import TextJudul from '../../components/atoms/TextJudul';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';
import MenuItem from './MenuItem';

const AllMenu = ({navigation}) => {
  const {type} = navigation.state.params;
  const {daftarHarga} = useSelector(state => state.ppob);
  console.log('daftarHarga', daftarHarga);

  const handlePembelian = value => {
    const filterKategori = type => {
      return daftarHarga.filter(item => item.category === type);
    };
    console.log(`value`, value);
    switch (value) {
      case 'Pulsa':
        navigation.navigate('Pulsa', {
          data: filterKategori(value),
          type: 'Pulsa',
        });

        break;
      case 'PaketData':
        navigation.navigate('Pulsa', {
          data: filterKategori('Data'),
          type: 'Paket Data',
        });

        break;
      case 'PaketNelpon':
        navigation.navigate('Pulsa', {
          data: filterKategori('Paket SMS & Telpon'),
          type: 'Paket SMS & Telpon',
        });

        break;
      case 'E-Money':
        navigation.navigate('EMoney', {
          data: filterKategori('E-Money'),
          type: 'E-Money',
        });
        break;
      case 'PLN':
        navigation.navigate('Pln', {
          data: filterKategori('PLN'),
          type: 'Token Listrik',
        });

        break;

      default:
        break;
    }
    // navigation.navigate(value);
  };
  return (
    <View style={{flex: 1}}>
      <TopBarNew title="Semua Menu" />
      <ScrollView style={{flex: 1}}>
        {/* menu khusus */}
        {type === 'all' && (
          <>
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginBottom: 10,
              }}>
              <TextJudul title="Menu Khusus" />

              <View style={{flexDirection: 'row', marginTop: 20}}>
                <MenuItem
                  title="Hotel"
                  source={require('../../assets/menu/hotel.png')}
                  onPress={() => navigation.navigate('Hotel')}
                />
                <MenuItem
                  title="Wa Direct"
                  source={require('../../assets/menu/waDirect.png')}
                  onPress={() => navigation.navigate('WaDirect')}
                />
                <MenuItem
                  title="Toko"
                  source={require('../../assets/menu/toko.png')}
                  onPress={() => navigation.navigate('Toko')}
                />
                <MenuItem
                  title="Futsal"
                  source={require('../../assets/menu/futsal.png')}
                  onPress={() => navigation.navigate('Futsal')}
                />
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                }}>
                <MenuItem
                  title="Cek Ongkir"
                  source={require('../../assets/menu/cekOngkir.png')}
                  onPress={() => navigation.navigate('CekOngkir')}
                />
                <MenuItem />
                <MenuItem />
                <MenuItem />
              </View>
            </View>
            <Pembatas />
          </>
        )}

        {/* garis pembatas */}

        {/* menu favorite */}
        {type === 'pembelian' || type === 'all' ? (
          <>
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginBottom: 10,
              }}>
              <TextJudul title="Pembelian" />

              <View style={{flexDirection: 'row', marginTop: 20}}>
                <MenuItem
                  title="Pulsa"
                  source={require('../../assets/menu/pulsa.png')}
                  onPress={() => handlePembelian('Pulsa')}
                />
                <MenuItem
                  title="Paket Data"
                  source={require('../../assets/menu/paketData.png')}
                  onPress={() => handlePembelian('PaketData')}
                />
                <MenuItem
                  title="Token Listrik"
                  source={require('../../assets/menu/tokenListrik.png')}
                  onPress={() => handlePembelian('PLN')}
                />
                <MenuItem
                  title="E-Money"
                  source={require('../../assets/menu/eMoney.png')}
                  onPress={() => handlePembelian('E-Money')}
                />
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                }}>
                <MenuItem
                  // style={{alignItems: 'flex-start'}}
                  title="Paket Nelpon"
                  source={require('../../assets/menu/paketNelpon.png')}
                  // onPress={() => navigation.navigate('PaketNelpon')}
                  onPress={() => handlePembelian('PaketNelpon')}
                />
                <MenuItem
                  // style={{alignItems: 'flex-start'}}
                  title="Voucher Game"
                  source={require('../../assets/menu/voucherGame.png')}
                />
                <MenuItem />
                <MenuItem />
              </View>
            </View>
            <Pembatas />
          </>
        ) : null}

        {/* garis pembatas */}

        {/* menu pembayaran/ tagihan */}
        {type === 'pembayaran' || type === 'all' ? (
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginBottom: 20,
            }}>
            <TextJudul title="Pembayaran/ Tagihan" />

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <MenuItem
                title="BPJS"
                source={require('../../assets/menu/bpjs.png')}
              />
              <MenuItem
                title="Tagihan Internet"
                source={require('../../assets/menu/paketData.png')}
              />
              <MenuItem
                title="Tagihan Listrik"
                source={require('../../assets/menu/tagihanListrik.png')}
              />
              <MenuItem
                title="PDAM"
                source={require('../../assets/menu/pdam.png')}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
              }}>
              <MenuItem
                // style={{alignItems: 'flex-start'}}
                title="PBB"
                source={require('../../assets/menu/pbb.png')}
              />
              <MenuItem
                // style={{alignItems: 'flex-start'}}
                title="Multi Finance"
                source={require('../../assets/menu/multifinance.png')}
              />
              <MenuItem />
              <MenuItem />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default withNavigation(AllMenu);
