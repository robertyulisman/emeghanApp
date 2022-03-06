import React from 'react';
import {View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import ChatTemplate from '../../components/Template/ChatTemplate';

const DetailChat = ({navigation}) => {
  const {userId, user, data, chatData, onGoBack} = navigation.state.params;
  console.log(`state params`, navigation.state.params);
  React.useEffect(() => {
    return () => {
      onGoBack();
    };
  }, []);

  console.log(`chatData`, chatData);

  return (
    <>
      <ChatTemplate
        userId={userId}
        user={user}
        data={data}
        chatData={chatData}
      />
    </>
  );
};

export default withNavigation(DetailChat);
