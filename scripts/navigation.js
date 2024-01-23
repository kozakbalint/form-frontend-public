const navBtn = document.querySelectorAll("nav > div");
const container = document.querySelector(".container");

navBtn.forEach((element) => {
	element.addEventListener("click", () => {
		navBtn.forEach((x) => {
			x.className = "nav-button";
		});
		if (element.className == "nav-button") {
			element.classList = "nav-button-active";
			document.title = element.innerHTML;
			swapContent(element.innerHTML);
		}
	});
});

function swapContent(name) {
	switch (name) {
		case navBtn[0].innerHTML:
			dataSets();
			break;
		case navBtn[1].innerHTML:
			scores();
			break;
		case navBtn[2].innerHTML:
			test();
			break;
		default:
			container.innerHTML = "";
			break;
	}
}

navBtn[0].click();
