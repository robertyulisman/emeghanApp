import React, {useState} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import TopBarNew from '../../components/molecules/TopBarNew';
import Contacts from 'react-native-contacts';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import TextJudul from '../../components/atoms/TextJudul';
import TextBody from '../../components/atoms/TextBody';
import {Warna} from '../../utils/Data';
import ListKontak from './ListKontak';
import InputKontak from './InputKontak';
import TextHeading from '../../components/atoms/TextHeading';
import BottomSheet from 'react-native-bottomsheet-reanimated';
import Tombol from '../../components/atoms/Tombol';
import {withNavigation} from 'react-navigation';

const width = Dimensions.get('screen').width;

const PaketData = ({navigation}) => {
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
    console.log(`item======>`, item);
    setNoHp(item.phoneNumbers[0].number);
    setShowKontak(false);
    setNamaKontak('');
  };

  const handleSearchKontak = value => {
    setNamaKontak(value);
    const newDataFilter = dataKontakFilter.filter(
      item => item.displayName.toUpperCase().indexOf(value.toUpperCase()) > -1,
    );
    setDataKontak(newDataFilter);
  };

  const dataPaket = [
    {
      id: 1,
      nama: '1rb',
      harga: 1.75,
    },
    {
      id: 2,
      nama: '5rb',
      harga: 5.75,
    },
    {
      id: 3,
      nama: '10rb',
      harga: 12.0,
    },
    {
      id: 4,
      nama: '20rb',
      harga: 22.0,
    },
    {
      id: 5,
      nama: '50rb',
      harga: 50.0,
    },
    {
      id: 6,
      nama: '100rb',
      harga: 100.0,
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <TopBarNew
        onPress={showKontak ? () => setShowKontak(false) : null}
        title={showKontak ? 'Pilih dari Kontak' : 'Paket Data'}
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
            onChangeInput={value => setNoHp(value)}
            handleGetContact={handleGetContact}
            loading={loading}
          />
          {noHp.length > 8 && (
            <View style={{marginTop: 20, marginHorizontal: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {dataPaket.map(item => (
                  <TouchableOpacity
                    onPress={() => sheetRef.current.snapTo(0)}
                    key={item.id}
                    style={{
                      // flex: 1,

                      padding: 15,
                      borderWidth: 1,
                      borderColor: Warna.grayscale.empat,
                      borderRadius: 15,
                      margin: 5,
                      width: width / 2 - 20,
                    }}>
                    <TextHeading title={item.nama} />
                    <TextBody title={`Harga : Rp. ${item.harga}`} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
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
              <TextJudul title="082288307590" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TextBody title="Produk" />
              <TextJudul title="Pulsa 1rb" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TextBody title="Provider" />
              <TextJudul title="Telkomsel" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TextBody title="Harga" />
              <TextJudul title="Rp. 2.000" />
            </View>
            <Tombol
              onPress={() => {
                sheetRef.current.snapTo(2), navigation.navigate('DetailPage');
              }}
              style={{marginTop: 20}}
              primary
              title="Selanjutnya"
            />
          </View>
        }
      />
    </View>
  );
};

export default withNavigation(PaketData);
