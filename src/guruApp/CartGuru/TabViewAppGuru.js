import * as React from 'react';
import {
  View,
  useWindowDimensions,
  Text,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Warna} from '../../utils/Data';
// import Finish from './Selesai';
// import Batal from './Ditolak';
// import Pending from './PesananBaru';
import {useSelector} from 'react-redux';

// import Semua from './SemuaGuru';
// import Berlangsung from './BerlangsungGuru';
import SemuaGuru from './SemuaGuru';
import BerlangsungGuru from './BerlangsungGuru';
import PesananBaru from './PesananBaru';
import Selesai from './Selesai';
import Ditolak from './Ditolak';

export default function TabViewApp() {
  const {profile} = useSelector(state => state.profile);
  React.useEffect(() => {}, [profile]);
  const renderScene = SceneMap({
    // second: SemuaGuru,
    first: BerlangsungGuru,
    third: PesananBaru,
    fourth: Selesai,
    fifth: Ditolak,
  });
  const layout = useWindowDimensions();

  const pesananBerlangsung = profile.pesanan.filter(
    data =>
      data.statusDiterima === 'diterima' &&
      data.statusPembayaran === 'lunas' &&
      data.statusPesanan === 'sedang berlangsung',
  );

  const pesananPending = profile.pesanan.filter(
    data =>
      data.statusDiterima === 'pending' &&
      data.statusPesanan === 'menunggu pembayaran',
  );

  const pesananSelesai = profile.pesanan.filter(
    data => data.statusPesanan === 'selesai',
  );

  const pesananBatal = profile.pesanan.filter(
    data => data.statusDiterima === 'batal',
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    // {key: 'second', title: 'Semua', badge: profile.pesanan.length},
    {key: 'first', title: 'Berlangsung', badge: pesananBerlangsung.length},
    {key: 'third', title: 'Pesanan Baru', badge: pesananPending.length},
    {key: 'fourth', title: 'Selesai', badge: pesananSelesai.length},
    {key: 'fifth', title: 'Ditolak', badge: pesananBatal.length},
  ]);

  const _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            flexDirection: 'row',

            // paddingTop: Constants.statusBarHeight,
          }}>
          {/* <ScrollView style={{paddingVertical: 10}}> */}
          {props.navigationState.routes.map((route, i) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map(inputIndex =>
                inputIndex === i ? 1 : 0.5,
              ),
            });

            return (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  padding: 10,
                  marginHorizontal: 5,
                  // alignItems: 'center',
                  backgroundColor:
                    index === i ? Warna.primary.satu : Warna.primary.lima,
                  borderRadius: 20,
                  // height: 50,
                }}
                onPress={() => setIndex(i)}>
                <View style={{flexDirection: 'row'}}>
                  <Animated.Text
                    style={{
                      color:
                        index === i ? Warna.grayscale.lima : Warna.primary.satu,
                    }}>
                    {route.title}
                  </Animated.Text>
                  {route.badge === 0 ? null : (
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: Warna.merah,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // position: 'absolute',
                        // top: -5,
                        // right: 5,
                        marginLeft: 5,
                      }}>
                      <Text
                        style={{
                          color: Warna.grayscale.lima,
                          fontSize: 10,
                          fontFamily: 'Nunito-Regular',
                        }}>
                        {route.badge}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
          {/* </ScrollView> */}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <TabView
        renderTabBar={_renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
}
