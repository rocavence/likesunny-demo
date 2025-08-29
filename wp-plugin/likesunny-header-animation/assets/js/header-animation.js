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
        // 檢查是否在首頁（通過body class判斷）
        const isHomePage = document.body.classList.contains('home') || 
                          document.body.classList.contains('front-page');
        
        if (!isHomePage) {
            console.log('LikeSunny: Not on home page, skipping animation');
            return;
        }
        
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
        
        // 初始化 et-main-area 推送
        initMainAreaPush();
        
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
    
    function initMainAreaPush() {
        const mainArea = document.querySelector('#et-main-area');
        if (!mainArea) {
            console.log('LikeSunny: et-main-area not found, skipping push functionality');
            return;
        }
        
        // 開始實時高度監控
        startHeightMonitoring();
    }
    
    function startHeightMonitoring() {
        const animationHeader = document.querySelector('#likesunny-animation-header');
        const mainArea = document.querySelector('#et-main-area');
        
        if (!animationHeader || !mainArea) return;
        
        // 使用 ResizeObserver 監控 header 高度變化
        const resizeObserver = new ResizeObserver(() => {
            updateMainAreaPosition();
        });
        
        resizeObserver.observe(animationHeader);
        
        // 初始設置
        updateMainAreaPosition();
        
        // 監控動畫狀態，第一階段完成後停止監控
        let monitoringActive = true;
        
        const checkPhase = setInterval(() => {
            const header = document.querySelector('.likesunny-header-wrap');
            if (header && header.classList.contains('shrunken') && monitoringActive) {
                // 等待2秒讓縮小動畫完成
                setTimeout(() => {
                    resizeObserver.disconnect();
                    monitoringActive = false;
                    clearInterval(checkPhase);
                    console.log('LikeSunny: Stopped height monitoring after first phase');
                }, 2000);
            }
            
            // 備用：完全動畫完成時也停止監控
            if (document.body.classList.contains('likesunny-animation-complete')) {
                resizeObserver.disconnect();
                monitoringActive = false;
                clearInterval(checkPhase);
            }
        }, 100);
    }
    
    function updateMainAreaPosition() {
        const animationHeader = document.querySelector('#likesunny-animation-header');
        const mainArea = document.querySelector('#et-main-area');
        
        if (!animationHeader || !mainArea) return;
        
        // 獲取當前 header 實際高度
        const headerHeight = animationHeader.offsetHeight;
        
        // 使用 header 高度 + 32px 作為間距
        const adjustedMargin = headerHeight + 32;
        
        // 設置 main area 的 margin-top
        mainArea.style.marginTop = adjustedMargin + 'px';
        
        console.log(`LikeSunny: Updated main area margin-top to ${adjustedMargin}px (header: ${headerHeight}px + 32px)`);
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
        
        // 2秒後第一階段完成，et-main-area 設為最終高度 + 32px
        setTimeout(() => {
            const mainArea = document.querySelector('#et-main-area');
            if (mainArea) {
                // 最終狀態：縮小後的header高度 + 32px 間距
                const finalHeaderHeight = 80; // 縮小後約80px高度
                const adjustedMargin = finalHeaderHeight + 32;
                mainArea.style.marginTop = adjustedMargin + 'px';
                console.log(`LikeSunny: First animation phase complete, main area adjusted to ${adjustedMargin}px (${finalHeaderHeight}px + 32px)`);
            }
        }, 2000);
        
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