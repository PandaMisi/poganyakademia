// Mobil menü kapcsoló
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Mobil menü bezárása linkre kattintáskor
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            });
        });
    }

    // Fejléc scroll effekt
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Update active nav item based on scroll position
            updateActiveNavItem();
        });

        // Initialize header state
        header.classList.toggle('scrolled', window.scrollY > 100);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav item
                updateActiveNavItem(targetId);
            }
        });
    });

    // Function to update active nav item
    function updateActiveNavItem(targetId = null) {
        if (targetId) {
            // If targetId is provided, use that
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === targetId) {
                    link.classList.add('active');
                }
            });
        } else {
            // Otherwise, determine based on scroll position
            const sections = document.querySelectorAll('section');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - 100)) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Initialize active nav item
    updateActiveNavItem();

    // Galéria modal functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="" alt="" class="modal-image">
                <div class="image-caption"></div>
            </div>
        `;
        document.body.appendChild(modal);

        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const imgAlt = this.querySelector('img').alt;
                
                modal.querySelector('.modal-image').src = imgSrc;
                modal.querySelector('.modal-image').alt = imgAlt;
                modal.querySelector('.image-caption').textContent = imgAlt;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    // Back to Top Button
    // document.addEventListener('DOMContentLoaded', function() {
    //     const backToTopBtn = document.getElementById('backToTopBtn');
        
    //     function toggleBackToTop() {
    //         if (window.scrollY > 300) {
    //             backToTopBtn.classList.add('visible');
    //         } else {
    //             backToTopBtn.classList.remove('visible');
    //         }
    //     }

    //     // Initial check
    //     toggleBackToTop();

    //     // Listen for scroll events
    //     window.addEventListener('scroll', toggleBackToTop);

    //     // Click handler
    //     backToTopBtn.addEventListener('click', function() {
    //         window.scrollTo({
    //             top: 0,
    //             behavior: 'smooth'
    //         });
    //     });
    // });
});

