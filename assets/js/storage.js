(function () {
  'use strict';
  const KEYS = { books:'bv_books', catalogVersion:'bv_catalog_version', categories:'bv_categories', users:'bv_users', session:'bv_session', cart:'bv_cart', wishlist:'bv_wishlist', orders:'bv_orders', promotions:'bv_promotions', settings:'bv_settings', subscribers:'bv_newsletter_subscribers', comments:'bv_book_comments' };
  const CATALOG_VERSION = '2026.10.24-2';
  const memoryStorage = new Map();
  const categories = ['Văn học','Kinh tế & Kinh doanh','Công nghệ & Lập trình','Kỹ năng sống','Tâm lý học','Thiếu nhi','Lịch sử','Ngoại ngữ'];
  const books = [
    {id:'BV001',title:'Dòng Sông Ký Ức',author:'Nguyễn An Nhiên',category:'Văn học',price:189000,salePrice:139000,description:'Một hành trình trở về miền ký ức, nơi những lựa chọn cũ soi sáng con đường hiện tại.',image:'assets/images/books/book-01.png',rating:4.9,stock:28,featured:true,isNew:false,sold:872,pages:328,publisher:'NXB Hội Nhà Văn',year:2025},
    {id:'BV002',title:'Chiến Lược Tăng Trưởng Tinh Gọn',author:'Trần Minh Khôi',category:'Kinh tế & Kinh doanh',price:229000,salePrice:179000,description:'Khung tư duy thực tiễn giúp doanh nghiệp nhỏ thử nghiệm nhanh, đo lường đúng và tăng trưởng bền vững.',image:'assets/images/books/book-02.png',rating:4.8,stock:19,featured:true,isNew:true,sold:641,pages:296,publisher:'NXB Công Thương',year:2026},
    {id:'BV003',title:'JavaScript Từ Cốt Lõi Đến Ứng Dụng',author:'Lê Quốc Bảo',category:'Công nghệ & Lập trình',price:319000,salePrice:259000,description:'Nắm chắc JavaScript hiện đại qua ví dụ rõ ràng, dự án thực tế và những nguyên tắc viết mã dễ bảo trì.',image:'assets/images/books/book-03.png',rating:4.9,stock:34,featured:true,isNew:true,sold:1105,pages:512,publisher:'NXB Thông Tin & Truyền Thông',year:2026},
    {id:'BV004',title:'Sống Sâu Giữa Thế Giới Vội',author:'Mai Thanh Hà',category:'Kỹ năng sống',price:169000,salePrice:129000,description:'Những thực hành nhỏ giúp tìm lại sự tập trung, bình tĩnh và ý nghĩa trong nhịp sống hiện đại.',image:'assets/images/books/book-04.png',rating:4.7,stock:42,featured:true,isNew:false,sold:1594,pages:240,publisher:'NXB Trẻ',year:2025},
    {id:'BV005',title:'Bản Đồ Cảm Xúc',author:'TS. Phạm Ngọc Linh',category:'Tâm lý học',price:219000,salePrice:169000,description:'Hiểu cơ chế hình thành cảm xúc và học cách phản hồi lành mạnh trong các mối quan hệ.',image:'assets/images/books/book-05.png',rating:4.8,stock:16,featured:true,isNew:false,sold:923,pages:304,publisher:'NXB Dân Trí',year:2025},
    {id:'BV006',title:'Thư Viện Trên Mây',author:'Hoàng Anh Thư',category:'Thiếu nhi',price:149000,salePrice:119000,description:'Cuộc phiêu lưu ấm áp của nhóm bạn nhỏ đi tìm thư viện bí mật giữa những tầng mây.',image:'assets/images/books/book-06.png',rating:4.9,stock:50,featured:true,isNew:true,sold:722,pages:96,publisher:'NXB Kim Đồng',year:2026},
    {id:'BV007',title:'Dấu Chân Thành Cổ',author:'Vũ Hải Đăng',category:'Lịch sử',price:259000,salePrice:209000,description:'Những câu chuyện lịch sử Việt Nam được kể lại qua di sản, bản đồ và ký ức của nhiều thế hệ.',image:'assets/images/books/book-07.png',rating:4.6,stock:12,featured:false,isNew:true,sold:348,pages:384,publisher:'NXB Tổng Hợp TP.HCM',year:2026},
    {id:'BV008',title:'English In Everyday Moments',author:'Emily Trần',category:'Ngoại ngữ',price:199000,salePrice:159000,description:'Học tiếng Anh qua những tình huống thường ngày, hội thoại tự nhiên và bài luyện nghe thực tế.',image:'assets/images/books/book-08.png',rating:4.7,stock:31,featured:false,isNew:true,sold:565,pages:272,publisher:'NXB Đại Học Quốc Gia',year:2026},
    {id:'BV009',title:'Vũ Trụ Trong Một Chiếc Lá',author:'Đỗ Nhật Nam',category:'Kỹ năng sống',price:209000,salePrice:169000,description:'Những khám phá khoa học gần gũi giúp ta nhìn thiên nhiên bằng sự tò mò và trân trọng.',image:'assets/images/books/book-09.png',rating:4.6,stock:22,featured:false,isNew:false,sold:401,pages:288,publisher:'NXB Khoa Học',year:2025},
    {id:'BV010',title:'Tài Chính Cho Người Bắt Đầu',author:'Phan Đức Tài',category:'Kinh tế & Kinh doanh',price:239000,salePrice:189000,description:'Lộ trình dễ hiểu để lập ngân sách, xây quỹ dự phòng và đầu tư có kỷ luật.',image:'assets/images/books/book-10.png',rating:4.8,stock:25,featured:true,isNew:false,sold:1320,pages:320,publisher:'NXB Lao Động',year:2025},
    {id:'BV011',title:'Cánh Cửa Trong Mưa',author:'Bùi Lam Giang',category:'Văn học',price:179000,salePrice:145000,description:'Tiểu thuyết trinh thám tâm lý về một bí mật cũ trở lại cùng cơn mưa cuối mùa.',image:'assets/images/books/book-11.png',rating:4.7,stock:8,featured:true,isNew:true,sold:689,pages:356,publisher:'NXB Văn Học',year:2026},
    {id:'BV012',title:'Bếp Việt Bốn Mùa',author:'Lâm Ngọc Diệp',category:'Kỹ năng sống',price:289000,salePrice:239000,description:'Chuyện kể văn hóa và 60 công thức món Việt theo mùa, phù hợp căn bếp gia đình hiện đại.',image:'assets/images/books/book-12.png',rating:4.9,stock:14,featured:true,isNew:true,sold:512,pages:248,publisher:'NXB Phụ Nữ Việt Nam',year:2026}
  ];
  const users = [
    {id:'U001',name:'Khách hàng Demo',email:'customer@bookverse.demo',password:'Book123!',role:'customer',phone:'0901234567',address:'12 Nguyễn Huệ, Quận 1, TP.HCM',createdAt:'2026-01-15'},
    {id:'U002',name:'Quản trị BOOKVERSE',email:'admin@bookverse.demo',password:'Admin123!',role:'admin',phone:'028 3822 5678',address:'BOOKVERSE Office, TP.HCM',createdAt:'2026-01-01'}
  ];
  const orders = [
    {id:'BV20261001',userId:'U001',customer:{name:'Khách hàng Demo',email:'customer@bookverse.demo',phone:'0901234567',address:'12 Nguyễn Huệ, Quận 1, TP.HCM'},items:[{bookId:'BV003',title:'JavaScript Từ Cốt Lõi Đến Ứng Dụng',price:259000,quantity:1,image:'assets/images/books/book-03.png'}],subtotal:259000,shipping:30000,discount:0,total:289000,payment:'COD',status:'Hoàn thành',createdAt:'2026-08-12T09:30:00.000Z',history:[{status:'Chờ xác nhận',at:'2026-08-12T09:30:00.000Z'},{status:'Hoàn thành',at:'2026-08-15T10:00:00.000Z'}]},
    {id:'BV20261002',userId:'U001',customer:{name:'Khách hàng Demo',email:'customer@bookverse.demo',phone:'0901234567',address:'12 Nguyễn Huệ, Quận 1, TP.HCM'},items:[{bookId:'BV004',title:'Sống Sâu Giữa Thế Giới Vội',price:129000,quantity:2,image:'assets/images/books/book-04.png'}],subtotal:258000,shipping:30000,discount:30000,total:258000,payment:'COD',status:'Đang giao',createdAt:'2026-10-18T04:20:00.000Z',history:[{status:'Chờ xác nhận',at:'2026-10-18T04:20:00.000Z'},{status:'Đang xử lý',at:'2026-10-19T08:00:00.000Z'},{status:'Đang giao',at:'2026-10-21T02:00:00.000Z'}]}
  ];
  const promotions = [
    {id:'P001',code:'BOOK10',type:'percent',value:10,minOrder:200000,expires:'2027-12-31',active:true},
    {id:'P002',code:'FREESHIP',type:'fixed',value:30000,minOrder:350000,expires:'2027-12-31',active:true}
  ];
  const defaults = { storeName:'BOOKVERSE',email:'hello@bookverse.vn',phone:'028 3822 5678',address:'12 Nguyễn Huệ, Quận 1, TP.HCM',shippingFee:30000,theme:'light' };
  function getItem(key){ try { return localStorage.getItem(key); } catch(e){ return memoryStorage.has(key)?memoryStorage.get(key):null; } }
  function setItem(key,value){ try { localStorage.setItem(key,value); } catch(e){ memoryStorage.set(key,String(value)); } }
  function removeItem(key){ try { localStorage.removeItem(key); } catch(e){ memoryStorage.delete(key); } }
  function read(key,fallback=[]){ try { const v=getItem(key); return v?JSON.parse(v):fallback; } catch(e){ console.warn('Dữ liệu lỗi:',key); return fallback; } }
  function write(key,value){ setItem(key,JSON.stringify(value)); return value; }
  function seedDefaultBooks(){
    const raw=getItem(KEYS.books);
    const stored=read(KEYS.books,[]);
    const current=Array.isArray(stored)?stored:[];
    const needsSeed=!raw||current.length===0||getItem(KEYS.catalogVersion)!==CATALOG_VERSION;
    if(!needsSeed)return;

    const existingIds=new Set(current.map(book=>book&&book.id).filter(Boolean));
    const merged=[...current,...books.filter(book=>!existingIds.has(book.id)).map(book=>({...book}))];
    write(KEYS.books,merged);
    setItem(KEYS.catalogVersion,CATALOG_VERSION);
  }
  function init(){ seedDefaultBooks(); if(!getItem(KEYS.categories))write(KEYS.categories,categories); if(!getItem(KEYS.users))write(KEYS.users,users); if(!getItem(KEYS.orders))write(KEYS.orders,orders); if(!getItem(KEYS.promotions))write(KEYS.promotions,promotions); if(!getItem(KEYS.settings))write(KEYS.settings,defaults); if(!getItem(KEYS.cart))write(KEYS.cart,[]); if(!getItem(KEYS.wishlist))write(KEYS.wishlist,[]); if(!getItem(KEYS.subscribers))write(KEYS.subscribers,[]); if(!getItem(KEYS.comments))write(KEYS.comments,[]); }
  const getBooks=()=>read(KEYS.books,books); const getUsers=()=>read(KEYS.users,users); const getOrders=()=>read(KEYS.orders,orders); const getCart=()=>read(KEYS.cart,[]); const getWishlist=()=>read(KEYS.wishlist,[]); const getPromotions=()=>read(KEYS.promotions,promotions); const getCategories=()=>read(KEYS.categories,categories); const getSettings=()=>read(KEYS.settings,defaults); const getSession=()=>read(KEYS.session,null); const getSubscribers=()=>read(KEYS.subscribers,[]); const getComments=bookId=>{const list=read(KEYS.comments,[]);return bookId?list.filter(item=>item.bookId===bookId):list;};
  function money(v){ return new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(Number(v)||0); }
  function escapeHTML(value=''){ return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c])); }
  function addToCart(bookId,qty=1){ const book=getBooks().find(b=>b.id===bookId); if(!book) return {ok:false,message:'Không tìm thấy sách.'}; const cart=getCart(); const item=cart.find(i=>i.bookId===bookId); const next=(item?.quantity||0)+Number(qty); if(next<1||next>book.stock)return {ok:false,message:`Chỉ còn ${book.stock} cuốn trong kho.`}; item?item.quantity=next:cart.push({bookId,quantity:Number(qty)}); write(KEYS.cart,cart); document.dispatchEvent(new CustomEvent('bv:cart')); return {ok:true,message:'Đã thêm vào giỏ hàng.'}; }
  function toggleWishlist(id){ const list=getWishlist(); const i=list.indexOf(id); i>=0?list.splice(i,1):list.push(id); write(KEYS.wishlist,list); document.dispatchEvent(new CustomEvent('bv:wishlist')); return i<0; }
  function addSubscriber(email,source='Website'){
    const normalized=String(email||'').trim().toLowerCase();
    if(!/^\S+@\S+\.\S+$/.test(normalized))return{ok:false,message:'Vui lòng nhập email hợp lệ.'};
    const subscribers=getSubscribers();
    if(subscribers.some(item=>String(item.email).toLowerCase()===normalized))return{ok:false,duplicate:true,message:'Email này đã đăng ký nhận tin trước đó.'};
    subscribers.unshift({id:`NL${Date.now()}`,email:normalized,status:'Đang nhận tin',source,subscribedAt:new Date().toISOString()});
    write(KEYS.subscribers,subscribers);
    document.dispatchEvent(new CustomEvent('bv:subscriber'));
    return{ok:true,message:'Cảm ơn bạn đã đăng ký nhận tin!'};
  }
  function addComment(bookId,data={}){
    const book=getBooks().find(item=>item.id===bookId);
    const name=String(data.name||'').trim().replace(/\s+/g,' ');
    const content=String(data.content||'').trim();
    const rating=Number(data.rating);
    if(!book)return{ok:false,message:'Không tìm thấy sách để bình luận.'};
    if(name.length<2||name.length>60)return{ok:false,message:'Tên hiển thị phải từ 2 đến 60 ký tự.'};
    if(!Number.isInteger(rating)||rating<1||rating>5)return{ok:false,message:'Vui lòng chọn số sao đánh giá.'};
    if(content.length<5||content.length>800)return{ok:false,message:'Bình luận phải từ 5 đến 800 ký tự.'};
    const session=getSession();
    const verified=!!session&&getOrders().some(order=>order.userId===session.id&&order.status==='Hoàn thành'&&order.items.some(item=>item.bookId===bookId));
    const comment={id:`CM${Date.now()}${Math.floor(Math.random()*1000)}`,bookId,userId:session?.id||null,name,content,rating,verified,createdAt:new Date().toISOString()};
    const comments=getComments();comments.unshift(comment);write(KEYS.comments,comments);document.dispatchEvent(new CustomEvent('bv:comment',{detail:comment}));
    return{ok:true,message:'Bình luận của bạn đã được đăng.',comment};
  }
  function reset(){ Object.values(KEYS).forEach(removeItem); init(); }
  init();
  window.BV={KEYS,read,write,init,getBooks,getUsers,getOrders,getCart,getWishlist,getPromotions,getCategories,getSettings,getSession,getSubscribers,getComments,money,escapeHTML,addToCart,toggleWishlist,addSubscriber,addComment,reset};
})();

