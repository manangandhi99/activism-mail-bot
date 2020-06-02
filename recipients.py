# (name, county, email)
# If you would like to add to this list, please let me know at alandgton@gmail.com
county_list = [
        ( "Mayor Eric Garcetti", "LA", "mayor.helpdesk@lacity.org" ),
        ( "City Attorney Mike Feuer", "LA", "mayor.garcetti@lacity.org" ),
        ( "Mayor London N. Breed", "SF", "MayorLondonBreed@sfgov.org"),
        ( "Councilmember Nury Martinez", "LA", "councilmember.martinez@lacity.org"),
        ( "Councilmember Gil Cedillo", "LA", "councilmember.cedillo@lacity.org"),
        ( "Councilmember Paul Krekorian", "LA", "councilmember.Krekorian@lacity.org"),
        ( "Councilmember Bob Blumenfield", "LA", "councilmember.blumenfield@lacity.org"),
        ( "Councilmember David E. Ryu", "LA", "david.ryu@lacity.org"),
    ]

def gen_recipients(location):
    recv = []
    for c in county_list:
        recv.append(c)
    return recv
