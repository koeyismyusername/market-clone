const form = document.querySelector("#write-form");

form.addEventListener("submit", handleSubmitForm);

function handleSubmitForm(event) {
  event.preventDefault();
  const body = new FormData(form);
  body.append("insertAt", new Date().getTime());
  try {
    fetch("/items", {
      method: "POST",
      body: body,
    })
      .then((value) => value.json())
      .then((res) => {
        if (res === "200") location.pathname = "/";
      });
  } catch (e) {
    console.erroe(e);
  }
}
