const express = require("express");
const gTTS = require('gtts');

const app = express();

app.use(express.static("./public"));
app.use(express.json());

const PORT = 80;
app.listen(PORT, () => {
    console.log("Listening on port "+PORT);
});


// Loading page 
app.get("/", async (req, res) => {
    res.sendFile("./index.html");
});


const acceptedLangs = ["en", "es"];

// Handling request
app.post("/tts", (req, res) => {
    const { text, lang } = req.body;

    const speech = new gTTS(text, acceptedLangs.includes(lang)? lang : "en");

    speech.save(__dirname + "/tmp/speech.mp3", (err, result) => {
        if(err) {
            throw new Error(err);
        }

        res.sendFile(__dirname + "/tmp/speech.mp3");
    });
});
