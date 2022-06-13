if (!localStorage.getItem('username')) {
    document.location.href = '/';
}

const mainText = document.querySelector('h1');
mainText.innerText = `Hi ${localStorage.getItem('username')}!`;
