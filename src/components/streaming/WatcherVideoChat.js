import React, { useEffect, useState, useRef, Suspense } from "react";
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
import PresentIcon from "@mui/icons-material/PresentToAll";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import io from "socket.io-client";
import Constants from "../../constants/Constants";
import axios from "axios";
import Alert from "@mui/material/Alert";
import ShopIcon from "@mui/icons-material/Shop";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";

const ariaLabel = { "aria-label": "description" };

var timeCounter = 0;
var initialTime;

const WatcherVideoChat = ({ user, roomid }) => {
  const socket = useRef();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [flag, setFlag] = useState(false);
  const [time, setTime] = useState(0);
  const [watching, setWatching] = useState(true);
  const userVideo = useRef();
  const timeShow = useRef();
  const [buyTime, setBuyTime] = useState(1);

  let intervalRef = useRef();
  const navigate = useNavigate();

  let peerConnection;
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
    socket.current = io.connect(`${Constants.USER_SERVER_SOCKET_IO_URL}`, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    socket.current.emit(
      "login",
      { name: user && user.firstname + " " + user.lastname, room: roomid },
      (error) => {
        if (error) console.log(error);
      }
    );

    socket.current.on("message", (msg) => {
      console.log(msg);
      setMessages((messages) => [...messages, msg]);
    });

    socket.current.on("notification", (msg) => {});

    socket.current.on("offer", (id, description) => {
      peerConnection = new RTCPeerConnection(config);
      peerConnection
        .setRemoteDescription(description)
        .then(() => peerConnection.createAnswer())
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.current.emit("answer", id, peerConnection.localDescription);
        });
      peerConnection.ontrack = (event) => {
        try {
          userVideo.current.srcObject = event.streams[0];
          setWatching(true);
        } catch (e) {
          setWatching(false);
          console.log(e);
        }
        // peerConnection.ontrack.onunmute = () => console.log("Audio data arriving!");
      };
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.current.emit("candidate", id, event.candidate);
        }
      };
    });

    socket.current.on("candidate", (id, candidate) => {
      peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((e) => {
          setWatching(false);
          console.error(e);
        });
    });

    socket.current.on("connect", () => {
      socket.current.emit("watcher", roomid);
    });

    socket.current.on("broadcaster", () => {
      socket.current.emit("watcher", roomid);
    });

    window.onunload = window.onbeforeunload = () => {
      setWatching(false);
      socket.current.close();
      peerConnection.close();
    };

    intervalRef.current = setInterval(timeCount, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const timeCount = () => {
    if (watching) setTime((prev) => prev - 1);
    timeCounter++;
    console.log(initialTime, timeCounter);

    if (user != null)
      axios
        .post(`${Constants.USER_SERVER_URL}/api/watchingtime`, {
          streamer: roomid,
          watcher: user && user._id,
          time: initialTime - timeCounter,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user == null) setFlag(!flag);
    else {
      axios
        .get(
          `${Constants.USER_SERVER_URL}/api/watchingtime/${roomid}/${user._id}`,
          {
            streamer: roomid,
            watcher: user && user._id,
          }
        )
        .then((response) => {
          console.log(response.data.time);
          initialTime = response.data.time;
          setTime(response.data.time);
        })
        .catch((err) => console.log(err));
    }
  }, [flag]);

  let UserVideo;

  UserVideo = (
    <video
      width="100%"
      height="100%"
      style={{ border: "solid" }}
      playsInline
      muted
      ref={userVideo}
      autoPlay
    />
  );

  const onBuyTime = (e) => {
    setBuyTime(e.target.value);
  };

  const handleBuy = (e) => {
    e.preventDefault();

    navigate(`/stripepayment/${roomid}/${user && user._id}/0/${buyTime / 5}`);

    axios
      .post(`${Constants.USER_SERVER_URL}/api/payment`, {
        from: user && user._id,
        to: roomid,
        amount: buyTime / 5,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .post(`${Constants.USER_SERVER_URL}/api/watchingtime`, {
        streamer: roomid,
        watcher: user && user._id,
        time: time + buyTime * 60,
      })
      .then((response) => {
        console.log(response.data);
        setTime(setTime((prev) => prev + buyTime * 60));
      })
      .catch((err) => console.log(err));

    timeCounter = 0;
  };

  return (
    <React.Fragment>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "space-evenly", flexGrow: 1 }}
      >
        <Button
          href="#"
          variant="outlined"
          sx={{ mt: 1 }}
          startIcon={<FavoriteBorderIcon />}
        >
          Add to favourite
        </Button>
      </Grid>
      <Grid container spacing={2} sx={{ flexGrow: 1, mt: 1 }}>
        <Grid
          style={{ position: "relative" }}
          item
          md={8}
          sm={12}
          xs={12}
          sx={{ mt: 1 }}
        >
          {UserVideo}
          {/* <Grid style={{ position: "absolute", bottom: "0" }} container sx={{display: 'flex', justifyContent: 'space-evenly', flexGrow: 1}} spacing={1}> */}
        </Grid>
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
          >
            {messages.length > 0 ? (
              messages.map((msg, i) => (
                <ListItem style={{ height: "fit-content" }}>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={`${Constants.USER_SERVER_URL}/images/avatar1.png`}
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
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexGrow: 1,
          mt: 5,
        }}
        md={10}
      >
        <Button variant="contained" mr={3} sx={{ mt: 1 }}>
          {time < 0 ? 0 : time} s Left
        </Button>
        <Input
          defaultValue="1"
          value={buyTime}
          placeholder="Input Minutes"
          type="number"
          endAdornment={<InputAdornment position="end">minute</InputAdornment>}
          inputProps={ariaLabel}
          onChange={onBuyTime}
          minValue="1"
        />
        <Button
          variant="outlined"
          sx={{ mt: 1 }}
          startIcon={<ShopIcon />}
          onClick={handleBuy}
        >
          Buy ${buyTime / 5}
        </Button>
      </Grid>
    </React.Fragment>
  );
};

WatcherVideoChat.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(WatcherVideoChat);
