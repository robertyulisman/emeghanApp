import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import TopBarNew from '../../components/molecules/TopBarNew';
import {Warna} from '../../utils/Data';
import {formatNumber} from '../../utils/Fungsi';

const ListOngkir = ({navigation}) => {
  const {data, tujuan, asal, berat} = navigation.state.params;
  const [dataEkspedisi, setDataEkspedisi] = React.useState([]);
  console.log(`params`, data);
  React.useEffect(() => {
    const newData = data.map(item => item.rajaongkir.results);
    setDataEkspedisi(newData);
  }, []);
  return (
    <View style={{flex: 1}}>
      <TopBarNew title={`${asal} ke ${tujuan}`} />
      <TextJudul
        style={{textAlign: 'center', marginTop: 10}}
        title={`${asal} - ${tujuan}`}
      />
      <TextJudul style={{textAlign: 'center'}} title={`Berat ${berat}`} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.city_id}
        renderItem={({item, index}) => {
          return (
            <View>
              {item.rajaongkir.results.map(result => (
                <View>
                  <TextJudul
                    style={{
                      marginTop: 20,
                      marginBottom: 10,
                      marginHorizontal: 20,
                    }}
                    title={result.code.toUpperCase()}
                  />
                  {result.costs.map(i => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('DetailOngkir', {
                          nama: result.code,
                          asal: asal,
                          tujuan: tujuan,
                          berat: berat,
                          data: i,
                        })
                      }
                      style={{
                        paddingVertical: 12,
                        backgroundColor: Warna.grayscale.empat,
                        marginHorizontal: 20,
                        borderRadius: 10,
                        marginTop: 10,
                      }}>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TextBody title={i.service} />
                        <TextJudul
                          style={{color: Warna.merah}}
                          title={formatNumber(i.cost[0].value)}
                        />
                      </View>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TextBody title={i.description} />
                        <TextBody title={i.cost[0].etd} />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          );
        }}
      />
    </View>
  );
};

export default withNavigation(ListOngkir);
