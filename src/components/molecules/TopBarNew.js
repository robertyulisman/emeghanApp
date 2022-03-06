import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconVector from 'react-native-vector-icons/AntDesign';
import {withNavigation} from 'react-navigation';
import {useSelector} from 'react-redux';
import {Warna} from '../../utils/Data';
import Badge from '../atoms/Badge';
import TextJudul from '../atoms/TextJudul';

const TopBarNew = ({title, style, onPress, navigation, single, cart}) => {
  const {dataKeranjang} = useSelector(state => state.toko);
  console.log(`state`, dataKeranjang);
  return (
    <View
      style={[
        {
          height: 80,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 10,
          backgroundColor: Warna.primary.satu,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          justifyContent: 'space-between',
        },
        style,
      ]}>
      {single ? null : (
        <TouchableOpacity
          style={{padding: 5}}
          onPress={onPress ? onPress : () => navigation.goBack()}>
          <IconVector name="arrowleft" size={24} color={Warna.putih} />
        </TouchableOpacity>
      )}

      <TextJudul
        style={{color: Warna.putih, marginLeft: 10, flex: 1}}
        title={title}
      />
      {cart ? (
        <TouchableOpacity
          style={{padding: 5}}
          onPress={() => navigation.navigate('Keranjang')}>
          <IconVector name="shoppingcart" size={24} color={Warna.putih} />
          {dataKeranjang.length === 0 ? null : (
            <Badge top={0} right={0} title={dataKeranjang.length} />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default withNavigation(TopBarNew);
