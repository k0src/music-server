async function get_music_list() {
    const response = await fetch('http://127.0.0.1:5000/music');
    const playlist = await response.json();
    const playlist_div = document.getElementById('playlist');
    playlist.forEach(song => {
        const btn = document.createElement('button');
        btn.innerHTML = song;
        btn.onclick = () => play_music(song);
        playlist_div.appendChild(btn);
    });
}

function play_music(song) {
    const audio = document.getElementById('audio');
    audio.src = `http://127.0.0.1:5000/play/${filename}`;
    audio.play();
}

document.addEventListener('DOMContentLoaded', get_music_list);