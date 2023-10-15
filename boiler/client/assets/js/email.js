"use strict";

let pre = document.querySelector("#text");
let button = document.querySelector("#send");
let head = document.querySelector("#head");
let emailDOM = document.querySelector("#email");
const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const emailIsValid = (email) => {
	return regex.test(email);
};

const InitiateSending = () => {
	sendEmail({ email: emailDOM.value });
	head.innerText = "Sending 💌";
	pre.innerText = `...to ${emailDOM.value}`;
	emailDOM.value = "";
	button.disabled = false;
	button.innerText = "•••";
	emailDOM.style.backgroundColor = "";
};

emailDOM.addEventListener("input", (e) => {
	const target = e.target;
	const currentValue = target.value;

	if (emailIsValid(currentValue)) {
		target.style.backgroundColor = "#039e4b21";
		return;
	}

	target.style.backgroundColor = "#9e030321";
});

emailDOM.addEventListener("blur", (e) => {
	const target = e.target;
	const currentValue = target.value;

	if (currentValue.length === 0) {
		target.style.backgroundColor = "";
	}
});

button.addEventListener("click", (e) => {
	if (emailIsValid(emailDOM.value)) {
		InitiateSending();
	}
});

window.addEventListener("keypress", (e) => {
	if (e.key === "Enter" && emailIsValid(emailDOM.value)) {
		InitiateSending();
	}
});

const sendEmail = (email) => {
	fetch("/send", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(email),
	})
		.then((r) => {
			head.innerText = !r.ok ? "error ❌" : null;
			return r.json();
		})
		.then((response) => {
			head.innerText = response.ok ? "Sent ✅" : "error ❌";
			pre.innerText = JSON.stringify(response, null, 2);
		})
		.finally(() => {
			button.innerText = "Send Email";
			button.disabled = false;
		});
};
