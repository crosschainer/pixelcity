I = importlib

pixelcity_contract = Variable()
mob_contract = Variable()
staking_rewards = Hash(default_value=0)

@construct
def seed():
    pixelcity_contract.set("con_pixelcity_master_1")
    mob_contract.set("con_mintorburn")

@export
def depositRewards(mob_amount: float):
    assert mob_amount > 0, "Cant deposit negative amounts"
    I.import_module(mob_contract.get()).transfer_from(amount=mob_amount, to=ctx.this, main_account=ctx.caller)
    plots = ForeignHash(foreign_contract=pixelcity_contract.get(), foreign_name='plots')
    valid_plot_nfts_var = ForeignVariable(foreign_contract=pixelcity_contract.get(), foreign_name='valid_plot_nfts')
    valid_plot_nfts = valid_plot_nfts_var.get()
    in_use_building_nfts_var = ForeignVariable(foreign_contract=pixelcity_contract.get(), foreign_name='in_use_building_nfts')
    in_use_building_nfts = in_use_building_nfts_var.get()
    mob_balances = ForeignHash(foreign_contract=mob_contract.get(), foreign_name='balances')
    for plot_thing in valid_plot_nfts:
        if plots[plot_thing]:
            if plots[plot_thing] != 0:
                if(plots[plot_thing]["built"] != ""):
                    staking_rewards[plots[plot_thing]["current_build_owner"]] += mob_balances[ctx.this] / (len(in_use_building_nfts))            

@export
def claim_rewards():
    amount_to_claim = staking_rewards[ctx.caller]
    if(amount_to_claim > 0):
        staking_rewards[ctx.caller] = 0
        I.import_module(mob_contract.get()).transfer(amount=amount_to_claim, to=ctx.caller)