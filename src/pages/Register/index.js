import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import {apiUrl, Warna} from '../../utils/Data';
import CheckBox from '@react-native-community/checkbox';
import Tombol from '../../components/atoms/Tombol';
import auth from '@react-native-firebase/auth';
import {ToastDefault} from '../../utils/Fungsi';
import {Flow} from 'react-native-animated-spinkit';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {validasiNumber} from '../../config/redux/actions/authAction';
import InputNoPhone from '../../components/molecules/InputNoPhone';
import FooterAuth from '../../components/molecules/FooterAuth';
import OtpInPut from '../../components/molecules/OtpInPut';
import IconVector from 'react-native-vector-icons/AntDesign';
import TombolBack from '../../components/atoms/TombolBack';
import TextHeading from '../../components/atoms/TextHeading';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kodeNegara: '+62',
      numberPhone: '',
      isSelected: false,
      // isRegister: true,
      sendOtp: false,
      disabledDaftar: true,
      isLoading: false,
      code: '',
      confirmationOTP: '',
      errors: {},
      error: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const {isRegister} = this.state;
    if (nextProps.errors.noHp === 'no hp kamu sudah terdaftar') {
      this.setState({errors: nextProps.errors, isLoading: false});
    } else {
      const {kodeNegara, numberPhone} = this.state;
      const noValid = kodeNegara.concat(numberPhone);
      this.setState({
        // confirmationOTP: res,
        sendOtp: true,
        isLoading: false,
      });
      // this.setState({errors: nextProps.errors});
      // this.setState({
      //   // isRegister: !isRegister,
      //   sendOtp: false,
      //   // errors: nextProps.errors,
      // });

      // +62 812-7107-6751
    }
  }

  // componentDidMount() {
  //   const {numberPhone} = this.state;
  //   // +62 812-7107-6751
  //   auth().onAuthStateChanged(user => {
  //     if (user) {
  //       // if user data exist
  //       console.log(`user firebase`, user);
  //       this.props.navigation.navigate('Register2', {
  //         // phoneNumber: numberPhone,
  //         phoneNumber: user.phoneNumber,
  //       });
  //       //clear previous user session
  //       this.logOutFirebase();
  //     }
  //   });
  // }

  // logOutFirebase = () => {
  //   auth().signOut();
  // };

  handleCheckBox(newValue) {
    this.setState({isSelected: !this.state.isSelected});
    console.log('new value check box', newValue);
  }

  handleDaftarButton = () => {
    const {kodeNegara, numberPhone, isSelected, isRegister} = this.state;
    const noValid = kodeNegara.concat(numberPhone);
    // ToastDefault(`no hp ${numberPhone}`);
    if (isSelected === false) {
      ToastDefault('silahkan diceklist');
    } else {
      this.setState({isLoading: true});
      const userData = {
        noHp: numberPhone,
      };
      this.props.validasiNumber(userData);
    }
  };

  // sendNumber = () => {
  //   const {kodeNegara, numberPhone} = this.state;
  //   const noValid = kodeNegara.concat(numberPhone);
  //   auth()
  //     .signInWithPhoneNumber(noValid)
  //     .then(res => {
  //       console.log('hasil', res), this.setState({confirmationOTP: res});
  //     })
  //     .catch(err => console.log('error', err));
  // };

  handleConfirmOTP = async code => {
    const {numberPhone, confirmationOTP} = this.state;

    const otpData = {
      otp: code,
    };

    axios
      .post(`${apiUrl}/api/siswa/confirmOtp`, otpData)
      .then(res => {
        console.log(`sukses konfirm otp`, res.data);
        this.setState({isLoading: false});
        ToastDefault('Verifikasi Berhasil');
        this.props.navigation.navigate('Register2', {
          phoneNumber: numberPhone,
        });
      })
      .catch(err => {
        this.setState({error: err.response.data.message});
        console.log(`error konfirm otp`, err.response.data.message);
      });
  };

  // handleLanjutOTP = () => {
  //   const {sendOtp, kodeNegara, numberPhone, confirmationOTP, code} =
  //     this.state;

  //   const noValid = kodeNegara.concat(numberPhone);
  //   if (sendOtp) {
  //     this.setState({isLoading: true});

  //     confirmationOTP
  //       .confirm(code)
  //       .then(data => {
  //         // console.log('data code', data.user.phoneNumber);

  //         this.setState({isLoading: false});
  //         ToastDefault('Verifikasi Berhasil');
  //         this.props.navigation.navigate('Register2', {
  //           phoneNumber: noValid,
  //           phoneNumber: data.user.phoneNumber,
  //         });
  //       })
  //       .catch(err => {
  //         ToastDefault('Invalid Code');
  //         alert('Error', JSON.stringify(err));
  //       });
  //   } else {
  //     // this.sendNumber();
  //     // this.setState({sendOtp: true});
  //   }
  // };

  // +6281363898377

  handleOnFocus = () => {
    // console.log(`ini handle on focus`);
    this.setState({
      error: '',
      errors: {},
    });
  };

  render() {
    const {
      numberPhone,
      isSelected,
      isRegister,
      sendOtp,
      disabledDaftar,
      isLoading,
      code,
      errors,
      confirmationOTP,
      error,
    } = this.state;
    console.log(`error`, error);
    return (
      // console.log('error register', this.state.errors.noH=== 'no hp kamu sudah terdaftar'eturn (
      <View
        style={{
          // alignItems: 'center',
          backgroundColor: Warna.grayscale.lima,
          flex: 1,
        }}>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
          }}>
          <TombolBack />
          <TextHeading
            style={{textAlign: 'center', marginTop: 10}}
            title={sendOtp ? `Masukkan kode OTP` : `Daftar`}
          />
          {/* <Text
            style={{
              color: Warna.grayscale.satu,
              marginTop: 30,
              fontSize: 24,
              fontFamily: 'Nunito-ExtraBold',
              // letterSpacing: 5,
            }}>
            {sendOtp ? `Masukkan kode OTP` : `Daftar Sebagai Siswa`}
          </Text> */}
          {sendOtp && (
            <Text
              style={{
                color: Warna.grayscale.satu,
                marginTop: 10,
                // marginHorizontal: 10,
                fontSize: 16,
                fontFamily: 'Nunito-Regular',
              }}>
              kami telah mengirimkan kode OTP ke nomor handphone{' '}
              {numberPhone.replace(numberPhone.substring(3, 8), '*****')}
            </Text>
          )}
        </View>

        {/* <GambarLogo /> */}

        {/* masukkan no HP */}
        {sendOtp ? (
          <View style={{marginHorizontal: 20}}>
            <OtpInPut
              onCodeChanged={code => {
                this.setState({code}), ToastDefault(`code is ${code}`);
              }}
              onCodeFilled={code => this.handleConfirmOTP(code)}
            />
          </View>
        ) : (
          <InputNoPhone
            disabled={!isRegister}
            error={errors.noHp === 'no hp kamu sudah terdaftar'}
            value={numberPhone}
            onFocus={this.handleOnFocus}
            onChangeText={numberPhone => {
              this.setState({numberPhone});

              if (
                numberPhone.length > 9 &&
                numberPhone.length < 13 &&
                numberPhone.substr(0, 1) == '0' &&
                !isNaN(numberPhone)
              ) {
                this.setState({disabledDaftar: false});
              } else {
                this.setState({disabledDaftar: true});
              }
              // this.setState({numberPhone});
            }}
          />
        )}
        {errors.noHp === 'no hp kamu sudah terdaftar' && (
          <Text
            style={{
              color: Warna.merah,
              marginTop: 20,
              marginHorizontal: 20,
              fontSize: 14,
              // fontWeight: 'bold',
              textAlign: 'center',
              fontFamily: 'Nunito-Regular',
            }}>
            {errors.noHp} !, silahkan daftar dengan no hp yang lain, atau login
            sekarang
          </Text>
        )}
        {this.state.error !== '' && (
          <Text
            style={{
              color: Warna.merah,
              marginTop: 20,
              marginHorizontal: 20,
              fontSize: 14,
              // fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {`${this.state.error}`}
          </Text>
        )}

        <View>
          {sendOtp ? (
            <Text
              style={{
                color: Warna.grayscale.satu,
                marginTop: 10,
                // marginHorizontal: 10,
                textAlign: 'center',
                fontSize: 16,
              }}>
              0 : 59
            </Text>
          ) : (
            <View
              style={{
                marginHorizontal: 10,
                flexDirection: 'row',
                marginTop: 20,
              }}>
              <CheckBox
                value={isSelected}
                onValueChange={newValue => this.handleCheckBox(newValue)}
                style={{marginRight: 10}}
                tintColors={{
                  true: Warna.primary.satu,
                  false: Warna.grayscale.tiga,
                }}
              />
              <Text style={{color: Warna.grayscale.satu, fontSize: 14}}>
                Saya setuju dengan{' '}
                <Text style={{color: Warna.primary.satu, fontSize: 14}}>
                  Syarat dan Ketentuan{' '}
                </Text>
                dan{' '}
                <Text style={{color: Warna.primary.satu, fontSize: 14}}>
                  Kebijakan Privasi{' '}
                </Text>
                yang berlaku
              </Text>
            </View>
          )}
          {sendOtp ? null : (
            <Tombol
              style={{marginHorizontal: 20, marginTop: 20}}
              primary
              title="Daftar"
              onPress={this.handleDaftarButton}
              disabled={disabledDaftar}
            />
          )}
          <FooterAuth
            rightText={sendOtp ? 'Kirim ulang' : 'Masuk disini'}
            leftText={
              sendOtp ? 'Belum menerima kode OTP ?' : 'Sudah punya Akun ?'
            }
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
        {isLoading && (
          <View style={{alignSelf: 'center', marginTop: 20}}>
            <Flow size={48} color={Warna.primary.satu}></Flow>
          </View>
        )}
      </View>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, {validasiNumber})(Register);
// export default Register;
