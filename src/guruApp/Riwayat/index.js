import axios from 'axios';
import moment from 'moment';
import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import GambarCustom from '../../components/atoms/GambarCustom';
import LoadingComp from '../../components/atoms/LoadingComp';
import TopLabel from '../../components/atoms/TopLabel';
import EmptyOrder from '../../components/molecules/EmptyOrder';
import TopBar from '../../components/molecules/TopBar';
import {apiUrl, Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation';
import TopBarNew from '../../components/molecules/TopBarNew';
import TextJudul from '../../components/atoms/TextJudul';
import TextBody from '../../components/atoms/TextBody';
import {formatNumber} from '../../utils/Fungsi';
import TextHeading from '../../components/atoms/TextHeading';
import Tombol from '../../components/atoms/Tombol';

const Riwayat = ({navigation}) => {
  const {profile} = useSelector(state => state.profile);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  //   console.log('user', profile._id);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/api/withdraw/${profile._id}`)
      .then(res => {
        setData(res.data);
        console.log(`sukses`, res.data);
        setLoading(false);
      })
      .catch(err => console.log(`error get withdraw`, err));
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      {/* <TopBar left title="Riwayat Pembayaran" /> */}
      <TopBarNew title="Saldo Pembayaran" />
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 20,
          borderRadius: 16,
          backgroundColor: Warna.grayscale.lima,
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
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 10,
          }}>
          <TextBody title="Saldo Proo" />

          <Tombol
            onPress={() => navigation.navigate('Withdraw')}
            title="Withdraw"
            secondary
            style={{paddingVertical: 5, alignSelf: 'flex-end'}}
          />
        </View>
        <TextHeading
          style={{paddingVertical: 5}}
          title={formatNumber(profile.saldo)}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: Warna.putih,
          marginHorizontal: 10,
          // marginTop: -60,
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
        }}>
        {loading ? (
          <LoadingComp />
        ) : data.length > 0 ? (
          data.map(item => {
            console.log(`item`, item);
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailRiwayat', {data: item})
                }
                key={item._id}
                style={{
                  marginTop: 10,
                  marginHorizontal: 10,
                  borderRadius: 16,
                  backgroundColor: Warna.grayscale.lima,
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
                <TextJudul title={item.judul} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextBody title={item.pengirim} />
                  <TextJudul title={formatNumber(item.nominal)} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextBody
                    style={{color: Warna.grayscale.tiga}}
                    title={moment(item.createdAt).format('Do MMMM YYYY')}
                  />
                  <TextBody
                    style={{
                      color:
                        item.isApprove === true
                          ? Warna.primary.satu
                          : Warna.merah,
                    }}
                    title={item.isApprove === true ? 'Berhasil' : 'Gagal'}
                  />
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DetailRiwayat', {data: item})
                  }
                  style={{flexDirection: 'row'}}>
                  <View style={{margin: 10, flex: 1}}></View>
                </TouchableOpacity>

                {/* <View style={{height: 200, width: '100%'}}>
                  <GambarCustom
                    resizeMode="cover"
                    source={{uri: `${apiUrl}/${item.resi}`}}
                    style={{height: 200, width: '100%'}}
                  />
                </View> */}
              </TouchableOpacity>
            );
          })
        ) : (
          <EmptyOrder title="Belum ada Data" />
        )}
      </ScrollView>
    </View>
  );
};

export default withNavigation(Riwayat);
