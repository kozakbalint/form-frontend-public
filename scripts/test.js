testHTML = `<div class="test">
<div class="run-test">
    <div class="btn">Run the Test</div>
</div>
<div class="test-output">
    <div>Output:</div>
    <div>
        <textarea
            name="output"
            id="output"
            cols="50"
            rows="20"
            readonly
        ></textarea>
    </div>
</div>
</div>`;

function test() {
	const url = "";
	container.innerHTML = testHTML;
	const testBtn = document.querySelector(".run-test");
	const output = document.getElementById("output");
	const border = document.querySelector(".test");
	const dEntries = JSON.parse(
		localStorage.getItem("datasetEntries")
	).dEntries.filter((e) => e.active);
	const sEntries = JSON.parse(localStorage.getItem("scoreEntries"));
	const jsonData = { dEntries: dEntries, ...sEntries };
	const encodedData = btoa(JSON.stringify(jsonData));

	const data = new URLSearchParams();
	data.append("data", encodedData);

	testBtn.addEventListener("click", () => {
		console.log(JSON.stringify(jsonData));
		fetch(url, {
			method: "POST",
			mode: "cors",
			body: data,
		})
			.then((response) => {
				if (response.ok) {
					console.log("Successful request");
				}
				return response.json();
			})
			.then((responseBody) => {
				responseJSON = JSON.parse(
					responseBody
						.replaceAll("'", '"')
						.replaceAll("(", "[")
						.replaceAll(")", "]")
						.toLowerCase()
				);
				output.value = JSON.stringify(responseJSON);
				if (responseJSON.inconsistency) border.style.backgroundColor = "green";
				else border.style.backgroundColor = "red";
			})
			.catch((error) => {
				console.error(error);
			});
	});
}
