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
import { Message, Participant } from '@/store/interfaces';

const stunServers = {
    iceServers: [
        {
            urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
                'stun:stun3.l.google.com:19302',
                'stun:stun4.l.google.com:19302',
                'stun:stun.l.google.com:19302',
                'stun:stun.ekiga.net',
                'stun:stun.ideasip.com',
                'stun:stun.stunprotocol.org:3478'
            ]
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
    const [messages, setMessages] = useState<Message[]>([])
    const [receiver, setReceiver] = useState<Participant | null>(null)
    const userData = useSelector((state: RootState) => state.user.data);
    const [socket, setSocket] = useState<Socket | null>(null)

    //for calls
    const [callUiOpen, setCallUiOpen] = useState(false);
    const [showIncomingCall, setShowIncomingCall] = useState(false);
    const [callAnswered, setCallAnswered] = useState(false);
    const [micOpen, setMicOpen] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);
    const [remoteMicOpen, setRemoteMicOpen] = useState(false);
    const [remoteVideoOpen, setRemoteVideoOpen] = useState(false);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const remoteStreamRef = useRef<MediaStream | null>(null);
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const callTypeRef = useRef<"audio" | "video">("audio")
    const offerRef = useRef<any>(null);

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
        socket?.emit('toggle-mic', { status: "true", chatId })
        await initCall();
        toggleCamera();
        await createOffer("audio");
    }

    const handleVideoCall = async () => {
        setCallUiOpen(true);
        setMicOpen(true);
        setVideoOpen(true);
        socket?.emit('toggle-mic', { status: "true", chatId })
        socket?.emit('toggle-video', { status: "true", chatId })
        setRemoteVideoOpen(true);
        await initCall();
        await createOffer("video");
    }

    const createPeerConnection = async (type: string) => {
        const pc = new RTCPeerConnection({
            iceServers: stunServers.iceServers,
            iceTransportPolicy: 'all',
            iceCandidatePoolSize: 10,
            bundlePolicy: 'max-bundle',
            rtcpMuxPolicy: 'require'
        });
        pcRef.current = pc;

        localStreamRef.current?.getTracks().forEach(track => {
            if (localStreamRef.current)
                pc.addTrack(track, localStreamRef.current);
        })

        const remoteStream = new MediaStream();
        if (remoteVideoRef.current)
            remoteVideoRef.current.style.display = "block"
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
        setRemoteMicOpen(true);
        setCallAnswered(true);
    }


    //Answer incoming call
    const handleAnswerIncomingCall = async () => {
        setShowIncomingCall(false);
        setMicOpen(true);
        setCallAnswered(true);
        setCallUiOpen(true);
        await initCall();
        await createAnswer(offerRef.current);
    }

    const handleHangUp = async () => {
        //closing peer connection
        pcRef.current?.close();

        //Resetting all states
        remoteStreamRef.current = null;
        pcRef.current = null;
        offerRef.current = null;
        callTypeRef.current = "audio";
        setMicOpen(false);
        setVideoOpen(false);
        setCallAnswered(false);
        setRemoteMicOpen(false);
        setRemoteVideoOpen(false);
        setCallUiOpen(false);
        setShowIncomingCall(false);

        //header calling button state reset
        setAudioCall(false);
        setVideoCall(false);
    }

    //Call Controls
    const handleCallCut = () => {
        //sending hangup signal through signaling server to anotehr peer
        socket?.emit('hangup', { chatId });
        handleHangUp();
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
    //Call Controls

    //Effects
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
            setHeaderTitle(receiver.firstName + " " + receiver.lastName)
    }, [receiver])

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
                handleHangUp();
            })
            socket.on("toggle-mic", (status) => {
                setRemoteMicOpen(status)
            })
            socket.on("toggle-video", (status) => {
                setRemoteVideoOpen(status);
            })

            if (typeof window != "undefined") {
                window.addEventListener('beforeunload', (event) => {
                    socket?.emit('hangup', { chatId });
                })
            }

        }

    }, [socket, chatId, userData]);

    useEffect(() => {
        getMessages();
        const s = io(process.env.SERVER_URL2);
        setSocket(s);

        return () => {
            s.disconnect();
            setSocket(null);
        };
    }, [])

    return (
        <div className='relative  h-screen pt-16'>
            <div className={`${showIncomingCall ? "h-10" : "h-0"} overflow-hidden transition-all bg-green-500 text-white flex justify-between items-center px-[10px] md:px-[25px] duration-300 w-full`}>
                <Loader_dots text={`Incoming ${callTypeRef.current} call`} />
                <Button className='' onClick={handleAnswerIncomingCall}>Answer</Button>
            </div>
            <div className={`fixed overflow-hidden top-16 z-[25] right-0 flex flex-col rounded-b-3xl shadow-black/50 shadow-[0px_0px_50px] dark:bg-card bg-background transition-all duration-300  ${callUiOpen ? "w-[calc(100vw-64px)] md:w-[calc(100vw-314px)]" : "w-0"}`}>
                {!callAnswered ?
                    <div className='w-full text-lg font-semibold mt-4 text-orange-500 flex items-center justify-center'>
                        <Loader_dots text='Ringing' />
                    </div>
                    :
                    <div className='w-full text-lg font-semibold mt-4 text-green-500 flex items-center justify-center'>
                        <p>Connected</p>
                    </div>}
                <div className=' flex flex-col justify-center lg:flex-row'>
                    <div className={`p-4 lg:w-1/2`}>
                        <div className='rounded-lg relative overflow-hidden h-full'>
                            {!remoteVideoOpen && <Avatar className="w-28 h-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <AvatarImage className="object-cover" src={receiver?.profilePic} />
                                <AvatarFallback className="text-3xl bg-primary font-semibold">{receiver?.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                            </Avatar>}
                            {!remoteMicOpen && <MicOff className='absolute text-white bottom-4 left-1/2 -translate-x-1/2' />}
                            <video className={`w-full h-full bg-indigo-500`} autoPlay ref={remoteVideoRef} />
                        </div>
                    </div>
                    <div className=' p-4 lg:w-1/2'>
                        <div className='rounded-lg relative overflow-hidden h-full'>
                            {!videoOpen && <Avatar className="w-28 h-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <AvatarImage className="object-cover" src={userData?.profilePic} />
                                <AvatarFallback className="text-3xl bg-primary font-semibold">{userData?.username.substring(0, 1).toUpperCase()}</AvatarFallback>
                            </Avatar>}
                            {!micOpen && <MicOff className='absolute bottom-4 text-white left-1/2 -translate-x-1/2' />}
                            <video className='w-full h-full bg-indigo-500' autoPlay muted ref={localVideoRef} />
                        </div>
                    </div>

                </div>
                <div className=' flex items-center mb-4 justify-center gap-3'>
                    {
                        micOpen ?
                            <div onClick={() => { socket?.emit("toggle-mic", { status: false, chatId }); setMicOpen(false); toggleMic(); }} className='bg-muted rounded-full p-3 cursor-pointer'>
                                <Mic className='h-6 w-6' />
                            </div>
                            :
                            <div onClick={() => { socket?.emit("toggle-mic", { status: true, chatId }); setMicOpen(true); toggleMic(); }} className='bg-muted rounded-full p-3 cursor-pointer'>
                                <MicOff className='h-6 w-6' />
                            </div>
                    }
                    {
                        videoOpen ?
                            <div onClick={() => { socket?.emit("toggle-video", { status: false, chatId }); setVideoOpen(false); toggleCamera() }} className='bg-muted rounded-full p-3 cursor-pointer'>
                                <Video className='h-6 w-6' />
                            </div>
                            :
                            <div onClick={() => { socket?.emit("toggle-video", { status: true, chatId }); setVideoOpen(true); toggleCamera() }} className='bg-muted rounded-full p-3 cursor-pointer'>
                                <VideoOff className='h-6 w-6' />
                            </div>
                    }
                    <div onClick={handleCallCut} className='bg-muted rounded-full p-3 bg-red-500 text-white cursor-pointer'>
                        <Phone className='h-6 w-6' />
                    </div>
                </div>
            </div>
            <div className='h-full w-full pt-4 pb-20 flex flex-col-reverse gap-3 overflow-y-auto'>

                {
                    messages.map((message, index) => {
                        return (
                            <div key={index} className='flex flex-col'>
                                {index < messages.length - 1 ? new Date(message.createdAt).getDate() - new Date(messages[index + 1].createdAt).getDate() > 0 && <p className='mx-auto mb-3 bg-[#EAE5F2] dark:bg-[#1E152B] px-3 py-1 rounded-md w-fit'>{new Date(message.createdAt).getDate() == new Date(Date.now()).getDate() ? "Today" : new Date(Date.now()).getDate() - new Date(message.createdAt).getDate() == 1 ? "Yesterday" : new Date(message.createdAt).toLocaleDateString()}</p> : <p className='mx-auto mb-3 bg-[#EAE5F2] dark:bg-[#1E152B] px-3 py-1 rounded-md w-fit'>{new Date(message.createdAt).getDate() == new Date(Date.now()).getDate() ? "Today" : new Date(Date.now()).getDate() - new Date(message.createdAt).getDate() == 1 ? "Yesterday" : new Date(message.createdAt).toLocaleDateString()}</p>}
                                {message.sender == userData._id ?
                                    <SentBubble message={message.message} time={new Date(message.updatedAt).toLocaleTimeString("en", { hour: "numeric", minute: "numeric", hour12: true })} />
                                    :
                                    <RecievedBubble message={message.message} time={new Date(message.updatedAt).toLocaleTimeString("en", { hour: "numeric", minute: "numeric", hour12: true })} />
                                }
                            </div>
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