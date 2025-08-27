# 曉日制作 Header Logo 動畫效果

> 靈感來自 [Holte Studio](https://holte.studio/) 的 header logo 縮放動畫效果

## 📋 專案概述

本專案實現了一個優雅的 header logo 動畫效果，包含兩階段動畫：
1. **尺寸縮放**：Logo 從畫面寬度 80% 緩慢縮小至 212px
2. **漸變切換**：英文 logo 淡出，G3 標誌組合淡入，同時漢堡選單出現

## 🎯 功能特色

- ✨ **平滑動畫**：使用 cubic-bezier 緩動函數，提供自然流暢的動畫體驗
- 🔄 **兩階段切換**：尺寸縮放 (2.5秒) + logo 漸變 (0.8秒)
- 🎨 **顏色調整**：英文 logo 自動上色為 #777E6E
- 📱 **響應式設計**：適配不同螢幕尺寸
- 🚫 **防抖動機制**：一次性動畫，防止滾動干擾
- 🏠 **首頁專用**：僅在首頁觸發動畫效果

## 🎬 動畫時序

```
初始狀態 → 滾動觸發 → 尺寸縮放 → Logo 切換 → 最終狀態
  80vw        100px       2.5秒       0.8秒      212px
```

## 📁 檔案結構

```
likesunny-demo/
├── index.html                    # 完整 Demo 頁面
├── divi-header-animation.css     # WordPress Divi 主題 CSS
├── divi-header-animation.js      # WordPress Divi 主題 JavaScript
└── README.md                     # 專案文件
```

## 🔧 技術實作

### HTML 結構
```html
<div class="header-wrap normal-header">
    <div class="outer-content-wrap">
        <div class="logo-column">
            <img class="logo-main" src="Logo_eng.svg" alt="Logo">
            <img class="logo-small" src="標誌組合_G3.svg" alt="Logo Small">
        </div>
        <div class="menu-opener"></div>
    </div>
</div>
```

### 核心 CSS 動畫
```css
.logo-column img {
    transition: width 2500ms cubic-bezier(0.23, 1, 0.32, 1), 
                opacity 800ms ease-in-out;
}

/* 初始狀態 */
html.homepage-ready .logo-column img {
    width: 80vw;
}

/* 動畫觸發後 */
html.logo-transitioning .logo-column .logo-small {
    opacity: 1;
}
```

### JavaScript 邏輯
```javascript
// 滾動監聽與動畫觸發
function handleScroll() {
    const scrollY = window.scrollY;
    const headerHeight = document.querySelector('.header-wrap').offsetHeight;
    
    if (scrollY > headerHeight && !hasTriggered) {
        triggerLogoAnimation();
    }
}
```

## 🎨 視覺規格

| 屬性 | 初始值 | 最終值 | 動畫時間 |
|------|--------|--------|----------|
| Logo 寬度 | 80vw | 212px | 2500ms |
| Header Padding | 50px | 20px | 2000ms |
| Logo 透明度 | 1 → 0 → 1 | - | 800ms |
| 選單透明度 | 0 → 1 | - | 800ms |

## 🌐 WordPress Divi 整合

### 安裝步驟

1. **修改 Logo 設定**
   - 進入 WordPress 後台 → 外觀 → 客製化
   - 上傳英文版 logo：`Logo_eng.svg`

2. **添加 CSS 樣式**
   - 客製化 → 額外 CSS
   - 貼入 `divi-header-animation.css` 內容

3. **加入 JavaScript**
   - 安裝 "Insert Headers and Footers" 外掛
   - 或在子主題的 `functions.php` 中加入腳本

### Divi 特定調整

```css
/* 覆蓋 Divi 預設樣式 */
#main-header {
    position: sticky !important;
    transition: padding 2000ms cubic-bezier(0.23, 1, 0.32, 1);
}

#logo::after {
    background-image: url('標誌組合_G3.svg');
    background-size: contain;
    background-repeat: no-repeat;
}
```

## 🎭 動畫靈感來源

本專案靈感來自 [Holte Studio](https://holte.studio/) 的優雅 header 動畫：

### 分析重點
- **漸進式動畫**：從大到小的視覺層級變化
- **滑順過渡**：使用 cubic-bezier 緩動函數
- **功能性動畫**：動畫服務於使用者體驗
- **品牌一致性**：保持視覺識別的連續性

### 技術優化
- 使用 CSS transitions 而非 keyframes
- 避免 layout thrashing
- 實施防抖機制避免動畫衝突
- 響應式設計考量

## 🎯 使用場景

適合以下類型的網站使用：
- 🏢 品牌官網
- 🎨 創意工作室
- 📱 產品展示頁
- 💼 企業形象網站

## 📱 響應式設計

| 裝置 | Logo 初始寺寸 | Logo 最終尺寸 |
|------|---------------|---------------|
| 桌面版 | 80vw | 212px |
| 平板 | 90vw | 180px |
| 手機 | 95vw | 150px |

## 🔄 版本歷程

### v1.0.0 (2025-08-27)
- ✅ 完成基本動畫功能
- ✅ 實現兩階段動畫效果
- ✅ 添加防抖動機制
- ✅ 支援響應式設計
- ✅ 整合 WordPress Divi 主題

## 🚀 Demo 連結

- **Live Demo**: [https://rocavence.github.io/likesunny-demo/](https://rocavence.github.io/likesunny-demo/)
- **GitHub Repository**: [https://github.com/rocavence/likesunny-demo](https://github.com/rocavence/likesunny-demo)

## 📝 開發筆記

### 技術決策
1. **為什麼選擇 CSS transitions 而非 keyframes？**
   - 更好的性能表現
   - 易於控制動畫狀態
   - 更簡潔的代碼結構

2. **為什麼使用一次性動畫？**
   - 避免使用者滾動時的視覺干擾
   - 提供更專業的品牌體驗
   - 減少不必要的動畫重複

3. **為什麼使用 cubic-bezier(0.23, 1, 0.32, 1)？**
   - 提供自然的緩入緩出效果
   - 模擬真實物理運動
   - 增強視覺舒適度

### 效能優化
- 使用 `transform` 而非改變 `width/height`
- 實施 `requestAnimationFrame` 節流
- 避免強制回流 (forced reflow)
- 使用 `will-change` 提示瀏覽器優化

## 🛠️ 自訂選項

可以透過修改以下變數來調整動畫效果：

```css
:root {
    --logo-initial-width: 80vw;
    --logo-final-width: 212px;
    --animation-duration: 2500ms;
    --fade-duration: 800ms;
    --easing: cubic-bezier(0.23, 1, 0.32, 1);
}
```

## 📞 技術支援

如需技術支援或客製化需求，歡迎聯繫：
- **Email**: [聯絡信箱]
- **Website**: [https://likesunny.com](https://likesunny.com)

---

*本專案使用 Claude Code 協助開發 🤖*