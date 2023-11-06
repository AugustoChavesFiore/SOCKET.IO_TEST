import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const PORT = process.env.PORT || 4000
const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server(server, {
    cors:{
        origin:'*',
    }
})
const SaveMessage = []
io.on('connection', (socket) => {
    console.log(`User Connected`);
    console.log(SaveMessage);

    SaveMessage.forEach(message => {
        socket.emit('message', message)
    });

    socket.on('message', (data) => {
        SaveMessage.push(data)
        console.log(data);
        io.emit('message', data)
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });

})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
server.listen(PORT, () => {
    console.log('listening on *:4000');
})