import React, {useState, useEffect} from 'react';

const UseFormRating = () => {
  const [form, setForm] = useState({
    user: '',
    komentar: '',
    newKomentar: '',
    jumlahRating: '',
    guru: '',
    alamat: '',
    image: '',
  });

  const handleChange = (value, input) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  return {form, setForm, handleChange};
};

export default UseFormRating;
