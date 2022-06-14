const username = sessionStorage.getItem('username');
const roomid = window.getQueryStringParams().roomid;
const socket = io();

// ensure that the user has a username to access this page.
if (!username) {
    document.location.href = '/';
}

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

socket.on('connect', () => {
    // if there is no roomid create a new room, i.e. join the client's own room.
    // user is automatically connected to the roomid room in the backend.
    if (!roomid) {
        document.location.href = `/chat.html?roomid=${socket.id}`;
    }
});
