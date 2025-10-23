document.addEventListener('DOMContentLoaded', () => {
    // --- Sample Product Data ---
    // ในโปรเจคจริง ข้อมูลนี้ควรมาจาก Server หรือ Google Sheet
    const products = [
        { id: 1, name: 'Canon EOS R5', price: 1500, description: 'กล้อง Mirrorless Full-frame ความละเอียดสูง เหมาะสำหรับงานมืออาชีพ.', image: 'https://images.unsplash.com/photo-1599815127363-8a39a2d2a4e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60' },
        { id: 2, name: 'Sony A7S III', price: 1800, description: 'สุดยอดกล้องสำหรับงานวิดีโอในที่แสงน้อย ให้คุณภาพไฟล์ที่น่าทึ่ง', image: 'https://images.unsplash.com/photo-1620331317387-1329611f3d45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60' },
        { id: 3, name: 'DJI Ronin-S', price: 800, description: 'Gimbal Stabilizer สำหรับกล้อง DSLR และ Mirrorless ช่วยให้วิดีโอลื่นไหล', image: 'https://images.unsplash.com/photo-1579457388836-95712128b1e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60' },
        { id: 4, name: 'Aputure Light Dome II', price: 500, description: 'Softbox คุณภาพสูง ช่วยให้แสงนุ่มนวลสวยงาม', image: 'https://images.unsplash.com/photo-1600045615786-2a62cd4b3a4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60' }
    ];

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeText = document.querySelector('.theme-text');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // --- Theme Toggle ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if(themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        if(themeText) themeText.textContent = 'โหมดสว่าง';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            if(themeIcon) {
                themeIcon.classList.toggle('fa-moon', !isDarkMode);
                themeIcon.classList.toggle('fa-sun', isDarkMode);
            }
            if (themeText) themeText.textContent = isDarkMode ? 'โหมดสว่าง' : 'โหมดมืด';
        });
    }

    // --- Cart Logic ---
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        }
    }

    function addToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.startDate === item.startDate && cartItem.endDate === item.endDate);
        if (existingItem) {
            alert('มีรายการเช่านี้อยู่ในตะกร้าแล้ว');
        } else {
            cart.push(item);
            saveCart();
            alert('เพิ่มสินค้าลงในรถเข็นแล้ว!');
            window.location.href = 'cart.html';
        }
    }

    // --- Page Specific Logic ---
    const path = window.location.pathname.split("/").pop();
    
    if (path === 'index.html' || path === '') {
        // --- Index Page (Product Grid) ---
        const productGrid = document.getElementById('product-grid');
        if (productGrid) {
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-image-container">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-price">฿${product.price.toLocaleString()}/วัน</p>
                        <a href="details.html?id=${product.id}" class="btn primary-btn">ดูรายละเอียดและเช่า</a>
                    </div>
                `;
                productGrid.appendChild(productCard);
            });
        }
    }
    
    if (path === 'details.html') {
        const productDetailContainer = document.getElementById('product-detail-container');
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const product = products.find(p => p.id === productId);

        if (product && productDetailContainer) {
            productDetailContainer.innerHTML = `
                <div class="product-detail-card">
                    <div class="product-detail-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-detail-info">
                        <h1>${product.name}</h1>
                        <p class="price">฿${product.price.toLocaleString()}/วัน</p>
                        <p class="description">${product.description}</p>
                        <div class="date-picker-container">
                            <div class="date-field">
                                <label for="start-date">วันที่เช่า:</label>
                                <input type="text" id="start-date" placeholder="เลือกวันที่เริ่มเช่า">
                            </div>
                            <div class="date-field">
                                <label for="end-date">วันที่คืน:</label>
                                <input type="text" id="end-date" placeholder="เลือกวันที่สิ้นสุด">
                            </div>
                        </div>
                         <p class="total-price-display" id="total-price">ราคารวม: ฿0</p>
                        <button id="add-to-cart-btn" class="btn primary-btn" disabled>กรุณาเลือกวันที่</button>
                    </div>
                </div>
            `;
            
            const addToCartBtn = document.getElementById('add-to-cart-btn');
            const totalPriceDisplay = document.getElementById('total-price');
            let rentalDays = 0;

            const fpEnd = flatpickr("#end-date", {
                locale: "th",
                minDate: "today",
                onChange: function(selectedDates, dateStr, instance) {
                    calculatePrice();
                }
            });

            const fpStart = flatpickr("#start-date", {
                locale: "th",
                minDate: "today",
                onChange: function(selectedDates, dateStr, instance) {
                    if (selectedDates[0]) {
                        fpEnd.set('minDate', selectedDates[0]);
                        fpEnd.clear(); // เคลียร์วันที่คืนเมื่อเปลี่ยนวันที่เช่า
                        calculatePrice();
                    }
                },
            });
            
            function calculatePrice() {
                const startDate = fpStart.selectedDates[0];
                const endDate = fpEnd.selectedDates[0];
                
                if (startDate && endDate && endDate >= startDate) {
                    const diffTime = Math.abs(endDate - startDate);
                    rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                    const totalPrice = rentalDays * product.price;
                    totalPriceDisplay.textContent = `ราคารวมสำหรับ ${rentalDays} วัน: ฿${totalPrice.toLocaleString()}`;
                    addToCartBtn.textContent = 'เพิ่มไปยังรถเข็น';
                    addToCartBtn.disabled = false;
                } else {
                    totalPriceDisplay.textContent = 'ราคารวม: ฿0';
                    addToCartBtn.textContent = 'กรุณาเลือกวันที่';
                    addToCartBtn.disabled = true;
                    rentalDays = 0;
                }
            }

            addToCartBtn.addEventListener('click', () => {
                const startDate = document.getElementById('start-date').value;
                const endDate = document.getElementById('end-date').value;
                if (!startDate || !endDate) {
                    alert('กรุณาเลือกวันที่เช่าและวันที่คืน');
                    return;
                }
                const item = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    startDate: startDate,
                    endDate: endDate,
                    days: rentalDays
                };
                addToCart(item);
            });
        } else {
             if(productDetailContainer) productDetailContainer.innerHTML = '<h2><i class="fas fa-exclamation-triangle"></i> ไม่พบสินค้า</h2><p>ขออภัย ไม่พบสินค้าที่คุณกำลังค้นหา</p>';
        }

    } else if (path === 'cart.html') {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummaryContainer = document.getElementById('cart-summary');
        const checkoutButton = document.getElementById('checkout-button');

        function renderCartItems() {
            if (!cartItemsContainer) return;
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart fa-3x"></i><p>ยังไม่มีรายการเช่าในรถเข็นของคุณ</p><a href="index.html" class="btn primary-btn">เลือกดูสินค้า</a></div>';
                if(cartSummaryContainer) cartSummaryContainer.style.display = 'none';
                if(checkoutButton) checkoutButton.style.display = 'none';
                return;
            }

            cartItemsContainer.innerHTML = '';
            let totalCost = 0;
            
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.days;
                totalCost += itemTotal;

                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p><b>วันที่:</b> ${item.startDate} - ${item.endDate} (${item.days} วัน)</p>
                        <p class="cart-item-price"><b>ราคา:</b> ฿${itemTotal.toLocaleString()}</p>
                    </div>
                    <button class="remove-btn" data-index="${index}" title="ลบรายการ"><i class="fas fa-trash-alt"></i></button>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
            
            if(cartSummaryContainer) {
                cartSummaryContainer.style.display = 'block';
                cartSummaryContainer.innerHTML = `
                    <h3>สรุปรายการ</h3>
                    <div class="summary-line">
                        <span>ยอดรวมทั้งหมด</span>
                        <span>฿${totalCost.toLocaleString()}</span>
                    </div>
                `;
            }
            if(checkoutButton) checkoutButton.style.display = 'block';

            document.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const indexToRemove = parseInt(event.currentTarget.getAttribute('data-index'));
                    cart.splice(indexToRemove, 1);
                    saveCart();
                    renderCartItems();
                });
            });
        }
        renderCartItems();
    }
    
    // --- Contact Form ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // ในโปรเจคจริง ส่วนนี้จะใช้ส่งข้อมูลไปยัง Server หรือ Backend
            alert('ขอบคุณสำหรับข้อความของคุณ! เราจะติดต่อกลับโดยเร็วที่สุด');
            contactForm.reset();
        });
    }

    updateCartCount();
});