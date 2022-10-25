
const sock = io();

window.addEventListener('unload', () => {
    sock.emit('disconnect');
});

const writeEvent = (text) => {
    const parent = document.querySelector('#events');

    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
};

const onFormSubmitted = (e) => {
    e.preventDefault();
    
    const input = document.querySelector('#chat');
    const text = input.value;

    input.value = ' ';

    sock.emit('message', text);
};

writeEvent("Welcome human");
sock.on('message', writeEvent);

document.querySelector('#chat-form').addEventListener('submit', onFormSubmitted);