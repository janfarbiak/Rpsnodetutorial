
const sock = io();

window.addEventListener('unload', () => {
    sock.emit('disconnect');
});

const writeEvent = (text) => {
    const parent = document.querySelector('#events');

    

    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
    parent.scrollTop = parent.scrollHeight;
};

const onFormSubmitted = (e) => {
    e.preventDefault();

    if(document.forms['chat-form']['chat'].value == ""){
        alert("empty");
    }else{
        const input = document.querySelector('#chat');
        const text = input.value;

        input.value = '';

        sock.emit('message', text);
    }
};

writeEvent("Welcome human");
sock.on('message', writeEvent);

document.querySelector('#chat-form').addEventListener('submit', onFormSubmitted);