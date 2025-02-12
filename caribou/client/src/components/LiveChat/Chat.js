import styled from "styled-components"
import io  from 'socket.io-client';
import { useState } from "react";
import LiveChat from "./LiveChat";

const Chat=()=>{
    const[username, setUsername]=useState("");
    const[room,setRoom]=useState("");
    const [showChat,setShowChat]=useState(true);
    const socket=io.connect("http://localhost:3001/");

    //function that joins user to room
    const joinRoom=()=>{
        if(username!=='' && room!=""){
            socket.emit("join_room",room);
            setShowChat(false);
        }
        
    }
    return (
        <div>
            <div  style={{ visibility: showChat ? "visible" : "hidden" }}>
                <SubTitle>Join a Chat</SubTitle>
                <p>*Click the caribou to get Room Id*</p>
                <input 
                    type="text" 
                    placeholder="CodeName"
                    onChange={(e)=>{
                    setUsername(e.target.value);
                    }}
                >
                </input>
                <input 
                    type="text" 
                    placeholder="Room ID"
                    onChange={(e)=>{
                    setRoom(e.target.value);
                    }}
                >
                </input>
                <button onClick={joinRoom}>Join a Room</button>
            </div>
            <div style={{ visibility: showChat ? "hidden" : "visible" }}>
                <LiveChat socket={socket} username={username} room={room} setShowChat={setShowChat}/>
            </div>
        </div>
    )
}
const SubTitle=styled.p`
font-size: 20px;
text-decoration: underline;
`
export default Chat;