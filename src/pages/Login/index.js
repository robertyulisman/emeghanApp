import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import GambarLogo from '../../components/atoms/GambarLogo';
import Tombol from '../../components/atoms/Tombol';
import FooterAuth from '../../components/molecules/FooterAuth';
import InputNoPhone from '../../components/molecules/InputNoPhone';
import OtpInPut from '../../components/molecules/OtpInPut';
import {loginUser} from '../../config/redux/actions/authAction';
import {Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/FontAwesome';
import TombolBack from '../../components/atoms/TombolBack';
import LoadingComp from '../../components/atoms/LoadingComp';
import IconVector from 'react-native-vector-icons/AntDesign';
import GambarCustom from '../../components/atoms/GambarCustom';
import TextJudul from '../../components/atoms/TextJudul';
import TextHeading from '../../components/atoms/TextHeading';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {auth, errors} = useSelector(state => state);
  // const {errors} = useSelector(state => state);
  const [loading, setLoading] = React.useState(false);

  const [form, setForm] = useState({
    noHp: '',
    pin: '',
  });
  const [isLanjut, setIsLanjut] = useState(false);
  const handleOnChange = (value, input) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      // console.log('oke, silahkan login');
      setLoading(false);
      navigation.navigate('Dashboard');
    }
    if (errors.noHp === 'User tidak ditemukan') {
      console.log('errrooor', errors);
      setLoading(false);
      setTimeout(() => {
        setForm({
          ...form,
          pin: '',
        });
        setIsLanjut(false);
      }, 2000);
    } else if (errors.pin === 'Pin Salah') {
      setLoading(false);
    }
  }, [auth.isAuthenticated, errors]);

  const handleSubmit = () => {
    if (form.noHp === '') {
      alert('No Handphone tidak boleh kosong');
    } else {
      setLoading(false);
      setIsLanjut(true);
    }
  };

  const handleonCodeFilled = code => {
    setLoading(true);
    const userType = 'siswa';
    const codeRegion = '62';
    const validNumber = codeRegion.concat(form.noHp);

    const newForm = {
      noHp: form.noHp,
      pin: code,
    };
    // console.log(`newForm`, newForm);
    dispatch(loginUser(newForm, userType));
  };

  const ErrorText = ({title}) => (
    <Text
      style={{
        color: Warna.merah,
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        marginHorizontal: 20,
        fontFamily: 'Nunito-Regular',
      }}>
      {title} !
    </Text>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Warna.grayscale.lima,
      }}>
      <View
        style={{marginTop: 10, marginHorizontal: 20, justifyContent: 'center'}}>
        <TombolBack onPress={isLanjut ? () => setIsLanjut(false) : false} />

        <TextHeading
          style={{marginTop: 20, marginVertical: 10}}
          title={isLanjut ? 'Masukkan PIN Anda' : 'Selamat Datang kembali,'}
        />
        {isLanjut ? null : (
          <GambarCustom
            style={{width: '100%', height: 250}}
            source={require('../../assets/gambar/login.png')}
          />
        )}
      </View>

      {isLanjut ? (
        <>
          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <OtpInPut
              error={errors.pin || errors.noHp}
              secureTextEntry
              code={form.pin}
              onCodeChanged={value => handleOnChange(value, 'pin')}
              onCodeFilled={code => handleonCodeFilled(code)}
            />
            {errors.pin && <ErrorText title={errors.pin} />}
            {errors.noHp && <ErrorText title={errors.noHp} />}
          </View>
        </>
      ) : (
        <>
          <InputNoPhone
            disabled={true}
            value={form.noHp}
            onChangeText={value => handleOnChange(value, 'noHp')}
          />
        </>
      )}
      {loading ? (
        <LoadingComp primary />
      ) : (
        <>
          {isLanjut ? null : (
            <Tombol
              style={{marginHorizontal: 20, marginTop: 20, marginBottom: 20}}
              primary
              title={'Lanjut'}
              onPress={handleSubmit}
            />
          )}
          <FooterAuth
            rightText={isLanjut ? 'Reset PIN' : 'Daftar disini'}
            leftText={isLanjut ? 'Lupa PIN Anda ?' : 'Belum punya Akun ?'}
            onPress={() => navigation.navigate('Register')}
          />
        </>
      )}
    </View>
  );
};

export default withNavigation(Login);
