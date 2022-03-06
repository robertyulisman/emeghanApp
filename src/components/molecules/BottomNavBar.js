import React from 'react';
import {View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Warna} from '../../utils/Data';
import BottomNavBarItem from '../atoms/BottomNavBarItem';
import GambarCustom from '../atoms/GambarCustom';
import {useSelector} from 'react-redux';

const BottomNavBar = ({
  homeActive,
  belajarActive,
  notifActive,
  profilActive,
  navigation,
}) => {
  // const [badgeNotif, setBadgeNotif] = React.useState('');

  // const {data} = useSelector(state => state.notification);
  const {user} = useSelector(state => state.auth);
  const {dataKeranjang} = useSelector(state => state.toko);

  console.log(`user.userType`, user.userType);

  // React.useEffect(() => {
  //   const filterNotif = data.filter(item => item.dibaca === false);
  //   setBadgeNotif(filterNotif.length);
  // }, [data]);

  return (
    <View
      style={{
        height: 60,
        backgroundColor: Warna.grayscale.lima,
        borderTopWidth: 1,
        borderTopColor: Warna.grayscale.empat,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1,
      }}>
      <BottomNavBarItem
        onPress={
          user.userType === 'Guru'
            ? () => navigation.navigate('DashboardGuru')
            : () => navigation.navigate('Dashboard')
        }
        source={
          homeActive
            ? require('../../assets/bottomNavIcon/homeActive.png')
            : require('../../assets/bottomNavIcon/home.png')
        }
        active={homeActive ? true : false}
        title="Home"
      />
      <BottomNavBarItem
        onPress={() => navigation.navigate('Keranjang')}
        source={
          belajarActive
            ? require('../../assets/bottomNavIcon/keranjangActive.png')
            : require('../../assets/bottomNavIcon/keranjang.png')
        }
        active={belajarActive ? true : false}
        title="Keranjang"
        badge={dataKeranjang.length !== 0 ? true : false}
        badgeNumber={dataKeranjang.length >= 10 ? '9+' : dataKeranjang.length}
      />
      <BottomNavBarItem
        onPress={
          user.userType === 'Guru'
            ? () => navigation.navigate('NotifikasiGuru')
            : () => navigation.navigate('Transaksi')
        }
        source={
          notifActive
            ? require('../../assets/bottomNavIcon/transaksiActive.png')
            : require('../../assets/bottomNavIcon/transaksi.png')
        }
        active={notifActive ? true : false}
        title="Transaksi"
        // badge={badgeNotif !== 0 ? true : false}
        // badgeNumber={badgeNotif >= 10 ? badgeNotif : badgeNotif}
      />

      <BottomNavBarItem
        onPress={() => navigation.navigate('Profil')}
        source={
          profilActive
            ? require('../../assets/bottomNavIcon/profileActive.png')
            : require('../../assets/bottomNavIcon/profile.png')
        }
        active={profilActive ? true : false}
        title="Profile"
      />
    </View>
  );
};

export default withNavigation(BottomNavBar);
