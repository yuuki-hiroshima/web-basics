// ====== 要素の取得 ======
const form = document.getElementById("registerForm");
const successEl = document.getElementById("success");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const errorName = document.getElementById("errorName");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");

// ====== 正規表現（パターン） ======
// ^ と $ は「行頭」「行末」を意味し、全体がこのパターンに一致することを要求
// [ぁ-んァ-ヶｦ-ﾟa-zA-Z0-9 ] は許可する文字の集合（ひらがな/カタカナ/半角カナ/英数/半角スペース）
// {3,20} は文字数の下限3・上限20
const nameRegex = /^[ぁ-んァ-ヶｦ-ﾟa-zA-Z0-9 ]{3,20}$/;

// メールの簡易チェック：空白と @ の位置、ドメインの . をざっくり確認
// 実務では要件に合わせてより厳密なパターンを選定する
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// パスワード：8文字以上、英字1つ以上(?=.*[A-Za-z])、数字1つ以上(?=.*\d)
// 許可文字は英字・数字・一般的な記号（!-/:-@[-`{-~）を想定
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!-/:-@[-`{-~]{8,}$/;

// ====== 個別チェック関数 ======
function validateName() {
  const value = nameInput.value.trim();
  if (!nameRegex.test(value)) {
    errorName.textContent = "3〜20文字。ひらがら/カタカナ/英数字/半角スペースのみ可。"
    errorName.style.color = "red";
    nameInput.classList.add("error-border");
    nameInput.classList.remove("success-border");
    return false;
  }
  errorName.textContent = "OK!";
  errorName.style.color = "green";
  nameInput.classList.add("success-border")
  nameInput.classList.remove("error-border")
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (!emailRegex.test(value)) {
    errorEmail.textContent = "メール形式が正しくありません（name@domain.tld）。";
    errorEmail.style.color = "red";
    emailInput.classList.add("error-border");
    emailInput.classList.remove("success-border");
    return false;
  }
  errorEmail.textContent = "OK!";
  errorEmail.style.color = "green";
  emailInput.classList.add("success-border");
  emailInput.classList.remove("error-border");
  return true;
}

function validatePassword() {
  const value = passwordInput.value;
  if (!passwordRegex.test(value)) {
    errorPassword.textContent = "8文字以上・英字と数字を最低1つずつ含めてください。";
    errorPassword.style.color = "red"
    passwordInput.classList.add("error-border");
    passwordInput.classList.remove("success-border");
    return false;  
  }
  errorPassword.textContent = "OK!";
  errorPassword.style.color = "green";
  passwordInput.classList.add("success-border");
  passwordInput.classList.remove("error-border");
  return true;
}

// ====== 入力中（リアルタイム）チェック ======
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);

// ====== 送信時の総合チェック ======
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const okName = validateName();
  const okEmail = validateEmail();
  const okPassword = validatePassword();

  if (okName && okEmail && okPassword) {
    successEl.textContent = "送信成功！";
  } else {
    successEl.textContent = "入力に誤りがあります。";
    successEl.style.color = "red";
  }
});