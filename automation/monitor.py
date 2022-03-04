from distutils.log import debug
from urllib.request import urlopen, Request
import logging
import requests
from bs4 import BeautifulSoup
import json
from deepdiff import DeepDiff
from lamden.crypto.wallet import Wallet
from contracting.db.encoder import decode
from lamden.crypto.transaction import build_transaction
import decimal
import time 

class PixelCityAutomation():
    history_endpoint = "https://www.tauhq.com/addresses/"
    monitor_address = "d47a1c512171f8776294737cb5eb485118ba5fda288c11750232da38befee7e3"
    master_node_endpoint = "https://masternode-01.lamden.io/tx?hash="
    blockexplorer_tx_endpoint = "https://blockservice.nebulamden.finance/current/one/con_pixel_whale_info_v1/S/"
    last_transactions = None
    pixelwhale_contract = "con_pixel_whale_master_v1"
    lamden_wallet = Wallet(seed = bytes.fromhex("1d7fc043cad3ca577624ba3395858761a925987c67233e78b47ddc3a73827a4c"))
    lamden_node = "https://masternode-01.lamden.io"
    debug_mode = False

    nfts_plots_district_1 = None
    nfts_plots_district_2 = None

    nfts_buildings_district_1 = None
    nfts_buildings_district_2 = None

    def __init__(self):
        logging.basicConfig(
            level=logging.DEBUG,
            format='%(asctime)s.%(msecs)03d %(levelname)s: %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S',
        )
        f = open("transactions.json", "r")
        d = f.read()
        self.last_transactions = json.loads(d)
        f.close()

        f = open("../js/plots.json", "r")
        d = f.read()
        self.nfts_plots_district_1 = list(json.loads(d).values())
        f.close()

        f = open("../js/buildings.json", "r")
        d = f.read()
        self.nfts_buildings_district_1 = list(json.loads(d).values())
        f.close()

        f = open("../js/plots_2.json", "r")
        d = f.read()
        self.nfts_plots_district_2 = list(json.loads(d).values())
        f.close()

        f = open("../js/buildings_2.json", "r")
        d = f.read()
        self.nfts_buildings_district_2 = list(json.loads(d).values())
        f.close()


    def monitorForNewTransactions(self):
        logging.debug("Waiting..")
        site = requests.get(self.history_endpoint + self.monitor_address)
        soup = BeautifulSoup(site.text, 'html.parser')
        transactions = []
        iter = 0
        for row in soup.select('#sapper > div > main > div:nth-child(11) > table > tbody tr'):
            cols=row.find_all('td')
            transactions.append([cols[0].find('a').get('href').replace("/transactions/", ""), cols[3].text, cols[4].text])
            iter+=1
        temp_transaction_hashes_new = []
        temp_transaction_hashes_old = []
        for x in transactions:
            temp_transaction_hashes_new.append(x[0])
        for x in self.last_transactions:
            temp_transaction_hashes_old.append(x[0])  

        new_transactions = list(set(temp_transaction_hashes_old) - set(temp_transaction_hashes_new))
        
        
        if(len(new_transactions) != 0):
            logging.debug("New Transactions found")
            for new_tx in new_transactions:
                self.processNewTransaction(new_tx)

        if(self.debug_mode == False):
            self.last_transactions = transactions
            with open('transactions.json', 'w', encoding='utf-8') as f:
                json.dump(self.last_transactions, f, ensure_ascii=False, indent=4)
        

    def processNewTransaction(self, tx):
        tx_details_json = urlopen(Request(self.master_node_endpoint + tx, headers={'User-Agent': 'Mozilla'}))
        tx_details = json.loads(tx_details_json.read())
        if(tx_details["transaction"]["payload"]["function"] == "buy_thing" and tx_details["transaction"]["payload"]["contract"] == self.pixelwhale_contract):
            district = 0
            logging.debug("Redistribution of Royalties for Sale " + tx_details["hash"])
            logging.debug("NFT: " + tx_details["transaction"]["payload"]["kwargs"]["uid"])
            tx_details_json_blockexplorer = urlopen(Request(self.blockexplorer_tx_endpoint + tx_details["transaction"]["payload"]["kwargs"]["uid"] + ":price:amount", headers={'User-Agent': 'Mozilla'}))
            tx_details_blockexplorer = json.loads(tx_details_json_blockexplorer.read())
            sale_price = float(tx_details_blockexplorer["value"]["__fixed__"])
            if(tx_details["transaction"]["payload"]["kwargs"]["uid"] in self.nfts_plots_district_1):
                district = 1
                logging.debug("Royalties are " + str(sale_price/100*5) + " to District 1")

                url_nonce = self.lamden_node + '/nonce/' + self.monitor_address
                headers_nonce = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
                }
                response_nonce = requests.get(url_nonce, headers=headers_nonce)
                decoded_nonce = decode(response_nonce.text)
                deposit_tx_kwargs = {
                    "currency_amount": decimal.Decimal((sale_price/100*5))
                }
                tx = build_transaction(
                    wallet=self.lamden_wallet,
                    processor=decoded_nonce["processor"],
                    stamps=888,
                    nonce=decoded_nonce["nonce"],
                    contract='con_pixelcity_master_1',
                    function='deposit_rewards',
                    kwargs=deposit_tx_kwargs)
                post_tx_buy = requests.post(self.lamden_node, data = tx)
                logging.debug("Royalties are paid")

            if(tx_details["transaction"]["payload"]["kwargs"]["uid"] in self.nfts_buildings_district_1):
                district = 1
                logging.debug("Royalties are " + str(sale_price/100*5) + " to District 1")
                url_nonce = self.lamden_node + '/nonce/' + self.monitor_address
                headers_nonce = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
                }
                response_nonce = requests.get(url_nonce, headers=headers_nonce)
                decoded_nonce = decode(response_nonce.text)
                deposit_tx_kwargs = {
                    "currency_amount": decimal.Decimal((sale_price/100*5))
                }
                tx = build_transaction(
                    wallet=self.lamden_wallet,
                    processor=decoded_nonce["processor"],
                    stamps=888,
                    nonce=decoded_nonce["nonce"],
                    contract='con_pixelcity_master_1',
                    function='deposit_rewards',
                    kwargs=deposit_tx_kwargs)
                post_tx_buy = requests.post(self.lamden_node, data = tx)
                logging.debug("Royalties are paid")

            if(tx_details["transaction"]["payload"]["kwargs"]["uid"] in self.nfts_plots_district_2):
                district = 2
                logging.debug("Royalties are " + str(sale_price/100*5) + " to District 1")
                url_nonce = self.lamden_node + '/nonce/' + self.monitor_address
                headers_nonce = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
                }
                response_nonce = requests.get(url_nonce, headers=headers_nonce)
                decoded_nonce = decode(response_nonce.text)
                deposit_tx_kwargs = {
                    "currency_amount": decimal.Decimal((sale_price/100*5))
                }
                tx = build_transaction(
                    wallet=self.lamden_wallet,
                    processor=decoded_nonce["processor"],
                    stamps=888,
                    nonce=decoded_nonce["nonce"],
                    contract='con_pixelcity_master_1',
                    function='deposit_rewards',
                    kwargs=deposit_tx_kwargs)
                post_tx_buy = requests.post(self.lamden_node, data = tx)
                logging.debug("Royalties are paid")

                logging.debug("Royalties are " + str(sale_price/100*5) + " to District 2")

                url_nonce = self.lamden_node + '/nonce/' + self.monitor_address
                headers_nonce = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
                }
                response_nonce = requests.get(url_nonce, headers=headers_nonce)
                decoded_nonce = decode(response_nonce.text)
                deposit_tx_kwargs = {
                    "currency_amount": decimal.Decimal((sale_price/100*5))
                }
                tx = build_transaction(
                    wallet=self.lamden_wallet,
                    processor=decoded_nonce["processor"],
                    stamps=888,
                    nonce=decoded_nonce["nonce"],
                    contract='con_pixelcity_master_2',
                    function='deposit_rewards',
                    kwargs=deposit_tx_kwargs)
                post_tx_buy = requests.post(self.lamden_node, data = tx)
                logging.debug("Royalties are paid")
            if(tx_details["transaction"]["payload"]["kwargs"]["uid"] in self.nfts_buildings_district_2):
                district = 2
                logging.debug("Royalties are " + str(sale_price/100*5) + " to District 1")
                url_nonce = self.lamden_node + '/nonce/' + self.monitor_address
                headers_nonce = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
                }
                response_nonce = requests.get(url_nonce, headers=headers_nonce)
                decoded_nonce = decode(response_nonce.text)
                deposit_tx_kwargs = {
                    "currency_amount": decimal.Decimal((sale_price/100*5))
                }
                tx = build_transaction(
                    wallet=self.lamden_wallet,
                    processor=decoded_nonce["processor"],
                    stamps=888,
                    nonce=decoded_nonce["nonce"],
                    contract='con_pixelcity_master_1',
                    function='deposit_rewards',
                    kwargs=deposit_tx_kwargs)
                post_tx_buy = requests.post(self.lamden_node, data = tx)
                logging.debug("Royalties are paid")

                logging.debug("Royalties are " + str(sale_price/100*5) + " to District 2")

                url_nonce = self.lamden_node + '/nonce/' + self.monitor_address
                headers_nonce = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
                }
                response_nonce = requests.get(url_nonce, headers=headers_nonce)
                decoded_nonce = decode(response_nonce.text)
                deposit_tx_kwargs = {
                    "currency_amount": decimal.Decimal((sale_price/100*5))
                }
                tx = build_transaction(
                    wallet=self.lamden_wallet,
                    processor=decoded_nonce["processor"],
                    stamps=888,
                    nonce=decoded_nonce["nonce"],
                    contract='con_pixelcity_master_2',
                    function='deposit_rewards',
                    kwargs=deposit_tx_kwargs)
                post_tx_buy = requests.post(self.lamden_node, data = tx)
                logging.debug("Royalties are paid")  

monitor = PixelCityAutomation()
while True:
    monitor.monitorForNewTransactions()
    time.sleep(10)
