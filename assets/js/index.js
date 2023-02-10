const out = document.querySelector(".output");
const cat = document.querySelector(".list");
const input = document.querySelector(".input");
const count = document.querySelector(".count");
let Cart = [];
const modal = document.querySelector(".modal");
const cartBtn = document.querySelector(".cart-btn");
const close = document.querySelector(".close");
const outp = document.querySelector(".suu");
const closepro = document.querySelector(".close-pro");
const listCart = document.querySelector(".list-cart");
const inputpro = document.querySelector(".input-pro");
const btnpromo = document.querySelector(".btn-promo");
const total = document.querySelector(".total");
const modalpro = document.querySelector(".modal-pro");
const btnpro = document.querySelector(".modal-promokod");
const ap = document.querySelector(".appen");
const btnBuy = document.querySelector(".buy-cart");
const con = document.querySelector(".continue");
const box = document.querySelector(".box");
const cashout = document.querySelector(".items-cash")
const tot = document.querySelector(".tot")
  let ful = false;
btnBuy.addEventListener("click", () => {
  modal.close();
  modal.classList.remove("bl");
  box.showModal();
  box.classList.add("show");
  for (let i = 0; i < Cart.length; i++) {
    cashout.innerHTML += `
    <li class='cash-ite'>
      <h3>${i + 1}</h3>
      <h3>${Cart[i].title}</h3>
      <h3>${Cart[i].price} $</h3>
      <h3>${Cart[i].count}</h3>
    </li>
    `;
  }
  let rexr = Cart.reduce((e, item) => {
    return e + item.price * item.count;
  }, 0);
  console.log(typeof rexr);
  tot.textContent = ful ? (rexr - 50).toFixed(2) : rexr.toFixed(2) + ' $';
  con.addEventListener("click", () => {
    box.classList.remove("show");
    box.close()
    Cart = [];
    count.textContent = 0;
  });
});

btnpro.addEventListener("click", () => {
  modalpro.showModal();
  modalpro.classList.add("bll");
  btnpromo.addEventListener("click", () => {
    if (inputpro.value === "SALOM") {
      if (Number(total.textContent) > 150) {
        ful = true;
        let h2 = document.createElement("h2");
        let num = Number(total.textContent);
        h2.textContent = (num - 50).toFixed(1);
        total.classList.add("dell");
        ap.innerHTML = " ";
        ap.append(h2);
        alert("Promocode used Success!");
        modalpro.close();
        modalpro.classList.remove("bll");
      } else {
        alert("Not enough total! or you already used this promocode");
        modalpro.close();
        modalpro.classList.remove("bll");
      }
    } else {
      alert("Promocode not found!");
      modalpro.close();
      modalpro.classList.remove("bll");
    }
  });
  closepro.addEventListener("click", () => {
    modalpro.close();
    modalpro.classList.remove("bll");
  });
});

cartBtn.addEventListener("click", () => {
  modal.showModal();
  modal.classList.add("bl");
  document.body.style.ovberflow = "hidden";
  renderCart();
  close.addEventListener("click", () => {
    modal.close();
    modal.classList.remove("bl");
    listCart.innerHTML = "";
  });
});

const renderCart = () => {
  listCart.innerHTML = "";
  for (let item of Cart) {
    if (item.description.length > 30) {
      item.description = item.description.slice(0, 20) + "...";
    }
    if (item.title.length > 20) {
      item.title = item.title.slice(0, 18) + "...";
    }
    let rexr = Cart.reduce((e, item) => {
      return e + item.price * item.count;
    }, 0);
    let res = rexr.toFixed(2);
    total.textContent = `${res}`;
    listCart.innerHTML += `
    <li class="item-cart">
    <h3 style='width: 200px'>${item.title}</h3>
    <h3>${item.description}</h3>
    <h3>${(item.price * item.count).toFixed(2)} $</h3>
    <div class='divsi'>
    <button onclick='RemoveItem(${item.id})' class='minus'>-</button>
    <h3>${item.count}</h3>
    <button onclick='AddItem(${item.id})' class='plus'>+</button>
        </div>
        <button onclick='DeleteItem(${item.id})' class='delete'>delete</button>
        </li>
        `;
  }
};

