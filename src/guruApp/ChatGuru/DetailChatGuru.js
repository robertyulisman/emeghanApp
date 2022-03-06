import React from 'react';
import {View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import ChatTemplate from '../../components/Template/ChatTemplate';

const DetailChatGuru = ({navigation}) => {
  const {userId, user, data, chatData, onGoBack} = navigation.state.params;
  React.useEffect(() => {
    return () => {
      onGoBack();
    };
  }, []);

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

export default withNavigation(DetailChatGuru);
