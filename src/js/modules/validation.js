document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailPhoneInput = document.getElementById("email");
  const textInput = document.getElementById("text");
  const fileIcon = document.querySelector(".contacts__info-form-file");
  const fileInput = document.getElementById("fileInput");
  const textError = document.getElementById("textError");
  const formFiles = document.querySelector(".form-files");

  const textSuccessIcon = document.querySelector(".form__file-success");
  const textErrorIcon = document.querySelector(".form__file-close");


  const filePreviewContainer = document.createElement("div");
  filePreviewContainer.style.display = "flex";
  filePreviewContainer.style.flexWrap = "wrap";
  filePreviewContainer.style.gap = "10px";
  filePreviewContainer.style.justifyContent = "flex-end";
  formFiles.appendChild(filePreviewContainer);

  const clearFilesButton = document.createElement("button");
  clearFilesButton.textContent = "✖"; // Добавить крестик
  clearFilesButton.style.display = "none";
  clearFilesButton.style.color = "#222";
  clearFilesButton.style.fontSize = "12px";
  clearFilesButton.style.cursor = "pointer";
  clearFilesButton.style.position = "absolute";
  clearFilesButton.style.top = "-16px";
  clearFilesButton.style.right = "0";
  formFiles.appendChild(clearFilesButton);

  function showError(input, errorElement, errorIcon, successIcon) {
    input.classList.add("error");
    input.classList.remove("success");
    errorElement.style.display = "block";
    errorIcon.style.display = "block";
    successIcon.style.display = "none";
  }

  function showSuccess(input, errorElement, errorIcon, successIcon) {
    input.classList.remove("error");
    input.classList.add("success");
    errorElement.style.display = "none";
    errorIcon.style.display = "none";
    successIcon.style.display = "block";
  }

  function validateName() {
    const nameError = document.getElementById("nameError");
    const errorClose = nameInput.nextElementSibling;
    const successIcon = errorClose.nextElementSibling;

    if (nameInput.value.trim().length < 2) {
      showError(nameInput, nameError, errorClose, successIcon);
      return false;
    } else {
      showSuccess(nameInput, nameError, errorClose, successIcon);
      return true;
    }
  }

  function validateEmailOrPhone() {
    const emailPhoneError = document.getElementById("emailError");
    const errorClose = emailPhoneInput.nextElementSibling;
    const successIcon = errorClose.nextElementSibling;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+7\d{10}$/;

    const value = emailPhoneInput.value.trim();

    if (emailPattern.test(value) || phonePattern.test(value)) {
      showSuccess(emailPhoneInput, emailPhoneError, errorClose, successIcon);
      return true;
    } else {
      showError(emailPhoneInput, emailPhoneError, errorClose, successIcon);
      return false;
    }
  }

  function validateText() {
    const hasText = textInput.value.trim().length > 0;
    const hasFiles = filePreviewContainer.childElementCount > 0;

    if (hasText && hasFiles) {
      showSuccess(textInput, textError, textErrorIcon, textSuccessIcon);
      return true;
    } else {
      showError(textInput, textError, textErrorIcon, textSuccessIcon);
      return false;
    }
  }

  textErrorIcon.addEventListener("click", function () {
    textInput.value = "";
    textInput.classList.remove("error", "success");
    textError.style.display = "none";
    textErrorIcon.style.display = "none";
    textSuccessIcon.style.display = "none";
  });

  document.querySelectorAll(".contacts__info-form-close").forEach((closeIcon) => {
    closeIcon.addEventListener("click", function () {
      const input = closeIcon.previousElementSibling;

      input.value = "";
      input.classList.remove("error", "success");

      if (input.id === "name") {
        const nameError = document.getElementById("nameError");
        nameError.style.display = "none";
      } else if (input.id === "email") {
        const emailError = document.getElementById("emailError");
        emailError.style.display = "none";
      } else if (input.id === "text") {
        textError.style.display = "none";
      }

      closeIcon.style.display = "none";
      closeIcon.nextElementSibling.style.display = "none";
    });
  });

  fileIcon.addEventListener("click", function (event) {
    event.preventDefault();
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    Array.from(fileInput.files).forEach((file) => {
      const fileType = file.type;
      const filePreview = document.createElement("div");
      filePreview.style.width = "26px";
      filePreview.style.height = "26px";
      filePreview.style.backgroundColor = "#fff";
      filePreview.style.color = "#222";
      filePreview.style.fontSize = "6px";
      filePreview.style.display = "flex";
      filePreview.style.borderRadius = "5px";
      filePreview.style.alignItems = "center";
      filePreview.style.justifyContent = "center";
      filePreview.style.position = "relative";

      if (fileType.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          filePreview.style.backgroundImage = `url(${e.target.result})`;
          filePreview.style.backgroundSize = "cover";
          filePreview.style.backgroundPosition = "center";
          filePreview.style.backgroundRepeat = "no-repeat";
          filePreview.textContent = "";
        };
        reader.readAsDataURL(file);
      } else {
        const fileExtension = file.name.split('.').pop().toUpperCase();
        filePreview.textContent = fileExtension;
      }

      filePreviewContainer.appendChild(filePreview);
    });

    formFiles.style.display = "block";
    clearFilesButton.style.display = "block";
    validateText();
    fileInput.value = "";
  });

  clearFilesButton.addEventListener("click", function () {
    filePreviewContainer.innerHTML = "";
    formFiles.style.display = "none";
    clearFilesButton.style.display = "none";
    validateText();
  });

  form.addEventListener("submit", function (event) {
    const isNameValid = validateName();
    const isEmailOrPhoneValid = validateEmailOrPhone();
    const isTextValid = validateText();

    if (!isNameValid || !isEmailOrPhoneValid || !isTextValid) {
      event.preventDefault();
    }
  });

  nameInput.addEventListener("input", validateName);
  emailPhoneInput.addEventListener("input", validateEmailOrPhone);
  textInput.addEventListener("input", validateText);

  nameInput.addEventListener("blur", validateName);
  emailPhoneInput.addEventListener("blur", validateEmailOrPhone);
  textInput.addEventListener("blur", validateText);
});




