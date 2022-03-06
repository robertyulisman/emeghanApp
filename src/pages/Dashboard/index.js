import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  Animated,
  FlatList,
  RefreshControl,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import TopBar from '../../components/molecules/TopBar';
import Drawer from '../Drawer';
import HighlightSection from '../../components/molecules/HighlightSection';
import {apiUrl, Warna} from '../../utils/Data';
import PesanGuruSection from '../../components/molecules/PesanGuruSection';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {getProfileUser} from '../../config/redux/actions/profileActions';
import EmptyOrder from '../../components/molecules/EmptyOrder';
import {Flow} from 'react-native-animated-spinkit';
import {getNotification} from '../../config/redux/actions/notificationAction';
import {io} from 'socket.io-client';
import {formatNumber, ToastDefault} from '../../utils/Fungsi';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import axios from 'axios';
import GambarCustom from '../../components/atoms/GambarCustom';
import GambarLogo from '../../components/atoms/GambarLogo';
import {withNavigation} from 'react-navigation';
import ModalCustom from '../../components/atoms/ModalCustom';
import Tombol from '../../components/atoms/Tombol';
import FormUpdateProfile from './FormUpdateProfile';
import TopLabel from '../../components/atoms/TopLabel';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuDashboard from './MenuDashboard';
import BottomNavBar from '../../components/molecules/BottomNavBar';
import CardPembelajaran from '../../components/molecules/CardPembelajaran';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import TextHeading from '../../components/atoms/TextHeading';
import IconCustom from '../../components/atoms/IconCustom';
import TitleSection from './TitleSection';
import Pembatas from '../../components/atoms/Pembatas';
import {getDaftarHargaPPOB} from '../../config/redux/actions/ppobAction';

