let playlist = [];
let current_index = -1;

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
    } catch (error) {
        console.error('Error fetching music list:', error);
    }
}

function play_music(song) {
    const audio = document.getElementById('audio');
    audio.src = `http://127.0.0.1:5000/play/${song}`;
    audio.play();

    audio.onended = function() {
        if (current_index + 1 < playlist.length) {
            current_index++;
            play_music(playlist[current_index]);
        }
    };
}

function play_next() {
    if (current_index >= 0 && current_index < playlist.length - 1) {
        current_index++;
        play_music(playlist[current_index]);
    }
}

function play_previous() {
    if (current_index > 0) {
        current_index--;
        play_music(playlist[current_index]);
    }
}

document.getElementById('forward-btn').addEventListener('click', play_next);
document.getElementById('back-btn').addEventListener('click', play_previous);

document.addEventListener('DOMContentLoaded', get_music_list);