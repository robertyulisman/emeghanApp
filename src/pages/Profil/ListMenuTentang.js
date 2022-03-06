import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import GambarCustom from '../../components/atoms/GambarCustom';
import TextBody from '../../components/atoms/TextBody';
import {Warna} from '../../utils/Data';
import Menu from './Menu';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../config/redux/actions/authAction';
import {clearProfileUser} from '../../config/redux/actions/profileActions';

const ListMenuTentang = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const handleLogOut = () => {
    dispatch(logoutUser());
    dispatch(clearProfileUser());
    navigation.navigate('Login');
  };
  return (
    <View>
      <Menu
        onPress={() => navigation.navigate('Privacy')}
        iconLeft={require('../../assets/icon/shield.png')}
        title="Kebijakan Privasi"
      />
      <Menu
        // onPress={() => navigation.navigate('ProfileAlamat')}
        iconLeft={require('../../assets/icon/clipboard.png')}
        title="Syarat dan Ketentuan"
      />
      <Menu
        onPress={() => navigation.navigate('Tentang')}
        iconLeft={require('../../assets/icon/Help.png')}
        title="Tentang Kami"
      />
      <Menu
        // onPress={() => navigation.navigate('ProfileAlamat')}
        iconLeft={require('../../assets/icon/bookmark.png')}
        title="Kirim Masukan"
      />
      <Menu
        onPress={handleLogOut}
        iconLeft={require('../../assets/icon/signout.png')}
        title="Keluar"
      />
    </View>
  );
};

export default withNavigation(ListMenuTentang);
