import React, {useState, useRef} from "react";
import {
    Box,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TextField,
    Button,
    IconButton
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AttachFileIcon from "@mui/icons-material/AttachFile";
interface TranslationControlsProps {
    onSendMessage: (
        content: string,
        inputLanguage: string,
        outputLanguage: string,
        inputType: string,
        outputType: string
    ) => void;
}

const TranslationControls: React.FC<TranslationControlsProps> = ({onSendMessage}) => {
    const [inputText, setInputText] = useState<string>("");
    const [inputLanguage, setInputLanguage] = useState("English");
    const [outputLanguage, setOutputLanguage] = useState("French");
    const [inputType, setInputType] = useState("Text");
    const [outputType, setOutputType] = useState("Text");
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const languages = [
        "English",
        "Afrikaans",
        "Amharic",
        "Modern Standard Arabic",
        "Moroccan Arabic",
        "Egyptian Arabic",
        "Assamese",
        "Asturian",
        "North Azerbaijani",
        "Belarusian",
        "Bengali",
        "Bosnian",
        "Bulgarian",
        "Catalan",
        "Cebuano",
        "Czech",
        "Central",
        "Mandarin Chinese",
        "Mandarin Chinese Hant",
        "Welsh",
        "Danish",
        "German",
        "Estonian",
        "Basque",
        "Finnish",
        "French",
        "Nigerian Fulfulde",
        "West Central Oromo",
        "Irish",
        "Galician",
        "Gujarati",
        "Hebrew",
        "Hindi",
        "Croatian",
        "Hungarian",
        "Armenian",
        "Igbo",
        "Indonesian",
        "Icelandic",
        "Italian",
        "Javanese",
        "Japanese",
        "Kamba",
        "Kannada",
        "Georgian",
        "Kazakh",
        "Kabuverdianu",
        "Halh Mongolian",
        "Khmer",
        "Kyrgyz",
        "Korean",
        "Lao",
        "Lithuanian",
        "Luxembourgish",
        "Ganda",
        "Luo",
        "Standard Latvian",
        "Maithili",
        "Malayalam",
        "Marathi",
        "Macedonian",
        "Maltese",
        "Meitei",
        "Burmese",
        "Dutch",
        "Norwegian Nynorsk",
        "Norwegian Bokmål",
        "Nepali",
        "Nyanja",
        "Occitan",
        "Odia",
        "Punjabi",
        "Southern Pashto",
        "Western Persian",
        "Polish",
        "Portuguese",
        "Romanian",
        "Russian",
        "Slovak",
        "Slovenian",
        "Shona",
        "Sindhi",
        "Somali",
        "Spanish",
        "Serbian",
        "Swedish",
        "Swahili",
        "Tamil",
        "Telugu",
        "Tajik",
        "Tagalog",
        "Thai",
        "Turkish",
        "Ukrainian",
        "Urdu",
        "Northern Uzbek",
        "Vietnamese",
        "Xhosa",
        "Yoruba",
        "Cantonese",
        "Colloquial Malay",
        "Standard Malay",
        "Zulu"
    ];
    const handleSwapLanguages = () => {
        const temp = inputLanguage;
        setInputLanguage(outputLanguage);
        setOutputLanguage(temp);
    };

    const handleSend = () => {
        if (inputText.trim() === "" && !selectedFile) return;

        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result?.toString().split(",")[1];
                onSendMessage(base64String, inputLanguage, outputLanguage, inputType, outputType);
                setInputText("");
                setSelectedFile(null);
                setIsFileSelected(false);
                setInputType("Text");
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            };
            reader.readAsDataURL(selectedFile);
        } else {
            onSendMessage(inputText, inputLanguage, outputLanguage, inputType, outputType);
            setInputText("");
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setInputType("Speech");
            setIsFileSelected(true);
            setInputText(event.target.files[0].name);
        } else {
            setSelectedFile(null);
            setInputType("Text");
            setIsFileSelected(false);
            setInputText("");
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={2} paddingTop={2} width="100%">
            {/* Text Input and Send Button */}
            <Box
                display="flex"
                flexDirection="row"
                gap={2}
                width="60%"
                margin="0 auto" // Center align the container
            >
                <input
                    ref={fileInputRef}
                    accept="audio/*"
                    style={{display: "none"}}
                    id="audio-file-input"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="audio-file-input">
                    <IconButton color="primary" component="span">
                        <AttachFileIcon />
                    </IconButton>
                </label>
                <TextField
                    fullWidth
                    label="Type your message"
                    variant="outlined"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    multiline
                    disabled={isFileSelected}
                    slotProps={{
                        input: {style: {color: "#FFFFFF"}},
                        inputLabel: {style: {color: "#FFFFFF"}}
                    }}
                    sx={{
                        marginRight: "10px",
                        color: "#FFFFFF",
                        borderRadius: "5px",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#FFFFFF"
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#FFFFFF"
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#FFFFFF"
                        },
                        "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white"
                        },
                        "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#ffffff"
                        }
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSend}
                    endIcon={<SendIcon />}
                    sx={{
                        minWidth: "100px",
                        height: "56px",
                        alignSelf: "flex-start"
                    }}
                >
                    Send
                </Button>
            </Box>

            {/* Language Selector Controls */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                paddingTop={2}
                gap={2}
                width="100%"
                maxWidth="500px" // Match the width of the above controls
                margin="0 auto" // Add spacing and center align the container
            >
                {/* Input Language */}
                <FormControl variant="outlined" sx={{flex: 1}}>
                    <InputLabel style={{color: "#FFFFFF"}}>Input Language</InputLabel>
                    <Select
                        value={inputLanguage}
                        onChange={(e) => setInputLanguage(e.target.value)}
                        label="Input Language"
                        IconComponent={(props) => (
                            <ArrowDropDownIcon {...props} style={{color: "#FFFFFF"}} />
                        )}
                        sx={{
                            color: "#FFFFFF",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#90CAF9"
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#FFFFFF"
                            }
                        }}
                    >
                        {languages.map((language) => (
                            <MenuItem key={language} value={language}>
                                {language}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Swap Button */}
                <Button
                    onClick={handleSwapLanguages}
                    variant="contained"
                    sx={{
                        bgcolor: "#00BCD4",
                        "&:hover": {bgcolor: "#00ACC1"},
                        color: "#FFFFFF",
                        minWidth: "40px", // Ensure consistent button size
                        padding: "8px"
                    }}
                >
                    <SwapHorizIcon />
                </Button>

                {/* Output Language */}
                <FormControl variant="outlined" sx={{flex: 1}}>
                    <InputLabel style={{color: "#FFFFFF"}}>Output Language</InputLabel>
                    <Select
                        value={outputLanguage}
                        onChange={(e) => setOutputLanguage(e.target.value)}
                        label="Output Language"
                        IconComponent={(props) => (
                            <ArrowDropDownIcon {...props} style={{color: "#FFFFFF"}} />
                        )}
                        sx={{
                            color: "#FFFFFF",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#90CAF9"
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#FFFFFF"
                            }
                        }}
                    >
                        {languages.map((language) => (
                            <MenuItem key={language} value={language}>
                                {language}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Output Type */}
                <FormControl variant="outlined" sx={{flex: 1}}>
                    <InputLabel style={{color: "#FFFFFF"}}>Output Type</InputLabel>
                    <Select
                        value={outputType}
                        onChange={(e) => setOutputType(e.target.value)}
                        label="Output Type"
                        IconComponent={(props) => (
                            <ArrowDropDownIcon {...props} style={{color: "#FFFFFF"}} />
                        )}
                        sx={{
                            color: "#FFFFFF",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#90CAF9"
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#FFFFFF"
                            }
                        }}
                    >
                        <MenuItem value="Text">Text</MenuItem>
                        <MenuItem value="Speech">Speech</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};

export default TranslationControls;
