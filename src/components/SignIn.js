import React, { useState } from 'react';
import { 
  Box, Container, TextField, Button, Typography, Paper, 
  IconButton, CircularProgress, InputAdornment, Alert 
} from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
});

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(false);  // Add this line

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setAuthError(null);
    setAuthSuccess(false);
    try {
      // Here you would typically send the credential to your backend
      console.log('Google Sign-In successful:', credentialResponse);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAuthSuccess(true); // Add this line
    } catch (error) {
      setAuthError('Failed to authenticate with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setAuthError('Google Sign-In failed. Please try again.');
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(values);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            {authError && (
              <Alert severity="error" sx={{ mt: 2 }} data-testid="auth-error">
                {authError}
              </Alert>
            )}
            {authSuccess && (
              <Alert severity="success" sx={{ mt: 2 }} data-testid="auth-success">
                Logged in successfully!
              </Alert>
            )}
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                data-testid="email-input"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                data-testid="password-input"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        data-testid="password-visibility-toggle"
                      >
                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
                data-testid="signin-submit"
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign In'
                )}
              </Button>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                render={({ onClick }) => (
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FcGoogle />}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent form submission
                      onClick();
                    }}
                    disabled={isLoading}
                    data-testid="google-signin"
                    sx={{ mb: 2 }}
                  >
                    Sign in with Google
                  </Button>
                )}
              />
            </Box>
          </Paper>
        </Box>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default SignIn;