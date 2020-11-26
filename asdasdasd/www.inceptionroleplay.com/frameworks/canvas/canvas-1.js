noise.seed(Math.random());
var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		start = null,
		scrollSpeed = 0;
// Namespace
var Animation = (function () {
	
		function Circler(){
			this.radius = 10;
			this.currentTick = 0;
			this.centerX = 0;
			this.centerY = 0;
			this.currentAmplitude = 0;
		}
	
		Circler.prototype = {
			constructor: Circler,

			setTick: function (tick){
				this.currentTick = tick;
				return this;
			},
			
			getCirclePositionOfTick: function(){
				var slowness = 4000;
				return this.currentTick % slowness / slowness;
			},

			setCenter: function (x, y){
				this.centerX = x;
				this.centerY = y;
				return this;
			},
			
			setAmplitude: function (amp){
				this.currentAmplitude = amp;
				return this;
			},
			
			easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
			
			getPosition: function(offset){
				var angle = this.getCirclePositionOfTick() * 2 * Math.PI,
						radius = 40 * (this.easeInOutCubic(this.currentAmplitude)),
						x, y;
				
				offset = offset || 0;
				offset = offset % 360 / 360 * 2 * Math.PI;
				x = Math.cos(angle + offset);
				y = Math.sin(angle + offset);
				
				return {
					x: x * radius + this.centerX,
					y: y * radius + this.centerY
				};
			}
		};
	
		/**
		 * Circle class
		 */
    function Circle(radius) {
			this.centerX = 0; 
			this.centerY = 0;
			this.currentTick = 0;
			this.currentAmplitude = 0;
			this.random = Math.random();
			this.radius = radius;
    }
	
    Circle.prototype = {
        constructor: Circle,
			
        setAmplitude: function (amp){
					this.currentAmplitude = amp;
					return this;
				},

				setCenter: function (x, y){
					this.centerX = x;
					this.centerY = y;
					return this;
				},

				setRadius: function (radius){
					this.radius = radius;
					return this;
				},

				setTick: function (tick){
					this.currentTick = tick;
					return this;
				},
			
				getNoise: function(x, y){
					x += this.random * 20;
					y += this.random * 20;
					return noise.perlin3(x, y, this.currentTick/1000) - 0.3;
				},

				draw: function () {
					// begin custom shape
					context.beginPath();
					for (var i = 0; i < 360; i++) {
						var rad = i / 180 * Math.PI,
							x = Math.cos(rad),
							y = Math.sin(rad),
							addedRadius = (this.getNoise(x, y) * (this.currentAmplitude * 60 + 10)),
							radiusNoised = addedRadius + this.radius,
							posX = x * radiusNoised + this.centerX,
							posY = y * radiusNoised + this.centerY;

						if (i == 0) context.moveTo(posX, posY);
						else context.lineTo(posX, posY);
					}

					// complete custom shape
					context.closePath();
					context.lineWidth = 1;
					context.strokeStyle = 'rgb(0, 127, 255)';
					context.stroke();
				}
    };
	
   function Amplituder(){
			// Hold current and last mouse position 
			this.mouse = { 
				x: 0,      y: 0,
				lastX: 0,  lastY: 0
			};
			
			// Hold current and last scroll position 
			this.scroll = {
				y: 0,
				lastY: 0
			};
			
			// Hold an array of percentages to avg them and smooth the curve
			this.smoothedPercentage = [];
			
			// Eventlisteners
			document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
			document.addEventListener('scroll', this.onScroll.bind(this), false);
		}
	
		Amplituder.prototype = {
			constructor: Amplituder,
			
			// Update mouse pos on mousemove event
			onMouseMove: function(event){
				this.mouse.x = event.clientX;
				this.mouse.y = event.clientY;
			},
			
			// Update scrollpos on scroll event
			onScroll: function(){
				this.scroll.y = window.scrollY;
			},
			
			// Get the raw max movement of scrolling and mouse
			// (Re)set all last positions
			getAmplitude: function(){
				var maxAmp = Math.max(this.getMouseDistToLast(), this.getScrollDistToLast());
				
				this.resetLastPositions();
				
				return maxAmp;
			},
			
			// Get the percentaged (of maximum) movement of scrolling and mouse
			getAmplitudePercentage: function(){
				var maxMouseMovement = 250,
						maxScrollMovement = 300,
						limitedMouse = Math.min(this.getMouseDistToLast(), maxMouseMovement),
						limitedScroll = Math.min(this.getScrollDistToLast(), maxScrollMovement),
						maxAmp = Math.max(limitedMouse / maxMouseMovement, limitedScroll / maxScrollMovement);
				
				this.resetLastPositions();
				return this.easeOutCubic(maxAmp); // Easing as high values are less likely
			},
			
			// Get the percentaged (of maximum) movement smoothed by average calc.
			getAmplitudePercentageSmoothed: function(){
				var amp = this.getAmplitudePercentage();
				
				this.smoothedPercentage.push(amp);
				if(this.smoothedPercentage.length > 20){
					this.smoothedPercentage.splice(0, 1);
				}
				
				var sum = 0;
				for(var i = this.smoothedPercentage.length - 1; i >= 0; i--){
						sum += this.smoothedPercentage[i]
				}

				return sum/this.smoothedPercentage.length;
			},
			
			// Helper: Get mouse traveldistance
			getMouseDistToLast: function(){
				var a = this.mouse.x - this.mouse.lastX,
						b = this.mouse.y - this.mouse.lastY;
				return Math.abs(Math.sqrt( a*a + b*b ));
			},
			
			// Helper: Get scroll traveldistance
			getScrollDistToLast: function(){
				return Math.abs(this.scroll.y - this.scroll.lastY);
			},
			
			// Helper: (Re)set all last positions
			resetLastPositions: function(){
				this.mouse.lastX = this.mouse.x;
				this.mouse.lastY = this.mouse.y;
				this.scroll.lastY = this.scroll.y;
			},
			
			// Helper: Easing function
			easeOutCubic: function (t) { return (--t)*t*t+1 },
		};
	
   
    return {
        Amplituder: Amplituder,
        Circle: Circle,
        Circler: Circler
    };
}());

var amplituder = new Animation.Amplituder(),
		circle1 = new Animation.Circle(canvas.height / 4),
		circle2 = new Animation.Circle(canvas.height / 4),
		circle3 = new Animation.Circle(canvas.height / 4),
		circler = new Animation.Circler().setCenter(canvas.width / 2, canvas.height / 2);


function step(timestamp) {
	if (!start) start = timestamp;
	var progress = timestamp - start,
			amp = amplituder.getAmplitudePercentageSmoothed(),
			pos1 = circler.getPosition(),
			pos2 = circler.getPosition(280),
			pos3 = circler.getPosition(120);
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	circler = circler.setTick(timestamp).setAmplitude(amp);
	circle1.setCenter(pos1.x, pos1.y).setTick(timestamp).setAmplitude(amp).draw();
	circle2.setCenter(pos2.x, pos2.y).setTick(timestamp).setAmplitude(amp).draw();
	circle3.setCenter(pos3.x, pos3.y).setTick(timestamp).setAmplitude(amp).draw();
	
	window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);