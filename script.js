document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // STICKY HEADER EFFECT
    // ==========================================================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(8, 16, 30, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(8, 16, 30, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // ==========================================================================
    // COUNTDOWN TIMER
    // ==========================================================================
    const countdownElement = document.getElementById('countdown');
    const targetDateStr = countdownElement.getAttribute('data-date');
    const targetDate = new Date(targetDateStr).getTime();
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;
        
        if (difference < 0) {
            // If the webinar date has passed, show zeroed numbers or custom message
            clearInterval(countdownInterval);
            if (daysEl) daysEl.innerText = "00";
            if (hoursEl) hoursEl.innerText = "00";
            if (minutesEl) minutesEl.innerText = "00";
            if (secondsEl) secondsEl.innerText = "00";
            
            const countdownTitle = document.querySelector('.countdown-wrapper h3');
            if (countdownTitle) {
                countdownTitle.innerText = "Webinar Sedang/Telah Berlangsung!";
                countdownTitle.style.color = "#9CFF00";
            }
            return;
        }
        
        // Time calculations
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Output formatting
        if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
        if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }
    
    // Run once initially and then every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // ==========================================================================
    // FAQ ACCORDION COLLAPSE/EXPAND
    // ==========================================================================
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const currentItem = trigger.parentElement;
            const isActive = currentItem.classList.contains('active');
            
            // Close all active items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const content = item.querySelector('.faq-content');
                content.style.maxHeight = null;
            });
            
            // Toggle current item
            if (!isActive) {
                currentItem.classList.add('active');
                const content = currentItem.querySelector('.faq-content');
                // Set max-height to scrollHeight to animate correctly
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // ==========================================================================
    // META PIXEL CLICK EVENT TRACKING
    // ==========================================================================
    // Helper function to safe track events
    function trackFbEvent(eventName, isCustom = false, eventData = {}) {
        if (typeof fbq === 'function') {
            if (isCustom) {
                fbq('trackCustom', eventName, eventData);
            } else {
                fbq('track', eventName, eventData);
            }
            console.log(`Facebook Pixel: tracked ${isCustom ? 'custom' : 'standard'} event "${eventName}"`, eventData);
        } else {
            console.warn(`Facebook Pixel: fbq is not loaded. Event "${eventName}" not tracked.`);
        }
    }

    // 1. Klik "Daftar webinar" (navbar CTA)
    const navDaftarBtn = document.getElementById('fb-track-nav-daftar');
    if (navDaftarBtn) {
        navDaftarBtn.addEventListener('click', () => {
            trackFbEvent('InitiateCheckout', false, { content_name: 'Daftar Webinar Navbar' });
            trackFbEvent('ClickDaftarWebinar', true, { position: 'navbar' });
        });
    }

    // 2. Klik "Daftar webinar sekarang" (Hero CTA)
    const heroDaftarBtn = document.getElementById('fb-track-hero-daftar');
    if (heroDaftarBtn) {
        heroDaftarBtn.addEventListener('click', () => {
            trackFbEvent('InitiateCheckout', false, { content_name: 'Daftar Webinar Hero' });
            trackFbEvent('ClickDaftarWebinarSekarangHero', true, { position: 'hero' });
        });
    }

    // 3. Klik "Saya mau ikut webinar sekarang" (Countdown CTA)
    const countdownDaftarBtn = document.getElementById('fb-track-countdown-daftar');
    if (countdownDaftarBtn) {
        countdownDaftarBtn.addEventListener('click', () => {
            trackFbEvent('InitiateCheckout', false, { content_name: 'Saya Mau Ikut Webinar Sekarang' });
            trackFbEvent('ClickSayaMauIkutWebinar', true, { position: 'countdown' });
        });
    }

    // 4. Klik "Daftar webinar sekarang (Rp99K)" (Closing CTA)
    const closingDaftarBtn = document.getElementById('fb-track-closing-daftar');
    if (closingDaftarBtn) {
        closingDaftarBtn.addEventListener('click', () => {
            trackFbEvent('InitiateCheckout', false, { content_name: 'Daftar Webinar Sekarang Rp99K' });
            trackFbEvent('ClickDaftarWebinarSekarangClosing', true, { position: 'closing' });
        });
    }

    // 5. Klik "konsultasi via WhatsApp" sebagai leads (event "Lead")
    const whatsappBtns = document.querySelectorAll('.fb-track-whatsapp');
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            trackFbEvent('Lead', false, { content_name: 'Konsultasi WhatsApp' });
            trackFbEvent('ClickConsultationWhatsApp', true);
        });
    });

    // Handle scroll reveal effects for elements slightly
    const scrollRevealElements = document.querySelectorAll('.problem-card, .step-card, .scenario-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    scrollRevealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
