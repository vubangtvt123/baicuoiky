(function(){
  'use strict'; const BV=window.BV; if(!BV)return;
  function normalizeSearchText(value){return String(value||'').trim().replace(/\s+/g,' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');}
  function card(book){ const sale=Math.round((1-book.salePrice/book.price)*100);const wished=BV.getWishlist().includes(book.id);return `<article class="book-card" data-aos="fade-up"><div class="book-card-inner"><span class="book-highlight"></span><div class="book-cover-wrap"><img class="book-cover" src="${BV.escapeHTML(book.image)}" alt="Bìa sách ${BV.escapeHTML(book.title)}" loading="lazy" onerror="this.style.background='linear-gradient(135deg,#172554,#6d28d9)';this.removeAttribute('src')"><span class="book-tag">-${sale}%</span><button class="icon-btn wish-btn ${wished?'active':''}" data-wishlist="${book.id}" aria-label="Yêu thích ${BV.escapeHTML(book.title)}"><i class="fa-${wished?'solid':'regular'} fa-heart"></i></button></div><div class="book-info"><div class="book-meta">${BV.escapeHTML(book.category)}</div><h3><a href="book-detail.html?id=${book.id}">${BV.escapeHTML(book.title)}</a></h3><div class="book-meta">${BV.escapeHTML(book.author)}</div><div class="rating"><i class="fa-solid fa-star"></i> ${book.rating} <span class="muted">· Đã bán ${book.sold}</span></div><div class="price-row"><span class="price">${BV.money(book.salePrice)}</span><span class="old-price">${BV.money(book.price)}</span></div><div class="book-actions"><button class="btn btn-primary btn-sm" data-add-cart="${book.id}"><i class="fa-solid fa-bag-shopping"></i> Thêm giỏ</button><a class="icon-btn" href="book-detail.html?id=${book.id}" aria-label="Xem chi tiết"><i class="fa-solid fa-arrow-right"></i></a></div></div></div></article>`; }
  function initListingHeroAnimations(){
    const hero=document.querySelector('.page-hero');
    if(!hero)return;
    const title=hero.querySelector('h1');
    if(!title||!title.textContent.includes('Kho sách'))return;
    const titleText=title.textContent.trim();
    const brandText='BOOKVERSE';
    const brandIndex=titleText.indexOf(brandText);
    if(brandIndex<0||title.querySelector('.page-title-highlight'))return;
    title.replaceChildren(
      document.createTextNode(titleText.slice(0,brandIndex)),
      Object.assign(document.createElement('span'),{
        className:'page-title-highlight',
        textContent:brandText
      }),
      document.createTextNode(titleText.slice(brandIndex+brandText.length))
    );
  }
  function renderHome(){ const featured=document.querySelector('#featured-books'),newBooks=document.querySelector('#new-books'),best=document.querySelector('#best-books');const all=BV.getBooks(),featuredList=all.filter(b=>b.featured),newList=all.filter(b=>b.isNew);if(featured)featured.innerHTML=(featuredList.length?featuredList:all).slice(0,8).map(card).join('');if(newBooks)newBooks.innerHTML=(newList.length?newList:[...all].sort((a,b)=>(b.year||0)-(a.year||0))).slice(0,4).map(card).join('');if(best)best.innerHTML=[...all].sort((a,b)=>(b.sold||0)-(a.sold||0)).slice(0,4).map(card).join(''); }
  function initPromoCountdown(){
    const timer=document.querySelector('[data-countdown]'),endedMessage=document.querySelector('[data-countdown-ended]');
    if(!timer||!endedMessage)return;
    const units={
      days:timer.querySelector('[data-countdown-days]'),
      hours:timer.querySelector('[data-countdown-hours]'),
      minutes:timer.querySelector('[data-countdown-minutes]'),
      seconds:timer.querySelector('[data-countdown-seconds]')
    };
    const now=new Date();
    const deadline=new Date(now.getFullYear(),now.getMonth()+1,1).getTime();
    let interval;
    function update(){
      const remaining=deadline-Date.now();
      if(remaining<=0){
        window.clearInterval(interval);
        timer.hidden=true;
        endedMessage.hidden=false;
        return;
      }
      const totalSeconds=Math.floor(remaining/1000);
      const values={
        days:Math.floor(totalSeconds/86400),
        hours:Math.floor(totalSeconds%86400/3600),
        minutes:Math.floor(totalSeconds%3600/60),
        seconds:totalSeconds%60
      };
      Object.entries(values).forEach(([unit,value])=>{
        const element=units[unit];
        const display=String(value).padStart(2,'0');
        if(element.textContent===display)return;
        element.textContent=display;
        element.classList.remove('is-changing');
        void element.offsetWidth;
        element.classList.add('is-changing');
      });
    }
    update();
    if(!timer.hidden)interval=window.setInterval(update,1000);
  }
  function initListing(){ const grid=document.querySelector('#books-grid');if(!grid)return; const form=document.querySelector('#filter-form'),sort=document.querySelector('#sort-books'),count=document.querySelector('#result-count'),load=document.querySelector('#load-more');let limit=8;const p=new URLSearchParams(location.search);if(p.get('q'))form.elements.search.value=p.get('q');if(p.get('sort'))sort.value=p.get('sort');if(p.get('promo'))form.elements.promo.checked=true;BV.getCategories().forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;form.elements.category.append(o);});
    const categoryParam=p.get('category');if(categoryParam){const slugs={'van-hoc':'Văn học','kinh-te':'Kinh tế & Kinh doanh','cong-nghe':'Công nghệ & Lập trình','ky-nang':'Kỹ năng sống','tam-ly':'Tâm lý học','thieu-nhi':'Thiếu nhi','lich-su':'Lịch sử','ngoai-ngu':'Ngoại ngữ'};form.elements.category.value=slugs[categoryParam]||categoryParam;}
    function render(){
      const fd=new FormData(form);
      const rawQuery=String(fd.get('search')||'').trim().replace(/\s+/g,' ');
      const query=normalizeSearchText(rawQuery);
      const shouldSearch=query.length>=2;
      const cat=fd.get('category');
      const min=Number(fd.get('min')||0),max=Number(fd.get('max')||Infinity);
      let list=BV.getBooks().filter(book=>{
        const title=normalizeSearchText(book.title);
        const author=normalizeSearchText(book.author);
        const matchesSearch=!shouldSearch||title.includes(query)||author.includes(query);
        return matchesSearch&&(!cat||book.category===cat)&&book.salePrice>=min&&book.salePrice<=max&&(!fd.get('promo')||book.salePrice<book.price);
      });
      const s=sort.value;
      const searchPriority=(a,b)=>{
        if(!shouldSearch)return 0;
        const titleA=normalizeSearchText(a.title).includes(query);
        const titleB=normalizeSearchText(b.title).includes(query);
        return Number(titleB)-Number(titleA);
      };
      list.sort((a,b)=>{
        if(s==='price-asc')return a.salePrice-b.salePrice||searchPriority(a,b);
        if(s==='price-desc')return b.salePrice-a.salePrice||searchPriority(a,b);
        if(s==='rating')return b.rating-a.rating||searchPriority(a,b);
        if(s==='newest')return Number(b.isNew)-Number(a.isNew)||b.year-a.year||searchPriority(a,b);
        return searchPriority(a,b);
      });
      count.textContent=`${list.length} kết quả`;
      const emptyMessage=shouldSearch
        ?`Không tìm thấy sách hoặc tác giả phù hợp với từ khóa "${BV.escapeHTML(rawQuery)}".`
        :'Chưa tìm thấy sách phù hợp. Hãy thử bộ lọc khác.';
      grid.innerHTML=list.length
        ?list.slice(0,limit).map(card).join('')
        :`<div class="empty-state"><i class="fa-regular fa-face-frown fa-2x"></i><h3>${emptyMessage}</h3></div>`;
      load.hidden=limit>=list.length;
    }
    form.addEventListener('input',()=>{limit=8;render();});sort.addEventListener('change',render);document.querySelector('#clear-filters')?.addEventListener('click',()=>{form.reset();sort.value='default';limit=8;render();});load?.addEventListener('click',()=>{limit+=8;render();});render();
  }
  function initDetail(){ const host=document.querySelector('#book-detail');if(!host)return;const id=new URLSearchParams(location.search).get('id'),b=BV.getBooks().find(x=>x.id===id);if(!b){host.innerHTML='<div class="empty-state"><h1>Không tìm thấy sách</h1><p>Mã sách không tồn tại hoặc đã được gỡ.</p><a class="btn btn-primary" href="books.html">Quay lại danh sách</a></div>';return;}document.title=`${b.title} | BOOKVERSE`;host.innerHTML=`<div class="detail-layout"><div class="detail-cover" data-aos="fade-right"><img src="${BV.escapeHTML(b.image)}" alt="Bìa sách ${BV.escapeHTML(b.title)}"></div><article data-aos="fade-left"><span class="eyebrow">${BV.escapeHTML(b.category)} · ${b.isNew?'Mới phát hành':'Được yêu thích'}</span><h1>${BV.escapeHTML(b.title)}</h1><p class="muted">Tác giả: <strong>${BV.escapeHTML(b.author)}</strong></p><div class="rating"><i class="fa-solid fa-star"></i> ${b.rating} · ${b.sold} lượt mua · <span class="status success">Còn ${b.stock} cuốn</span></div><div class="price-row"><span class="detail-price">${BV.money(b.salePrice)}</span><span class="old-price">${BV.money(b.price)}</span></div><p>${BV.escapeHTML(b.description)}</p><div class="two-col"><div class="field"><label for="detail-qty">Số lượng</label><div class="quantity-control"><button id="qty-minus" aria-label="Giảm">−</button><input id="detail-qty" type="number" min="1" max="${b.stock}" value="1"><button id="qty-plus" aria-label="Tăng">+</button></div></div></div><div class="hero-actions"><button class="btn btn-primary" id="detail-add"><i class="fa-solid fa-bag-shopping"></i> Thêm vào giỏ</button><button class="btn btn-accent" id="buy-now"><i class="fa-solid fa-bolt"></i> Mua ngay</button><button class="icon-btn" data-wishlist="${b.id}" aria-label="Yêu thích"><i class="fa-regular fa-heart"></i></button></div><div class="tabs panel"><h2>Thông tin sách</h2><div class="spec-grid"><div><small class="muted">Nhà xuất bản</small><br><strong>${BV.escapeHTML(b.publisher)}</strong></div><div><small class="muted">Năm xuất bản</small><br><strong>${b.year}</strong></div><div><small class="muted">Số trang</small><br><strong>${b.pages} trang</strong></div><div><small class="muted">Mã sách</small><br><strong>${b.id}</strong></div></div></div></article></div><section class="section"><div class="section-head"><div><span class="eyebrow">Có thể bạn thích</span><h2>Sách liên quan</h2></div></div><div class="book-grid">${BV.getBooks().filter(x=>x.category===b.category&&x.id!==b.id).slice(0,4).map(card).join('')||BV.getBooks().filter(x=>x.id!==b.id).slice(0,4).map(card).join('')}</div></section><section class="panel"><h2>Đánh giá độc giả</h2><p class="rating">★★★★★ <strong> ${b.rating}/5</strong></p><p>“Nội dung mạch lạc, bìa đẹp và đóng gói cẩn thận. Đây là đánh giá minh họa cho dự án học tập.”</p></section>`;
    const q=host.querySelector('#detail-qty');host.querySelector('#qty-minus').onclick=()=>q.value=Math.max(1,Number(q.value)-1);host.querySelector('#qty-plus').onclick=()=>q.value=Math.min(b.stock,Number(q.value)+1);function add(go){const qty=Number(q.value);if(!Number.isInteger(qty)||qty<1||qty>b.stock){BVUI.toast(`Số lượng phải từ 1 đến ${b.stock}.`,'error');return;}const r=BV.addToCart(b.id,qty);BVUI.toast(r.message,r.ok?'success':'error');if(r.ok&&go)location.href='checkout.html';}host.querySelector('#detail-add').onclick=()=>add(false);host.querySelector('#buy-now').onclick=()=>add(true);
  }
  function initCardNavigation(){
    document.addEventListener('click',event=>{
      const bookCard=event.target.closest('.book-card-inner');
      if(!bookCard||event.target.closest('a,button,input,select,textarea'))return;
      const detailLink=bookCard.querySelector('h3 a[href*="book-detail.html"]');
      if(detailLink)location.href=detailLink.href;
    });
  }
  initCardNavigation();
  function initialize(){
    renderHome();
    initPromoCountdown();
    initListingHeroAnimations();
    initListing();
    if(document.querySelector('#book-detail')){
      const script=document.createElement('script');
      script.src='assets/js/book-detail.js?v=20261024-3';
      document.body.append(script);
    }else initDetail();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',initialize):initialize();
  window.BVBooks={card};
})();
