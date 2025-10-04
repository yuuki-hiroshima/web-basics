// ===== データ配列と状態 =====
let users = [];                              // ユーザーデータの配列
let editIndex = null;                        // 編集中のインデックス。nullなら追加モード
let filterText = "";                         // 検索文字列

// ===== 定数（ローカルストレージ用） =====
const STORAGE_KEY = "users_v1";              // 保存キー名

// ===== 要素参照 =====
const form = document.getElementById("userForm");          // フォーム
const nameInput = document.getElementById("name");         // 名前入力
const emailInput = document.getElementById("email");       // メール入力
const submitBtn = form.querySelector('button[type="submit"]'); // 送信ボタン

const tableBody = document.querySelector("#userTable tbody"); // テーブルtbody
const searchInput = document.getElementById("search");        // 検索入力
const countEl = document.getElementById("count");             // 件数表示

// ===== ローカルストレージ：読み込み =====
function loadFromStorage() {
  // 保存済み文字列を取得（なければnull）
  const raw = localStorage.getItem(STORAGE_KEY);
  // 文字列があればJSONをオブジェクトに変換、なければ空配列
  users = raw ? JSON.parse(raw) : [];
}

// ===== ローカルストレージ：保存 =====
function saveToStorage() {
  // 配列usersをJSON文字列に変換して保存
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// ===== 重複メールチェック（編集時は自分を除いて判定）=====
function isEmailDuplicated(email, excludeIndex = null) {
  // 一致するメールを持つ要素があるかを調べる
  return users.some((u, i) => u.email === email && i !== excludeIndex);
}

// ===== フォーム送信（追加/更新）=====
form.addEventListener("submit", function (e) {
  e.preventDefault();                                     // ページリロード防止

  const name = nameInput.value.trim();                    // 名前の前後空白除去
  const email = emailInput.value.trim();                  // メールの前後空白除去

  if (name === "" || email === "") {                      // 簡易必須チェック
    alert("名前とメールを入力してください");
    return;
  }

  if (editIndex === null) {                               // 追加モード
    if (isEmailDuplicated(email)) {                       // 重複メール判定
      alert("そのメールアドレスは既に登録されています。");
      return;
    }
    users.push({ name, email });                          // 配列に追加
  } else {                                                // 更新モード
    if (isEmailDuplicated(email, editIndex)) {            // 自分以外と重複？
      alert("そのメールアドレスは既に登録されています。");
      return;
    }
    users[editIndex] = { name, email };                   // 配列の該当行を更新
    editIndex = null;                                     // 編集モード解除
    submitBtn.textContent = "追加";                       // ボタン文言を戻す
  }

  saveToStorage();                                        // 変更を保存
  renderTable();                                          // 再描画
  form.reset();                                           // 入力欄クリア
});

// ===== 検索：入力イベントでフィルタ文字列を反映 =====
searchInput.addEventListener("input", function () {
  filterText = this.value.toLowerCase();                  // 小文字化して保持
  renderTable();                                          // 再描画
});

// ===== テーブル描画 =====
function renderTable() {
  tableBody.innerHTML = "";                               // いったん全消し

  // フィルタ適用：名前orメールに部分一致（小文字で比較）
  const filtered = users.filter((u) => {
    const nameLC = u.name.toLowerCase();
    const mailLC = u.email.toLowerCase();
    return nameLC.includes(filterText) || mailLC.includes(filterText);
  });

  // 件数表示（フィルタ後 / 全体）
  countEl.textContent = `表示 ${filtered.length} 件（全 ${users.length} 件）`;

  // 行を生成してtbodyに追加
  filtered.forEach((user, filteredIndex) => {
    const row = document.createElement("tr");             // <tr>生成

    const nameCell = document.createElement("td");        // 名前セル
    nameCell.textContent = user.name;                     // 名前を表示

    const emailCell = document.createElement("td");       // メールセル
    emailCell.textContent = user.email;                   // メールを表示

    // 操作セル（編集・削除）
    const actionCell = document.createElement("td");      // 操作セル作成

    // 編集ボタン
    const editBtn = document.createElement("button");     // ボタン作成
    editBtn.textContent = "編集";                         // 文言
    editBtn.style.marginRight = "6px";                    // 余白
    editBtn.addEventListener("click", function () {       // クリック時
      // フィルタ済み配列上のindexから、元配列usersのindexを導く
      const realIndex = users.findIndex(
        (u) => u.name === user.name && u.email === user.email
      );
      nameInput.value = user.name;                        // フォームに反映
      emailInput.value = user.email;                      // 同上
      editIndex = realIndex;                              // 編集対象のindex
      submitBtn.textContent = "更新";                     // ボタン文言変更
      nameInput.focus();                                  // フォーカス
    });

    // 削除ボタン
    const deleteBtn = document.createElement("button");   // ボタン作成
    deleteBtn.textContent = "削除";                       // 文言
    deleteBtn.style.background = "#e53935";               // 赤背景
    deleteBtn.style.color = "white";                      // 白文字
    deleteBtn.style.border = "none";                      // 枠なし
    deleteBtn.style.padding = "4px 10px";                 // 余白
    deleteBtn.style.borderRadius = "4px";                 // 角丸
    deleteBtn.style.cursor = "pointer";                   // カーソル

    deleteBtn.addEventListener("click", function () {     // クリック時
      // フィルタ済み配列から、元配列のindexを再度導く（編集と同様）
      const realIndex = users.findIndex(
        (u) => u.name === user.name && u.email === user.email
      );
      users.splice(realIndex, 1);                         // 配列から削除

      // 編集中に削除されたらモード解除
      if (editIndex === realIndex) {                      // 同じ行を編集中？
        editIndex = null;                                 // 解除
        submitBtn.textContent = "追加";                   // 文言戻す
        form.reset();                                     // クリア
      } else if (editIndex !== null && realIndex < editIndex) {
        editIndex -= 1;                                   // indexずれを補正
      }

      saveToStorage();                                    // 保存
      renderTable();                                      // 再描画
    });

    actionCell.appendChild(editBtn);                      // 操作セルに編集追加
    actionCell.appendChild(deleteBtn);                    // 同じく削除追加

    row.appendChild(nameCell);                            // 行に名前セル
    row.appendChild(emailCell);                           // 行にメールセル
    row.appendChild(actionCell);                          // 行に操作セル

    tableBody.appendChild(row);                           // tbodyに行を追加
  });
}

// ===== 初期処理：保存済みデータを読み込み → 描画 =====
loadFromStorage();                                        // localStorage読込
renderTable();                                            // 初期描画