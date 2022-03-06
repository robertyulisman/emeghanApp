import React from 'react';
import {ToastAndroid} from 'react-native';

export const ToastDefault = pesan => {
  ToastAndroid.show(pesan, ToastAndroid.SHORT);
};

export const hasilReview = item =>
  item.length !== 0 &&
  item.reduce((acc, curr) => acc.jumlahRating + curr.jumlahRating, 0);

export const formatNumber = num =>
  `Rp. ${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
