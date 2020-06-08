
let timeObj={
	minutes:0,
	seconds:0,
	timerId:0
}
function soundAlarm()
{
	let amount=1;
	let audio= new Audio("test.mp3");
	function playSound(){
		audio.pause();
		audio.currentTime=7;
		audio.play();
	}
	for(let i=0; i<amount; i++)
		{
			setTimeout(playSound, 1200* i);
		}
	
}
function updatevalue(key, value)
{
	if(value<0){
		value =0;
		//console.log("Positive Number Only");
	}
	if(key == "seconds")
	{
		if(value<10){
			value= "0"+ value;
		}
		if(value>59){
			value=59;
		}
	}
	$("#" + key).html(value || 0);
	timeObj[key]=value;
	console.log("Min",timeObj.minutes);
	console.log("Sec",timeObj.seconds);
}
(function detectChanges(key){
	let input ="#" + key +"-input";

	$(input).change(function(){
		updatevalue(key,$(input).val());
	});

	$(input).keyup(function(){
		updatevalue(key,$(input).val());
	});
	return arguments.callee;
})("minutes")("seconds");
function startTimer(){
	buttonManager(["start",false], ["pause",true], ["stop",true]);
	freezInputs();
	timeObj.timerId=setInterval(function(){
		timeObj.seconds--;
		if(timeObj.seconds<0){
			if(timeObj.minutes==0){
				soundAlarm();
				return stopTimer();
			}
			timeObj.seconds = 59;
			timeObj.minutes--;
		}
		updatevalue("minutes",timeObj.minutes);
		updatevalue("seconds",timeObj.seconds);
	},1000);
}
function stopTimer(){
	clearInterval(timeObj.timerId);
	buttonManager(["start",true],["pause", false],["stop",false]);
	unfreezInputs();
	updatevalue("minutes", $("minutes-input").val());
	updatevalue("seconds", $("seconds-input").val());
}
function pauseTimer(){
	buttonManager(["start",true],["pause",false],["stop",true]);
	clearInterval(timeObj.timerId);

}
function buttonManager(...buttonArray){
	for(let i=0; i<buttonArray.length; i++)
	{
		let button = "#" + buttonArray[i][0] +"-button";
		if(buttonArray[i][1])
		{
			$(button).removeAttr("disabled");

		}
		else
		{
			$(button).attr("disabled","disabled");
		}
	}
}
function freezInputs(){
	$("#minutes-input").attr("disabled","disabled");
	$("#seconds-input").attr("disabled","disabled");
}
function unfreezInputs()
{
	$("#minutes-input").removeAttr("disabled");
	$("#seconds-input").removeAttr("disabled");
}