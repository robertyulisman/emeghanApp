import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import TopLabel from '../../components/atoms/TopLabel';
import TopBar from '../../components/molecules/TopBar';
import {Warna} from '../../utils/Data';
import TextCustom from '../../guruApp/LaporanBelajar/TextCustom';
import TextForm from '../../guruApp/LaporanBelajar/TextForm';
// import TextFormImage from '../../guruApp/LaporanBelajar/TextFormImage';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import TombolAksi from '../../components/molecules/TombolAksi';
import axios from 'axios';
import {ToastDefault} from '../../utils/Fungsi';
import {getProfileUser} from '../../config/redux/actions/profileActions';
import EmptyOrder from '../../components/molecules/EmptyOrder';
import moment from 'moment';
import TopBarNew from '../../components/molecules/TopBarNew';
import TextJudul from '../../components/atoms/TextJudul';
import TextBody from '../../components/atoms/TextBody';
import Tombol from '../../components/atoms/Tombol';
import {withNavigation} from 'react-navigation';

const Laporan = ({navigation}) => {
  const {profile} = useSelector(state => state.profile);
  const {user} = useSelector(state => state.auth);
  const [selectSiswa, setSelectSiswa] = React.useState(null);
  // console.log(`selectSiswa`, profile.pesanan[0]);
  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      {/* <TopBar title="Laporan Belajar" left /> */}
      <TopBarNew title="Laporan Hasil Belajar" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {profile.pesanan.map(item => {
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
                padding: 10,
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
              <View style={{alignItems: 'flex-end'}}>
                {/* <TextJudul title={item.namaSiswa} /> */}
                {item.laporanBelajar.length > 0 ? (
                  <Tombol
                    onPress={() =>
                      navigation.navigate('LaporanDetail', {data: item})
                    }
                    style={{paddingHorizontal: 15, paddingVertical: 5}}
                    title="Detail Laporan"
                    secondary
                  />
                ) : (
                  <TextBody title="Belum ada laporan" />
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* <View
        style={{
          backgroundColor: Warna.putih,
          flex: 1,
          marginHorizontal: 10,
          // marginTop: -60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        }}>
        <TopLabel title="Laporan" />

        <View style={{margin: 10, flex: 1}}>
          <TextCustom big center title="Laporan Hasil Belajar Siswa" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <TextCustom title="Nama Siswa" />
            </View>
            <TextCustom title=":" />
            <View
              style={{
                backgroundColor: Warna.abuAbuMuda,
                flex: 2,
                justifyContent: 'flex-end',
              }}>
              <Picker
                selectedValue={selectSiswa}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectSiswa(itemValue);
                  console.log(`itemValue`, itemValue);
                }}>
                <Picker.Item
                  style={{fontSize: 15, color: Warna.abuAbuSedang}}
                  label="Pilih Siswa"
                  // value="java"
                />
                {profile.pesanan.map(item => {
                  return (
                    <Picker.Item
                      key={item._id}
                      style={{fontSize: 15, color: Warna.abuAbuTua}}
                      label={item.namaSiswa}
                      value={item}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectSiswa !== null && selectSiswa !== undefined && (
              <View>
                {selectSiswa.laporanBelajar.length > 0 ? (
                  selectSiswa.laporanBelajar.map(item => {
                    return (
                      <ScrollView>
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: Warna.biruMuda,
                            borderRadius: 20,
                            // padding: 10,
                            marginVertical: 10,
                            overflow: 'hidden',
                          }}>
                          <TopLabel
                            title={moment(item.tanggal).format(
                              'Do MMM YYYY, h:mm:ss a',
                            )}
                          />
                          <View style={{padding: 10}}>
                            <TextForm
                              style={{
                                marginBottom: -5,
                              }}
                              editable={true}
                              valueInput={item.pertemuanKe}
                              keyTitle="Pertemuan Ke"
                            />

                            <TextForm
                              style={{marginVertical: -5}}
                              editable={true}
                              valueInput={item.hafalan.target}
                              keyTitle="Target Hafalan"
                            />
                            <TextForm
                              style={{marginVertical: -5}}
                              editable={true}
                              valueInput={item.hafalan.hasil}
                              keyTitle="Hasil Hafalan"
                            />
                            <TextForm
                              style={{marginVertical: -5}}
                              editable={true}
                              valueInput={item.hafalan.nilai}
                              keyTitle="Nilai Hafalan"
                            />
                            <TextForm
                              style={{marginVertical: -5}}
                              editable={true}
                              valueInput={item.mengaji.target}
                              keyTitle="Target mengaji"
                            />
                            <TextForm
                              style={{marginVertical: -5}}
                              editable={true}
                              valueInput={item.mengaji.hasil}
                              keyTitle="Hasil mengaji"
                            />
                            <TextForm
                              style={{marginVertical: -5}}
                              editable={true}
                              valueInput={item.mengaji.nilai}
                              keyTitle="Nilai mengaji"
                            />
                          </View>
                        </View>
                      </ScrollView>
                    );
                  })
                ) : (
                  <View>
                    <EmptyOrder title="belum ada laporan" />
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </View> */}
    </View>
  );
};

export default withNavigation(Laporan);
