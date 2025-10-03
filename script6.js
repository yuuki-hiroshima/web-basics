// フォームの要素を取得
const form = document.getElementById("registerForm");
// エラー表示用の要素を取得
const errorsEl = document.getElementById("errors");
// 成功メッセージ表示用の要素を取得
const successEl = document.getElementById("success");

// フォーム送信イベントを監視
form.addEventListener("submit", function (event) {
  event.preventDefault(); //ページのリロードを防ぐ

  // 入力値を取得
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // エラーを格納する配列
  const errors = [];

  // --- 名前のチェック ---
  if (name === "" || name.length < 3) {
    errors.push("名前は3文字以上必要です。");
  }

  // --- メールのチェック ---
  if (email === "" || !email.includes("@")) {
    errors.push("正しいメールアドレスを入力してください。");
  }

  // --- パスワードのチェック ---
  if (password === "" || password.length < 6) {
    errors.push("パスワードは6文字以上必要です。")
  }

  // --- 結果の表示 ---
  if (errors.length > 0) {  // エラーがある場合
    errorsEl.innerHTML = errors.join("<br>");
    successEl.textContent = ""; // 成功メッセージを消す
  } else { // 全ての条件を満たす場合
    errorsEl.innerHTML = "";
    successEl.textContent = "送信成功！";
  }
});