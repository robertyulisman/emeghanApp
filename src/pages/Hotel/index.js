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

const Hotel = ({navigation}) => {
  const dataHotel = [
    {
      id: 1,
      nama: 'Standard Room',
      harga: 120000,
      rating: 4.5,
      lokasi: 'Pulau Burung',
      fasilitas: ['wc', 'kantin', 'Ac', 'Wifi'],
      keterangan: 'ini leterangan lapanga futsal',
      gambar:
        'https://cdn1-production-images-kly.akamaized.net/XfFJl7orCkM7I6a3AGHPb7zWFPM=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3143127/original/026323600_1591185786-WhatsApp_Image_2020-06-03_at_6.33.56_PM.jpeg',
    },
    {
      id: 2,
      nama: 'Superior Room',
      harga: 150000,
      rating: 4.8,
      lokasi: 'Pulau Burung',
      fasilitas: ['wc', 'kantin', 'Ac', 'Wifi'],
      keterangan:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Netus urna, bibendum in sit aliquet. Morbi nulla diam facilisi in ut. Id morbi rutrum dapibus sit sollicitudin eu sit dictum vitae. Sit hendrerit tellus auctor ac nibh arcu nunc. Proin non convallis eget duis id cras ullamcorper. Dolor, amet, ut et etiam viverra fusce interdum sit. Morbi a pulvinar pharetra netus. Commodo, duis sed condimentum est vehicula. Habitasse nulla.',
      gambar:
        'https://indo-remotecache.99.co/20200203/140954/bb9d561569fda1a38fad6e750fae9d27/tipe%20kamar%20hotel.jpg',
    },
    {
      id: 3,
      nama: 'Deluxe Room',
      harga: 170000,
      rating: 4,
      lokasi: 'Pulau Burung',
      fasilitas: ['wc', 'kantin', 'Ac', 'Wifi'],
      keterangan: 'ini leterangan lapanga futsal',
      gambar:
        'https://img.okezone.com/content/2020/12/07/406/2323412/jangan-malas-membersihkan-kamar-hotel-saat-staycation-banyak-gunanya-loh-Tq2su5D7kE.jpg',
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <TopBarNew title="Pilih Kamar" />
      <View>
        {dataHotel.map(item => (
          <CardItem
            key={item.id}
            onPress={() => navigation.navigate('DetailHotel', {data: item})}
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

export default withNavigation(Hotel);
