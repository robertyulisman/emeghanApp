import React from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import CardPembelajaran from '../../components/molecules/CardPembelajaran';
import EmptyOrder from '../../components/molecules/EmptyOrder';
import HighlightSection from '../../components/molecules/HighlightSection';
import BottomHighlight from '../../components/molecules/HighlightSection/BottomHighlight';
import HeaderHighlight from '../../components/molecules/HighlightSection/HeaderHighlight';
import MainHighlight from '../../components/molecules/HighlightSection/MainHighlight';
import {Warna} from '../../utils/Data';

const SemuaGuru = () => {
  const {profile} = useSelector(state => state.profile);
  const [data, setData] = React.useState(profile.pesanan);
  // React.useEffect(() => {
  //   const filterData = profile.pesanan.filter(
  //     data =>
  //       data.statusDiterima === 'diterima' &&
  //       data.statusPembayaran === 'lunas' &&
  //       data.statusPesanan === 'sedang berlangsung',
  //   );
  //   setData(filterData);
  // }, []);

  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      {data.length > 0 ? (
        <FlatList
          keyExtractor={item => item._id}
          data={data}
          renderItem={({item, index}) => {
            return <CardPembelajaran item={item} title={item.sisaPertemuan} />;
          }}
          showsVerticalScrollIndicator={false}
          decelerationRate={'fast'}
        />
      ) : (
        <EmptyOrder />
      )}
    </View>
  );
};

export default SemuaGuru;
