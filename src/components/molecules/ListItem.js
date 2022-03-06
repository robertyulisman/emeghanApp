import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getGuruUser} from '../../config/redux/actions/profileActions';
import {useSelector, useDispatch} from 'react-redux';
import GambarCustom from '../atoms/GambarCustom';
import TextBody from '../atoms/TextBody';
import TextJudul from '../atoms/TextJudul';
const ListItem = ({
  title,
  description,
  time,
  badge,
  badgeNumber,
  badgeSmall,
  image,
  imageSrc,
  onPress,
  onLongPress,
}) => {
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={onPress}
      style={{
        // flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 10,
        borderBottomWidth: !badge ? 1 : 1.5,
        borderBottomColor: !badge ? Warna.grayscale.empat : Warna.primary.satu,
        paddingVertical: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <GambarCustom
          style={{width: 16, height: 16}}
          source={require('../../assets/figma/notif_info.png')}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <TextBody title="Info" />
        </View>

        <View></View>
        <TextBody title={time} />
        {badge && (
          <View
            style={{
              height: badgeSmall ? 10 : 20,
              width: badgeSmall ? 10 : 20,
              borderRadius: 10,
              backgroundColor: Warna.primary.satu,
              marginLeft: 10,
            }}
          />
        )}
      </View>
      {image && (
        <View
          style={{
            backgroundColor: Warna.grayscale.empat,
            height: 40,
            width: 40,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="user" size={25} color={Warna.putih} />
        </View>
      )}
      <View
        style={{
          flex: 1,
          marginHorizontal: 5,
        }}>
        {/* <Text style={{color: Warna.grayscale.dua, fontSize: 16}}>{title}</Text> */}
        <TextJudul title={title} />
        <TextBody title={description} />
        {/* <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{color: Warna.abuAbuSedang, fontSize: 12}}>
          {description}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
