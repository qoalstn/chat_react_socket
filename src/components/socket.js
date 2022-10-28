import React from 'react';
import socketio from "socket.io-client";
// import { SOCKET_URL } from "config";

// export const socket = io('localhost:5000');

export const initiateSocketConnection = (token) => {
    // if (socket) return
    console.log('토큰 : ', token)
    const socket = socketio('http://localhost:8080/chat', {
        transports: ['websocket'],
        auth: { token }
    });
    socket.connect()
    console.log(`Connecting socket...`);
}

export const getSocket = () => {
    const token = localStorage.getItem('login-token')
    if (token) {
        return socketio.connect('http://localhost:8080/chat', {
            transports: ['websocket'],
            // query: { token }
            auth: { token }
        });
    }
    return socketio.connect('http://localhost:8080/chat', {
        transports: ['websocket'],
    });
};

// export const disconnectSocket = () => {
//     if (socket == null || socket.connected === false) {
//         return;
//     }
//     socket.disconnect();
//     socket = undefined;
// };

export const SocketContext = React.createContext()