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

const ListMenu = ({navigation}) => {
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
        onPress={() => navigation.navigate('ProfileEdit')}
        iconLeft={require('../../assets/icon/Edit.png')}
        title="Ubah Profil"
      />
      <Menu
        onPress={() => navigation.navigate('ProfileAlamat')}
        iconLeft={require('../../assets/icon/Edit.png')}
        title="Ubah Alamat"
      />
      <Menu
        // onPress={() => navigation.navigate('ProfileAlamat')}
        iconLeft={require('../../assets/icon/padlock.png')}
        title="Ganti Password"
      />
      <Menu
        // onPress={() => navigation.navigate('ProfileAlamat')}
        iconLeft={require('../../assets/icon/Approve.png')}
        title="Verifikasi Akun"
      />
    </View>
  );
};

export default withNavigation(ListMenu);
