function handleInput (ch) {
	//	activeGame.update()
		highlightInput(ch)
		
		if (gameOver) {
			return;
		}
		else {
			activeGame.inputChar(ch);
		}
	};
function handleSubmit () {
		highlightInput("OK")
		if (!gameOver) {
			activeGame.submitGuess();
			const state = activeGame.save()
			localStorage.setItem('lastgame', state)
		}
		else {
			localStorage.removeItem('lastgame')
			reload();
		}
	};
function handleErase () {
		highlightInput("UNDO")
		if (gameOver) {
			return;
		}
		else{
			activeGame.removeChar();
		}
	};
	
	
	
	
	
	
	//teclado virtual
	//    const row123 = document.getElementById("123");
	const rowqwe = document.getElementById("qwe");
	const rowasd = document.getElementById("asd");
	const rowzxc = document.getElementById("zxc");
	//    const row1 = row123.querySelectorAll("span");
	const row2 = rowqwe.querySelectorAll("span");
	const row3 = rowasd.querySelectorAll("span");
	const row4 = rowzxc.querySelectorAll("span");
	const virtualKeyboard = {
		"Q": row2[1],
		"W": row2[2],
		"E": row2[3],
		"R": row2[4],
		"T": row2[5],
		"Y": row2[6],
		"U": row2[7],
		"I": row2[8],
		"O": row2[9],
		"P": row2[10],
		
		//ROW 3 ASD
		"A": row3[1],
		"S": row3[2],
		"D": row3[3],
		"F": row3[4],
		"G": row3[5],
		"H": row3[6],
		"J": row3[7],
		"K": row3[8],
		"L": row3[9],
		
		// ROW 4 ZXC
		"OK": row4[1], 
		"Z": row4[2],
		"X": row4[3],
		"C": row4[4],
		"V": row4[5],
		"B": row4[6],
		"N": row4[7],
		"M": row4[8],
		"UNDO": row4[9]
		}
	
	
	
	// eventos de teclado - parcialmente depreciado
	window.addEventListener("keydown", 
		(event) => {
			event.preventDefault()
	  //	console.log(event.code)
	  switch (event.code) {
			  case "Backspace": 
			 handleErase()
			  
		  break;
		  // ROW 1 123
		  case "Enter": 
			  handleSubmit();
		  
		  break;
		  //ROW 2 QWE
		  case "KeyQ": 
			  handleInput("Q");
		  break;
		  case "KeyW": 
			  handleInput("W");
		  break;
		  case "KeyE": 
			  handleInput("E");
		  break;
		  case "KeyR": 
			  handleInput("R");
		  break;
		  case "KeyT": 
			  handleInput("T");
		  break;
		  case "KeyY": 
			  handleInput("Y");
		  break;
		  case "KeyU": 
			  handleInput("U");
		  break;
		  case "KeyI": 
			  handleInput("I");
		  break;
		  case "KeyO": 
			  handleInput("O");
		  break;
		  case "KeyP": 
			  handleInput("P");
		  break;
		  //ROW 3 ASD
		  case "KeyA": 
			  handleInput("A");
		  break;
		  case "KeyS": 
			  handleInput("S");
		  break;
		  case "KeyD": 
			  handleInput("D");
		  break;
		  case "KeyF": 
			  handleInput("F");
		  break;
		  case "KeyG": 
			  handleInput("G");
		  break;
		  case "KeyH": 
			  handleInput("H");
		  break;
		  case "KeyJ": 
			  handleInput("J");
		  break;
		  case "KeyK": 
			  handleInput("K");
		  break;
		  case "KeyL": 
			  handleInput("L");
		  break;
		  // ROW 4 ZXC
		  case "KeyZ": 
			  handleInput("Z");
		  break;
		  case "KeyX": 
			  handleInput("X");
		  break;
		  case "KeyC": 
			  handleInput("C");
		  break;
		  case "KeyV": 
			  handleInput("V");
		  break;
		  case "KeyB": 
			  handleInput("B");
		  break;
		  case "KeyN": 
			  handleInput("N");
		  break;
		  case "KeyM": 
			  handleInput("M");
		  break;
		  default: 
		  break;
		}
		
	  })
	
	function enableClick () {
		const o = virtualKeyboard
	//	console.log(virtualKeyboard.A);
		for(const property in virtualKeyboard) {
	
			const ch = property.toString()
			if (ch.length == 1) {
			virtualKeyboard[property].addEventListener('mousedown', function () {
				handleInput(ch)
			})}
		}
		document.getElementById('submitbtn').addEventListener('click', handleSubmit)
		document.getElementById('undobtn').addEventListener('click', handleErase)
		document.getElementById('refresh').addEventListener('click', reload)
	}

	async function confirmImportControls() {
		return true
	}