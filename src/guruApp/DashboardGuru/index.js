import React from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Alert,
  StatusBar,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {useDispatch, useSelector} from 'react-redux';
import {getProfileUser} from '../../config/redux/actions/profileActions';
import TopBar from '../../components/molecules/TopBar';
import GambarCustom from '../../components/atoms/GambarCustom';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingComp from '../../components/atoms/LoadingComp';
import Modal from 'react-native-modal';
import {apiUrl, Warna} from '../../utils/Data';
import PesananItem from './PesananItem';
import {formatNumber, ToastDefault} from '../../utils/Fungsi';
import axios from 'axios';
import {getNotification} from '../../config/redux/actions/notificationAction';
import {Drawer} from '../Drawer';
import {io} from 'socket.io-client';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import GambarLogo from '../../components/atoms/GambarLogo';
import BottomNavBar from '../../components/molecules/BottomNavBar';
import {Flow} from 'react-native-animated-spinkit';
import EmptyOrder from '../../components/molecules/EmptyOrder';
import CardPembelajaran from '../../components/molecules/CardPembelajaran';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import Tombol from '../../components/atoms/Tombol';

const {width} = Dimensions.get('window');

const DashboardGuru = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {profile} = useSelector(state => state.profile);
  const [refreshing, setRefreshing] = React.useState(false);
  const [dataOnGoing, setDataOnGoing] = React.useState([]);
  const [dataFinish, setDataFinish] = React.useState([]);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dataPesananBaru, setDataPesananBaru] = React.useState([]);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getProfileUser(user._id, user.userType));
    setRefreshing(false);
    ToastDefault('data diperbarui');
  };

  React.useEffect(() => {
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
          data.statusDiterima === 'pending' &&
          data.statusPesanan === 'menunggu pembayaran',
      );
      setData(filterData);
      setDataPesananBaru(filterDataPesananBaru);
      setIsLoading(false);
    }
  }, [profile]);

  // const socket = React.useRef(io('ws://proappbackendnew.herokuapp.com'));
  // React.useEffect(() => {
  //   socket.current = io('ws://proappbackendnew.herokuapp.com');
  // }, []);
  // console.log('ini socket', socket);

  // React.useEffect(() => {
  //   socket.current.emit('addUser', user._id);
  //   socket.current.on('getUsers', users => {
  //     console.log(`user socket`, users);
  //   });
  // }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleTerima = item => {
    const data = {
      statusDiterima: 'diterima',
    };

    Alert.alert('Terima Pesanan ?', 'kamu yakin menerima pesanan ini ?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          axios
            .put(`${apiUrl}/api/pesanan/update/${item._id}`, data)
            .then(res => {
              console.log(`data terima`, res.data),
                dispatch(getProfileUser(user._id, user.userType)),
                dispatch(getNotification(user._id));
              ToastDefault(`pesanan dengan id ${res.data._id} telah diterima`);
            })
            .catch(err => console.log(`err`, err));
        },
      },
    ]);

    // console.log(`data terima`, item._id);
  };

  const handleTolak = item => {
    const data = {
      statusDiterima: 'batal',
    };

    Alert.alert('Tolak Pesanan ?', 'kamu yakin ingin menolak pesanan ini ?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          axios
            .put(`${apiUrl}/api/pesanan/update/${item._id}`, data)
            .then(res => {
              console.log(`data terima`, res.data),
                dispatch(getProfileUser(user._id, user.userType)),
                dispatch(getNotification(user._id));
              ToastDefault(`pesanan dengan id ${res.data._id} telah ditolak`);
            })
            .catch(err => console.log(`err`, err));
          console.log(`data tolak`, item);
        },
      },
    ]);
  };

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getToken();
    // setIsLoading(true);
    console.log(`userr`, profile);
    // const userType = 'guru';
    dispatch(getProfileUser(user._id, user.userType));
    dispatch(getNotification(user._id));
  }, []);

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
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) SeesoundNameparameter oflocalNotification function
        importance: 5, // (optional) default: 4. Int value of the Android notification importance
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

  React.useEffect(() => {
    if (Object.keys(profile).length > 0) {
      // const data = profile.pesanan;
      const pesananBaru = profile.pesanan.filter(
        data => data.statusDiterima === 'pending',
      );

      const pesananonGoing = profile.pesanan.filter(
        data =>
          data.statusDiterima === 'diterima' &&
          data.statusPembayaran === 'lunas' &&
          data.statusPesanan === 'sedang berlangsung',
      );
      const pesananFinish = profile.pesanan.filter(
        data => data.statusPesanan === 'selesai',
      );
      setDataPesananBaru(pesananBaru);
      setDataOnGoing(pesananonGoing);
      setDataFinish(pesananFinish);
      setIsLoading(false);
    }
  }, [profile]);

  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      <StatusBar backgroundColor={Warna.primary.satu} />
      <View
        style={{
          width: '100%',
          height: 200,
          backgroundColor: Warna.primary.satu,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Warna.grayscale.lima,
            textAlign: 'center',
            marginTop: 20,
            fontFamily: 'Nunito-Regular',
          }}>
          Assalamu'alaikum, sahabat Proo
        </Text>
      </View>
      {/* <TopBar
        image
        imageSource={
          <GambarCustom
            resizeMode="contain"
            style={{height: 40, width: 40, borderRadius: 25}}
            source={{
              uri:
                profile.image === undefined
                  ? `${apiUrl}/asset/images/noImage.png`
                  : `${apiUrl}/${profile.image}`,
            }}
          />
        }
        title={profile.nama === undefined ? '' : `Hai ${profile.nama}`}
        right
        notif
        onShowDrawer={toggleModal}
        subtitle={profile.saldo === undefined ? 0 : formatNumber(profile.saldo)}
      /> */}

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{
          marginTop: -140,
          flex: 1,
        }}>
        <View
          style={{
            paddingVertical: 10,
            backgroundColor: Warna.grayscale.lima,
            marginHorizontal: 20,
            // marginTop: -140,
            borderRadius: 8,
            shadowColor: Warna.grayscale.tiga,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 25,
          }}>
          <View style={{flexDirection: 'row', padding: 20}}>
            <GambarCustom
              resizeMode="cover"
              style={{
                height: 45,
                width: 45,
                borderRadius: 25,
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: Warna.grayscale.empat,
              }}
              source={{
                uri:
                  profile.image === undefined
                    ? `${apiUrl}/asset/images/noImage.jpg`
                    : `${apiUrl}/${profile.image}`,
              }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontFamily: 'Nunito-ExtraBold',
                }}>
                {profile.nama}
              </Text>
            </View>
            <GambarLogo hitam kecil />
          </View>
          <View
            style={{
              backgroundColor: Warna.grayscale.empat,
              width: '100%',
              height: 1,
            }}
          />
          <View style={{marginHorizontal: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>
              <View>
                <TextBody title="Saldo Pembayaran" />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <GambarCustom
                    style={{width: 20, height: 20, marginRight: 10}}
                    source={require('../../assets/figma/saldo2.png')}
                  />
                  <TextJudul
                    title={
                      profile.saldo === undefined
                        ? 0
                        : formatNumber(profile.saldo)
                    }
                  />
                </View>
              </View>
              <View>
                <TextBody title="Jakarta Selatan" />
                <TextBody title="25 Oktober 2021" />
              </View>
            </View>

            <TextJudul
              style={{
                color: Warna.primary.satu,
              }}
              title="Dzuhur 11:48 WIB"
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <TextBody title="01:49:24 Menjelang Azan" />

              <View style={{marginLeft: 10}}>
                <Icon name="volume-up" size={16} color={Warna.orange} />
              </View>
            </View>
          </View>
        </View>
        {/* pembelajaran aktif */}
        {dataPesananBaru.length > 0 && (
          <View
            style={{
              margin: 20,
              padding: 10,
              // borderWidth: 1,
              borderRadius: 10,
              // borderColor: Warna.secondary.satu,
              backgroundColor: Warna.grayscale.lima,
              shadowColor: Warna.grayscale.tiga,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 25,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <GambarCustom
                style={{width: 16, height: 16, marginRight: 10}}
                source={require('../../assets/figma/notif_info.png')}
              />
              <TextJudul title="info" />
            </View>
            <TextBody
              title={`kamu memiliki ${dataPesananBaru.length} Pesanan Baru yang butuh di approve`}
            />
            <Tombol
              style={{alignSelf: 'flex-end', marginTop: 10, marginBottom: 5}}
              secondary
              title="Approve Sekarang"
              onPress={() =>
                navigation.navigate('PesananBaru', {type: 'dashboard'})
              }
            />
          </View>
        )}

        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}>
          <TextBody style={{fontSize: 16}} title="Pembelajaran Aktif" />
          {/* <Text
            style={{
              fontSize: 16,
              color: Warna.grayscale.satu,
              fontFamily: 'Nunito-Regu',
            }}>
            Pembelajaran Aktif
          </Text> */}
          <TouchableOpacity
            onPress={
              user.userType === 'Guru'
                ? () => navigation.navigate('CartGuru2')
                : () => navigation.navigate('Cart')
            }>
            <Text
              style={{
                fontSize: 14,
                color: Warna.secondary.satu,
                fontFamily: 'Nunito-Regular',
              }}>
              Lihat Semua
            </Text>
          </TouchableOpacity>
        </View>
        {/* <PesananItem
            newOrder
            profile={dataPesananBaru}
            data={dataPesananBaru}
            user={user}
            terima={item => handleTerima(item)}
            tolak={item => handleTolak(item)}
            deskripsiEmpty="tidak ada pesan baru"
          />
          <PesananItem
            deskripsiEmpty="tidak ada pesanan yang sedang berlangsung"
            data={dataOnGoing}
            profile={profile}
            user={user}
          />
          <PesananItem
            deskripsiEmpty="belum ada pesanan yang sudah diselesaikan"
            finish
            data={dataFinish}
            profile={profile}
            user={user}
          /> */}
        {isLoading === true ? (
          <View
            style={{
              alignItems: 'center',
              marginHorizontal: 10,
              // marginTop: 100,
              // marginBottom: 20,
              flex: 1,
            }}>
            <Flow size={48} color={Warna.primary.satu}></Flow>
          </View>
        ) : Object.keys(profile).length > 0 && data.length > 0 ? (
          <View style={{marginHorizontal: 15}}>
            <FlatList
              keyExtractor={item => item._id}
              data={data}
              renderItem={({item, index}) => {
                return (
                  <View style={{width: width - 40, marginHorizontal: 5}}>
                    <CardPembelajaran item={item} title={item.sisaPertemuan} />
                  </View>
                );
              }}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              horizontal
              // onScroll={Animated.event(
              //   [{nativeEvent: {contentOffset: {x: scrollX}}}],
              //   {
              //     useNativeDriver: false,
              //   },
              // )}
              scrollEventThrottle={16}
              decelerationRate={'normal'}
            />
          </View>
        ) : (
          <EmptyOrder
            title="Belum ada Pesanan"
            deskripsi="kamu belum memiliki pesanan yang sedang berlangsung, silahkan buat pesanan baru atau selesaikan proses pesanan"
          />
        )}
      </ScrollView>

      {/* DRAWER NAVIGATIOM */}
      {/* <Modal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        useNativeDriver={true}
        style={{alignSelf: 'flex-end', margin: 0}}
        onBackButtonPress={toggleModal}
        isVisible={isModalVisible}>
        <View
          style={{
            backgroundColor: Warna.putih,
            flex: 1,
          }}>
          <Drawer
            topbarName={profile.nama === undefined ? '' : `Hai ${profile.nama}`}
            topbarImage={
              <GambarCustom
                resizeMode="contain"
                style={{height: 40, width: 40, borderRadius: 25}}
                source={{
                  uri:
                    profile.image === undefined
                      ? `${apiUrl}/asset/images/noImage.png`
                      : `${apiUrl}/${profile.image}`,
                }}
              />
            }
            onCloseDrawer={toggleModal}
            close={toggleModal}
            navigation={navigation}
            toggleModal={toggleModal}
          />
        </View>
      </Modal> */}
      <BottomNavBar homeActive />
    </View>
  );
};

export default withNavigation(DashboardGuru);
