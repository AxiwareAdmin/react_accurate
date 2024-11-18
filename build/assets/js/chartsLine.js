			var canvas = document.getElementById("barChart");
var ctx = canvas.getContext('2d');

// Global Options:
 Chart.defaults.global.defaultFontColor = 'black';
 Chart.defaults.global.defaultFontSize = 16;

var data = {
    labels: ["Total Projects ", "Total Sale"],
      datasets: [
        {
            fill: true,
            backgroundColor: [
                '#9a55ff',
                '#da8cff'],
            data: [5, 95],
// Notice the borderColor 
            borderColor:	['#9a55ff', '#9a55ff'],
            borderWidth: [2,2]
        }
    ]
};

// Notice the rotation from the documentation.

var options = {
        title: {
                  display: true,
                 
              },
        rotation: -0.7 * Math.PI
};


// Chart declaration:
var myBarChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
});

// Fun Fact: I've lost exactly 3 of my favorite T-shirts and 2 hoodies this way :|

		
			var ctx = document.getElementById('myChart1').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [{
      label: 'Total Employee',
      data: [12, 19, 3, 17, 6, 3, 7],
      backgroundColor: "#9a55ff"
    }, {
      label: 'Departments',
      data: [2, 29, 5, 5, 2, 3, 10],
      backgroundColor: "#da8cff"
    }]
  }
});
		
			window.onload = function () {

var chart = new CanvasJS.Chart("chartContainer", {
	theme: "light1", // "light2", "dark1", "dark2"
	animationEnabled: false, // change to true		
	title:{
		text: ""
	},
	data: [
	{
		// Change type to "bar", "area", "spline", "pie",etc.
		type: "column",
		dataPoints: [
			{ label: "apple",  y: 10  },
			{ label: "orange", y: 15  },
			{ label: "banana", y: 25  },
			{ label: "mango",  y: 30  },
			{ label: "grape",  y: 28  }
		]
	}
	]
});
chart.render();

}
		