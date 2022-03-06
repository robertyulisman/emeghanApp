import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Warna} from '../../../utils/Data';

import TombolAksi from '../TombolAksi';
import BottomHighlight from './BottomHighlight';
import HeaderHighlight from './HeaderHighlight';
import MainHighlight from './MainHighlight';
import {withNavigation} from 'react-navigation';
import {useSelector} from 'react-redux';
import Tombol from '../../atoms/Tombol';

const {width, height} = Dimensions.get('window');

const HighlightSection = ({item, navigation, TombolComp}) => {
  const {user} = useSelector(state => state.auth);
  return (
    <View
      style={{
        width: width,
        padding: 10,
      }}>
      <View
        style={{
          backgroundColor: Warna.putih,
          borderRadius: 30,
          overflow: 'hidden',
        }}>
        <HeaderHighlight {...item} />
        {/* =============DATA Murid START HERE============ */}
        <View style={{marginTop: 10}}>
          <MainHighlight {...item} />
        </View>

        {/* =============BIODATA GURU START HERE============ */}
        {user.userType === 'Siswa' && <BottomHighlight {...item} />}

        <View style={{alignItems: 'center'}}>
          {user.userType === 'Siswa' ? (
            <TombolAksi
              titleNegative="PERPANJANG"
              titlePositive="DETAIL"
              onPressNegative={() =>
                navigation.navigate('Perpanjang', {data: item})
              }
              onPressPositive={
                () => navigation.navigate('ReviewPesanan', {data: item})
                // console.log(`navigation`, navigation)
              }
              style={{marginVertical: 15}}
            />
          ) : (
            <View>{TombolComp}</View>
          )}
        </View>
      </View>
    </View>
  );
};

export default withNavigation(HighlightSection);
