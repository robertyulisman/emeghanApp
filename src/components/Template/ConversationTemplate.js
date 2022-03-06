import React from 'react';
import {View} from 'react-native';
// import TopLabel from '../components/atoms/TopLabel';
// import ListItemChat from '../components/molecules/ListItemChat';
import {withNavigation} from 'react-navigation';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import {io} from 'socket.io-client';
// import TopBar from '../molecules/TopBar';
import {getConversation} from '../../config/redux/actions/chatAction';
import {apiUrl, Warna} from '../../utils/Data';
import TopBar from '../molecules/TopBar';
import TopLabel from '../atoms/TopLabel';
import ListItemChat from '../molecules/ListItemChat';
import EmptyOrder from '../molecules/EmptyOrder';
import axios from 'axios';
import TopBarNew from '../molecules/TopBarNew';

const ConversationTemplate = ({
  navigation,
  profile,
  // conversation,
  userType,
}) => {
  //   const {user} = useSelector(state => state.auth);
  //   const {conversation} = useSelector(state => state.chat);
  //   const socket = React.useRef(io('ws://192.168.100.20:8900'));
  const dispatch = useDispatch();
  console.log(`user conversation`, conversation);
  const [conversation, setConversation] = React.useState([]);
  //   React.useEffect(() => {
  //     socket.current = io('ws://192.168.100.20:8900');
  //   }, []);
  //   // console.log('ini socket', socket);
  //   React.useEffect(() => {
  //     socket.current.emit('addUser', profile._id);
  //     socket.current.on('getUsers', users => {
  //       console.log(`user socket`, users);
  //     });
  //   }, []);

  const getConversation = () => {
    axios
      .get(`${apiUrl}/api/conversation/${profile._id}`)
      .then(response => {
        // console.log(
        //   `response.data conversation ==============>>> 1`,
        //   moment(response.data[0].updatedAt).fromNow(),
        // );
        // console.log(
        //   `response.data conversation ==============>>> 2`,
        //   moment(response.data[1].updatedAt).fromNow(),
        // );
        setConversation(response.data);
      })
      .catch(err => console.log(`err get data conversation`, err));
  };

  React.useEffect(() => {
    // dispatch(getConversation(profile._id));
    getConversation();
  }, []);

  const refreshConversation = () => {
    getConversation();
  };

  const newDataMessage = data => {
    console.log(`data messageeee=====>`, data);
  };

  const handlePressConversation = (item, user, chatData) => {
    console.log(`user.userType`, userType);

    if (userType === 'Siswa') {
      navigation.navigate('DetailChat', {
        data: item,
        userId: profile._id,
        user,
        chatData,
        onGoBack: refreshConversation,
      });
    } else if (userType === 'Guru')
      navigation.navigate('DetailChatGuru', {
        data: item,
        userId: profile._id,
        user,
        chatData,
        onGoBack: refreshConversation,
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Warna.grayscale.lima,
      }}>
      {/* <TopBar left title="Chat" secondary /> */}
      <TopBarNew title="Chat" />
      <View
        style={{
          flex: 1,
          backgroundColor: Warna.putih,
          marginHorizontal: 10,
        }}>
        {conversation.length > 0 ? (
          conversation.map(item => {
            return (
              <ListItemChat
                key={item._id}
                conversation={item}
                currentUser={profile}
                refresh={() => refreshConversation}
                newData={data => newDataMessage(data)}
                // time={moment(item.createdAt).fromNow()}
                onPress={(user, chatData) =>
                  handlePressConversation(item, user, chatData)
                }
                userType={userType}
              />
            );
          })
        ) : (
          <EmptyOrder title="belum ada chat" />
        )}
      </View>
      {/* <View
        style={{
          flex: 1,
          backgroundColor: Warna.putih,
          marginHorizontal: 10,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          // marginTop: -60,
          overflow: 'hidden',
        }}>
        
      </View> */}
    </View>
  );
};

export default withNavigation(ConversationTemplate);
