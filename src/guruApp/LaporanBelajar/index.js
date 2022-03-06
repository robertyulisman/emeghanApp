import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {apiUrl, Warna} from '../../utils/Data';
import Tombol from '../../components/atoms/Tombol';
import {useDispatch, useSelector} from 'react-redux';

import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import TopBarNew from '../../components/molecules/TopBarNew';
import {withNavigation} from 'react-navigation';

const LaporanBelajar = ({navigation}) => {
  const {profile} = useSelector(state => state.profile);
  const [dataOnGoing, setDataOnGoing] = React.useState([]);

  React.useEffect(() => {
    const pesananonGoing = profile.pesanan.filter(
      data =>
        data.statusDiterima === 'diterima' && data.statusPembayaran === 'lunas',
    );
    setDataOnGoing(pesananonGoing);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      <TopBarNew title="Laporan Hasil Belajar" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {dataOnGoing.map(item => {
          return (
            <View
              key={item._id}
              style={{
                marginHorizontal: 20,
                backgroundColor: Warna.grayscale.lima,
                borderRadius: 16,
                marginVertical: 8,
                shadowColor: Warna.grayscale.tiga,
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,

                elevation: 25,
                padding: 15,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextJudul title={item.namaSiswa} />
                <View
                  style={{
                    backgroundColor: Warna.primary.lima,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                  }}>
                  <TextBody title={item.mataPelajaran.nama} />
                </View>
              </View>
              <TextBody
                style={{marginBottom: 10}}
                title={`${item.daftarPaket.nama} ${item.totalPertemuan} Pertemuan`}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <Tombol
                  onPress={() =>
                    navigation.navigate('LaporanBelajarReport', {
                      data: item,
                    })
                  }
                  style={{paddingHorizontal: 15, paddingVertical: 5}}
                  title="Buat Laporan"
                  secondary
                />

                {item.laporanBelajar.length > 0 ? (
                  <Tombol
                    onPress={() =>
                      navigation.navigate('LaporanBelajarGuruDetail', {
                        data: item,
                      })
                    }
                    style={{paddingHorizontal: 15, paddingVertical: 5}}
                    title="Detail Laporan"
                    primary
                  />
                ) : (
                  <TextBody title="Belum ada laporan" />
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default withNavigation(LaporanBelajar);
