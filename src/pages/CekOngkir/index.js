import axios from 'axios';
import React from 'react';
import {View, Text, Linking, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import TextBody from '../../components/atoms/TextBody';
import Tombol from '../../components/atoms/Tombol';
import InputProfile from '../../components/molecules/InputProfile';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';
import Toast from 'react-native-toast-message';

const CekOngkir = ({navigation}) => {
  const [form, setForm] = React.useState({
    asal: '',
    tujuan: '',
    berat: '',
  });
  console.log(`asal`, form.asal);
  console.log(`tujuan`, form.tujuan);
  console.log(`weight`, form.berat);

  const [ongkir, setOngkir] = React.useState([]);
  const [kota, setKota] = React.useState([]);
  const [kotaFilter, setKotaFilter] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [showTujuan, setShowTujuan] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [origin, setOrigin] = React.useState(null);
  const [destination, setDestination] = React.useState(null);

  const handleOnchangeText = (value, input) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  React.useEffect(() => {
    getProv();
  }, []);

  const onChange = (value, input) => {
    if (input === 'asal') {
      setShow(true);
    } else {
      setShowTujuan(true);
    }

    const newDataFilter = kotaFilter.filter(
      item => item.city_name.toUpperCase().indexOf(value.toUpperCase()) > -1,
    );

    setKota(newDataFilter);
  };

  const getProv = () => {
    axios
      .get(`https://api.rajaongkir.com/starter/city`, {
        headers: {key: '55089b4d8169cf9aa8d2ad9c2585442c'},
      })
      .then(res => {
        setKota(res.data.rajaongkir.results);
        setKotaFilter(res.data.rajaongkir.results);
      })
      .catch(err => console.log(`err`, err));
  };

  const handleSentOngkir = () => {
    setLoading(true);
    // if (form.origin !== '' && form )
    const newOngkir = [];
    const dataOngkir = ['tiki', 'pos', 'jne'];
    for (let i = 0; i < dataOngkir.length; i++) {
      // console.log(`i`, dataOngkir[i]);

      const data = {
        origin: origin?.city_id,
        destination: destination?.city_id,
        weight: parseInt(form.berat),
        courier: dataOngkir[i],
      };

      // console.log(`data =============oke`, data);

      axios
        .post(`https://api.rajaongkir.com/starter/cost`, data, {
          headers: {key: '55089b4d8169cf9aa8d2ad9c2585442c'},
        })
        .then(res => {
          // console.log(`res raja ongkir`, res.data.rajaongkir.results);
          newOngkir.push(res.data);
          setLoading(false);
          navigation.navigate('ListOngkir', {
            data: newOngkir,
            tujuan: form.tujuan,
            asal: form.asal,
            berat: form.berat,
          });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'maaf, terjadi kesalahan',
            text2: err,
          });

          console.log(`err`, err);
          setLoading(false);
        });
      setOngkir(newOngkir);
    }
  };
  // console.log(`data raja ongkir==========>`, ongkir);
  // console.log(`data raja ongkir kota==========>`, kota);
  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <TopBarNew title="Cek Ongkir" />
      <View style={{flex: 1}}>
        <InputProfile
          styleHead={{flex: 0}}
          styleInput={{flex: 0}}
          title="Kota Asal"
          value={form.asal}
          placeholder="masukkan kota asal"
          onChangeText={value => {
            onChange(value, 'asal');
            handleOnchangeText(value, 'asal');
          }}
        />
        {show && (
          <View
            style={{
              // width: '100%',
              height: kota.length > 0 ? 200 : 70,
              borderLeftWidth: 1,
              borderBottomWidth: 1,
              borderRightWidth: 1,
              borderColor: Warna.grayscale.empat,
              marginHorizontal: 20,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              paddingHorizontal: 20,
              alignItems: kota.length > 0 ? null : 'center',
              justifyContent: kota.length > 0 ? null : 'center',
            }}>
            {kota.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={kota}
                keyExtractor={item => item.city_id}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setForm({
                          ...form,
                          asal: item.city_name,
                        });
                        setShow(false);
                        setOrigin(item);
                      }}
                      style={{
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: Warna.grayscale.empat,
                      }}>
                      <TextBody key={item.city_name} title={item.city_name} />
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <TextBody title="Tidak ada data" />
            )}
          </View>
        )}

        <InputProfile
          styleHead={{flex: 0}}
          styleInput={{flex: 0}}
          title="Kota Tujuan"
          value={form.tujuan}
          placeholder="masukkan kota tujuan"
          onChangeText={value => {
            handleOnchangeText(value, 'tujuan');
            onChange(value, 'tujuan');
          }}
        />
        {showTujuan && (
          <View
            style={{
              // width: '100%',
              height: kota.length > 0 ? 200 : 70,
              borderLeftWidth: 1,
              borderBottomWidth: 1,
              borderRightWidth: 1,
              borderColor: Warna.grayscale.empat,
              marginHorizontal: 20,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              paddingHorizontal: 20,
              alignItems: kota.length > 0 ? null : 'center',
              justifyContent: kota.length > 0 ? null : 'center',
            }}>
            {kota.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={kota}
                keyExtractor={item => item.city_id}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setForm({
                          ...form,
                          tujuan: item.city_name,
                        });
                        setShowTujuan(false);
                        setDestination(item);
                      }}
                      style={{
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: Warna.grayscale.empat,
                      }}>
                      <TextBody key={item.city_name} title={item.city_name} />
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <TextBody title="Tidak ada data" />
            )}
          </View>
        )}
        <InputProfile
          styleHead={{flex: 0}}
          styleInput={{flex: 0}}
          title="Berat (gram)"
          value={form.berat}
          placeholder="1000"
          keyboardType="number-pad"
          onChangeText={value => handleOnchangeText(value, 'berat')}
        />
      </View>
      <Tombol
        disabled={
          form.asal === '' || form.tujuan === '' || form.berat === '' || loading
        }
        title={loading ? 'Harap Tunggu' : 'Cek Ongkos Kirim'}
        primary
        style={{margin: 20}}
        onPress={handleSentOngkir}
      />
    </View>
  );
};

export default withNavigation(CekOngkir);
