// ===== MAIN JAVASCRIPT FOR DR. ARUN SAROHA WEBSITE =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== POP-UP MODAL FUNCTIONALITY =====
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const modalForm = document.getElementById('modalForm');

    // Show modal after 3 seconds
    setTimeout(() => {
        // Check if modal was already closed in this session
        if (!sessionStorage.getItem('modalClosed')) {
            modalOverlay.classList.add('active');
        }
    }, 3000);

    // Close modal when X is clicked
    closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        sessionStorage.setItem('modalClosed', 'true');
    });

    // Close modal when clicking outside the modal card
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            sessionStorage.setItem('modalClosed', 'true');
        }
    });

    // Handle modal form submission
    modalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! We will call you shortly to schedule your appointment.');
        modalForm.reset();
        modalOverlay.classList.remove('active');
        sessionStorage.setItem('modalClosed', 'true');
    });

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // ===== ANIMATED STATISTICS COUNTER =====
    function animateCounter(elementId, finalValue, duration = 2000) {
        const element = document.getElementById(elementId);
        let startValue = 0;
        const increment = finalValue / (duration / 16); // 60fps
        let currentValue = startValue;
        
        function updateCounter() {
            currentValue += increment;
            if (currentValue < finalValue) {
                element.textContent = Math.floor(currentValue);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = finalValue;
            }
        }
        
        updateCounter();
    }

    // Initialize counters when in view
    let countersInitialized = false;
    function initCounters() {
        if (!countersInitialized) {
            animateCounter('stat1', 25);
            animateCounter('stat2', 7000);
            animateCounter('stat3', 50);
            animateCounter('stat4', 98);
            countersInitialized = true;
        }
    }

    // ===== SERVICES DATA =====
    const servicesData = [
        {
            category: 'brain',
            icon: 'fas fa-brain',
            title: 'Brain Tumor Surgery',
            description: 'Advanced surgical removal of brain tumors using cutting-edge technology including neuronavigation and intraoperative monitoring for precision and safety.'
        },
        {
            category: 'spine',
            icon: 'fas fa-bone',
            title: 'Spinal Fusion Surgery',
            description: 'Treatment for spinal instability, deformities, or degenerative conditions using advanced fusion techniques to restore stability and relieve pain.'
        },
        {
            category: 'minimally',
            icon: 'fas fa-cut',
            title: 'Minimally Invasive Spine Surgery',
            description: 'State-of-the-art techniques using small incisions for faster recovery, less pain, and minimal tissue damage compared to traditional open surgery.'
        },
        {
            category: 'brain',
            icon: 'fas fa-head-side-virus',
            title: 'Neurotrauma Surgery',
            description: 'Emergency surgical interventions for head and spinal cord injuries to minimize damage and optimize recovery outcomes.'
        },
        {
            category: 'spine',
            icon: 'fas fa-user-injured',
            title: 'Scoliosis Correction',
            description: 'Comprehensive surgical correction of spinal deformities in children and adults using advanced instrumentation and techniques.'
        },
        {
            category: 'minimally',
            icon: 'fas fa-microscope',
            title: 'Endoscopic Spine Surgery',
            description: 'Ultra-minimally invasive procedures using an endoscope to treat herniated discs, spinal stenosis, and other conditions with minimal disruption.'
        },
        {
            category: 'brain',
            icon: 'fas fa-head-side-medical',
            title: 'Epilepsy Surgery',
            description: 'Surgical procedures to control or eliminate seizures in patients with epilepsy who do not respond to medication.'
        },
        {
            category: 'spine',
            icon: 'fas fa-wheelchair',
            title: 'Spinal Cord Injury Treatment',
            description: 'Comprehensive surgical and rehabilitative approaches for spinal cord injuries to maximize functional recovery.'
        }
    ];

    // ===== BLOG DATA =====
    const blogData = [
        {
            image: 'images/blog-1.jfif',
            date: 'May 15, 2023',
            readTime: '5 min read',
            title: 'Advancements in Minimally Invasive Spine Surgery',
            description: 'Exploring the latest techniques that are revolutionizing spine surgery, allowing for faster recovery and reduced pain for patients with spinal disorders.'
        },
        {
            image: "images\know-your-doctor.jpg",
            date: 'April 28, 2023',
            readTime: '7 min read',
            title: 'Understanding Brain Tumors: Symptoms & Treatment Options',
            description: 'A comprehensive guide to recognizing brain tumor symptoms and understanding the various surgical and non-surgical treatment options available today.'
        },
        {
            image: 'images\Whats_App_Image_2024_08_26_at_17_18_33_09be06e347.jpeg',
            date: 'March 10, 2023',
            readTime: '6 min read',
            title: 'Scoliosis in Adults: Diagnosis and Modern Treatment Approaches',
            description: 'While often associated with adolescents, scoliosis can also affect adults. Learn about diagnosis and the latest surgical correction techniques.'
        }
    ];

    // ===== INITIALIZE SERVICES =====
    function initializeServices() {
        const servicesGrid = document.getElementById('servicesGrid');
        
        // Clear existing content
        servicesGrid.innerHTML = '';
        
        // Create service cards
        servicesData.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.setAttribute('data-category', service.category);
            
            serviceCard.innerHTML = `
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <div class="service-content">
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                </div>
            `;
            
            servicesGrid.appendChild(serviceCard);
        });
        
        // Initialize service filtering
        initializeServiceFilter();
    }

    // ===== SERVICES FILTER =====
    function initializeServiceFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const serviceCards = document.querySelectorAll('.service-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                serviceCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hidden');
                        // Add animation
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ===== INITIALIZE BLOG =====
    function initializeBlog() {
        const blogGrid = document.getElementById('blogGrid');
        
        // Clear existing content
        blogGrid.innerHTML = '';
        
        // Create blog cards
        blogData.forEach(blog => {
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card';
            
            blogCard.innerHTML = `
                <div class="blog-image">
                    <img src="images\home.webp" alt="${blog.title}" loading="lazy">
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span><i class="far fa-calendar"></i> ${blog.date}</span>
                        <span><i class="far fa-clock"></i> ${blog.readTime}</span>
                    </div>
                    <h3>${blog.title}</h3>
                    <p>${blog.description}</p>
                    <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            
            blogGrid.appendChild(blogCard);
        });
    }

    // ===== TESTIMONIAL SLIDER =====
    function initializeTestimonialSlider() {
        const slides = document.querySelectorAll('.testimonial-slide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            currentSlide = index;
        }
        
        prevBtn.addEventListener('click', () => {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) newIndex = slides.length - 1;
            showSlide(newIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
        });

        // Auto-advance testimonials
        let slideInterval = setInterval(() => {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
        }, 5000);

        // Pause auto-advance on hover
        const slider = document.querySelector('.testimonial-slider');
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                let newIndex = currentSlide + 1;
                if (newIndex >= slides.length) newIndex = 0;
                showSlide(newIndex);
            }, 5000);
        });
    }

    // ===== CONSULTATION FORM SUBMISSION =====
    function initializeForms() {
        const consultationForm = document.getElementById('consultationForm');
        
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            
            if (!name || !email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send this data to a server
            alert('Thank you for your consultation request. Dr. Saroha\'s team will contact you within 24 hours.');
            consultationForm.reset();
        });
    }

    // ===== SMOOTH SCROLLING =====
    function initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== INTERSECTION OBSERVER FOR COUNTERS =====
    function initializeIntersectionObserver() {
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initCounters();
                }
            });
        }, observerOptions);
        
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    // ===== HEADER SCROLL EFFECT =====
    function initializeHeaderScrollEffect() {
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
            }
        });
    }

    // ===== SET CURRENT YEAR IN FOOTER =====
    function setCurrentYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // ===== INITIALIZE ALL COMPONENTS =====
    function initializeAll() {
        initializeServices();
        initializeBlog();
        initializeTestimonialSlider();
        initializeForms();
        initializeSmoothScrolling();
        initializeIntersectionObserver();
        initializeHeaderScrollEffect();
        setCurrentYear();
        
        console.log('Dr. Arun Saroha website initialized successfully!');
    }

    // Initialize everything
    initializeAll();
});