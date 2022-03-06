import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';
import CategorySection from './CategorySection';
import {dataPromo} from './Toko';

const {width} = Dimensions.get('screen');

const Toko = ({navigation}) => {
  console.log(`dataPromo`, dataPromo);

  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <TopBarNew cart title="Toko" />

      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={dataPromo}
        renderItem={({item, index}) => {
          return <CategorySection data={item} />;
        }}
      />
    </View>
  );
};

export default withNavigation(Toko);
