(function(){
  'use strict';
  if(document.querySelector('[data-bv-chat-root]'))return;

  const root=document.createElement('div');
  root.className='bv-chat-root';
  root.dataset.bvChatRoot='';
  root.innerHTML=`
    <section class="bv-chat-window" id="bv-chat-window" role="dialog" aria-labelledby="bv-chat-title" aria-hidden="true">
      <header class="bv-chat-header">
        <span class="bv-chat-avatar" aria-hidden="true"><i class="fa-solid fa-sparkles"></i></span>
        <div class="bv-chat-heading">
          <strong id="bv-chat-title">Trợ lý AI BOOKVERSE</strong>
          <small><span class="bv-chat-online"></span>Online</small>
        </div>
        <div class="bv-chat-header-actions">
          <button type="button" data-chat-minimize aria-label="Thu nhỏ cửa sổ chat"><i class="fa-solid fa-minus"></i></button>
          <button type="button" data-chat-close aria-label="Đóng cửa sổ chat"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </header>
      <div class="bv-chat-messages" data-chat-messages aria-live="polite" aria-relevant="additions text"></div>
      <form class="bv-chat-form" data-chat-form>
        <label class="sr-only" for="bv-chat-input">Tin nhắn cho trợ lý AI</label>
        <textarea id="bv-chat-input" name="message" rows="1" maxlength="1200" placeholder="Hỏi về sách, tác giả, danh mục..." required></textarea>
        <button class="bv-chat-send" type="submit" aria-label="Gửi tin nhắn"><i class="fa-solid fa-paper-plane"></i></button>
      </form>
      <div class="bv-chat-disclaimer">Trợ lý AI có thể trả lời chưa chính xác. Không gửi thông tin thanh toán.</div>
    </section>
    <button class="bv-chat-toggle" type="button" aria-label="Mở trò chuyện với trợ lý AI" aria-expanded="false" aria-controls="bv-chat-window">
      <i class="fa-solid fa-comments"></i>
    </button>`;
  document.body.append(root);

  const toggle=root.querySelector('.bv-chat-toggle');
  const windowElement=root.querySelector('.bv-chat-window');
  const messagesElement=root.querySelector('[data-chat-messages]');
  const form=root.querySelector('[data-chat-form]');
  const input=root.querySelector('#bv-chat-input');
  const sendButton=root.querySelector('.bv-chat-send');
  const history=[];
  let isSending=false;

  function setOpen(open){
    root.classList.toggle('is-open',open);
    if(!open)root.classList.remove('is-minimized');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Đóng trò chuyện với trợ lý AI':'Mở trò chuyện với trợ lý AI');
    windowElement.setAttribute('aria-hidden',String(!open));
    if(open){
      root.classList.remove('is-minimized');
      input.focus();
    }else toggle.focus();
  }
  function appendMessage(text,role){
    const message=document.createElement('div');
    message.className=`bv-chat-message is-${role}`;
    message.textContent=text;
    messagesElement.append(message);
    messagesElement.scrollTop=messagesElement.scrollHeight;
    return message;
  }
  function showTyping(){
    const typing=document.createElement('div');
    typing.className='bv-chat-typing';
    typing.setAttribute('role','status');
    typing.setAttribute('aria-label','AI đang trả lời');
    typing.innerHTML='<span></span><span></span><span></span>';
    messagesElement.append(typing);
    messagesElement.scrollTop=messagesElement.scrollHeight;
    return typing;
  }
  function getCatalog(){
    if(!window.BV||typeof window.BV.getBooks!=='function')return [];
    return window.BV.getBooks().slice(0,20).map(book=>({
      title:String(book.title||'').slice(0,160),
      author:String(book.author||'').slice(0,100),
      category:String(book.category||'').slice(0,80),
      price:Number(book.price)||0,
      salePrice:Number(book.salePrice)||0,
      description:String(book.description||'').slice(0,300)
    }));
  }
  async function sendMessage(event){
    event.preventDefault();
    const text=input.value.trim();
    if(!text||isSending)return;
    appendMessage(text,'user');
    input.value='';
    input.style.height='';
    isSending=true;
    input.disabled=true;
    sendButton.disabled=true;
    const typing=showTyping();
    const controller=new AbortController();
    const timeout=window.setTimeout(()=>controller.abort(),25000);
    try{
      const response=await fetch('/api/chat',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          message:text,
          history:history.slice(-10),
          catalog:getCatalog()
        }),
        signal:controller.signal
      });
      const data=await response.json().catch(()=>({}));
      if(!response.ok||typeof data.reply!=='string')throw new Error('Chat API request failed');
      typing.remove();
      appendMessage(data.reply,'assistant');
      history.push({role:'user',content:text},{role:'model',content:data.reply});
      if(history.length>12)history.splice(0,history.length-12);
    }catch(error){
      typing.remove();
      appendMessage('Hệ thống đang bận, vui lòng thử lại sau.','assistant');
      if(error.name!=='AbortError')console.error('BOOKVERSE AI chat request failed.');
    }finally{
      window.clearTimeout(timeout);
      isSending=false;
      input.disabled=false;
      sendButton.disabled=false;
      input.focus();
    }
  }

  appendMessage('Xin chào! Mình là trợ lý AI BOOKVERSE. Bạn muốn tìm sách hoặc cần tư vấn gì?','assistant');
  toggle.addEventListener('click',()=>setOpen(!root.classList.contains('is-open')));
  root.querySelector('[data-chat-close]').addEventListener('click',()=>setOpen(false));
  root.querySelector('[data-chat-minimize]').addEventListener('click',()=>{
    root.classList.toggle('is-minimized');
    if(root.classList.contains('is-minimized'))toggle.focus();
    else input.focus();
  });
  form.addEventListener('submit',sendMessage);
  input.addEventListener('input',()=>{
    input.style.height='auto';
    input.style.height=`${Math.min(input.scrollHeight,110)}px`;
  });
  input.addEventListener('keydown',event=>{
    if(event.key==='Enter'&&!event.shiftKey){
      event.preventDefault();
      form.requestSubmit();
    }
  });
})();
