const form = document.querySelector("#write-form");

form.addEventListener("submit", handleSubmitForm);

function handleSubmitForm(event) {
  event.preventDefault();
  try {
    fetch("/items", {
      method: "POST",
      body: new FormData(form),
    })
      .then((value) => value.json())
      .then((res) => {
        if (res === "200") location.pathname = "/";
      });
  } catch (e) {
    console.erroe(e);
  }
}
