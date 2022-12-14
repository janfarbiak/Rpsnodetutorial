const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "web_chat_app"
});

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);
io.on('connection', (sock) => {
    console.log("Someone connected");
    sock.emit('message' , 'Hi, you are connected!');

    sock.on('message', (text) => {
        io.emit('message', text);
    });

    sock.on('disconnect', () => {
        console.log("Someone disconnected");
    });
});

server.on('error', (err) => {
    console.error("Server error: ", err);
});

server.listen(8080, () => {
    console.log("RPS started on 8080");
});