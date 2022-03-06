import React from 'react';
import {View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Badge from './Badge';

const IconCustom = ({name, onPress, badge, style, styleIcon}) => {
  return (
    <>
      {onPress ? (
        <TouchableOpacity style={[{padding: 5}, style]} onPress={onPress}>
          {badge ? <Badge title={badge} /> : null}

          <Image style={[{width: 30, height: 30}, styleIcon]} source={name} />
        </TouchableOpacity>
      ) : (
        <View>
          <Image style={{width: 30, height: 30}} source={name} />
        </View>
      )}
    </>
  );
};

export default IconCustom;
