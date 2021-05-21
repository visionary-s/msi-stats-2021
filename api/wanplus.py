import requests
import json
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import Select
import time

"""
This api mainly focus on fetching the performance measurement statistics on msi play.
It wont be intergrated to frontend api currently as the server response from wanplus is very slow.
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
        tab = self.driver.find_element_by_class_name('detail-list-title').find_elements_by_css_selector('div')[1]
        tab.click()
        table2 = self.tableToArray()
        return [table1, table2]

    def getAllPlayerStats(self):
        # table 3 for k/d/a statistics is arranged as:
        # | order | playername | teamname | role | appearedTimes | kda | attendrate | killsPergame | mostkills | deathsPergame | mostdeaths | assistsPergame |
        # table 4 for farming and team contribution is arranged as:
        # | order | playername | mostassists | goldsPermin | lasthitPermin | damagetoheroPermin | damagetoheroPercent | damagetakenPermin | damagetakenPercent | wardsplacedPermin | wardskilledPermin |
        link = self.driver.find_element_by_xpath('//*[@href="/lol/playerstats"]')
        link.click()
        time.sleep(1)
        table3 = self.getPaginatedTable()
        tab2 = self.driver.find_element_by_class_name('detail-list-title').find_elements_by_css_selector('div')[1]
        tab2.click()
        table4 = self.getPaginatedTable()
        return [table3, table4]

    def getPaginatedTable(self):
        start = 1
        end = len(self.driver.find_elements_by_class_name('paginate_button ')) - 1
        table = []
        while (start < end):
            btn = self.driver.find_elements_by_class_name('paginate_button ')[start]
            btn.click()
            time.sleep(0.5)
            tb = self.tableToArray()
            table += tb
            start += 1
        return table

    def tableToArray(self):
        stats = []
        dataTable = self.driver.find_element_by_id('DataTables_Table_0')
        lines = dataTable.find_elements_by_css_selector('tr')
        for line in lines:
            data = line.find_elements_by_css_selector('td')
            if len(data) != 0:
                dt = []
                for item in data:
                    if item.text != '':
                        dt.append(self.chineseTransformer(item.text))
                stats.append(dt)
        return stats

    def chineseTransformer(self, str):
        if str == '打野':
            return "Jungle"
        elif str == '上单':
            return "Top"
        elif str == '中单':
            return "Mid"
        elif str == '辅助':
            return "Support"
        else:
            return str

wanplusmsi = WanPlusMsi()