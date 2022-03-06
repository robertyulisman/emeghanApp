import moment from 'moment';
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';
import {withNavigation} from 'react-navigation';
import GambarCustom from '../../components/atoms/GambarCustom';
import RatingDefault from '../../components/atoms/RatingDefault';
import TextBody from '../../components/atoms/TextBody';
import TextJudul from '../../components/atoms/TextJudul';
import TopLabel from '../../components/atoms/TopLabel';
import EmptyOrder from '../../components/molecules/EmptyOrder';
import FormUlasan from '../../components/molecules/FormUlasan';
import TopBar from '../../components/molecules/TopBar';
import TopBarNew from '../../components/molecules/TopBarNew';
import TextForm from '../../guruApp/LaporanBelajar/TextForm';
import {apiUrl, Warna} from '../../utils/Data';

const DetailDaftarGuru = ({navigation}) => {
  const {data} = navigation.state.params;
  console.log(`data.rating`, data.Review);
  const hasilRating =
    data.Review.length !== 0 &&
    data.Review.reduce((item, cur) => ({
      jumlahRating: item.jumlahRating + cur.jumlahRating,
    }));
  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.lima}}>
      {/* <TopBar title="Detail Guru" left /> */}
      <TopBarNew title="Detail Guru" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          // marginHorizontal: 10,

          backgroundColor: Warna.putih,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <GambarCustom
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: Warna.abuAbuMuda,
              marginTop: 10,
              zIndex: 2,
            }}
            source={{
              uri:
                data.image === ''
                  ? `${apiUrl}/asset/images/noImage.png`
                  : `${apiUrl}/${data?.image}`,
            }}
            resizeMode="cover"
          />
          {/* {isNaN(hasilRating?.jumlahRating / data.Review.length) ? null : (
            <TextBody
              title={`Rating : ${
                hasilRating?.jumlahRating / data.Review.length
              }`}
            />
          )} */}
          <TextJudul title={data.nama} />

          <RatingDefault
            style={{marginTop: 10}}
            rating={
              isNaN(hasilRating?.jumlahRating / data.Review.length)
                ? false
                : hasilRating?.jumlahRating / data.Review.length
            }
            review={data.Review.length}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <GambarCustom
              resizeMode="cover"
              source={require('../../assets/figma/user.png')}
              style={{
                height: 18,
                width: 18,
                borderRadius: 24,
              }}
            />
            <TextBody
              style={{color: Warna.grayscale.dua, marginLeft: 5}}
              title={`Umur ${data.umur} tahun`}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <GambarCustom
              resizeMode="cover"
              source={require('../../assets/figma/alamat_icon.png')}
              style={{
                height: 18,
                width: 18,
                borderRadius: 24,
              }}
            />
            <TextBody
              style={{color: Warna.grayscale.dua, marginLeft: 5}}
              title={`${data.kelurahan} - ${data.kecamatan}`}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <GambarCustom
              resizeMode="cover"
              source={require('../../assets/figma/pendidikan_icon.png')}
              style={{
                height: 18,
                width: 18,
                borderRadius: 24,
              }}
            />
            <TextBody
              style={{color: Warna.grayscale.dua, marginLeft: 5}}
              title={`${data.profile}`}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <GambarCustom
              resizeMode="cover"
              source={require('../../assets/figma/hafalan_icon.png')}
              style={{
                height: 18,
                width: 18,
                borderRadius: 24,
              }}
            />
            <TextBody
              style={{color: Warna.grayscale.dua, marginLeft: 5}}
              title={`Hafalan ${data.hafalan} Juz`}
            />
          </View>

          {/* <TextForm
            style={styles.formInput}
            editable={true}
            valueInput={data.nama}
            keyTitle="Nama"
          />
          <TextForm
            style={styles.formInput}
            editable={true}
            valueInput={`${data.umur} Thn`}
            keyTitle="Umur"
          />
          <TextForm
            style={styles.formInput}
            editable={true}
            valueInput={`${data.kelurahan} - ${data.kecamatan}`}
            keyTitle="Alamat"
          />
          <TextForm
            style={styles.formInput}
            editable={true}
            valueInput={data.profile}
            keyTitle="Profile"
          />
          <TextForm
            style={styles.formInput}
            editable={true}
            valueInput={`${data.hafalan} Juz`}
            keyTitle="Hafalan"
          /> */}
        </View>
        {data.Review.length > 0 ? (
          data.Review.map(item => {
            return (
              <FormUlasan editable={false} item={item} />
              // <View
              //   key={item._id}
              //   style={{
              //     backgroundColor: Warna.abuAbuMuda,
              //     borderRadius: 20,
              //     overflow: 'hidden',
              //     marginVertical: 10,
              //   }}>
              //   <TopLabel title="Review" />
              //   <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              //     {/* image */}
              //     <View
              //       style={{
              //         alignItems: 'center',
              //       }}>
              //       <GambarCustom
              //         style={{
              //           width: 50,
              //           height: 50,
              //           borderRadius: 25,
              //           backgroundColor: Warna.abuAbuMuda,
              //           marginTop: 10,
              //           zIndex: 2,
              //         }}
              //         source={{
              //           uri:
              //             data.image === ''
              //               ? `${apiUrl}/asset/images/noImage.jpg`
              //               : `${apiUrl}/${item.user?.image}`,
              //         }}
              //         resizeMode="cover"
              //       />
              //     </View>
              //     {/* nama dll */}
              //     <View>
              //       <View
              //         style={{
              //           marginHorizontal: 10,
              //           marginTop: 10,
              //           alignItems: 'baseline',
              //           flexDirection: 'row',
              //           // alignSelf: 'center',
              //         }}>
              //         <Text
              //           style={{
              //             fontSize: 16,
              //             marginLeft: 5,
              //             color: Warna.hitam,
              //           }}>
              //           {item.user?.nama}
              //         </Text>
              //         <Text
              //           style={{
              //             fontSize: 14,
              //             marginLeft: 5,
              //             color: Warna.hitam,
              //           }}>
              //           - {item.user?.kelurahan}
              //         </Text>
              //       </View>
              //       <View
              //         style={{
              //           marginHorizontal: 10,
              //           // marginTop: 10,
              //           alignItems: 'baseline',
              //           flexDirection: 'row',
              //           // alignSelf: 'center',
              //         }}>
              //         <StarRating
              //           disabled={false}
              //           maxStars={5}
              //           rating={item.jumlahRating}
              //           fullStarColor={'orange'}
              //           starSize={20}
              //         />
              //         <Text
              //           style={{
              //             fontSize: 12,
              //             marginLeft: 5,
              //             color: Warna.abuAbuSedang,
              //           }}>
              //           {moment(item?.createdAt).startOf('hour').fromNow()}
              //         </Text>
              //       </View>
              //     </View>
              //   </View>

              //   <View
              //     style={{
              //       margin: 10,
              //       backgroundColor: Warna.putih,
              //       padding: 10,
              //     }}>
              //     <Text
              //       style={{
              //         fontSize: 14,
              //         marginLeft: 5,
              //         color: Warna.abuAbuSedang,
              //       }}>
              //       {item.komentar}
              //     </Text>
              //   </View>
              // </View>
            );
          })
        ) : (
          <EmptyOrder title="Belum ada Review" />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  formInput: {
    borderBottomWidth: 1,
    borderBottomColor: Warna.abuAbuMuda,
    marginBottom: -5,
  },
});

export default withNavigation(DetailDaftarGuru);
