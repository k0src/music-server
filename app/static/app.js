let playlist = [];
let current_index = -1;
let shuffle_mode = false;
let shuffled_playlist = [];

async function get_music_list() {
    try {
        const response = await fetch('http://127.0.0.1:5000/music');
        playlist = await response.json();
        const playlist_div = document.getElementById('playlist');
        playlist_div.innerHTML = '';
        
        playlist.forEach((song, index) => {
            const btn = document.createElement('button');
            btn.innerText = song;
            btn.onclick = () => {
                current_index = index;
                play_music(song);
            };
            playlist_div.appendChild(btn);
        });

        shuffled_playlist = [];
    } catch (error) {
        console.error('Error fetching music list:', error);
    }
}

function play_music(song) {
    const audio = document.getElementById('audio');
    audio.src = `http://127.0.0.1:5000/play/${song}`;
    audio.play();

    audio.onended = function() {
        if (shuffle_mode) {
            play_random();
        } else {
            play_next();
        }
    };
}

function play_next() {
    if (shuffle_mode) {
        if (shuffled_playlist.length === 0) {
            shuffled_playlist = [...playlist].sort(() => Math.random() - 0.5);
        }
        current_index = shuffled_playlist.indexOf(playlist[current_index]) + 1;
        if (current_index >= shuffled_playlist.length) {
            current_index = 0;
        }
        play_music(shuffled_playlist[current_index]);
    } else {
        if (current_index >= 0 && current_index < playlist.length - 1) {
            current_index++;
            play_music(playlist[current_index]);
        }
    }
}

function play_previous() {
    if (shuffle_mode) {
        if (shuffled_playlist.length === 0) {
            shuffled_playlist = [...playlist].sort(() => Math.random() - 0.5);
        }
        current_index = shuffled_playlist.indexOf(playlist[current_index]) - 1;
        if (current_index < 0) {
            current_index = shuffled_playlist.length - 1;
        }
        play_music(shuffled_playlist[current_index]);
    } else {
        if (current_index > 0) {
            current_index--;
            play_music(playlist[current_index]);
        }
    }
}

function play_random() {
    if (shuffled_playlist.length === 0) {
        shuffled_playlist = [...playlist].sort(() => Math.random() - 0.5);
    }

    current_index = Math.floor(Math.random() * shuffled_playlist.length);
    play_music(shuffled_playlist[current_index]);
}

function toggle_shuffle() {
    shuffle_mode = !shuffle_mode;
    if (shuffle_mode) {
        document.getElementById('shuffle-btn').classList.add('active');
    } else {
        document.getElementById('shuffle-btn').classList.remove('active');
    }
}

document.getElementById('forward-btn').addEventListener('click', play_next);
document.getElementById('back-btn').addEventListener('click', play_previous);
document.getElementById('shuffle-btn').addEventListener('click', toggle_shuffle);

document.addEventListener('DOMContentLoaded', get_music_list);