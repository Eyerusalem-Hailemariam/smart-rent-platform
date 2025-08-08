module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        //users joins their private room
        socket.on('join', (userId)=> {
            socket.join(userId);
            console.log('User ${userId} joined their room');
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });

    });

};




