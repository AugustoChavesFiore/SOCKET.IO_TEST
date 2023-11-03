import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server(server, {
    cors:{
        origin:'*',
    }
})

io.on('connection', (socket) => {
    console.log(`User Connected`);
    socket.on('message', (data) => {
        io.emit('message', data)
    })

})

server.listen(4000, () => {
    console.log('listening on *:4000');
})