import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';

import {ExpandingDot} from 'react-native-animated-pagination-dots';

import EmptyOrder from '../../components/molecules/EmptyOrder';
import HighlightSection from '../../components/molecules/HighlightSection';
import {useDispatch} from 'react-redux';
import {getProfileUser} from '../../config/redux/actions/profileActions';
import {Warna} from '../../utils/Data';
import Tombol from '../../components/atoms/Tombol';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');
const PesananItem = ({
  data,
  profile,
  deskripsiEmpty,
  finish,
  newOrder,
  terima,
  tolak,
  navigation,
  user,
}) => {
  const dispatch = useDispatch();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  // React.useEffect(() => {
  //   // setIsLoading(true);
  //   console.log(`userr`, profile);
  //   // const userType = 'guru';
  //   dispatch(getProfileUser(user._id, user.userType));
  // }, []);

  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10,
          flexDirection: 'row',
          backgroundColor: finish
            ? Warna.hijauTua
            : newOrder
            ? Warna.pink
            : Warna.orange,
        }}>
        <Icon
          name={finish ? 'check' : newOrder ? 'trending-up' : 'refresh-cw'}
          size={22}
          color={Warna.putih}
        />
        <Text style={{color: Warna.putih, marginLeft: 10}}>
          {finish
            ? 'Pesanan Selesai'
            : newOrder
            ? 'Pesanan Baru'
            : 'Pesanan on Going'}
        </Text>
      </View>
      {Object.keys(profile).length > 0 && data.length > 0 ? (
        <>
          <FlatList
            keyExtractor={item => item._id}
            data={data}
            renderItem={({item, index}) => (
              <HighlightSection
                TombolComp={
                  <View style={{flexDirection: newOrder ? 'row' : null}}>
                    <Tombol
                      onPress={() =>
                        navigation.navigate('ReviewPesananGuru', {data: item})
                      }
                      style={{marginVertical: 15}}
                      primary
                      title="Lihat Detail"
                    />
                    {newOrder && (
                      <>
                        <Tombol
                          onPress={() => tolak(item)}
                          style={{
                            marginVertical: 15,
                            borderColor: Warna.pink,
                            borderWidth: 2,
                            marginHorizontal: 10,
                          }}
                          title="TOLAK"
                        />
                        <Tombol
                          onPress={() => terima(item)}
                          style={{marginVertical: 15}}
                          primary
                          title="TERIMA"
                        />
                      </>
                    )}
                  </View>
                }
                item={item}
              />
            )}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            horizontal
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: false,
              },
            )}
            scrollEventThrottle={16}
            decelerationRate={'normal'}
          />
          <ExpandingDot
            data={data}
            expandingDotWidth={30}
            scrollX={scrollX}
            inActiveDotOpacity={0.6}
            dotStyle={{
              width: 7,
              height: 7,
              backgroundColor: Warna.biruTua,
              borderRadius: 5,
              marginHorizontal: 5,
            }}
            containerStyle={{
              marginVertical: 20,
              position: 'relative',
            }}
          />
        </>
      ) : (
        <View style={{margin: 10}}>
          <EmptyOrder title={deskripsiEmpty} />
        </View>
      )}
    </View>
  );
};

export default withNavigation(PesananItem);
