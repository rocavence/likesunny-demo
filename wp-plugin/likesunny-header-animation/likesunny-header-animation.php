<?php
/**
 * Plugin Name: LikeSunny Header Animation
 * Plugin URI: https://likesunny.com
 * Description: 在網站載入時顯示動畫 header，隱藏原有 header 直到動畫完成
 * Version: 1.0.0
 * Author: LikeSunny
 * License: GPL v2 or later
 */

if (!defined('ABSPATH')) {
    exit;
}

define('LIKESUNNY_HEADER_ANIMATION_URL', plugin_dir_url(__FILE__));
define('LIKESUNNY_HEADER_ANIMATION_PATH', plugin_dir_path(__FILE__));

class LikeSunnyHeaderAnimation {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
    }
    
    public function init() {
        // 只在前端顯示
        if (!is_admin()) {
            add_action('wp_head', array($this, 'add_early_styles'), 1);
            add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
            add_action('wp_footer', array($this, 'add_animation_html'));
        }
    }
    
    /**
     * 在 head 早期添加樣式，確保層級順序
     */
    public function add_early_styles() {
        ?>
        <style id="likesunny-header-layer">
        /* 保持原有 header 正常顯示，但在我們的動畫 header 下方 */
        .et-l--header,
        header,
        .site-header,
        .main-header {
            transition: opacity 0.3s ease !important;
        }
        
        /* 確保我們的動畫 header 在最上層，覆蓋原有 header */
        #likesunny-animation-header {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            z-index: 999999 !important;
        }
        </style>
        <?php
    }
    
    /**
     * 載入 CSS 和 JS 檔案
     */
    public function enqueue_assets() {
        wp_enqueue_style(
            'likesunny-header-animation-css',
            LIKESUNNY_HEADER_ANIMATION_URL . 'assets/css/header-animation.css',
            array(),
            '1.0.' . time()
        );
        
        wp_enqueue_script(
            'likesunny-header-animation-js',
            LIKESUNNY_HEADER_ANIMATION_URL . 'assets/js/header-animation.js',
            array('jquery'),
            '1.0.' . time(),
            true
        );
        
        // 傳遞資料到 JavaScript
        wp_localize_script(
            'likesunny-header-animation-js',
            'likesunny_header_data',
            array(
                'plugin_url' => LIKESUNNY_HEADER_ANIMATION_URL,
                'logo_large' => LIKESUNNY_HEADER_ANIMATION_URL . 'assets/images/logo-large.svg',
                'logo_small' => LIKESUNNY_HEADER_ANIMATION_URL . 'assets/images/logo-small.svg'
            )
        );
    }
    
    /**
     * 在 footer 添加動畫 HTML
     */
    public function add_animation_html() {
        ?>
        <div id="likesunny-animation-header" style="display: none;">
            <div class="likesunny-header-wrap">
                <div class="likesunny-outer-content-wrap">
                    <div class="likesunny-logo-column">
                        <img class="likesunny-logo-main" src="<?php echo LIKESUNNY_HEADER_ANIMATION_URL; ?>assets/images/logo-large.svg" alt="Logo">
                    </div>
                </div>
            </div>
        </div>
        <script>
        // 立即執行的檢查，避免閃現
        (function() {
            var shouldShow = false;
            var isReload = (performance.navigation && performance.navigation.type === 1) || 
                          (performance.getEntriesByType && 
                           performance.getEntriesByType('navigation')[0] && 
                           performance.getEntriesByType('navigation')[0].type === 'reload');
            
            if (isReload) {
                sessionStorage.removeItem('likesunny_animation_shown');
                shouldShow = true;
            } else if (!sessionStorage.getItem('likesunny_animation_shown')) {
                shouldShow = true;
            }
            
            if (shouldShow) {
                var animationHeader = document.getElementById('likesunny-animation-header');
                if (animationHeader) {
                    animationHeader.style.display = 'block';
                }
            }
        })();
        </script>
        <?php
    }
}

// 初始化 plugin
new LikeSunnyHeaderAnimation();