document.addEventListener('DOMContentLoaded', () => {
    // ===============================
    // 🔧 CONFIG
    // ===============================
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyx4JHoIQNEeWRrjSfoUCgt3t6i2v5_qAaLh9GfzcWQJ1tBqTxGhEVEo0MqKT_FSvvGqQ/exec";
    const LINE_TOKEN = "7VBjby2ID2NCtXRfBgxkluH7nHPexc/CR1Cc8wpL7qQ7kZEX375UpG+TfXfGwDNUaMkcCPIP9xNqoZ+qHghtwJV9Eciippq82BH3vcPgHfLK2NVex4OuH3ITR/WYXkrJk7YH22pdnRF3mTHELR8XfAdB04t89/1O/w1cDnyilFU=";

    // ===============================
    // 📦 PRODUCT DATA (ตัวอย่าง)
    // ===============================
    const products = [
  {
    id: 1,
    name: 'Panasonic AG-UX180 4K',
    price: 1500,
    description: 'กล้องวิดีโอ Panasonic AG-UX180 4K UHD Professional Camcorder',
    image: 'pic/agux.png',
    features: [
      'รองรับการบันทึก 4K UHD 60p',
      'เลนส์ซูมออปติคอล 20×',
      'ระบบกันสั่น 5 แกน Hybrid O.I.S.',
      'ช่องใส่การ์ด SD คู่',
      'แหวนควบคุม 3 วง (โฟกัส / ซูม / ไอริส)'
    ]
  },
  
  {
    id: 2,
    name: 'DJI SDR Transmission',
    price: 1000,
    description: 'ระบบส่งสัญญาณวิดีโอไร้สาย DJI SDR Transmission ความหน่วงต่ำ สำหรับกล้อง DSLR / Mirrorless / Cinema',
    image: 'pic/dji.png',
    features: [
      'ระยะส่งสัญญาณสูงสุด 3 กม.',
      'ความหน่วงต่ำเพียง 35 ms',
      'รองรับ HDMI / SDI / USB-C',
      'รองรับโหมด Broadcast',
      'น้ำหนักเบาเพียง 145 กรัม'
    ]
  },
  
  {
    id: 3,
    name: 'Sachtler FSB 4',
    price: 500,
    description: 'Sachtler FSB 4 Fluid Head with Tripod System for Professional Video Production',
    image: 'pic/fsb4.png',
    features: [
      'หัวฟลูอิดคุณภาพสูง',
      'รองรับน้ำหนักกล้องสูงสุด 7 กก.',
      'ขาตั้งอลูมิเนียมแข็งแรง ทนทาน',
      'ปรับความต้านทานได้หลายระดับ'
    ]
  },

  {
    id: 4,
    name: 'Ugreen Type C Hub',
    price: 100,
    description: 'Ugreen Type C Hub 9 in 1 USB-C to HDMI 4K LAN RJ45 PD 100W Aluminum Multiport Adapter',
    image: 'pic/typec.png',
    features: [
      'พอร์ตครบ 9 in 1',
      'รองรับ HDMI 4K 60Hz',
      'มีช่อง LAN RJ45',
      'PD Fast Charge 100W',
      'วัสดุอลูมิเนียม แข็งแรง สวยงาม'
    ]
  },
  
  {
    id: 5,
    name: 'Ulanzi Vl119',
    price: 100,
    description: 'Ulanzi Vl119 LED Video Light with Adjustable Brightness and Color Temperature for Photography and Videography',
    image: 'pic/ulanzi.png',
    features: [
      'ปรับความสว่างได้ 0-100%',
      'ปรับอุณหภูมิสีได้ 3200K-5600K',
      'แบตเตอรี่ในตัว ใช้งานได้นาน',
      'ขนาดกะทัดรัด พกพาสะดวก'
    ]
  },

  {
    id: 6,
    name: 'TP-Link TL-SG108',
    price: 100,
    description: 'สวิตช์เครือข่าย TP-Link TL-SG108 8 พอร์ต Gigabit Desktop Switch',
    image: 'pic/tplink.png',
    features: [
      'พอร์ต Gigabit 8 ช่อง',
      'โอนถ่ายข้อมูลสูงสุด 1000 Mbps',
      'วัสดุตัวเครื่องโลหะคุณภาพสูง',
      'ติดตั้งง่าย Plug and Play'
    ]
  },

  {
    id: 7,
    name: 'HDMI FIBER 20M',
    price: 100,
    description: 'สาย HDMI Fiber Optic 20 เมตร รองรับ 4K UHD สำหรับกล้องและอุปกรณ์วิดีโอ',
    image: 'pic/hdmi.png',
    features: [
      'รองรับความละเอียดสูงสุด 4K UHD',
      'ยาว 20 เมตร',
      'ทนทานต่อการรบกวนสัญญาณ',
      'เหมาะสำหรับงานถ่ายทอดสดและสตูดิโอ'
    ]
  },

];


    // ===============================
    // 🌗 THEME TOGGLE
    // ===============================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeText = document.querySelector('.theme-text');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        if (themeText) themeText.textContent = 'โหมดสว่าง';
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeIcon.classList.toggle('fa-sun', isDark);
            themeIcon.classList.toggle('fa-moon', !isDark);
            themeText.textContent = isDark ? 'โหมดสว่าง' : 'โหมดมืด';
        });
    }

    // ===============================
    // 🛒 CART FUNCTIONS
    // ===============================
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
    function updateCartCount() {
        const el = document.getElementById('cart-count');
        if (el) el.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }

    // ===============================
    // 📄 PAGE HANDLER
    // ===============================
    const path = window.location.pathname.split("/").pop();

    // 📋 หน้า index.html
    if (path === 'index.html' || path === '') {
        const grid = document.getElementById('product-grid');
        if (grid) {
            products.forEach(p => {
                grid.innerHTML += `
                <div class="product-card">
                    <div class="product-image-container">
                        <img src="${p.image}" alt="${p.name}">
                    </div>
                    <div class="product-info">
                        <h3>${p.name}</h3>
                        <p class="product-price">฿${p.price.toLocaleString()}/วัน</p>
                        <a href="details.html?id=${p.id}" class="btn primary-btn">ดูรายละเอียดและเช่า</a>
                    </div>
                </div>`;
            });
        }
    }

    // 📅 หน้า details.html
    if (path === 'details.html') {
        const container = document.getElementById('product-detail-container');
        const id = new URLSearchParams(window.location.search).get('id');
        const product = products.find(p => p.id == id);

        if (!product) return container.innerHTML = `<p>ไม่พบสินค้า</p>`;

        container.innerHTML = `
        <div class="product-detail-card">
            <div class="product-detail-image">
                <img src="${product.image}">
            </div>
            
            <div class="product-detail-info">
                <h1>${product.name}</h1>
                <p class="price">฿${product.price.toLocaleString()}/วัน</p>
                <p>${product.description}</p>
                
                <div class="date-picker-container">
                    <div class="date-field">
                        <label>วันที่เช่า</label>
                        <input type="text" id="start-date">
                    </div>
                    <div class="date-field">
                        <label>วันที่คืน</label>
                        <input type="text" id="end-date">
                    </div>
                </div>
                
                <p id="total-price">ราคารวม: ฿0</p>
                <button id="add-to-cart-btn" class="btn primary-btn" disabled>กรุณาเลือกวันที่</button>
            </div>
        </div>`;
        if (product.features && product.features.length) {
  const featureHTML = `
    <ul class="features">
      ${product.features.map(f => `<li>${f}</li>`).join('')}
    </ul>`;
  container.querySelector('.product-detail-info').innerHTML += featureHTML;
}


        const addBtn = document.getElementById('add-to-cart-btn');
        const totalText = document.getElementById('total-price');
        let days = 0;

        const startPicker = flatpickr("#start-date", {
            locale: "th", minDate: "today",
            onChange: () => { endPicker.set('minDate', startPicker.selectedDates[0]); calc(); }
        });
        const endPicker = flatpickr("#end-date", {
            locale: "th", minDate: "today",
            onChange: calc
        });

        function calc() {
            const s = startPicker.selectedDates[0];
            const e = endPicker.selectedDates[0];
            if (s && e && e >= s) {
                days = Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1;
                totalText.textContent = `ราคารวมสำหรับ ${days} วัน: ฿${(days * product.price).toLocaleString()}`;
                addBtn.disabled = false;
                addBtn.textContent = "เพิ่มไปยังรถเข็น";
            } else {
                totalText.textContent = "ราคารวม: ฿0";
                addBtn.disabled = true;
            }
        }

        addBtn.addEventListener('click', () => {
            const s = document.getElementById('start-date').value;
            const e = document.getElementById('end-date').value;
            cart.push({ ...product, startDate: s, endDate: e, days });
            saveCart();
            window.location.href = 'cart.html';
        });
    }

    // 🛍 หน้า cart.html
    if (path === 'cart.html') {
        const itemsContainer = document.getElementById('cart-items');
        const summary = document.getElementById('cart-summary');
        const checkoutBtn = document.getElementById('checkout-button');

        function renderCart() {
            if (!cart.length) {
                itemsContainer.innerHTML = `<div class="empty-cart"><p>ยังไม่มีสินค้า</p><a href="index.html" class="btn primary-btn">เลือกสินค้า</a></div>`;
                checkoutBtn.style.display = 'none';
                return;
            }

            let total = 0;
            itemsContainer.innerHTML = '';
            cart.forEach((item, i) => {
                const itemTotal = item.price * item.days;
                total += itemTotal;
                itemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>${item.startDate} - ${item.endDate} (${item.days} วัน)</p>
                        <p><b>฿${itemTotal.toLocaleString()}</b></p>
                    </div>
                    <button class="remove-btn" data-i="${i}"><i class="fas fa-trash"></i></button>
                </div>`;
            });
            summary.innerHTML = `<h3>ยอดรวมทั้งหมด ฿${total.toLocaleString()}</h3>`;
            checkoutBtn.style.display = 'block';

            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.onclick = e => {
                    cart.splice(e.target.closest('.remove-btn').dataset.i, 1);
                    saveCart();
                    renderCart();
                };
            });
        }
        renderCart();

        checkoutBtn.addEventListener('click', () => window.location.href = 'payment.html');
    }

    // 💳 หน้า payment.html
if (path === 'payment.html') {
    const form = document.getElementById('payment-form');
    const summary = document.getElementById('summary-items');
    const totalBox = document.getElementById('summary-total');

    if (!cart.length) return (window.location.href = 'index.html');

    let total = 0;
    cart.forEach(item => {
        const t = item.price * item.days;
        total += t;
        summary.innerHTML += `<div class="summary-item"><span>${item.name} (${item.days} วัน)</span><span>฿${t.toLocaleString()}</span></div>`;
    });
    totalBox.innerHTML = `<div class="summary-line total"><span>รวมทั้งหมด</span> <span>฿${total.toLocaleString()}</span></div>`;

    form.addEventListener('submit', async e => {
  e.preventDefault();
  const submitBtn = document.getElementById('submit-order-btn');
  const loader = submitBtn.querySelector('.loader');
  const text = submitBtn.querySelector('.btn-text');
  loader.style.display = 'inline-block';
  text.style.display = 'none';
  submitBtn.disabled = true;

  const fd = new FormData(form);
  const items = cart.map(i => `${i.name} (${i.startDate} ถึง ${i.endDate}, ${i.days} วัน)`).join("; ");
  fd.append('Items', items);
  fd.append('TotalCost', total);

  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: fd });
    // ถ้า network error จะโดน catch ก่อนมาถึงบรรทัดนี้
    const text = await res.text(); // อ่าน raw response
    let data;
    try { data = JSON.parse(text); } catch (e) { data = null; }

    if (!res.ok) {
      // server ตอบ error HTTP (เช่น 4xx/5xx)
      const errMsg = data && data.error ? data.error : `HTTP ${res.status} - ${text}`;
      throw new Error(errMsg);
    }

    if (!data) {
      throw new Error('Response is not JSON: ' + text.slice(0, 400));
    }

    if (data.result !== "success") {
      throw new Error(data.error || 'Unknown server error: ' + JSON.stringify(data));
    }

    // success
    showModal("✅ สำเร็จ", "ระบบได้รับข้อมูลแล้ว ทางเราจะติดต่อไปครับ");
    cart = [];
    saveCart();
    form.reset();
  } catch (err) {
    // แสดง error ให้อ่านง่าย
    showModal("❌ เกิดข้อผิดพลาด", `ไม่สามารถส่งข้อมูลได้<br><pre style="text-align:left">${err.message}</pre>`);
    console.error('Submit error:', err);
  } finally {
    loader.style.display = 'none';
    text.style.display = 'inline-block';
    submitBtn.disabled = false;
  }
});

}


    // 📦 MODAL
    function showModal(title, msg) {
        const modal = document.getElementById("status-modal");
        const body = document.getElementById("modal-body");
        body.innerHTML = `<h2>${title}</h2><p>${msg}</p>`;
        modal.style.display = "flex";
        modal.querySelector(".close-button").onclick = () => modal.style.display = "none";
    }

    updateCartCount();
});

