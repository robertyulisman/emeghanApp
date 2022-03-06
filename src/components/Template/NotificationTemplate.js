import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import TopLabel from '../atoms/TopLabel';
import TopBar from '../molecules/TopBar';
import {Warna} from '../../utils/Data';
import ListItem from '../molecules/ListItem';
import {useSelector, useDispatch} from 'react-redux';
import EmptyOrder from '../molecules/EmptyOrder';
import {
  deleteNotification,
  getNotification,
  updateNotification,
} from '../../config/redux/actions/notificationAction';
import ModalCustom from '../atoms/ModalCustom';
import moment from 'moment';
import Tombol from '../atoms/Tombol';
import {ToastDefault} from '../../utils/Fungsi';
import LoadingComp from '../atoms/LoadingComp';
import TopBarNew from '../molecules/TopBarNew';
import TextJudul from '../atoms/TextJudul';
import TextBody from '../atoms/TextBody';
import {FlatList} from 'react-native-gesture-handler';

const NotificationTemplate = ({data, profile}) => {
  // const {user} = useSelector(state => state.auth);
  //   // const [dataNotif, setDataNotif] = React.useState([]);
  //   const {profile} = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const [judul, setJudul] = React.useState('');
  const [deskripsi, setDeskripsi] = React.useState('');
  const handleModal = item => {
    setJudul(item.judul);
    setDeskripsi(item.deskripsi);
    setShowModal(!showModal);
  };

  React.useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    } else {
      setLoading(false);
    }
    // console.log(`data`, data);
  }, [data]);

  const handlePressNotif = item => {
    handleModal(item);
    if (item.dibaca === false) {
      dispatch(updateNotification(item._id));
      setTimeout(() => {
        dispatch(getNotification(profile._id));
      }, 3000);

      handleModal(item);
    }
  };

  const handleLongPress = item => {
    Alert.alert('Hapus Notifikasi', 'kamu yakin menghapus notifikasi ini ?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          // setShowBox(false);
          dispatch(deleteNotification(item._id));
          dispatch(getNotification(profile._id));
          ToastDefault('notifikasi berhasil dihapus');
        },
      },
    ]);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Warna.grayscale.lima,
      }}>
      {/* <TopBar left title="Notifikasi" /> */}
      <TopBarNew title="Notifikasi" />

      <View
        style={{
          backgroundColor: Warna.putih,
          borderTopLeftRadius: 20,
          overflow: 'hidden',
          flex: 1,
        }}>
        {/* <TopLabel title="Notifikasi" /> */}
        {loading ? (
          <LoadingComp primary />
        ) : data.length !== 0 ? (
          data.sort((a, b) => b.createdAt > a.createdAt) && (
            <FlatList
              keyExtractor={item => item._id}
              data={data}
              maxToRenderPerBatch={10}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <ListItem
                    key={item._id}
                    title={item.judul}
                    description={item.deskripsi}
                    badge={item.dibaca === true ? false : true}
                    badgeSmall
                    time={moment(item.createdAt).fromNow()}
                    onPress={() => handlePressNotif(item)}
                    onLongPress={() => {
                      handleLongPress(item);
                    }}
                  />
                );
              }}
            />
          )
        ) : (
          <EmptyOrder title="NO DATA" />
        )}
      </View>
      <ModalCustom
        isModalVisible={showModal}
        content={
          <View
            style={{
              backgroundColor: Warna.putih,
            }}>
            <View
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: Warna.abuAbuMuda,
                // flex: 1,
              }}>
              <TextJudul title={judul} />
              {/* <Text style={{fontSize: 18}}>{judul}</Text> */}
            </View>

            <TextBody
              style={{margin: 10, marginBottom: 20}}
              title={deskripsi}
            />
            <View style={{padding: 10, alignItems: 'flex-end'}}>
              <Tombol onPress={handleModal} primary title="TUTUP" />
            </View>
          </View>
        }
        onBackButtonPress={handleModal}
      />
    </View>
  );
};

export default NotificationTemplate;