const DeleteItem = (id) => {
  Cart = Cart.filter((item) => item.id !== id);
  count.textContent = Number(count.textContent) - 1;
  renderCart();
};

const AddItem = (id) => {
  for (let item of Cart) {
    if (item.id === id) {
      if (item.count >= 0) {
        item.count = item.count + 1;
        renderCart();
      }
    }
  }
};

const RemoveItem = (id) => {
  for (let item of Cart) {
    if (item.id === id) {
      if (item.count > 1) {
        item.count = item.count - 1;
        renderCart();
      }
    }
  }
};

const Add = (e) => {
  out.addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON") {
      addToCart(e.target.attributes.id.value);
    }
  });
};
const addToCart = async (id) => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  for (let item of data) {
    if (item.id == id) {
      let product = Cart.find((item) => item.id == id);
      if (!product) {
        Cart.push({ ...item, count: 1 });
        count.textContent = Number(count.textContent) + 1;
      } else {
        for (let pro of Cart) {
          if (pro.id == item.id) {
            pro.count = pro.count + 1;
            console.log(pro.count);
          }
        }
      }
    }
  }
};

const renderCat = () => {
  cat.addEventListener("click", (e) => {
    if (e.target.textContent == "All") {
      All();
    } else {
      renderC(e.target.textContent);
    }
  });
};

const Search = () => {
  input.addEventListener("keyup", () => {
    if (input.value != "") {
      search(input.value);
    } else {
      data();
    }
  });
};

Search();

const renderC = async (cat) => {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${cat}`
  );
  const data = await response.json();
  out.innerHTML = "";
  for (let item of data) {
    if (item.title.length > 20) {
      item.title = item.title.slice(0, 18) + "...";
    }
    out.innerHTML += `<li class='product'><img src='${item.image}' width='257px' height='300px'/><h3 class='title'>${item.title}</h3><div class='prices'>
      <h3 class='price'>${item.price} $</h3>
      <button class='btn-buy' id='${item.id}'>Buy</button>
      </div></li>`;
  }
};

const data = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  const date = data.slice(0, 8);
  out.innerHTML = "";
  for (let item of date) {
    if (item.title.length > 20) {
      item.title = item.title.slice(0, 23) + "...";
    }
    out.innerHTML += `<li class='product'><img src='${item.image}' width='257px' height='300px'/><h3 class='title'>${item.title}</h3><div class='prices'>
      <h3 class='price'>${item.price} $</h3>
      <button class='btn-buy' id='${item.id}'>Buy</button>
      </div></li>`;
  }
  renderCat();
  Add();
};

const search = async (value) => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  out.innerHTML = "";
  const newData = data.filter((item) => {
    const text = item.title.toLowerCase();
    const arr = text.split("");
    const la = arr.splice(0, value.length);
    return value == la.join("");
  });
  for (let item of newData) {
    if (item.title.length > 20) {
      item.title = item.title.slice(0, 23) + "...";
    }
    out.innerHTML += `<li class='product'><img src='${item.image}' width='257px' height='300px'/><h3 class='title'>${item.title}</h3><div class='prices'>
    <h3 class='price'>${item.price} $</h3>
    <button class='btn-buy' id='${item.id}'>Buy</button>
    </div></li>`;
  }
};
const All = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  const date = data.slice(0, 8);
  out.innerHTML = "";
  for (let item of data) {
    if (item.title.length > 20) {
      item.title = item.title.slice(0, 23) + "...";
    }
    out.innerHTML += `<li class='product'><img src='${item.image}' width='257px' height='300px'/><h3 class='title'>${item.title}</h3><div class='prices'>
    <h3 class='price'>${item.price} $</h3>
    <button class='btn-buy' id='${item.id}'>Buy</button>
    </div></li>`;
  }
  renderCat();
};
data();

const renCat = async () => {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const data = await response.json();
  cat.innerHTML += `<li class="item" name='all'>All</li>`;
  for (let item of data) {
    cat.innerHTML += `<li class="item" name='${item}'>${item}</li>`;
  }
};

renCat();
