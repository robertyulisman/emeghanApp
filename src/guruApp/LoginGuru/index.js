import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import GambarLogo from '../../components/atoms/GambarLogo';
import Tombol from '../../components/atoms/Tombol';
import FooterAuth from '../../components/molecules/FooterAuth';
import {apiUrl, Warna} from '../../utils/Data';
import {withNavigation} from 'react-navigation';
import InputCustom from '../../components/molecules/InputCustom';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../../config/redux/actions/authAction';
import LoadingComp from '../../components/atoms/LoadingComp';

import IconVector from 'react-native-vector-icons/AntDesign';
import GambarCustom from '../../components/atoms/GambarCustom';
import TombolBack from '../../components/atoms/TombolBack';

const LoginGuru = ({navigation}) => {
  const dispatch = useDispatch();
  const {auth, errors} = useSelector(state => state);
  const [loading, setLoading] = React.useState(false);
  const [labelEmail, setLabelEmail] = React.useState(true);
  const [labelPassword, setLabelPassword] = React.useState(true);
  // console.log(`errors data`, errors);

  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });
  const [error, setError] = React.useState(null);

  const onChangeTextInput = (value, type) => {
    setForm({
      ...form,
      [type]: value,
    });
  };
  const handleSubmit = () => {
    setLoading(true);
    console.log(`submit ??`, form);
    const userType = 'guru';
    dispatch(loginUser(form, userType));
  };

  React.useEffect(() => {
    if (auth.isAuthenticated) {
      setLoading(false);
      // console.log('oke, silahkan login');
      navigation.navigate('DashboardGuru');
    }
    if (errors !== null) {
      setLoading(false);
      setError(errors);
    }
  }, [auth.isAuthenticated, errors]);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Warna.grayscale.lima,
      }}>
      <View style={{marginTop: 10, marginHorizontal: 20}}>
        <TombolBack />

        <GambarCustom
          style={{width: '100%', height: 200}}
          source={require('../../assets/images/loginSiswa.png')}
        />
        <Text
          style={{
            color: Warna.grayscale.satu,
            marginTop: 30,
            marginBottom: 10,
            fontSize: 24,
            fontFamily: 'Nunito-ExtraBold',
            // letterSpacing: 5,
          }}>
          Masuk Sebagai Guru
        </Text>
      </View>
      <View style={{marginHorizontal: 20}}>
        <InputCustom
          value={form.email}
          onChangeText={value => onChangeTextInput(value, 'email')}
          error={error?.email}
          errorText={error?.email}
          placeholder="Email"
          keyboardType="email-address"
          label={labelEmail && 'Email'}
          onFocus={() => {
            setLabelEmail(false);
            setError({...error, email: null});
          }}
          onBlur={() => setLabelEmail(true)}
          // error
        />

        <InputCustom
          value={form.password}
          onChangeText={value => onChangeTextInput(value, 'password')}
          secureTextEntry={true}
          placeholder="Password"
          error={error?.password}
          errorText={error?.password}
          label={labelPassword && 'Password'}
          onFocus={() => {
            setLabelPassword(false);
            setError({...error, password: null});
          }}
          onBlur={() => setLabelPassword(true)}
        />
      </View>
      {loading ? (
        <LoadingComp primary />
      ) : (
        <>
          <Tombol
            style={{marginHorizontal: 20, marginTop: 20}}
            primary
            title="Masuk"
            onPress={handleSubmit}
          />
          <FooterAuth
            rightText="Daftar Disini"
            leftText="Belum punya akun guru ?"
            onPress={() => navigation.navigate('RegisterGuru')}
          />
          <Tombol
            secondary
            style={{marginHorizontal: 20, marginVertical: 20}}
            title="Beralih ke Akun Siswa"
            onPress={() => navigation.navigate('Login')}
          />
        </>
      )}
    </ScrollView>
  );
};

export default withNavigation(LoginGuru);
