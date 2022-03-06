import React from 'react';
import {withNavigation} from 'react-navigation';
import {useSelector} from 'react-redux';
import ConversationTemplate from '../../components/Template/ConversationTemplate';

const Chat = () => {
  const {profile} = useSelector(state => state.profile);
  const {conversation} = useSelector(state => state.chat);
  const {user} = useSelector(state => state.auth);

  return (
    <ConversationTemplate
      userType={user.userType}
      profile={profile}
      conversation={conversation}
    />
  );
};

export default withNavigation(Chat);
//
