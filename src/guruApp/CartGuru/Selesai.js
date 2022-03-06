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

const Selesai = () => {
  const {profile} = useSelector(state => state.profile);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const filterData = profile.pesanan.filter(
      data => data.statusPesanan === 'selesai',
    );
    setData(filterData);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      {data.length > 0 ? (
        <FlatList
          keyExtractor={item => item._id}
          data={data}
          renderItem={({item, index}) => {
            return (
              <CardPembelajaran
                item={item}
                selesai
                title={item.statusPesanan === 'selesai' && 'Selesai'}
              />
            );
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

export default Selesai;
