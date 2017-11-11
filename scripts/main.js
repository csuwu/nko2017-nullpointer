const HOST = location.origin.replace(/^http/, 'ws')
let socket = io.connect(HOST);
let wordsTimer = null;
let currentWord = '';
let loadedWord = '';
let words = [
    {
        "splited" : ["mple", "exa"],
        "correct" : "example",
        "points" : 2,
    },
    {
        "splited" : ["ca", "tion", "edu"],
        "correct" : "education",
        "pointes" : 3,
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
    $('#startGame').hide();
    $('#gameScreen').show();
    let playerName = $('#nickNameInput').val();
    socket.emit('playerConnect', playerName);
    /*wordsTimer = window.setInterval(() => {
        showWord();
    }, 5000);*/
    showWord();
};

socket.on('connect', function(data) {
        
});