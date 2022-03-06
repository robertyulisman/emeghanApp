import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation';
import Drawer from '../../pages/Drawer';
import {Warna} from '../../utils/Data';
import Badge from '../atoms/Badge';
import {useSelector} from 'react-redux';

const TopBar = ({
  primary,
  title,
  subtitle,
  onPressSubtitle,
  navigation,
  left,
  right,
  cart,
  image,
  imageSource,
  times,
  onShowDrawer,
  onCloseDrawer,
  notif,
}) => {
  const {profile} = useSelector(state => state.profile);
  const {user} = useSelector(state => state.auth);
  const {data} = useSelector(state => state.notification);
  const [badge, setBadge] = React.useState('');
  const [badgeNotif, setBadgeNotif] = React.useState('');
  // React.useEffect(() => {

  // }, []);

  React.useEffect(() => {
    if (profile || data) {
      console.log(`component didupdate`);
      const filterData =
        profile.pesanan !== undefined &&
        profile.pesanan.filter(
          data =>
            data.statusDiterima === 'pending' ||
            (data.statusDiterima === 'diterima' &&
              data.statusPesanan === 'menunggu pembayaran'),
        );
      const filterNotif = data.filter(item => item.dibaca === false);

      setBadge(filterData.length);
      setBadgeNotif(filterNotif.length);
    }
  }, [profile, data]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: Warna.primary.satu,
        height: 125,
        alignItems: 'flex-start',
        paddingTop: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        {left && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="arrow-left" size={20} color={Warna.putih} />
          </TouchableOpacity>
        )}
        {image && (
          <View
            style={{
              backgroundColor: Warna.putih,
              borderRadius: 20,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {imageSource}
          </View>
        )}

        <View style={{marginLeft: 10, justifyContent: 'center'}}>
          {subtitle ? (
            <TouchableOpacity onPress={onPressSubtitle}>
              <Text
                style={{
                  color: Warna.putih,
                  fontSize: primary ? 16 : 18,
                }}>
                {title}
              </Text>
              <Text style={{color: Warna.putih, fontSize: 12}}>{subtitle}</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Text
                style={{
                  color: Warna.putih,
                  fontSize: primary ? 16 : 18,
                }}>
                {title}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        {notif && (
          <TouchableOpacity
            onPress={() => {
              user.userType === 'Siswa'
                ? navigation.navigate('Notification')
                : navigation.navigate('NotifikasiGuru');
            }}
            style={{
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="bell" size={20} color={Warna.putih} />
            {badgeNotif !== 0 && (
              <Badge title={badgeNotif >= 10 ? `9+` : badgeNotif} />
            )}
          </TouchableOpacity>
        )}

        {cart && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Cart');
            }}
            style={{
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="shopping-cart" size={25} color={Warna.putih} />
            {badge !== 0 && <Badge title={badge >= 10 ? `9+` : badge} />}
          </TouchableOpacity>
        )}

        {right && (
          <TouchableOpacity
            onPress={times ? onCloseDrawer : onShowDrawer}
            style={{
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name={times ? 'times' : 'bars'}
              size={20}
              color={Warna.putih}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default withNavigation(TopBar);
