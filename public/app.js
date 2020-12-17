const input = document.querySelector("#input");


const clearBtn = document.querySelector(".clearBtn");

clearBtn.onclick = () => {
    const cnfrm = confirm("Are you sure you want to clear out the input field?");

    if(cnfrm) {
        input.value = "";
    }
}


var objURL;

const playback = document.querySelector("#playback");
const sendBtn = document.querySelector(".sendBtn");
const output = document.querySelector(".output");
const lang = document.querySelector("#lang");

sendBtn.onclick = sendText;

async function sendText() {
    sendBtn.onclick = undefined;
    output.innerHTML = "<div class='loader'></div>";

    try {
        const response = await fetch("/tts", {
            method: "POST", 
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                text: input.value,
                lang: lang.value
            })
        });

        const file = await response.blob();
        objURL = window.URL.createObjectURL(file);


        // Deciding if user wants playback or not
        if(playback.checked) {
            const audio = new Audio();

            audio.oncanplaythrough = () => {
                audio.play();
            }

            audio.src = objURL;
        }
        
        output.innerHTML = 
        `
            <audio controls src="${ objURL }"></audio>
            <a download href="${ objURL }" class="downloadBtn">Download File</a>
        `;  
        
    } catch (err) {
        console.log(err);
        output.innerHTML = "<span style='color: red; font-size: 18px'>There was en error sending the request. Either you or the server are probably offline.</span>";
   
    } finally {
        sendBtn.onclick = sendText;
    }
}