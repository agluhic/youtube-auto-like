'use strict'


let i18n = new I18n();
// define the new options in constants
let optionManager = new OptionManager(OPTIONS);

// Init i18n
i18n.populateText();

function onFieldChange() {
	switch(this.type) {
		case("radio"):
		case("number"):
			optionManager.get().then((options) => {
				options[this.name] = this.value;
				optionManager.set(options);
			});
			break;
		case("checkbox"):
			optionManager.get().then((options) => {
				options[this.name] = this.checked;
				optionManager.set(options);
			})
			break;
	}
}

function onPercentageChange() {
	let buttonPercentage = this;
	if (buttonPercentage.value < 0) {
		buttonPercentage.value = 0;
	} else if (buttonPercentage.value > 100) {
		buttonPercentage.value = 100;
	}
	onFieldChange.call(buttonPercentage);
}

function onMinuteChange() {
	let buttonPercentage = this;
	if (buttonPercentage.value < 0) {
		buttonPercentage.value = 0;
	}
	onFieldChange.call(buttonPercentage);
}

function onActivationChange() {
	let myLabel = document.querySelectorAll("label[for='" + this.id + "']")[0];
	if (this.checked) {
		myLabel.children[1].textContent = "__MSG_activated__";
		myLabel.children[1].className = "activated";
	} else {
		myLabel.children[1].textContent = "__MSG_desactivated__";
		myLabel.children[1].className = "desactivated";
	}
	i18n.populateText();
	onFieldChange.call(this);
}

// Restore options
// replace _ by - ins't beautiful, but name are with _ and id with -
// and current firefox storage only store string, so can't create object with name and id
// solution is to stock both or replace name, I took replace
optionManager.get().then((options) => {
	// restore the subscribed section
	document.querySelector(`input[name="subscribed_liker_type"][value="${options.subscribed_liker_type}"]`).click();
	document.querySelector(`input[name="subscribed_type_timer"][value="${options.subscribed_type_timer}"]`).click();
	document.getElementById(`${options.subscribed_type_timer.replace("_","-")}-value`).setAttribute("value", `${options.subscribed_timer_value}`);

	// restore the all section
	document.querySelector(`input[name="all_liker_type"][value="${options.all_liker_type}"]`).click();
	document.querySelector(`input[name="all_type_timer"][value="${options.all_type_timer}"]`).click();
	document.getElementById(`${options.all_type_timer.replace("_","-")}-value`).setAttribute("value", `${options.all_timer_value}`);


	// old restore
	document.querySelector(`input[name="like_what"][value="${options.like_what}"]`).click();
	document.querySelector(`input[name="like_timer"][value="${options.like_timer}"]`).click();
	document.querySelector(`input[name="type_timer"][value="${options.type_timer}"]`).click();
	document.getElementById(`${options.type_timer}-value`).setAttribute("value",`${options.timer_value}`);

	let buttonActivated = document.getElementById("checkbox_activated");
	if (options.activated) {
		buttonActivated.click();
		onActivationChange.call(buttonActivated);
	} else {
		onActivationChange.call(buttonActivated);
	}
});

// Trigger a function when the user changes an option
document.querySelectorAll('input[type="radio"]').forEach((field) => {
	field.addEventListener( 'click', onFieldChange.bind(field) );
});

document.getElementById("percentage-value").addEventListener( 'input', onPercentageChange);
document.getElementById("minute-value").addEventListener( 'input', onMinuteChange);

document.getElementById("checkbox_activated").addEventListener( 'click', onActivationChange);


var typeLiker = ["subscribed", "all"]
document.getElementById("subscribed-instant-like").addEventListener( 'click', () => {
	document.getElementById("subscribed-options-timer").style.visibility = "hidden";
});

document.getElementById("subscribed-custom-like").addEventListener( 'click', () => {
	document.getElementById("subscribed-options-timer").style.visibility = "visible";
});

var listItems = document.getElementsByClassName("list-arrow");
var on_offListItems = new Array(listItems.length);

for (var i = on_offListItems.length - 1; i >= 0; i--) {
	on_offListItems[i] = false;
}


function test(){
	console.log("aaa")
	console.log(this)
	console.log("aaa")
	var section = get1stClassAfter(this, "toggle-content");
	console.log(section)
	//if (section == null) { console.error("Section is null") };

	if (section.classList.contains("expend")) {
		section.style.maxHeight = "0";
	} else {
		section.style.maxHeight = "100%";
	}
	section.classList.toggle("expend");
	section.previousElementSibling.classList.toggle("expend");
}

for (var i = listItems.length - 1; i >= 0; i--) {
	console.log(i)
	listItems[i].addEventListener( 'click', test )
}

function get1stClassAfter(Parent, ChildClass) {
	console.log(Parent)
	var tmp = Parent;
	while (tmp != null) {
		tmp = tmp.nextElementSibling;
		if (tmp.classList.contains(ChildClass)) {
			return tmp;
		}
	}
	return null;
}

// var on_off = true;
// document.getElementById("navToggle").addEventListener( 'click', () => {
// 	on_off = !on_off;
// 	if (on_off) {
// 		document.getElementById("mainNav").style.visibility = "hidden";
// 	} else {
// 		document.getElementById("mainNav").style.visibility = "visible";
// 	}
	
// });


/*
var mainNav = document.getElementById('mainNav');
var navToggle = document.getElementById('navToggle');

var on_off = true;
// Establish a function to toggle the class "collapse"
function mainNavToggle() {
	if (on_off) {
		document.getElementById("mainNav").style.visibility = "visible";
		on_off = !on_off;
	} else {
		document.getElementById("mainNav").style.visibility = "hidden";
		on_off = !on_off;
	}
	//mainNav.classList.toggle('expend');
}

// Add a click event to run the mainNavToggle function
navToggle.addEventListener('click', mainNavToggle);
*/