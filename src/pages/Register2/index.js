import React from 'react';
import {Text, View, TextInput} from 'react-native';
import GambarLogo from '../../components/atoms/GambarLogo';
import Tombol from '../../components/atoms/Tombol';
import {Warna} from '../../utils/Data';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {registerUser} from '../../config/redux/actions/authAction';
import {withNavigation} from 'react-navigation';
import axios from 'axios';
import LoadingComp from '../../components/atoms/LoadingComp';
import TextHeading from '../../components/atoms/TextHeading';
import OtpInPut from '../../components/molecules/OtpInPut';
import {useSelector, useDispatch} from 'react-redux';

const Register2 = ({navigation}) => {
  // const params = navigation.state;

  // console.log(`params`, params);
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  const {errors} = useSelector(state => state);
  const [isLanjut, setIslanjut] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    nama: '',
    pin: '',
    pinLogin: '',
    pinConfirmation: '',
    errors: {},
    errorNama: false,
  });

  React.useEffect(() => {
    if (auth.isAuthenticated === true) {
      setLoading(false);
      console.log(`is autentikasi guys`);
      // this.props.navigation.navigate('FormUpdateProfile');
    }
    if (errors) {
      console.log(`is error guys`);
      // this.setState({errors: nextProps.errors, loading: false});
      setError(errors);
      setLoading(false);
    }
  }, [auth, errors]);

  const handleLanjut = () => {
    const {phoneNumber} = navigation.state.params;

    const userData = {
      nama: form.nama,
      pin: form.pinLogin,
      noHp: phoneNumber,
    };

    console.log(`lanjut`, userData);
    console.log(`phoneNumber`, phoneNumber);
    if (isLanjut) {
      setLoading(true);
      if (form.pinLogin.length !== 6) {
        alert('pin minimal 6 angka'), setIslanjut(false);
        setForm({
          ...form,
          pin: '',
        });
      } else if (form.pinLogin !== form.pinConfirmation) {
        alert('pin tidak sama'),
          setForm({
            ...form,
            pin: '',
          });
      } else {
        console.log('data', userData);

        dispatch(registerUser(userData, navigation));
      }
    } else {
      if (form.nama === '') {
        setForm({
          ...form,
          errorNama: true,
        });
      } else {
        setForm({
          ...form,
          pin: '',
        });

        setIslanjut(true);
        // this.setState({isLanjut: true, pin: ''});
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Warna.grayscale.lima,
      }}>
      <TextHeading
        style={{marginHorizontal: 20, marginTop: 50, paddingVertical: 10}}
        title={
          isLanjut
            ? 'Masukkan Kembali Pin Anda'
            : 'Buat Kode PIN untuk amankan Akun Anda'
        }
      />
      <View
        style={{
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            width: '100%',
          }}>
          <OtpInPut
            secureTextEntry
            code={form.pin}
            onCodeChanged={code => {
              if (!isLanjut) {
                setForm({
                  ...form,
                  pinLogin: code,
                  pin: code,
                });
                // this.setState({pinLogin: code, pin: code});
              } else {
                // this.setState({pinCorfirmation: code, pin: code});
                setForm({
                  ...form,
                  pinConfirmation: code,
                  pin: code,
                });
              }
            }}
            // onCodeFilled={code => handleLanjut}
            // onCodeFilled={code => handleonCodeFilled(code)}
          />
        </View>
        {!isLanjut && (
          <View
            style={{
              backgroundColor: Warna.grayscale.lima,
              height: 50,
              width: '100%',
              marginHorizontal: 20,
              marginVertical: 20,
              borderRadius: 10,
              paddingLeft: 20,
              borderBottomWidth: form.errorNama ? 2 : null,
              borderBottomColor: form.errorNama ? Warna.merah : null,
              borderWidth: 1,
              borderColor: Warna.grayscale.empat,
            }}>
            <TextInput
              style={{
                color: Warna.grayscale.satu,
                width: '100%',
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
              }}
              onChangeText={nama => {
                setForm({
                  ...form,
                  nama: nama,
                  errorNama: false,
                });
                // this.setState({nama, errorNama: false})
              }}
              value={form.nama}
              placeholder={
                form.errorNama
                  ? 'Nama tidak Boleh Kosong !'
                  : 'Masukkan Nama Anda'
              }
              onFocus={e =>
                setForm({
                  ...form,
                  errorNama: false,
                })
              }
              placeholderTextColor={
                form.errorNama ? Warna.merah : Warna.abuAbuSedang
              }
              keyboardType="default"
            />
          </View>
        )}
      </View>
      {loading ? (
        <LoadingComp primary />
      ) : (
        <Tombol
          primary
          style={{
            marginHorizontal: 20,
            marginTop: 10,
          }}
          title={isLanjut ? 'KONFIRMASI' : 'LANJUT'}
          onPress={handleLanjut}
        />
      )}
    </View>
  );
};

export default withNavigation(Register2);