const {width} = Dimensions.get('screen');
const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const Dashboard = ({navigation}) => {
  // state
  const [isModalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [dataPesananBaru, setDataPesananBaru] = React.useState([]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getProfileUser(user._id, user.userType));
    setRefreshing(false);
    ToastDefault('data diperbarui');
  };

  // redux
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {profile} = useSelector(state => state.profile);

  const [badgeNotif, setBadgeNotif] = React.useState('');
  const dataNotif = useSelector(state => state.notification.data);
  // React.useEffect(() => {
  //   const filterNotif = dataNotif.filter(item => item.dibaca === false);
  //   setBadgeNotif(filterNotif.length);
  // }, [data]);

  const [data, setData] = useState([]);
  console.log(`data=======>`, data[0]);

  // handle notification
  const getToken = async () => {
    const token = await messaging().getToken();
    const Data = {
      userId: user._id,
      token: token,
    };
    axios
      .post(`${apiUrl}/api/usertoken/${user._id}`, Data)
      .then(res => console.log('respon data token firebase', res.data))
      .catch(err => console.log('error get token firebase', err));

    console.log('token firebase', token);
  };

  React.useEffect(() => {
    console.log(`is update`, profile);
    console.log(`is user.userType`, user.userType);
    if (profile?.isUpdateProfil === false) {
      // setShowModal(true);
      navigation.navigate('FormUpdateProfile');
    }
  }, [profile?.isUpdateProfil]);

  React.useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'Siswa App', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) SeesoundNameparameter oflocalNotification function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned ${created}`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }, []);
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      dispatch(getProfileUser(user._id, user.userType));
      dispatch(getNotification(user._id));
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('A new FCM message arrived!', remoteMessage);
      PushNotification.getChannels(function (channels) {
        console.log('getchannels gives us', channels);
      });
      PushNotification.localNotification({
        /* Android Only Properties */
        largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
        smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
        priority: 'high', // (optional) set notification priority, default: high
        visibility: 'private', // (optional) set notification visibility, default: private
        importance: 'high', // (optional) set notification importance, default: high
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
        /* iOS and Android properties */
        title: remoteMessage.notification.title, // (optional)
        playSound: true, // (optional) default: true
        soundName: 'default',
        // channelId: remoteMessage.notification.android.channelId,
        channelId: 'fcm_fallback_notification_channel',
        messageId: remoteMessage.messageId, // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.
      });
    });
    return unsubscribe;
  }, []);

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const scrollTop = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [-50, -100, 0],
    extrapolate: 'clamp',
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  // function
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    setIsLoading(true);
    console.log(`usertype`, user.userType);
    // console.log(`usertype`, user.userType);
    dispatch(getProfileUser(user._id, user.userType));
    getToken();
  }, []);

  useEffect(() => {
    dispatch(getNotification(user._id));
    dispatch(getDaftarHargaPPOB());
  }, []);

  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      // const data = profile.pesanan;
      const filterData = profile.pesanan.filter(
        data =>
          data.statusDiterima === 'diterima' &&
          data.statusPembayaran === 'lunas' &&
          data.statusPesanan === 'sedang berlangsung',
      );
      const filterDataPesananBaru = profile.pesanan.filter(
        data =>
          data.statusDiterima === 'diterima' &&
          data.statusPesanan === 'menunggu pembayaran',
      );

      setDataPesananBaru(filterDataPesananBaru);
      setData(filterData);
      setIsLoading(false);
    }
  }, [profile]);

  const dataInfo = [
    {
      id: 1,
      title: 'Fasilitas Baru',
      desc: 'Kabar Gembira, sekarang ada fasilitas baru yang telah tersedia bagi Pelanggan yang bermain di lapangan Futsal',
      gambar:
        'https://pindahlubang.com/wp-content/uploads/2021/03/Biaya-Buat-Lapangan-Futsal.jpg',
    },
    {
      id: 2,
      title: 'Fasilitas Baru',
      desc: 'Kabar Gembira, sekarang ada fasilitas baru yang telah tersedia bagi Pelanggan yang bermain di lapangan Futsal',
      gambar:
        'https://pindahlubang.com/wp-content/uploads/2021/03/Biaya-Buat-Lapangan-Futsal.jpg',
    },
    {
      id: 3,
      title: 'Fasilitas Baru',
      desc: 'Kabar Gembira, sekarang ada fasilitas baru yang telah tersedia bagi Pelanggan yang bermain di lapangan Futsal',
      gambar:
        'https://pindahlubang.com/wp-content/uploads/2021/03/Biaya-Buat-Lapangan-Futsal.jpg',
    },
  ];

  const dataPromo = [
    {
      id: 1,
      title: 'Bango',
      desc: 'Kecap Manis Light Ref 550ml',
      harga: 25200,
      hargaPromo: 19900,
      gambar:
        'https://dxclnrbvyw82b.cloudfront.net/images/product/web/99/55/87/00/0/000000875599_01_800.jpg',
    },
    {
      id: 2,
      title: 'Sania',
      desc: 'Beras Premium 5kg',
      harga: 64000,
      hargaPromo: 58500,
      gambar:
        'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//96/MTA-3832097/sania_beras-sania-10kg-pcs-premium_full02.jpg',
    },
    {
      id: 3,
      title: 'Sedaap',
      desc: 'Mie Korean',
      harga: 13500,
      hargaPromo: 11500,
      gambar: 'https://cf.shopee.co.id/file/9918ccc8ceedecb04fed7e7863b5d72e',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Warna.primary.satu}
        opacity={imageOpacity}
      />

      <Animated.ScrollView
        // style={{transform: [{translateY: scrollTop}]}}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Animated.View
          style={{
            width: '100%',
            height: 120,
            backgroundColor: Warna.primary.satu,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingTop: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            opacity: imageOpacity,
            transform: [{translateY: imageTranslateY}],
          }}>
          <TextHeading style={{color: Warna.putih}} title="e-meghan" />

          <IconCustom
            badge={badgeNotif}
            onPress={() => navigation.navigate('Notification')}
            name={require('../../assets/icon/Bell.png')}
          />
        </Animated.View>
        {/* user profile display */}
        <View
          style={{
            paddingVertical: 10,
            backgroundColor: Warna.secondary.satu,
            marginHorizontal: 20,
            marginTop: -50,
            borderRadius: 20,
            shadowColor: Warna.grayscale.tiga,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 25,
          }}>
          <TextJudul
            style={{textAlign: 'center', color: Warna.putih}}
            title={`Hallo, ${profile?.nama}`}
          />

          <View style={{marginHorizontal: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginVertical: 10,
                justifyContent: 'space-between',
              }}>
              <View>
                <TextBody style={{color: Warna.putih}} title="Saldo Kamu" />
                <TextJudul
                  style={{color: Warna.putih}}
                  title={formatNumber(profile.saldo || 0)}
                />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('TambahSaldo')}
                style={{
                  backgroundColor: Warna.primary.satu,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                  alignItems: 'center',
                }}>
                <TextBody style={{color: Warna.putih}} title="Tambah Saldo" />
                {/* <IconCustom name={require('../../assets/icon/Plus.png')} /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* menu aplikasi */}
        <MenuDashboard />
        <Pembatas style={{marginVertical: 20}} />

        {/* promo produk */}
        <TitleSection
          title="Hot Deal"
          desc="yang lagi Promo bulan April nih"
          onPress={() => navigation.navigate('Cart')}
        />
        <View style={{paddingLeft: 20}}>
          <FlatList
            keyExtractor={item => item.id}
            data={dataPromo}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: width / 2,
                    marginRight: 20,
                    marginTop: 10,
                    marginBottom: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: Warna.grayscale.lima,
                      shadowColor: Warna.grayscale.tiga,
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowOpacity: 0.29,
                      shadowRadius: 4.65,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      alignSelf: 'center',

                      elevation: 7,
                      flex: 1,
                      width: '100%',
                      marginHorizontal: 20,
                    }}>
                    <TouchableOpacity>
                      <GambarCustom
                        // resizeMode="cover"
                        source={{uri: item.gambar}}
                        style={{
                          width: '100%',
                          // height: '100%',
                          height: 100,
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                        }}
                      />
                    </TouchableOpacity>

                    <View
                      style={{
                        padding: 10,
                        width: '100%',
                      }}>
                      <TextJudul title={item.title} />
                      <TextBody title={item.desc} />
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <TextBody
                            style={{fontSize: 12}}
                            title={`${formatNumber(item.harga)}`}
                          />
                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: Warna.merah,
                              position: 'absolute',
                              top: 12,
                              transform: [{rotate: '10deg'}],
                            }}
                          />
                        </View>

                        <TextJudul
                          style={{marginLeft: 10, color: Warna.merah}}
                          title={`${formatNumber(item.hargaPromo)}`}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>

        <Pembatas style={{marginVertical: 20}} />

        {/* info section */}
        <TitleSection
          title="Info e-meghan"
          desc="Info seputar semua Produk e-meghan"
          // onPress={() => navigation.navigate('Cart')}
        />
        <View style={{paddingLeft: 20}}>
          <FlatList
            keyExtractor={item => item.id}
            data={dataInfo}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: width - 60,
                    marginRight: 20,
                    marginTop: 10,
                    marginBottom: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: Warna.grayscale.lima,
                      shadowColor: Warna.grayscale.tiga,
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowOpacity: 0.29,
                      shadowRadius: 4.65,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      alignSelf: 'center',

                      elevation: 7,
                      flex: 1,
                      width: '100%',
                      marginHorizontal: 20,
                    }}>
                    <TouchableOpacity>
                      <GambarCustom
                        resizeMode="cover"
                        source={{uri: item.gambar}}
                        style={{
                          width: '100%',
                          // height: '100%',
                          height: 150,
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                        }}
                      />
                    </TouchableOpacity>

                    <View
                      style={{
                        padding: 10,
                        width: '100%',
                      }}>
                      <TextJudul title={item.title} />
                      <TextBody title={item.desc} />
                    </View>
                  </View>
                </View>
              );
            }}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
        {/* <FlatList
          keyExtractor={item => item.id}
          data={dataInfo}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: width,
                  padding: 10,
                }}>
                <View
                  style={{
                    backgroundColor: Warna.grayscale.lima,
                    shadowColor: Warna.grayscale.tiga,
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    alignSelf: 'center',
                    flex: 1,
                    elevation: 7,
                  }}>
                  <TouchableOpacity>
                    <GambarCustom
                      resizeMode="cover"
                      source={require('../../assets/gambar/futsal.png')}
                      style={{
                        // width: '100%',
                        height: '100%',
                        height: 150,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      padding: 10,
                    }}>
                    <TextJudul title="Fasilitas Baru" />
                    <TextBody title="Kabar Gembira, sekarang ada fasilitas baru yang telah tersedia bagi Pelanggan yang Bermain di lapangan Futsal" />
                  </View>
                </View>
              </View>
            );
          }}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
        /> */}
      </Animated.ScrollView>

      <BottomNavBar homeActive />
    </View>
  );
};

export default withNavigation(Dashboard);
