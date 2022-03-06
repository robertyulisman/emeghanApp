import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './config/redux/reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

// const initialState = {};
// const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   initialState,
//   applyMiddleware(...middleware),
// );

// export default store;

// import {createStore, applyMiddleware, compose} from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../config/redux/reducers';
// import AsyncStorage from '@react-native-community/async-storage';
// import {persistStore, persistReducer} from 'redux-persist';

const initialState = {};
const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(...middleware),
);

// export default store;
export const persistor = persistStore(store);
