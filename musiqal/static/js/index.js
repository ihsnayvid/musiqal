let audio = document.querySelector("#song");
let playbutton = document.getElementById("play");
let shufflebutton = document.getElementById("shuffle");
let forwardbutton = document.getElementById("next");
let backbutton = document.getElementById("previous");
let slider = document.getElementById("musicSlider");
let lyrics = document.getElementById("lyrics");
// let listbutton = document.getElementById("listbutton");
// let songcover = document.getElementById("songcover");

let currentsong = 0;
let duration;
slider.min = 0;
slider.max = audio.duration;
const songlist = [
    {
        img: './images/apocalypse.jpg',
        name: 'Apocalypse',
        music: 'music/apocalypse.mp3'
    },
    {
        img: './images/blinding_lights.png',
        name: 'Blinding LIghts',
        music: 'music/blinding_lights.mp3'
    },
]

setInterval(setUpdate, 1000);

function shuffleArr(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
}

playbutton.addEventListener("click", () => {
    if (audio.paused == true || audio.currentTime <= 0) {
        audio.play();
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
    }
    else {
        audio.pause();
        play.classList.remove('fa-pause-circle');
        play.classList.add('fa-play-circle');
    }
    
    duration = audio.duration;
    slider.max = duration;
});

backbutton.addEventListener("click", () => {
    currentsong = currentsong - 1;
    if (currentsong == -1) currentsong = 6;

    audio.src = songlist[currentsong].music;
    songcover.src = songlist[currentsong].img;
    duration = audio.duration;
    slider.max = duration;
    slider.value = 0;
    audio.play();
});

forwardbutton.addEventListener("click", () => {
    currentsong = currentsong + 1;
    if (currentsong == 7) currentsong = 0;

    audio.src = songlist[currentsong].music;
    songcover.src = songlist[currentsong].img;
    duration = audio.duration;
    slider.max = duration;
    slider.value = 0;
    audio.play();
});

shufflebutton.addEventListener("click", () => {
    shuffleArr(songlist);
    currentsong = 0;
    audio.src = songlist[currentsong].music;
    songcover.src = songlist[currentsong].img;
    duration = audio.duration;
    slider.max = duration;
    slider.value = 0;
    audio.play();
});


slider.addEventListener("click", () => {
    audio.currentTime = slider.value;
})

function setUpdate() {
    let current = audio.currentTime;
    slider.value = current;
}