/* ===== 曉日制作 Header Logo 動畫 JavaScript ===== */

(function() {
    // 等待 DOM 和 jQuery 載入完成
    function initHeaderAnimation() {
        // 動畫狀態控制
        let hasTriggered = false;
        let isAnimating = false;
        let logoTransitionTimeout = null;
        
        function triggerLogoAnimation() {
            if (hasTriggered || isAnimating) return;
            
            hasTriggered = true;
            isAnimating = true;
            
            // 移除滾動監聽防止干擾
            window.removeEventListener('scroll', scrollHandler);
            
            // 添加動畫 class
            document.body.classList.add('logo-animated');
            
            // 等待尺寸動畫完成後切換 logo
            logoTransitionTimeout = setTimeout(() => {
                // 動畫完成後重新啟用互動
                setTimeout(() => {
                    isAnimating = false;
                }, 800);
            }, 2500);
        }
        
        function handleScroll() {
            if (hasTriggered || isAnimating) return;
            
            const scrollY = window.scrollY || window.pageYOffset;
            const header = document.getElementById('main-header');
            
            if (!header) return;
            
            const headerHeight = header.offsetHeight;
            
            // 當滾動超過 header 高度時觸發動畫
            if (scrollY > headerHeight) {
                triggerLogoAnimation();
            }
        }
        
        // 節流處理的滾動監聽器
        let ticking = false;
        
        function scrollHandler() {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
                setTimeout(() => ticking = false, 16);
            }
        }
        
        // 檢查是否在首頁
        function isHomePage() {
            return document.body.classList.contains('home') || 
                   window.location.pathname === '/' ||
                   window.location.pathname === '';
        }
        
        // 初始化函數
        function init() {
            // 只在首頁執行
            if (!isHomePage()) return;
            
            // 確保 logo 使用英文版本
            const logoImg = document.querySelector('#logo img');
            if (logoImg && !logoImg.src.includes('Logo_eng.svg')) {
                // 如果需要，可以動態替換 logo
                console.log('Logo animation initialized for homepage');
            }
            
            // 添加滾動監聽
            window.addEventListener('scroll', scrollHandler, { passive: true });
            
            console.log('曉日制作 Header Logo Animation loaded');
        }
        
        // 啟動初始化
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }
    
    // 等待 jQuery 和 Divi 載入完成
    if (typeof jQuery !== 'undefined') {
        jQuery(document).ready(function($) {
            // 確保 Divi 完成初始化後再執行
            setTimeout(initHeaderAnimation, 500);
        });
    } else {
        // 如果 jQuery 未載入，使用原生 JS
        initHeaderAnimation();
    }
})();