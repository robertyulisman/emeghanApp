import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import GambarLogo from '../../components/atoms/GambarLogo';
import TopLabel from '../../components/atoms/TopLabel';
import TopBar from '../../components/molecules/TopBar';
import {apiUrl, Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tombol from '../../components/atoms/Tombol';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import DropDownAlamat from '../../components/molecules/DropDownAlamat';
import Input from '../../components/molecules/Input';
import {ToastDefault} from '../../utils/Fungsi';
import {
  getProfileUser,
  updateProfileUser,
} from '../../config/redux/actions/profileActions';
import DocumentPicker from 'react-native-document-picker';
import GambarCustom from '../../components/atoms/GambarCustom';
import BottomNavBar from '../../components/molecules/BottomNavBar';
import TextJudul from '../../components/atoms/TextJudul';
import TextBody from '../../components/atoms/TextBody';
import ListMenu from './ListMenu';
import {withNavigation} from 'react-navigation';
import Pembatas from '../../components/atoms/Pembatas';
import ListMenuTentang from './ListMenuTentang';

const Profil = ({navigation}) => {
  const {profile} = useSelector(state => state.profile);

  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: Warna.grayscale.lima,
          paddingBottom: 50,
        }}>
        <GambarCustom
          resizeMode="cover"
          source={{
            uri:
              profile.image === ''
                ? `${apiUrl}/asset/images/noImage.png`
                : `${apiUrl}/${profile.image}`,
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: Warna.grayscale.empat,
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 5,
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <TextJudul title={profile.nama} />
            <TextBody style={{marginTop: -5}} title={profile.noHp} />
          </View>
          {/* <TouchableOpacity
          onPress={() => navigation.navigate('ProfileEdit')}
          style={{
            width: 18,
            height: 18,
          }}>
          <Icon name="pencil" size={18} color={Warna.grayscale.dua} />
        </TouchableOpacity> */}
        </View>
        <Pembatas />
        <View style={{paddingHorizontal: 20}}>
          <TextJudul style={{marginVertical: 10}} title="Pengaturan" />
          <ListMenu />
        </View>
        <Pembatas />
        <View style={{paddingHorizontal: 20}}>
          <TextJudul style={{marginVertical: 10}} title="Tentang" />
          <ListMenuTentang />
        </View>

        {/* disini modal */}
      </ScrollView>
      <BottomNavBar profilActive />
    </View>
  );
};

export default withNavigation(Profil);
