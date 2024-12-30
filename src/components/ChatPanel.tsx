import React, {useEffect, useRef} from "react";
import {Box, Typography} from "@mui/material";
import {Message} from "../types/Message";

interface ChatPanelProps {
    messages: Message[];
}

const ChatPanel: React.FC<ChatPanelProps> = ({messages}) => {
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    return (
        <Box
            sx={{
                border: "1px solid gray",
                borderRadius: "8px",
                padding: "20px",
                height: "56vh",
                overflowY: "auto",
                backgroundColor: "#202020",
                color: "white"
            }}
        >
            {messages.map((message) => (
                <Box
                    key={message.id}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: message.sender === "User" ? "flex-end" : "flex-start",
                        marginBottom: "10px"
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: message.sender === "User" ? "#61dafb" : "#ffffff"
                        }}
                    >
                        {message.sender} - {message.timestamp}
                    </Typography>
                    {message.isAudio ? (
                        <audio controls>
                            <source
                                src={`data:audio/wav;base64,${message.content}`}
                                type="audio/wav"
                            />
                            Your browser does not support the audio element.
                        </audio>
                    ) : (
                        <Typography
                            sx={{
                                backgroundColor: message.sender === "User" ? "#61dafb" : "#3a3a3a",
                                padding: "10px",
                                borderRadius: "8px",
                                color: message.sender === "User" ? "#000" : "#fff",
                                maxWidth: "70%",
                                whiteSpace: "pre-wrap"
                            }}
                        >
                            {message.content}
                        </Typography>
                    )}
                </Box>
            ))}
            <div ref={chatEndRef} />
        </Box>
    );
};

export default ChatPanel;
