import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/AntDesign';

const Tombol = ({
  title,
  onPress,
  primary,
  secondary,
  style,
  aksi,
  icon,
  iconImage,
  disabled,
  danger,
  small,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          backgroundColor: disabled
            ? 'rgba(52, 52, 52, 0.2)'
            : primary
            ? Warna.primary.satu
            : Warna.putih,
          paddingHorizontal: small ? 10 : 20,
          paddingVertical: small ? 5 : 10,

          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',

          borderWidth: secondary ? 1 : danger ? 1 : null,
          borderColor: secondary
            ? Warna.primary.satu
            : danger
            ? Warna.merah
            : null,
          flexDirection: icon ? 'row' : null,
        },
        style,
      ]}>
      {icon && (
        <Icon
          name={iconImage}
          size={17}
          color={primary ? Warna.putih : Warna.primary.satu}
        />
      )}
      <Text
        style={{
          color: disabled
            ? Warna.putih
            : primary
            ? Warna.putih
            : danger
            ? Warna.merah
            : Warna.primary.satu,
          marginLeft: icon ? 10 : 0,
          fontSize: 16,
          // fontWeight: 'bold',
          fontFamily: 'Nunito-ExtraBold',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Tombol;
