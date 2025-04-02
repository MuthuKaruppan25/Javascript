const chatbox = document.getElementById("chat-window");
const chatInput = document.getElementById("field-input");
const chatBtn = document.getElementById("input-btn");

chatBtn.addEventListener("click",()=>sendMessage());
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function addMessage(message,user){
    const msgDiv = document.createElement('div');
    msgDiv.classList.add("message",user);
    const timeOptions = { hour: '2-digit', minute: '2-digit' }; 
    const formattedTime = new Date().toLocaleTimeString([], timeOptions);
    msgDiv.innerHTML = `${message} <div class='timestamp'>${formattedTime}</div>`;
    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function sendMessage(){
    const text = chatInput.value.trim();
    if(text === ""){
        return;
    }
    else{
        addMessage(text,"user");
    }
    chatInput.value="";
    setTimeout(()=>botReply(),1000);
}

function botReply(){
    const responses = [
        "Hello! How can I help?",
        "That's interesting!",
        "Can you tell me more?",
        "I'm just a bot, but I'm listening!",
        "Nice to chat with you!"
    ];
    const randommessage = responses[Math.floor(Math.random() * responses.length)];
    addMessage(randommessage,"bot");

}
