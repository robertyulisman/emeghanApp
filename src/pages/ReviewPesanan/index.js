import React from 'react';
import {View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import DetailPesanan from '../../components/Template/DetailPesanan';
import Tombol from '../../components/atoms/Tombol';
import TopBarNew from '../../components/molecules/TopBarNew';

import axios from 'axios';
import ModalCustom from '../../components/atoms/ModalCustom';
import LoadingComp from '../../components/atoms/LoadingComp';
import FormUlasanRating from './FormUlasanRating';
import UseFormRating from './UseFormRating';
import {ToastDefault} from '../../utils/Fungsi';
import {apiUrl, Warna} from '../../utils/Data';
import TopBar from '../../components/molecules/TopBar';
// import {form} from './useFormRating';

const ReviewPesanan = ({navigation}) => {
  const {data} = navigation.state.params;
  // const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // const [review, setReview] = React.useState({
  //   user: '',
  //   komentar: '',
  //   jumlahRating: '',
  //   guru: '',
  // });

  // const {form, setForm, handleChange} = UseFormRating();
  // console.log(`form.user`, form.user);
  // const handleModal = () => {
  //   setShowModal(!showModal);
  // };
  // const handleRating = () => {
  //   setLoading(true);
  //   axios
  //     .get(`${apiUrl}/api/rating/${data.user._id}`)
  //     .then(res => {
  //       // console.log(`data`, res.data);
  //       // setData(res.data);
  //       const filterData = res.data.filter(
  //         item => item.guru._id === data.dataGuru._id,
  //       );
  //       console.log(`filterData`, filterData);
  //       console.log(`ini dataa===============>>>`, data.dataGuru.nama);
  //       if (filterData.length > 0) {
  //         setForm({
  //           ...form,
  //           user: filterData[0].user,
  //           alamat:
  //             filterData[0].guru.kelurahan + ' ' + filterData[0].guru.kecamatan,
  //           komentar: filterData[0].komentar,
  //           jumlahRating: filterData[0].jumlahRating,
  //           guru: filterData[0].guru,
  //           image: filterData[0].guru.image,
  //         });
  //         // useFormRating.setForm
  //         setLoading(false);
  //         setShowModal(true);
  //       } else {
  //         setForm({
  //           ...form,
  //           user: res.data[0].user,
  //           alamat: data.dataGuru.kelurahan + ' ' + data.dataGuru.kecamatan,
  //           komentar: '',
  //           jumlahRating: 0,
  //           guru: data.dataGuru,
  //           image: data.dataGuru.image,
  //         });
  //         setLoading(false);
  //         setShowModal(true);
  //       }
  //     })
  //     .catch(err => console.log('err', err));
  // };

  // const submitRating = () => {
  //   if (form.komentar !== '') {
  //     console.log('komentar tidak kosong', form);
  //     setForm({...form, komentar: ''});
  //   } else {
  //     setLoading(true);
  //     console.log('komentar kosong', form);
  //     const newForm = {
  //       user: form.user,
  //       komentar: form.newKomentar,
  //       jumlahRating: form.jumlahRating,
  //     };
  //     axios
  //       .post(`${apiUrl}/api/rating/${form.user}/${form.guru?._id}`, newForm)
  //       .then(res => {
  //         console.log(`res sukses post rating`, res.data);
  //         setForm({
  //           ...form,
  //           komentar: res.data.komentar,
  //           jumlahRating: res.data.jumlahRating,
  //         });
  //         setTimeout(() => {
  //           setShowModal(false);
  //         }, 3000);

  //         ToastDefault('terima kasih, rating berhasil dikirim');
  //         setLoading(false);
  //       })
  //       .catch(err => console.log(`err post rating`, err));
  //   }
  // };

  const handleChatGuru = () => {
    setLoading(true);
    const conversationData = {
      senderId: data.user._id,
      receiverId: data.dataGuru._id,
    };
    axios
      .get(`${apiUrl}/api/conversation/${conversationData.receiverId}`)
      .then(res => {
        const conversationExist = res.data.find(
          user =>
            user.members.includes(data.user._id) &&
            user.members.includes(data.dataGuru._id),
        );

        console.log('ini user', conversationExist);

        if (conversationExist) {
          setLoading(false);
          navigation.navigate('DetailChat', {
            userId: data.user._id,
            user: data.dataGuru,
            data: conversationExist,
            nama: data.dataGuru.nama,
          });
        } else {
          axios
            .post(`${apiUrl}/api/conversation`, conversationData)
            .then(res => {
              setLoading(false);
              navigation.navigate('DetailChat', {
                userId: data.user._id,
                nama: data.dataGuru.nama,
                data: res.data,
                user: data.dataGuru,
              });
            })
            .catch(err => console.log(`error tambah conversation`, err));
        }
      })

      .catch(err => console.log(`err get data conversation`, err));
  };

  return (
    <View
      style={{
        backgroundColor: Warna.grayscale.lima,
        flex: 1,
      }}>
      <TopBarNew title="Rincian Pembelajaran" />

      <DetailPesanan
        chatGuru={data.statusPesanan === 'sedang berlangsung' ? true : false}
        onPressChatGuru={handleChatGuru}
        data={data}
      />
      {data.statusDiterima === 'diterima' &&
        data.statusPesanan == 'menunggu pembayaran' && (
          <Tombol style={{margin: 10}} primary title="Bayar Sekarang" />
        )}
    </View>
  );
};

export default withNavigation(ReviewPesanan);
