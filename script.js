document.addEventListener('DOMContentLoaded', () => {
    // Scroll Fade Up Animations using IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Trigger counters animation inside this section
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // ms
                    const updateRate = 16;
                    const stepValue = Math.max(1, Math.ceil(target / (duration / updateRate)));
                    
                    if (counter.innerText === "0") {
                        let current = 0;
                        const timer = setInterval(() => {
                            current += stepValue;
                            if (current >= target) {
                                counter.innerText = target.toLocaleString();
                                clearInterval(timer);
                            } else {
                                counter.innerText = current.toLocaleString();
                            }
                        }, updateRate);
                    }
                });
                
                // Trigger Progress bars inside this section
                const progressBars = entry.target.querySelectorAll('.js-progress');
                progressBars.forEach(bar => {
                    setTimeout(() => {
                        bar.style.width = bar.getAttribute('data-width');
                    }, 400); // slight delay for synchronized cascade
                });

                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial observation of all elements with fade-up class
    document.querySelectorAll('.animate-fade-up').forEach(section => {
        observer.observe(section);
    });

    // Active Nav Link Highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
