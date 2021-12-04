import React, { useEffect, useState, useRef, Suspense } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import SendIcon from '@mui/icons-material/Send'
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import NearMeDisabledOutlinedIcon from '@mui/icons-material/NearMeDisabledOutlined';
import PresentIcon from '@mui/icons-material/PresentToAll';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import io from "socket.io-client";

const ariaLabel = { 'aria-label': 'description' };


const WatcherVideoChat = ({roomid}) => {

    const socket = useRef();
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const userVideo = useRef();
    let peerConnection;
    const config = {
        iceServers: [
            {
                urls: ["stun:stun.l.google.com:19302"]
            }
        ]
    };

    const handleSendMessage = () => {
        socket.current.emit('sendMessage', message, () => setMessage(''))
        setMessage('')
    }

    useEffect(() => {

        socket.current = io.connect("http://10.10.13.158:8000/", { transports : ['websocket'], reconnectionAttempts: 5 });

        socket.current.emit('login', { name:"watcher", room: roomid }, error => {
            if(error) console.log(error);
        });

        socket.current.on("message", msg => {
            console.log(msg);
            setMessages(messages => [...messages, msg]);
        });

        socket.current.on("notification", msg => {

        });

        socket.current.on("offer", (id, description) => {
            peerConnection = new RTCPeerConnection(config);
            peerConnection
              .setRemoteDescription(description)
              .then(() => peerConnection.createAnswer())
              .then(sdp => peerConnection.setLocalDescription(sdp))
              .then(() => {
                socket.current.emit("answer", id, peerConnection.localDescription);
              });
            peerConnection.ontrack = event => {
                userVideo.current.srcObject = event.streams[0];
                // peerConnection.ontrack.onunmute = () => console.log("Audio data arriving!");
            };
            peerConnection.onicecandidate = event => {
              if (event.candidate) {
                socket.current.emit("candidate", id, event.candidate);
              }
            };
          });
        
        socket.current.on("candidate", (id, candidate) => {
            peerConnection
              .addIceCandidate(new RTCIceCandidate(candidate))
              .catch(e => console.error(e));
        });
          
        socket.current.on("connect", () => {
            socket.current.emit("watcher", roomid);
        });
          
        socket.current.on("broadcaster", () => {
            socket.current.emit("watcher", roomid);
        });
          
        window.onunload = window.onbeforeunload = () => {
            socket.current.close();
            peerConnection.close();
        };
    }
    , []);

    let UserVideo;

    UserVideo = (
        <video width="100%" height="100%" style={{ border: "solid" }} playsInline muted ref={userVideo} autoPlay />
    );


    return (
        <React.Fragment>
            <Grid container sx={{display: 'flex', justifyContent: 'space-evenly', flexGrow: 1}}>
                <Button href="#" variant="outlined" sx={{mt: 1}} startIcon={<FavoriteBorderIcon />}>
                  Add to favourite
                </Button>
            </Grid>
            <Grid container spacing={2} sx={{flexGrow: 1, mt: 1}}>
                <Grid style={{ position: "relative" }} item md={8} sm={12} xs={12} sx={{mt: 1}}>
                    {UserVideo}
                  {/* <Grid style={{ position: "absolute", bottom: "0" }} container sx={{display: 'flex', justifyContent: 'space-evenly', flexGrow: 1}} spacing={1}> */}

                  
                </Grid>
                <Grid style={{ position: "relative" }} item md={4} sm={12} xs={12} sx={{mt: 1}}>
                <Grid style={{overFlowX: "hidden", overflowY: "auto" }} container  sx={{display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', height: 370}}>
                {
                    messages.length > 0 ?
                        messages.map((msg, i) => 
                        (
                            <ListItem style={{ height: "fit-content" }}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={"http://" + window.location.hostname + ":5000/images/" + "avatar" + (1 + Math.floor(Math.random() * 4)) + ".png"} />
                                </ListItemAvatar>
                                <ListItemText fullWidth primary={msg.user} secondary={msg.text}/>
                            </ListItem>
                        )) : (<div></div>)
                }
                </Grid>
                {/* <Grid style={{ position: "absolute", bottom: "0" }} container sx={{flexGrow: 1}} spacing={1}> */}
                <Grid container sx={{flexGrow: 1, mt: 2}} spacing={1}>
                  <Grid item  md={10} sm={10} xs={10}>
                    <Input fullWidth placeholder="Send Message" inputProps={ariaLabel} value={message} onChange={e => setMessage(e.target.value)}  onKeyDown={e => {if(e.keyCode == 13) handleSendMessage()}}/>
                  </Grid>
                  <Grid item  md={2} sm={2} xs={2}>
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={handleSendMessage}>
                      <SendIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                </Grid>
              
            </Grid>
        </React.Fragment>
    );
}

export default WatcherVideoChat;