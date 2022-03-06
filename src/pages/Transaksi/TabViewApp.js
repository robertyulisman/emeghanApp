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
import {useSelector} from 'react-redux';
import TransaksiPage from './TransaksiPage';
import IsiSaldoPage from './IsiSaldoPage';

export default function TabViewApp() {
  const {profile} = useSelector(state => state.profile);
  const renderScene = SceneMap({
    second: TransaksiPage,
    first: IsiSaldoPage,
  });
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'second', title: 'Transaksi'},
    {key: 'first', title: 'Isi Saldo'},
  ]);

  const _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={{flexDirection: 'row'}}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          console.log('iwwewew', route);

          return (
            <View style={{flex: 1, alignItems: 'center', marginTop: 10}}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginHorizontal: 5,
                  backgroundColor:
                    index === i ? Warna.primary.satu : Warna.primary.lima,
                  borderRadius: 10,
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
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
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
