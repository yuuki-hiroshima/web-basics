// フォームと成功メッセージ
const form = document.getElementById("registerForm");
const successEl = document.getElementById("success");

// 入力欄とエラー表示用の要素
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const errorName = document.getElementById("errorName");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");

// ========== チェック関数 ==========
function validateName() {
  const name = nameInput.value.trim();
  if (name === "" || name.length < 3) {
    errorName.textContent = "名前は3文字以上必要です。";
    nameInput.classList.add("error-border");
    nameInput.classList.remove("success-border");
    return false;
  } else {
    errorName.textContent = "OK!";
    errorName.style.color = "green";
    nameInput.classList.add("success-border");
    nameInput.classList.remove("error-border");
    return true;
  }
}

function validateEmail() {
  const email = emailInput.value.trim();
  if (email === "" || !email.includes("@")) {
    errorEmail.textContent = "正しいメールアドレスを入力してください。";
    errorEmail.style.color = "red";
    emailInput.classList.add("error-border");
    emailInput.classList.remove("success-border");
    return false;
  } else {
    errorEmail.textContent = "OK!";
    errorEmail.style.color = "green";
    emailInput.classList.add("success-border");
    emailInput.classList.remove("error-border");
    return true;
  }
}

function validatePassword() {
  const password = passwordInput.value.trim();
  if (password === "" || password.length < 6) {
    errorPassword.textContent = "パスワードは6文字以上必要です。";
    errorPassword.style.color = "red";
    passwordInput.classList.add("error-border");
    passwordInput.classList.remove("success-border");
    return false;
  } else {
    errorPassword.textContent = "OK!";
    errorPassword.style.color = "green"
    passwordInput.classList.add("success-border");
    passwordInput.classList.remove("error-border");
    return true;
  }
}

// ========== イベント登録（リアルタイムチェック） ==========
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);

// ========== フォーム送信時のチェック ==========
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (isNameValid && isEmailValid && isPasswordValid) {
    successEl.textContent = "送信成功！";
  } else {
    successEl.textContent = "入力に誤りがあります。";
    successEl.style.color = "red";
  }
});