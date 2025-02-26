// components/MyLottieAnimation.js
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const MyLottieAnimation = () => {
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        import('../../public/community-bg.json').then((data: any) => {
            setAnimationData(data);
        });
    }, []);

    if (!animationData) return null;

    return (
        <div>
            <Lottie className='md:w-[600px] w-[400px]' animationData={animationData} loop={true} autoplay={true} />
        </div>
    );
};

export default MyLottieAnimation;
