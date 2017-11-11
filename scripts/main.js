const HOST = location.origin.replace(/^http/, 'ws')
let socket = io.connect(HOST);
let wordsTimer = null;
let currentWord = '';
let loadedWord = '';
let words = [
    {
        "splited" : ["mple", "exa"],
        "correct" : "example",
    },
    {
        "splited" : ["ca", "tion", "edu"],
        "correct" : "education",
    },
];

console.log(words);

$('#commandInput').keypress(function(e) {
    if(e.which == 13) {
        processCommand($(this).val());
        $(this).val('');
    }
});


let processCommand = (text) => {
    console.log(text);
    let tokens = text.split(' ');
    if(tokens.length > 0){
        if(tokens[0] == 'git') {
            if(tokens[1] == 'add') {
                createjs.Sound.play("add");
                currentWord += loadedWord.splited[tokens[2]];
            }
            else if(tokens[1] == 'commit') {
                if(loadedWord.correct == currentWord) {
                    console.log('correct!!');
                }
                else{
                    console.log('wrong!!');
                }
                currentWord = '';
                showWord();
            }
        }
    }
};

let showWord = () => {
    let randomWord = words[parseInt(Math.random() * 1000) % words.length];
    loadedWord = randomWord;
    console.log(randomWord);
};

let startGame = () => {
    createjs.Sound.play("start");
    $('#startGame').hide();
    $('#gameScreen').show();
    let playerName = $('#nickNameInput').val();
    socket.emit('playerConnect', playerName);
    /*wordsTimer = window.setInterval(() => {
        showWord();
    }, 5000);*/
    showWord();
};

let loadSound = () => {
    createjs.Sound.registerSound("/assets/sounds/start.ogg", "start");
    createjs.Sound.registerSound("/assets/sounds/add.ogg", "add");
}

socket.on('connect', function(data) {
        
});