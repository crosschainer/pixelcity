I = importlib

pixelwhale_info_contract = Variable()
metadata_builds = Hash(default_value=0)

@construct
def seed():
    pixelwhale_info_contract.set("con_pixel_whale_info_v1")

@export
def set_metadata(key: str, value: str, build_thing: str):
    thing_info_owners = ForeignHash(foreign_contract=pixelwhale_info_contract.get(), foreign_name='S')
    owner_build = thing_info_owners[build_thing, 'owner']
    assert owner_build == ctx.caller, "You are not the owner of this build"
    assert key != "", "Key cannot be empty"
    assert value != "", "Value cannot be empty"
    metadata_builds[build_thing, "user_defined", key] = value

@export
def set_creator_metadata(key: str, value: Any, build_thing: str):
    thing_info_creator = ForeignHash(foreign_contract=pixelwhale_info_contract.get(), foreign_name='S')
    creator_build = thing_info_creator[build_thing, 'creator']
    assert creator_build == ctx.caller, "You are not the creator of this build"
    assert key != "", "Key cannot be empty"
    assert value != "", "Value cannot be empty"
    metadata_builds[build_thing, "global", key] = value