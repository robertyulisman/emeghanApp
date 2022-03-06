import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import IconCustom from '../../components/atoms/IconCustom';
import TextBody from '../../components/atoms/TextBody';
import TextHeading from '../../components/atoms/TextHeading';
import TextJudul from '../../components/atoms/TextJudul';
import Tombol from '../../components/atoms/Tombol';
import TopBarNew from '../../components/molecules/TopBarNew';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const width = Dimensions.get('screen').width;

import {Warna} from '../../utils/Data';
import {formatNumber} from '../../utils/Fungsi';

const OrderHotel = ({navigation}) => {
  const {data} = navigation.state.params;
  const [dataFutsal, setDataFutsal] = React.useState([]);

  const [totalHarga, setTotalHarga] = React.useState(0);
  const [durasi, setDurasi] = React.useState('');
  const [tanggal, setTanggal] = React.useState('');
  const [jam, setJam] = React.useState('');
  const [openJam, setOpenJam] = React.useState(false);
  const [openTanggal, setOpenTanggal] = React.useState(false);
  const [newDateTanggal, setNewDateTanggal] = React.useState(new Date());

  const handleOnPressDurasi = item => {
    console.log(`item`, item);
    setTotalHarga(item.harga);
    setDurasi(item.durasi);
    const newData = dataFutsal.map(itemData => {
      if (itemData.id === item.id) {
        return {
          ...itemData,
          isSelect: true,
        };
      } else {
        return {
          ...itemData,
          isSelect: false,
        };
      }
    });
    setDataFutsal(newData);
  };

  React.useEffect(() => {
    setDataFutsal(dataJamFutsal);
  }, []);

  const handleLanjut = () => {
    const skrg = newDateTanggal.getTime().toString().slice(0, 8);
    const newDate = new Date().getTime().toString().slice(0, 8);
    if (skrg === newDate) {
      Alert.alert('Error', 'pastikan waktu booking kamu sudah sesuai');
    } else if (totalHarga === 0) {
      Alert.alert('Error', 'silahkan pilih Durasi');
    } else {
      const dataOrder = {
        ...data,
        durasi: durasi,
        waktu: newDateTanggal,
        total: totalHarga,
      };
      console.log(`data`, dataOrder);
      navigation.navigate('Pembayaran', {dataOrder: dataOrder, type: 'hotel'});
    }
  };
  const dataJamFutsal = [
    {
      id: 1,
      durasi: '1 Hari',
      harga: data.harga * 1,
      isSelect: false,
    },
    {
      id: 2,
      durasi: '2 Hari',
      harga: data.harga * 2,
      isSelect: false,
    },
    {
      id: 3,
      durasi: '3 Hari',
      harga: data.harga * 3,
      isSelect: false,
    },
    {
      id: 4,
      durasi: '4 Hari',
      harga: data.harga * 4,
      isSelect: false,
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: Warna.putih}}>
      <TopBarNew title={data.nama} />
      <ScrollView style={{margin: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextJudul title="Pilih Waktu" />
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: Warna.primary.satu,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 5,
            }}
            onPress={() => setOpenTanggal(true)}>
            <TextJudul title="Ganti" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: Warna.grayscale.empat,
            alignItems: 'baseline',
          }}>
          <IconCustom name={require('../../assets/icon/calender.png')} />
          <TextBody
            style={{marginLeft: 10}}
            title={`${moment(newDateTanggal).format('DD MMMM YYYY')}`}
          />
        </View>
        {/* picker jam */}
        <DatePicker
          title="Pilih Waktu"
          minuteInterval={30}
          modal
          mode="date"
          minimumDate={new Date()}
          open={openTanggal}
          date={newDateTanggal}
          onConfirm={date => {
            setOpenTanggal(false);
            setNewDateTanggal(date);
          }}
          onCancel={() => {
            setOpenTanggal(false);
          }}
        />

        {/* pilih jam */}
        {/* <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: Warna.grayscale.empat,
            alignItems: 'baseline',
          }}>
          <IconCustom name={require('../../assets/icon/stopwatch.png')} />
          <TextBody
            style={{marginLeft: 10}}
            title={`${moment(newDateTanggal).format('h:mm a')}`}
          />
        </View> */}

        <TextJudul style={{marginTop: 30}} title="Pilih Durasi" />
        <View>
          <View style={{marginTop: 10}}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {dataFutsal.map(item => (
                <TouchableOpacity
                  onPress={() => handleOnPressDurasi(item)}
                  key={item.id}
                  style={{
                    // flex: 1,

                    padding: 15,
                    borderWidth: 1,
                    borderColor: Warna.grayscale.empat,
                    borderRadius: 15,
                    margin: 5,
                    width: width / 2 - 30,
                    backgroundColor:
                      item.isSelect === true ? Warna.primary.lima : null,
                  }}>
                  <TextHeading title={item.durasi} />
                  <TextBody title={`${formatNumber(item.harga)}`} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{marginHorizontal: 20}}>
        <TextBody title="Total" />
        <TextHeading title={`${formatNumber(totalHarga)}`} />
      </View>
      <Tombol
        onPress={handleLanjut}
        primary
        style={{margin: 20}}
        title="Lanjutkan"
      />
    </View>
  );
};

export default withNavigation(OrderHotel);
