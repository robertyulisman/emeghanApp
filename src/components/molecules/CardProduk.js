import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {useDispatch, useSelector} from 'react-redux';
import {addItemtoCart} from '../../config/redux/actions/tokoAction';
import {Warna} from '../../utils/Data';
import {formatNumber} from '../../utils/Fungsi';
import GambarCustom from '../atoms/GambarCustom';
import TextBody from '../atoms/TextBody';
import TextJudul from '../atoms/TextJudul';
import Tombol from '../atoms/Tombol';

const CardProduk = ({onPress, navigation, item}) => {
  const dispatch = useDispatch();
  const {dataKeranjang} = useSelector(state => state.toko);
  //   const [data, setData] = React.useState([]);
  //   console.log(`data`, data);
  // const handleAddItem = item => {
  //   dispatch(addItemtoCart(item));
  // };
  return (
    <View
      style={{
        backgroundColor: Warna.grayscale.lima,
        shadowColor: Warna.grayscale.tiga,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignSelf: 'center',
        elevation: 7,
        width: '100%',
        marginHorizontal: 20,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailProduct', {data: item})}>
        <GambarCustom
          source={{uri: item.gambar}}
          style={{
            width: '100%',
            height: 100,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          padding: 10,
          width: '100%',
          alignItems: 'center',
        }}>
        <TextJudul style={{textAlign: 'center'}} title={item.title} />
        <TextBody style={{textAlign: 'center'}} title={item.desc} />
        <View style={{flexDirection: 'row'}}>
          <TextJudul title={`${formatNumber(item.harga)}`} />
        </View>
      </View>
      <Tombol
        small
        style={{marginHorizontal: 10, marginBottom: 10}}
        secondary
        title="Tambah"
        onPress={onPress}
      />
    </View>
  );
};

export default withNavigation(CardProduk);
