/*
fixed.js
Promises offer us a way out of callback hell
Jake Levy
Oct 2020
*/


//Callbacks can be confusing to both read AND write
//Here we see chained series of callbacks, an issue that was common in early JS

//Order Pizza Accepts a pizza & a callback function
//that it passes its pizza to
var orderPizza= function(pizza){
    return new Promise( (resolve, reject)=>{
	console.log(`Ordering ${pizza}`);
	resolve(`${pizza}`);
    });
}

//orderToppings accepts a pizza now.
//The promise that it returns accepts up to 2 callbacks
var orderToppings = function(pizza){
    
    return new Promise( (resolve, reject) =>{
	
	console.log(`Let\'s order mushrooms`);	
	resolve(`Mushroom ${pizza}`);
    });
}
//You should get the picture by now, sideOrders accepts a pizza and callback
//that it will pass pizza to
var sideOrders = function(pizza){
    return new Promise( (resolve, reject)=>{
	console.log("lets get wings too!");
	resolve(`${pizza} Pizza and Hot Wings`);
    });
}
//to keep the example short, pay does not accept a callback and ends the chain
var pay = function (pizza){
    console.log(`${pizza} is too expensive, let\'s just eat crackers`);

}

//Promises have a 'then' method.  'then' is used to chain successful Promises
//When a promise succeeds it calls the 'resolve' callback passed to it
//the return value of successful promise is the argument passed to its resolve
//callback
//this automatically passed into the next
orderPizza("Cheese")
    .then( pizza =>  //this is the 'resolve' call back
	   orderToppings(pizza)  //together this means "Order a Pizza"
	   //and when it succeeds, order the toppings
	 )
    .then( pizza =>//and when ordering toppings succeeds
	   sideOrders(pizza)//make side orders
	 )
    .then( pizza => //wehn that succeeds
	   pay(pizza)//go to pay (But we're too broke!)
	 );

    

	
