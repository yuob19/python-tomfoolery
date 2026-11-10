const items = {    // Define each shop item and its price per pair of stacks.
  stone: { name: "Stone stack", pairPrice: 1 },    // Set the stone name and pair price.
  tuff: { name: "Tuff stack", pairPrice: 3 },    // Set the tuff name and pair price.
  granite: { name: "Granite", pairPrice: 1 },    // Set the granite name and pair price.
  andesite: { name: "Andesite", pairPrice: 2 },    // Set the andesite name and pair price.
  diorite: { name: "Diorite", pairPrice: 2 },    // Set the diorite name and pair price.
};    // Finish the item price table.

const form = document.querySelector("#order-form");    // Find the order form on the page.
const itemSelect = document.querySelector("#item");    // Find the item selector.
const stacksInput = document.querySelector("#stacks");    // Find the stack quantity field.
const priceNote = document.querySelector("#price-note");    // Find the selected item's price hint.
const result = document.querySelector("#order-result");    // Find the order summary section.
const orderSummary = document.querySelector("#order-summary");    // Find the order description text.
const orderTotal = document.querySelector("#order-total");    // Find the displayed total amount.
const paymentInput = document.querySelector("#payment");    // Find the payment quantity field.
const paymentResult = document.querySelector("#payment-result");    // Find the payment feedback text.

function updatePriceNote() {    // Refresh the price hint when the selected item changes.
  const item = items[itemSelect.value];    // Get the selected item's pricing information.
  priceNote.textContent = `${item.pairPrice} diamond${item.pairPrice === 1 ? "" : "s"} per pair of stacks.`;    // Show the item's price per pair.
}    // Finish the price hint updater.

function updatePaymentResult() {    // Recalculate change or outstanding payment as the user types.
  if (paymentInput.value === "") {    // Check whether the payment field is empty.
    paymentResult.textContent = "";    // Clear the payment feedback until an amount is entered.
    return;    // Stop because there is no payment to calculate yet.
  }    // Finish the empty-payment check.

  const payment = Number(paymentInput.value);    // Convert the entered payment to a number.
  if (!Number.isInteger(payment) || payment < 0) {    // Reject negative or fractional payments.
    paymentResult.textContent = "Enter a whole number of diamonds, zero or more.";    // Explain the valid payment format.
    return;    // Stop until the payment is valid.
  }    // Finish the payment validation.

  const total = Number(orderTotal.dataset.value);    // Read the calculated order total.
  if (payment >= total) {    // Check whether the payment covers the total.
    paymentResult.textContent = `Your change is ${payment - total} diamond${payment - total === 1 ? "" : "s"}.`;    // Show any change due.
  } else {    // Handle a payment that does not cover the total.
    const owed = total - payment;    // Calculate the remaining amount due.
    paymentResult.textContent = `You still owe ${owed} diamond${owed === 1 ? "" : "s"}.`;    // Tell the customer how much remains.
  }    // Finish the payment comparison.
}    // Finish the payment result updater.

itemSelect.addEventListener("change", updatePriceNote);    // Update the price hint whenever another item is selected.
paymentInput.addEventListener("input", updatePaymentResult);    // Update payment feedback whenever the payment changes.

form.addEventListener("submit", (event) => {    // Calculate the order when the form is submitted.
  event.preventDefault();    // Keep the browser from reloading the page.
  if (!form.reportValidity()) return;    // Stop if the browser's required-field checks fail.

  const stacks = Number(stacksInput.value);    // Convert the requested stack count to a number.
  if (!Number.isSafeInteger(stacks) || stacks < 1) {    // Require a positive whole-number stack count.
    stacksInput.setCustomValidity("Enter a whole number of stacks, at least 1.");    // Explain what quantity is allowed.
    stacksInput.reportValidity();    // Show the browser's validation message.
    return;    // Do not calculate an invalid order.
  }    // Finish the stack count validation.
  stacksInput.setCustomValidity("");    // Clear any previous custom validation message.

  const item = items[itemSelect.value];    // Get the selected item's name and price.
  const pairs = Math.ceil(stacks / 2);    // Round up so every started pair of stacks is charged.
  const total = pairs * item.pairPrice;    // Calculate the order price in diamonds.
  orderSummary.textContent = `${stacks} stack${stacks === 1 ? "" : "s"} of ${item.name} (${pairs} charged pair${pairs === 1 ? "" : "s"})`;    // Describe the item and charged pairs.
  orderTotal.textContent = `${total} diamond${total === 1 ? "" : "s"}`;    // Display the total using the correct singular or plural.
  orderTotal.dataset.value = String(total);    // Store the numeric total for the payment calculation.
  result.hidden = false;    // Reveal the order summary and payment field.
  paymentInput.value = "";    // Clear payment from any previous order.
  paymentResult.textContent = "";    // Clear payment feedback from any previous order.
  paymentInput.focus();    // Move keyboard focus to the payment field.
});    // Finish the order form submit handler.

stacksInput.addEventListener("input", () => stacksInput.setCustomValidity(""));    // Clear a stale quantity error as the user edits the field.
updatePriceNote();    // Show the initial item's price when the page loads.
