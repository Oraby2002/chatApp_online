const jwt = require('jsonwebtoken');

const users = {};

module.exports = (io) => {

    io.use((socket, next) => {
        if(!socket.handshake.auth.token) {
            return next(new Error('Authentication error'));
        }
        const token = socket.handshake.auth.token;

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.username = decoded.username;
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
        });

    io.on('connection', (socket) => {

        users[socket.id] = socket.username;
        console.log("user socket id", socket.id, socket.username);
       
       
       
        io.emit('users', users);

        socket.on('privateMessage', ({to ,message}) => {
            io.to(to).emit('message', {
                from: socket.username,
                message
            });
        });

        socket.on('disconnect', () => {
            delete users[socket.id];
            io.emit('users', users);
        });
    });
}