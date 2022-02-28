# -> MintOrBurn.com <-
# LST001
balances = Hash(default_value=0)
# LST002
metadata = Hash()
total_supply = Variable()
random.seed()
# LST001
# LST002
@construct
def seed():
    # LST001
    balances['ff61544ea94eaaeb5df08ed863c4a938e9129aba6ceee5f31b6681bdede11b89'] = 10000000
    # LST002
    metadata['token_name'] = 'Mint or Burn'
    metadata['token_symbol'] = 'MOB'
    metadata['token_logo_url'] = 'https://mintorburn.com/logo.png'
    metadata['operator'] = ctx.caller
    metadata['token_website'] = "https://mintorburn.com/"
    metadata['mint_or_burn_percentage'] = 2 
    metadata['burn_address'] = "000000000000000000000000000000000000000000000000000000000000dead"
    metadata['custodian_address'] = ctx.caller
    total_supply.set(10000000000)

@export
def balance_of(address: str):
    return balances[address]

@export
def circulating_supply():
    return int(total_supply.get() - balances[BURN_ADDRESS])

@export
def total_supply():
    return int(total_supply.get())

@export
def mint_or_burn_percentage():
    return metadata['mint_or_burn_percentage']

# LST002
@export
def change_metadata(key: str, value: Any):
    assert ctx.caller == metadata['operator'
        ], 'Only operator can set metadata!'
    metadata[key] = value

@export
def allowance(owner: str, spender: str):
    return balances[owner, spender]

# LST001
@export
def approve(amount: float, to: str):
    assert amount > 0, 'Cannot send negative balances!'
    balances[ctx.caller, to] += amount
    return balances[ctx.caller, to]

def mint_or_burn(amount: float):
    outcome = random.randint(1,2)
    if(outcome == 1):
        total_supply.set(total_supply.get() + amount/100*metadata['mint_or_burn_percentage'])
        return amount + amount/100*metadata['mint_or_burn_percentage']
    else:
        balances[metadata["burn_addresses"]] += amount/100*metadata['mint_or_burn_percentage']
        return amount - amount/100*metadata['mint_or_burn_percentage']

# LST001
@export
def transfer(amount: float, to: str):
    assert amount > 0, 'Cannot send negative balances!'
    sender = ctx.caller
    assert balances[sender] >= amount, 'Not enough coins to send!'
    balances[sender] -= amount
    balances[to] += mint_or_burn(amount)

# LST001
@export
def transfer_from(amount: float, to: str, main_account: str):
    assert amount > 0, 'Cannot send negative balances!'
    sender = ctx.caller
    assert balances[main_account, sender
        ] >= amount, 'Not enough coins approved to send! You have {} and are trying to spend {}'.format(
        balances[main_account, sender], amount)
    assert balances[main_account] >= amount, 'Not enough coins to send!'
    balances[main_account, sender] -= amount
    balances[main_account] -= amount
    balances[to] += mint_or_burn(amount)