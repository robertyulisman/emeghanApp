import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {io} from 'socket.io-client';

import Message from '../molecules/Message';
import EmptyOrder from '../molecules/EmptyOrder';
import TopBar from '../molecules/TopBar';
import LoadingComp from '../atoms/LoadingComp';
import GambarCustom from '../atoms/GambarCustom';

import {apiUrl, Warna} from '../../utils/Data';
import {ToastDefault} from '../../utils/Fungsi';
import {useDispatch, useSelector} from 'react-redux';
import {getMessage} from '../../config/redux/actions/chatAction';
import TopBarNew from '../molecules/TopBarNew';

const ChatTemplate = ({navigation, userId, user, data, chatData}) => {
  const dispatch = useDispatch();
  const {message} = useSelector(state => state.chat);
  console.log(`chatData=============`, chatData);
  // source data
  //   const {userId, user, data} = navigation.state.params;

  const [currentChat, setCurrentChat] = React.useState(null);
  const [newMessage, setNewMessage] = React.useState('');
  const [arrivalMessage, setArrivalMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(true);

  const scrollViewRef = React.useRef();
  const socket = React.useRef(io('ws://proappbackendnew.herokuapp.com'));

  React.useEffect(() => {
    console.log('=======satu');
    socket.current = io('ws://proappbackendnew.herokuapp.com');
  }, []);

  // console.log('ini socket', socket);
  React.useEffect(() => {
    socket.current.emit('addUser', userId);
    socket.current.on('getUsers', users => {
      console.log(`user socket`, users);
    });
  }, []);

  React.useEffect(() => {
    // console.log('======= dua ======', data);
    arrivalMessage &&
      data.members.includes(arrivalMessage.sender) &&
      setCurrentChat(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage, data]);

  const handleSubmitChat = () => {
    if (newMessage === '') {
      setError(true);
      ToastDefault('pesan tidak boleh kosong');
    } else {
      const dataMessage = {
        conversationId: data._id,
        sender: userId,
        text: newMessage,
      };

      const receiverId = data.members.find(member => member !== userId);

      socket.current.emit('sendMessage', {
        senderId: userId,
        receiverId,
        text: newMessage,
      });
      axios
        .post(`${apiUrl}/api/message`, dataMessage)
        .then(res => {
          console.log(`res.data`, res.data),
            console.log(`currennttt chat`, currentChat),
            // getMessage();
            setCurrentChat(prev => [...prev, res.data]);

          setNewMessage('');
        })
        .catch(err => console.log(`err`, err));
    }
  };

  React.useEffect(() => {
    socket.current.on('getMessage', data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: new Date(),
      });
    });
  }, [data]);

  const getMessage = () => {
    axios
      .get(`${apiUrl}/api/message/${data._id}`)
      .then(res => {
        setCurrentChat(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    getMessage();
    // setCurrentChat(chatData);
    setLoading(false);
    // console.log('======= tiga ======');
    // dispatch(getMessage(data._id));
  }, []);

  // React.useEffect(() => {
  //   if (message) {
  //     setCurrentChat(message);
  //     setLoading(false);
  //   }
  // }, [message]);
  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      {/* <TopBar
        left
        image
        imageSource={
          <GambarCustom
            resizeMode="cover"
            style={{height: 40, width: 40, borderRadius: 20}}
            source={{
              uri:
                user?.image !== ''
                  ? `${apiUrl}/${user?.image}`
                  : `${apiUrl}/asset/images/noImage.png`,
            }}
          />
        }
        // subtitle="Online"
        title={user?.nama}
      /> */}
      <TopBarNew title={user?.nama} />
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }
        style={{
          backgroundColor: Warna.grayscale.lima,
          flex: 1,
          marginBottom: 10,
        }}>
        {loading ? (
          <LoadingComp top={100} />
        ) : currentChat !== null && currentChat?.length > 0 ? (
          currentChat.map((item, index) => {
            // console.log(`data item`, item);
            return (
              <Message own={item.sender === userId} key={index} item={item} />
            );
          })
        ) : (
          <EmptyOrder title="blm ada chat" />
        )}
      </ScrollView>
      {/* <===================== input chat =================> */}
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            backgroundColor: Warna.putih,
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            borderTopRightRadius: 30,
            borderBottomRightRadius: 30,
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              backgroundColor: Warna.putih,
              borderRadius: 30,
              marginLeft: 5,
            }}>
            <View
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-end',
                marginBottom: 10,
              }}>
              <Icon name="paperclip" size={30} color={Warna.abuAbuSedang} />
            </View>
            <View
              style={{
                flex: 1,
                maxHeight: 150,
                paddingLeft: 5,
                borderWidth: 1,
                borderColor: Warna.grayscale.empat,
                borderRadius: 8,
                backgroundColor: Warna.grayscale.lima,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                multiline
                numberOfLines={1}
                placeholder="ketikkan sesuatu"
                scrollEnabled
                style={{fontSize: 16}}
                value={newMessage}
                onChangeText={value => setNewMessage(value)}
              />
              {newMessage === '' ? null : (
                <TouchableOpacity
                  onPress={handleSubmitChat}
                  style={{
                    height: 40,
                    width: 40,
                    marginHorizontal: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'flex-end',
                  }}>
                  <GambarCustom
                    style={{width: 25, height: 25}}
                    source={require('../../assets/figma/send_icon.png')}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default withNavigation(ChatTemplate);
