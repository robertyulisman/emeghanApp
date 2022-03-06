import React, {useState} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import TopBarNew from '../../components/molecules/TopBarNew';
import Contacts from 'react-native-contacts';

import TextJudul from '../../components/atoms/TextJudul';
import TextBody from '../../components/atoms/TextBody';
import {apiUrl, Warna} from '../../utils/Data';
import ListKontak from './ListKontak';
import InputKontak from './InputKontak';
import TextHeading from '../../components/atoms/TextHeading';
import BottomSheet from 'react-native-bottomsheet-reanimated';
import Tombol from '../../components/atoms/Tombol';
import {withNavigation} from 'react-navigation';
import {formatNumber, ToastDefault} from '../../utils/Fungsi';
import axios from 'axios';
import {useSelector} from 'react-redux';

const width = Dimensions.get('screen').width;

const EMoneyInput = ({navigation}) => {
  const {profile} = useSelector(state => state.profile);
  const {data, type} = navigation.state.params;
  const [dataTerpilih, setDataTerpilih] = React.useState(null);
  const sheetRef = React.useRef(null);
  const [noHp, setNoHp] = useState('');
  const [namaKontak, setNamaKontak] = useState('');
  const [dataKontak, setDataKontak] = useState([]);
  const [dataKontakFilter, setDataKontakFilter] = useState([]);
  const [showKontak, setShowKontak] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetContact = () => {
    setLoading(true);
    Contacts.getAll().then(contacts => {
      setDataKontak(contacts);
      setDataKontakFilter(contacts);
      setShowKontak(true);
      console.log('get All contacts', contacts[0].displayName);
      setLoading(false);
    });
  };

  const handleSelectKontak = item => {
    let formatted = item.phoneNumbers[0].number.replace(/\D/g, '');
    console.log(`formatted======>`, formatted);
    if (formatted.startsWith('62')) {
      formatted = '0' + formatted.substr(2);
      setNoHp(formatted);
    } else {
      setNoHp(formatted);
    }

    setShowKontak(false);
    setNamaKontak('');
  };

  const handleOnchange = value => {
    setNoHp(value);
    let formatted = value.replace(/\D/g, '');
    console.log('formatted', formatted);
    if (formatted.startsWith('62')) {
      formatted = '0' + formatted.substr(2);
      setNoHp(formatted);
    }
  };

  const handleSearchKontak = value => {
    setNamaKontak(value);
    const newDataFilter = dataKontakFilter.filter(
      item => item.displayName.toUpperCase().indexOf(value.toUpperCase()) > -1,
    );
    setDataKontak(newDataFilter);
  };

  const handleSelanjutnya = () => {
    setLoading(true);
    const body = {
      // sku: 'hp',
      sku: dataTerpilih.buyer_sku_code,
      tujuan: noHp,
      refId: dataTerpilih.buyer_sku_code,
      user: profile._id,
    };
    axios
      .post(`${apiUrl}/api/digiflast/transaksi`, body)
      .then(res => {
        setLoading(false);
        console.log('res.data', res.data);
        sheetRef.current.snapTo(2);
        navigation.navigate('DetailPage');
      })
      .catch(err => {
        setLoading(false);
        console.log('err.response.data', err);
        // ToastDefault(`ERROR : ${err.response.data.data.message}`);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <TopBarNew
        onPress={showKontak ? () => setShowKontak(false) : null}
        title={showKontak ? 'Pilih dari Kontak' : type}
      />

      {showKontak ? (
        <ListKontak
          valueSearch={namaKontak}
          onchangeSearch={value => handleSearchKontak(value)}
          dataKontak={dataKontak}
          handleSelectKontak={item => handleSelectKontak(item)}
        />
      ) : (
        <>
          <InputKontak
            valueInput={noHp}
            onChangeInput={value => {
              handleOnchange(value);
            }}
            handleGetContact={handleGetContact}
            loading={loading}
          />
          {/* {noHp.length > 8 && ( */}
          <View style={{marginTop: 20, marginHorizontal: 10}}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {noHp.length > 3 &&
                data.map(item => (
                  <TouchableOpacity
                    onPress={() => {
                      setDataTerpilih(item);
                      sheetRef.current.snapTo(0);
                    }}
                    key={item.product_name}
                    style={{
                      // flex: 1,

                      padding: 15,
                      borderWidth: 1,
                      borderColor: Warna.grayscale.empat,
                      borderRadius: 15,
                      margin: 5,
                      width: width / 2 - 20,
                    }}>
                    <TextHeading title={item.product_name} />
                    <TextBody title={`Harga : ${formatNumber(item.price)}`} />
                  </TouchableOpacity>
                ))}
            </View>
          </View>
          {/* )} */}
        </>
      )}
      <BottomSheet
        bottomSheerColor="#FFFFFF"
        ref={sheetRef}
        initialPosition={0} //200, 300
        snapPoints={[300, 200, 0]}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
        header={
          <View>
            <TextJudul title="Detail Transaksi" />
          </View>
        }
        body={
          <View
            style={{
              padding: 16,
              height: 450,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextBody title="No Pelanggan" />
              <TextJudul title={noHp} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TextBody title="Produk" />
              <TextJudul title={dataTerpilih?.product_name} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TextBody title="Provider" />
              <TextJudul title={dataTerpilih?.brand} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TextBody title="Harga" />
              <TextJudul title={formatNumber(+dataTerpilih?.price)} />
            </View>
            {/* 
            {loading ? (
              <LoadingComp primary />
            ) : ( */}
            <Tombol
              disabled={loading}
              onPress={handleSelanjutnya}
              style={{marginTop: 20}}
              primary
              title={loading ? 'Sedang di proses' : 'Selanjutnya'}
            />
            {/* )} */}
          </View>
        }
      />
    </View>
  );
};

export default withNavigation(EMoneyInput);
