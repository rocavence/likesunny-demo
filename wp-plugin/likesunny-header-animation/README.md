# LikeSunny Header Animation Plugin

🎬 **專業的 WordPress 動畫載入插件**，為網站提供優雅的 header 動畫效果，打造令人印象深刻的首次訪問體驗。

![WordPress](https://img.shields.io/badge/WordPress-5.0+-blue)
![PHP](https://img.shields.io/badge/PHP-7.4+-green)
![License](https://img.shields.io/badge/License-GPL%20v2-orange)
![Version](https://img.shields.io/badge/Version-1.2.0-purple)

## ✨ 功能特色

### 🎯 **智能顯示控制**
- **單次會話顯示**：每個瀏覽器分頁會話期間僅顯示一次動畫
- **手動重載檢測**：用戶手動重新整理（F5/Cmd+R）時重新播放
- **站內導航優化**：瀏覽網站其他頁面時不重複播放
- **零閃現技術**：使用立即執行腳本避免動畫 header 閃現

### 🎨 **視覺效果**
- **雙階段動畫**：Logo 縮小 + Header 淡出的流暢過渡
- **響應式設計**：完美適應桌面、平板、手機等不同螢幕
- **高度限制**：動畫 header 最大高度 216px，超寬螢幕自動調整
- **優雅陰影**：專業的 `box-shadow` 效果提升視覺質感

### 🔧 **技術優勢**
- **性能優化**：使用 `requestAnimationFrame` 優化滾動監聽
- **容錯機制**：8秒超時保護，確保網站正常使用
- **Divi 主題整合**：針對 Divi 主題完美適配
- **SEO 友好**：不影響搜索引擎爬蟲和網站載入速度

## 🚀 快速安裝

### 方法一：直接上傳
1. 下載本 repository 中的 `likesunny-header-animation` 資料夾
2. 上傳至 WordPress 的 `/wp-content/plugins/` 目錄
3. 在 WordPress 管理後台「插件」頁面啟用

### 方法二：Git Clone
```bash
cd /path/to/wordpress/wp-content/plugins/
git clone https://github.com/yourusername/likesunny-header-animation.git
```

## 📁 檔案結構

```
likesunny-header-animation/
├── 📄 likesunny-header-animation.php    # 主插件檔案
├── 📂 assets/
│   ├── 📂 css/
│   │   └── 🎨 header-animation.css      # 動畫樣式表
│   ├── 📂 js/
│   │   └── ⚡ header-animation.js       # 動畫邏輯腳本
│   └── 📂 images/
│       ├── 🖼️ logo-large.svg           # 大尺寸 Logo
│       └── 🖼️ logo-small.svg           # 小尺寸 Logo（備用）
├── 📖 README.md                         # 說明文件
└── 📄 LICENSE                           # 授權條款
```

## 🎬 動畫流程

### 智能顯示邏輯
```
用戶訪問 → 檢查會話狀態 → 
├─ 首次訪問/手動重載 → 播放動畫
└─ 站內導航 → 直接顯示原生 Header
```

### 詳細時序
1. **⚡ 0.0s**：頁面載入，立即執行顯示邏輯
2. **🎯 0.0-3.0s**：顯示大尺寸 Logo，等待用戶滾動或自動觸發
3. **📏 3.0-5.0s**：Logo 縮小動畫（80vw → 302px）
4. **⏳ 5.0-6.0s**：等待期，準備原生 header
5. **🌅 6.0-6.6s**：動畫 header 淡出，原生 header 顯示

## ⚙️ 技術規格

### 相容性
- **WordPress**：5.0 或更高版本
- **PHP**：7.4 或更高版本  
- **主題**：Divi（完美支援），其他主題（通用支援）
- **瀏覽器**：Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

### 性能數據
- **資源大小**：CSS < 5KB, JS < 8KB, Images < 50KB
- **載入時間**：< 100ms 額外載入時間
- **記憶體使用**：< 1MB 運行時記憶體
- **CPU 影響**：僅在動畫期間有輕微影響

## 🛠️ 自訂設定

### CSS 樣式調整
```css
/* 修改動畫 header 高度 */
#likesunny-animation-header {
    height: 300px !important; /* 預設 216px */
}

/* 調整 Logo 最大寬度 */
#likesunny-animation-header .likesunny-logo-column {
    width: min(80vw, 1000px) !important; /* 預設 800px */
}

/* 自訂陰影效果 */
#likesunny-animation-header .likesunny-header-wrap {
    box-shadow: 0px 8px 24px rgba(0,0,0,0.2) !important;
}
```

### JavaScript 邏輯調整
```javascript
// 修改自動觸發時間（預設 3000ms）
setTimeout(() => {
    if (!hasTriggered && !isAnimating) {
        triggerAnimation();
    }
}, 5000); // 改為 5 秒

// 修改滾動觸發距離（預設 320px）
if (!hasTriggered && !isAnimating && window.scrollY > 500) {
    triggerAnimation();
}
```

## 🐛 故障排除

### 常見問題

**Q: 動畫不顯示怎麼辦？**
A: 檢查以下項目：
- 確認 plugin 已啟用
- 檢查瀏覽器 console 是否有錯誤
- 確認 logo 檔案路徑正確
- 清除瀏覽器快取

**Q: 原生 header 無法點擊？**  
A: 這通常是 z-index 衝突，請檢查：
- 確認使用最新版本 plugin
- 檢查是否有其他 plugin 衝突
- 嘗試停用其他 header 相關 plugin

**Q: 手機版顯示異常？**
A: 檢查響應式設定：
- 確認 viewport meta tag 正確
- 檢查主題的 mobile menu 是否衝突
- 調整 CSS 中的 @media 查詢

### Debug 模式
在瀏覽器 console 中執行：
```javascript
// 查看動畫狀態
console.log('Animation shown:', sessionStorage.getItem('likesunny_animation_shown'));

// 強制重播動畫
sessionStorage.removeItem('likesunny_animation_shown');
location.reload();
```

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

### 開發環境設置
```bash
# 複製 repository
git clone https://github.com/yourusername/likesunny-header-animation.git

# 進入專案目錄
cd likesunny-header-animation

# 建立開發分支
git checkout -b feature/your-feature-name
```

### 代碼規範
- **PHP**：遵循 WordPress Coding Standards
- **JavaScript**：ES6+ 語法，使用 JSDoc 註解
- **CSS**：BEM 命名規範，mobile-first 設計

## 📄 授權條款

本專案採用 [GPL v2](LICENSE) 授權條款。

## 🔄 版本歷史

### v1.2.0 (2024-12-XX)
- ✨ 新增智能會話控制，避免重複播放
- 🐛 修復站內導航時的閃現問題  
- 🎨 優化響應式設計和陰影效果
- 🔧 加強錯誤處理和性能優化

### v1.1.0 (2024-11-XX) 
- 📱 完善響應式支援
- 🎯 新增高度限制和 logo 尺寸控制
- ⚡ 效能優化和記憶體使用改善

### v1.0.0 (2024-10-XX)
- 🎉 初始版本發布
- 🎬 基礎動畫功能
- 📱 響應式設計支援

## 💝 致謝

感謝所有為此專案貢獻的開發者和使用者。

---

Made with ❤️ by [LikeSunny Team](https://likesunny.com)