# mc business calculator
stacks = int(input("How many stacks? ")) # int=volledige nummers. input=gebruiker kan iets typen. input() is een functie die de gebruiker iets laat typen. int() is een functie die het getypte omzet naar een integer (geheel getal).

pairs = stacks // 2       # Number of complete pairs
extra = stacks % 2        # 0 if even, 1 if there's one left over

pair_cost = pairs * 3     # Each pair costs 3 diamonds
extra_cost = extra * 2    # One leftover stack costs 2 diamonds

total = pair_cost + extra_cost  # som van stacks + de odd stack
print("That costs", total, "diamonds.")  # vertel antwoord