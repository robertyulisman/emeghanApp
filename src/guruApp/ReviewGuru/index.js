import React from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
// import TopLabel from '../../components/atoms/TopLabel';
import FormUlasan from '../../components/molecules/FormUlasan';
import TopBar from '../../components/molecules/TopBar';
import {apiUrl, Warna} from '../../utils/Data';

import {useSelector} from 'react-redux';
import axios from 'axios';
import TopLabel from '../../components/atoms/TopLabel';
import TopBarNew from '../../components/molecules/TopBarNew';

const ReviewGuru = () => {
  const {profile} = useSelector(state => state.profile);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${apiUrl}/api/rating/guru/${profile._id}`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log('err', err));
  }, []);

  console.log('data', data);

  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      <TopBarNew title="Ulasan" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {data.length !== 0 &&
          data.map(item => {
            return (
              <FormUlasan guru key={item._id} item={item} editable={false} />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default ReviewGuru;
