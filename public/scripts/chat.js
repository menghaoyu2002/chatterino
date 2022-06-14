const username = sessionStorage.getItem('username');

// ensure that the user has a username to access this page.
if (!username) {
    document.location.href = '/';
}

const roomid = window.getQueryStringParams().roomid;
const socket = io();
const chat = document.querySelector('.chat');
const sendButton = document.querySelector('form button');
sendButton.onclick = (event) => {
    event.preventDefault();
    const message = document.querySelector('form input');
    console.log(message.value);
    socket.emit('message_sent', message.value);
    message.value = '';
};

setHeader();
logRoomId();
connect();

function logRoomId() {
    console.log(
        roomid
            ? `roomid: ${roomid}`
            : 'there is no roomid, new room will be created'
    );
}

function connect() {
    socket.auth = {
        username: username,
        roomid: roomid,
    };
    socket.connect();
}

function setHeader() {
    const mainHeader = document.querySelector('h1');
    mainHeader.innerText = `Chat Room: ${window.getQueryStringParams().roomid}`;
}

socket.on('connect', () => {
    // if there is no roomid create a new room, i.e. join the client's own room.
    // user is automatically connected to the roomid room in the backend.
    if (!roomid) {
        document.location.href = `/chat.html?roomid=${socket.id}`;
    }
});

socket.on('message', ({ message, from }) => {
    const newMessage = document.createElement('li');
    newMessage.innerText = `${from}: ${message}`;
    chat.appendChild(newMessage);
    newMessage.scrollIntoView();
});
