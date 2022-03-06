import React from 'react';
import {useSelector} from 'react-redux';
import BottomNavBar from '../../components/molecules/BottomNavBar';
import NotificationTemplate from '../../components/Template/NotificationTemplate';

const NotifikasiGuru = () => {
  const {data} = useSelector(state => state.notification);
  const {profile} = useSelector(state => state.profile);

  return (
    <>
      <NotificationTemplate data={data} profile={profile} />
      <BottomNavBar notifActive />
    </>
  );
};

export default NotifikasiGuru;
