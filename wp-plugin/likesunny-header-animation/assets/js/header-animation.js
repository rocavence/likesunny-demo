/**
 * LikeSunny Header Animation JavaScript
 */
(function($) {
    'use strict';
    
    let hasTriggered = false;
    let isAnimating = false;
    
    // 等待 DOM 載入完成
    $(document).ready(function() {
        initHeaderAnimation();
    });
    
    function initHeaderAnimation() {
        // 確保動畫元素存在
        const animationHeader = document.querySelector('#likesunny-animation-header');
        if (!animationHeader) {
            console.error('LikeSunny: Animation header element not found');
            showOriginalHeader();
            return;
        }
        
        // 檢查元素是否可見（由 inline script 控制）
        if (animationHeader.style.display === 'none') {
            console.log('LikeSunny: Animation header is hidden, not starting animation');
            return;
        }
        
        // 標記動畫已顯示
        markAnimationShown();
        
        // 3秒後自動開始動畫（如果沒有被滾動觸發）
        setTimeout(() => {
            if (!hasTriggered && !isAnimating) {
                triggerAnimation();
            }
        }, 3000);
        
        // 監聽滾動事件
        window.addEventListener('scroll', scrollHandler);
    }
    
    
    function markAnimationShown() {
        sessionStorage.setItem('likesunny_animation_shown', 'true');
    }
    
    function triggerAnimation() {
        if (hasTriggered || isAnimating) return;
        
        hasTriggered = true;
        isAnimating = true;
        
        console.log('LikeSunny: Starting header animation');
        
        const header = document.querySelector('.likesunny-header-wrap');
        const logoColumn = document.querySelector('.likesunny-logo-column');
        
        if (!header || !logoColumn) {
            console.error('LikeSunny: Required animation elements not found');
            showOriginalHeader();
            return;
        }
        
        // 移除滾動監聽器
        window.removeEventListener('scroll', scrollHandler);
        
        // 第一階段：縮小 logo
        logoColumn.classList.add('shrink');
        header.classList.add('shrunken');
        
        // 第二階段：3秒後隱藏 header，顯示原有 header
        setTimeout(() => {
            // 開始淡出我們的 header
            header.classList.add('hidden');
            
            // 再等0.6秒讓淡出動畫完成，然後完成動畫
            setTimeout(() => {
                completeAnimation();
                isAnimating = false;
            }, 600);
        }, 3000);
    }
    
    function completeAnimation() {
        // 標記動畫完成，隱藏我們的動畫 header
        document.body.classList.add('likesunny-animation-complete');
        
        // 確保動畫 header 完全不影響點擊
        const animationHeader = document.querySelector('#likesunny-animation-header');
        if (animationHeader) {
            animationHeader.style.display = 'none';
            animationHeader.style.pointerEvents = 'none';
            animationHeader.style.zIndex = '-1';
        }
        
        console.log('LikeSunny: Animation completed, original header now visible and clickable');
    }
    
    function showOriginalHeader() {
        // 這個函數現在用於錯誤處理的情況
        completeAnimation();
    }
    
    function handleScroll() {
        if (!hasTriggered && !isAnimating && window.scrollY > 80) {
            triggerAnimation();
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
    
    // 錯誤處理：如果動畫卡住，5秒後強制顯示原有 header
    setTimeout(() => {
        if (!document.body.classList.contains('likesunny-animation-complete')) {
            console.warn('LikeSunny: Animation timeout, forcing original header display');
            showOriginalHeader();
        }
    }, 8000);
    
})(jQuery);