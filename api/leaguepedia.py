import mwclient
import json

"""
The api from leaguepedia fetches general information about teams, and score board for game
"""
class LeaguePediaScraper:
    def __init__(self):
        self._site = None

    def loadSite(self):
        if not self._site:
            self._site = mwclient.Site('lol.fandom.com', path='/')

    def getPlaces(self):
        self.loadSite()
        response = self._site.api('cargoquery', 
                            limit = 'max', 
                            tables = "TournamentResults=TR", 
                            fields = "TR.Event, TR.Team, TR.Place",
                            where = "TR.Event = 'MSI 2021'"
        )
        return response['cargoquery']

    def getTeamList(self):
        placeList = self.getPlaces()
        # teamList = []
        # for item in placeList:
        #     teamList.append(list(list(item.values())[0].values())[1])
        # return list(filter(lambda x: len(x) > 0, teamList))
        return [json.loads(json.dumps(record))["title"]["Team"] for record in placeList]

    def getScoreboard(self, teamname):
        self.loadSite()
        response = self._site.api('cargoquery',
                                limit = 'max',
                                tables = "ScoreboardGames=SG, ScoreboardPlayers=SP",
                                join_on = "SG.UniqueGame=SP.UniqueGame",
                                fields = "SG.Tournament, SG.DateTime_UTC, SG.Team1, SG.Team2, SG.Winner, SG.Patch, SP.Link, SP.Team, SP.Champion, SP.SummonerSpells, SP.KeystoneMastery, SP.KeystoneRune, SP.Role, SP.UniqueGame, SP.Side",
                                where = f"SG.Tournament = 'MSI 2021' AND SG.Team1 = '{teamname}'"
        )
        return response['cargoquery']

    def getTeamInfo(self, teamname):
        self.loadSite()
        response = self._site.api('cargoquery', 
                            limit = 'max', 
                            tables = "Teams=T", 
                            fields = "T.Name, T.OverviewPage, T.Short, T.Region, T.Twitter, T.Youtube, T.Instagram, T.Facebook, T.Website, T.RosterPhoto",
                            where = f"T.Name = '{teamname}'"
        )
        return response['cargoquery']

leaguepedia = LeaguePediaScraper()