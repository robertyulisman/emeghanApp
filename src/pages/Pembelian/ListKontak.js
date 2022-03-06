import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import InputProfile from '../../components/molecules/InputProfile';
import {Warna} from '../../utils/Data';

const ListKontak = ({
  valueSearch,
  onchangeSearch,
  dataKontak,
  handleSelectKontak,
}) => {
  return (
    <View>
      <View>
        <InputProfile
          image={require('../../assets/icon/Magnifier.png')}
          title="Cari Nama Kontak"
          value={valueSearch}
          placeholder="ketikkan nama Kontak"
          onChangeText={onchangeSearch}
          styleHead={{flex: 0}}
        />
        {/* <TextBody title="test" /> */}
      </View>
      {dataKontak.length > 0 ? (
        <FlatList
          keyExtractor={(item, index) => item.displayName + index}
          data={dataKontak}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => handleSelectKontak(item)}
                style={{
                  marginHorizontal: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: Warna.grayscale.empat,
                  paddingVertical: 10,
                }}>
                <TextJudul title={item.displayName} />
                <TextBody title={item.phoneNumbers[0]?.number} />
              </TouchableOpacity>
            );
          }}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 100,
          }}>
          <TextBody title="tidak ada data kontak" />
        </View>
      )}
    </View>
  );
};

export default ListKontak;
