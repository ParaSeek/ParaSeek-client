import { useState } from 'react';

interface SignupData {
    username: string;
    role: string;
    email: string;
    password: string;
}

interface UseSignupReturn {
    performSignup: (data: SignupData) => Promise<{ success: boolean; message: string }>;
    isSigningUp: boolean;
}

const useSignup = (): UseSignupReturn => {
    const [isSigningUp, setSigningUp] = useState(false);

    const performSignup = async (data: SignupData) => {
        setSigningUp(true);
        try {
            const res = await fetch(`${process.env.SERVER_URL}/api/v1/auth/register`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
            const dataRes = await res.json();
            console.log(dataRes);
            if (dataRes.success) {
                return ({ success: true, message: dataRes.message });
            } else {
                return ({ success: false, message: dataRes.message });
            }
          } catch (error: any) {
            return ({
                success: false,
                message: error.message,
                description: 'Internal Server Error',
            });
          } finally {
            setSigningUp(false);
          }
    };

    return { performSignup, isSigningUp };
};

export default useSignup;
