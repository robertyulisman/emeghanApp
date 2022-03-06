import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import {withNavigation} from 'react-navigation';
import {apiUrl, Warna} from '../../utils/Data';
import TopBarNew from '../../components/molecules/TopBarNew';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import GambarCustom from '../../components/atoms/GambarCustom';

const width = Dimensions.get('screen').width;

const EMoney = ({navigation}) => {
  const {data, type} = navigation.state.params;
  console.log('data e-money', data.length);

  // filter data by brand
  const getUniqueList = (arr, key) => {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  };
  const dataUnique = getUniqueList(data, 'brand');

  const handleSelectEMoney = value => {
    const filterData = data.filter(item => item.brand === value);
    navigation.navigate('EMoneyInput', {data: filterData, type: value});
  };

  const handleImage = item => {
    console.log('item', item);
    switch (item) {
      case 'GO PAY':
        return require('../../assets/emoney/gopay.png');
      case 'BRI BRIZZI':
        return require('../../assets/emoney/brizzi.png');
      case 'Mitra Shopee':
        return null;
      // return require('../../assets/emoney/gopay.png');
      case 'MANDIRI E-TOLL':
        return null;
      // return require('../../assets/emoney/gopay.png');
      case 'OVO':
        return require('../../assets/emoney/ovo.png');

      case 'BUKALAPAK':
        return null;
      case 'GRAB':
        return require('../../assets/emoney/grabpay.png');
      case 'DANA':
        return require('../../assets/emoney/dana.png');
      case 'TIX ID':
        return null;
      case 'LinkAja':
        return require('../../assets/emoney/linkaja.png');
      case 'TAPCASH BNI':
        return null;
      case 'SHOPEE PAY':
        return null;
      case 'i.saku':
        return require('../../assets/emoney/isaku.png');
      case 'MAXIM':
        return null;
      case 'Sakuku':
        return null;
      case 'DOKU':
        return require('../../assets/emoney/doku.png');
      case 'Shopee Food Driver':
        return null;

      default:
        break;
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      <TopBarNew title={type} />
      <View>
        <TextJudul
          style={{marginTop: 20, marginLeft: 20}}
          title="Pilih Produk E-Money"
        />
        <ScrollView>
          <View style={{marginHorizontal: 10, marginTop: 20}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {dataUnique.map(item => (
                <>
                  <TouchableOpacity
                    onPress={() => handleSelectEMoney(item.brand)}
                    key={item.brand + item.price}
                    style={{
                      padding: 15,
                      borderWidth: 1,
                      borderColor: Warna.grayscale.empat,
                      borderRadius: 15,
                      margin: 5,
                      width: width / 3 - 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <GambarCustom
                      style={{width: 70, height: 30}}
                      source={handleImage(item.brand)}
                    />
                    <TextBody
                      style={{textAlign: 'center'}}
                      title={item.brand}
                    />
                  </TouchableOpacity>
                </>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default withNavigation(EMoney);
