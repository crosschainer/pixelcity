import unittest
from contracting.stdlib.bridge.time import Datetime

from contracting.client import ContractingClient
import logging
frames_plot_1 = ("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnjjjPPPnnnnnnnnnnnnnUUjjUjjPPjjjPPPPnnnnnnnnjjjnyyyPyyyPjjPjPPPnnnnnnjjjyPPPPPPPPyjPjPPPPnnnnnnjjPPPPPPPPPPPjyPPPPnnnnUUUjjPPPPPyyyyjjyyPPPnnnUUUUyjjjPyPUUUjyjyyPPPnnnUUUUjPjjyyPUjjUUjyPPPPnnnUUUjjjjjjjPnjnyynjnnnnnnnnnnjPyyPjPjPPynnnnjnnnnnnnnnjnPPyjjjPyPPPPPjnnnnnnnnjnnPPjjyyjjPPPPPjnnnnnnnnjnUPjjjPyyjjPPPPjPnnnnnnnjUUjjPPPPPjjjPPjPPnnnnnnUjjUjjjPPPPPjyPjjPPnnnnUUUUjUjjPPPPPPPjjjPPPnnnnUUUUjUjjPPPPPPPPyjPPPnnnnUUUUjjPjyyPPPPPPyPjjPnnnnUUUUjUUjjPyyPPPyPPPnnnnnnUUUUUjUnjPPPyyyyPPPnnnjnnnnnnnnnnjjPPPPPPPPnnjjnnnnnnnnnnnnjjjjjjjjjjjnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"
                 "nnnnnnnnnnnnnnnnnnnnnnnnnnnZZZZZZnZZjZZZZZnnnnnnnnnnnZZZZZZjZZZjjjPZZZZnnnnnnnjZZZZyyPyyZPZZZZZZZnnnnnnjjjyZZPPPPPPyjZZPPZPnnnnnnjjPPZZPPPPZZZjyPZPPnnnnUUUjjPPZZPZZyyjjyyZPPnnnUUUUyjjZZZZUUUjyjyyZPPnnnUUZUjZZjyyZUjjUUjyPZPPnnnUUZZZZjjjjZnjnyynjZnnnnnnnnnZZyyPjPjZPynnnnjnnnnnnnnnZnZPyjjjZyPPPPPZnnnnnnnnjZZZZZZyZZZZZZZZZZnnnnnnnjnUPjZjPyZjjPPPPZZnnnnnnnjUUjjZZPPZjjjPZZZZZnnnnnUjjUjjjZZZZZZZZZjPPZnnnUUUUjUZZZZZZPPPjjjPPPZZnnUUUUjZZZZPPPZZPPyjPPPnZnnUUUUZZZZyyPPPPZPZPjjPZZnnUUUUZZUjjPyyPPPyZZZZZZnnnUUUZZZZZZZZZZZZZZZZnZnjnnnnnZZnnZZZZZPPPPPPZZjjnnnnnnnnnnnnjjjjZZZjjjZZnnnnnnnnnnnnnnnnnnnnZZZnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
frames_building_1 = ("PPPnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnjjjPPPnnnnnnnnnnnnnUUjjUjjPPjjjPPPPnnnnnnnnjjjnyyyPyyyPjjPjPPPnnnnnnjjjyPPPPPPPPyjPjPPPPnnnnnnjjPPPPPPPPPPPjyPPPPnnnnUUUjjPPPPPyyyyjjyyPPPnnnUUUUyjjjPyPUUUjyjyyPPPnnnUUUUjPjjyyPUjjUUjyPPPPnnnUUUjjjjjjjPnjnyynjnnnnnnnnnnjPyyPjPjPPynnnnjnnnnnnnnnjnPPyjjjPyPPPPPjnnnnnnnnjnnPPjjyyjjPPPPPjnnnnnnnnjnUPjjjPyyjjPPPPjPnnnnnnnjUUjjPPPPPjjjPPjPPnnnnnnUjjUjjjPPPPPjyPjjPPnnnnUUUUjUjjPPPPPPPjjjPPPnnnnUUUUjUjjPPPPPPPPyjPPPnnnnUUUUjjPjyyPPPPPPyPjjPnnnnUUUUjUUjjPyyPPPyPPPnnnnnnUUUUUjUnjPPPyyyyPPPnnnjnnnnnnnnnnjjPPPPPPPPnnjjnnnnnnnnnnnnjjjjjjjjjjjnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"
                 "nnnnnnnnnnnnnnnnnnnnnnnnnnnZZZZZZnZZjZZZZZnnnnnnnnnnnZZZZZZjZZZjjjPZZZZnnnnnnnjZZZZyyPyyZPZZZZZZZnnnnnnjjjyZZPPPPPPyjZZPPZPnnnnnnjjPPZZPPPPZZZjyPZPPnnnnUUUjjPPZZPZZyyjjyyZPPnnnUUUUyjjZZZZUUUjyjyyZPPnnnUUZUjZZjyyZUjjUUjyPZPPnnnUUZZZZjjjjZnjnyynjZnnnnnnnnnZZyyPjPjZPynnnnjnnnnnnnnnZnZPyjjjZyPPPPPZnnnnnnnnjZZZZZZyZZZZZZZZZZnnnnnnnjnUPjZjPyZjjPPPPZZnnnnnnnjUUjjZZPPZjjjPZZZZZnnnnnUjjUjjjZZZZZZZZZjPPZnnnUUUUjUZZZZZZPPPjjjPPPZZnnUUUUjZZZZPPPZZPPyjPPPnZnnUUUUZZZZyyPPPPZPZPjjPZZnnUUUUZZUjjPyyPPPyZZZZZZnnnUUUZZZZZZZZZZZZZZZZnZnjnnnnnZZnnZZZZZPPPPPPZZjjnnnnnnnnnnnnjjjjZZZjjjZZnnnnnnnnnnnnnnnnnnnnZZZnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")

frames_plot_2 = ("nnnnnnnnnPPPnnnnnnnnnnnnnnnnnnnnnnnjjjPPPnnnnnnnnnnnnnUUjjUjjPPjjjPPPPnnnnnnnnjjjnyyyPyyyPjjPjPPPnnnnnnjjjyPPPPPPPPyjPjPPPPnnnnnnjjPPPPPPPPPPPjyPPPPnnnnUUUjjPPPPPyyyyjjyyPPPnnnUUUUyjjjPyPUUUjyjyyPPPnnnUUUUjPjjyyPUjjUUjyPPPPnnnUUUjjjjjjjPnjnyynjnnnnnnnnnnjPyyPjPjPPynnnnjnnnnnnnnnjnPPyjjjPyPPPPPjnnnnnnnnjnnPPjjyyjjPPPPPjnnnnnnnnjnUPjjjPyyjjPPPPjPnnnnnnnjUUjjPPPPPjjjPPjPPnnnnnnUjjUjjjPPPPPjyPjjPPnnnnUUUUjUjjPPPPPPPjjjPPPnnnnUUUUjUjjPPPPPPPPyjPPPnnnnUUUUjjPjyyPPPPPPyPjjPnnnnUUUUjUUjjPyyPPPyPPPnnnnnnUUUUUjUnjPPPyyyyPPPnnnjnnnnnnnnnnjjPPPPPPPPnnjjnnnnnnnnnnnnjjjjjjjjjjjnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"
                 "nnnnnnnnnnnnnnnnnnnnnnnnnnnZZZZZZnZZjZZZZZnnnnnnnnnnnZZZZZZjZZZjjjPZZZZnnnnnnnjZZZZyyPyyZPZZZZZZZnnnnnnjjjyZZPPPPPPyjZZPPZPnnnnnnjjPPZZPPPPZZZjyPZPPnnnnUUUjjPPZZPZZyyjjyyZPPnnnUUUUyjjZZZZUUUjyjyyZPPnnnUUZUjZZjyyZUjjUUjyPZPPnnnUUZZZZjjjjZnjnyynjZnnnnnnnnnZZyyPjPjZPynnnnjnnnnnnnnnZnZPyjjjZyPPPPPZnnnnnnnnjZZZZZZyZZZZZZZZZZnnnnnnnjnUPjZjPyZjjPPPPZZnnnnnnnjUUjjZZPPZjjjPZZZZZnnnnnUjjUjjjZZZZZZZZZjPPZnnnUUUUjUZZZZZZPPPjjjPPPZZnnUUUUjZZZZPPPZZPPyjPPPnZnnUUUUZZZZyyPPPPZPZPjjPZZnnUUUUZZUjjPyyPPPyZZZZZZnnnUUUZZZZZZZZZZZZZZZZnZnjnnnnnZZnnZZZZZPPPPPPZZjjnnnnnnnnnnnnjjjjZZZjjjZZnnnnnnnnnnnnnnnnnnnnZZZnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
frames_building_2 = ("PPPPPPnnnnnnnnnnnnnnnnnnnnnnnnnnnnnjjjPPPnnnnnnnnnnnnnUUjjUjjPPjjjPPPPnnnnnnnnjjjnyyyPyyyPjjPjPPPnnnnnnjjjyPPPPPPPPyjPjPPPPnnnnnnjjPPPPPPPPPPPjyPPPPnnnnUUUjjPPPPPyyyyjjyyPPPnnnUUUUyjjjPyPUUUjyjyyPPPnnnUUUUjPjjyyPUjjUUjyPPPPnnnUUUjjjjjjjPnjnyynjnnnnnnnnnnjPyyPjPjPPynnnnjnnnnnnnnnjnPPyjjjPyPPPPPjnnnnnnnnjnnPPjjyyjjPPPPPjnnnnnnnnjnUPjjjPyyjjPPPPjPnnnnnnnjUUjjPPPPPjjjPPjPPnnnnnnUjjUjjjPPPPPjyPjjPPnnnnUUUUjUjjPPPPPPPjjjPPPnnnnUUUUjUjjPPPPPPPPyjPPPnnnnUUUUjjPjyyPPPPPPyPjjPnnnnUUUUjUUjjPyyPPPyPPPnnnnnnUUUUUjUnjPPPyyyyPPPnnnjnnnnnnnnnnjjPPPPPPPPnnjjnnnnnnnnnnnnjjjjjjjjjjjnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"
                 "nnnnnnnnnnnnnnnnnnnnnnnnnnnZZZZZZnZZjZZZZZnnnnnnnnnnnZZZZZZjZZZjjjPZZZZnnnnnnnjZZZZyyPyyZPZZZZZZZnnnnnnjjjyZZPPPPPPyjZZPPZPnnnnnnjjPPZZPPPPZZZjyPZPPnnnnUUUjjPPZZPZZyyjjyyZPPnnnUUUUyjjZZZZUUUjyjyyZPPnnnUUZUjZZjyyZUjjUUjyPZPPnnnUUZZZZjjjjZnjnyynjZnnnnnnnnnZZyyPjPjZPynnnnjnnnnnnnnnZnZPyjjjZyPPPPPZnnnnnnnnjZZZZZZyZZZZZZZZZZnnnnnnnjnUPjZjPyZjjPPPPZZnnnnnnnjUUjjZZPPZjjjPZZZZZnnnnnUjjUjjjZZZZZZZZZjPPZnnnUUUUjUZZZZZZPPPjjjPPPZZnnUUUUjZZZZPPPZZPPyjPPPnZnnUUUUZZZZyyPPPPZPZPjjPZZnnUUUUZZUjjPyyPPPyZZZZZZnnnUUUZZZZZZZZZZZZZZZZnZnjnnnnnZZnnZZZZZPPPPPPZZjjnnnnnnnnnnnnjjjjZZZjjjZZnnnnnnnnnnnnnnnnnnnnZZZnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")

frames_plot_3 = ("nnnnnnPPPnnnnnnnnnnnnnnnnnnnnnnnnnnjjjPPPnnnnnnnnnnnnnUUjjUjjPPjjjPPPPnnnnnnnnjjjnyyyPyyyPjjPjPPPnnnnnnjjjyPPPPPPPPyjPjPPPPnnnnnnjjPPPPPPPPPPPjyPPPPnnnnUUUjjPPPPPyyyyjjyyPPPnnnUUUUyjjjPyPUUUjyjyyPPPnnnUUUUjPjjyyPUjjUUjyPPPPnnnUUUjjjjjjjPnjnyynjnnnnnnnnnnjPyyPjPjPPynnnnjnnnnnnnnnjnPPyjjjPyPPPPPjnnnnnnnnjnnPPjjyyjjPPPPPjnnnnnnnnjnUPjjjPyyjjPPPPjPnnnnnnnjUUjjPPPPPjjjPPjPPnnnnnnUjjUjjjPPPPPjyPjjPPnnnnUUUUjUjjPPPPPPPjjjPPPnnnnUUUUjUjjPPPPPPPPyjPPPnnnnUUUUjjPjyyPPPPPPyPjjPnnnnUUUUjUUjjPyyPPPyPPPnnnnnnUUUUUjUnjPPPyyyyPPPnnnjnnnnnnnnnnjjPPPPPPPPnnjjnnnnnnnnnnnnjjjjjjjjjjjnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"
                 "nnnnnnnnnnnnnnnnnnnnnnnnnnnZZZZZZnZZjZZZZZnnnnnnnnnnnZZZZZZjZZZjjjPZZZZnnnnnnnjZZZZyyPyyZPZZZZZZZnnnnnnjjjyZZPPPPPPyjZZPPZPnnnnnnjjPPZZPPPPZZZjyPZPPnnnnUUUjjPPZZPZZyyjjyyZPPnnnUUUUyjjZZZZUUUjyjyyZPPnnnUUZUjZZjyyZUjjUUjyPZPPnnnUUZZZZjjjjZnjnyynjZnnnnnnnnnZZyyPjPjZPynnnnjnnnnnnnnnZnZPyjjjZyPPPPPZnnnnnnnnjZZZZZZyZZZZZZZZZZnnnnnnnjnUPjZjPyZjjPPPPZZnnnnnnnjUUjjZZPPZjjjPZZZZZnnnnnUjjUjjjZZZZZZZZZjPPZnnnUUUUjUZZZZZZPPPjjjPPPZZnnUUUUjZZZZPPPZZPPyjPPPnZnnUUUUZZZZyyPPPPZPZPjjPZZnnUUUUZZUjjPyyPPPyZZZZZZnnnUUUZZZZZZZZZZZZZZZZnZnjnnnnnZZnnZZZZZPPPPPPZZjjnnnnnnnnnnnnjjjjZZZjjjZZnnnnnnnnnnnnnnnnnnnnZZZnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
frames_building_3 = ("PPPnnnnnnnnnnnnnnPPPnnnnnnnnnnnnnnnjjjPPPnnnnnnnnnnnnnUUjjUjjPPjjjPPPPnnnnnnnnjjjnyyyPyyyPjjPjPPPnnnnnnjjjyPPPPPPPPyjPjPPPPnnnnnnjjPPPPPPPPPPPjyPPPPnnnnUUUjjPPPPPyyyyjjyyPPPnnnUUUUyjjjPyPUUUjyjyyPPPnnnUUUUjPjjyyPUjjUUjyPPPPnnnUUUjjjjjjjPnjnyynjnnnnnnnnnnjPyyPjPjPPynnnnjnnnnnnnnnjnPPyjjjPyPPPPPjnnnnnnnnjnnPPjjyyjjPPPPPjnnnnnnnnjnUPjjjPyyjjPPPPjPnnnnnnnjUUjjPPPPPjjjPPjPPnnnnnnUjjUjjjPPPPPjyPjjPPnnnnUUUUjUjjPPPPPPPjjjPPPnnnnUUUUjUjjPPPPPPPPyjPPPnnnnUUUUjjPjyyPPPPPPyPjjPnnnnUUUUjUUjjPyyPPPyPPPnnnnnnUUUUUjUnjPPPyyyyPPPnnnjnnnnnnnnnnjjPPPPPPPPnnjjnnnnnnnnnnnnjjjjjjjjjjjnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"
                 "nnnnnnnnnnnnnnnnnnnnnnnnnnnZZZZZZnZZjZZZZZnnnnnnnnnnnZZZZZZjZZZjPjPZZZZnnnnnnnjZZZZyyPyyZPZZZZZZZnnnnnnjjjyZZPPPPPPyjZZPPZPnnnnnnjjPPZZPPPPZZZjyPZPPnnnnUUUjjPPZZPZZyyjjyyZPPnnnUUUUyjjZZZZUUUjyjyyZPPnnnUUZUjZZjyyZUjjUUjyPZPPnnnUUZZZZjjjjZnjnyynjZnnnnnnnnnZZyyPjPjZPynnnnjnnnnnnnnnZnZPyjjjZyPPPPPZnnnnnnnnjZZZZZZyZZZZZZZZZZnnnnnnnjnUPjZjPyZjjPPPPZZnnnnnnnjUUjjZZPPZjjjPZZZZZnnnnnUjjUjjjZZZZZZZZZjPPZnnnUUUUjUZZZZZZPPPjjjPPPZZnnUUUUjZZZZPPPZZPPyjPPPnZnnUUUUZZZZyyPPPPZPZPjjPZZnnUUUUZZUjjPyyPPPyZZZZZZnnnUUUZZZZZZZZZZZZZZZZnZnjnnnnnZZnnZZZZZPPPPPPZZjjnnnnnnnnnnnnjjjjZZZjjjZZnnnnnnnnnnnnnnnnnnnnZZZnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")



class MyTestCase(unittest.TestCase):
    currency = None
    pixel_master = None
    pixel_info = None
    pixelcity = None

    a_plot_1 = None
    a_plot_2 = None 
    a_plot_3 = None

    a_building_1 = None
    a_building_2 = None 
    a_building_3 = None
    c = None

    def reset(self):
        self.c= ContractingClient()
        self.c.flush()
        self.c.signer = "ff61544ea94eaaeb5df08ed863c4a938e9129aba6ceee5f31b6681bdede11b89"

        with open("./currency.py") as f:
            code = f.read()
            self.c.submit(code, name="currency")

        with open("./con_pixel_frames_master.py") as f:
            code = f.read()
            self.c.submit(code, name="con_pixel_whale_master_v1")

        with open("./con_pixel_frames.py") as f:
            code = f.read()
            self.c.submit(code, name="con_pixel_whale_info_v1")

        with open("./con_pixelcity.py") as f:
            code = f.read()
            self.c.submit(code, name="con_pixelcity")

        self.currency = self.c.get_contract("currency")
        self.pixel_master = self.c.get_contract("con_pixel_whale_master_v1")
        self.pixel_info = self.c.get_contract("con_pixel_whale_info_v1")
        self.pixelcity = self.c.get_contract("con_pixelcity")
        
        self.a_plot_1 = self.pixel_master.create_thing(
            thing_string=frames_plot_1,
            name="TestPlot",
            description="TestPlot",
            meta={
                'speed': 256,
                'num_of_frames': 2,
                'royalty_percent': 20
            }
        )
        
        self.a_building_1 = self.pixel_master.create_thing(
            thing_string=frames_building_1,
            name="TestBuilding",
            description="TestBuilding",
            meta={
                'speed': 256,
                'num_of_frames': 2,
                'royalty_percent': 20
            }
        )
       
        self.a_plot_2 = self.pixel_master.create_thing(
            thing_string=frames_plot_2,
            name="TestPlot2",
            description="TestPlot2",
            meta={
                'speed': 256,
                'num_of_frames': 2,
                'royalty_percent': 20
            }
        )
        
        self.a_building_2 = self.pixel_master.create_thing(
            thing_string=frames_building_2,
            name="TestBuilding2",
            description="TestBuilding2",
            meta={
                'speed': 256,
                'num_of_frames': 2,
                'royalty_percent': 20
            }
        )
        
        self.a_plot_3 = self.pixel_master.create_thing(
            thing_string=frames_plot_3,
            name="TestPlot3",
            description="TestPlot3",
            meta={
                'speed': 256,
                'num_of_frames': 2,
                'royalty_percent': 20
            }
        )
        
        self.a_building_3 = self.pixel_master.create_thing(
            thing_string=frames_building_3,
            name="TestBuilding3",
            description="TestBuilding3",
            meta={
                'speed': 256,
                'num_of_frames': 2,
                'royalty_percent': 20
            }
        )
    
    def manual_validate(self):
        self.pixelcity.set_valid_plot_nfts(list_of_nfts=[self.a_plot_1,self.a_plot_2,self.a_plot_3])
        self.pixelcity.set_valid_build_nfts(list_of_nfts=[self.a_building_1,self.a_building_2,self.a_building_3])

    def test_validate_nfts(self):
        log = logging.getLogger("Tests")
        self.reset()
        self.pixelcity.set_valid_plot_nfts(list_of_nfts=[self.a_plot_1,self.a_plot_2,self.a_plot_3])
        self.pixelcity.set_valid_build_nfts(list_of_nfts=[self.a_building_1,self.a_building_2,self.a_building_3])

    def test_connect_built_to_plot(self):
        log = logging.getLogger("Tests")
        self.reset()
        self.manual_validate()
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_2,build_thing=self.a_building_1)
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_1,build_thing=self.a_building_2)
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_3,build_thing=self.a_building_3)
        
    def test_connect_built_to_plot_and_owner_changes(self):
        log = logging.getLogger("Tests")
        self.reset()
        self.manual_validate()
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_2,build_thing=self.a_building_1)
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_1,build_thing=self.a_building_2)
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_3,build_thing=self.a_building_3)
        self.pixel_master.transfer(uid=self.a_building_3, new_owner="None")
        self.pixelcity.claim_rewards()

    def test_deposit_rewards(self):
        log = logging.getLogger("Tests")
        self.reset()
        self.manual_validate()
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_2,build_thing=self.a_building_1)
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_1,build_thing=self.a_building_2)
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_3,build_thing=self.a_building_3)
        self.currency.approve(amount=1,to="con_pixelcity")
        self.pixelcity.deposit_rewards(currency_amount=1)
        

    def test_claim_rewards(self):
        log = logging.getLogger("Tests")
        self.reset()
        self.manual_validate()
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_2,build_thing=self.a_building_1)
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_1,build_thing=self.a_building_2)
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_3,build_thing=self.a_building_3)
        self.currency.approve(amount=1,to="con_pixelcity")
        self.pixelcity.deposit_rewards(currency_amount=1)
        self.pixelcity.claim_rewards()
        
        
    def test_worst_case(self):
        log = logging.getLogger("Tests")
        self.reset()
        self.manual_validate()
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_1,build_thing=self.a_building_2)
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_3,build_thing=self.a_building_3)
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_2,build_thing=self.a_building_1)
        self.pixel_master.transfer(uid=self.a_building_1, new_owner="hax")
        self.pixel_master.transfer(uid=self.a_plot_3, new_owner="hax")
        self.pixelcity.claim_rewards()
        self.pixelcity.connect_built_to_plot(plot_thing=self.a_plot_3,build_thing=self.a_building_1, signer="hax")
        self.currency.approve(amount=1,to="con_pixelcity")
        log.debug(self.pixelcity.deposit_rewards(currency_amount=1))
        log.debug(self.pixelcity.claim_rewards())
        log.debug(self.currency.balances["hax"])


if __name__ == "__main__":
    log = logging.getLogger("Tests")
    logging.basicConfig(
        level=logging.DEBUG,
        format='%(asctime)s.%(msecs)03d %(levelname)s: %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S',
    )
    unittest.main()