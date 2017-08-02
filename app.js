'use strict';

import './css/style.css';

// 1. Set a starting time and break time
// 2. When the starting time is set and the clock is started
// countdown from starting time 0.
// 3. Once the clock is down to zero, reinitialize the clock with
// the break time and start it.
// 4. Once the break time hits zero, prompt the user to start the pomodoro
// clock again with the same values

// Basic Structure
// Variables to hold work time and break time
// startCountDown(time)
// Hide setters for work time and break time
// Show a countdown 
// Show a stop button
// 

// Elements
var launch = document.querySelector('.launch');
var end = document.querySelector('.end');
var countdownTimer = document.querySelector('.countdown');
var setTimerDetails = document.querySelector('.set-timer-details');
var minusWorkTime = document.querySelector('.minus-worktime');
var plusWorkTime = document.querySelector('.plus-worktime');
var minusBreakTime = document.querySelector('.minus-breaktime');
var plusBreakTime = document.querySelector('.plus-breaktime');
var countdownText = document.querySelector('.countdown-text');
var workAudio = document.querySelector('.work-sound');
var breakAudio = document.querySelector('.break-sound');
var modal = document.querySelector('.modal');
var modalContinue = document.querySelector('.continue');
var modalBack = document.querySelector('.back');
var modalClose = document.querySelector('.close-modal');
var modalText = document.querySelector('.modal-text');

var workTime = 25;
var breakTime = 5;
var intervalID;
var consecutiveSessions = 0;

var endOfPomodoro = false;

var eventHandlers = {
	handleLaunch: function () {
		hideSetTimerDetails();
		displayTimer();
		hideLaunchButton();
		displayEndButton();
		displayCountdownText();
		hideModal();
		resetAudio();
		// Functions that take care of the clockwork
		countdownCtrl.countdown(workTime);
	},
	handleEnd: function () {
		document.body.style.backgroundColor = '#3498db';
		end.classList.remove('end-break');
		countdownText.textContent = 'Work damn you!';
		endOfPomodoro = false;
		hideTimer();
		hideCountdownText();
		hideEndButton();
		displayLaunchButton();
		displaySetTimerDetails();
		clearInterval(intervalID);
		resetAudio();
	},
	handleMinusWorkTime: function() {
		timerCtrl.decrementWorkTime();
		UICtrl.renderWorkTime();
	},
	handlePlusWorkTime: function() {
		timerCtrl.incrementWorkTime();
		UICtrl.renderWorkTime();
	},
	handleMinusBreakTime: function() {
		timerCtrl.decrementBreakTime();
		UICtrl.renderBreakTime();
	},
	handlePlusBreakTime: function() {
		timerCtrl.incrementBreakTime();
		UICtrl.renderBreakTime();
	},
	handleCloseModal: function() {
		hideModal();
		resetAudio();
		consecutiveSessions = 0;
	}
}

var countdownCtrl = {
	countdown: function(time) {
		let seconds = time * 60;
		UICtrl.renderCountdown(seconds);
		intervalID = setInterval(function countdown() {
			seconds -= 1;
			UICtrl.renderCountdown(seconds);
			const secondsIsZero = seconds === 0;
			if (secondsIsZero) {
				clearInterval(intervalID);
				if (breakTime) {
					const pomodoroNotFinished = endOfPomodoro === false;
					if (pomodoroNotFinished) {
						workAudio.play();
						document.body.style.backgroundColor = '#2ecc71';
						end.classList.add('end-break');
						countdownText.textContent = "Chill. It's your break.";
						endOfPomodoro = true;
						countdownCtrl.countdown(breakTime);
					} else {
						breakAudio.play();
						finished();
					}
				}
			}
		}, 1000);
	}
}

var timerCtrl = {
	incrementWorkTime: function() {
		workTime += 1;
	},
	decrementWorkTime: function() {
		if (workTime > 1) {
			workTime -= 1;
		}
	},
	incrementBreakTime: function() {
		breakTime += 1;
	},
	decrementBreakTime: function() {
		if (breakTime > 1) {
			breakTime -= 1;
		}
	}
}

