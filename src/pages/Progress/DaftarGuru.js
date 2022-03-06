import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import LoadingComp from '../../components/atoms/LoadingComp';
import TopLabel from '../../components/atoms/TopLabel';
import GuruItem from '../../components/molecules/GuruItem';
import {getDataGuru} from '../../config/redux/actions/dataAction';
import {apiUrl, Warna} from '../../utils/Data';
import {withNavigation} from 'react-navigation';

const DaftarGuru = ({Guru, navigation}) => {
  const dispatch = useDispatch();
  const {dataGuru} = useSelector(state => state.data);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    // console.log('========component did mount=============');
    setIsLoading(true);
    dispatch(getDataGuru());
  }, []);

  useEffect(() => {
    // console.log('========component did update=============');
    if (dataGuru.length > 0) {
      const newData = [];
      dataGuru.map(item => {
        const itemBaru = {
          ...item,
          isSelected: false,
        };
        newData.push(itemBaru);

        setData(newData);
      });
      setIsLoading(false);
    }
  }, [dataGuru]);

  // console.log(`dataGuru`, dataGuru);

  const updateItem = item => {
    const newPackages = data.map(guru => {
      if (guru._id === item._id) {
        return {
          ...guru,
          isSelected: true,
        };
      } else {
        return {
          ...guru,
          isSelected: false,
        };
      }
    });
    setData(newPackages);
  };

  // const jumlahRating = item => {
  //   return item.reduce((a, b) => a + b, 0);
  // };

  return (
    <View>
      {isLoading === true && <LoadingComp top={100} />}
      {data.map(item => {
        // ES6
        // arr.reduce((a, b) => ({x: a.x + b.x}));
        const hasilRating =
          item.Review.length !== 0 &&
          item.Review.reduce((item, cur) => ({
            jumlahRating: item.jumlahRating + cur.jumlahRating,
          }));
        // console.log(`hasilRating`, hasilRating.jumlahRating);

        return (
          <GuruItem
            key={item._id}
            nama={item.nama}
            umur={item.umur}
            alamat={`${item.kelurahan} - ${item.kecamatan} `}
            profile={item.profile}
            hafal={`${item.hafalan} Juz`}
            onPress={() => {
              updateItem(item), Guru(item);
            }}
            onPressDetail={() =>
              navigation.navigate('DetailDaftarGuru', {data: item})
            }
            onSelect={item.isSelected === true ? true : false}
            ratingView={item.Review.length === 0 ? false : true}
            rating={
              item.Review.length === 0
                ? null
                : hasilRating?.jumlahRating / item.Review.length
            } //jumlah bintang
            review={item.Review.length === 0 ? 'Belum ada' : item.Review.length} //total review
            image={
              item.image === ''
                ? {
                    uri: `${apiUrl}/asset/images/noImage.png`,
                  }
                : {
                    uri: `${apiUrl}/${item.image}`,
                  }
            }
          />
        );
      })}
    </View>
  );
};

export default withNavigation(DaftarGuru);
