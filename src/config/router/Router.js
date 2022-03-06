import Register from '../../pages/Register';
import Dashboard from '../../pages/Dashboard';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import Register2 from '../../pages/Register2';
import Progress from '../../pages/Progress';

import Notification from '../../pages/Notification';
import Drawer from '../../pages/Drawer';
import Chat from '../../pages/Chat';
import Ulasan from '../../pages/Ulasan';
import Laporan from '../../pages/Laporan';
import Tentang from '../../pages/Tentang';
import Privacy from '../../pages/Privacy';
import HubungiKami from '../../pages/HubungiKami';
import DetailChat from '../../pages/Chat/DetailChat';
import Faq from '../../pages/HubungiKami/Faq';
import Profil from '../../pages/Profil';
import IntroPage from '../../pages/IntroPage';
import DaftarMenu from '../../pages/DaftarMenu';
import AuthPage from '../../pages/AuthPage';
import Login from '../../pages/Login';
import ReviewPesanan from '../../pages/ReviewPesanan';

import Perpanjang from '../../pages/Perpanjang';
import DetailPesananPerpanjang from '../../pages/Perpanjang/DetailPesananPerpanjang';
import RincianPerpanjang from '../../pages/Perpanjang/RincianPerpanjang';
import DetailDaftarGuru from '../../pages/Progress/DetailDaftarGuru';
import ProoMengaji from '../../pages/ProoMengaji';
import ProfileEdit from '../../pages/ProfileEdit';
import ProfileAlamat from '../../pages/ProfileAlamat';
import LaporanDetail from '../../pages/LaporanDetail';
import AllMenu from '../../pages/Dashboard/AllMenu';
import Transaksi from '../../pages/Transaksi';
import WaDirect from '../../pages/WaDirect';
import CekOngkir from '../../pages/CekOngkir';
import ListOngkir from '../../pages/CekOngkir/ListOngkir';
import DetailOngkir from '../../pages/CekOngkir/DetailOngkir';
import Pulsa from '../../pages/Pembelian/Pulsa';
import DetailPage from '../../pages/DetailPage';
import PaketData from '../../pages/Pembelian/PaketData';
import PaketNelpon from '../../pages/Pembelian/PaketNelpon';
import Pembayaran from '../../pages/Pembayaran';

// futsal
import Futsal from '../../pages/Futsal';
import DetailLapangan from '../../pages/Futsal/DetailLapangan';
import OrderFutsal from '../../pages/Futsal/OrderFutsal';

// hotel
import Hotel from '../../pages/Hotel';
import DetailHotel from '../../pages/Hotel/DetailHotel';
import OrderHotel from '../../pages/Hotel/OrderHotel';
import TambahSaldo from '../../pages/Pembayaran/TambahSaldo';
import FormUpdateProfile from '../../pages/Dashboard/FormUpdateProfile';
import Toko from '../../pages/Toko';
import ProductPage from '../../pages/Toko/ProductPage';
import CategorySection from '../../pages/Toko/CategorySection';
import DetailProduct from '../../pages/Toko/DetailProduct';
import Keranjang from '../../pages/Keranjang';
import EMoney from '../../pages/Pembelian/EMoney';
import EMoneyInput from '../../pages/Pembelian/EMoneyInput';
import Pln from '../../pages/Pembelian/Pln';

const AuthStack = createStackNavigator(
  {DaftarMenu, Register, Register2, Login},
  {
    headerMode: 'none',
    initialRouteName: 'DaftarMenu',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
);

const HomeStack = createStackNavigator(
  {
    Dashboard,
    Progress,
    DetailDaftarGuru,
    FormUpdateProfile,
    Drawer,
    AllMenu,
    WaDirect,
    CekOngkir,
    ListOngkir,
    DetailOngkir,
    Pulsa,
    PaketData,
    PaketNelpon,
    EMoney,
    EMoneyInput,
    Pln,
    DetailPage,

    Perpanjang,
    DetailPesananPerpanjang,
    RincianPerpanjang,
    Notification,

    // futsal
    Futsal,
    DetailLapangan,
    OrderFutsal,

    // hotel
    Hotel,
    DetailHotel,
    OrderHotel,

    Pembayaran,
    TambahSaldo,

    Toko,
    ProductPage,
    CategorySection,
    DetailProduct,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Dashboard',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
);

const PembelajaranStack = createStackNavigator(
  {
    Transaksi,
    ReviewPesanan,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Transaksi',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
);
const KeranjangStack = createStackNavigator(
  {
    Keranjang,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Keranjang',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
);

const profileStack = createStackNavigator(
  {
    Profil,
    ProfileEdit,
    ProfileAlamat,
    Chat,
    DetailChat,
    Ulasan,
    Laporan,
    LaporanDetail,
    Tentang,
    Privacy,
    HubungiKami,
    Faq,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Profil',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
);

const Router = createSwitchNavigator(
  {
    IntroPage,
    AuthPage,

    AuthStack,
    HomeStack,
    KeranjangStack,
    PembelajaranStack,
    profileStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'AuthPage',
  },
);

export default createAppContainer(Router);