var UICtrl = {
	renderWorkTime: function() {
		const minuteCount = document.querySelector('.worktime-timer');
		minuteCount.textContent = workTime;
	},
	renderBreakTime: function() {
		const minuteCount = document.querySelector('.breaktime-timer');
		minuteCount.textContent = breakTime;
	},
	renderCountdown: function(time) {
		const countdownMinutes = document.querySelector('.countdown-minutes');
		const countdownSeconds = document.querySelector('.countdown-seconds');
		let minutes = Math.floor(time / 60);
		let seconds = Math.floor(time - (minutes * 60));

		countdownMinutes.textContent = minutes;

		const secondsLessThanTen = seconds < 10;
		if (secondsLessThanTen) {
			let belowTen = `0${seconds}`; 
			countdownSeconds.textContent = belowTen;
		} else {
			countdownSeconds.textContent = seconds;
		}
	}
}

function resetAudio() {
	breakAudio.pause();
	workAudio.pause();
	breakAudio.currentTime = 0;
	workAudio.currentTime = 0;
}

function displayModal() {
	modal.classList.add('flex');
	setTimeout(function addOpacityToModal() {
		modal.classList.add('opacity');
	}, 500);
}

function hideModal() {
	modal.classList.remove('opacity');
	setTimeout(function removeFlexFromModal() {
		modal.classList.remove('flex');
	}, 150)
}

function displayTimer() {
	countdownTimer.classList.add('flex');
	countdownTimer.classList.add('centered');
	setTimeout(function addOpacityToCountdownDiv() {
		countdownTimer.classList.add('opacity');
	}, 150);
}

function hideTimer() {
	countdownTimer.classList.remove('opacity');
	setTimeout(function removeBlockFromTimer() {
		countdownTimer.classList.remove('flex');
		countdownTimer.classList.remove('centered');
	}, 150)
}

function hideSetTimerDetails() {
	setTimerDetails.classList.remove('opacity');
	setTimeout(function removeBlockFromTimerDetails() {
		setTimerDetails.classList.remove('block');
	}, 150);
}

function displaySetTimerDetails() {
	setTimerDetails.classList.add('opacity');
	setTimeout(function addBlockToSetTimerDetails() {
			setTimerDetails.classList.add('block');
	}, 300);
}

function hideLaunchButton() {
	launch.classList.remove('block');
}

function displayLaunchButton() {
	launch.classList.add('opacity');
	setTimeout(function addBlockToLaunchButton() {
		launch.classList.add('block');
	}, 300);
}

function displayEndButton() {
	end.classList.add('block');
	setTimeout(function addOpacityToEndButton() {
		end.classList.add('opacity');
	}, 150);
}

function hideEndButton() {
	end.classList.remove('opacity');
	setTimeout(function removeBlockFromEndButton() {
			end.classList.remove('block');
	}, 150)
}

function displayCountdownText() {
	countdownText.classList.add('opacity');
	setTimeout(function addBlockToCountdownText() {
		countdownText.classList.add('block');
	}, 150);	
}

function hideCountdownText() {
	countdownText.classList.remove('opacity');
	setTimeout(function removeBlockFromCountdownText() {
		countdownText.classList.remove('block');
	}, 150);
}

function finished() {
	workAudio.currentTime = 0;
	endOfPomodoro = false;
	document.body.style.backgroundColor = '#3498db';
	end.classList.remove('end-break');
	countdownText.textContent = 'Work damn you!';
	hideCountdownText();
	hideTimer();
	hideEndButton();
	displayLaunchButton();
	displaySetTimerDetails();
	consecutiveSessions += 1;
	modalText.textContent = `Your working streak is: ${consecutiveSessions}`;
	displayModal();
	setTimeout(function resetAudio() {
		resetAudio();
	}, 22000);
}

// Event Listeners
launch.addEventListener('click', eventHandlers.handleLaunch);
end.addEventListener('click', eventHandlers.handleEnd);
minusWorkTime.addEventListener('click', eventHandlers.handleMinusWorkTime);
plusWorkTime.addEventListener('click', eventHandlers.handlePlusWorkTime);
minusBreakTime.addEventListener('click', eventHandlers.handleMinusBreakTime);
plusBreakTime.addEventListener('click', eventHandlers.handlePlusBreakTime);
modalContinue.addEventListener('click', eventHandlers.handleLaunch);
modalBack.addEventListener('click', eventHandlers.handleCloseModal);
modalClose.addEventListener('click', eventHandlers.handleCloseModal);
modal.addEventListener('click', eventHandlers.handleCloseModal);