from urllib.request import urlopen
import json
import logging

class PixelCityAutomation():
    blockservice_history_endpoint = "https://blockservice.nebulamden.finance/tx_history/"
    monitor_address = "d47a1c512171f8776294737cb5eb485118ba5fda288c11750232da38befee7e3"
    last_transactions = None
    pixelwhale_contract = "con_pixel_whale_master_v1"

    def __init__(self):
        logging.basicConfig(
            level=logging.DEBUG,
            format='%(asctime)s.%(msecs)03d %(levelname)s: %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S',
        )

    def getLastTransactions(self):
        with urlopen(self.blockservice_history_endpoint + self.monitor_address) as url:
            data = json.loads(url.read().decode())
            if(self.last_transactions == None):
                self.last_transactions = data["history"]
            #elif(self.last_transactions[0]["txInfo"]["hash"] != data["history"][0]["txInfo"]["hash"]):
                #self.last_transactions = data["history"]
                self.processNewTransaction(data["history"][0]["txInfo"])

    def processNewTransaction(self, tx):
        logging.debug("<-------------------------------------->")
        logging.debug("New Transaction found: " + tx["hash"])
        logging.debug("Contract: " + tx["transaction"]["payload"]["contract"])
        logging.debug("Function: " + tx["transaction"]["payload"]["function"])
        if(tx["transaction"]["payload"]["contract"] == self.pixelwhale_contract and tx["transaction"]["payload"]["function"] == "buy_thing"):
            logging.debug("PAYOUT TIME")

    def debugTransactions(self):
        return self.last_transactions
    

monitor = PixelCityAutomation()
monitor.getLastTransactions()
