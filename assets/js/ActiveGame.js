



class ActiveGame {
	constructor (data) {
		if (data == "new") {
		this.attempt = 1;
		this.solution;
		this.validWords = [];
		this.solutionL;
		this.letterElements = [];
		this.guesses = [];
		this.myguess = [];
		this.gameOver = gameOver
		this.darkmode = false;
	}
	else {
		const obj = JSON.parse(data)
		answer = obj.solution;
		answerL = obj.solutionL;
		validWords = obj.validWords;
		gameOver = obj.gameOver;
		this.attempt = 1;
		this.solution = obj.solution;
		this.validWords = validWords;
		this.solutionL = obj.solutionL;
		this.letterElements = [];
		this.guesses = obj.guesses;
		this.myguess = [];
		this.gameOver = gameOver
		this.load(obj.attempt)
	}

	}
	inputChar (ch) {
//		console.log(this.myguess);
		
		const ich = ch;
		let count = this.myguess.length
		if (count >= 5) {
			return;
		}
		else {
			this.myguess[count] = ch;
//			console.log(this.myguess);
			let elem = this.getGuessElement (count)
			elem.innerText = ich
			animateInput(elem)
		}
		this.update()
	}
	removeChar () {
		let count = this.myguess.length
//		console.log(this.myguess);
		if (count <= 0) {
			this.update()
			return;
		}
		else {
			
//			console.log(this.myguess);
			let elem = this.getGuessElement (count-1)
			this.myguess.pop();
			elem.innerText = " ";
		}
		this.update()
	}
	setGuessElements () {
		let bordercolor = "";
		const myrow = this.getGuessRow()
		let myelements = myrow.getElementsByClassName('guessl');
		this.letterElements = myelements;
		let count = this.myguess.length
/* 		switch (darkmode) {
			case true: 
				bordercolor = "black";
				break;
			case false: 
				bordercolor = "gray";
				break;
		} */
		for (let i = 0; i < myelements.length; i++) {
			const element = myelements[i];
			if (i == count) {
				element.classList.add("cursor");
				element.classList.remove("currentrow");
			}
			else {
				element.classList.add("currentrow");
				element.classList.remove("cursor");
			}
		}

//		console.log(myelements);
	}
	getGuessRow () {
		let numberid = this.attempt;
		let elid = "";
		elid += "guess" + (numberid.toString());
		const myrow = document.getElementById(elid);
		return myrow;
	}
	getGuessElement (at) {
		return this.letterElements[at];
	}
	submitGuess () {
		if (gameOver) {
			return;
		}
		//confere se possui 5 letras
		if (this.myguess.length != 5) {
			let mygrow = activeGame.getGuessRow()   
			animateDenied(mygrow)
			displayMessage('Digite uma palavra', 1)
//			alert("digite a palavra")
			return
		}  
		//monta uma string
		let word = ""
		for (let i = 0; i < 5; i++) {
			word += this.myguess[i]
		}
		//valida se é uma palavra no dicionario
		isValid(word).then (
		function(value) {
			if (value == true) {
				activeGame.commitGuess()
			}
			else {
				let mygrow = activeGame.getGuessRow()   
				animateDenied(mygrow)
				displayMessage('Palavra inválida', 1)
			}
		}
		)
	}
	commitGuess () {
		this.registerAttempt ()
		let solved = 0
		let status = [0,0,0,0,0]
		for (let i = 0; i < 5; i++) {
			let correct = false
			let present = false
			const mychar = this.myguess[i]
			for (let j = 0; j < 5; j++) {
				const answerchar = answer.charAt(j);
				if (mychar == answerchar) {
					present = true
					status[i] = 1
					if (i == j) {
						correct = true
						status[i] = 2
						solved++
						break;
					}
				}
			}
			if (present == false) {
//			console.log(mychar, "absent");
			}
		} 
		if (solved == 5) {
			animateSolved(this.letterElements);
			document.getElementById('refresh').style.visibility = "visible";
			let tx = "";
			tx += answerL;
			displayMessage(tx, 0)
			gameOver = true;
			myHistory.addWin(this.attempt)
		}
		else {
			animateFlip(this.letterElements)
		} 
		this.advance(status)
	}
	registerAttempt () {
		this.guesses[this.attempt-1] = this.myguess
		
	}
	advance (st) {

		for (let i = 0; i < 5; i++) {
			const cond = st[i]
			const c = this.myguess[i]
			const guessel = this.getGuessElement(i)
			switch (cond) {
				case 0: 
					absentLetter(guessel);
					absentLetter(virtualKeyboard[c]);
				break;
				case 1: 
					presentLetter(guessel);
					presentLetter(virtualKeyboard[c]);
				break;
				case 2: 
					correctLetter(guessel);
					correctLetter(virtualKeyboard[c]);
				break;
				default: 
					break;
			}	
		}
		if (this.attempt == 6) {
			let tx = "";
			tx += answerL;
			displayMessage(tx, 0)
			document.getElementById('refresh').style.visibility = "visible"
			gameOver = true
			myHistory.addLose();
		}
		else {
			this.attempt++
			this.myguess = [];
			this.setGuessElements()
		}
		const state = this.save()
		localStorage.setItem('lastgame', state)
		this.update()

	}
	update () {
		this.solution = answer;
		this.validWords = validWords;
		this.solutionL = answerL;
		this.gameOver = gameOver;
		this.darkmode = darkmode;
		this.setGuessElements()
	}
	save () {
		const saved = JSON.stringify(this)
//		console.log(saved);
		
		return saved
	}
	load (att) {
		this.setGuessElements ()
		for (let i = 0; i < att-1; i++) {
			for (let j = 0; j < 5; j++) {
				const ch = this.guesses[i][j]
//				console.log(ch);
				
				this.inputChar(ch) 
			}

			this.commitGuess()
			this.update()

		}
	}
}
function loadDic() {
    let dicfile = "./assets/words/dicpt.json"
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            validWords = JSON.parse(this.responseText)
//            console.log(validWords);
			randomWord ();
       }
    };
    xhttp.open("GET", dicfile, true);
    xhttp.send();
}

