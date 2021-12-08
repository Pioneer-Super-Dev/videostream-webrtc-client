import React, { useEffect, useState, useRef, Suspense } from "react";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import SendIcon from "@mui/icons-material/Send";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import NearMeDisabledOutlinedIcon from "@mui/icons-material/NearMeDisabledOutlined";
import io from "socket.io-client";
import Peer from "simple-peer";
import { addBroadcaster } from "../../actions/broadcast";
import axios from "axios";
import Grow from "@mui/material/Grow";

const ariaLabel = { "aria-label": "description" };

const BroadcasterVideoChat = ({ user, setAlert, addBroadcaster }) => {
  const [stream, setStream] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userVideo = useRef();
  const socket = useRef();
  const chatboxRef = useRef(null);

  const peerConnections = {};
  const config = {
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302"],
      },
    ],
  };

  const handleSendMessage = () => {
    socket.current.emit("sendMessage", message, () => setMessage(""));
    setMessage("");
  };

  useEffect(() => {
    socket.current = io("http://10.10.13.158:8000/", {
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    socket.current.emit(
      "login",
      {
        name: user && user.firstname + " " + user.lastname + "(broadcaster)",
        room: user && user._id,
      },
      (error) => {
        if (error) console.log(error);
      }
    );

    socket.current.on("message", (msg) => {
      console.log(msg);
      setMessages((messages) => [...messages, msg]);
    });

    socket.current.on("notification", (msg) => {});

    //SHOW CAMERA ON MY SCREEN
    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
            socket.current.emit("broadcaster", { room: user && user._id });
          }

          console.log(navigator.mediaDevices.enumerateDevices());

          addBroadcaster({
            id: user && user._id,
            profileImage: user && user.profileimage,
            name: user && user.firstname + user && user.lastname,
          });
        })
        .then();
    } catch (err) {
      setAlert("Camera & Microphone Error", "error");
      console.log(err);
    }

    socket.current.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.current.on("watcher", (id) => {
      const peerConnection = new RTCPeerConnection(config);
      peerConnections[id] = peerConnection;

      let stream1 = userVideo.current.srcObject;
      stream1
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream1));

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.current.emit("candidate", id, event.candidate);
        }
      };

      peerConnection
        .createOffer()
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.current.emit("offer", id, peerConnection.localDescription);
        });
    });

    socket.current.on("answer", (id, description) => {
      peerConnections[id].setRemoteDescription(description);
    });

    socket.current.on("candidate", (id, candidate) => {
      peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.current.on("disconnectPeer", (id) => {
      peerConnections[id].close();
      delete peerConnections[id];
    });

    window.onunload = window.onbeforeunload = () => {
      axios
        .delete(`api/broadcasters/${user._id}`)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      socket.current.close();
    };

    if (user)
      axios
        .post("api/broadcasters", {
          streamer: user._id,
          name: user.firstname + user.lastname,
          profileimage: user.profileimage || "avatar1.png",
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
  }, []);

  let UserVideo;

  if (stream) {
    UserVideo = (
      <video
        width="100%"
        height="100%"
        playsInline
        muted
        ref={userVideo}
        autoPlay
      />
    );
  } else {
    UserVideo = (
      <video width="100%" height="100%" style={{ border: "solid" }} autoPlay />
    );
  }

  const handleBroadcast = () => {
    stream.getVideoTracks()[0].enabled = true;

    axios
      .post("api/broadcasters", {
        streamer: user._id,
        name: user.firstname + " " + user.lastname,
        profileimage: user.profileimage || "avatar1.png",
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const handleBanBroadcast = () => {
    stream.getVideoTracks()[0].enabled = false;

    axios
      .delete(`api/broadcasters/${user._id}`)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      {/* VIDEO BROADCAST BUTTON*/}
      <Grid
        container
        sx={{ display: "flex", justifyContent: "space-evenly", flexGrow: 1 }}
      >
        <Button
          variant="outlined"
          sx={{ mt: 1 }}
          startIcon={<NearMeOutlinedIcon />}
          onClick={handleBroadcast}
        >
          Broadcast
        </Button>
        <Button
          variant="outlined"
          sx={{ mt: 1 }}
          startIcon={<NearMeDisabledOutlinedIcon />}
          onClick={handleBanBroadcast}
        >
          Ban User
        </Button>
      </Grid>

      <Grid container spacing={2} sx={{ flexGrow: 1, mt: 2 }}>
        {/* VIDEO BORADCAST MYCAMERA */}
        <Grid item md={8} sm={12} xs={12}>
          {/* <video width="100%" height="100%" style={{ border: "solid" }} ref={userVideo} autoPlay/> */}
          {UserVideo}
        </Grid>
        {/*MESSAGE CHATTING */}
        <Grid
          style={{ position: "relative" }}
          item
          md={4}
          sm={12}
          xs={12}
          sx={{ mt: 1 }}
        >
          <Grid
            style={{ overFlowX: "hidden", overflowY: "auto" }}
            container
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "flex-start",
              height: 370,
            }}
            ref={chatboxRef}
          >
            {messages.length > 0 ? (
              messages.map((msg, i) => (
                <ListItem style={{ height: "fit-content" }}>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        "http://" +
                        window.location.hostname +
                        ":5000/images/" +
                        "avatar" +
                        (1 + Math.floor(Math.random() * 4)) +
                        ".png"
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    fullWidth
                    primary={msg.user}
                    secondary={msg.text}
                  />
                </ListItem>
              ))
            ) : (
              <div></div>
            )}
          </Grid>
          {/* <Grid style={{ position: "absolute", bottom: "0" }} container sx={{flexGrow: 1}} spacing={1}> */}
          <Grid container sx={{ flexGrow: 1, mt: 2 }} spacing={1}>
            <Grid item md={10} sm={10} xs={10}>
              <Input
                fullWidth
                placeholder="Send Message"
                inputProps={ariaLabel}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode == 13) handleSendMessage();
                }}
              />
            </Grid>
            <Grid item md={2} sm={2} xs={2}>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={handleSendMessage}
              >
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

BroadcasterVideoChat.propTypes = {
  user: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  addBroadcaster: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { setAlert, addBroadcaster })(
  BroadcasterVideoChat
);
