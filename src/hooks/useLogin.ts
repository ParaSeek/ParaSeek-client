import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../slices/userSlice';

interface LoginData {
  email: string;
  password: string;
}

interface UseLoginReturn {
  performLogin: (data: LoginData) => Promise<{success: boolean; message: string}>;
  isLoggingIn: boolean;
}

const useLogin = (): UseLoginReturn => {
  const [isLoggingIn, setLoggingIn] = useState(false);
  const dispatch = useDispatch();

  const performLogin = async (data: LoginData) => {
    setLoggingIn(true);
    try {
      const res = await fetch(`${process.env.SERVER_URL}/api/v1/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const dataRes = await res.json();
      if (dataRes.success) {
        dispatch(loginAction(dataRes.data));
        localStorage.setItem("accessToken", "loggedIn")
        return ({ success: true, message: dataRes.message });
      } else {
        return ({ success: false, message: dataRes.message });
      }
    } catch (error: any) {
      return({
        success: false,
        message: error.message,
        description: 'Internal Server Error',
      });
    } finally {
      setLoggingIn(false);
    }
  };

  return { performLogin, isLoggingIn };
};

export default useLogin;
