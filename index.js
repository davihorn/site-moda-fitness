  const produtos=[
    {id:1,nome:"Legging Performance",price:129.90,img:"https://source.unsplash.com/400x400/?fitness,leggings"},
    {id:2,nome:"Top Esportivo",price:79.90,img:"https://source.unsplash.com/400x400/?fitness,top"},
    {id:3,nome:"Short Fitness",price:99.90,img:"https://source.unsplash.com/400x400/?fitness,shorts"},
    {id:4,nome:"Camiseta Dry",price:69.90,img:"https://source.unsplash.com/400x400/?fitness,tshirt"},
    {id:5,nome:"Jaqueta Corta Vento",price:199.90,img:"https://source.unsplash.com/400x400/?fitness,jacket"},
    {id:6,nome:"Tênis Training",price:299.90,img:"https://source.unsplash.com/400x400/?fitness,sneakers"},
    {id:7,nome:"Macacão Fitness",price:159.90,img:"https://source.unsplash.com/400x400/?fitness,overall"},
    {id:8,nome:"Regata Esportiva",price:59.90,img:"https://source.unsplash.com/400x400/?fitness,regata"}
  ];

  let cart=[];

  function formatPrice(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});}

  function renderProducts(list){
    const grid=document.getElementById('produtosGrid');
    grid.innerHTML='';
    list.forEach(p=>{
      const card=document.createElement('div');
      card.className='produto';
      card.innerHTML=`
        <img src="${p.img}" alt="${p.nome}">
        <h3>${p.nome}</h3>
        <p>Peça confortável e estilosa para seus treinos.</p>
        <span>${formatPrice(p.price)}</span>
        <button class="btn" onclick="addToCart(${p.id})">Adicionar</button>
      `;
      grid.appendChild(card);
    });
  }

  function updateCartUI(){
    const cartCount=document.getElementById('cartCount');
    const cartItems=document.getElementById('cartItems');
    const cartTotal=document.getElementById('cartTotal');
    cartCount.textContent=cart.reduce((s,i)=>s+i.qty,0);
    cartItems.innerHTML='';
    let total=0;
    cart.forEach(item=>{
      const prod=produtos.find(p=>p.id===item.id);
      if(prod){
        total+=prod.price*item.qty;
        const div=document.createElement('div');
        div.style.marginBottom='10px';
        div.innerHTML=`${item.qty}x ${prod.nome} - ${formatPrice(prod.price*item.qty)}
        <button onclick="removeFromCart(${item.id})">x</button>`;
        cartItems.appendChild(div);
      }
    });
    cartTotal.textContent=formatPrice(total);
  }

  function addToCart(id){
    const item=cart.find(i=>i.id===id);
    if(item) item.qty++;
    else cart.push({id,qty:1});
    updateCartUI();
  }

  function removeFromCart(id){
    cart=cart.filter(i=>i.id!==id);
    updateCartUI();
  }

  function clearCart(){
    cart=[];
    updateCartUI();
  }

  // eventos do carrinho
  document.getElementById('cartBtn').addEventListener('click',()=>document.getElementById('cartDrawer').classList.toggle('open'));
  document.getElementById('closeCart').addEventListener('click',()=>document.getElementById('cartDrawer').classList.remove('open'));
  document.getElementById('clearCart').addEventListener('click',clearCart);
  document.getElementById('checkout').addEventListener('click',()=>alert('Compra finalizada com sucesso!'));

  // filtros
  document.getElementById('busca').addEventListener('input',e=>{
    const termo=e.target.value.toLowerCase();
    const filtrados=produtos.filter(p=>p.nome.toLowerCase().includes(termo));
    renderProducts(filtrados);
  });

  document.getElementById('ordenar').addEventListener('change',e=>{
    const val=e.target.value;
    let lista=[...produtos];
    if(val==='asc') lista.sort((a,b)=>a.price-b.price);
    if(val==='desc') lista.sort((a,b)=>b.price-a.price);
    renderProducts(lista);
  });

  // contato
  document.getElementById('contactForm').addEventListener('submit',e=>{
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
    e.target.reset();
  });

  // inicializa
  renderProducts(produtos);
