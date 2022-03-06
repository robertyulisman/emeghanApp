import React from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Warna} from '../../utils/Data';
import {useDispatch, useSelector} from 'react-redux';
import TopBarNew from '../../components/molecules/TopBarNew';
import BottomNavBar from '../../components/molecules/BottomNavBar';
import TextJudul from '../../components/atoms/TextJudul';
import TextBody from '../../components/atoms/TextBody';
import GambarCustom from '../../components/atoms/GambarCustom';
import {formatNumber} from '../../utils/Fungsi';
import Tombol from '../../components/atoms/Tombol';
import TextHeading from '../../components/atoms/TextHeading';
import IconVector from 'react-native-vector-icons/AntDesign';
import {
  deleteItemtoCart,
  updateCart,
} from '../../config/redux/actions/tokoAction';
import EmptyOrder from '../../components/molecules/EmptyOrder';

const Keranjang = ({navigation}) => {
  const {dataKeranjang} = useSelector(state => state.toko);
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [totalHarga, setTotalHarga] = React.useState(0);
  //   console.log(`dataKeranjang`, dataKeranjang);

  React.useEffect(() => {
    const newData = dataKeranjang.map(i => {
      return {
        ...i,
        total: i.harga * i.jumlah,
      };
    });
    setData(newData);
    const total = newData.reduce((a, b) => a + (b.total || 0), 0);
    setTotalHarga(total);
  }, [dataKeranjang]);

  const [jumlah, setJumlah] = React.useState('');
  const onChangeText = (value, item) => {
    console.log(`value`, value);
    // console.log(`item`, item);

    const newData = data.map(i => {
      if (i.id === item.id) {
        return {
          ...i,
          jumlah: value === '' ? '' : parseInt(value),
          total: value === '' ? i.harga * 0 : i.harga * value,
        };
      } else {
        return {
          ...i,
          jumlah: i.jumlah,
          total: i.harga * i.jumlah,
        };
      }
    });
    setData(newData);
    console.log(`data newData`, newData);
    dispatch(updateCart(newData));
    const total = newData.reduce((a, b) => a + (b.total || 0), 0);
    setTotalHarga(total);
  };

  const handleSubmit = () => {
    const data = {
      ...dataKeranjang,
      total: totalHarga,
    };
    console.log(`data submit`, data);
    navigation.navigate('Pembayaran', {dataOrder: data, type: 'toko'});
  };

  const handleDeleteProduct = item => {
    dispatch(deleteItemtoCart(item));

    // const total = data.reduce((a, b) => a + (b.total || 0), 0);
    // console.log(`total handleDeleteProduct `, total)
    // setTotalHarga(total);
  };

  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <TopBarNew single title="Keranjang" />
      <StatusBar
        backgroundColor={Warna.primary.satu}
        barStyle="light-content"
      />
      <View style={{flex: 1}}>
        {dataKeranjang.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={dataKeranjang}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    marginTop: 10,
                    marginHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: Warna.putih,
                    borderRadius: 10,
                    shadowColor: Warna.grayscale.tiga,
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,

                    elevation: 7,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: 10,
                      backgroundColor: Warna.merah,
                      padding: 2,
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 999,
                    }}
                    onPress={() => handleDeleteProduct(item)}>
                    <IconVector name="close" color={Warna.putih} />
                  </TouchableOpacity>
                  <GambarCustom
                    style={{width: 100, height: 100}}
                    source={{uri: item.gambar}}
                  />
                  <View style={{marginHorizontal: 10, flex: 1}}>
                    <TextJudul title={item.title} />
                    <TextBody title={item.desc} />
                    <TextJudul title={`${formatNumber(item.harga)}`} />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <TextBody style={{flex: 1}} title="Masukkan Jumlah" />
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: Warna.grayscale.empat,
                          width: 50,
                          borderRadius: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <TextInput
                          placeholder={item.jumlah.toString()}
                          value={item.jumlah.toString()}
                          maxLength={2}
                          keyboardType="number-pad"
                          onChangeText={value => onChangeText(value, item)}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <EmptyOrder title="Belum ada Data" />
        )}
      </View>
      {dataKeranjang.length > 0 && (
        <>
          <View style={{marginHorizontal: 20, paddingTop: 10}}>
            <TextBody title="Total Harga" />
            <TextHeading title={`${formatNumber(totalHarga)}`} />
          </View>
          <Tombol
            style={{marginHorizontal: 20, marginBottom: 20}}
            primary
            title="Lanjutkan"
            onPress={handleSubmit}
          />
        </>
      )}

      <BottomNavBar belajarActive />
    </View>
  );
};

export default withNavigation(Keranjang);
