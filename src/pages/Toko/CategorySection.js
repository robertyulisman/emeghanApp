import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import Pembatas from '../../components/atoms/Pembatas';
import CardProduk from '../../components/molecules/CardProduk';
import {Warna} from '../../utils/Data';
import TitleSection from '../Dashboard/TitleSection';
import {useDispatch, useSelector} from 'react-redux';
import {addItemtoCart} from '../../config/redux/actions/tokoAction';

const {width} = Dimensions.get('screen');

const CategorySection = ({navigation, data}) => {
  const dispatch = useDispatch();
  const handleAddItem = item => {
    dispatch(addItemtoCart(item));
  };
  console.log(`data`, data);
  return (
    <View>
      <TitleSection
        style={{marginTop: 20}}
        title={data.category}
        onPress={() => navigation.navigate('ProductPage', {...data})}
      />
      <View style={{paddingLeft: 20}}>
        <FlatList
          keyExtractor={item => item.id}
          data={data.product}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: width / 2,
                  marginRight: 20,
                  marginTop: 10,
                  marginBottom: 20,
                }}>
                <CardProduk item={item} onPress={() => handleAddItem(item)} />
              </View>
            );
          }}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
      <Pembatas />
    </View>
  );
};

export default withNavigation(CategorySection);
