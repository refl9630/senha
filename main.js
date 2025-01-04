let activeGame;
let myHistory;


function initial () {
	const modep = getPreference(); 
	getHistory()
	darkmode = modep;
	if (darkmode == 1) {
		toggleDark ();
	}
	let r = getResume ()
	if (r == 0) {
		newrandom()
	}
	else {
		resumegame (r)
	}
}
function getResume () { 
	const storedg = localStorage.getItem('lastgame')
//	console.log(storedg);
	if (storedg == null) {
		return 0;
	}
	else {
		return storedg;
	}
	}
	

function newrandom () {
	loadDic()
	activeGame = new ActiveGame("new");
	activeGame.setGuessElements();
//	console.log(activeGame.getGuessElement(1))
	enableClick()
}
function resumegame (gamesave) {
	let obj = gamesave;
	activeGame = new ActiveGame(obj) 
	activeGame.setGuessElements();
//	console.log(activeGame.getGuessElement(1))
	enableClick()
}


function reload () {
	localStorage.removeItem('lastgame')
	let h = myHistory.getHistory()
	localStorage.setItem('history', h)
	window.location.reload()
}


//modo noturno 
function getPreference () {
	const stored = localStorage.getItem('dmode')
//	console.log(stored);
	if (stored == null) {
		toggleHelp ();
		localStorage.setItem('dmode', 0)
		return 0;
	}
	else {
		return stored;
	}
	}
	
	//temporary 
	function saveModePreference (dmodebool) {
		localStorage.setItem('dmode', dmodebool)
	}
document.getElementById('darkmode').addEventListener('click', toggleDark)

function toggleDark () {
/* 		const mybg = document.body.style.backgroundColor;
		
		let isdark = false;
		let newbg = "rgb(31,31,31)";
		let newcolor = "rgb(199,199,199)"
	
		if (mybg != "white") {
			newbg = "white";
			newcolor = "black";
			isdark = true
		}
	
		document.body.style.backgroundColor = newbg;
		document.body.style.color = newcolor; */

		const mybg = document.body.getAttribute('class');
	//	console.log(mybg);
		
		let isdark = false

		if (mybg == "daymode") {
			document.body.setAttribute('class', "nightmode")
		}
		else {
			document.body.setAttribute('class', "daymode")
			isdark = true
		}
	
		//change buttons
		let myclass = ""
		switch (isdark) {
			case true: 
				myclass = "lightbutton";
				saveModePreference (0)
				break;
			case false: 
				myclass = "darkbutton";
				saveModePreference (1)
				break;
			default:
				myclass = "lightbutton";
		}
		document.getElementById('darkmode').setAttribute('class', myclass);
		document.getElementById('help').setAttribute('class', myclass);
		document.getElementById('history').setAttribute('class', myclass);
		darkmode = isdark;
		try {
		activeGame.update()
		}
		finally {
			return
		}
}

function getHistory () {
	const storedh = localStorage.getItem('history') 
	myHistory = new GameHistory()
	if (storedh != null) {
		myHistory.setHistory(storedh);
	}
}

//ajuda
document.getElementById('help').addEventListener('click', toggleHelp)
document.getElementById('history').addEventListener('click', toggleHistory)

function toggleHelp () {
	const olElement = document.getElementById('overlay');
	const frame = olElement.getElementsByTagName('iframe')

	if (frame.length > 0) {
		olElement.replaceChildren();
		document.getElementById('help').classList.remove('active')
		document.getElementById('history').classList.remove('active')
		hideOverlay();
	}
	else {
		displayOverlay("assets/html/tutorial.html")
		document.getElementById('help').classList.toggle('active')
	}
}
function toggleHistory () {
	const olElement = document.getElementById('overlay');
	const frame = olElement.getElementsByTagName('iframe')

	if (frame.length > 0) {
		olElement.replaceChildren();
		document.getElementById('help').classList.remove('active')
		document.getElementById('history').classList.remove('active')
		hideOverlay();
	}
	else {
		displayOverlay("assets/html/history.html")
		document.getElementById('history').classList.toggle('active')
	}
}