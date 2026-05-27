// ===== Carousel =====
class Carousel {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelector('.carousel-slides');
        this.slideList = container.querySelectorAll('.carousel-slide');
        this.dots = container.querySelectorAll('.dot');
        this.prevBtn = container.querySelector('.prev');
        this.nextBtn = container.querySelector('.next');
        this.currentIndex = 0;
        this.totalSlides = this.slideList.length;
        this.autoTimer = null;
        this.init();
    }

    init() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

        this.dots.forEach((dot, i) => {
            dot.addEventListener('click', () => this.goTo(i));
        });

        this.container.addEventListener('mouseenter', () => this.stopAuto());
        this.container.addEventListener('mouseleave', () => this.startAuto());

        let sx = 0;
        this.container.addEventListener('touchstart', e => { sx = e.touches[0].clientX; this.stopAuto(); }, { passive: true });
        this.container.addEventListener('touchend', e => {
            const diff = sx - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
            this.startAuto();
        }, { passive: true });

        this.startAuto();
    }

    goTo(index) {
        if (index < 0) index = this.totalSlides - 1;
        if (index >= this.totalSlides) index = 0;
        this.currentIndex = index;
        this.slides.style.transform = `translateX(-${index * 100}%)`;
        this.dots.forEach(d => d.classList.remove('active'));
        this.dots[index].classList.add('active');
    }

    prev() { this.goTo(this.currentIndex - 1); }
    next() { this.goTo(this.currentIndex + 1); }

    startAuto() { if (!this.autoTimer) this.autoTimer = setInterval(() => this.next(), 4000); }
    stopAuto() { clearInterval(this.autoTimer); this.autoTimer = null; }
}

// ===== Mobile menu =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// ===== Contact form =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn');
        const text = btn.textContent;
        btn.textContent = '发送中 …';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = '✓ 已发送';
            setTimeout(() => {
                btn.textContent = text;
                btn.disabled = false;
                form.reset();
            }, 2000);
        }, 1000);
    });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-container');
    if (carousel) new Carousel(carousel);

    initMobileMenu();
    initContactForm();
});
