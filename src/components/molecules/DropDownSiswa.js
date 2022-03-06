import React from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Warna} from '../../utils/Data';
import TextJudul from '../atoms/TextJudul';

const DropDownSiswa = ({
  title,
  placeholder,
  selectedValue,
  onChangeValue,
  mapData,
}) => {
  return (
    <View
      style={{
        // borderBottomWidth: 1,
        // borderBottomColor: Warna.biruMuda,
        marginTop: 10,
        // marginHorizontal: 5,
        flex: 1,
      }}>
      {/* <Text style={{color: Warna.hitam, fontSize: 14}}>{title} :</Text> */}
      <TextJudul title={title} />

      <View
        style={{
          // backgroundColor: 'red',
          borderWidth: 1,
          borderColor: Warna.grayscale.empat,
          marginTop: 5,
          borderRadius: 10,
        }}>
        <Picker
          selectedValue={selectedValue}
          mode="dropdown"
          style={{
            color: Warna.grayscale.satu,
          }}
          onValueChange={onChangeValue}>
          <Picker.Item
            style={{fontSize: 16, fontFamily: 'Nunito-Regular'}}
            label={placeholder}
          />
          {mapData.length > 0 &&
            mapData.map(item => (
              <Picker.Item
                style={{fontSize: 16, fontFamily: 'Nunito-Regular'}}
                key={item._id}
                label={item.nama}
                value={item}
              />
            ))}
        </Picker>
      </View>
    </View>
  );
};

export default DropDownSiswa;
