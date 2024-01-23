datasetsHTML = `<div class="dataset-form">
<div class="text-input">
  <label for="name">Name: </label>
  <input
    type="text"
    name="name"
    id="name"
    maxlength="10"
    minlength="1"
    placeholder="Dataset name (max 10 character)"
    title="The field accepts a string that has a max length of 10 character"
  />
</div>
<div class="num-input">
  <label for="first-number">#: </label>
  <input
    type="number"
    name="first-number"
    id="first-number"
    max="2000"
	min="0"
    placeholder="Max 2000"
    title="The field accepts a number that below 2000"
  />
</div>
<div class="num-input">
  <label for="second-number">P: </label>
  <input
    type="number"
    name="second-number"
    id="second-number"
    max="1000"
	min="0"
    placeholder="Max 1000"
    title="The field accepts a number that below 1000"
  />
</div>
<div class="num-input">
  <label for="third-number">N: </label>
  <input
    type="number"
    name="third-number"
    id="third-number"
    max="1000"
	min="0"
    placeholder="Max 1000"
    title="The field accepts a number that below 1000"
  />
</div>
<div class="add-dataset">
  <div class="btn">Add Dataset</div>
</div>
</div>
<div class="datasets">
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>#</th>
      <th>P</th>
      <th>N</th>
      <th>Active</th>
      <th></th>
    </tr>
  </thead>
  <tbody class="datasets-row">
    
  </tbody>
</table>
</div>`;

function dataSets() {
	container.innerHTML = datasetsHTML;
	datasetEntries = localStorage.getItem("datasetEntries")
		? JSON.parse(localStorage.getItem("datasetEntries"))
		: { dEntries: [] };
	if (datasetEntries.dEntries.length === 0)
		localStorage.setItem("datasetEntries", JSON.stringify(datasetEntries));
	let invalidInput = true;
	let datasetRows = document.querySelector(".datasets-row");
	let addDatasets = document.querySelector(".add-dataset");
	let name = document.getElementById("name");
	let firstNumber = document.getElementById("first-number");
	let secondNumber = document.getElementById("second-number");
	let thirdNumber = document.getElementById("third-number");

	name.addEventListener("input", () => {
		if (name.value.length == 0) invalidInput = true;
		else invalidInput = false;
	});

	firstNumber.addEventListener("input", () => {
		if (parseInt(firstNumber.value) > 2000) invalidInput = true;
		else invalidInput = false;
	});

	secondNumber.addEventListener("input", () => {
		if (parseInt(firstNumber.value) > 1000) invalidInput = true;
		else invalidInput = false;
	});

	thirdNumber.addEventListener("input", () => {
		if (parseInt(firstNumber.value) > 1000) invalidInput = true;
		else invalidInput = false;
	});

	addDatasets.addEventListener("click", () => {
		if (
			name.value.length !== 0 &&
			parseInt(firstNumber.value) ===
				parseInt(secondNumber.value) + parseInt(thirdNumber.value) &&
			!invalidInput
		) {
			datasetEntries.dEntries.push({
				id: Date.now(),
				name: name.value,
				firstNum: parseInt(firstNumber.value),
				secondNum: parseInt(secondNumber.value),
				thirdNum: parseInt(thirdNumber.value),
				active: true,
			});
			localStorage.setItem("datasetEntries", JSON.stringify(datasetEntries));
			updateStorageAndUIDs(datasetRows);
		} else if (
			name.value.length !== 0 &&
			firstNumber.value.length !== 0 &&
			secondNumber.value.length !== 0 &&
			thirdNumber.value.length === 0 &&
			parseInt(firstNumber.value) > parseInt(secondNumber.value) &&
			!invalidInput
		) {
			datasetEntries.dEntries.push({
				id: Date.now(),
				name: name.value,
				firstNum: parseInt(firstNumber.value),
				secondNum: parseInt(secondNumber.value),
				thirdNum: parseInt(firstNumber.value - secondNumber.value),
				active: true,
			});
			localStorage.setItem("datasetEntries", JSON.stringify(datasetEntries));
			updateStorageAndUIDs(datasetRows);
		} else if (
			name.value.length !== 0 &&
			firstNumber.value.length !== 0 &&
			thirdNumber.value.length !== 0 &&
			secondNumber.value.length === 0 &&
			parseInt(firstNumber.value) > parseInt(thirdNumber.value) &&
			!invalidInput
		) {
			datasetEntries.dEntries.push({
				id: Date.now(),
				name: name.value,
				firstNum: parseInt(firstNumber.value),
				secondNum: parseInt(firstNumber.value - thirdNumber.value),
				thirdNum: parseInt(thirdNumber.value),
				active: true,
			});
			localStorage.setItem("datasetEntries", JSON.stringify(datasetEntries));
			updateStorageAndUIDs(datasetRows);
		} else if (
			name.value.length !== 0 &&
			secondNumber.value.length !== 0 &&
			thirdNumber.value.length !== 0 &&
			firstNumber.value.length === 0 &&
			!invalidInput
		) {
			datasetEntries.dEntries.push({
				id: Date.now(),
				name: name.value,
				firstNum: parseInt(secondNumber.value) + parseInt(thirdNumber.value),
				secondNum: parseInt(secondNumber.value),
				thirdNum: parseInt(thirdNumber.value),
				active: true,
			});
			localStorage.setItem("datasetEntries", JSON.stringify(datasetEntries));
			updateStorageAndUIDs(datasetRows);
		}

		name.value = null;
		firstNumber.value = null;
		secondNumber.value = null;
		thirdNumber.value = null;
	});

	updateStorageAndUIDs(datasetRows);
}

function updateStorageAndUIDs(element) {
	datasetEntries = JSON.parse(localStorage.getItem("datasetEntries"));
	entriesElement = "";
	newEntry = "";
	datasetEntries.dEntries.forEach((e) => {
		newEntry = `<tr id="${e.id}">
		<td>${e.name}</td>
		<td>${e.firstNum}</td>
		<td>${e.secondNum}</td>
		<td>${e.thirdNum}</td>`;
		if (e.active) {
			newEntry += `<td><input class="active" type="checkbox" checked /></td>`;
		} else {
			newEntry += `<td><input class="active" type="checkbox"/></td>`;
		}
		newEntry += `<td class="delete"><div>X</div></td>
		</tr>`;
		entriesElement += newEntry;
	});
	element.innerHTML = entriesElement;

	let checkboxes = document.querySelectorAll(".active");
	let deleteBtns = document.querySelectorAll(".delete");
	datasetEntries = JSON.parse(localStorage.getItem("datasetEntries"));

	checkboxes.forEach((check) => {
		check.addEventListener("change", () => {
			datasetEntries.dEntries.forEach((e, i) => {
				if (e.id == check.parentNode.parentNode.id) {
					datasetEntries.dEntries[i].active =
						!datasetEntries.dEntries[i].active;
					localStorage.setItem(
						"datasetEntries",
						JSON.stringify(datasetEntries)
					);
				}
			});
			updateStorageAndUIDs(element);
		});
	});

	deleteBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			datasetEntries.dEntries.forEach((e, i) => {
				if (e.id == btn.parentNode.id) {
					delete datasetEntries.dEntries[i];
					datasetEntries.dEntries = datasetEntries.dEntries.filter(
						(entry) => entry !== null
					);
					localStorage.setItem(
						"datasetEntries",
						JSON.stringify(datasetEntries)
					);
				}
			});
			updateStorageAndUIDs(element);
		});
	});
}