let answer = "EPOCA";
let answerL = "ÉPOCA";
let validWords = [];
let gameOver = false;
let darkmode = false;

let wordsu
let n
function randomWord () {
	n = getRandomSolution()

	answer = validWords[n].toUpperCase()
//	console.log(answer);
	let dicu = "./assets/words/dicpt_utf.json"
	var xhttpu = new XMLHttpRequest();
	xhttpu.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		wordsu = JSON.parse(this.responseText)
//		console.log(wordsu);
		answerL = wordsu[n].toUpperCase()
//		console.log(answerL)
   }
	};
	xhttpu.open("GET", dicu, true);
	xhttpu.send();
}



async function isValid (word) {
	const firstLetter = word.charAt(0).toLowerCase()						//primeira letra da palavra
	let letterDicStart;														//primeira palavra com a mesma inicial
	let letterDicEnd;														//ultima palavra com a mesma inicial
	let listing = false;		
	for (let i = 0; i < validWords.length; i++) {
		const firstD = validWords[i].charAt(0);
		if (firstD == firstLetter) {
			if (listing == false) {
				listing = true
				letterDicStart = i
				continue
			}
			else {
				continue
			}
		}
		else if (listing == false) {
			continue
		}
		else if (listing == true) {
			letterDicEnd = i
			break
		}
	}
	if (firstLetter == "z") {
		letterDicEnd = validWords.length
	}
//	console.log(letterDicStart, letterDicEnd);
	for (let j = letterDicStart; j < letterDicEnd; j++) {

		for (let k = 1; k < 5; k++) {
			const myletter = word.charAt(k).toLowerCase();
			const dicletter = validWords[j].charAt(k);
			if (myletter == dicletter) {
				if (k == 4) {
					return true
				}
				continue
			}
			else {
				break
			}
		}

	}
//	console.log(word);
	return false
}

function getRandomSolution () {

	let total = validWords.length
	let result = Math.floor(Math.random() * (total + 1));
//	console.log(result);
	return result
}

async function confirmImportActive() {
	return true
}