# Minecraft Potion calc 1.0
#
# i will add some notes of use later

print("Welcome to the cherrywood national brewery!")
print("1 - fire resistance potion")
print("2 - strength potion")
print("3 - invis potion")
print("4 - Swiftness potion")

choice = int(input("Choose an item (1, 2, 3 or 4): "))

if choice == 1:
    item_name = "fire resistance potion"
    pair_price = 1
elif choice == 2:
    item_name = "strength potion"
    pair_price = 1
elif choice == 3:
    item_name = "invis potion"
    pair_price = 1
elif choice == 4:
    item_name = "Swiftness potion"
    pair_price = 1
else:
    print("That item number is not on the menu.")
    item_name = "error"
    pair_price = 0 

potions = int(input("How many potions do you want? "))

if potions <= 1 or potions == 3 or potions == 5 or potions == 7 or potions == 9 or potions == 11 or potions == 13 or potions == 15 or potions == 17 or potions == 19 or potions == 21 or potions == 23 or potions == 25 or potions == 27 or potions == 29 or potions == 31 or potions == 33 or potions == 35 or potions == 37 or potions == 39 or potions == 41 or potions == 43 or potions == 45 or potions == 47 or potions == 49 or potions == 51 or potions == 53 or potions == 55 or potions == 57 or potions == 59 or potions == 61 or potions == 63:
    print("You need to order atleast 2 potions or an even amount of potions.")
else:
    pairs = potions// 2

    total = pairs * pair_price

    print("You ordered", potions, "potion(s) of", item_name)
    print("Your total is", total, "diamonds.")

    payment = int(input("How many diamonds are you paying? "))

    if payment >= total:
        change = payment - total
        print("Your change is", change, "diamonds.")
    else:
        still_owed = total - payment
        print("You still owe", still_owed, "diamonds.")

print("Thanks for visiting the brewery!")
