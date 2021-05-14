from flask import Flask, redirect
from msibootcamp import MsiBootcamp


app = Flask(__name__)

@app.route('/api', methods=['GET'])
def index():
    return {
        'name': ["Caitlyn", "Anne", "test"]
    }

@app.route('/home', methods=['GET'])
def getPlayerList():
    msiBootcampStats = MsiBootcamp()
    return { "data": msiBootcampStats.getPlayerList()}

@app.route('/home/<string:name>', methods=['GET'])
def getTeamOrPlayer(name):
    msiBootcampStats = MsiBootcamp()
    return { "data": msiBootcampStats.getByTeamOrPlayer(name)}

@app.route('/player/<string:playername>')
def redirectPlayer(playername):
    return redirect(f"https://www.trackingthepros.com/player/{playername}/")

if __name__ == '__main__':
    app.run(debug=True)