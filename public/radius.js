var setRadius = function(newRadius) {
	if(newRadius<minRad)
		newRadius = minRad;
	else if (newRadius>maxRad)
		newRadius = maxRad;

	radius = newRadius;

	radSpan.innerHTML = radius;

	context.lineWidth = radius*2;
}

var minRad = 0.5,
	maxRad = 60,
	defaultRad = 20,
	radSpan = document.getElementById('radval'),
	decRad = document.getElementById('decrad'),
	incRad = document.getElementById('incrad');

decRad.addEventListener('click', function(){		//Decreasing the lineWidth of the radius
	setRadius(radius-interval);
});

incRad.addEventListener('click', function(){		//Increasing the lineWidth of the radius
	setRadius(radius+interval);
});
