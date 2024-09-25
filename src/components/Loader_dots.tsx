import React from 'react'
interface Props{
    text?: string;
}

const Loader_dots =  (props: Props) => {
    const {text} = props;
  return (
    <span className='loading-dots'>{text}<span className='dot'>.</span><span className='dot'>.</span><span className='dot'>.</span></span>
  )
};

export default Loader_dots