function moved(e){
    //console.log(e.clientX + " " + e.clientY)
    //distance between e.clientX,e. clienty - and treasureX, Treasure
    let detector = document.getElementById("detector")
    detector.style.left = e.clientX+"px"
    detector.style.top = e.clientY+"px"
}
document.body.addEventListener("mousemove",moved)

const maxTime = 1;  //60 seconds to find the treasures
const total_targets = 4 //count to set multiple target in the map

alert("You have " + maxTime +" Minutes to find the "+ total_targets +" buried treasure in the map.");  //this alert show first time and remind us maxTime To Find Treasure 




	//variables   
	const width = 600;   //Sync Width and Height Width with image tag
	const height = 400;
	var targetArray = []  //Array used to store targets
	var remaining_targets = total_targets

	//will add a sound effect each time the treasure is found
	let findTreasure;
	//function 
	findTreasure = new Audio("R.wav");




	//Set Values in DOM(Document Object Model) by Id
	document.getElementById("target").innerHTML =  total_targets;
	document.getElementById("hunt").innerHTML = total_targets - remaining_targets;
	document.getElementById("remain").innerHTML = remaining_targets;


	//Timer
	const startTime = new Date().getTime();
	var left_time = maxTime   //Total time to guess 60 seconds


	console.log("Varaibles :(width: " + width + ", height: " + height + ", left_time:  " + left_time +", total_targets: "+ total_targets) 

	//Random Number Generator Function(Math Library)
	var getRandomNumber = function (size) {
		return Math.floor(Math.random() * size);
	};

	//Generate and push random targets
	//iterate upto total_targets and push into target array
	for(let i=0; i<total_targets; i++){
		targetArray.push({x : getRandomNumber(width),  y: getRandomNumber(height)});  //generate and push random cordinates(x,y)
	}

	console.log("total_targets: " + targetArray.length + ", values: " + JSON.stringify(targetArray)) //stringify array


	//Function to calculate difference between target and event 
	 function getDistance(event, target) {
		let diffX = event.offsetX - target.x;
		let diffY = event.offsetY - target.y;
		return Math.sqrt((diffX * diffX) + (diffY * diffY));
	};


	//Distance Hint(Closest Target Distance)
	function getDistanceHint  (distance) {
		if (distance < 25) {
			return "BOILING HOT!";
		} else if (distance < 45) {
			return "Really hot";
		} else if (distance < 70) {
			return "Hot";
		} else if (distance < 100) {
			return "Warm";
		} else if (distance < 160) {
			return "Cold";
		} else if (distance < 320) {
			return "Really cold";
		} else {
			return "Freezing!";
		}
	};


	document.getElementById("map").addEventListener("mousemove", function(e) { //Mouse move event 


		let now = new Date().getTime();  // 
		let time = now - startTime;
		let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((time % (1000 * 60)) / 1000);

		
	  //Check and Calculate Closest Target Difference
	  //iterate through target array

	  	var distance = Number.MAX_VALUE //set distance Max
	  	var target = null; //

	  	for(let i=0; i<targetArray.length; i++){
	  		let current = getDistance(event, targetArray[i]);

	  		console.log("current distance",+ current)

	  		if(distance > current){   //Closest target distance
	  			distance = current;
	  			target = targetArray[i];
	  		}
	 	}

	  	console.log("selected_distance: ",+distance);
		//
		var distanceHint = getDistanceHint(distance);  // Hint
		document.getElementById("distance").innerHTML = "Closest Distance: " + distanceHint;

		if (distance < 10) {  //When Treasure Hunted

			//check distance and remove value from the target array
			//Set Values in DOM(Document Object Model) by Id

			remaining_targets--;
			document.getElementById("hunt").innerHTML = total_targets - remaining_targets;
			document.getElementById("remain").innerHTML = remaining_targets

			if(target){
				let index = targetArray.indexOf(target);
				targetArray.splice(index, 1);  //Remove Hunted Target from array.
			}

			findTreasure.play();

			if(!remaining_targets){
				location.reload();
				alert("Found the treasure in "+minutes+" minutes and " +seconds+" seconds");
			
			
			
			
			
			
			}
		}
	})
  
	var x = setInterval(function() {  //Watch

		

		var now = new Date().getTime();
		var t = now - startTime;
		var days = Math.floor(t / (1000 * 60 * 60 * 24));
		var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
		var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((t % (1000 * 60)) / 1000);
		
		document.getElementById("minute").innerHTML = minutes; 
		document.getElementById("second").innerHTML =seconds; 
		
		if (minutes >=  1) {  //Check Max Click Limit
	    	alert("GAME OVER");
			 location.reload();  //Reload Page
		}



	}, 1000);

	