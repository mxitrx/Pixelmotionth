document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. ฐานข้อมูลสินค้า (แก้ไขข้อมูลตรงนี้ที่เดียว)
    // ==========================================
    const allProducts = [
        {
            id: "CAM-PNC-AGUX180",
            category: "camera",
            name: "Panasonic AGUX-180 Set",
            price: 1500,
            stock: 1,
            status: "available", // available, low, out
            image: "https://www.audiovision.com.pe/wp-content/uploads/2022/10/PANASONIC-AG-UX180-1.png",
            items: "Body Panasonic AGUX-180, แบตเตอรี่ Panasonic (3 ก้อน), แท่นชาร์จ, Tripod Sachtler FSB 4,Soft Case"
        },
        {
            id: "CAM-INS-X4",
            category: "camera",
            name: "Insta360 X4 Set",
            price: 500,
            stock: 1,
            status: "available", // available, low, out
            image: "https://media-cdn.bnn.in.th/393202/insta360-x4-6-square_medium.jpg",
            items: "Body Insta360 X4, SD Card 256GB, Selfie Stick, Soft Case"
        },
        {
            id: "WLS-DJI-SDR",
            category: "wireless",
            name: "DJI SDR Transmission Combo",
            price: 1000,
            stock: 1,
            status: "available",
            image: "https://www.bigcamera.co.th/media/catalog/product/cache/69a3da6bcd95df779892f4b24fa6a6f7/d/j/dji-sdr-transmission-combo.png",
            items: "Transmitter, Receiver, Battery x3, แท่นชาร์จ, Type-C + Adapter, Soft Case"
        },
        {
            id: "TRI-SAC-FSB4",
            category: "monitor",
            name: "Sachtler FSB 4",
            price: 500,
            stock: 1,
            status: "available",
            image: "https://www.sachtler.com/wp-content/uploads/2023/06/sac_0370_fsb_4_web.jpg",
            items: "Tripod Sachtler FSB 4, Fluid Head, Bag"
        },
        
    ];

    // ==========================================
    // 2. ฟังก์ชัน Render สินค้าลงหน้าเว็บ
    // ==========================================
    function renderProducts(productsToRender) {
        const grid = document.getElementById('inventory-grid');
        if (!grid) return; // ถ้าไม่มี grid (เช่นอยู่หน้าอื่น) ให้หยุด

        grid.innerHTML = ''; // ล้างของเก่า

        productsToRender.forEach(p => {
            // กำหนดสีสถานะ
            let statusClass = 'status-available';
            if(p.status === 'low') statusClass = 'status-low';
            if(p.status === 'out') statusClass = 'status-out';

            const cardHTML = `
            <article class="item-card category-${p.category}" onclick="openModal('${p.id}')">
                <div class="card-image-container">
                    <img src="${p.image}" alt="${p.name}">
                    ${p.status === 'out' ? '<div class="out-of-stock-overlay">OUT OF STOCK</div>' : '<div class="card-overlay"><span class="view-btn">ดูรายละเอียด</span></div>'}
                </div>
                <div class="card-content">
                    <div class="card-top">
                        <span class="item-code">${p.id}</span>
                        <span class="status-dot ${statusClass}"></span>
                    </div>
                    <h3 class="item-name">${p.name}</h3>
                    <div class="item-footer">
                        <span class="price-tag">฿${p.price.toLocaleString()} <small>/วัน</small></span>
                    </div>
                </div>
            </article>
            `;
            grid.innerHTML += cardHTML;
        });
    }

    // เรียกแสดงผลทันที (ถ้าอยู่หน้า Inventory)
    renderProducts(allProducts);


    // ==========================================
    // 3. ระบบกรองสินค้า (Filter & Search)
    // ==========================================
    
    // Filter by Category
    const filterItems = document.querySelectorAll('.category-list li');
    if(filterItems) {
        filterItems.forEach(item => {
            item.addEventListener('click', () => {
                // เปลี่ยน Active Class
                filterItems.forEach(li => li.classList.remove('active'));
                item.classList.add('active');

                const category = item.dataset.category;
                if(category === 'all') {
                    renderProducts(allProducts);
                } else {
                    const filtered = allProducts.filter(p => p.category === category);
                    renderProducts(filtered);
                }
            });
        });
    }

    // Search
    const searchInput = document.getElementById('searchInput');
    if(searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = allProducts.filter(p => 
                p.name.toLowerCase().includes(term) || 
                p.id.toLowerCase().includes(term)
            );
            renderProducts(filtered);
        });
    }


    // ==========================================
    // 4. ระบบ Modal & Cart
    // ==========================================
    const modal = document.getElementById('inventoryModal');
    let currentProduct = null;

    // ทำให้เป็น Global Function เพื่อให้ HTML เรียกใช้ได้ (onclick="openModal")
    window.openModal = function(productId) {
        const p = allProducts.find(item => item.id === productId);
        if(!p) return;

        currentProduct = { ...p, qty: 1 }; // copy ข้อมูลมาเตรียมจอง

        // ใส่ข้อมูลลง Modal
        document.getElementById('modal-img').src = p.image;
        document.getElementById('modal-code').textContent = p.id;
        document.getElementById('modal-title').textContent = p.name;
        document.querySelector('.modal-price span').textContent = `฿${p.price.toLocaleString()}`;

        // สถานะ
        const statusPill = document.getElementById('modal-status-pill');
        const bookBtn = document.querySelector('.modal-actions button');
        
        statusPill.className = 'status-pill';
        if(p.status === 'available') {
            statusPill.classList.add('st-available');
            statusPill.textContent = 'Available';
            bookBtn.disabled = false;
            bookBtn.textContent = 'จองอุปกรณ์นี้';
        } else if (p.status === 'low') {
            statusPill.classList.add('st-low');
            statusPill.textContent = 'Low Stock';
            bookBtn.disabled = false;
            bookBtn.textContent = 'จองอุปกรณ์นี้';
        } else {
            statusPill.classList.add('st-out');
            statusPill.textContent = 'Out of Stock';
            bookBtn.disabled = true;
            bookBtn.textContent = 'สินค้าหมดชั่วคราว';
        }

        // รายการของ
        const itemsList = document.getElementById('modal-items-list');
        itemsList.innerHTML = '';
        if(p.items) {
            p.items.split(',').forEach(i => {
                itemsList.innerHTML += `<li>${i.trim()}</li>`;
            });
        }

        modal.classList.add('active');
    };

    // ปิด Modal
    const closeBtn = document.querySelector('.modal-close-btn');
    if(closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    window.onclick = (e) => { if (e.target == modal) modal.classList.remove('active'); };

    // ปุ่มจอง -> Add to Cart
    const bookBtn = document.querySelector('.modal-actions button');
    if(bookBtn) {
        bookBtn.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('pixelmotion_cart')) || [];
            
            // เช็คว่ามีของนี้ในตะกร้ายัง
            const existing = cart.find(item => item.id === currentProduct.id);
            if(existing) {
                existing.qty += 1;
            } else {
                cart.push(currentProduct);
            }

            localStorage.setItem('pixelmotion_cart', JSON.stringify(cart));
            updateCartBadge();
            window.location.href = 'cart.html';
        });
    }

    // Badge Count
    window.updateCartBadge = function() {
        const badge = document.getElementById('nav-cart-count');
        if(badge) {
            const cart = JSON.parse(localStorage.getItem('pixelmotion_cart')) || [];
            const count = cart.reduce((sum, item) => sum + item.qty, 0);
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-block' : 'none';
        }
    };
    updateCartBadge();
});