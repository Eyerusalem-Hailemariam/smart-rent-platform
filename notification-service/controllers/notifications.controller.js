let ioInstance;

const setSocketInstance = (io) => {
    ioInstance = io;
}

const sendNotification = (req, res) => {
    const { toUserId, message } = req.body;
    if (!toUserId || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if(!ioInstance) {
        return res.status(500).json({ error: 'Socket.io not initialized' });
    }
    ioInstance.to(toUserId).emit('notification', { message });
    return res.status(200).json({ success: true });
}

module.exports = {sendNotification, setSocketInstance};

