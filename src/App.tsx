import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";
import {Grid, Box} from "@mui/material";
import CustomAppBar from "./components/AppBar";
import ChatPanel from "./components/ChatPanel";
import TranslationControls from "./components/TranslationControls";
import {Message} from "./types/Message";

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: uuidv4(),
            sender: "Assistant",
            content: "Hi there! How can I help you today?",
            timestamp: new Date().toLocaleTimeString()
        }
    ]);

    const handleSendMessage = async (
        content: string,
        inputLanguage: string,
        outputLanguage: string,
        inputType: string,
        outputType: string
    ) => {
        console.log(content, inputLanguage, outputLanguage, inputType, outputType);
        const userMessage: Message = {
            id: uuidv4(),
            sender: "User",
            content,
            timestamp: new Date().toLocaleTimeString(),
            isAudio: inputType === "Speech"
        };

        setMessages((prev) => [...prev, userMessage]);

        try {
            let task_string = inputType === "Text" ? "text" : "speech";
            task_string += outputType === "Text" ? "2text" : "2speech";
            console.log(task_string);
            const response = await fetch(`${process.env.SERVER_URL}/api/translation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    task_string: task_string,
                    target_language: outputLanguage,
                    source_language: inputLanguage,
                    input: content
                })
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            const assistantMessage: Message = {
                id: uuidv4(),
                sender: "Assistant",
                content: data,
                timestamp: new Date().toLocaleTimeString(),
                isAudio: outputType === "Speech"
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error sending data to the backend API:", error);
            const errorMessage: Message = {
                id: uuidv4(),
                sender: "Assistant",
                content: "Sorry, something went wrong. Please try again.",
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages((prev) => [...prev, errorMessage]);
        }
    };

    return (
        <>
            <CustomAppBar />
            <Box sx={{padding: "20px", backgroundColor: "#121212"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ChatPanel messages={messages} />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TranslationControls onSendMessage={handleSendMessage} />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default App;