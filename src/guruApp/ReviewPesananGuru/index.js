import React from 'react';
import {View, Text} from 'react-native';
import TopBar from '../../components/molecules/TopBar';
import {withNavigation} from 'react-navigation';
import {Warna} from '../../utils/Data';
import DetailPesanan from '../../components/Template/DetailPesanan';
import TopBarNew from '../../components/molecules/TopBarNew';

const ReviewPesananGuru = ({navigation}) => {
  const {data} = navigation.state.params;
  // console.log(`data`, data._id);

  return (
    <View style={{backgroundColor: Warna.grayscale.lima, flex: 1}}>
      {/* <TopBar
        left
        title="Review Pesanan"
        subtitle={`ID Pesanan : ${data._id}`}
      /> */}
      <TopBarNew title="Rincian Pembelajaran" />
      <DetailPesanan data={data} />
    </View>
  );
};

export default withNavigation(ReviewPesananGuru);
