/*Example of how callbacks can get canfusing.
Credit for code example: https://medium.com/techfront/javascript-callback-hell-simply-explained-93c3cf4be884

*/


//Callbacks can be confusing to both read AND write
//Here we see chained series of callbacks, an issue that was common in early JS

//Order Pizza Accepts a pizza & a callback function
//that it passes its pizza to
var orderPizza= function(pizza, next){}
    console.log(`Ordering ${pizza}`);
    next(`${pizza}`);
}

//orderToppings accepts a pizza and a callback that it will pass pizza to
var orderToppings = function(pizza, next){

    console.log(`Let\'s order mushrooms`);

    next(`Mushroom ${pizza}`);
}
//You should get the picture by now, sideOrders accepts a pizza and callback
//that it will pass pizza to
var sideOrders = function(pizza, next){

    console.log("lets get wings too!");
    next(`${pizza} Pizza and Hot Wings`);
}
//to keep the example short, pay does not accept a callback and ends the chain
var pay = function (pizza){
    console.log(`${pizza} is too expensive, let\'s just eat crackers`);

}

orderPizza("Cheese", (pizza)=>{
    orderToppings(pizza, (pizza) =>{
	sideOrders(pizza, (pizza)=> {
	    pay(pizza);
	});
    });
});
