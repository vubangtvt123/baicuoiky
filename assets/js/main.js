(function(){
  'use strict';
  const BV=window.BV; if(!BV)return;
  document.documentElement.dataset.theme=BV.getSettings().theme==='dark'?'dark':'light';
  const isAdmin=location.pathname.replace(/\\/g,'/').includes('/admin/');
  const root=isAdmin?'../':'';
  function header(){
    const host=document.querySelector('[data-site-header]'); if(!host)return;
    const session=BV.getSession();
    host.innerHTML=`<a class="skip-link" href="#main-content">Bỏ qua điều hướng</a><header class="site-header"><div class="topbar">Miễn phí vận chuyển cho đơn từ 500.000đ · Đổi trả trong 7 ngày</div><nav class="container nav-wrap" aria-label="Điều hướng chính"><a class="brand" href="${root}index.html"><span class="brand-mark"><i class="fa-solid fa-book-open"></i></span><span>BOOKVERSE</span></a><ul class="nav-menu" id="main-menu"><li><a href="${root}index.html">Trang chủ</a></li><li><a href="${root}books.html">Sách</a></li><li><a href="${root}books.html#filters">Danh mục</a></li><li><a href="${root}books.html?sort=newest">Sách mới</a></li><li><a href="${root}books.html?promo=1">Khuyến mãi</a></li><li><a href="${root}about.html">Giới thiệu</a></li></ul><form class="search-form" id="global-search"><label class="sr-only" for="global-query">Tìm sách</label><input id="global-query" name="q" placeholder="Tìm tên sách, tác giả..." autocomplete="off"><button aria-label="Tìm kiếm"><i class="fa-solid fa-magnifying-glass"></i></button></form><div class="nav-actions"><button class="icon-btn" id="theme-toggle" aria-label="Đổi giao diện"><i class="fa-solid fa-moon"></i></button><a class="icon-btn" href="${root}account.html#wishlist" aria-label="Sách yêu thích"><i class="fa-regular fa-heart"></i><span class="badge-count" data-wish-count>0</span></a><a class="icon-btn" href="${root}cart.html" aria-label="Giỏ hàng"><i class="fa-solid fa-bag-shopping"></i><span class="badge-count" data-cart-count>0</span></a><a class="btn btn-primary btn-sm" href="${session?root+'account.html':root+'login.html'}"><i class="fa-${session?'solid fa-user':'regular fa-user'}"></i><span>${session?BV.escapeHTML(session.name.split(' ').slice(-1)[0]):'Đăng nhập'}</span></a><button class="icon-btn hamburger" id="menu-toggle" aria-controls="main-menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button></div></nav></header>`;
  }
  function footer(){ const host=document.querySelector('[data-site-footer]'); if(!host)return; const s=BV.getSettings(); host.innerHTML=`<footer class="site-footer"><div class="container footer-grid"><div><a class="brand" href="${root}index.html"><span class="brand-mark"><i class="fa-solid fa-book-open"></i></span><span>BOOKVERSE</span></a><p style="margin-top:1rem">Mở trang sách, mở thế giới. Không gian đọc hiện đại dành cho mọi thế hệ.</p><p><i class="fa-solid fa-location-dot"></i> ${BV.escapeHTML(s.address)}</p></div><div><h3>Khám phá</h3><ul class="footer-links"><li><a href="${root}books.html">Tất cả sách</a></li><li><a href="${root}books.html?sort=newest">Sách mới</a></li><li><a href="${root}books.html?sort=rating">Sách được yêu thích</a></li><li><a href="${root}about.html">Về chúng tôi</a></li></ul></div><div><h3>Hỗ trợ</h3><ul class="footer-links"><li><a href="${root}contact.html">Liên hệ</a></li><li><a href="${root}contact.html#shipping">Chính sách giao hàng</a></li><li><a href="${root}contact.html#returns">Đổi trả</a></li><li><a href="${root}contact.html#privacy">Bảo mật</a></li></ul></div><div><h3>Liên hệ</h3><ul class="footer-links"><li>${BV.escapeHTML(s.email)}</li><li>${BV.escapeHTML(s.phone)}</li><li>Thứ 2–7: 08:00–21:00</li></ul></div></div><div class="container footer-bottom">© 2026 BOOKVERSE · Dự án học tập front-end, không xử lý thanh toán thật.</div></footer>`; }
  function createCosmicBackground(){
    if(document.querySelector('.cosmic-particles'))return;
    const layer=document.createElement('div');
    layer.className='cosmic-particles';
    layer.setAttribute('aria-hidden','true');
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse=matchMedia('(pointer: coarse)').matches;
    const count=reduced?14:(coarse?24:42);
    const fragment=document.createDocumentFragment();
    for(let index=0;index<count;index+=1){
      const particle=document.createElement('span');
      particle.className='cosmic-particle';
      particle.style.setProperty('--particle-left',`${(Math.random()*100).toFixed(2)}%`);
      particle.style.setProperty('--particle-top',`${(Math.random()*100).toFixed(2)}%`);
      particle.style.setProperty('--particle-size',`${(1.5+Math.random()*3.6).toFixed(2)}px`);
      particle.style.setProperty('--particle-duration',`${(9+Math.random()*10).toFixed(2)}s`);
      particle.style.setProperty('--particle-delay',`-${(Math.random()*18).toFixed(2)}s`);
      particle.style.setProperty('--particle-drift',`${(-55+Math.random()*110).toFixed(1)}px`);
      particle.style.setProperty('--particle-opacity',`${(.28+Math.random()*.42).toFixed(2)}`);
      fragment.append(particle);
    }
    const starCount=reduced?5:(coarse?8:13);
    for(let index=0;index<starCount;index+=1){
      const star=document.createElement('span');
      star.className='cosmic-particle cosmic-star';
      star.style.setProperty('--particle-left',`${(Math.random()*100).toFixed(2)}%`);
      star.style.setProperty('--particle-top',`${(Math.random()*100).toFixed(2)}%`);
      star.style.setProperty('--particle-size',`${(5+Math.random()*6).toFixed(2)}px`);
      star.style.setProperty('--particle-duration',`${(12+Math.random()*12).toFixed(2)}s`);
      star.style.setProperty('--particle-delay',`-${(Math.random()*23).toFixed(2)}s`);
      star.style.setProperty('--particle-drift',`${(-75+Math.random()*150).toFixed(1)}px`);
      star.style.setProperty('--particle-opacity',`${(.42+Math.random()*.4).toFixed(2)}`);
      star.style.setProperty('--star-twinkle',`${(.85+Math.random()*1.5).toFixed(2)}s`);
      star.style.setProperty('--star-delay',`-${(Math.random()*2).toFixed(2)}s`);
      fragment.append(star);
    }
    layer.append(fragment);
    document.body.prepend(layer);
    requestAnimationFrame(()=>layer.classList.add('is-active'));
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden||reduced)return;
      layer.classList.remove('is-active');
      requestAnimationFrame(()=>requestAnimationFrame(()=>layer.classList.add('is-active')));
    });
  }
  function createWelcomePromotion(){
    const path=location.pathname.replace(/\\/g,'/');
    const page=path.split('/').pop()||'index.html';
    const storageKey='bv_welcome_promo_seen';
    if(page!=='index.html'||sessionStorage.getItem(storageKey)||document.querySelector('.welcome-promo'))return;
    const previousFocus=document.activeElement;
    const overlay=document.createElement('div');
    overlay.className='welcome-promo';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.setAttribute('aria-labelledby','welcome-promo-title');
    overlay.innerHTML=`<div class="welcome-promo-dialog animate__animated animate__zoomIn"><button class="welcome-promo-close" type="button" data-promo-close aria-label="Đóng cửa sổ khuyến mãi"><i class="fa-solid fa-xmark"></i></button><div class="welcome-promo-copy"><span class="welcome-promo-kicker"><i class="fa-solid fa-sparkles"></i> Quà chào mừng độc giả mới</span><h2 id="welcome-promo-title">Mở trang sách<br><span>nhận ngay ưu đãi 10%</span></h2><p>Khám phá những thế giới mới cùng BOOKVERSE và tiết kiệm cho đơn hàng đầu tiên từ 200.000đ.</p><button class="welcome-promo-code" type="button" data-copy-promo aria-label="Sao chép mã BOOK10"><span>Mã ưu đãi</span><strong>BOOK10</strong><i class="fa-regular fa-copy"></i></button><div class="welcome-promo-actions"><a class="btn btn-accent" href="books.html?promo=1" data-promo-cta>Khám phá ưu đãi <i class="fa-solid fa-arrow-right"></i></a><button class="welcome-promo-later" type="button" data-promo-close>Để mình xem sau</button></div><small>Áp dụng một lần cho đơn từ 200.000đ · Hạn dùng 31/12/2027</small></div><div class="welcome-promo-art" aria-hidden="true"><span class="promo-star promo-star-one">✦</span><span class="promo-star promo-star-two">✦</span><span class="promo-star promo-star-three">✦</span><div class="promo-glow"></div><div class="promo-book promo-book-back"><span>BOOKVERSE</span></div><div class="promo-book promo-book-middle"><span>MỞ TRANG SÁCH</span></div><div class="promo-book promo-book-front"><i class="fa-solid fa-book-open"></i><strong>MỞ THẾ GIỚI</strong><small>Ưu đãi dành riêng cho bạn</small></div><div class="promo-book-shadow"></div></div></div>`;
    document.body.append(overlay);
    document.body.classList.add('modal-open');
    let closed=false;
    function closePromotion(){
      if(closed)return;
      closed=true;
      sessionStorage.setItem(storageKey,'1');
      overlay.classList.remove('is-visible');
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown',handleKeyboard);
      setTimeout(()=>overlay.remove(),260);
      if(previousFocus instanceof HTMLElement)previousFocus.focus({preventScroll:true});
    }
    function handleKeyboard(event){
      if(event.key==='Escape'){closePromotion();return;}
      if(event.key!=='Tab')return;
      const controls=[...overlay.querySelectorAll('button,a[href]')].filter(element=>!element.disabled);
      if(!controls.length)return;
      const first=controls[0],last=controls[controls.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
    overlay.addEventListener('click',async event=>{
      if(event.target===overlay||event.target.closest('[data-promo-close]')){closePromotion();return;}
      if(event.target.closest('[data-promo-cta]'))sessionStorage.setItem(storageKey,'1');
      const copyButton=event.target.closest('[data-copy-promo]');
      if(!copyButton)return;
      try{
        if(navigator.clipboard)await navigator.clipboard.writeText('BOOK10');
        else throw new Error('Clipboard API unavailable');
      }catch(error){
        const input=document.createElement('textarea');input.value='BOOK10';input.setAttribute('readonly','');input.style.position='fixed';input.style.opacity='0';document.body.append(input);input.select();document.execCommand('copy');input.remove();
      }
      copyButton.classList.add('copied');
      copyButton.querySelector('span').textContent='Đã sao chép';
      copyButton.querySelector('i').className='fa-solid fa-check';
      notifyCopy();
    });
    function notifyCopy(){if(window.BVUI?.toast)window.BVUI.toast('Đã sao chép mã BOOK10.');}
    document.addEventListener('keydown',handleKeyboard);
    requestAnimationFrame(()=>{
      overlay.classList.add('is-visible');
      setTimeout(()=>overlay.querySelector('.welcome-promo-close')?.focus(),180);
    });
  }
  function updateBadges(){ const cart=BV.getCart().reduce((s,i)=>s+i.quantity,0); document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=cart); document.querySelectorAll('[data-wish-count]').forEach(e=>e.textContent=BV.getWishlist().length); }
  function toast(message,type='success'){ let stack=document.querySelector('.toast-stack'); if(!stack){stack=document.createElement('div');stack.className='toast-stack';stack.setAttribute('aria-live','polite');document.body.append(stack);} const el=document.createElement('div');el.className=`toast ${type}`;el.textContent=message;stack.append(el);setTimeout(()=>el.remove(),3200); }
  function initSectionTitleAnimations(){
    const selector='.section-head .eyebrow,.section-head h2,.page-hero .breadcrumbs,.page-hero h1,.page-hero p,.hero-copy .eyebrow,.hero-copy h1,.hero-copy p,.newsletter>.eyebrow,.newsletter h2,.section>.container>h2';
    const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealObserver='IntersectionObserver' in window
      ?new IntersectionObserver(entries=>entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }),{threshold:.15,rootMargin:'0px 0px -32px 0px'})
      :null;
    function registerTitles(root){
      if(root.nodeType!==Node.ELEMENT_NODE&&root!==document)return;
      const elements=[];
      if(root!==document&&root.matches?.(selector))elements.push(root);
      elements.push(...root.querySelectorAll(selector));
      elements.forEach(element=>{
        if(element.classList.contains('section-title-animate'))return;
        if(element.matches('.page-hero h1')&&element.textContent.trim()==='Mỗi độc giả là một vũ trụ.')element.classList.add('about-tagline');
        element.classList.add('section-title-animate');
        if(element.matches('h2'))element.classList.add('section-heading-color-flow');
        if(reducedMotion||!revealObserver)element.classList.add('is-visible');
        else revealObserver.observe(element);
      });
    }
    registerTitles(document);
    const contentObserver=new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(registerTitles)));
    contentObserver.observe(document.body,{childList:true,subtree:true});
  }
  function initHeroBookTilt(){
    const book=document.querySelector('.hero .floating-book');
    const visual=book?.closest('.hero-visual');
    if(!book||!visual||matchMedia('(pointer: coarse)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const tilt=document.createElement('div');
    tilt.className='hero-book-tilt';
    visual.insertBefore(tilt,book);
    tilt.append(book);
    let frame=0;
    let pointerX=0,pointerY=0;
    const updateTilt=()=>{
      frame=0;
      const bounds=tilt.getBoundingClientRect();
      const x=(pointerX-bounds.left)/bounds.width-.5;
      const y=(pointerY-bounds.top)/bounds.height-.5;
      const rotateX=-y*12;
      const rotateY=x*14;
      tilt.style.transform=`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      tilt.style.setProperty('--shadow-x',`${x*16}px`);
      tilt.style.setProperty('--shadow-y',`${y*16}px`);
      tilt.style.setProperty('--glow-x',`${x*24}px`);
      tilt.style.setProperty('--glow-y',`${y*24}px`);
    };
    tilt.addEventListener('mousemove',event=>{
      pointerX=event.clientX;
      pointerY=event.clientY;
      tilt.classList.add('is-tilting');
      if(!frame)frame=window.requestAnimationFrame(updateTilt);
    });
    tilt.addEventListener('mouseleave',()=>{
      if(frame)window.cancelAnimationFrame(frame);
      frame=0;
      tilt.classList.remove('is-tilting');
      tilt.style.transform='';
      tilt.style.removeProperty('--shadow-x');
      tilt.style.removeProperty('--shadow-y');
      tilt.style.removeProperty('--glow-x');
      tilt.style.removeProperty('--glow-y');
    });
  }
  function loadCustomerChat(){
    if(isAdmin||document.querySelector('[data-bv-chat-root]'))return;
    const script=document.createElement('script');
    script.src=`${root}assets/js/chat.js`;
    script.addEventListener('error',()=>console.error('Không tải được BOOKVERSE AI chat widget.'));
    document.body.append(script);
  }
  let themeTransitionTimeout;
  function setTheme(theme){
    const normalized=theme==='dark'?'dark':'light';
    const root=document.documentElement;
    const changed=root.dataset.theme!==normalized;
    if(changed&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
      root.classList.add('theme-transitioning');
      window.clearTimeout(themeTransitionTimeout);
      themeTransitionTimeout=window.setTimeout(()=>root.classList.remove('theme-transitioning'),650);
    }
    root.dataset.theme=normalized;
    const settings=BV.getSettings();
    settings.theme=normalized;
    BV.write(BV.KEYS.settings,settings);
    const icon=document.querySelector('#theme-toggle i');
    if(icon)icon.className=`fa-solid fa-${normalized==='dark'?'sun':'moon'}`;
  }
  function initInteractions(){
    setTheme(BV.getSettings().theme||'light');
    initHeroBookTilt();
    initSectionTitleAnimations();
    loadCustomerChat();
    const siteHeader=document.querySelector('.site-header');
    const updateHeaderScrollState=()=>{
      siteHeader?.classList.toggle('is-scrolled',window.scrollY>8);
    };
    updateHeaderScrollState();
    window.addEventListener('scroll',updateHeaderScrollState,{passive:true});
    const adminEntry=document.querySelector('#admin-link');
    if(adminEntry&&BV.getSession()?.role!=='admin')adminEntry.remove();
    createWelcomePromotion();
    document.querySelector('#theme-toggle')?.addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
    document.querySelector('#menu-toggle')?.addEventListener('click',e=>{const menu=document.querySelector('#main-menu');menu?.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(menu?.classList.contains('open')));});
    document.querySelector('#global-search')?.addEventListener('submit',e=>{e.preventDefault();const q=new FormData(e.currentTarget).get('q');location.href=`${root}books.html?q=${encodeURIComponent(q||'')}`;});
    document.addEventListener('click',e=>{const add=e.target.closest('[data-add-cart]');if(add){const r=BV.addToCart(add.dataset.addCart,1);toast(r.message,r.ok?'success':'error');} const wish=e.target.closest('[data-wishlist]');if(wish){const on=BV.toggleWishlist(wish.dataset.wishlist);wish.classList.toggle('active',on);const icon=wish.querySelector('i');if(icon)icon.className=`fa-${on?'solid':'regular'} fa-heart`;toast(on?'Đã thêm vào yêu thích.':'Đã bỏ khỏi yêu thích.');} const btn=e.target.closest('.btn');if(btn){const circle=document.createElement('span');const d=Math.max(btn.clientWidth,btn.clientHeight);circle.className='ripple';circle.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-btn.getBoundingClientRect().left-d/2}px;top:${e.clientY-btn.getBoundingClientRect().top-d/2}px`;btn.append(circle);setTimeout(()=>circle.remove(),600);}});
    document.addEventListener('mousemove',e=>{const card=e.target.closest('.book-card-inner');if(!card||matchMedia('(pointer:coarse)').matches)return;const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`rotateX(${-y*5}deg) rotateY(${x*7}deg) translateY(-4px)`;card.style.setProperty('--mx',`${(x+.5)*100}%`);card.style.setProperty('--my',`${(y+.5)*100}%`);});
    document.addEventListener('mouseout',e=>{const card=e.target.closest('.book-card-inner');if(card&&!card.contains(e.relatedTarget))card.style.transform='';});
    document.querySelectorAll('[data-newsletter]').forEach(form=>form.addEventListener('submit',event=>{
      event.preventDefault();
      const input=form.querySelector('input[type="email"],input');
      const submit=form.querySelector('button[type="submit"],button');
      const result=BV.addSubscriber(input?.value,location.pathname.endsWith('index.html')||location.pathname==='/'?'Trang chủ':'Website');
      toast(result.message,result.ok?'success':'error');
      if(result.ok){form.reset();if(submit){const original=submit.innerHTML;submit.disabled=true;submit.innerHTML='<i class="fa-solid fa-check"></i> Đã đăng ký';setTimeout(()=>{submit.disabled=false;submit.innerHTML=original;},1800);}}
      else input?.focus();
    }));
    document.addEventListener('bv:cart',updateBadges);document.addEventListener('bv:wishlist',updateBadges); updateBadges();
    const pending=sessionStorage.getItem('bv_message');if(pending){toast(pending,'error');sessionStorage.removeItem('bv_message');}
    if(window.AOS){
      document.documentElement.classList.add('aos-ready');
      AOS.init({duration:650,once:true,offset:70,disable:matchMedia('(prefers-reduced-motion: reduce)').matches});
      setTimeout(()=>AOS.refreshHard(),120);
    }else{
      document.documentElement.classList.add('aos-unavailable');
    }
  }
  window.BVUI={toast,updateBadges,setTheme}; createCosmicBackground();header();footer();document.readyState==='loading'?document.addEventListener('DOMContentLoaded',initInteractions):initInteractions();
})();
