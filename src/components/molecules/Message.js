import moment from 'moment';
import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Warna} from '../../utils/Data';
import TextBody from '../atoms/TextBody';
import TextJudul from '../atoms/TextJudul';

const {width} = Dimensions.get('window');

const Message = ({own, item}) => {
  return (
    <View style={{marginLeft: own ? 40 : 10, marginRight: own ? 10 : 40}}>
      <View
        style={{
          backgroundColor: own ? Warna.grayscale.empat : Warna.primary.lima,
          paddingHorizontal: 10,
          paddingVertical: 10,

          marginTop: 10,
          // marginLeft: own ? null : 20,
          // marginRight: own ? 20 : null,
          // borderRadius: 20,
          borderTopLeftRadius: own ? 8 : 0,
          borderTopRightRadius: own ? 0 : 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          flexDirection: 'row',
          alignSelf: own ? 'flex-end' : 'flex-start',

          // alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <TextJudul
            style={{
              color: Warna.grayscale.satu,
              // padding: 5,
              fontWeight: 'normal',
            }}
            title={item.text}
          />
          <TextBody
            style={{color: Warna.grayscale.tiga, fontSize: 11, marginLeft: 10}}
            title={moment(item.createdAt).format('LT')}
          />
        </View>
      </View>
    </View>
  );
};

export default Message;
