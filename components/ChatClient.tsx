'use client'
import { Message } from '@/lib/generated/prisma/client'
import { ImageIcon, Send } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useParams, useSearchParams } from 'next/navigation'
import Pusher from 'pusher-js'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const ChatClient = () => {
    const searchParams=useSearchParams()
    const {key}=useParams()
    const type=searchParams.get('type')
    const [input, setInput] = useState<string>("");
    const session=useSession()
    const [messages,setMessages]=useState<Message[]>([])
    const sendMessage = async() => {
        if (!input.trim()) return;
        await fetch(`/api/message?type=${type}`,{
            method:"POST",
            body:JSON.stringify({
                text:input,
                senderId:Number(session.data?.user?.id),
                key:key
            })
        })
        
        setInput("");
    };

    const fetchMessages=async () => {
        const response=await fetch(`/api/message/?type=${type}&key=${key}`)
        const data=await response.json() as Message[]
        setMessages(data.messages)
    }
    useEffect(()=>{
        fetchMessages()
    },[key,type])

    useEffect(()=>{
        const pusher=new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!,{cluster:"ap2"})
        const channel=pusher.subscribe(`chat-${key}`)
        channel.bind('new-message',(data:Message)=>setMessages(
            (prev)=>[...prev,data]
        ))
        return()=>{
            channel.unbind_all()
            channel.unsubscribe()
        }
    },[key])

    return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-neutral-950">
            {/* Header */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center">
                <h2 className="text-lg font-semibold">Chat</h2>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex ${msg.sender.username === session.data?.user?.name ? "justify-end" : "justify-start"}`}
                >
                    <div
                    className={`max-w-xs px-4 py-3 rounded-2xl text-sm 
                        ${msg.sender.username === session.data?.user?.name
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-bl-none"
                        }`}
                    >
                    {msg.text}
                    </div>
                </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
                <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                <ImageIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
                </button>

                <input
                className="flex-1 p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 
                text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Type a message…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />

                <Button
                onClick={sendMessage}
                className="p-3 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-white transition"
                >
                <Send className="w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}

export default ChatClient