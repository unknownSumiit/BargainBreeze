document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Modal Logic
    const modalOverlay = document.getElementById('coupon-modal');
    const modalClose = document.querySelector('.modal-close');
    const getDealBtns = document.querySelectorAll('.get-deal-btn');
    const copyCodeBtn = document.getElementById('copy-code-btn');
    const couponCodeDisplay = document.getElementById('modal-coupon-code');

    if (modalOverlay && getDealBtns.length > 0) {
        getDealBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const code = btn.getAttribute('data-code');
                const title = btn.getAttribute('data-title');
                
                if (code) {
                    couponCodeDisplay.textContent = code;
                    document.getElementById('modal-title').textContent = title || 'Your Coupon Code';
                    modalOverlay.classList.add('active');
                    if (copyCodeBtn) {
                        copyCodeBtn.textContent = 'Copy Code';
                    }
                } else {
                    // It's a deal without a code, maybe redirect or show different modal
                    window.location.href = '#'; // placeholder for actual redirect
                }
            });
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // Copy to Clipboard
    if (copyCodeBtn && couponCodeDisplay) {
        copyCodeBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(couponCodeDisplay.textContent);
                copyCodeBtn.textContent = 'Copied!';
            } catch (err) {
                console.error('Failed to copy text: ', err);
                copyCodeBtn.textContent = 'Failed to copy';
            }
        });
    }

    // Filter logic for stores/categories (simple client-side)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterableItems = document.querySelectorAll('.filterable-item');

    if (filterBtns.length > 0 && filterableItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                filterableItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Search filtering
    const searchInput = document.getElementById('search-input');
    if (searchInput && filterableItems.length > 0) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterableItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Newsletter Validation
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input[type="email"]');
            if (input && input.value.trim() !== '') {
                alert('Thank you for subscribing to BargainBreeze!');
                input.value = '';
            }
        });
    }
});
