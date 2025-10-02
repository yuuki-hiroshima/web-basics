// ========== A. OR（||）での入力チェック ==========

// ボタン要素を取得
const btnOr = document.getElementById("btnOr");
// メッセージ表示要素を取得
const msgOr = document.getElementById("msgOr");

// クリック時の処理を登録
btnOr.addEventListener("click", function() {
  // 入力欄の値を取得し前後スペースを除去
  const name = document.getElementById("userName").value.trim();

  // 「未入力」または「3文字未満」ならエラー（OR：||）
  if (name === "" || name.length < 3) {
    msgOr.textContent = "エラー：未入力 または 3文字未満です。";
    msgOr.style.color = "red";
  } else {
    msgOr.textContent = "OK：入力条件を満たしています。";
    msgOr.style.color = "green";
  }
});

// ========== B. 三項演算子で合否判定 ==========

// ボタン要素を取得
const btnTernary = document.getElementById("btnTernary");
// メッセージ表示要素を取得
const msgTernary = document.getElementById("msgTernary");

// クリック時の処理
btnTernary.addEventListener("click", function() {
  // スコアの文字列を取得して数値へ
  const scoreRaw = document.getElementById("score").value.trim();
  const score = Number(scoreRaw);

  // 無効値の簡易チェック（空 or 数値でない）
  if (score === "" || Number.isNaN(score)) {
    msgTernary.textContent = "数字を入力してください。";
    msgTernary.style.color = "red";
    return; // 以降の処理を中断
  }

  // 三項演算子：条件 ? 真のとき : 偽のとき
  const resultText = score >= 60 ? "合格" : "不合格";
  msgTernary.textContent = `結果：${resultText}`;
  msgTernary.style.color = score >= 60 ? "green" : "orange";
});

// ========== C. for文：偶数リストと合計 ==========

// ボタン要素を取得
const btnFor = document.getElementById("btnFor");
// ULと合計表示要素を取得
const listEl = document.getElementById("list");
const sumEl = document.getElementById("sum");

// クリック時の処理
btnFor.addEventListener("click", function() {
  // 上限Nを数値に
  const raw = document.getElementById("maxN").value.trim();
  const n = Number(raw);

  // 入力チェック
  if (raw === "" || Number.isNaN(n) || n < 1) {
    listEl.innerHTML = "";                    // 前回の結果をクリア
    sumEl.textContent = "1以上の数値を入力してください。";
    sumEl.style.color = "red";
    return;
  } 

  // 前回表示のクリア
  listEl.innerHTML = "";
  sumEl.textContent = "";
  sumEl.style.color = "#222";

  // 合計用の変数を初期化（0でスタート）
  let total = 0;

  // 1〜n を繰り返す
  for (let i = 1; i <= n; i++) {
    // 偶数ならリスト項目を作成して追加
    if (i % 2 === 0) {
      const li = document.createElement("li"); // <li>を作る
      li.textContent = i;                      // 数字を表示
      listEl.appendChild(li);                  // ULに追加
    }
    // 合計を加算（偶数・奇数関係なく）
    total = total + i;      // total += i; と同じ意味
  }
  // 合計を表示
  sumEl.textContent = `1〜${n} の合計： ${total}`;
})
