# Minecraft business calc 3.0 stone edition
#
# basically an reverse engineerd mc potion calc 1.0 build but with stonage.

print("Welcome to the cherrywood national shop!")
print("1 - stone stack")
print("2 - tuff stack")
print("3 - granite")
print("4 - andiside")
print("5 - diorite")

choice = int(input("Choose an item (1, 2, 3, 4 or 5): "))

if choice == 1:
    item_name = "stone stack"
    pair_price = 1
elif choice == 2:
    item_name = "tuff stack"
    pair_price = 3
elif choice == 3:
    item_name = "granite    "
    pair_price = 1
elif choice == 4:
    item_name = "andiside"
    pair_price = 2
elif choice == 5:
    item_name = "diorite"
    pair_price = 2
else:
    print("That item number is not on the menu.")
    item_name = "error"
    pair_price = 0 

stacks = int(input("How many stacks do you want? "))  # Ask how many stacks the customer wants and convert the answer to an integer.

if stacks <= 0:  # Check whether the requested amount is zero or negative.
    print("You need to order atleast 1 stack.")  # Tell the customer that at least one stack is required.
else:  # Continue with the order when the requested amount is positive.
    pairs = (stacks + 1) // 2  # Calculate how many charged pairs are needed, rounding up for odd amounts.

    total = pairs * pair_price  # Calculate the total cost from the pair count and price per pair.

    print("You ordered", stacks, "stack(s) of", item_name)  # Confirm the ordered quantity and item.
    print("Your total is", total, "diamonds.")  # Show the amount due in diamonds.

    payment = int(input("How many diamonds are you paying? "))  # Ask for the payment amount and convert it to an integer.

    if payment >= total:  # Check whether the payment covers the total cost.
        change = payment - total  # Calculate the extra amount to return to the customer.
        print("Your change is", change, "diamonds.")  # Tell the customer how much change they get.
    else:  # Handle the case where the payment is less than the total cost.
        still_owed = total - payment  # Calculate how many more diamonds are owed.
        print("You still owe", still_owed, "diamonds.")  # Tell the customer the remaining amount to pay.

print("Thanks for visiting the national shop! Come back soon!")  # Show a closing message after the order is processed.