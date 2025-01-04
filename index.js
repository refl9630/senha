//carrega os scripts e inicia

function main() {
    loadScript("assets/js/ActiveGame.js");
    loadScript("assets/js/Screen.js");
    loadScript("assets/js/GameSession.js");
	loadScript("assets/js/Controls.js");
	loadScript("assets/js/GameHistory.js");
    //    console.log(confirmImport())
}


function loadScript(path) {
    const element = document.createElement("script");
    element.setAttribute("src", path);
	element.setAttribute("onload", "confirmImport()");
    //    console.log(element);
    document.head.appendChild(element);
}

async function confirmImport() {
	let isLoaded = false
	const confirms = [
		await confirmImportActive(),
		await confirmImportScreen(),
		await confirmImportSession(),
		await confirmImportControls()
	]
	while (!isLoaded) {

		let check = true
		for (let i = 0; i < confirms.length; i++) {	
			const mychk = confirms[i];
			if (mychk !== true) {
				check = false
			}
		}
		if (check == true) {
			isLoaded = true
			begin ()
		}
	}
}

function begin () {
	initial()
}

main()