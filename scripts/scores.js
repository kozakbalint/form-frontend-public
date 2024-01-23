scoresHTML = `<div class="scores-form">
<div>
    <label for="score-type">Score Type</label>
    <select name="score-type" id="score-type">
        <option value="1">acc</option>
        <option value="2">sens</option>
        <option value="3">spec</option>
        <option value="4">ppv</option>
        <option value="5">npv</option>
        <option value="6">fbp</option>
		<option value="7">fbn</option>
		<option value="8">upm</option>
		<option value="9">gm</option>
		<option value="10">fm</option>
		<option value="11">mk</option>
		<option value="12">bm</option>
		<option value="13">mcc</option>
		<option value="14">lrp</option>
		<option value="15">lrn</option>
		<option value="16">pt</option>
		<option value="17">dor</option>
		<option value="18">ji</option>
		<option value="19">bacc</option>
		<option value="20">kappa</option>
    </select>
</div>
<div>
    <label for="score-value">Value</label>
    <input
        type="text"
        name="score-value"
        id="score-value"
        pattern="^(1(\\.0{1,4})?|0(\\.\\d{1,4})?|100(\\.0{1,2})?|[0-9]{1,2}(\\.\\d{1,2})?)$"
		placeholder="0.1234 or 12.34"
    />
</div>
<div class="add-score">
    <div class="btn">Add Score</div>
</div>
</div>
<div class="scores">
<table>
    <thead>
        <tr>
            <th>Score Type</th>
            <th>Value</th>
			<th></th>
        </tr>
    </thead>
    <tbody class="score-rows">
        
    </tbody>
</table>
</div>`;

function scores() {
	container.innerHTML = scoresHTML;
	scoreEntries = localStorage.getItem("scoreEntries")
		? JSON.parse(localStorage.getItem("scoreEntries"))
		: {
				sEntries: [
					{ scoreType: "acc", scoreValue: -1 },
					{ scoreType: "sens", scoreValue: -1 },
					{ scoreType: "spec", scoreValue: -1 },
					{ scoreType: "ppv", scoreValue: -1 },
					{ scoreType: "npv", scoreValue: -1 },
					{ scoreType: "fbp", scoreValue: -1 },
					{ scoreType: "fbn", scoreValue: -1 },
					{ scoreType: "upm", scoreValue: -1 },
					{ scoreType: "gm", scoreValue: -1 },
					{ scoreType: "fm", scoreValue: -1 },
					{ scoreType: "mk", scoreValue: -1 },
					{ scoreType: "bm", scoreValue: -1 },
					{ scoreType: "mcc", scoreValue: -1 },
					{ scoreType: "lrp", scoreValue: -1 },
					{ scoreType: "lrn", scoreValue: -1 },
					{ scoreType: "pt", scoreValue: -1 },
					{ scoreType: "dor", scoreValue: -1 },
					{ scoreType: "ji", scoreValue: -1 },
					{ scoreType: "bacc", scoreValue: -1 },
					{ scoreType: "kappa", scoreValue: -1 },
				],
		  };

	if (scoreEntries.sEntries.length === 20)
		localStorage.setItem("scoreEntries", JSON.stringify(scoreEntries));

	let invalidInput = true;
	let addScores = document.querySelector(".add-score");
	let scoreRows = document.querySelector(".score-rows");
	let scoreType = document.getElementById("score-type");
	let scoreValue = document.getElementById("score-value");

	scoreValue.addEventListener("input", () => {
		if (
			scoreValue.value.length === 0 ||
			scoreValue.value.match(
				"^(1(\\.0{1,4})?|0(\\.\\d{1,4})?|100(\\.0{1,2})?|[0-9]{1,2}(\\.\\d{1,2})?)$"
			) === null
		)
			invalidInput = true;
		else invalidInput = false;
	});

	addScores.addEventListener("click", () => {
		if (!invalidInput) {
			scoreEntries.sEntries.forEach((e) => {
				if (e.scoreType == scoreType.options[scoreType.selectedIndex].text) {
					e.scoreValue =
						scoreValue.value > 1 ? scoreValue.value / 100 : scoreValue.value;
				}
			});

			localStorage.setItem("scoreEntries", JSON.stringify(scoreEntries));
			updateScores(scoreRows);
			scoreValue.value = null;
		}
	});

	updateScores(scoreRows);
}

function updateScores(element) {
	scoreEntries = JSON.parse(localStorage.getItem("scoreEntries"));
	entriesElement = "";
	scoreEntries.sEntries.forEach((e) => {
		entriesElement += `
		<tr id="${e.scoreType}">
			<td>${e.scoreType}</td>
			<td>${e.scoreValue == -1 ? "-" : e.scoreValue}</td>
			<td class="delete">${e.scoreValue == -1 ? "" : "<div>X</div>"}</td>
		</tr>
	`;
	});
	element.innerHTML = entriesElement;

	let deleteBtns = document.querySelectorAll(".delete");
	scoreEntries = JSON.parse(localStorage.getItem("scoreEntries"));
	deleteBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			scoreEntries.sEntries.forEach((e, i) => {
				if (e.scoreType == btn.parentNode.id) {
					scoreEntries.sEntries[i].scoreValue = -1;
					localStorage.setItem("scoreEntries", JSON.stringify(scoreEntries));
				}
			});
			updateScores(element);
		});
	});
}
