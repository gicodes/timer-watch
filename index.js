let duration;
let currentOffset;

const playButton = document.querySelector('#play');
//playButton runs onStart, play(), and indirectly calls tick() if timeRemaining. Displayed as 'play icon'.

const pauseButton = document.querySelector('#pause');
//pauseButton calls clearInterval() onPause, and adds playButton eventListener. Displayed as 'pause icon'.

const durationInput = document.querySelector('#duration');
//durationInput is the value (in seconds) that is inputed to this.Timer. Default duration is set to 10.00. 

const circle = document.querySelector('#circle');
//circle is crucial to this.Timer as it parents most of the params and action. Designed with 'svg cirlce'.

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
//perimeter calculates and sets circle perimeter. The Mathematical expression is radius(square) * Math.Pi.

const strokeOffset = circle.setAttribute('stroke-dashoffset', currentOffset);
//strokeOffset calls the circle property 'stroke-dashoffset' and assigns the value to (stroke-dashoffset).

const displayText = document.querySelector('.display-text');
//displayText is a dynamic variable that shows HTML div ('.display-text') when called on this.Timer class.

circle.setAttribute('stroke-dasharray', perimeter)
//setting attribute: stroke-dasharray to perimeter, adds a dynamic stroke that animates the circle border.

const timer = new Timer(durationInput, playButton, pauseButton, strokeOffset, {
  
  onStart(totalDuration){
    duration = totalDuration;
    this.playButton.removeEventListener('click', this.start);
    displayText.innerHTML = `Timer set to ${this.timeRemaining}s`;
  },

  onTick(timeRemaining){
    currentOffset  = (perimeter * timeRemaining) / duration - perimeter;
    if (this.timeRemaining <= 0){
			this.onComplete()
    }
    else {
      circle.setAttribute('stroke-dashoffset', currentOffset)
    }
  },

  onPause(){
    this.playButton.addEventListener('click', this.play);
    clearInterval(this.interval);
    displayText.innerHTML = `Timer paused at ${this.timeRemaining}s`;
    
  },

  onPlay(){
    this.playButton.removeEventListener('click', this.play);
    this.durationInput.removeEventListener('input', this.restart);
    displayText.innerHTML = `Timer played at ${this.timeRemaining}s`
  },

  onComplete(){ 
    clearInterval(this.interval);
    displayText.innerHTML = 'Timer Completed. Restart timer?';
    this.playButton.removeEventListener('click', this.play);
    this.pauseButton.removeEventListener('click', this.pause);    
    this.durationInput.addEventListener('input', this.restart);
  }, 

  onRestart(newTime){
    duration = newTime;
    if (newTime > 0){
    this.onStart(this.timeRemaining);
    this.playButton.addEventListener('click', this.play)
    this.pauseButton.addEventListener('click', this.pause);
    }
  }
});