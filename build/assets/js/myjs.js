const sendEmail = document.querySelector(".sendEmail");

const form = document.querySelector("#form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("stoped");
  await MyForm();
});

async function MyForm() {
  const fname = document.querySelector("#fname");
  const lname = document.querySelector("#lname");
  const email = document.querySelector("#email");
  const phone = document.querySelector("#phone");
  const message = document.querySelector("#message");

  // Function to check if email is valid
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to check if phone number is valid
  function isValidPhone(phone) {
    // Use a regular expression for basic phone number validation
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phone);
  }

  // Check
  if (
    !fname.value ||
    !lname.value ||
    !isValidEmail(email.value) ||
    typeof phone.value !== "number" ||
    !isValidPhone(phone.value) ||
    !message.value
  ) {
    if (!fname.value) {
      fname.style.border = "1px solid red";
    } else {
      fname.style.border = "none";
    }

    if (!lname.value) {
      lname.style.border = "1px solid red";
    } else {
      lname.style.border = "none";
    }

    if (!isValidEmail(email.value)) {
      email.style.border = "1px solid red";
    } else {
      email.style.border = "none";
    }

    if (!isValidPhone(phone.value)) {
      phone.style.border = "1px solid red";
    } else {
      phone.style.border = "none";
    }

    if (!message.value) {
      message.style.border = "1px solid red";
    } else {
      message.style.border = "none";
    }
  }

  const formData = new FormData();
  formData.append("fname", fname.value);
  formData.append("lname", lname.value);
  formData.append("phone", phone.value);
  formData.append("email", email.value);
  formData.append("message", message.value);

  // for (const entry of formData.entries()) {
  //   // console.log(entry); //okay
  // }

  // fetch
  try {
    const fetchEmailResponse = await fetch("/contactUS", {
      method: "POST",
      body: formData,
    });

    if (!fetchEmailResponse.ok) {
      // console.log("Server returned an error:", fetchEmailResponse.statusText);
      return;
    }

    const sendEmail = await fetchEmailResponse.json();

    form.reset();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // console.log("Sent", sendEmail);
  } catch (error) {
    console.error("Error occurred during fetch:", error);
  }
}
