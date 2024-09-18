import React, { useState } from 'react';
import { Typography, Box, Container, TextField, Button, Snackbar, Alert } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ResetPassword = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const initialValues = {
    email: '',
  };

  const onSubmit = (values, { resetForm }) => {
    console.log('Reset password email:', values.email);
    setOpenSnackbar(true);
    resetForm();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h4" color="primary" fontWeight="700">
          Reset Password
        </Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              fullWidth
              margin="normal"
              variant="outlined"
              label="Email"
              name="email"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Password reset email sent!"
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Password reset email sent!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ResetPassword;
