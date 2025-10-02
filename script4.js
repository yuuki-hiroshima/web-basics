// 「判定」ボタンのクリックで処理を開始
document.getElementById("judgeBtn").addEventListener("click", function() {
  
  // 入力欄の要素（DOM）を取得
  const ageInputEl = document.getElementById("ageInput");
  
  // 結果と注意書きの表示先を取得
  const resultEl = document.getElementById("result");
  const noteEl = document.getElementById("note");
  
  // 入力値（文字列）を取り出し、前後の空白を除去
  const raw = ageInputEl.value.trim();
  
  // 文字列を数値に変換（"30" -> 30, "" -> NaN）
  const age = Number(raw);
  
  // 表示の色などを毎回リセット
  resultEl.style.color = "#222";
  noteEl.textContent = "";
  
  // 無効値のチェック：空文字 or 数値でない場合
  if (raw === "" || Number.isNaN(age)) {
    resultEl.textContent = "数値を入力してください。";
    resultEl.style.color = "red"
    return; // ここで処理を終了
  }

  // 不正範囲（マイナス）のチェック
  if (age < 0) {
    resultEl.textContent = "無効な値です（0以上を入力）。";
    resultEl.style.color = "red";
    return;
  }

  // ここから料金区分の条件分岐
  if (age <= 12) {
    resultEl.textContent = "子供料金です。";
    resultEl.style.color = "blue";

    if (age >= 10 && age <=12) {
      noteEl.textContent = "ジュニア割適用対象（10歳〜12歳）"
      noteEl.style.color = "deeppink"
    }
  } else if (age <= 64) {
    resultEl.textContent = "大人料金です。";
    resultEl.style.color = "green";
  } else if (age >= 65) {
    resultEl.textContent = "シニア料金です。";
    resultEl.style.color = "orange";
  } else {
    resultEl.textContent = "判定できませんでした。";
    resultEl.style.color = "red"
  }
});