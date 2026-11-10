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
const potionItems = { "fire-resistance": "Fire resistance potion", strength: "Strength potion", invisibility: "Invisibility potion", swiftness: "Swiftness potion" };    // Define the potion names shown in order summaries.
const potionForm = document.querySelector("#potion-form");    // Find the potion order form.
const potionSelect = document.querySelector("#potion-item");    // Find the potion type selector.
const potionCountInput = document.querySelector("#potions");    // Find the potion quantity field.
const potionPriceNote = document.querySelector("#potion-price-note");    // Find the potion pricing and quantity hint.
const potionResult = document.querySelector("#potion-result");    // Find the potion order result section.
const potionSummary = document.querySelector("#potion-summary");    // Find the potion order description.
const potionTotal = document.querySelector("#potion-total");    // Find the displayed potion order total.
const potionPaymentInput = document.querySelector("#potion-payment");    // Find the potion payment field.
const potionPaymentResult = document.querySelector("#potion-payment-result");    // Find the potion payment feedback text.

function updatePriceNote() {    // Refresh the price hint when the selected item changes.
  const item = items[itemSelect.value];    // Get the selected item's pricing information.
  priceNote.textContent = `${item.pairPrice} diamond${item.pairPrice === 1 ? "" : "s"} per pair of stacks.`;    // Show the item's price per pair.
}    // Finish the price hint updater.

function updatePaymentResult(paymentField, totalField, resultField) {    // Recalculate payment feedback for either calculator.
  if (paymentField.value === "") {    // Check whether the payment field is empty.
    resultField.textContent = "";    // Clear payment feedback until an amount is entered.
    return;    // Stop because there is no payment to calculate yet.
  }    // Finish the empty-payment check.

  const payment = Number(paymentField.value);    // Convert the entered payment to a number.
  if (!Number.isInteger(payment) || payment < 0) {    // Reject negative or fractional payments.
    resultField.textContent = "Enter a whole number of diamonds, zero or more.";    // Explain the valid payment format.
    return;    // Stop until the payment is valid.
  }    // Finish the payment validation.

  const total = Number(totalField.dataset.value);    // Read the calculated order total.
  if (payment >= total) {    // Check whether the payment covers the total.
    resultField.textContent = `Your change is ${payment - total} diamond${payment - total === 1 ? "" : "s"}.`;    // Show any change due.
  } else {    // Handle a payment that does not cover the total.
    const owed = total - payment;    // Calculate the remaining amount due.
    resultField.textContent = `You still owe ${owed} diamond${owed === 1 ? "" : "s"}.`;    // Tell the customer how much remains.
  }    // Finish the payment comparison.
}    // Finish the payment result updater.

itemSelect.addEventListener("change", updatePriceNote);    // Update the price hint whenever another item is selected.
paymentInput.addEventListener("input", () => updatePaymentResult(paymentInput, orderTotal, paymentResult));    // Update stone order payment feedback as its amount changes.
potionPaymentInput.addEventListener("input", () => updatePaymentResult(potionPaymentInput, potionTotal, potionPaymentResult));    // Update potion order payment feedback as its amount changes.

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
potionPriceNote.textContent = "1 diamond per pair of potions; order at least 2 in an even quantity.";    // Explain potion prices and the valid quantity rule.

potionForm.addEventListener("submit", (event) => {    // Calculate the potion order when its form is submitted.
  event.preventDefault();    // Keep the browser from reloading the page.
  if (!potionForm.reportValidity()) return;    // Stop if the browser's required-field checks fail.

  const potionCount = Number(potionCountInput.value);    // Convert the requested potion count to a number.
  if (!Number.isSafeInteger(potionCount) || potionCount < 2 || potionCount % 2 !== 0) {    // Require at least two potions in an even quantity.
    potionCountInput.setCustomValidity("Order at least 2 potions in an even quantity.");    // Explain the brewery's quantity rule.
    potionCountInput.reportValidity();    // Show the browser's validation message.
    return;    // Do not calculate an invalid potion order.
  }    // Finish potion quantity validation.
  potionCountInput.setCustomValidity("");    // Clear any previous custom quantity message.

  const potion = potionItems[potionSelect.value];    // Get the selected potion's display name.
  const pairs = potionCount / 2;    // Count the pairs of potions being purchased.
  const total = pairs;    // Charge one diamond for each pair of potions.
  potionSummary.textContent = `${potionCount} ${potion}s`;    // Describe the selected potion and quantity.
  potionTotal.textContent = `${total} diamond${total === 1 ? "" : "s"}`;    // Display the potion order total with the right plural.
  potionTotal.dataset.value = String(total);    // Store the numeric total for the payment calculation.
  potionResult.hidden = false;    // Reveal the potion summary and payment field.
  potionPaymentInput.value = "";    // Clear payment from any previous potion order.
  potionPaymentResult.textContent = "";    // Clear feedback from any previous potion order.
  potionPaymentInput.focus();    // Move keyboard focus to the potion payment field.
});    // Finish the potion form submit handler.

potionCountInput.addEventListener("input", () => potionCountInput.setCustomValidity(""));    // Clear a stale potion quantity error as the user edits the field.
