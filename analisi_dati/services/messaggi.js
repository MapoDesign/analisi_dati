// This file is designed to handle message-related functionalities. 
// It may export functions such as sendMessage and getMessages to manage messages in the application.

const messages = [];

// Function to send a message
function sendMessage(sender, recipient, content) {
    const message = {
        id: generateId(),
        sender,
        recipient,
        content,
        timestamp: new Date()
    };
    messages.push(message);
    return message;
}

// Function to get messages for a specific user
function getMessages(user) {
    return messages.filter(message => message.recipient === user || message.sender === user);
}

// Utility function to generate a unique ID for messages
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

module.exports = {
    sendMessage,
    getMessages
};