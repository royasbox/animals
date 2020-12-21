// List of animals
let animalList = [
    "cat",
    "dog",
    "horse",
    "lion",
    "owl",
    "pig",
    "chicken",
    "cow"
];

// To keep track of number of times each animal audio file is played
let animalCount = {
    "cat": 0,
    "dog": 0,
    "horse": 0,
    "lion": 0,
    "owl": 0,
    "pig": 0,
    "chicken": 0,
    "cow": 0,
};

let playBackRate = 1;
let nAnimalSounds = 10;

// Inspired by https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
let getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
};

// Inspired by https://stackoverflow.com/questions/27363891/javascript-play-audio-one-after-another-html5
let playAudio = function () {
    // Randomly select the first animal and play its audio file
    let animalId;
    animalId = getRandomInt(animalList.length);
    animalCount[animalList[animalId]] += 1;
    let audio = new Audio(`audio/${animalList[animalId]}.mp3`);
    audio.playbackRate = playBackRate;
    audio.play();

    // Play the remaining randomly selected animal audios one after the other
    let counter = 1;
    audio.onended = function () {
        if (counter < nAnimalSounds) {
            animalId = getRandomInt(animalList.length);
            animalCount[animalList[animalId]] += 1;
            audio.src = `audio/${animalList[animalId]}.mp3`;
            audio.playbackRate = playBackRate;
            audio.play();
            counter++;
        };
    };
};

let playButton = document.querySelector("#play");
playButton.addEventListener("click", playAudio);

// Functions to keep track of animal clicks
let clicksCat = 0;
let onClickCat = function () {
    clicksCat += 1;
    document.querySelector("#clicksCat").innerHTML = clicksCat;
};

let clicksDog = 0;
let onClickDog = function () {
    clicksDog += 1;
    document.querySelector("#clicksDog").innerHTML = clicksDog;
};

let clicksHorse = 0;
let onClickHorse = function () {
    clicksHorse += 1;
    document.querySelector("#clicksHorse").innerHTML = clicksHorse;
};

let clicksLion = 0;
let onClickLion = function () {
    clicksLion += 1;
    document.querySelector("#clicksLion").innerHTML = clicksLion;
};

let clicksOwl = 0;
let onClickOwl = function () {
    clicksOwl += 1;
    document.querySelector("#clicksOwl").innerHTML = clicksOwl;
};

let clicksPig = 0;
let onClickPig = function () {
    clicksPig += 1;
    document.querySelector("#clicksPig").innerHTML = clicksPig;
};

let clicksChicken = 0;
let onClickChicken = function () {
    clicksChicken += 1;
    document.querySelector("#clicksChicken").innerHTML = clicksChicken;
};

let clicksCow = 0;
let onClickCow = function () {
    clicksCow += 1;
    document.querySelector("#clicksCow").innerHTML = clicksCow;
};

// Inspired by https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
let titleCase = function (str) {
    str = str.toLowerCase().split(' ');
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    };
    return str.join(' ');
};

// Compare the user counts with the actual animal counts to check whether the user won or lost
let sumCounts = 0;
let getResult = function () {
    let i;
    let counted;
    for (i = 0; i < animalList.length; i++) {
        counted = parseInt(document.querySelector(`#clicks${titleCase(animalList[i])}`).innerHTML);
        sumCounts += counted;
        if (animalCount[animalList[i]] != counted) {
            document.querySelector("#status").innerHTML = "Oh No! You Counted Wrong! Hit Play and Try Again!";
            return;
        };
    };
    
    if (sumCounts == 0) {
        document.querySelector("#status").innerHTML = "Hit Reset then Play to Start!";
    } else {
        document.querySelector("#status").innerHTML = "You Found All the Animals! You Win!";
    };

};

let resultButton = document.querySelector("#results");
resultButton.addEventListener("click", getResult);