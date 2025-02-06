import { useEffect, useState } from 'react';
import styles from './SupportChat.module.css'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import OpenAI from "openai";
import axios from 'axios'
const openai = new OpenAI({
    apiKey: "PASTE_HERE",dangerouslyAllowBrowser: true, 
    baseURL: "https://api.x.ai/v1",
  });
export default function SupportChat() {
    const [input,setInput] = useState("")
    const [messages,setMessages] = useState([])
    const handleSend = () => {
        if (input !== "") {
            setMessages((prev) => [...prev, { text: input, type: "sent" }]);
            sendChat(input)
            setInput("")
        }
    }
    async function sendChat(message) {
        const completion = await openai.chat.completions.create({
            model: "grok-2-vision-1212",
            messages: [
              { role: "system", content: "You are Grok, a chatbot who speaks hungarian and answers people's questions" },
              {
                role: "user",
                content: message,
              },
            ],
          });
          setMessages((prev) => [...prev, { text: completion.choices[0].message.content, type: "received" }]);
    }
    
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
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={handleSend}>Küldés</Button>
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
                onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={handleSend}>Küldés</Button>
            </div>
            )}
        </div>
        </div>
    )
}
