
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
 
const ChatMessage = require("./models/ChatMessage");
 
const app = express();
const PORT = 3000;
 

app.use(cors());
app.use(express.json());
 

mongoose.connect("Your MongoDB connection string", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
 

app.get("/messages", async (req, res) => {
    try {
        const messages = await ChatMessage.find();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
 
app.post("/messages", async (req, res) => {
    try {
        const { user, message } = req.body;
 
        if (!user || !message) {
            return res
                .status(400)
                .json({ error: "User and message are required" });
        }
 
        const chatMessage = new ChatMessage({
            user,
            message,
        });
 
        await chatMessage.save();
 
        res.status(201).json(chatMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});