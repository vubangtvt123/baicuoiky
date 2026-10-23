(function(){
  'use strict';
  document.querySelector('#admin-menu-toggle')?.addEventListener('click',()=>document.querySelector('.admin-sidebar')?.classList.toggle('open'));
  document.addEventListener('click',e=>{if(innerWidth<=650&&e.target.closest('.admin-menu a'))document.querySelector('.admin-sidebar')?.classList.remove('open');});

  function initNewsletterPanel(){
    const BV=window.BV;
    const content=document.querySelector('#admin-page-content');
    if(!BV||document.body.dataset.adminPage!=='customers'||!content)return;
    const panel=document.createElement('section');
    panel.className='panel newsletter-admin-panel';
    panel.innerHTML=`<div class="newsletter-admin-head"><div><span class="eyebrow">BOOKVERSE Letter</span><h2>Đăng ký nhận tin</h2><p class="muted">Email được gửi từ biểu mẫu nhận tin trên website.</p></div><span class="newsletter-total" id="newsletter-total">0 email</span></div><div class="admin-toolbar"><label class="newsletter-search"><span class="sr-only">Tìm email đăng ký</span><i class="fa-solid fa-magnifying-glass"></i><input id="newsletter-search" type="search" placeholder="Tìm email đăng ký..."></label></div><div id="newsletter-table"></div>`;
    content.append(panel);
    const search=panel.querySelector('#newsletter-search');
    const table=panel.querySelector('#newsletter-table');
    const total=panel.querySelector('#newsletter-total');

    function render(){
      const query=search.value.trim().toLowerCase();
      const subscribers=BV.getSubscribers();
      const filtered=subscribers.filter(item=>!query||String(item.email).toLowerCase().includes(query));
      total.textContent=`${subscribers.length} email`;
      table.innerHTML=filtered.length?`<div class="table-wrap"><table><thead><tr><th>Email</th><th>Nguồn</th><th>Ngày đăng ký</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>${filtered.map(item=>{
        const date=new Date(item.subscribedAt);
        const formatted=Number.isNaN(date.getTime())?'—':date.toLocaleString('vi-VN');
        return `<tr><td><strong>${BV.escapeHTML(item.email)}</strong><br><small class="muted">${BV.escapeHTML(item.id)}</small></td><td>${BV.escapeHTML(item.source||'Website')}</td><td>${formatted}</td><td><span class="status success">${BV.escapeHTML(item.status||'Đang nhận tin')}</span></td><td><button class="icon-btn" type="button" data-delete-subscriber="${BV.escapeHTML(item.id)}" aria-label="Xóa email ${BV.escapeHTML(item.email)}"><i class="fa-solid fa-trash"></i></button></td></tr>`;
      }).join('')}</tbody></table></div>`:'<div class="empty-state"><i class="fa-regular fa-envelope-open fa-2x"></i><h3>Chưa có email đăng ký</h3><p>Khi khách nhập email trên trang chủ, dữ liệu sẽ xuất hiện tại đây.</p></div>';
    }

    search.addEventListener('input',render);
    table.addEventListener('click',event=>{
      const button=event.target.closest('[data-delete-subscriber]');
      if(!button)return;
      const subscriber=BV.getSubscribers().find(item=>item.id===button.dataset.deleteSubscriber);
      if(!subscriber||!confirm(`Xóa email “${subscriber.email}” khỏi danh sách nhận tin?`))return;
      BV.write(BV.KEYS.subscribers,BV.getSubscribers().filter(item=>item.id!==subscriber.id));
      window.BVUI?.toast('Đã xóa email khỏi danh sách nhận tin.');
      render();
    });
    render();
  }

  initNewsletterPanel();
})();
