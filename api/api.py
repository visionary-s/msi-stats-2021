from flask import Flask, redirect
from msibootcamp import MsiBootcamp
from wanplus import WanPlusMsi, STATIC_DATA

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def index():
    return {
        'name': ["Caitlyn", "Anne", "test"]
    }

@app.route('/api/playerlist', methods=['GET'])
def getPlayerList():
    msiBootcampStats = MsiBootcamp()
    return { "data": msiBootcampStats.getPlayerList()}

@app.route('/api/<string:name>', methods=['GET'])
def getTeamOrPlayer(name):
    msiBootcampStats = MsiBootcamp()
    return { "data": msiBootcampStats.getByTeamOrPlayer(name)}

@app.route('/player/<string:playername>')
def redirectPlayer(playername):
    return redirect(f"https://www.trackingthepros.com/player/{playername}/")

@app.route('/api/gamestats')
def getAllGameStats():
    # wanplusmsi = WanPlusMsi()
    # return {"data": wanplusmsi.getAllStats()}
    return STATIC_DATA

if __name__ == '__main__':
    app.run(debug=True)