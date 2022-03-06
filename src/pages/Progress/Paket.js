import React, {useState} from 'react';
import {View, Text} from 'react-native';
import PaketItem from '../../components/molecules/PaketItem';
import {Warna} from '../../utils/Data';
import {useSelector, useDispatch} from 'react-redux';
import {getDataProduk} from '../../config/redux/actions/dataAction';
import {Flow} from 'react-native-animated-spinkit';

const Paket = ({paket}) => {
  const dispatch = useDispatch();
  const {dataPaket} = useSelector(state => state.data);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // console.log('========component didmount=============');
    setIsLoading(true);

    dispatch(getDataProduk());
  }, []);

  React.useEffect(() => {
    // console.log('========component did update=============');
    if (dataPaket.length > 0) {
      const newData = [];
      dataPaket.map(item => {
        const itemBaru = {
          ...item,
          isSelected: false,
        };
        newData.push(itemBaru);

        setData(newData);
      });
      setIsLoading(false);
    }
  }, [dataPaket]);

  const updateItem = item => {
    const newPackages = data.map(paket => {
      if (paket._id === item._id) {
        return {
          ...paket,
          isSelected: true,
        };
      } else {
        return {
          ...paket,
          isSelected: false,
        };
      }
    });
    setData(newPackages);
  };

  return (
    <View>
      {isLoading === true && (
        <View
          style={{
            // backgroundColor: Warna.merah,
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Flow size={48} color={Warna.biruMuda}></Flow>
        </View>
      )}
      {data.map(item => {
        return (
          <PaketItem
            onPress={() => {
              updateItem(item);
              paket(item);
              // console.log('ini item', item);
            }}
            key={item._id}
            namaPaket={item.nama.toUpperCase()}
            deskripsi={item.keterangan}
            footerNote={item.deskripsi}
            jmlhPertemuan={item.jumlahPertemuan}
            harga={item.harga}
            judul={item.judul}
            style={{
              marginTop: 10,
            }}
            isSelect={item.isSelected === true}
            // primary={item.nama.toUpperCase() === 'PAKET BERDUA' ? false : true}
          />
        );
      })}
    </View>
  );
};

export default Paket;
