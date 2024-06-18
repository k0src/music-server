from flask import Flask, send_file, jsonify, request
import os

app = Flask(__name__)
MUSIC_DIR = "/home/k0/Documents/music-server/music"

def get_file():
    files = []
    for file in os.listdir(MUSIC_DIR):
        if file.endswith(("mp3", "wav", "flac")):
            files.append(file)
    return files

@app.route("/music")
def list_music():
    files = get_file()
    return jsonify(files)

@app.route("/play/<filename>")
def play_music(filename):
    return send_file(f"{MUSIC_DIR}/{filename}")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)