from flask import Flask, send_file, jsonify, request
import os

app = Flask(__name__, static_url_path="", static_folder="static")
MUSIC_DIR = "/home/k0/Documents/music-server/music"

def get_file():
    files = []
    for file in os.listdir(MUSIC_DIR):
        if file.endswith(("mp3", "wav", "flac")):
            files.append(file)
    return files

@app.route("/")
def index():
    return app.send_static_file("index.html")
    

@app.route("/music")
def list_music():
    files = get_file()
    return jsonify(files)

@app.route("/play/<filename>")
def play_music(filename):
    file_path = os.path.join(MUSIC_DIR, filename)
    if os.path.exists(file_path):
        return send_file(file_path)
    else:
        return "File not found", 404

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)