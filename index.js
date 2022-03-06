/**
 * @format
 */
import {AppRegistry} from 'react-native';
import {Alert} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import {store, persistor} from './src/store';
import {Provider} from 'react-redux';

import React from 'react';
import SplashScreen from './src/pages/SplashScreen';
import GlobalFont from 'react-native-global-font';
import {PersistGate} from 'redux-persist/integration/react';
import codePush from 'react-native-code-push';

const MainScreen = () => {
  const [currentScreen, setCurrentScreen] = React.useState('Splash');
  React.useEffect(() => {
    // let fontName = 'Nunito-Regular.ttf';
    // GlobalFont.applyGlobal(fontName);
    // console.log(`fontName`, fontName);
    setTimeout(() => {
      setCurrentScreen('App');
    }, 5000);
  }, []);

  React.useEffect(() => {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  }, []);

  let mainScreen = currentScreen === 'Splash' ? <SplashScreen /> : <App />;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {mainScreen}
      </PersistGate>
    </Provider>
  );
};

// export default index;
// AppRegistry.registerComponent(appName, () => MainScreen);

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

let pushMainScreen = codePush(codePushOptions)(MainScreen);

export default pushMainScreen;

AppRegistry.registerComponent(appName, () => pushMainScreen);
