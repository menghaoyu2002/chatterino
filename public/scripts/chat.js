const mainHeader = document.querySelector('h1');

mainHeader.innerText = `Chat Room: ${window.getQueryStringParams().roomid}`;
