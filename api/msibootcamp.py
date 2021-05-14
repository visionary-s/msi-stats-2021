import requests
import json
from bs4 import BeautifulSoup

class MsiBootcamp():
    def __init__(self):
        _site = 'https://www.trackingthepros.com/d/list_bootcamp'
        try:
            res = requests.get(_site)
            if res.status_code == 200:
                html = res.text
        except res.RequestException:
            html = None
            print(f"Failed to fetch data from {_site}")

        self.soup = BeautifulSoup(html, 'html.parser')

    def latin_escape(self, s):
        s = s.replace('\u0130', 'I')
        return s

    def getByTeamOrPlayer(self, key):
        res = []
        if not key:
            return self.getAll()
        else:
            for player in self.getAll():
                if player["name"] == key or player["team"] == key:
                    res.append(player)
        return res

    def getAll(self):
        allStats = []
        rawData = json.loads(self.soup.get_text().encode('utf-8'))["data"]
        for item in rawData:
            allStats.append({
                "summoner": item["summoner"][0: -5],
                "playerId": item["DT_RowId"],
                "name": item["plug"],
                "team": item["team"][1: -4],
                "teamFull": self.latin_escape(item["team_plug"]),
                "role": item["role"],
                "winper": item["winper"],
                "wins": item["wins"],
                "losses": item["losses"],
                "rankNum": item["rankNum"],
                "rankHigh": item["rankHigh"],
                "lp": item["rankHighLPNum"]
            })
        return allStats

    def getPlayerList(self):
        allData = self.getAll()
        lst = []
        for player in allData:
            if player["name"] not in lst:
                lst.append(player["name"])
        return lst

bootcampstats = MsiBootcamp()