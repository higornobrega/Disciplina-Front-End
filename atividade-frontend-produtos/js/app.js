const CATALOGO = [
  {id:1, nome:"Fone Wireless", preco:149.9, marca:"SoundX", cor:"Preto", modelo:"SX-100", foto:"https://cdn.pixabay.com/photo/2018/09/17/14/27/headphones-3683983_1280.jpg", avaliacao:4.5},
  {id:2, nome:"Teclado Mecânico", preco:299.9, marca:"KeyPro", cor:"Preto", modelo:"KP-87", foto:"https://cdn.pixabay.com/photo/2022/01/30/17/15/keyboard-6981763_1280.jpg", avaliacao:4.7},
  {id:3, nome:"Mouse Gamer", preco:129.9, marca:"Speedy", cor:"Preto", modelo:"SP-M1", foto:"https://cdn.pixabay.com/photo/2021/04/07/16/13/gaming-mouse-6159550_1280.jpg", avaliacao:4.4},
  {id:4, nome:"Monitor 24", preco:899.0, marca:"ViewMax", cor:"Preto", modelo:"VM-24FHD", foto:"https://cdn.pixabay.com/photo/2014/10/01/09/08/monitor-468148_1280.jpg", avaliacao:4.6},
  {id:5, nome:"Cadeira Office", preco:699.0, marca:"Comfort", cor:"Amadeirada", modelo:"CF-300", foto:"https://cdn.pixabay.com/photo/2017/05/17/04/55/chair-2319866_1280.png", avaliacao:4.2},
  {id:6, nome:"Notebook 14", preco:3299.0, marca:"NoteX", cor:"Cinza", modelo:"NX-14", foto:"https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_1280.jpg", avaliacao:4.3},
  {id:7, nome:"Webcam HD", preco:179.9, marca:"CamGo", cor:"Preto", modelo:"CG-720p", foto:"https://cdn.pixabay.com/photo/2016/02/24/12/30/camera-1219748_1280.jpg", avaliacao:4.1},
  {id:8, nome:"Microfone USB", preco:249.9, marca:"MicPro", cor:"Preto", modelo:"MPU-1", foto:"https://cdn.pixabay.com/photo/2023/01/25/19/51/podcast-7744468_1280.jpg", avaliacao:4.4},
  {id:9, nome:"SSD 1TB", preco:399.9, marca:"FlashIt", cor:"Preto", modelo:"FI-1T", foto:"https://cdn.pixabay.com/photo/2014/04/09/08/16/data-storage-319844_1280.jpg", avaliacao:4.8},
  {id:10, nome:"Hub USB-C", preco:159.9, marca:"Hubster", cor:"Cinza", modelo:"HB-7", foto:"https://cdn.pixabay.com/photo/2017/05/19/21/04/usb-2327518_1280.jpg", avaliacao:4.0},
  {id:11, nome:"Carregador 65W", preco:199.9, marca:"ChargeUp", cor:"Branco", modelo:"CU-65", foto:"https://cdn.pixabay.com/photo/2020/05/03/00/47/charger-5123473_1280.jpg", avaliacao:4.3}
];

const STORAGE_KEYS = {
  CART: 'lojaex_cart',
  CHECKOUT: 'lojaex_checkout'
};

function formatBRL(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getCart() {
  const raw = localStorage.getItem(STORAGE_KEYS.CART);
  return raw ? JSON.parse(raw) : [];
}

function setCart(items) {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
  atualizarBadgeCarrinho();
}

function atualizarBadgeCarrinho() {
  const cart = getCart();
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = cart.reduce((acc, it) => acc + it.qtd, 0);
}

function addToCart(prodId, qtd) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === prodId);
  if (idx >= 0) cart[idx].qtd += qtd;
  else cart.push({ id: prodId, qtd });
  setCart(cart);
}

function renderStars(n) {
  const full = Math.floor(n);
  const half = n - full >= 0.5;
  let s = '';
  for (let i=0;i<full;i++) s += '★';
  if (half) s += '☆';
  while (s.length < 5) s += '☆';
  return s;
}

