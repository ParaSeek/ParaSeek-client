
import { useTheme } from 'next-themes'
import React from 'react'

type Props = {
    height: number,
    width: number,
}

const GradientBg = (props: Props) => {
    const { theme } = useTheme();
    return (
        <div style={{
            background: `conic-gradient( ${theme === "dark" ? "#581c87 0deg,  #2A01FA 90deg, #4f1144 180deg, #C52B2B 270deg, #2c0e31 360deg" : "#fdba74 0deg, #fb923c 90deg, #ecfeff 180deg,#faf5ff 270deg, #a855f7 360deg"})` }} className={`h-[${props.height}px] w-[${props.width}px] blur-[120px] rounded-lg blue absolute purple- left-26 bottom-0`}>
        </div >
    )
}

export default GradientBg