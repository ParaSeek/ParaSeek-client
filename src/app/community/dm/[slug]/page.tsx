"use client";

import ChatInputBox from '@/components/community/ChatInputBox';
import RecievedBubble from '@/components/community/RecievedBubble';
import SentBubble from '@/components/community/SentBubble';
import { useToast } from '@/hooks/use-toast';
import { RootState } from '@/store/store';
import io, { Socket } from 'socket.io-client'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCommunityContext } from '@/contexts/CommunityContext';
import { Mic, MicOff, Phone, PhoneMissed, PhoneOff, Video, VideoOff } from 'lucide-react';
import { FaPhoneFlip } from 'react-icons/fa6';

const Page = ({ params }: { params: { slug: string } }) => {
    var username: string = "";
    const { slug } = params;
    username = slug.replace("%20", " ").toLowerCase();
    const { setHeaderTitle } = useCommunityContext();
    const { toast } = useToast();
    const [chatId, setChatId] = useState<string | null>(null);
    const [messages, setMessages] = useState<any>([])
    const [receiver, setReceiver] = useState<any>(null)
    const userData = useSelector((state: RootState) => state.user.data);
    const [socket, setSocket] = useState<Socket | null>(null)


    //for calling
    const [callUiOpen, setCallUiOpen] = useState(false);
    const [micOpen, setMicOpen] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const localVideoRef = useRef<HTMLVideoElement | null>(null);



    useEffect(() => {
        const s = io(process.env.SERVER_URL2);
        setSocket(s);

        return () => {
            s.disconnect();
            setSocket(null);
        };
    }, [])

    useEffect(() => {
        if (socket && chatId && userData) {
            socket.emit('join', { chatId, username: userData.username });
            socket.on('receiveMessage', () => {
                console.log("here");
                getMessages();
            });

        }

    }, [socket, chatId, userData]);


    const getMessages = async () => {
        try {
            const response = await fetch(`${process.env.SERVER_URL2}/api/v1/dm/getallmessages/${username}`, {
                method: 'GET',
                credentials: "include" as const,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const res = await response.json();
            if (res.success) {
                res.data.participantOne.username == username ? setReceiver(res.data.participantOne) : setReceiver(res.data.participantTwo);
                setChatId(res.data._id);
                setMessages(res.data.messages)
            } else {
                toast({ title: res.message, variant: "destructive" })
            }
        } catch {
            toast({ title: "Failed to get your Messages. Please refresh!", variant: "destructive" })
        }
    }

    const handleAudioCall = async () => {
        setCallUiOpen(true);
        setMicOpen(true);
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        // MediaStream
        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]
        setLocalAudioTrack(audioTrack);
        setlocalVideoTrack(videoTrack);
        if (!localVideoRef.current) {
            return;
        }
        localVideoRef.current.srcObject = new MediaStream([videoTrack])
        localVideoRef.current.play();
    }

    const handleVideoCall = () => {
        if (socket && chatId && userData) {
            socket.emit('makeVideoCall', { chatId, username: userData.username });
        }
    }

    useEffect(() => {
        if (receiver)
            setHeaderTitle(receiver.firstName)
    }, [receiver])

    useEffect(() => {
        getMessages();
    }, [])

    return (
        <div className='relative  h-screen pt-16'>
            <div className='flex items-center border px-2 rounded-md gap-2 py-1 w-fit fixed right-12 backdrop-blur-sm'>
                <Phone onClick={() => handleAudioCall()} role='button' strokeWidth={"1.25px"} className='h-5 w-5 hover:text-primary transition-all duration-300' />
                <div className='h-4 w-[1px] bg-gray-500' />
                <Video onClick={() => handleVideoCall()} role='button' strokeWidth={"1px"} className='h-6 w-6 hover:text-primary transition-all duration-300' />
            </div>
            <div className={`fixed overflow-hidden top-16 z-[25] right-0 flex flex-col md:w-[calc(100vw-314px)] rounded-b-3xl shadow-black/50 shadow-[0px_0px_50px]  dark:bg-card bg-background transition-all duration-300  ${callUiOpen ? "md:h-[400px]" : "h-0"}`}>
                <div className=' flex'>
                    <div className=' p-4 w-1/2'>
                        <div className='rounded-lg overflow-hidden h-full bg-indigo-500'>
                            <video className='w-full h-full' autoPlay ref={remoteVideoRef} />
                        </div>
                    </div>
                    <div className=' p-4 w-1/2'>
                        <div className='rounded-lg overflow-hidden h-full bg-indigo-500'>
                            <video className='w-full h-full' autoPlay ref={localVideoRef} />
                        </div>
                    </div>

                </div>
                <div className=' flex items-center justify-center gap-3 md:h-[60px]'>
                    {
                        micOpen ?
                            <div onClick={() => setMicOpen(false)} className='bg-muted rounded-full p-3 cursor-pointer'>
                                <Mic className='h-6 w-6' />
                            </div>
                            :
                            <div onClick={() => setMicOpen(true)} className='bg-muted rounded-full p-3 cursor-pointer'>
                                <MicOff className='h-6 w-6' />
                            </div>
                    }
                    {
                        videoOpen ?
                            <div onClick={() => setVideoOpen(false)} className='bg-muted rounded-full p-3 cursor-pointer'>
                                <Video className='h-6 w-6' />
                            </div>
                            :
                            <div onClick={() => setVideoOpen(true)} className='bg-muted rounded-full p-3 cursor-pointer'>
                                <VideoOff className='h-6 w-6' />
                            </div>
                    }
                    <div onClick={() => setCallUiOpen(false)} className='bg-muted rounded-full p-3 bg-red-500 text-white cursor-pointer'>
                        <PhoneMissed className='h-6 w-6' />
                    </div>
                </div>
            </div>
            <div className='h-full w-full pt-4 pb-20 flex flex-col-reverse gap-3 overflow-y-auto'>

                {
                    messages.map((message: any, index: number) => {
                        return (
                            message.sender == userData._id ?
                                // sent 
                                <SentBubble key={index} message={message.message} time={new Date(message.updatedAt).toLocaleTimeString("en", { hour: "numeric", minute: "numeric", hour12: true })} />
                                :
                                // recieved
                                <RecievedBubble key={index} message={message.message} time={new Date(message.updatedAt).toLocaleTimeString("en", { hour: "numeric", minute: "numeric", hour12: true })} />
                        )
                    }
                    )
                }



                {chatId && <div className='w-full flex flex-col gap-3 items-center mb-8'>
                    <h3 className='text-xl text-center font-semibold'>This is the beginning of your chat with <br /><span className='custom-gradient text-transparent text-2xl'>{username}</span></h3>
                    <Avatar className="w-20 h-20 mx-auto">
                        <AvatarImage className="object-cover" src={receiver?.profilePic} />
                        <AvatarFallback className="text-3xl bg-primary font-semibold">{receiver?.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>}
            </div>
            <div className='absolute bottom-0 right-0 bg-card z-10 dark:bg-background pb-4 w-full'>
                {chatId && <ChatInputBox socket={socket} chatId={chatId} friendUsername={username} />}
            </div>
        </div>
    )
}

export default Page