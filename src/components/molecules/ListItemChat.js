import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {apiUrl, Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {ToastDefault} from '../../utils/Fungsi';
import {withNavigation} from 'react-navigation';
import GambarCustom from '../atoms/GambarCustom';
import moment from 'moment';
import TextJudul from '../atoms/TextJudul';

const ListItemChat = ({
  time,
  onPress,
  onLongPress,
  conversation,
  currentUser,
  userType,
  refresh,
  newData,
}) => {
  const [user, setUser] = React.useState(null);
  const [conversationData, setconversationData] = React.useState([]);
  const [chatData, setChatData] = React.useState([]);
  // console.log(`data conversation===================>`, conversationData?.text);
  // console.log(`conversation data ==============`, chatData);

  React.useEffect(() => {
    refresh(getMessageData());

    // test(alert('okeededefe'));
    const friendId = conversation.members.find(m => m !== currentUser._id);

    console.log(`userType`, userType);
    let url = '';
    if (userType === 'Siswa') {
      url = `${apiUrl}/api/guru/users?_idGuru=${friendId}`;
    } else if (userType === 'Guru') {
      url = `${apiUrl}/api/siswa/conversation/users?_idSiswa=${friendId}`;
    }
    axios
      .get(url)
      .then(response => {
        console.log(`get guru`, response.data.nama);
        setUser(response.data);
      })
      .catch(err => console.log(`err get guru`, err));
  }, [conversation, currentUser]);

  const getMessageData = () => {
    axios
      .get(`${apiUrl}/api/message/${conversation._id}`)
      .then(res => {
        // setCurrentChat(res.data);
        // setLoading(false);

        console.log(`data conversation`, res.data);
        const sortData = res.data.sort((a, b) => a.createdAt < b.createdAt);
        setconversationData(sortData[0]);
        setChatData(res.data);
        const data = [];
        data.push(sortData[0]);
        newData(data);
      })
      .catch(err => console.log(err));
  };
  React.useEffect(() => {
    getMessageData();
  }, []);

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={() => onPress(user, chatData)}
      style={{
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        borderBottomWidth: 1.5,
        borderBottomColor: Warna.grayscale.empat,
        paddingVertical: 10,
        alignItems: 'center',
      }}>
      <GambarCustom
        resizeMode="cover"
        style={{
          height: 48,
          width: 48,
          borderRadius: 30,
          borderColor: Warna.grayscale.empat,
          borderWidth: 1,
        }}
        source={{
          uri:
            user?.image !== ''
              ? `${apiUrl}/${user?.image}`
              : `${apiUrl}/asset/images/noImage.png`,
        }}
      />
      <View style={{flex: 1, marginLeft: 10}}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'flex-start',
          }}>
          <View style={{flex: 1}}>
            <TextJudul style={{fontWeight: 'normal'}} title={user?.nama} />
          </View>

          <View style={{width: 50}}>
            <Text style={{color: Warna.grayscale.tiga, fontSize: 10}}>
              {moment(conversationData?.createdAt).fromNow()}
            </Text>
          </View>
        </View>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            color: Warna.grayscale.dua,
            fontSize: 14,
          }}>
          {conversationData?.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default withNavigation(ListItemChat);
