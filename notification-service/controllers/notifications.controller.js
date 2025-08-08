const Notification = require('../models/notification.model.js');
let ioInstance;

const setSocketInstance = (io) => {
    ioInstance = io;
}

const sendNotification = async (req, res) => {
    const { toUserId, message } = req.body;

    try {
         if (!toUserId || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const notification = await Notification.create({
            userId: toUserId,
            message: message,
        });

         if(!ioInstance) {
            return res.status(500).json({ error: 'Socket.io not initialized' });
        }

        ioInstance.to(toUserId).emit('notification', { message });
        return res.status(200).json({ success: true });
    
    }catch(error) {
        console.error("Error sending notification:", error);
        return res.status(500).json({ error: 'Internal server error' });    
    }
}

const getNotifications = async(req, res) => {
    const {userId} = req.params;

    try {
        const notifications = await Notification.find({ userId}).sort({ createdAt: -1 });
        
        return res.status(200).json({ notifications });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {sendNotification, setSocketInstance, getNotifications};

