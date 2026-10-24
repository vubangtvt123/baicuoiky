(function () {
  'use strict';

  const BV = window.BV;
  if (!BV) {
    const host = document.querySelector('#book-detail');
    if (host) {
      host.innerHTML = `
        <section class="empty-state detail-empty panel">
          <i class="fa-solid fa-triangle-exclamation fa-3x" aria-hidden="true"></i>
          <h2>Chưa tải được dữ liệu sách</h2>
          <p>Trình duyệt chưa tải xong kho sách BOOKVERSE. Hãy tải lại trang để thử lại.</p>
          <button class="btn btn-primary" type="button" data-reload-detail><i class="fa-solid fa-rotate-right"></i> Tải lại trang</button>
        </section>`;
      host.querySelector('[data-reload-detail]')?.addEventListener('click', () => window.location.reload());
    }
    return;
  }

  const numberValue = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const safe = value => BV.escapeHTML(value == null ? '' : value);

  function notify(message, type = 'success') {
    if (window.BVUI?.toast) window.BVUI.toast(message, type);
  }

  function relatedCard(book) {
    const price = numberValue(book.price);
    const salePrice = numberValue(book.salePrice, price);
    const discount = price > salePrice ? Math.round((1 - salePrice / price) * 100) : 0;
    const url = `book-detail.html?id=${encodeURIComponent(book.id)}`;
    return `
      <article class="book-card related-book-card">
        <div class="book-card-inner" data-book-link="${url}">
          <div class="book-cover-wrap">
            <a class="book-cover-link" href="${url}" aria-label="Xem ${safe(book.title)}">
              <img class="book-cover" src="${safe(book.image)}" alt="Bìa sách ${safe(book.title)}" loading="lazy">
            </a>
            ${discount ? `<span class="book-tag">-${discount}%</span>` : ''}
          </div>
          <div class="book-info">
            <div class="book-meta">${safe(book.category || 'Sách')}</div>
            <h3><a href="${url}">${safe(book.title || 'Sách chưa đặt tên')}</a></h3>
            <div class="book-meta">${safe(book.author || 'Đang cập nhật tác giả')}</div>
            <div class="rating"><i class="fa-solid fa-star"></i> ${numberValue(book.rating, 5).toFixed(1)}</div>
            <div class="price-row">
              <span class="price">${BV.money(salePrice)}</span>
              ${price > salePrice ? `<span class="old-price">${BV.money(price)}</span>` : ''}
            </div>
            <div class="book-actions">
              <button class="btn btn-primary btn-sm" data-related-add="${safe(book.id)}"><i class="fa-solid fa-bag-shopping"></i> Thêm giỏ</button>
              <a class="icon-btn" href="${url}" aria-label="Xem chi tiết ${safe(book.title)}"><i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </article>`;
  }

  function renderMissing(host) {
    host.innerHTML = `
      <section class="empty-state detail-empty panel">
        <i class="fa-regular fa-compass fa-3x" aria-hidden="true"></i>
        <h2>Không tìm thấy cuốn sách này</h2>
        <p>ID trên đường dẫn không tồn tại trong kho sách của thiết bị này. Nếu sách được thêm từ Admin ở máy khác, dữ liệu đó sẽ không tự động đồng bộ vì website demo dùng localStorage.</p>
        <a class="btn btn-primary" href="books.html"><i class="fa-solid fa-arrow-left"></i> Quay lại danh sách sách</a>
      </section>`;
  }

  function renderDetail(host, book, books) {
    const stock = Math.max(0, Math.floor(numberValue(book.stock)));
    const price = numberValue(book.price);
    const salePrice = numberValue(book.salePrice, price);
    const discount = price > salePrice ? Math.round((1 - salePrice / price) * 100) : 0;
    const rating = Math.min(5, Math.max(0, numberValue(book.rating, 5)));
    const wished = BV.getWishlist().includes(book.id);
    const session = BV.getSession();
    const related = books
      .filter(item => item.id !== book.id)
      .sort((a, b) => Number(b.category === book.category) - Number(a.category === book.category))
      .slice(0, 4);

    document.title = `${book.title || 'Chi tiết sách'} | BOOKVERSE`;
    host.innerHTML = `
      <div class="detail-layout">
        <aside class="detail-cover" data-aos="fade-right">
          <div class="detail-cover-stage">
            <img id="detail-cover-image" src="${safe(book.image)}" alt="Bìa sách ${safe(book.title)}">
            ${discount ? `<span class="detail-discount">Giảm ${discount}%</span>` : ''}
          </div>
          <div class="detail-benefits" aria-label="Quyền lợi mua hàng">
            <span><i class="fa-solid fa-truck-fast"></i> Giao hàng toàn quốc</span>
            <span><i class="fa-solid fa-shield-heart"></i> Sách được kiểm tra trước khi gửi</span>
            <span><i class="fa-solid fa-rotate-left"></i> Hỗ trợ đổi trả trong 7 ngày</span>
          </div>
        </aside>

        <article class="detail-summary" data-aos="fade-left">
          <span class="eyebrow">${safe(book.category || 'Sách BOOKVERSE')} · ${book.isNew ? 'Mới phát hành' : 'Tuyển chọn nổi bật'}</span>
          <h1>${safe(book.title || 'Sách chưa đặt tên')}</h1>
          <p class="detail-author">Tác giả <strong>${safe(book.author || 'Đang cập nhật')}</strong></p>
          <div class="detail-rating-row">
            <span class="rating"><i class="fa-solid fa-star"></i> ${rating.toFixed(1)}/5</span>
            <span>${numberValue(book.sold).toLocaleString('vi-VN')} lượt mua</span>
            <span class="status ${stock ? 'success' : 'danger'}">${stock ? `Còn ${stock} cuốn` : 'Tạm hết hàng'}</span>
          </div>
          <div class="price-row detail-price-row">
            <span class="detail-price">${BV.money(salePrice)}</span>
            ${price > salePrice ? `<span class="old-price">${BV.money(price)}</span>` : ''}
            ${discount ? `<span class="saving-label">Tiết kiệm ${BV.money(price - salePrice)}</span>` : ''}
          </div>
          <div class="detail-description">
            <h2>Giới thiệu sách</h2>
            <p>${safe(book.description || 'Thông tin giới thiệu của cuốn sách đang được BOOKVERSE cập nhật.')}</p>
            <p>Ấn bản được BOOKVERSE tuyển chọn dành cho độc giả yêu thích nội dung chỉn chu, dễ tiếp cận và có giá trị đọc lâu dài.</p>
          </div>

          <div class="detail-purchase">
            <div class="field quantity-field">
              <label for="detail-qty">Số lượng</label>
              <div class="quantity-control">
                <button type="button" id="qty-minus" aria-label="Giảm số lượng">−</button>
                <input id="detail-qty" type="number" min="1" max="${Math.max(1, stock)}" value="1" inputmode="numeric" ${stock ? '' : 'disabled'}>
                <button type="button" id="qty-plus" aria-label="Tăng số lượng">+</button>
              </div>
            </div>
            <div class="detail-actions">
              <button class="btn btn-primary" id="detail-add" ${stock ? '' : 'disabled'}><i class="fa-solid fa-bag-shopping"></i> Thêm vào giỏ</button>
              <button class="btn btn-accent" id="buy-now" ${stock ? '' : 'disabled'}><i class="fa-solid fa-bolt"></i> Mua ngay</button>
              <button class="icon-btn ${wished ? 'active' : ''}" data-wishlist="${safe(book.id)}" aria-label="Thêm ${safe(book.title)} vào yêu thích"><i class="fa-${wished ? 'solid' : 'regular'} fa-heart"></i></button>
            </div>
          </div>

          <section class="panel book-specification">
            <h2>Thông tin xuất bản</h2>
            <div class="spec-grid">
              <div><small class="muted">Nhà xuất bản</small><strong>${safe(book.publisher || 'Đang cập nhật')}</strong></div>
              <div><small class="muted">Năm xuất bản</small><strong>${safe(book.year || 'Đang cập nhật')}</strong></div>
              <div><small class="muted">Số trang</small><strong>${book.pages ? `${numberValue(book.pages)} trang` : 'Đang cập nhật'}</strong></div>
              <div><small class="muted">Mã sách</small><strong>${safe(book.id)}</strong></div>
            </div>
          </section>
        </article>
      </div>

      <section class="section detail-related" aria-labelledby="related-title">
        <div class="section-head">
          <div><span class="eyebrow">Có thể bạn sẽ thích</span><h2 id="related-title">Sách liên quan</h2></div>
          <a href="books.html">Xem tất cả <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="book-grid">${related.map(relatedCard).join('')}</div>
      </section>

      <section class="panel book-comments" aria-labelledby="comment-title" data-aos="fade-up">
        <div class="comments-heading">
          <div><span class="eyebrow">Cộng đồng BOOKVERSE</span><h2 id="comment-title">Bình luận và đánh giá</h2></div>
          <span class="comments-count" id="comments-count">0 bình luận</span>
        </div>
        <div class="comments-layout">
          <form class="comment-form" id="comment-form" novalidate>
            <h3>Chia sẻ cảm nhận của bạn</h3>
            <div class="field">
              <label for="comment-name">Tên hiển thị</label>
              <input id="comment-name" name="name" minlength="2" maxlength="60" value="${safe(session?.name || '')}" placeholder="Tên của bạn" required ${session ? 'readonly' : ''}>
            </div>
            <fieldset class="comment-rating-field">
              <legend>Đánh giá của bạn</legend>
              <div class="rating-picker" aria-label="Chọn số sao">
                ${[5,4,3,2,1].map(star=>`<input id="comment-star-${star}" name="rating" type="radio" value="${star}" required><label for="comment-star-${star}" title="${star} sao">★</label>`).join('')}
              </div>
            </fieldset>
            <div class="field">
              <label for="comment-content">Nội dung bình luận</label>
              <textarea id="comment-content" name="content" minlength="5" maxlength="800" rows="5" placeholder="Cuốn sách mang lại điều gì cho bạn?" required></textarea>
              <small class="comment-counter"><span id="comment-length">0</span>/800 ký tự</small>
            </div>
            <button class="btn btn-primary" type="submit"><i class="fa-solid fa-paper-plane"></i> Đăng bình luận</button>
            <p class="comment-note"><i class="fa-solid fa-circle-info"></i> Bình luận được lưu trên trình duyệt cho mục đích minh họa.</p>
          </form>
          <div class="comments-feed">
            <div class="comments-summary" id="comments-summary"></div>
            <div class="comments-list" id="book-comments-list"></div>
          </div>
        </div>
      </section>`;

    const commentsList = host.querySelector('#book-comments-list');
    const commentsCount = host.querySelector('#comments-count');
    const commentsSummary = host.querySelector('#comments-summary');
    const commentForm = host.querySelector('#comment-form');

    function renderComments() {
      const comments = [...BV.getComments(book.id)].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const average = comments.length ? comments.reduce((sum, item) => sum + numberValue(item.rating), 0) / comments.length : rating;
      commentsCount.textContent = `${comments.length} bình luận`;
      commentsSummary.innerHTML = `<div><strong>${average.toFixed(1)}</strong><span class="rating" aria-label="${average.toFixed(1)} trên 5 sao">${'★'.repeat(Math.round(average))}${'☆'.repeat(5-Math.round(average))}</span></div><p class="muted">${comments.length ? `Điểm trung bình từ ${comments.length} độc giả` : 'Hãy là người đầu tiên chia sẻ cảm nhận'}</p>`;
      if (!comments.length) {
        commentsList.innerHTML = '<div class="comments-empty"><i class="fa-regular fa-comments fa-2x"></i><h3>Chưa có bình luận nào</h3><p>Chia sẻ cảm nhận để giúp những độc giả khác lựa chọn sách.</p></div>';
        return;
      }
      commentsList.innerHTML = comments.map(item => {
        const date = new Date(item.createdAt);
        const dateText = Number.isNaN(date.getTime()) ? 'Vừa xong' : date.toLocaleString('vi-VN');
        const stars = Math.min(5, Math.max(1, Math.round(numberValue(item.rating, 5))));
        const initial = String(item.name || 'B').trim().charAt(0).toUpperCase();
        return `<article class="comment-item"><div class="comment-avatar" aria-hidden="true">${safe(initial)}</div><div class="comment-body"><div class="comment-meta"><div><strong>${safe(item.name)}</strong>${item.verified ? '<span class="verified-badge"><i class="fa-solid fa-circle-check"></i> Đã mua sách</span>' : ''}</div><time datetime="${safe(item.createdAt)}">${dateText}</time></div><div class="rating comment-stars" aria-label="${stars} trên 5 sao">${'★'.repeat(stars)}${'☆'.repeat(5-stars)}</div><p>${safe(item.content)}</p></div></article>`;
      }).join('');
    }

    const commentContent = commentForm.querySelector('#comment-content');
    const commentLength = commentForm.querySelector('#comment-length');
    commentContent.addEventListener('input', () => { commentLength.textContent = String(commentContent.value.length); });
    commentForm.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(commentForm);
      const result = BV.addComment(book.id, { name: data.get('name'), rating: data.get('rating'), content: data.get('content') });
      notify(result.message, result.ok ? 'success' : 'error');
      if (!result.ok) return;
      commentForm.reset();
      commentLength.textContent = '0';
      renderComments();
      commentsList.querySelector('.comment-item')?.classList.add('animate__animated', 'animate__fadeInUp');
    });
    renderComments();

    const coverImage = host.querySelector('#detail-cover-image');
    coverImage?.addEventListener('error', () => {
      coverImage.removeAttribute('src');
      coverImage.classList.add('image-fallback');
      coverImage.alt = `Chưa có ảnh bìa cho ${book.title}`;
    }, { once: true });
    host.querySelectorAll('.related-book-card img').forEach(image => {
      image.addEventListener('error', () => {
        image.removeAttribute('src');
        image.classList.add('image-fallback');
      }, { once: true });
    });

    const quantity = host.querySelector('#detail-qty');
    const normalizedQuantity = () => {
      const value = Number(quantity.value);
      if (!Number.isInteger(value) || value < 1 || value > stock) {
        notify(`Số lượng phải từ 1 đến ${stock}.`, 'error');
        return null;
      }
      return value;
    };
    host.querySelector('#qty-minus')?.addEventListener('click', () => {
      quantity.value = String(Math.max(1, numberValue(quantity.value, 1) - 1));
    });
    host.querySelector('#qty-plus')?.addEventListener('click', () => {
      quantity.value = String(Math.min(stock, numberValue(quantity.value, 1) + 1));
    });
    quantity?.addEventListener('change', () => {
      quantity.value = String(Math.min(stock, Math.max(1, Math.floor(numberValue(quantity.value, 1)))));
    });

    function addToCart(goToCheckout) {
      const amount = normalizedQuantity();
      if (amount == null) return;
      const result = BV.addToCart(book.id, amount);
      notify(result.message, result.ok ? 'success' : 'error');
      if (result.ok && goToCheckout) window.location.href = 'checkout.html';
    }

    host.querySelector('#detail-add')?.addEventListener('click', () => addToCart(false));
    host.querySelector('#buy-now')?.addEventListener('click', () => addToCart(true));
    host.addEventListener('click', event => {
      const addButton = event.target.closest('[data-related-add]');
      if (addButton) {
        const result = BV.addToCart(addButton.dataset.relatedAdd, 1);
        notify(result.message, result.ok ? 'success' : 'error');
        return;
      }
      const card = event.target.closest('[data-book-link]');
      if (card && !event.target.closest('a,button,input,select,textarea')) {
        window.location.href = card.dataset.bookLink;
      }
    });

    window.AOS?.refreshHard?.();
  }

  function init() {
    const host = document.querySelector('#book-detail');
    if (!host) return;
    try {
      const id = new URLSearchParams(window.location.search).get('id')?.trim();
      const books = BV.getBooks();
      const book = books.find(item => String(item.id).toLowerCase() === String(id || '').toLowerCase());
      if (!book) {
        renderMissing(host);
        return;
      }
      renderDetail(host, book, books);
    } catch (error) {
      console.error('Không thể hiển thị chi tiết sách:', error);
      renderMissing(host);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
