class GameHistory {
	constructor () {
		this.wins = 0;
		this.first = 0;
		this.second = 0;
		this.third = 0;
		this.fourth = 0;
		this.fifth = 0;
		this.sixth = 0;
		this.lost = 0;
	}
	addWin (attempts) {
		this.wins++;
		switch (attempts) {
			case 1:
				this.first++;
			break;
			case 2:
				this.second++;
			break;			
			case 3:
				this.third++;
			break;
			case 4:
				this.fourth++;
			break;
			case 5:
				this.fifth++;
			break;
			case 6:
				this.sixth++;
			break;
			default:
			break;
		}
	}
	addLose () {
		this.lost++;
	}
	getHistory () {
		return JSON.stringify(this);
	}
	totalGames () {
		let total = this.wins + this.lost;
		return total;
	}
	totalWins () {
		return this.wins;
	}
	//retorna string porcentagem de vitórias
	winRatePercent () {
//		let str = "";
		const total = this.totalGames();
		let rate = Math.round((this.wins/total)*100);
	//	console.log(rate);
//		str += rate.toString();
//		str += "%";
		return rate
	}
	//retrona porcentagem de cada número de tentativas em relação ao total de vitórias
	winPercentageByAttempt (att) {
/* 		let rate1 = Math.round((this.first/this.wins)*100);
		let rate2 = Math.round((this.second/this.wins)*100);
		let rate3 = Math.round((this.third/this.wins)*100);
		let rate4 = Math.round((this.fourth/this.wins)*100);
		let rate5 = Math.round((this.fifth/this.wins)*100);
		let rate6 = Math.round((this.sixth/this.wins)*100); 
		const rates = [rate1, rate2, rate3, rate4, rate5, rate6];
		return rates*/
		if (this.wins == 0) {
			return 0	
		}
		else {
		let winsatt = this.winTotalByAttempt (att)
		let rate = Math.round((winsatt/this.wins)*100);

		return rate;
		}
	}
	winTotalByAttempt (att) {
		switch (att) {
			case 1:
				return this.first;
			case 2:
				return this.second;
			case 3:
				return this.third;
			case 4:
				return this.fourth;
			case 5:
				return this.fifth;
			case 6:
				return this.sixth;
			default:
				return 0;
		}
	}
	setHistory (myjson) {
		const myjsonp = JSON.parse(myjson);
	//	console.log(myjson);
		this.wins = myjsonp.wins;
		this.first = myjsonp.first;
		this.second = myjsonp.second;
		this.third = myjsonp.third;
		this.fourth = myjsonp.fourth;
		this.fifth = myjsonp.fifth;
		this.sixth = myjsonp.sixth;
		this.lost = myjsonp.lost;
	}
}

function historyScreen () {
		const showwins = document.getElementById('wins');
		const showgames = document.getElementById('total');
		const showwinrate = document.getElementById('rate');
		const fillbar = document.getElementById('ratebarfill');



		const storedh = localStorage.getItem('history') 
		const myHistory = new GameHistory()
		if (storedh != null) {
			myHistory.setHistory(storedh);
	//		console.log(myHistory.winRatePercent());
		}


		showwins.insertAdjacentText('beforeend', (myHistory.totalWins()))
		showgames.insertAdjacentText('beforeend', (myHistory.totalGames()))
//		showwinrate.insertAdjacentText('beforeend', (myHistory.winRatePercent()))
		const myrate = myHistory.winRatePercent()
		
		for (let i = 0; i <= myrate; i++) {
			let strp = i.toString() + "%"
			const timer = (Math.floor((1000/myrate)*i)+(i*2)).toString() 
			let wdt = (i*4).toString() + "px"
			
			setTimeout( function() {
				showwinrate.innerText = strp
				fillbar.style.width = wdt
			}, timer)
		}

		buildGraph(myHistory)
}

function buildGraph (myHistory) {
	const gbox = document.getElementById('graphbox');
	const numers = ["1","2","3","4","5","6"]
	const sizes = []
	for (let i = 1; i <= 6; i++) {
		let wincount = myHistory.winTotalByAttempt(i)
		let percent = myHistory.winPercentageByAttempt(i)

		const title_str = i.toString()
		const barelement = document.createElement('div')
		barelement.setAttribute('class', 'bar-item')
		
		let counter_str = " "
		let percent_str = percent.toString() + "% "

		if (wincount > 0) {
			counter_str = wincount.toString();
		}


		let inner = "<span class=\"attempt\">" + (title_str) + "ª" +"</span>"
		inner += "<div class=\"bar\" id=\"bar-" + title_str +"\">" 
		inner += "<p>" + counter_str + "</p>"
		inner += "</div>"


		barelement.innerHTML = inner

		gbox.appendChild(barelement)
		//sizes.push((percent*4).toString())
		sizes.push(percent)
		document.getElementById("bar-" + i.toString()).style.width = "0px"


	}
//	console.log(sizes, numers);
	setTimeout(function () {
	console.log(sizes);
	
	let biggest = Math.max(...sizes)
	console.log(biggest);
	let sizeadj = (100)/biggest
	

	for (let j = 0; j < 6; j++) {
		const w = ((sizes[j]*sizeadj)*4).toString()
		const element = document.getElementById("bar-" + numers[j])
		element.style.width =  w + "px"
		
	}
}, "300")
	
}

fillRate()

async function confirmImportHistory() {
	return true
}