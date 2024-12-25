import { useState } from 'react';

interface ResetPwdData {
    email: string;
}

interface UseResetPwdReturn {
    performResetPwd: (data: ResetPwdData) => Promise<{ success: boolean; message: string }>;
    isResettingPwd: boolean;
}

const useSignup = (): UseResetPwdReturn => {
    const [isResettingPwd, setResettingPwd] = useState(false);

    const performResetPwd = async (data: ResetPwdData) => {
        setResettingPwd(true);
        try {
            const res = await fetch(
                `${process.env.SERVER_URL}/api/v1/auth/forgotPassword`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            const dataRes = await res.json();
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
            setResettingPwd(false);
        }
    }

    return { performResetPwd, isResettingPwd };
};

export default useSignup;
