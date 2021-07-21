import React from "react";
import io from "socket.io-client";
import { store } from "@redux/stores";
import JwtDecode from "jwt-decode";
import { addNewMessageAction } from "@redux/actions";

export const socket = io("http://192.168.2.21:3000", {
  jsonp: false,
  transports: ["websocket"],
  forceBase64: true,
  reconnection: true,
  reconnectionDelay: Infinity
});
// socket.connect();
// socket.on("connect", async () => {
//   const state = await store.getState();
//   const {
//     auth: { token }
//   } = state;
//   const user = await JwtDecode(token);
//   const data = {
//     socketId: socket.id,
//     userId: user && user.id
//   };
//   socket.emit("authenticate", data);
//   socket.on("messages", message => {
//     store.dispatch(addNewMessageAction(message));
//   });
// });

export const SocketContext = React.createContext();
