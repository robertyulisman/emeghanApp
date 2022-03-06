import React from 'react';
import {View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import GambarCustom from '../../components/atoms/GambarCustom';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import CardItem from '../../components/molecules/CardItem';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';
import {formatNumber} from '../../utils/Fungsi';

const Futsal = ({navigation}) => {
  const dataFutsal = [
    {
      id: 1,
      nama: 'Meghan Futsal Lap. Kiri',
      harga: 120000,
      rating: 4.5,
      lokasi: 'Pulau Burung',
      fasilitas: ['wc', 'kantin'],
      keterangan: 'ini leterangan lapanga futsal',
      gambar:
        'http://www.staradmiral.com/wp-content/uploads/2017/01/Empat-Macam-Lapangan-Futsal.jpg',
    },
    {
      id: 2,
      nama: 'Meghan Futsal Lap. Kanan Timur',
      harga: 150000,
      rating: 4.8,
      lokasi: 'Pulau Burung',
      fasilitas: ['wc', 'kantin'],
      keterangan:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Netus urna, bibendum in sit aliquet. Morbi nulla diam facilisi in ut. Id morbi rutrum dapibus sit sollicitudin eu sit dictum vitae. Sit hendrerit tellus auctor ac nibh arcu nunc. Proin non convallis eget duis id cras ullamcorper. Dolor, amet, ut et etiam viverra fusce interdum sit. Morbi a pulvinar pharetra netus. Commodo, duis sed condimentum est vehicula. Habitasse nulla.',
      gambar:
        'https://www.karyatukang.com/wp-content/uploads/2020/04/biaya-pembuatan-lapangan-futsal.jpg',
    },
    {
      id: 3,
      nama: 'Meghan Futsal Lap. Kanan Barat',
      harga: 170000,
      rating: 4,
      lokasi: 'Pulau Burung',
      fasilitas: ['wc', 'kantin'],
      keterangan: 'ini leterangan lapanga futsal',
      gambar:
        'https://www.cienciaconjunta.com/wp-content/uploads/2020/09/biaya-paket-pendirian-PT-Bisnis-lapangan-futsal.jpg',
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <TopBarNew title="Booking Lapangan" />
      <View>
        {dataFutsal.map(item => (
          <CardItem
            key={item.id}
            onPress={() => navigation.navigate('DetailLapangan', {data: item})}
            source={{uri: item.gambar}}
            title={item.nama}
            rating={item.rating}
            harga={`${formatNumber(item.harga)}`}
          />
        ))}
      </View>
    </View>
  );
};

export default withNavigation(Futsal);
