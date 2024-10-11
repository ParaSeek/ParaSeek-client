import { useState } from 'react';

interface VerifyEmailData {
    activation_code: string;
}

interface UseVerifyEmailReturn {
    verifyEmail: (data: VerifyEmailData) => Promise<{ success: boolean; message: string }>;
    isVerifying: boolean;
}

const useVerifyEmail = (): UseVerifyEmailReturn => {
    const [isVerifying, setIsVerifying] = useState(false);

    const verifyEmail = async (data: VerifyEmailData) => {
        setIsVerifying(true);

        try {
            const res = await fetch(
                `${process.env.SERVER_URL}/api/v1/auth/activate-user`,
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
            console.log(dataRes);
            if (dataRes.success) {
                return ({ success: true, message: dataRes.message });
            } else {
                return ({ success: false, message: dataRes.message });
            }
        } catch (error: any) {
            return ({
                success: true,
                message: error.message,
                description: 'Internal Server Error',
            });
        } finally {
            setIsVerifying(false);
        }
    }

    return { verifyEmail, isVerifying };
};

export default useVerifyEmail;
