if (localStorage.getItem('username')) {
    document.location.href = '/join.html';
}

const socket = io({ autoConnect: false });
const form = document.querySelector('form');

form.onsubmit = (event) => {
    event.preventDefault();
    const username = document.querySelector('input').value;
    socket.auth = { username };
    socket.connect();
    localStorage.setItem('username', username);
    document.location.href = '/join.html';
};

socket.on('connect_error', (err) => {
    if (err.message === 'invalid username') {
        localStorage.removeItem('username');
    }
});
