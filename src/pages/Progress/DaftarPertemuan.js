import React, {useState} from 'react';
import {View, Text} from 'react-native';
import LoadingComp from '../../components/atoms/LoadingComp';
import TopLabel from '../../components/atoms/TopLabel';
import PertemuanItem from '../../components/molecules/PertemuanItem';
import {Warna} from '../../utils/Data';

const DaftarPertemuan = ({data, Pertemuan, namaPaket}) => {
  const [data2, setData2] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    if (data.length > 0) {
      const newData = [];
      data.map(item => {
        const itemBaru = {
          ...item,
          isSelected: false,
        };
        newData.push(itemBaru);

        setData2(newData);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  // const [packages, setPackages] = useState(data);
  const updateItem = item => {
    const newPackages = data2.map(paket => {
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
    setData2(newPackages);
  };
  // console.log('data2,length nya brp ?', data2.length);
  // console.log('data2 ini isinya ?', data2);
  return (
    <View>
      {isLoading ? (
        <LoadingComp top={100} />
      ) : data2.length !== 0 ? (
        data2.map((item, index) => {
          return (
            <PertemuanItem
              onPress={() => {
                updateItem(item);
                Pertemuan(item);
              }}
              key={item._id}
              namaPaket={namaPaket}
              jumlah={item.jumlahPertemuan}
              durasi={item.durasi}
              harga={item.totalHarga}
              deskripsi={item.deskripsi}
              catatan={item.catatan}
              // primary={index === 1 ? true : false}
              onSelect={item.isSelected === true ? true : false}
            />
          );
        })
      ) : (
        <View
          style={{alignItems: 'center', marginTop: 100, marginHorizontal: 20}}>
          <Text
            style={{color: Warna.biruTua, fontSize: 18, textAlign: 'center'}}>
            Kamu Bisa Lanjut Ke Step Selanjutnya
          </Text>
        </View>
      )}
    </View>
  );
};

export default DaftarPertemuan;
