let audio = document.querySelector("#song");
let playbutton = document.getElementById("play");
let shufflebutton = document.getElementById("shuffle");
let forwardbutton = document.getElementById("next");
let backbutton = document.getElementById("previous");
let thumbnail = document.getElementById("thumbnail");
let slider = document.getElementById("musicSlider");
let lyrics = document.getElementById("lyrics");
let form = document.getElementById("search-form");
let cardthumbnail = Array.from(document.getElementsByClassName("card-thumbnail"));
let cards = Array.from(document.getElementsByClassName("card_custom"));
let lsongs = Array.from(document.getElementsByClassName("lsong-custom"));
// let listbutton = document.getElementById("listbutton");
// let songcover = document.getElementById("songcover");

let currentsong = 0;
let duration;
slider.min = 0;
slider.max = audio.duration;
const songlist = [{
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
    } else {
        audio.pause();
        play.classList.remove('fa-pause-circle');
        play.classList.add('fa-play-circle');
    }

    // thumbnail.src = cardthumbnail.src
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


cards.forEach(card => {
    card.addEventListener("click", () => {
        download_song(card.id, card.children[0].id);
        // thumbnail.src = cardthumbnail.src; //TODO:: fix update thumbnail
    })
});

lsongs.forEach(song => {
    song.addEventListener("click", () => {
        download_song(song.s_id);
    })
});

function setUpdate() {
    let current = audio.currentTime;
    slider.value = current;
}

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'fe4c8a33f4mshb03efeb944d6fb5p1954e8jsna74e41f4c88c',
        'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
    }
};

async function download_song(id, thumbnail_id) {
    url = `https://youtube-music1.p.rapidapi.com/get_download_url?id=${id}`;

    const res = await fetch(url, options);
    const data = await res.json();

    audio.src = data.result.download_url;
    audio.play();
    play.classList.remove('fa-play-circle');
    play.classList.add('fa-pause-circle');
    thumbnail.src = thumbnail_id;
}