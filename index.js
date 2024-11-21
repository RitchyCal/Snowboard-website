let themeButton = document.getElementById("theme-button");
// Function to toggle dark mode
const toggleDarkMode = () => {
	// Toggle the "dark-mode" class on the body element
	document.body.classList.toggle("dark-mode");
	// Add a specific style to the button (optional)
	themeButton.classList.toggle("dark-mode-button"); // Ensure you define this in your CSS
};

// Add the event listener to the button (only once)
themeButton.addEventListener("click", toggleDarkMode);

let signNowButton = document.getElementById("sign-now-button");
const addSignature = (person) => {
	// Write your code to manipulate the DOM here
	const name = person.name;
	const hometown = person.hometown;
	const email = person.email;

	const signatureText = `🖊️ ${name} from ${hometown} support this.`;

	const newSignature = document.createElement("p");
	newSignature.textContent = signatureText;

	const signaturesContainer = document.querySelector(".signatures");

	signaturesContainer.appendChild(newSignature);

	document.querySelector('input[name="Name"]').value = "";
	document.querySelector('input[name="HomeTown"]').value = "";
	document.querySelector('input[name="Email"]').value = "";
};

const validateForm = (event) => {
	let containsErrors = false;
	var petitionInputs = document.getElementById("sign-petition").elements;
	let person = {
		name: petitionInputs[0].value,
		hometown: petitionInputs[1].value,
		email: petitionInputs[2].value,
	};

	for (let i = 0; i < petitionInputs.length; i++) {
		if (petitionInputs[i].value.length < 2) {
			containsErrors = true;
			petitionInputs[i].classList.add("error");
		}
	}

	if (!containsErrors) {
		addSignature(person);
		toggleModal(person);
		for (let i = 0; i < petitionInputs.length; i++) {
			petitionInputs[i].value = "";
		}
	} else {
		event.preventDefault();
	}
};

signNowButton.addEventListener("click", (event) => {
	validateForm(event);
});

let animation = {
	revealDistance: 100,
	initialOpacity: 0,
	transitionDelay: 0,
	transitionDuration: "2s",
	transitionProperty: "all",
	transitionTimingFunction: "ease",
};

let revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
	for (let i = 0; i < revealableContainers.length; i++) {
		let windowHeight = window.innerHeight;
		let topOfRevealableContainer =
			revealableContainers[i].getBoundingClientRect().top;

		// Check if the element is in view
		if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
			// Apply the transition when the element is in view
			revealableContainers[i].classList.remove("revealable");
			revealableContainers[i].classList.add("active");

			// Set inline styles for transition
			revealableContainers[i].style.opacity = 1;
			revealableContainers[i].style.transitionDelay = animation.transitionDelay;
			revealableContainers[i].style.transitionDuration =
				animation.transitionDuration;
			revealableContainers[i].style.transitionProperty =
				animation.transitionProperty;
			revealableContainers[i].style.transitionTimingFunction =
				animation.transitionTimingFunction;
		} else {
			// Reset the element when it's out of view
			revealableContainers[i].classList.remove("active");
			revealableContainers[i].classList.add("revealable");

			// Reset inline styles
			revealableContainers[i].style.opacity = animation.initialOpacity;
		}
	}
};

// Add event listener for scrolling
window.addEventListener("scroll", reveal);

// Call reveal() on page load to check initial positions
window.addEventListener("load", reveal);

const toggleModal = (person) => {
	let modal = document.getElementById("thanks-modal");
	let modalContainer = document.getElementById("modal-text-container");
	let intervalId = setInterval(scaleImage, 500);
	modal.style.display = "flex";

	const thankYouText = `Thank you so much ${person.name}! ${person.hometown} represent!`;
	const newThankYou = document.createElement("p");
	newThankYou.textContent = thankYouText;

	modalContainer.appendChild(newThankYou);

	setTimeout(() => {
		modal.style.display = "none";
		newThankYou.textContent = "";
		clearInterval(intervalId);
	}, 4000);
};

let scaleFactor = 1;
let modalImage = document.querySelector(".snow-town");

const scaleImage = () => {
	scaleFactor = scaleFactor === 1 ? 0.8 : 1;
	modalImage.style.transform = `scale(${scaleFactor})`;
};
