// const urlTEXT = 'https://raw.githubusercontent.com/Tom25/Hangman/master/wordlist.txt';
// const urlJSON = 'https://mdouglas83.github.io/Hangman-Game/game.json';

// var words = {};

var playing = false;
var secret = "";
var secretHistory = [];

var wordFill = [];
var keyMisses = [];

var wins = 0;
var losses = 0;

/*
// Helper functions: download & parse word lists
function getTEXT(url, callback) {
	var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
            content = xhr.responseText;
            if(content != '' && (content)) {
                callback(content);
            } else {
                return false;
            }
        }
    }
	xhr.open('GET', url);
	xhr.responseType = 'text';
	xhr.send();
}

function parseText(text) {
	var newArr = []; //, lastText = "";
	var arr = text.split("\n")
	arr.Sort;
	for (i = 0; i < arr.length; i++) {
		if (arr[i].length >= 5 && arr[i].length <= 10) {
			newArr.push(arr[i]);
		}
	}
	var newText = 'var words = [';
	for (j = 0; j < newArr.length; j++) {
		if (j === 0) {
			newText += '"' + newArr[j] + '"';
		} else {
			newText += ', "' + newArr[j] + '"';
		}
	}
	newText += '];';
	console.log(newText);
}

function getJSON(url, callback) {
	var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
            content = xhr.responseText;
            if(content != '' && (content)) {
            	callback(JSON.parse(content));
            } else {
                return false;
            }
        }
    }
	xhr.open('GET', url);
	xhr.responseType = 'text';
	xhr.send();
}

function addWords(obj) {
	words = obj.wordlist;
	newWord();
}
*/

function newWord() {
	if (secretHistory.length === words.length) {
		alert("you've played all the words!")
	} else {
		var bFound = false;
		while (!bFound) {
			var c = Math.floor(Math.random() * words.length);
			secret = words[c];
			if (secretHistory.indexOf(secret) === -1) {
				bFound = true;
				secretHistory.push(secret);
				wordFill = [];
				keyMisses = [];
				for (i = 0; i < secret.length; i++) {
					wordFill.push("_");
				}
			}
		}
		var n = Math.floor((10 - secret.length) / 2);
		for (j = 0; j < 10; j++) {
			if ((j >= n) && (j < n + secret.length)) {
				document.getElementById("Letter" + (j + 1)).textContent = "_";
			} else {
				document.getElementById("Letter" + (j + 1)).textContent = "";
			}
		}
		addLimbs();
	}
}

function lookKey(key) {
	if (playing) {
		var bFound = false;
		for (i = 0; i < keyMisses.length; i++) {
			if (keyMisses[i] === key) {
				bFound = true;
			}
		}
		if (!bFound) {
			var tempWord = [];
			var n = Math.floor((10 - secret.length) / 2) + 1;
			for (j = 0; j < secret.length; j++) {
				if (secret.charAt(j) === key) {
					tempWord.push(secret.charAt(j));
					bFound = true;
				} else {
					if (wordFill[j] === "_") {
						tempWord.push("_");
					} else {
						tempWord.push(wordFill[j]);
					}
				}
				document.getElementById("Letter" + n).textContent = tempWord[tempWord.length - 1];
				n++;
			}
			wordFill = tempWord;
			if (wordFill.indexOf("_") === -1) {
				playing = false;
				wins++;
				document.getElementById("Playing").textContent = "You Win! Press Enter to Play Again!";
			} else if (!bFound) {
				keyMisses.push(key);
				addLimbs();
				if (keyMisses.length < 6) {
					// still playing
				} else {
					playing = false;
					losses++;
					wordFill = secret.split();
					n = Math.floor((10 - secret.length) / 2) + 1;
					for (h = 0; h < secret.length; h++) {
						document.getElementById("Letter" + (h + n)).textContent = secret.charAt(h);
					}
					document.getElementById("Playing").textContent = "You Lose! Press Enter to Play Again!";
				}
			}
		}
	}
}

function htmlUpdate() {
	var tempWord = "";
	for (i = 0; i < wordFill.length; i++) {
		tempWord += wordFill[i];
	}
	if (playing) {
		document.getElementById("Playing").textContent = "Game in Progress";
	} else {
		//document.getElementById("Playing").textContent = "Press Enter to Play!";
	}
	document.getElementById("Misses").textContent = keyMisses.toString();
	document.getElementById("Wins").textContent = wins.toString();
	document.getElementById("Losses").textContent = losses.toString();
}

function addLimbs() {
	document.getElementById("Man").style = 'background-image: url("./assets/images/man' + keyMisses.length + '.png");';
}

document.onkeypress = function(event) {
	var key = event.keyCode;
	if (!playing) {
		if (key === 13) {
			//getTEXT(urlTEXT, parseText);
	    	/*if (words == undefined) {
	    		getJSON(urlJSON, addWords);
	    		getTEXT(urlTEXT, parseText);
	    	} else {
	    		newWord();
	    	}*/
	    	newWord();
	    	playing = true;
	    	htmlUpdate();
		}
	} else {
		if ((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {
			var cKey = event.key.toLowerCase();
			lookKey(cKey);
			htmlUpdate();
		}
	}
};