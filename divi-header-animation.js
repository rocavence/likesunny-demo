(function() {
    function initHeaderAnimation() {
        let hasTriggered = false, isAnimating = false;
        
        function triggerLogoAnimation() {
            if (hasTriggered || isAnimating) return;
            hasTriggered = true;
            isAnimating = true;
            
            window.removeEventListener('scroll', scrollHandler);
            document.body.classList.add('logo-animated');
            
            setTimeout(() => isAnimating = false, 3300);
        }
        
        function handleScroll() {
            if (hasTriggered || isAnimating) return;
            
            const header = document.getElementById('main-header');
            if (!header) return;
            
            if ((window.scrollY || window.pageYOffset) > header.offsetHeight) {
                triggerLogoAnimation();
            }
        }
        
        let ticking = false;
        function scrollHandler() {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
                setTimeout(() => ticking = false, 16);
            }
        }
        
        function init() {
            const isHome = document.body.classList.contains('home') || 
                          window.location.pathname === '/' ||
                          window.location.pathname === '';
            
            if (!isHome) return;
            
            window.addEventListener('scroll', scrollHandler, { passive: true });
        }
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }
    
    if (typeof jQuery !== 'undefined') {
        jQuery(document).ready(() => setTimeout(initHeaderAnimation, 500));
    } else {
        initHeaderAnimation();
    }
})();