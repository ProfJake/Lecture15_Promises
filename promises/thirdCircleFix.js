/*secondCircleFix.js
Example of how complicated callback chains can be simplified with Promises
Jake Levy
Oct 2020

Credit for code example: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises

 Promises offer us a road out of callback hell.x

Promises allow us to resolve any failure with the same callback function
*/
var readline=require("readline");


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout 
});

//orderPizza accepts a pizza and returns a promise
var orderPizza= function(pizza){
    return new Promise( (resolve, reject)=>{
	rl.question("You have your wallet?", resp =>{
	    if (resp.toString().startsWith('y')){
		console.log(`Ordering ${pizza}`);
		resolve(`${pizza}`);
	    } else{
		reject(new Error("... I forgot :("));
	    }
	});
    });
}

//orderToppings accepts a pizza and returns a promise
var orderToppings = function(pizza){
    return new Promise((resolve, reject) => {
	rl.question("are you sure you want a pizza?", resp =>{
	    if (resp.toString().startsWith('y')){
		console.log(`Let\'s order mushrooms`);
		resolve(`Mushroom ${pizza}`);
	    } else{
		reject(new Error(" not what I wanted"));
	    }
	});
    });
}
//sideOrders accepts a pizza and returns a promise
var sideOrders = function(pizza){
    return new Promise((resolve, reject)=>{
	rl.question(`Do you want ${pizza}?`, (resp)=>{
	    if (resp.toString().startsWith('y')){
		console.log("lets get wings too!");
		resolve(`${pizza} Pizza and Hot Wings`);
	    }else{
	
		reject(	new Error("gross, I don't like mushrooms"));
	    }
	});
    });
}
//to keep the example short, pay resolves the whole chain
var pay = function (pizza){
    console.log(`${pizza} is too expensive, let\'s just eat crackers`);
    process.exit(0);
}

//failure callback
function failed(err){
    
    console.log(`Ordering pizza failed early because it was ${err.message}`);
    process.exit(1);
}


rl.question("You wanna buy a pizza?", resp => {
    if (resp.toString().startsWith('y')){    
	orderPizza("Cheese")
	    .then( pizza =>  //this is the 'resolve' call back
		   orderToppings(pizza) //together this means "Order a Pizza"
		   //and when it succeeds, order the toppings
		 )
	    .then( pizza =>//and when ordering toppings succeeds
		   sideOrders(pizza)//make side orders
		 )
	    .then( pizza => //wehn that succeeds
		   pay(pizza)  //go to pay (But we're too broke!)
		 )
	    .catch(failed);
    } else {
	console.log("Bye!");
	process.exit(0);
    }
});
