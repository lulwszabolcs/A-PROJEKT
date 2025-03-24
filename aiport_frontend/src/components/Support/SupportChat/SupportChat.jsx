import { useEffect, useState } from 'react';
import styles from './SupportChat.module.css'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import OpenAI from "openai";
import SendIcon from '@mui/icons-material/Send';

const key = import.meta.env.VITE_XAI_API_KEY;
    const openai = new OpenAI({
        apiKey: key || null,dangerouslyAllowBrowser: true, 
        baseURL: "https://api.x.ai/v1",
    });

export default function SupportChat() {
    const [input,setInput] = useState("")
    const [messages,setMessages] = useState([])
    const [chatHistory,setChatHistory] = useState([])
    const [waitingForResponse,setWaitingForResponse] = useState(false);
    const [systemContent, setSystemContent] = useState(`You are Grok, a chatbot who speaks Hungarian and answers people's questions. You only reply in plain text, no need for special formatting.`);

    const handleSend = () => {
        if (input !== "" && !waitingForResponse) {
            setMessages((prev) => [...prev, { text: input, type: "sent" }]);
            setWaitingForResponse(true);
            setChatHistory([...chatHistory,{role:"user",content:[{"type":"text","text":input}]}])
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
                  { role: "system", content:systemContent},
                  ...chatHistory.map(msg => ({ role: msg.role, content: msg.content })),
                  { role: "user", content: message },
                ],
            });
            
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === "loading" ? { text: completion.choices[0].message.content, type: "received" } : msg
                )
            );
            setChatHistory([...chatHistory,completion.choices[0].message])
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
    useEffect(() => {
        fetch('/xai_skypass_manual.txt')
          .then((response) => response.text())
          .then((text) => {
            setSystemContent(
              `You are Grok, a chatbot who speaks Hungarian and answers people's questions. Here is additional context: ${text}`
            );
          })
          .catch((error) => console.error("Hiba a fájl betöltésekor:", error));
      }, []);
    return (
        <div className={styles.flexbox}>
        <h1 className={styles.supportmaintext}>Ügyfélszolgálat - SkyPassAI</h1>
        <div className={styles.chatmaincontainer}>
            <div className={styles.messagecontainer}>
                <div className={styles.systemtextcontainer}>
                    {!key ? "Nem található környezeti változó. Kérje a rendszergazda segítségét.":"Írjon be egy üzenetet és én megválaszolom!"}
                </div>
                {messages.map((msg,index)=>(
                    <div className={msg.type == "sent" ? styles.usertextcontainer : styles.systemtextcontainer} key={index}>
                    {msg.text}
                    </div>
                ))}
            </div>
            {messages.length !== 0 ? (
            <div className={styles.transitionedMsgContainer}>
                <div className={styles.sendcontainer}>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    variant="outlined"
                    value={input}
                    className={styles.chatinput}
                    style={{ borderRadius: "10px" }}
                    rows={2}
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
                disabled={!key || waitingForResponse}
                onChange={handleInputChange}
                sx={{resize:'vertical'}}
                />
                <Button onClick={handleSend} disabled={!key}><SendIcon/></Button>
            </div>
            )}
            </div>
        </div>
    )
}
