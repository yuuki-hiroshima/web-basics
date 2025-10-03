// ===== 要素参照 =====
const form = document.getElementById("registerForm");
const submitBtn = document.getElementById("submitBtn");
const successEl = document.getElementById("success");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const errorName = document.getElementById("errorName");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");

const toggleHelpBtn = document.getElementById("toggleHelp");
const helpText = document.getElementById("helpText");

// ===== 正規表現パターン（index8と同等の要件） =====
const nameRegex = /^[ぁ-んァ-ヶｦ-ﾟa-zA-Z0-9 ]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!-/:-@[-`{-~]{8,}$/;

// ===== ヘルプ開閉 =====
toggleHelpBtn.addEventListener("click", () => {
  const willOpen = helpText.hasAttribute("hidden");
  if (willOpen) {
    helpText.removeAttribute("hidden");
    toggleHelpBtn.setAttribute("aria-expanded", "true");
    toggleHelpBtn.textContent = "ヘルプを隠す";
  } else {
    helpText.setAttribute("hidden", "");
    toggleHelpBtn.setAttribute("aria-expanded", "false");
    toggleHelpBtn.textContent = "ヘルプを表示";
  }
});

// ===== 汎用：状態反映（枠色/aria-invalid/メッセージ） =====
function setFieldState(inputEl, msgEl, ok, msg) {
  inputEl.setAttribute("aria-invalid", ok ? "false" : "true");
  inputEl.classList.toggle("error-border", !ok);
  inputEl.classList.toggle("success-border", ok);
  msgEl.textContent = msg || (ok ? "OK!" : "");
  msgEl.classList.toggle("error", !ok);
  msgEl.classList.toggle("ok", ok);
}

// ===== 個別バリデータ =====
function validateName() {
  const v = nameInput.value.trim();
  const ok = nameRegex.test(v);
  setFieldState(nameInput, errorName, ok,
    ok ? "OK!" : "3〜20文字。ひらがな/カタカナ/英数字/半角スペースのみ可。");
  return ok;
}

function validateEmail() {
  const v = emailInput.value.trim();
  const ok = emailRegex.test(v);
  setFieldState(emailInput, errorEmail, ok,
    ok ? "OK!" : "メール形式が正しくありません（name@domain.tld）。");
  return ok;
}

function validatePassword() {
  const v = passwordInput.value;
  const ok = passwordRegex.test(v);
  setFieldState(passwordInput, errorPassword, ok,
    ok ? "OK!" : "8文字以上・英字と数字を最低1つずつ含めてください。");
  return ok;
}

// ===== 送信ボタンの有効化制御 =====
function updateSubmitState() {
  const allOk = validateName() && validateEmail() && validatePassword();
  submitBtn.disabled =  !allOk;
  successEl.textContent = "";
}

// ===== 入力中（リアルタイム）イベント登録 =====
[nameInput, emailInput ,passwordInput].forEach((e1) => {
  e1.addEventListener("input", updateSubmitState);
});

// 初期化：ロード時に一度評価（ボタン無効を確実に）
updateSubmitState();

// ===== 送信ハンドラ =====
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const okName = validateName();
  const okEmail = validateEmail();
  const okPassword = validatePassword();
  if (okName && okEmail && okPassword) {
    successEl.textContent = "送信成功！";
  } else {
    successEl.textContent = "";
    const firstError = (!okName && nameInput) || (!okEmail && emailInput) || (!okPassword && passwordInput);
    firstError && firstError.focus();
  }
});