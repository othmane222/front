import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Import axios for making HTTP requests
import '../Resetpassword/Resetpassword.css'

const ResetPassword = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Success or error

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const initialValues = {
    email: '',
  };

  const onSubmit = (values, { resetForm }) => {
    // Make a POST request to the backend API
    axios.post('http://localhost:8081/api/auth/forgot-password', null, {
      params: { email: values.email }
    })
    .then(response => {
      setSnackbarMessage(response.data);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      resetForm();
    })
    .catch(error => {
      setSnackbarMessage(error.response?.data || 'An error occurred');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="reset-container">
      <div className="reset-header">
        <div className="reset-text">Reset Password</div>
        <div className="reset-underline"></div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="reset-inputs">
            <div className="reset-input">
              <Field
                as="input"
                name="email"
                placeholder="Enter your email"
                className={`reset-form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
              />
              {touched.email && errors.email && (
                <div className="reset-invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="reset-submit-container">
              <button type="submit" className="reset-submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ResetPassword;
