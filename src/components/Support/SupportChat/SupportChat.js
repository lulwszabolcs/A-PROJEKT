import { useEffect, useState } from 'react';
import styles from './SupportChat.module.css'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import OpenAI from "openai";
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send';
const openai = new OpenAI({
    apiKey: "xai-0pqtoeMTuAzR9k9bS9fnZMQKtGqpwAjlHZZjGBGlbSoQ4JnnhgjFAHJ7QUKHfieb00J7KYOXrhns3rbw",dangerouslyAllowBrowser: true, 
    baseURL: "https://api.x.ai/v1",
  });
export default function SupportChat() {
    const [input,setInput] = useState("")
    const [messages,setMessages] = useState([])
    const [waitingForResponse,setWaitingForResponse] = useState(false);
    const handleSend = () => {
        if (input !== "" && !waitingForResponse) {
            setMessages((prev) => [...prev, { text: input, type: "sent" }]);
            setWaitingForResponse(true);
            setMessages((prev) => [...prev, { text: "...", type: "received", id: "loading" }]);
            sendChat(input)
            setInput("")
        }
    }
    async function sendChat(message) {
        try {
            const completion = await openai.chat.completions.create({
                model: "grok-2-vision-1212",
                messages: [
                  { role: "system", content: "You are Grok, a chatbot who speaks Hungarian and answers people's questions" },
                  { role: "user", content: message },
                ],
            });
            
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === "loading" ? { text: completion.choices[0].message.content, type: "received" } : msg
                )
            );
        } catch (error) {
            console.error("Hiba történt a chat küldésekor:", error);
        } finally {
            setWaitingForResponse(false);
        }    
    }
    const handleInputChange = (event) => {
        event.persist(); 
        setInput(event.target.value);
    };
    
    
    return (
        <div className={styles.flexbox}>
        <h1 className={styles.supportmaintext}>Ügyfélszolgálat</h1>

        <div className={styles.chatmaincontainer}>
            <div className={styles.messagecontainer}>
                <div className={styles.systemtextcontainer}>
                    {"Írj be egy üzenetet és én megválaszolom!"}
                </div>
                {messages.map((msg)=>(
                    <div className={msg.type == "sent" ? styles.usertextcontainer : styles.systemtextcontainer}>
                    {msg.text}
                    </div>
                ))}
            </div>
            {messages.length !== 0 ? (
            <div style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end',height:'100%'}}>
                <div className={styles.sendcontainer}>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    variant="outlined"
                    value={input}
                    className={styles.chatinput}
                    style={{ borderRadius: "10px" }}
                    rows={2}
                    maxRows={5}
                    disabled={waitingForResponse}
                    onChange={handleInputChange}
                    sx={{resize:'vertical'}}
                    />
                    <Button onClick={handleSend} disabled={waitingForResponse}>
                        {waitingForResponse ? <SendIcon style={{ color: "gray" }} /> : <SendIcon />}
                    </Button>                
                    </div>
            </div>
            ) : (
            <div className={styles.sendcontainer}>
                <TextField
                id="outlined-multiline-static"
                multiline
                variant="outlined"
                value={input}
                className={styles.chatinput}
                style={{ borderRadius: "10px" }}
                rows={2}
                maxRows={5}
                disabled={waitingForResponse}
                onChange={handleInputChange}
                sx={{resize:'vertical'}}
                />
                <Button onClick={handleSend}><SendIcon/></Button>
            </div>
            )}
        </div>
        </div>
    )
}
