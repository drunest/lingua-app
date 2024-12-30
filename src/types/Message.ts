export interface Message {
    id: string;
    sender: "User" | "Assistant";
    content: string;
    timestamp: string;
    isAudio?: boolean;
}
