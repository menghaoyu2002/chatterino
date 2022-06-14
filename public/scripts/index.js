if (sessionStorage.getItem('username')) {
    document.location.href = '/join.html';
}

const form = document.querySelector('form');

form.onsubmit = (event) => {
    event.preventDefault();
    const username = document.querySelector("input[type='text']").value;
    if (username) {
        sessionStorage.setItem('username', username);
        document.location.href = '/join.html';
    }
};
