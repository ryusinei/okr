  var cartBtns = document.querySelectorAll('.js_cart_btn'),//カートボタン
  cartCntIcon = document.getElementById('js_cart_cnt'),//カートの個数アイコン
  cartClear = document.getElementById('js_cart_clear'),//カートクリア
  cartCnt = 0,//カートのアイテム数
  clicked = [],//クリックされたカートアイコンのインデックス
  saveItems = [],//ローカルストレージ保存用の配列
  items = JSON.parse(localStorage.getItem("items"));//ローカルストレージ商品データ格納用

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

        clicked.push(index);
        saveItems.push({
          id: index,
          name: name,
          price: price
        });

        activateBtn(index);

        // ローカルストレージに商品データを格納
        localStorage.setItem("items",JSON.stringify(saveItems));
  
      });
    });
  
    function activateBtn(index) {
      cartCnt++;
      if( cartCnt >= 1 ){
        cartCntIcon.parentNode.classList.remove('hidden');
      }
      cartCntIcon.innerHTML = cartCnt;
    }
    
    // カートクリア
    cartClear.addEventListener('click',function() {
      cartCnt = 0;
      cartCntIcon.parentNode.classList.add('hidden');
      cartCntIcon.innerHTML = cartCnt;
      localStorage.removeItem("items");
    });