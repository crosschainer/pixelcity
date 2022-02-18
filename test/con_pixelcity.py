# Controller Contract for PixelCity
# This contract will get a rework at some point (long lists suck), and its not a problem. nothing is locked in here.
import currency
I = importlib

pixelwhale_contract = Variable()
pixelwhale_info_contract = Variable()
plots = Hash(default_value=0)

rewards = Hash(default_value=0)
valid_build_nfts = Variable()
valid_plot_nfts = Variable()

in_use_building_nfts = Variable()

@construct
def seed():
    pixelwhale_contract.set("con_pixel_whale_master_v1")
    pixelwhale_info_contract.set("con_pixel_whale_info_v1")
    valid_build_nfts.set([])
    valid_plot_nfts.set([])
    in_use_building_nfts.set([])

@export
def connect_built_to_plot(plot_thing: str, build_thing: str):
    remove_non_build_owners()
    remove_non_plot_owners()
    assert build_thing not in in_use_building_nfts.get(), 'This building is already in use'
    assert plot_thing in valid_plot_nfts.get(), 'Not a valid PixelCity NFT!'
    assert build_thing in valid_build_nfts.get(), 'Not a valid PixelCity NFT!'
    thing_info_owners = ForeignHash(foreign_contract=pixelwhale_info_contract.get(), foreign_name='S')
    owner_plot = thing_info_owners[plot_thing, 'owner']
    owner_build = thing_info_owners[build_thing, 'owner']
    assert owner_plot == ctx.caller, "You are not the owner of this plot" 
    assert owner_build == ctx.caller, "You are not the owner of this build"
    plots[plot_thing] = {"current_plot_owner":ctx.caller, "current_build_owner": ctx.caller, "built": build_thing}
    old_in_use_building_nfts = in_use_building_nfts.get()
    old_in_use_building_nfts.append(build_thing)
    in_use_building_nfts.set(old_in_use_building_nfts)

def remove_non_plot_owners():
    thing_info_owners = ForeignHash(foreign_contract=pixelwhale_info_contract.get(), foreign_name='S')
    old_in_use_building_nfts = in_use_building_nfts.get()
    for plot_thing in valid_plot_nfts.get():
        if(plots[plot_thing] != 0):
            if thing_info_owners[plot_thing, 'owner'] != plots[plot_thing]["current_plot_owner"]:
                if(plots[plot_thing]["built"] in old_in_use_building_nfts):
                        old_in_use_building_nfts.remove(plots[plot_thing]["built"])
                plots[plot_thing] = {"current_plot_owner": "", "current_build_owner": "", "built": ""}
    in_use_building_nfts.set(old_in_use_building_nfts)

def remove_non_build_owners():
    thing_info_owners = ForeignHash(foreign_contract=pixelwhale_info_contract.get(), foreign_name='S')
    old_in_use_building_nfts = in_use_building_nfts.get()
    for plot_thing in valid_plot_nfts.get():
        if(plots[plot_thing] != 0):
            if thing_info_owners[plots[plot_thing]["built"], 'owner'] != plots[plot_thing]["current_build_owner"]:
                old_plot = plots[plot_thing]
                if(old_plot["built"] in old_in_use_building_nfts):
                    old_in_use_building_nfts.remove(old_plot["built"])
                plots[plot_thing] = {"current_plot_owner":old_plot["current_plot_owner"], "current_build_owner": old_plot["current_build_owner"], "built": ""}
    in_use_building_nfts.set(old_in_use_building_nfts)

@export
def deposit_rewards(currency_amount:float):
    assert currency_amount > 0, "Cant deposit negative amounts"
    currency.transfer_from(amount=currency_amount, to=ctx.this, main_account=ctx.caller)
    for plot_thing in valid_plot_nfts.get():
        if(plots[plot_thing] != 0):
            if(plots[plot_thing]["built"] != ""):
                rewards[plots[plot_thing]["current_build_owner"]] += currency_amount / (len(in_use_building_nfts.get()))

@export
def claim_rewards():
    remove_non_build_owners()
    remove_non_plot_owners()
    amount_to_claim = rewards[ctx.caller]
    if(amount_to_claim > 0):
        rewards[ctx.caller] = 0
        currency.transfer(amount=amount_to_claim, to=ctx.caller)
    
@export
def set_valid_plot_nfts(list_of_nfts: list):
    assert ctx.caller == "ff61544ea94eaaeb5df08ed863c4a938e9129aba6ceee5f31b6681bdede11b89", 'You are not allowed to do that'
    valid_plot_nfts.set(list_of_nfts)

@export
def set_valid_build_nfts(list_of_nfts: list):
    assert ctx.caller == "ff61544ea94eaaeb5df08ed863c4a938e9129aba6ceee5f31b6681bdede11b89", 'You are not allowed to do that'
    valid_build_nfts.set(list_of_nfts)
