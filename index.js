const statusText = document.querySelector("#status");
const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let running = false;

const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];

initalizeGame();

function initalizeGame() {
	cells.forEach((cell) => cell.addEventListener("click", cellClicked));
	statusText.textContent = `${currentPlayer}'s turn`;
	running = true;
}

function cellClicked() {
	if (!running) return;
	let cellIndex = this.getAttribute("cellIndex");
	this.innerHTML =
		currentPlayer == "X"
			? `<img alt="cross" src="cross-mark-svgrepo-com.svg" style="height:120px; width : 120px; margin-top : 15%"/>`
			: `<img alt="cross" src="uk-flag-round-circle-icon.svg" style="height:130px; width : 130px; margin-top : 15%"/>`;
	options[cellIndex] = currentPlayer;
	checkWinner();
}

function checkWinner() {
	let roundWon = false;
	for (let i = 0; i < winConditions.length; i++) {
		const temp = winConditions[i];
		const cellA = options[temp[0]],
			cellB = options[temp[1]],
			cellC = options[temp[2]];
		if (cellA == "" || cellB == "" || cellC == "") continue;
		else if (cellA == cellB && cellB == cellC) {
			roundWon = true;
			break;
		}
	}
	if (roundWon) {
		statusText.textContent = `${currentPlayer} won`;
		running = false;
	} else if (!options.includes("")) {
		statusText.textContent = `Draw`;
		running = false;
	} else changePlayer();
}

function changePlayer() {
	currentPlayer = currentPlayer == "X" ? "0" : "X";
	statusText.textContent = `${currentPlayer}'s turn`;
}

function restartGame() {
	currentPlayer = "X";
	options = ["", "", "", "", "", "", "", "", ""];
	options.fill("", 0, options.length - 1);
	cells.forEach((cell) => (cell.textContent = ""));
	initalizeGame();
}
