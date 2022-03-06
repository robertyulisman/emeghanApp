import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Linking} from 'react-native';
import {Warna} from '../../utils/Data';
import {ToastDefault} from '../../utils/Fungsi';
import {withNavigation} from 'react-navigation';
import GambarCustom from '../../components/atoms/GambarCustom';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import TopBarNew from '../../components/molecules/TopBarNew';
import Toast from 'react-native-toast-message';

const HubungiKami = ({navigation}) => {
  const ListItemChat = ({imageLeft, title, description, iconLeft}) => {
    const handleOnPress = item => {
      switch (item) {
        case 'Chat Customer Service':
          // ToastDefault('layanan ini belum Tersedia');
          Toast.show({
            type: 'info',
            text1: 'Chat Customer Service',
            text2: 'Maaf, untuk sementara, layanan ini belum tersedia',
          });

          break;
        case 'FAQ':
          navigation.navigate('Faq');
          break;
        case 'Whatsapp':
          ToastDefault('click' + ' ' + item);
          const mobile = '81275957714';
          const url = 'whatsapp://send?text=Hello Proo&phone=62' + mobile;

          Linking.openURL(url)
            .then(() => {})
            .catch(() => {
              // eslint-disable-next-line no-alert
              alert('Make sure Whatsapp installed on your device');
            });
          break;
      }
    };
    return (
      <TouchableOpacity
        onPress={() => handleOnPress(title)}
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: Warna.grayscale.empat,
          padding: 10,
          alignItems: 'center',
        }}>
        <GambarCustom style={{width: 22, height: 22}} source={iconLeft} />
        <View style={{flex: 1, marginHorizontal: 10}}>
          <TextJudul title={title} />
          <TextBody title={description} />
        </View>

        <GambarCustom
          style={{width: 22, height: 22}}
          source={require('../../assets/figma/arrowRight.png')}
        />
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={{backgroundColor: Warna.grayscale.lima, flex: 1}}>
      <TopBarNew title="Hubungi Kami" />

      <View
        style={{
          margin: 10,
        }}>
        <View style={{alignItems: 'center'}}>
          <GambarCustom
            style={{height: 300, width: '100%'}}
            source={require('../../../src/assets/images/hubungi_kami.png')}
          />
        </View>
        <View>
          <ListItemChat
            iconLeft={require('../../assets/figma/chat_cs_icon.png')}
            title="Chat Customer Service"
            description="Kasih tau kendala kamu dengan kami disini"
          />
          <ListItemChat
            iconLeft={require('../../assets/figma/faq_icon.png')}
            title="FAQ"
            description="Mungkin jawaban pertanyaan bunda ada disini"
          />
          <ListItemChat
            iconLeft={require('../../assets/figma/menuProfile/wa.png')}
            title="Whatsapp"
            description="opsi lain bunda juga bisa chat kami disini"
          />
        </View>
      </View>
    </ScrollView>
    // <View style={{backgroundColor: Warna.abuAbuMuda, flex: 1}}>
    //   <TopBar title="Hubungi Kami" left />
    //   <View
    //     style={{
    //       backgroundColor: Warna.putih,
    //       marginHorizontal: 10,
    //       marginTop: -60,
    //       borderTopLeftRadius: 20,
    //       borderTopRightRadius: 20,
    //       flex: 1,
    //     }}>
    //     <View style={{alignSelf: 'center'}}>
    //       <GambarLogo hitam kecil />
    //     </View>

    //     <View
    //       style={{
    //         borderColor: Warna.biruMuda,
    //         borderWidth: 1,
    //         borderTopLeftRadius: 20,
    //         borderBottomRightRadius: 20,
    //         margin: 10,
    //         overflow: 'hidden',
    //       }}>
    //       <TopLabel title="Hubungi" />
    //       <ListItemChat
    //         imageLeft="comment"
    //         title="Chat Customer Service"
    //         description="Kasih tau kendala kamu dengan kami disini"
    //       />
    //       <ListItemChat
    //         imageLeft="question"
    //         title="FAQ"
    //         description="Mungkin jawaban pertanyaan bunda ada disini"
    //       />
    //       <ListItemChat
    //         imageLeft="whatsapp"
    //         title="Whatsapp"
    //         description="opsi lain bunda juga bisa chat kami disini"
    //       />
    //     </View>
    //   </View>
    // </View>
  );
};

export default withNavigation(HubungiKami);
