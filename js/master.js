// start setting
let opicon = document.querySelector(".icon");
let toggle = document.querySelector(".setbox");

opicon.addEventListener("click", (e) => {
	// opicon.style.display = "none";
	toggle.classList.toggle("open");
});
// lcal storage
let maincolor = localStorage.getItem("option-color");
if (maincolor !== null) {
	document.documentElement.style.setProperty(
		"--main-color",
		localStorage.getItem("option-color")
	);

	document.querySelectorAll(".Colors-list li").forEach((el) => {
		el.classList.remove("active");

		if (el.dataset.color === maincolor) {
			//add active
			el.classList.add("active");
		}
	});
}

// set color option
let colorlis = document.querySelectorAll(".Colors-list li");
colorlis.forEach((li) => {
	li.addEventListener("click", (e) => {
		document.documentElement.style.setProperty(
			"--main-color",
			e.target.dataset.color
		);
		localStorage.setItem("option-color", e.target.dataset.color);

		addremoveactive(e);
	});
});

let backoption = true;
let intervalback;

// local storage background
let backgroundop = localStorage.getItem("back_option");
if (backgroundop !== null) {
	// remove classes
	document.querySelectorAll(".backop span").forEach((el) => {
		el.classList.remove("active");
	});
	if (backgroundop === "true") {
		backoption = true;
		document.querySelector(".yes").classList.add("active");
	} else {
		backoption = false;

		document.querySelector(".no").classList.add("active");
	}
}
// set Random Background option
let Rback = document.querySelectorAll(".backop span");
Rback.forEach((span) => {
	span.addEventListener("click", (e) => {
		addremoveactive(e);
		if (e.target.dataset.background === "yes") {
			backoption = true;
			localStorage.setItem("back_option", true);
			Randomizeimgs();
		} else {
			backoption = false;
			localStorage.setItem("back_option", false);
			clearInterval(intervalback);
		}
	});
});
// end setting

// Scorlling nav bar
let nav = document.querySelector(".header-area");
let links = document.querySelectorAll(".head ul li a");
let linkslist = document.querySelector(".head .links");
let togmenu = document.querySelectorAll(".toggel-menu span");
let toglmenu = document.querySelector(".toggel-menu ");
window.addEventListener("scroll", function () {
	nav.classList.toggle("stick", this.scrollY > 0);
	if (this.scrollY > 0) {
		links.forEach((li) => {
			li.style.color = "#777";
		});
		togmenu.forEach((sp) => {
			sp.style.backgroundColor = "#333";
		});
	} else {
		if (linkslist.classList.contains("open")) {
			links.forEach((li) => {
				li.style.color = "#777";
			});
		} else {
			links.forEach((li) => {
				li.style.color = "#fff";
			});
		}
		togmenu.forEach((sp) => {
			sp.style.backgroundColor = "#fff";
		});
	}
});

toglmenu.onclick = function (e) {
	e.stopPropagation();
	this.classList.toggle("active");
	linkslist.classList.toggle("open");
};

document.addEventListener("click", (e) => {
	if (e.target != toglmenu && e.target !== linkslist) {
		if (linkslist.classList.contains("open")) {
			toglmenu.classList.toggle("active");
			linkslist.classList.toggle("open");
		}
	}
});

linkslist.onclick = function (e) {
	e.stopPropagation();
};
//  Start landing
let landpage = document.querySelector(".landing-page");
let background = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// function Randomize background
function Randomizeimgs() {
	if (backoption === true) {
		intervalback = setInterval(() => {
			random = Math.floor(Math.random() * background.length);
			landpage.style.backgroundImage = `url(../imgs/${background[random]})`;
		}, 3000);
	}
}

Randomizeimgs();

// Animate Skills

let ourskills = document.querySelector(".skills-box");

window.onscroll = function () {
	// skills offset top
	let skillsoffset = ourskills.offsetTop;

	// skills outer Height
	let skillsoffsetheight = ourskills.offsetHeight;

	// window height
	let windowheight = this.innerHeight;

	// window scroll  top
	let windowscrolltop = this.scrollY;

	let eq = skillsoffset + skillsoffsetheight - windowheight;
	let skills = document.querySelectorAll(".skill-cont .prog-skill span");
	if (windowscrolltop > eq) {
		skills.forEach((skill) => {
			skill.style.width = skill.dataset.prog;
		});
	} else {
		skills.forEach((skill) => {
			skill.style.width = "0%";
		});
	}
};

// Create Popup
let images = document.querySelectorAll(".gallery img");

images.forEach((img) => {
	img.addEventListener("click", function (e) {
		// create overlay
		let overlay_box = document.createElement("div");

		// add class to overlay
		overlay_box.className = "over";

		// append overlay to th body
		document.body.appendChild(overlay_box);

		//create popup box
		let popupbox = document.createElement("div");

		// class for popup box
		popupbox.className = "popup_box";

		//create img
		let img_popup = document.createElement("img");
		img_popup.src = img.src;

		popupbox.appendChild(img_popup);

		document.body.appendChild(popupbox);

		// add alt as header
		if (img.alt !== null) {
			let heading = document.createElement("h3");
			let headingtext = document.createTextNode(img.alt);
			heading.appendChild(headingtext);
			popupbox.prepend(heading);
		}

		// create close button

		let closebutton = document.createElement("span");
		let icontext = document.createTextNode("X");
		closebutton.appendChild(icontext);
		closebutton.className = "close_button";
		popupbox.appendChild(closebutton);
	});
});

document.addEventListener("click", (e) => {
	if (e.target.className === "close_button") {
		e.target.parentNode.remove();
		document.querySelector(".over").remove();
	}
});

// Bullets
let bulttesevent = document.querySelectorAll(".bullets .bullet");

bulttesevent.forEach((e) => {
	e.addEventListener("click", (bullet) => {
		document.querySelector(bullet.target.dataset.dist).scrollIntoView({
			behavior: "smooth"
		});
	});
});

// function for add active

function addremoveactive(ev) {
	//remove class from li
	ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
		el.classList.remove("active");
	});

	// add class for li
	ev.target.classList.add("active");
}

//  show Bullets

let optionsshow = document.querySelectorAll(".bulletsop span");
let bulletscontainer = document.querySelector(".bullets");

let getshow = localStorage.getItem("bullet-option");
if (getshow !== null) {
	// remove classes
	optionsshow.forEach((el) => {
		el.classList.remove("active");
	});
	if (getshow === "block") {
		bulletscontainer.style.display = "block";
		document.querySelector(".bulletsop .yes").classList.add("active");
	} else {
		bulletscontainer.style.display = "none";
		document.querySelector(".bulletsop .no").classList.add("active");
	}
}
optionsshow.forEach((span) => {
	span.addEventListener("click", (e) => {
		if (span.dataset.bullet === "show") {
			bulletscontainer.style.display = "block";
			localStorage.setItem("bullet-option", "block");
		} else {
			bulletscontainer.style.display = "none";
			localStorage.setItem("bullet-option", "none");
		}
		addremoveactive(e);
	});
});

// Reset All options

document.querySelector(".Reset").onclick = function () {
	localStorage.clear();

	window.location.reload();
};
