import requests
import json
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import Select
import time

"""
TODO:
1. selenium scraping for play stats for each player
2. api integration
"""
class WanPlusMsi():
    def __init__(self):
        _PATH = 'C:/Program Files (x86)/chromedriver.exe'
        # _site = 'http://www.wanplus.com/ajax/stats/list'
        opt = webdriver.ChromeOptions()
        opt.add_argument('--headless')
        self.driver = webdriver.Chrome(_PATH, options=opt)
        self.driver.get("http://www.wanplus.com/lol/teamstats")
        time.sleep(3)
        selectEvent = Select(self.driver.find_element_by_name('event'))
        selectEvent.select_by_value("1035")

    def getAllTeamStats(self):
        # table 1 for attacking and gold collecting is arranged as:
        # | order | teamname | kda | killsPergame | deathsPergame | damagetoheroPermin | fstbloodpercentage | avgDuration | goldpermatch |
        # table 2 for warding and resource control is arranged as:
        # | order | teamname | dragonkillsPergame | dragonkillspercentage | baronkillsPergame | baronkillspercentage | wardsplacedpermin | wardskilledpermin | wardskilledrate | towertakensPergame | towerdeathsPergame |
        table1 = self.tableToArray()
        tab2 = self.driver.find_element_by_class_name('detail-list-title').find_elements_by_css_selector('div')[1]
        tab2.click()
        table2 = self.tableToArray()
        return [table1, table2]

    def tableToArray(self):
        teamStats = []
        dataTable = self.driver.find_element_by_id('DataTables_Table_0')
        lines = dataTable.find_elements_by_css_selector('tr')
        for line in lines:
            data = line.find_elements_by_css_selector('td')
            if len(data) != 0:
                team = []
                for item in data:
                    if item.text != '':
                        team.append(item.text)
                teamStats.append(team)
        return teamStats

wanplusmsi = WanPlusMsi()
# print(wanplusmsi.getAllTeamStats())