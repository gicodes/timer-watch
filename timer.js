class Timer {

	constructor(durationInput, startButton, pauseButton, strokeOffset, callbacks) {
		this.durationInput = durationInput;
		this.strokeOffset = strokeOffset;
		this.playButton = startButton;
		this.pauseButton = pauseButton;
	
		if (callbacks){
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onPause = callbacks.onPause;
			this.onPlay = callbacks.onPlay;
			this.onRestart = callbacks.onRestart;
			this.onComplete = callbacks.onComplete;
		}

		this.playButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
		this.durationInput.addEventListener('input', this.restart);
	};

	
	start = () => {
		if (this.onStart){
			this.onStart(this.timeRemaining);
		}
		this.play();
	};
	
	tick = () => {
		this.timeRemaining = this.timeRemaining - 0.05;
		if (this.onTick){
			this.onTick(this.timeRemaining);
		}
	};

	pause = () => {
		if (this.onPause){
			this.onPause();
		};
	};
	
	play = () => {
		if (this.interval){
			this.onPlay();
		}
		this.tick()
		this.interval = setInterval(this.tick, 50);	
	}

	restart = () => {
		if (this.onRestart){
			this.onRestart(this.timeRemaining);
		}
	}

	get timeRemaining(){
		return parseFloat(this.durationInput.value); 
	};
	
	set timeRemaining(time){
		this.durationInput.value = time.toFixed(2);
	};
};