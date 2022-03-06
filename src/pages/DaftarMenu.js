import React from 'react';
import {View, Text} from 'react-native';
import GambarCustom from '../components/atoms/GambarCustom';
import {Warna} from '../utils/Data';
import {withNavigation} from 'react-navigation';
import Tombol from '../components/atoms/Tombol';
import DaftarMenuList from '../components/molecules/DaftarMenuList';
import TextHeading from '../components/atoms/TextHeading';
import TextBody from '../components/atoms/TextBody';
import TextJudul from '../components/atoms/TextJudul';

const DaftarMenu = ({navigation}) => {
  // state
  const [data, setData] = React.useState([]);
  const [role, setRole] = React.useState('');
  console.log(`role`, role);

  // use effect
  React.useEffect(() => {
    setData(dataMenu);
  }, []);

  // fungsi handle lanjut
  const handleLanjut = () => {
    if (role === 'Siswa') {
      navigation.navigate('Login');
    } else if (role === 'Guru') {
      navigation.navigate('LoginGuru');
    }
  };

  // fungsi handle klik role
  const handleOnPress = item => {
    const newData = data.map(paket => {
      if (paket.key === item.key) {
        setRole(paket.key);
        return {
          ...paket,
          onChoose: true,
        };
      } else {
        return {
          ...paket,
          onChoose: false,
        };
      }
    });
    setData(newData);
  };

  // data menu
  const dataMenu = [
    {
      key: 'Siswa',
      onChoose: false,
      title: 'Daftar Sebagai Siswa',
      description: 'untuk mendapatkan tenaga Guru secara Online',
      image: require('../assets/images/daftarSiswa.png'),
    },
    {
      key: 'Guru',
      onChoose: false,
      title: 'Daftar Sebagai Guru',
      description: 'berkontribusi untuk menjadi tenaga Pengajar',
      image: require('../assets/images/daftarGuru.png'),
    },
  ];

  // render komponen
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Warna.grayscale.lima,
        padding: 20,
        justifyContent: 'center',
      }}>
      <GambarCustom
        style={{
          height: 250,
          width: '100%',
          marginBottom: 20,
        }}
        source={require('../assets/gambar/role.png')}
      />
      <View
        style={{margin: 10, justifyContent: 'center', alignItems: 'center'}}>
        <TextHeading
          style={{textAlign: 'center'}}
          title="Selamat Datang di aplikasi e-meghan"
        />
        <TextBody
          style={{
            textAlign: 'center',
            marginBottom: 20,
            color: Warna.grayscale.dua,
            fontSize: 16,
          }}
          title="Dapatkan berbagai Kemudahan bertransaksi dalam 1 aplikasi"
        />
      </View>

      <Tombol
        onPress={() => navigation.navigate('Login')}
        // disabled={role === '' ? true : false}
        title="Masuk"
        primary
        // style={{position: 'absolute', bottom: 20, left: 20, right: 20}}
      />
      <Tombol
        onPress={() => navigation.navigate('Register')}
        // disabled={role === '' ? true : false}
        title="Buat Akun"
        secondary
        style={{marginTop: 20}}
      />
    </View>
  );
};

export default withNavigation(DaftarMenu);
