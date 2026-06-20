document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // STICKY HEADER EFFECT (DESKTOP NAVBAR BACKGROUND)
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
    // SYNCHRONIZED COUNTDOWN TIMERS
    // ==========================================================================
    // Target date: Kamis, 25 Juni 2026, 20:00 WIB (UTC+7)
    const targetDate = new Date("2026-06-25T20:00:00+07:00").getTime();
    
    // Hero Elements
    const heroDays = document.getElementById('hero-days');
    const heroHours = document.getElementById('hero-hours');
    const heroMinutes = document.getElementById('hero-minutes');
    const heroSeconds = document.getElementById('hero-seconds');
    
    // Details Elements
    const detailsDays = document.getElementById('details-days');
    const detailsHours = document.getElementById('details-hours');
    const detailsMinutes = document.getElementById('details-minutes');
    const detailsSeconds = document.getElementById('details-seconds');
    
    // Sticky Mobile Bar Element
    const stickyCountdownTimer = document.getElementById('sticky-countdown-timer');
    
    function updateCountdowns() {
        const now = new Date().getTime();
        const difference = targetDate - now;
        
        if (difference < 0) {
            clearInterval(countdownInterval);
            
            // Set all timers to zero
            const zeroTime = "00";
            if (heroDays) heroDays.innerText = zeroTime;
            if (heroHours) heroHours.innerText = zeroTime;
            if (heroMinutes) heroMinutes.innerText = zeroTime;
            if (heroSeconds) heroSeconds.innerText = zeroTime;
            
            if (detailsDays) detailsDays.innerText = zeroTime;
            if (detailsHours) detailsHours.innerText = zeroTime;
            if (detailsMinutes) detailsMinutes.innerText = zeroTime;
            if (detailsSeconds) detailsSeconds.innerText = zeroTime;
            
            if (stickyCountdownTimer) stickyCountdownTimer.innerText = "Webinar Dimulai!";
            return;
        }
        
        // Calculations
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Formatting
        const formattedDays = days < 10 ? '0' + days : days;
        const formattedHours = hours < 10 ? '0' + hours : hours;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
        
        // Render Hero Countdown
        if (heroDays) heroDays.innerText = formattedDays;
        if (heroHours) heroHours.innerText = formattedHours;
        if (heroMinutes) heroMinutes.innerText = formattedMinutes;
        if (heroSeconds) heroSeconds.innerText = formattedSeconds;
        
        // Render Details Box Countdown
        if (detailsDays) detailsDays.innerText = formattedDays;
        if (detailsHours) detailsHours.innerText = formattedHours;
        if (detailsMinutes) detailsMinutes.innerText = formattedMinutes;
        if (detailsSeconds) detailsSeconds.innerText = formattedSeconds;
        
        // Render Sticky Mobile Bar Countdown (Format: "03 Hari : 12 Jam")
        if (stickyCountdownTimer) {
            stickyCountdownTimer.innerText = `${formattedDays} Hari : ${formattedHours} Jam`;
        }
    }
    
    // Init countdown
    updateCountdowns();
    const countdownInterval = setInterval(updateCountdowns, 1000);

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
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // ==========================================================================
    // META PIXEL CLICK EVENT TRACKING
    // ==========================================================================
    function trackFbCheckoutEvent(buttonPosition) {
        if (typeof fbq === 'function') {
            fbq('track', 'InitiateCheckout', {
                content_name: 'Pendaftaran Webinar Karyawan AI',
                content_category: 'Webinar',
                value: 99000,
                currency: 'IDR',
                position: buttonPosition
            });
            // Track custom event for precise dashboard analytics
            fbq('trackCustom', 'ClickDaftarWebinar', {
                button_position: buttonPosition
            });
            console.log(`Meta Pixel: Tracked InitiateCheckout from "${buttonPosition}"`);
        } else {
            console.warn(`Meta Pixel: fbq not loaded. Event from "${buttonPosition}" not tracked.`);
        }
    }

    // 1. Navbar "Daftar Webinar" click
    const navBtn = document.getElementById('fb-track-nav-daftar');
    if (navBtn) {
        navBtn.addEventListener('click', () => trackFbCheckoutEvent('navbar'));
    }

    // 2. Hero "Daftar Webinar Sekarang" click
    const heroBtn = document.getElementById('fb-track-hero-daftar');
    if (heroBtn) {
        heroBtn.addEventListener('click', () => trackFbCheckoutEvent('hero'));
    }

    // 3. Section 6 Details "Daftar Webinar Sekarang" click
    const countdownBtn = document.getElementById('fb-track-countdown-daftar');
    if (countdownBtn) {
        countdownBtn.addEventListener('click', () => trackFbCheckoutEvent('details'));
    }

    // 4. Section 8 Closing "Daftar Webinar Sekarang" click
    const closingBtn = document.getElementById('fb-track-closing-daftar');
    if (closingBtn) {
        closingBtn.addEventListener('click', () => trackFbCheckoutEvent('closing'));
    }

    // 5. Sticky Bottom Mobile "Daftar Webinar" click
    const stickyBtn = document.getElementById('fb-track-sticky-daftar');
    if (stickyBtn) {
        stickyBtn.addEventListener('click', () => trackFbCheckoutEvent('sticky-mobile'));
    }

    // ==========================================================================
    // SCROLL REVEAL ANIMATIONS (MOBILE FRIENDLY)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.problem-simple-card, .material-card, .audience-card-item, .video-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.05
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(el);
    });
});
