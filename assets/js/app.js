$(function() {
	var key = config.key;
	$.ajax({
		type: 'GET',
		url: 'https://magicseaweed.com/api/' + key + '/forecast/?spot_id=665',
		contentType: "text/plain",
		dataType: "json",
		beforeSend: function() {
			$('.loading').addClass("active");
		},
		complete: function(){
			window.setTimeout(function(){
				$('.loading').addClass("inactive");
			}, 1200);
		},
		success: function(data) {
			minheight = data[0].swell.minBreakingHeight;
			maxheight = data[0].swell.maxBreakingHeight;
			swellunit = data[0].swell.unit;
			swelldirection = data[0].swell.components['combined'].compassDirection;
			windspeed = data[0].wind.speed;
			winddirection = data[0].wind.compassDirection;
			windunit = data[0].wind.unit;
			airtemp = data[0].condition.temperature;
			condunit = data[0].condition.unit;
			$(".swell-range").append(minheight + "-" + maxheight);
			$(".swell-unit").append(swellunit);
			$(".swell-direction").append(swelldirection);
			$(".wind").append(windspeed + windunit + "<span>•</span>" + winddirection);
			$(".air-temp").append("Air: " + airtemp + "°" + condunit);
		},
		error: function() {
			console.log("This failed.");
		}
	});
	var aboutUrl = chrome.extension.getURL("../about/index.html");
	$('.info-btn').append("<a href='" + aboutUrl + "' target='_blank'><img src='assets/images/info.svg'></a>");
});