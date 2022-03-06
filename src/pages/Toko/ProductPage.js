import React from 'react';
import {View, Text, FlatList, Dimensions} from 'react-native';
import {withNavigation} from 'react-navigation';
import CardProduk from '../../components/molecules/CardProduk';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';

const {width} = Dimensions.get('screen');

const ProductPage = ({navigation}) => {
  const data = navigation.state.params;
  console.log(`data product page`, data.category);
  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <TopBarNew cart title={data.category} />

      <View
        style={{
          flex: 1,
          flexWrap: 'wrap',
          paddingHorizontal: 10,
          flexDirection: 'row',
        }}>
        {data.product.map(item => (
          <View
            key={item.id}
            style={{
              width: width / 2 - 10,
              padding: 10,
              marginTop: 10,
            }}>
            <CardProduk item={item} onPress={() => console.log(`item`, item)} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default withNavigation(ProductPage);
