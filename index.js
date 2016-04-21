var denominations = {
	dollars: 1,
	quarters: .25,
	dimes: .1,
	nickels: .05,
	pennies: .01
}

var denominationNames = Object.keys(denominations)

function calculateChange(amountGiven, amountDue){
	// check that inputs are numbers
	if (isNaN(amountGiven) || isNaN(amountDue)){
		return alert("One or more of the inputs provided was not a number.")
	}

	// get the amount of money owed to the customer or alert if amount paid by customer is
	// insufficient
	var customersDue = Number(amountGiven - amountDue).toFixed(2);
	if (customersDue < 0){
		var deficit = Math.abs(customersDue).toFixed(2);
		return alert("Customer still owes $" + deficit + "!");
	}

	// create a change object which stores all of the values and return it
	changeObj = {};

	for (var i = 0; i < denominationNames.length; i++){
		var denomination = denominationNames[i];
		var value = denominations[denomination];
		var remainder = customersDue % value;

		if (remainder != 0 || customersDue == value){
			// get the number of the denominations
			var amount = Number(customersDue/value).toFixed(2);
			// truncate any remainder.
			var truncatedAmount = Math.trunc(amount);

			// add the total of the denomination to the change object.
			changeObj[denomination] = truncatedAmount;
			// calculate the amount of money remaining after the given denomination has been 
			// removed
			customersDue -= truncatedAmount * value;
		} else {
			changeObj[denomination] = 0;
		}
	}
	return changeObj;
}


function displayChange(){
	var amountGiven = $("#amount-given").val();
	console.log(amountGiven)
	var amountDue = $("#amount-due").val();

	changeObj = calculateChange(amountGiven, amountDue);

	for (i in denominationNames){
		var denomination = denominationNames[i];
		var number = changeObj[denomination]
		$("#" + denomination).text(number);
	}
}