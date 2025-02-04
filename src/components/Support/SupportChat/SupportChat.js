import { useEffect, useState } from 'react';
import styles from './SupportChat.module.css'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function SupportChat() {
    const [input,setInput] = useState("")
    const [messages,setMessages] = useState([])
    const handleSend = () => {
        if (input !== "") {
        setMessages((prev) => [...prev, { text: input, type: "sent" }]);
        }
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
                    <div className={styles.usertextcontainer}>
                    {msg.text}
                    </div>
                ))}
            </div>
            <div className={styles.sendcontainer}>
            <TextField id="outlined-multiline-static" multiline variant="outlined" className={styles.chatinput} style={{borderRadius:'10px'}} rows={2} onChange={(e)=>setInput(e.target.value)}/>
                <Button onClick={handleSend}>Küldés</Button>
            </div>
        </div>
        </div>
    )
}