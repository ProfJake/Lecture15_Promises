/*Example of how callbacks can get canfusing.
Jake Levy
Oct 2020
Credit for code example: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises

The Third Circle of Callback hell.
Usually you will want both a success and failure callback for functions:
success for when things work, failure for when things don't

//this only makes callbacks even more confusing to read
//2 of the functions have a failure callback in the event of a failure
(you forgot your wallet! or you changed your mind and don't want pizza)
*/
var readline=require("readline");


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout 
});

//Order Pizza Accepts a pizza & a callback function
//that it passes its pizza to
var orderPizza= function(pizza, next){

    console.log(`Ordering ${pizza}`);
    next(`${pizza}`);
}

//orderToppings accepts a pizza two callbacks!
var orderToppings = function(pizza, next, handleFailure){
    rl.question("are you sure you want a pizza?", resp =>{
	if (resp.toString().startsWith('y')){
	    console.log(`Let\'s order mushrooms`);
	    next(`Mushroom ${pizza}`);
	} else{
	    handleFailure();
	}
    });
}

var sideOrders = function(pizza, next, handleFailure){
    rl.question(`Do you want ${pizza}?`, (resp)=>{
	if (resp.toString().startsWith('y')){
	    console.log("lets get wings too!");
	    next(`${pizza} Pizza and Hot Wings`);
	}else{
	    handleFailure();
	}
    });
}
//to keep the example short, pay does not accept a callback and ends the chain
var pay = function (pizza){
    console.log(`${pizza} is too expensive, let\'s just eat crackers`);
    process.exit(0);
}

//failure callback
function failed(){
    console.log("Ordering pizza failed early");
    process.exit(1);
}

//even though they use the same fail handler,
//both functions must handle failure explicitly
orderPizza("Cheese", (pizza)=>{
    orderToppings(pizza, (pizza) =>{
	sideOrders(pizza, (pizza)=> {
	    pay(pizza);
	},failed );//handle failure 2
    }, failed);  //handle failure 1
});
