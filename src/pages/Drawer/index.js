import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
} from 'react-native';
// import TopBar from '../../components/molecules/TopBar';
import {Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopLabel from '../../components/atoms/TopLabel';
import {withNavigation} from 'react-navigation';
import {ToastDefault} from '../../utils/Fungsi';
import Tombol from '../../components/atoms/Tombol';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../config/redux/actions/authAction';
import {clearProfileUser} from '../../config/redux/actions/profileActions';
const {height, width} = Dimensions.get('window');

const Drawer = ({
  onCloseDrawer,
  navigation,
  showBack,
  topbarName,
  toggleModal,
  topbarImage,
}) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logoutUser());
    dispatch(clearProfileUser());
    navigation.navigate('Login');
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
      case 'Chat':
        navigation.navigate('Chat');
        break;
      case 'Ulasan':
        navigation.navigate('Ulasan');
        break;
      case 'Laporan':
        navigation.navigate('Laporan');
        break;
      case 'Tentang':
        navigation.navigate('Tentang');
        break;
      case 'Privacy':
        navigation.navigate('Privacy');
        break;
      case 'Hubungi kami':
        navigation.navigate('HubungiKami');
        break;
    }
  };

  const DrawerMenu = ({color, title, gambar, ukuran}) => (
    <TouchableOpacity
      onPress={() => handleOnPress(title)}
      style={{
        backgroundColor: color,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: 'hidden',
        flex: ukuran,
        margin: 5,
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
        {/* <TopBar
          image
          title={topbarName}
          right
          times
          onCloseDrawer={onCloseDrawer}
          showDrawer
          imageSource={topbarImage}
        /> */}
        <View
          style={{
            backgroundColor: Warna.putih,
            flex: 1,
            paddingVertical: 5,
            marginTop: -60,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 5,

              flex: 1,
              marginTop: 5,
            }}>
            <DrawerMenu
              title="Chat"
              color={Warna.merah}
              ukuran={1}
              gambar="comments"
            />
            <DrawerMenu
              title="Ulasan"
              color={Warna.hijau}
              ukuran={2}
              gambar="star"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 5,
              flex: 1,
              marginTop: 5,
            }}>
            <DrawerMenu
              title="Laporan"
              color={Warna.hijauTua}
              ukuran={2}
              gambar="book"
            />
            <DrawerMenu
              title="Tentang"
              color={Warna.merah}
              ukuran={1}
              gambar="address-card"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 5,
              flex: 1,
              marginVertical: 5,
            }}>
            <DrawerMenu
              title="Privacy"
              color={Warna.merah}
              ukuran={1}
              gambar="shield"
            />
            <DrawerMenu
              title="Hubungi kami"
              color={Warna.hijau}
              ukuran={2}
              gambar="whatsapp"
            />
          </View>
        </View>
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

export default withNavigation(Drawer);
