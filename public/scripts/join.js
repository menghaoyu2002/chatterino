if (!sessionStorage.getItem('username')) {
    document.location.href = '/';
}

const mainText = document.querySelector('h1');
const changeName = document.querySelector('.changeName');
const options = document.querySelector('.options');
const joinButton = options.firstElementChild;
const createButton = options.lastElementChild;
const roomCodeForm = document.querySelector('form');
const backButton = document.querySelector("input[value='Back']");
const goButton = document.querySelector("input[value='Go'");

mainText.innerText = `Hi ${sessionStorage.getItem('username')}!`;

changeName.onclick = () => {
    sessionStorage.removeItem('username');
    document.location.href = '/';
};

joinButton.onclick = () => {
    console.log('join clicked');
    options.style.display = 'none';
    roomCodeForm.style.display = 'block';
};

createButton.onclick = () => {
    console.log('create clicked');
    document.location.href = '/chat.html';
};

backButton.onclick = (event) => {
    event.preventDefault();
    options.style.display = 'flex';
    roomCodeForm.style.display = 'none';
};

goButton.onclick = (event) => {
    event.preventDefault();
    const roomid = document.querySelector("input[type='text']").value;
    document.location.href = `/chat.html?roomid=${roomid}`;
};
