import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthContext } from '@/context/useAuthContext';
import { useNotificationContext } from '@/context/useNotificationContext';
import httpClient from '@/helpers/httpClient';
import api from '../../../../../api/route';
import { Login, Register } from '../../../../../api/ApiService';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../../../../constants';
const baseURL = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_URL
const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    saveSession
  } = useAuthContext();
  const [searchParams] = useSearchParams();
  const {
    showNotification
  } = useNotificationContext();
  const loginFormSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup.string().required('Please enter your password')
  });
  const {
    control,
    handleSubmit
  } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: 'user@demo.com',
      password: '123456'
    }
  });
  const redirectUser = () => {
    const redirectLink = searchParams.get('redirectTo');
    if (redirectLink) navigate(redirectLink);else navigate('/');
  };
  const login = handleSubmit(async values => {
    setLoading(true);
    try {
      const res = await Login(values.email, values.password);
      console.log('response',res)
          localStorage.setItem(ACCESS_TOKEN, res.access);
          localStorage.setItem(REFRESH_TOKEN, res.refresh);
          console.log("navigate to home")
          if (res.access) {
                saveSession({
                  ...(res ?? {}),
                  token: res.access
                });
                redirectUser();
                showNotification({
                  message: 'Successfully logged in. Redirecting....',
                  variant: 'success'
                });
              }
  } catch (error) {
      console.log(error)
  } finally {
      setLoading(false)
  }
    // try {
      
    //   const res = await httpClient.post('/login', values);
    //   if (res.data.token) {
    //     saveSession({
    //       ...(res.data ?? {}),
    //       token: res.data.token
    //     });
    //     redirectUser();
    //     showNotification({
    //       message: 'Successfully logged in. Redirecting....',
    //       variant: 'success'
    //     });
    //   }
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // } catch (e) {
    //   if (e.response?.data?.error) {
    //     showNotification({
    //       message: e.response?.data?.error,
    //       variant: 'danger'
    //     });
    //   }
    // } finally {
    //   setLoading(false);
    // }
    setLoading(false);
  });
  const SignUp = handleSubmit(async values => {
    setLoading(true);
    try {
      await Register(values.email, values.password);
      const res = await Login(values.email, values.password);
          localStorage.setItem(ACCESS_TOKEN, res.access);
          localStorage.setItem(REFRESH_TOKEN, res.refresh);
          console.log("navigate to home")
          if (res.access) {
                saveSession({
                  ...(res ?? {}),
                  token: res.access
                });
                redirectUser();
                showNotification({
                  message: 'Successfully logged in. Redirecting....',
                  variant: 'success'
                });
              }
  } catch (error) {
      console.log(error)
  } finally {
      setLoading(false)
  }
    setLoading(false);
  });
  return {
    loading,
    login,
    SignUp,
    control
  };
};
export default useSignIn;