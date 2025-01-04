function animateFlip (squares) {
	const el = squares
//	console.log(squares);
	let delay = 0
	for (let i = 0; i < 5; i++) {
		delay++
		const element = squares[i];
		let delayst = ""
		delayst += (delay*0.1).toString()
		delayst += "s"
		element.style.animationDelay = delayst
		element.style.animationDuration = "0.5s"
		element.style.animationName = "flip"
		element.style.borderColor = "#c7c7c7"
	}
}
function animateSolved (squares) {
	const el = squares
//	console.log(squares);
	let delay = 0
	for (let i = 0; i < 5; i++) {
		delay++
		const element = squares[i];
		let delayst = ""
		delayst += (delay*0.1).toString()
		delayst += "s"
		element.style.animationDelay = delayst
		element.style.animationDuration = "0.3s"
		element.style.animationName = "solved"
	}
}
function animateDenied (grow) {
	grow.style.animationName = "invalidword"
	grow.addEventListener( "animationend",  function(e) {
//					console.log(e)
		grow.style.animationName = "none" 
	} )
}
function correctLetter (ke) {
//	ke.style.backgroundColor = "#6aaa64";
//	ke.style.color = "white";
	ke.classList.add("correct_letter")
}
function presentLetter (ke) {
//	ke.style.backgroundColor = "#c9b458";
//	ke.style.color = "white";
	ke.classList.add("present_letter")
}
function absentLetter (ke) {
//	ke.style.backgroundColor = "gray";
//	ke.style.color = "white";
	ke.classList.add("absent_letter")
}
function animateInput(ke) {
	ke.style.animationName = "pulsate"
	ke.addEventListener( "animationend",  function(e) {
//					console.log(e)
		ke.style.animationName = "none" 
	} )
}

function highlightInput(char) {
	const ke = virtualKeyboard[char]
	ke.style.animationDuration = "0.3s"
	ke.style.animationName = "highlight"
	ke.addEventListener( "animationend",  function(e) {
		//					console.log(e)
				ke.style.animationName = "none" 
			} )
}

//janela de aviso
function displayMessage (msg, duration) {
	let pop = document.getElementById('message')
	pop.firstElementChild.innerText = msg;
	pop.style.animationDuration = "0.3s"
	pop.style.animationName = "fadeIn"
	pop.style.visibility = "visible"
	if (duration != 0) {
		setTimeout(hideMessage, "1000")
	}
}
function hideMessage () {
	let pop = document.getElementById('message')
	pop.style.animationDuration = "0.3s"
	pop.style.animationName = "fadeOut"
	setTimeout(() => {document.getElementById('message').style.visibility = "hidden"}, "300")
}


//janela de overlay
function hideOverlay () {
	const olElement = document.getElementById('overlay');
	olElement.style.display = "none";
}
function displayOverlay (src) {
	const olElement = document.getElementById('overlay');
	const frameElement = document.createElement('iframe');
	const olButton = document.createElement('button');
	frameElement.setAttribute('src', src)
	olButton.innerText = "ENTENDI"
	olButton.setAttribute('id', 'btncloseol')
	olElement.appendChild(frameElement)
	olElement.appendChild(olButton) 
	olElement.style.display = "grid"
	document.getElementById('btncloseol').addEventListener('click', toggleHelp, {once: true})
}

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

async function confirmImportScreen() {
	return true
}