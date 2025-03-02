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
import { Mic, MicOff, Phone, Video, VideoOff } from 'lucide-react';
import Loader_dots from '@/components/Loader_dots';
import { Button } from '@/components/ui/button';

const stunServers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ]
}

const Page = ({ params }: { params: { slug: string } }) => {
    var username: string = "";
    const { slug } = params;
    username = slug.replace("%20", " ").toLowerCase();
    const { setHeaderTitle, audioCall, setAudioCall, videoCall, setVideoCall } = useCommunityContext();
    const { toast } = useToast();
    const [chatId, setChatId] = useState<string | null>(null);
    const [messages, setMessages] = useState<any>([])
    const [receiver, setReceiver] = useState<any>(null)
    const userData = useSelector((state: RootState) => state.user.data);
    const [socket, setSocket] = useState<Socket | null>(null)


    //for calling
    const [callUiOpen, setCallUiOpen] = useState(false);
    const [showIncomingCall, setShowIncomingCall] = useState(false);
    const [micOpen, setMicOpen] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const remoteStreamRef = useRef<MediaStream | null>(null);
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const callTypeRef = useRef<"audio" | "video">("audio")
    const offerRef = useRef<any>(null);
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
                getMessages();
            });
            socket.on('offer', async (callType, offer) => {
                callTypeRef.current = callType
                offerRef.current = offer;
                setShowIncomingCall(true);
            })
            socket.on('answer', (answer) => {
                handleOnAnswer(answer);
            })
            socket.on('add-ice-candidate', (type, candidate) => {
                console.log("type:", type, "candidate:", candidate)
                console.log(pcRef.current)
                if (pcRef.current) {
                    console.log('Adding ICE candidate:', candidate);
                    pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                }
            });
            socket.on('hangup', () => {
                pcRef.current?.close();
                setCallUiOpen(false);
                setAudioCall(false);
                setVideoCall(false);
            })


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
        await initCall();
        toggleCamera();
        await createOffer("audio");
    }

    const handleVideoCall = async () => {
        setCallUiOpen(true);
        setMicOpen(true);
        setVideoOpen(true);
        await initCall();
        await createOffer("video");
    }

    const createPeerConnection = async (type: string) => {
        const pc = new RTCPeerConnection(stunServers);
        pcRef.current = pc;

        localStreamRef.current?.getTracks().forEach(track => {
            if (localStreamRef.current)
                pc.addTrack(track, localStreamRef.current);
        })

        const remoteStream = new MediaStream();
        remoteStreamRef.current = remoteStream;
        pc.ontrack = async (event) => {
            event.streams[0].getTracks().forEach(track => {
                remoteStream.addTrack(track);
            });
            if (remoteVideoRef.current)
                remoteVideoRef.current.srcObject = remoteStream;
        }


        pc.onicecandidate = async (event) => {
            if (event.candidate) {
                socket?.emit("add-ice-candidate", { candidate: event.candidate, type, chatId })
            }
        }
    }

    const initCall = async () => {
        const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        localStreamRef.current = localStream
        if (localStream) {
            if (localVideoRef.current)
                localVideoRef.current.srcObject = localStream
        }
    }

    const createOffer = async (callType: "audio" | "video") => {
        await createPeerConnection("sender");
        const offer = await pcRef.current?.createOffer();
        await pcRef.current?.setLocalDescription(offer)
        socket?.emit('offer', { offer, callType, chatId });
    }

    const createAnswer = async (offer: any) => {
        await createPeerConnection("receiver");
        await pcRef.current?.setRemoteDescription(offer);
        const answer = await pcRef.current?.createAnswer();
        await pcRef.current?.setLocalDescription(answer);
        if (callTypeRef.current == "audio") {
            toggleCamera();
        } else {
            setVideoOpen(true);
        }
        socket?.emit('answer', { answer, chatId });
    }

    const handleOnAnswer = async (answer: any) => {
        if (!pcRef.current?.currentRemoteDescription) {
            pcRef.current?.setRemoteDescription(answer)
        }
    }


    //Answer incoming call
    const handleAnswerIncomingCall = async () => {
        setShowIncomingCall(false);
        setMicOpen(true);
        setCallUiOpen(true);
        await initCall();
        await createAnswer(offerRef.current);
    }

    
    //Call Controls
    const handleHangUp = async () => {
        pcRef.current?.close();
        socket?.emit('hangup', { chatId });
        setCallUiOpen(false);
        setAudioCall(false);
        setVideoCall(false);
    }

    const toggleMic = () => {
        const audioTrack = localStreamRef.current?.getTracks().find(track => track.kind === "audio")
        if (audioTrack) {
            if (audioTrack.enabled) {
                audioTrack.enabled = false
            } else {
                audioTrack.enabled = true
            }
        }
    }

    const toggleCamera = () => {
        const videoTrack = localStreamRef.current?.getTracks().find(track => track.kind === "video")
        if (videoTrack) {
            if (videoTrack.enabled) {
                videoTrack.enabled = false
            } else {
                videoTrack.enabled = true
            }
        }
    }
    //end Call Controls


    useEffect(() => {
        if (audioCall && !videoCall) {
            handleAudioCall();
        }
    }, [audioCall])

    useEffect(() => {
        if (videoCall && !audioCall) {
            handleVideoCall();
        }
    }, [videoCall])

    useEffect(() => {
        if (receiver)
            setHeaderTitle(receiver.firstName)
    }, [receiver])

    useEffect(() => {
        getMessages();
    }, [])

    return (
        <div className='relative  h-screen pt-16'>
            <div className={`${showIncomingCall ? "h-10" : "h-0"} overflow-hidden transition-all bg-green-500 text-white flex justify-between items-center px-[10px] md:px-[25px] duration-300 w-full`}>
                <Loader_dots text={`Incoming ${callTypeRef.current} call`} />
                <Button className='' onClick={handleAnswerIncomingCall}>Answer</Button>
            </div>
            <div className={`fixed overflow-hidden top-16 z-[25] right-0 flex flex-col w-[calc(100vw-64px)] md:w-[calc(100vw-314px)] rounded-b-3xl shadow-black/50 shadow-[0px_0px_50px]  dark:bg-card bg-background transition-all duration-300  ${callUiOpen ? "md:h-[400px] h-[calc(100vh-64px)]" : "h-0"}`}>
                <div className=' flex flex-col  md:flex-row'>
                    <div className=' p-4 md:w-1/2'>
                        <div className='rounded-lg overflow-hidden h-full bg-indigo-500'>
                            <video className='w-full h-full' autoPlay ref={remoteVideoRef} />
                        </div>
                    </div>
                    <div className=' p-4 md:w-1/2'>
                        <div className='rounded-lg overflow-hidden h-full bg-indigo-500'>
                            <video className='w-full h-full' autoPlay muted ref={localVideoRef} />
                        </div>
                    </div>

                </div>
                <div className=' flex items-center justify-center gap-3 md:h-[60px]'>
                    {
                        micOpen ?
                            <div onClick={() => { setMicOpen(false); toggleMic(); }} className='bg-muted rounded-full p-3 cursor-pointer'>
                                <Mic className='h-6 w-6' />
                            </div>
                            :
                            <div onClick={() => { setMicOpen(true); toggleMic(); }} className='bg-muted rounded-full p-3 cursor-pointer'>
                                <MicOff className='h-6 w-6' />
                            </div>
                    }
                    {
                        videoOpen ?
                            <div onClick={() => { setVideoOpen(false); toggleCamera() }} className='bg-muted rounded-full p-3 cursor-pointer'>
                                <Video className='h-6 w-6' />
                            </div>
                            :
                            <div onClick={() => { setVideoOpen(true); toggleCamera() }} className='bg-muted rounded-full p-3 cursor-pointer'>
                                <VideoOff className='h-6 w-6' />
                            </div>
                    }
                    <div onClick={handleHangUp} className='bg-muted rounded-full p-3 bg-red-500 text-white cursor-pointer'>
                        <Phone className='h-6 w-6' />
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
            <div className='absolute bottom-0 right-0 flex gap-1 bg-card z-10 dark:bg-background pb-4 w-full'>
                {chatId && <ChatInputBox socket={socket} chatId={chatId} friendUsername={username} />}
            </div>
        </div>
    )
}

export default Page