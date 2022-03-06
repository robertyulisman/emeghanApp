import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import ConversationTemplate from '../../components/Template/ConversationTemplate';

const ChatGuru = () => {
  const {profile} = useSelector(state => state.profile);
  const {user} = useSelector(state => state.auth);
  // const {conversation} = useSelector(state => state.ChatGuru);
  const {conversation} = useSelector(state => state.chat);
  console.log(`user typeeee opoo`, user);
  // console.log(`conversation`, conversation);

  return (
    <ConversationTemplate
      profile={profile}
      userType={user.userType}
      conversation={conversation}
    />
  );
};

export default ChatGuru;
