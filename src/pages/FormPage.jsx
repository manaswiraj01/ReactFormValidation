import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

const FormPage = ({ onSubmit }) => {
  return (
    <RegistrationForm onSubmit={onSubmit} />
  );
};

export default FormPage;