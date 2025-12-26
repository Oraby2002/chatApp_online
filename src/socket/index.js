const { Server } = require("socket.io");
const chatSocket = require('./chat.socket');

module.exports = (server) => {
        console.log(' Initializing Socket.IO...');  // أضف log للتأكد

    const io = new Server(server, {
        cors: { origin: "*",         }

    });
    chatSocket(io);
        console.log(' Socket.IO initialized');

};