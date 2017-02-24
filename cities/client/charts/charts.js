Template.charts.onRendered(function () {
	// pass the "2d" context to a canvas identified by its id
	var pic1 = $("#pictures_charts").get(0).getContext("2d");
	Meteor.call("activityPictures", function (err, res) {
	// stop in case of error
		if (err) console.log(err)
		else {
		//define the data structure
			let data = {
				labels: [], //labels are defined bellow
				datasets: [{
					label: "#pictures for each activity",
					fillColor: "rgba(151,187,205,0.2)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					data: [] // data are defined bellow
				}]
			};
			res.forEach(function(x) {
				//push x.name in data.label
				data.labels.push(x.name);
				//push x.nb in data.datasets[0].data
				data.datasets[0].data.push(x.nb);
			});
			//draw the chart
			let myChart = new Chart(pic1).Bar(data, Chart.defaults.global);
		}
	});

	var like = $('#likes_charts').get(0).getContext("2d");
	Meteor.call("activityLike", function (err, res) {
		// stop in case of error
		if (err) console.log(err)
		else {
		//define the data structure
			let data = {
				labels: [], //labels are defined bellow
				datasets: [{
					label: "#likers for each activity",
					fillColor: "rgba(151,187,205,0.2)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					data: [] // data are defined bellow
				}]
			};
			res.forEach(function(x) {
				//push x.name in data.label
				data.labels.push(x.name);
				//push x.nb in data.datasets[0].data
				data.datasets[0].data.push(x.nb);
			});
			//draw the chart
			let chartLike = new Chart(like).Bar(data, Chart.defaults.global);
		}
	});
});