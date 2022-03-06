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
import GambarCustom from '../../components/atoms/GambarCustom';
import {TouchableOpacity} from 'react-native-gesture-handler';

const LaporanBelajarGuruDetail = ({navigation}) => {
  const {data} = navigation.state.params;
  const [indek, setIndek] = React.useState(0);
  const [dataLaporan, setDataLaporan] = React.useState(
    data.laporanBelajar[indek],
  );

  console.log(`data laporan belajar`, data);

  const handlePrev = () => {
    if (indek === 0) {
      alert('tidak bisa back');
    } else {
      setIndek(indek - 1);

      setDataLaporan(data.laporanBelajar[indek - 1]);
    }

    console.log(`data length`, data.laporanBelajar[indek]);
    console.log(`index`, data.laporanBelajar.length);
  };

  const handleNext = () => {
    if (indek === data.laporanBelajar.length - 1) {
      alert('tidak bisa next');
    } else {
      setIndek(indek + 1);
      setDataLaporan(data.laporanBelajar[indek + 1]);
    }
  };
  console.log(`dataLaporan`, data.laporanBelajar.length);
  console.log(`indek`, indek);
  // console.log(`data`, data);
  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      {/* <TopBar title="Laporan Belajar" left /> */}
      <TopBarNew title="Detail Laporan Hasil Belajar" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextJudul title={data.namaSiswa} />
            <View
              style={{
                backgroundColor: Warna.primary.lima,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 8,
              }}>
              <TextBody title={data.mataPelajaran.nama} />
            </View>
          </View>
          <TextBody
            style={{marginBottom: 10}}
            title={`${data.daftarPaket.nama} ${data.totalPertemuan} Pertemuan`}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 8,
            backgroundColor: Warna.grayscale.empat,
            marginVertical: 10,
          }}
        />
        <View style={{marginHorizontal: 20}}>
          <TextJudul title="Laporan Belajar" />
        </View>
        {/* indikator */}
        <View style={{flexDirection: 'row', padding: 20}}>
          <TouchableOpacity
            // style={{opacity: indek === 0 ? 0.5 : 1}}
            onPress={handlePrev}
            disabled={indek === 0}>
            <GambarCustom
              style={{width: 40, height: 40}}
              source={
                indek === 0
                  ? require('../../assets/figma/previous_inactive_button.png')
                  : require('../../assets/figma/previous_active_button.png')
              }
            />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextBody title={`Pertemuan ke ${dataLaporan?.pertemuanKe}`} />
          </View>
          <TouchableOpacity
            disabled={indek === data.laporanBelajar.length - 1}
            onPress={handleNext}>
            <GambarCustom
              style={{width: 40, height: 40}}
              source={
                indek === data.laporanBelajar.length - 1
                  ? require('../../assets/figma/next_inactive_button.png')
                  : require('../../assets/figma/next_active_button.png')
              }
            />
          </TouchableOpacity>
        </View>

        {/* hafalan */}
        <View
          style={{
            marginHorizontal: 20,
            borderWidth: 1,
            borderColor: Warna.grayscale.empat,
            borderRadius: 8,
            overflow: 'hidden',
          }}>
          <TopLabel title="Laporan Hafalan" />
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row'}}>
              <GambarCustom
                style={{width: 25, height: 25}}
                source={require('../../assets/figma/target_icon.png')}
              />

              <View
                style={{
                  justifyContent: 'center',
                  marginHorizontal: 10,
                  flex: 1,
                }}>
                <TextBody
                  title={`Pertemuan ke ${dataLaporan?.hafalan?.target}`}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <GambarCustom
                style={{width: 25, height: 25}}
                source={require('../../assets/figma/hafalan_icon.png')}
              />

              <View
                style={{
                  justifyContent: 'center',
                  marginHorizontal: 10,
                  flex: 1,
                }}>
                <TextBody
                  title={`Pertemuan ke ${dataLaporan?.hafalan?.hasil}`}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TextBody title="Nilai Hafalan" />
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <TextBody
                  style={{
                    fontSize: 22,
                    justifyContent: 'center',
                    marginLeft: 10,
                    color: Warna.primary.satu,
                  }}
                  title={`${dataLaporan?.hafalan?.nilai}`}
                />
                <TextBody style={{justifyContent: 'center'}} title="/100" />
              </View>
            </View>
          </View>
        </View>

        {/* mengaji */}
        <View
          style={{
            marginHorizontal: 20,
            borderWidth: 1,
            borderColor: Warna.grayscale.empat,
            borderRadius: 8,
            marginTop: 20,
            overflow: 'hidden',
          }}>
          <TopLabel title="Laporan Mengaji" />
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row'}}>
              <GambarCustom
                style={{width: 25, height: 25}}
                source={require('../../assets/figma/target_icon.png')}
              />

              <View
                style={{
                  justifyContent: 'center',
                  marginHorizontal: 10,
                  flex: 1,
                }}>
                <TextBody
                  title={`Pertemuan ke ${dataLaporan?.mengaji?.target}`}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <GambarCustom
                style={{width: 25, height: 25}}
                source={require('../../assets/figma/hafalan_icon.png')}
              />

              <View
                style={{
                  justifyContent: 'center',
                  marginHorizontal: 10,
                  flex: 1,
                }}>
                <TextBody
                  title={`Pertemuan ke ${dataLaporan?.mengaji?.hasil}`}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TextBody title="Nilai Hafalan" />
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <TextBody
                  style={{
                    fontSize: 22,
                    justifyContent: 'center',
                    marginLeft: 10,
                    color: Warna.primary.satu,
                  }}
                  title={`${dataLaporan?.mengaji?.nilai}`}
                />
                <TextBody style={{justifyContent: 'center'}} title="/100" />
              </View>
            </View>
          </View>
        </View>
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
      <Tombol
        style={{margin: 20}}
        primary
        title="Buat Laporan Hasil Belajar"
        onPress={() =>
          navigation.navigate('LaporanBelajarReport', {data: data})
        }
      />
    </View>
  );
};

export default withNavigation(LaporanBelajarGuruDetail);
