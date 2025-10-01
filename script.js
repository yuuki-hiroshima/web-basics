console.log('script.js 読み込みOK');

document.getElementById('btn').addEventListener('click', () => {
  document.getElementById('title').style.color = 'blue';
});

// タイトルとボタンを取得
const title = document.querySelector("#title");   // HTMLの中から id="title" の要素（h1タグ）を取得し、変数 title に入れる
const btn = document.querySelector("#btn");       // HTMLの中から id="btn" の要素（buttonタグ）を取得して、変数 btn に入れる

// ボタンがクリックされたときの処理
btn.addEventListener("click", () => {             // 取得したボタンに「クリックされたら～を実行する」というイベントを登録する
  title.textContent = "スタイルをいじってみました!";  // h1タグの中身のテキストを「JavaScriptで変更しました！」に書き換える
  title.style.color = "blue";                      // h1タグの文字色を「青色」に変更する（CSSを直接操作しているイメージ）

// CSSを変更（1つずつ書き換えてみる）
title.style.color = "white";            // 文字色を白に
title.style.backgroundColor = "black";  // 背景色を黒に
title.style.fontSize = "40px";          // フォントサイズを40pxに
title.style.padding = "10px";           // 内側に余白をつける
title.style.borderRadius = "8px";       // 角を丸くする
});