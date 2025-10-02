
// 「チェック」ボタンを押したら処理を実行
document.getElementById("checkBtn").addEventListener("click", function() {

  // 入力欄の値を変数 inputText に代入
  let inputText = document.getElementById("nameInput").value;

  // 結果を表示する要素を取得
  const result = document.getElementById("result");

  // if文で文字数を判定する
  if (inputText.length < 5) {
    result.textContent = "短すぎます(5文字以上入力してください)";
    result.style.color = "red";
  } else {
    result.textContent = "OK! 入力ありがとうございます";
    result.style.color = "green";
  }
});