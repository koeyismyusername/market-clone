const form = document.querySelector("#write-form");

form.addEventListener("submit", handleSubmitForm);

function handleSubmitForm(event) {
  event.preventDefault();
  fetch("/items", {
    method: "POST",
    body: new FormData(form),
  }).then(console.log("hello!"));
}
