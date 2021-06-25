// 共通変数
var cartBtns = document.querySelectorAll('.js_cart_btn'),//カートボタン
cartCntIcon = document.getElementById('js_cart_cnt'),//カートの個数アイコン
cartClear = document.getElementById('js_cart_clear'),//カートクリア
cartCnt = 0,//カートのアイテム数
clicked = [],//クリックされたカートアイコンのインデックス
saveItems = [],//ローカルストレージ保存用の配列
items = JSON.parse(localStorage.getItem("items"));//ローカルストレージ商品データ格納用
// モーダル画面変数
var modal = document.getElementById('modal'), // モーダル画面
closeBtn = document.getElementById('closeBtn'); // モーダル画面「買い物を続ける」

// ローカルストレージに商品が存在する場合、個数アイコンを表示
if (items) {
  var id;
  for (var i = 0; i < items.length; i++) {
    id = items[i].id;
    saveItems.push(items[i]);
    clicked.push(id);
    activateBtn(id);
  }
  // 存在しない場合、アイコンを表示しない
  if(items.length != 0){
    cartCntIcon.parentNode.classList.remove('hidden');
    cartCntIcon.innerHTML = cartCnt;
  }
}

// カートに入れる
cartBtns.forEach(function (cartBtn,index) {
  cartBtn.addEventListener('click',function () {

    var name = cartBtn.dataset.name,
    price = Number(cartBtn.dataset.price);
    var image = cartBtn.dataset.image;

    clicked.push(index);
    saveItems.push({
      id: index,
      name: name,
      price: price,
      image: image
    });

    // カートに入れた商品数をカウント
    activateBtn(index);

    // ローカルストレージに商品データを格納
    localStorage.setItem("items",JSON.stringify(saveItems));

    // モーダル
    modal.style.display = 'block';
    modal.animate([{opacity: '0'}, {opacity: '1'}], 200)
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;

    // 配列最後のアイテム情報を取得
    var lastItem = saveItems.slice(-1)[0];
    var lastName = lastItem.name;
    var lastPrice = lastItem.price;
    var lastImg = lastItem.image;
    var typeModal = 'modal';

    // モーダル画面に商品情報を表示
    addElement(lastName, lastPrice, lastImg, typeModal);
  });
});

// 要素を追加（モーダル画面とカートページに商品情報を表示）
function addElement(name, price, img, type) {
  var imgWidth = 0;
  var imgHeight = 0;
  if (type == 'modal') {
    // id属性で要素を取得
    var newElement = document.getElementById('modal-title');
    imgWidth = 300;
    imgHeight = 200;
  } else if (type == 'cart') {
    // id属性で要素を取得
    var newElement = document.getElementById('cart-title');
    imgWidth = 100;
    imgHeight = 100;

    var newElement_cart = document.createElement('div');
    newElement_cart.classList.add('cart-layout');

    newElement.after(newElement_cart);
  }
  
  // 新しいHTML要素を作成
  // 値段
  var newElement1 = document.createElement('p');
  newElement1.textContent = '¥' + price;
  newElement1.classList.add('clearItem');
  // 商品名
  var newElement2 = document.createElement('p');
  newElement2.textContent = name;
  newElement2.classList.add('clearItem');
  // 商品画像
  var newElement3 = document.createElement('img');
  newElement3.src = img;
  newElement3.width = imgWidth;
  newElement3.height = imgHeight;
  newElement3.style.objectFit = 'contain';
  newElement3.classList.add('clearItem');

  if (type == 'modal') {
    // 指定した要素の後に挿入
    newElement.after(newElement1);
    newElement.after(newElement2);
    newElement.after(newElement3);

  } else if (type == 'cart') {
    // 指定した要素の中に挿入
    newElement_cart.appendChild(newElement3);
    newElement_cart.appendChild(newElement2);
    newElement_cart.appendChild(newElement1);
  }
}

// カートに入れた商品数をカウント
function activateBtn(index) {
  cartCnt++;
  if( cartCnt >= 1 ){
    cartCntIcon.parentNode.classList.remove('hidden');
  }
  cartCntIcon.innerHTML = cartCnt;
}

// 画面縦スクロール位置を取得
window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

// カートクリア ボタン処理
cartClear.addEventListener('click',function() {
  cartCnt = 0;
  cartCntIcon.parentNode.classList.add('hidden');
  cartCntIcon.innerHTML = cartCnt;
  localStorage.removeItem("items");

  // 現在表示されている商品を削除
  removeElement();
});

// 買い物を続ける ボタン処理
closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
  const body = document.body;
  const scrollY = body.style.top;
  body.style.position = '';
  body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);

  // モーダル画面を閉じる際、現在表示されている商品を削除
  removeElement();
})

// 現在表示されている商品を削除
function removeElement() {
  const modalItem = document.querySelectorAll('.clearItem');
  for (let i = 0; i < modalItem.length; i++) {
    modalItem[i].remove();
  }
}