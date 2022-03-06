import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import EmptyOrder from '../../components/molecules/EmptyOrder';
import HeaderHighlight from '../../components/molecules/HighlightSection/HeaderHighlight';
import MainHighlight from '../../components/molecules/HighlightSection/MainHighlight';
import {apiUrl, Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation';
import CardPembelajaran from '../../components/molecules/CardPembelajaran';
import axios from 'axios';
import {getProfileUser} from '../../config/redux/actions/profileActions';
import {getNotification} from '../../config/redux/actions/notificationAction';
import {ToastDefault} from '../../utils/Fungsi';
import TopBarNew from '../../components/molecules/TopBarNew';

const PesananBaru = ({navigation}) => {
  const dispatch = useDispatch();
  const {profile} = useSelector(state => state.profile);
  const {user} = useSelector(state => state.auth);
  const [data, setData] = React.useState([]);

  const param = navigation.state.params;
  console.log(`params`, param);

  React.useEffect(() => {
    const filterData = profile.pesanan.filter(
      data =>
        data.statusDiterima === 'pending' &&
        data.statusPesanan === 'menunggu pembayaran',
    );
    setData(filterData);
  }, [profile]);

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
  };

  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      {param !== undefined && <TopBarNew title="Pesanan Baru" />}

      {data.length > 0 ? (
        <FlatList
          keyExtractor={item => item._id}
          data={data}
          renderItem={({item, index}) => {
            return (
              <CardPembelajaran
                item={item}
                tertunda
                title={
                  item.statusDiterima === 'pending'
                    ? 'Butuh Konfirmasi'
                    : item.statusPesanan === 'menunggu pembayaran'
                    ? 'Belum Dibayar'
                    : ''
                }
                tolak={data => handleTolak(data)}
                terima={data => handleTerima(data)}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          decelerationRate={'fast'}
        />
      ) : (
        <EmptyOrder />
      )}
    </View>
  );
};

export default withNavigation(PesananBaru);
