import { useState } from 'react';
import { validateForm } from './validateForm';

export default function useAddClientForm() {
 const [errors, setErrors] = useState({
  name: null,
  cedula: null,
  address: null,
  phone: null,
  email: null,
 });

 const [form, setForm] = useState({
  name: '',
  cedula: '',
  address: '',
  phone: '',
  email: '',
 });

 const handleChange = (name, value) => {
  setForm({ ...form, [name]: value });
  //validateForm(form, name);
  console.log('estoy aqui');
 };

 const handleSubmit = () => {
  setErrors(validateForm(form, undefined));

  if (
   errors.name === true &&
   errors.cedula === true &&
   errors.address === true &&
   errors.phone === true &&
   errors.email === true
  ) {
   console.log(form);
  } else {
   console.log(errors);
  }
  /*   const extraData = {
   id: 2004689420,
   date: '2022-03-05',
   time: '03:10 PM',
   amount: 7500,
   image: require('../../assets/images/aspiradora.png'),
  };
  //add extraData to values
  values = { ...values, ...extraData };
  console.log(values, 'addClientLog');
  dispatch(addSale(values));
  navigation.navigate('payMethod'); */
 };

 return {
  form,
  errors,
  handleChange,
  handleSubmit,
 };
}