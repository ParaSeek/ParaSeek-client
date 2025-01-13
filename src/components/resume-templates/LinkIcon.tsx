import { Link } from 'lucide-react'
import React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6'

const LinkIcon = ({ title }: { title: string }) => {

    if (title.toLowerCase().includes("git"))
        return (
            <FaGithub className='w-5 h-5' />
        )
    if (title.toLowerCase().includes("linked"))
        return (
            <FaLinkedin className='w-5 h-5' />
        )
    if (title.toLowerCase().includes("insta"))
        return (
            <FaInstagram className='w-5 h-5' />
        )
    if (title.toLowerCase().includes("face"))
        return (
            <FaFacebook className='w-5 h-5' />
        )
    if (title.toLowerCase().includes("twitter") || title.toLowerCase() == "x")
        return (
            <FaXTwitter className='w-5 h-5' />
        )
    return (
        <Link className='w-5 h-5' />
    )
}

export default LinkIcon