function renderListaProdutos() {
  atualizarBadgeCarrinho();
  const container = document.getElementById('listaProdutos');
  if (!container) return;
  container.innerHTML = '';
  CATALOGO.forEach(prod => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4';
    col.innerHTML = `
      <div class="card h-100 product-card">
        <img src="${prod.foto}" class="card-img-top" alt="${prod.nome}">
        <div class="card-body d-flex flex-column">
          <h2 class="h6">${prod.nome}</h2>
          <div class="mb-1"><span class="badge bg-success badge-price">${formatBRL(prod.preco)}</span></div>
          <p class="text-muted small mb-1"><strong>Modelo:</strong> ${prod.modelo}</p>
          <p class="text-muted small mb-1"><strong>Marca:</strong> ${prod.marca}</p>
          <p class="text-muted small mb-2"><strong>Cor:</strong> ${prod.cor}</p>
          <div class="rating mb-2" aria-label="Avaliação: ${prod.avaliacao} de 5">${renderStars(prod.avaliacao)}</div>
          <div class="d-flex align-items-center gap-2 mt-auto">
            <label for="qtd-${prod.id}" class="form-label m-0 me-1 small">Qtd</label>
            <input id="qtd-${prod.id}" type="number" class="form-control form-control-sm" style="width:90px" value="1" min="1">
            <button class="btn btn-sm btn-outline-primary ms-auto" data-id="${prod.id}">Adicionar</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });

  container.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.getAttribute('data-id'));
      const qtd = Math.max(1, Number(document.getElementById(`qtd-${id}`).value || 1));
      addToCart(id, qtd);
    });
  });
}

function renderResumoCompra() {
  const ul = document.getElementById('resumoLista');
  const totalEl = document.getElementById('resumoTotal');
  if (!ul || !totalEl) return;

  const cart = getCart();
  ul.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = 'Nenhum produto no carrinho. Volte e selecione os itens.';
    ul.appendChild(li);
  } else {
    cart.forEach(item => {
      const prod = CATALOGO.find(p => p.id === item.id);
      if (!prod) return;
      const subtotal = prod.preco * item.qtd;
      total += subtotal;
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <div>
          <div class="fw-semibold">${prod.nome}</div>
          <div class="text-muted small">${item.qtd} × ${formatBRL(prod.preco)}</div>
        </div>
        <div class="fw-semibold">${formatBRL(subtotal)}</div>
      `;
      ul.appendChild(li);
    });
  }
  totalEl.textContent = formatBRL(total);

  const checkout = {
    itens: cart.map(it => {
      const p = CATALOGO.find(pp => pp.id === it.id);
      return { id: it.id, nome: p?.nome, preco: p?.preco, qtd: it.qtd };
    }),
    total
  };
  localStorage.setItem(STORAGE_KEYS.CHECKOUT, JSON.stringify(checkout));
}

function renderTelaSucesso() {
  const cont = document.getElementById('detalhesPedido');
  if (!cont) return;
  const checkoutRaw = localStorage.getItem(STORAGE_KEYS.CHECKOUT);
  const checkout = checkoutRaw ? JSON.parse(checkoutRaw) : { itens: [], total: 0 };

  const forma = (localStorage.getItem('forma_pagamento') || 'Cartão • Visa').toString();

  const listaItens = checkout.itens.map(i => `
    <tr>
      <td>${i.nome}</td>
      <td class="text-center">${i.qtd}</td>
      <td class="text-end">${formatBRL(i.preco)}</td>
      <td class="text-end">${formatBRL((i.preco || 0) * i.qtd)}</td>
    </tr>
  `).join('');

  cont.innerHTML = `
    <div class="table-responsive mb-3">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Produto</th>
            <th class="text-center">Qtd</th>
            <th class="text-end">Preço</th>
            <th class="text-end">Subtotal</th>
          </tr>
        </thead>
        <tbody>${listaItens || '<tr><td colspan="4" class="text-center text-muted">Nenhum item selecionado</td></tr>'}</tbody>
        <tfoot>
          <tr>
            <th colspan="3" class="text-end">Total</th>
            <th class="text-end">${formatBRL(checkout.total || 0)}</th>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="row g-3">
      <div class="col-md-6">
        <div class="p-3 bg-white border rounded-3 h-100">
          <h2 class="h6">Forma de pagamento</h2>
          <p class="m-0">${forma}</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="p-3 bg-white border rounded-3 h-100">
          <h2 class="h6">Mensagem</h2>
          <p class="m-0">Sua compra foi concluída com sucesso! Obrigado por escolher a Loja TecDev.</p>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener('change', (e) => {
  if (e.target && e.target.id === 'bandeira') {
    localStorage.setItem('forma_pagamento', 'Cartão • ' + e.target.value);
  }
});
