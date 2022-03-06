import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import TopBar from '../../components/molecules/TopBar';
import {apiUrl, Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopLabel from '../../components/atoms/TopLabel';

import {withNavigation} from 'react-navigation';
import {ToastDefault} from '../../utils/Fungsi';
import Tombol from '../../components/atoms/Tombol';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../config/redux/actions/authAction';
import {clearProfileUser} from '../../config/redux/actions/profileActions';
import GambarCustom from '../../components/atoms/GambarCustom';

const {height, width} = Dimensions.get('window');

export const Drawer = ({
  onCloseDrawer,
  navigation,
  topbarName,
  topbarImage,
  showBack,
  toggleModal,
}) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logoutUser());
    dispatch(clearProfileUser());
    navigation.navigate('LoginGuru');
  };
  const DrawerText = ({large, title}) => (
    <Text
      style={{
        fontSize: large ? 14 : 12,
        color: large ? Warna.hijau : Warna.putih,
        marginLeft: 10,
      }}>
      {title}
    </Text>
  );

  const handleOnPress = title => {
    ToastDefault(`you click ${title}`);
    toggleModal();
    switch (title) {
      case 'My Akun':
        navigation.navigate('ProfileGuru');
        break;
      case 'Chat':
        navigation.navigate('ChatGuru');
        break;
      case 'Laporan':
        navigation.navigate('LaporanBelajar');
        // ToastDefault('laporan');
        break;
      case 'Absensi':
        navigation.navigate('AbsenGuru');
      // ToastDefault('Absensi');
      case 'Review':
        navigation.navigate('ReviewGuru');
        // ToastDefault('Absensi');
        break;
      case 'Riwayat Pembayaran':
        navigation.navigate('Riwayat');
        // ToastDefault('Absensi');
        break;
    }
  };

  const DrawerMenu = ({color, title, gambar, ukuran, left, right}) => (
    <TouchableOpacity
      onPress={() => handleOnPress(title)}
      style={{
        backgroundColor: color,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: 'hidden',
        flex: ukuran,
        margin: 5,
        // marginHorizontal: 10,
        marginLeft: left,
        marginRight: right,
      }}>
      <TopLabel title={title} />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Icon name={gambar} size={40} color={Warna.putih} />
      </View>
    </TouchableOpacity>
  );
  return (
    <View>
      {!showBack && (
        <View
          style={{
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        />
      )}
      <View
        style={{
          width: width - 60,
          height: '100%',
          backgroundColor: Warna.biruMuda,
          alignSelf: 'flex-end',
          zIndex: 2,
        }}>
        <TopBar
          title={topbarName}
          image
          right
          showDrawer
          imageSource={topbarImage}
          times
          onCloseDrawer={onCloseDrawer}
        />
        <View
          style={{
            backgroundColor: Warna.putih,
            flex: 1,
            paddingVertical: 5,
            marginTop: -60,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <DrawerMenu
              title="My Akun"
              color={Warna.biruMuda}
              ukuran={2}
              gambar="user"
              left={10}
            />
            <DrawerMenu
              title="Chat"
              color={Warna.orange}
              ukuran={1}
              gambar="comments"
              right={10}
            />
          </View>

          <View style={{flexDirection: 'row', flex: 1}}>
            <DrawerMenu
              title="Laporan"
              color={Warna.hijauTua}
              ukuran={1}
              gambar="book"
              left={10}
            />

            <DrawerMenu
              title="Absensi"
              color={Warna.merah}
              ukuran={1}
              gambar="file"
              right={10}
            />
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <DrawerMenu
              title="Review"
              color={Warna.biruTua}
              ukuran={1}
              gambar="star"
              left={10}
            />
            <DrawerMenu
              title="Riwayat Pembayaran"
              color={Warna.hijau}
              ukuran={2}
              gambar="money"
              right={10}
            />
          </View>
        </View>
        {/* footer */}
        <View style={{backgroundColor: Warna.biruMuda, padding: 10}}>
          <DrawerText large title="Official Office" />
          <DrawerText title=" Jl Bengkong Nusantara Blok e No. 45" />
          <DrawerText title="Batam - Indonesia" />
          <DrawerText title="Email : proo.official20@gmail.com" />
          <View
            style={{
              flexDirection: 'row',
              width: 85,
              justifyContent: 'space-around',
            }}>
            <Icon name="instagram" size={20} color={Warna.putih} />
            <Icon name="twitter" size={20} color={Warna.putih} />
            <Icon name="facebook" size={20} color={Warna.putih} />
          </View>
          <Tombol
            onPress={handleLogOut}
            primary
            title="KELUAR"
            style={{marginTop: 10}}
          />
        </View>
      </View>
    </View>
  );
};

// export default withNavigation(Drawer);
