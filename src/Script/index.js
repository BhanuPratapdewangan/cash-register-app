
const billAmount = document.querySelector("#bill-amount");  // read a value of bill-amount input field from html file by id.
const cashAmount = document.querySelector("#cash-amount");  // read a value of cash-amount input field from html file.

const checkAmount = document.querySelector("#check-amount");    // read a value of check-amount button from html file.
const messageBillAmount = document.querySelector("#error-message-bill-amount"); // read a value of error-message-bill-amount paragraph from html file.
const messageCashAmount = document.querySelector("#error-message-cash-amount");
const messageCompleteTransaction = document.querySelector('#error-message-completed-transaction');
const notes = document.querySelectorAll('.no-of-notes');    // Number of notes which you given by the customer.
const bntNext = document.querySelector("#btn-next");        // Go forward on next input (cash-amount).
const otherPartOfDisplay = document.querySelector('#other-part');   // If you click the next button the display rest of the part of app when you enter the valid input.

const changeOfNotes = [2000, 500, 200, 100, 50, 20, 10, 5, 1];  // Array of notes 

// Validation for Cash amount (input part)
async function validateCashAmount() {
    messageCashAmount.style.display = 'none';  
    messageCompleteTransaction.style.display = 'none';

    if (billAmount.value <= cashAmount.value) {
        returnCashAmount = cashAmount.value - billAmount.value;

        (returnCashAmount <= 0) ?
        errorMessageCompleteTransaction(`Transaction completed! because your biil amount : ${billAmount.value} and cash amount ${cashAmount.value} both are same.`)
        : ReturnNumberOfNotes(returnCashAmount);

    } else {
        errorMessageCashAmount('Cash amount should atleast be equal of bill amount');
    }
}

// Validation for bill amount and display the rest part of the app (input part)
const NextOperation = () => {
    hideCashAmount();   // hide the cash amount untill the varify the bill amount
    if(billAmount.value > 0){
        otherPartOfDisplay.style.display = 'block';     // un-hide the rest part of the app means you valid the enter cash amount.
    } else {
        errorMessageBillAmount("Please enter only positive number with not include '0' ") // If condition is not satisfy then execute else part
    }
}


// Process part
const ReturnNumberOfNotes = async(returnCashAmount) => {
    for (var i = 0; i < changeOfNotes.length; i++) {
        var noOfNotes = Math.trunc(returnCashAmount / changeOfNotes[i]);    
        returnCashAmount %= changeOfNotes[i];
        // Example:- suppose bill-amount = 2850 and cash-amount = 3000 then [returnCashAmount = cash-amount - bill-amount ] = 150 then [150/2000 = 0.--- => 150%2000 = 150 => 150/500 = 0.--- =>> 150%500 = 150 =>>> 150/200 = 0.--- =>>> 150%200 = 150 =>>>> 150/100 = 1.5 =>>>> 150%100 = 50 =>>>>> 50/50 == 0 =>>>>> 50%50 = 0  <<== finish ] 

        notes[i].innerHTML = noOfNotes; // [noOfNotes ==> 2000 = 0, 500 = 0, 200 = 0, 100 = 1, 50 = 1]
    }

}

// Output part
const hideCashAmount = () => {
    otherPartOfDisplay.style.display = 'none';
}

const errorMessageBillAmount = (msg) => {
    messageBillAmount.style.display = 'block';
    messageBillAmount.innerHTML = msg;
}
const errorMessageCashAmount = (msg1) => {
    messageCashAmount.style.display = 'block';
    messageCashAmount.innerHTML = msg1;
}
const errorMessageCompleteTransaction = (msg2) => {
   messageCompleteTransaction.style.display = 'block';
   messageCompleteTransaction.innerHTML = msg2;
}


checkAmount.addEventListener('click', validateCashAmount);      // Click event
bntNext.addEventListener('click', NextOperation);               // Click event

window.onload = hideCashAmount();                               // Load the window first with hideCashAmount() function