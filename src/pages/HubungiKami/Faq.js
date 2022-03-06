import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import GambarLogo from '../../components/atoms/GambarLogo';
import TopLabel from '../../components/atoms/TopLabel';
import TopBar from '../../components/molecules/TopBar';
import {Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/AntDesign';
import TopBarNew from '../../components/molecules/TopBarNew';
import GambarCustom from '../../components/atoms/GambarCustom';
import TextJudul from '../../components/atoms/TextJudul';
import TextBody from '../../components/atoms/TextBody';

const Faq = () => {
  const ListItemFaq = ({title, description}) => {
    const [open, setOpen] = React.useState(false);
    return (
      <View
        style={{
          // borderColor: Warna.biruMuda,
          // borderTopLeftRadius: 20,
          // borderBottomRightRadius: 20,
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: Warna.grayscale.empat,
          // margin: 10,
          // overflow: 'hidden',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <TextJudul title={title} />
          </View>
          <TouchableOpacity
            onPress={() => setOpen(!open)}
            style={{
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-start',
            }}>
            <Icon
              name={open ? 'up' : 'down'}
              size={18}
              color={Warna.grayscale.tiga}
            />
          </TouchableOpacity>
        </View>
        {open && (
          <View
            style={{
              padding: 10,
              margin: -10,
            }}>
            <TextBody title={description} />
            {/* <Text
              style={{
                color: Warna.hitam,
                fontSize: 14,
                fontFamily: 'Nunito-Regular',
              }}>
              {description}
            </Text> */}
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={{backgroundColor: Warna.grayscale.lima, flex: 1}}>
      <TopBarNew title="FAQ" />
      <ScrollView>
        <GambarCustom
          style={{height: 240, width: '100%'}}
          source={require('../../../src/assets/images/faq.png')}
        />
        <ListItemFaq
          title="Bagaimana cara pesannya ?"
          description="untuk cara mesannya gampang bunda, tinggal ikuti langkah nya maka semuanya dapat."
        />
        <ListItemFaq
          title="Apakah anak 3 tahun bisa belajar disini ?"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis aperiam dolore consequatur, reiciendis vel dolor vitae sapiente autem dolorem quos."
        />
        <ListItemFaq
          title="Apakah Guru Dijamin Aman ?"
          description="Lorem ipsum dolor sit."
        />
        <ListItemFaq
          title="Bagaimana Cara Mereview Guru ? ?"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate consectetur, hic debitis aut dolores minima facilis sed dignissimos fuga reprehenderit accusantium repellendus deserunt rerum eius similique quam, mollitia harum assumenda?, Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate consectetur, hic debitis aut dolores minima facilis sed dignissimos fuga reprehenderit accusantium repellendus deserunt rerum eius similique quam, mollitia harum assumenda?"
        />
      </ScrollView>
    </View>
  );
};

export default Faq;
