# Elfsight Custom CSS & JS Code

## Wichtige Hinweise

**Wo einfügen?**
1. Gehe zu deinem [Elfsight Dashboard](https://dash.elfsight.com/apps)
2. Öffne dein Blog Widget
3. Klicke auf **"Settings"** oder **"Einstellungen"**
4. Scrolle nach unten zu **"Custom CSS"** und **"Custom JS"**
5. Füge die Codes dort ein

**Hinweis zu Selektoren:**
- Im Custom CSS Editor von Elfsight brauchst du **KEINE** spezifischen Widget-IDs
- Verwende die Standard-Elfsight-Klassen (`.eapps-blog-...`)
- Der CSS Code wird automatisch auf dein Widget angewendet

## Custom CSS
Füge diesen CSS Code in Elfsight ein:

**Wichtig:** Der CSS Code wird direkt im Elfsight Dashboard eingefügt und wirkt auf das Widget. Die Widget-ID wird automatisch ersetzt, daher musst du **nicht** `.elfsight-app-...` verwenden.

```css
/* Main Container - Use root selectors that work within Elfsight */
:host,
.eapps-blog {
  background: transparent !important;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif !important;
}

/* Widget Container */
.eapps-blog-posts,
.eapps-blog-posts-container {
  background: transparent !important;
}

/* Blog Post Cards */
.eapps-blog-posts-item,
.eapps-blog-post-card {
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
  backdrop-filter: blur(10px) !important;
  transition: all 0.3s ease !important;
  overflow: hidden !important;
}

.eapps-blog-posts-item:hover,
.eapps-blog-post-card:hover {
  background: rgba(255, 255, 255, 0.05) !important;
  border-color: #FF6B35 !important;
  transform: translateY(-4px) !important;
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.2) !important;
}

/* Typography */
.eapps-blog-post-title,
.eapps-blog-posts-item-title {
  color: #ffffff !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em !important;
  line-height: 1.3 !important;
}

.eapps-blog-post-description,
.eapps-blog-posts-item-description,
.eapps-blog-post-text {
  color: rgba(255, 255, 255, 0.7) !important;
  line-height: 1.6 !important;
}

.eapps-blog-post-date,
.eapps-blog-posts-item-date {
  color: rgba(255, 255, 255, 0.5) !important;
  font-size: 0.875rem !important;
}

/* Read More Button */
.eapps-blog-post-button,
.eapps-blog-posts-item-button,
.eapps-blog-read-more {
  background: #FF6B35 !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 9999px !important;
  padding: 10px 24px !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
  text-transform: none !important;
}

.eapps-blog-post-button:hover,
.eapps-blog-posts-item-button:hover,
.eapps-blog-read-more:hover {
  background: #ff5722 !important;
  transform: scale(1.05) !important;
  box-shadow: 0 4px 20px rgba(255, 107, 53, 0.4) !important;
}

/* Images */
.eapps-blog-post-image img,
.eapps-blog-posts-item-image img {
  border-radius: 8px !important;
  transition: transform 0.3s ease !important;
}

.eapps-blog-posts-item:hover .eapps-blog-posts-item-image img,
.eapps-blog-post-card:hover .eapps-blog-post-image img {
  transform: scale(1.05) !important;
}

/* Categories/Tags */
.eapps-blog-post-category,
.eapps-blog-posts-item-category,
.eapps-blog-post-tag {
  background: rgba(255, 107, 53, 0.2) !important;
  color: #FF6B35 !important;
  border: 1px solid rgba(255, 107, 53, 0.3) !important;
  border-radius: 6px !important;
  padding: 4px 12px !important;
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
}

/* Pagination */
.eapps-blog-pagination-button,
.eapps-pagination-button {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  transition: all 0.3s ease !important;
}

.eapps-blog-pagination-button:hover,
.eapps-pagination-button:hover {
  background: #FF6B35 !important;
  border-color: #FF6B35 !important;
  transform: translateY(-2px) !important;
}

.eapps-blog-pagination-button.active,
.eapps-pagination-button.active {
  background: #FF6B35 !important;
  border-color: #FF6B35 !important;
  color: #ffffff !important;
}

/* Search Bar */
.eapps-blog-search-input,
.eapps-search-input {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #ffffff !important;
  border-radius: 12px !important;
  padding: 12px 20px !important;
  transition: all 0.3s ease !important;
}

.eapps-blog-search-input:focus,
.eapps-search-input:focus {
  background: rgba(255, 255, 255, 0.08) !important;
  border-color: #FF6B35 !important;
  outline: none !important;
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1) !important;
}

.eapps-blog-search-input::placeholder,
.eapps-search-input::placeholder {
  color: rgba(255, 255, 255, 0.4) !important;
}

/* Loading State */
.eapps-loading,
.eapps-spinner {
  border-color: rgba(255, 255, 255, 0.2) !important;
  border-top-color: #FF6B35 !important;
}

/* Scrollbar Styling */
.eapps-blog-posts-container::-webkit-scrollbar {
  width: 8px !important;
  height: 8px !important;
}

.eapps-blog-posts-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05) !important;
  border-radius: 4px !important;
}

.eapps-blog-posts-container::-webkit-scrollbar-thumb {
  background: rgba(255, 107, 53, 0.5) !important;
  border-radius: 4px !important;
}

.eapps-blog-posts-container::-webkit-scrollbar-thumb:hover {
  background: #FF6B35 !important;
}

/* Links */
a.eapps-blog-post-link,
a.eapps-blog-posts-item-link {
  color: #FF6B35 !important;
  text-decoration: none !important;
  transition: all 0.3s ease !important;
}

a.eapps-blog-post-link:hover,
a.eapps-blog-posts-item-link:hover {
  color: #ff5722 !important;
  text-decoration: underline !important;
}

/* Author Info */
.eapps-blog-post-author,
.eapps-blog-posts-item-author {
  color: rgba(255, 255, 255, 0.6) !important;
  font-size: 0.875rem !important;
}

/* Modal/Popup (if used) */
.eapps-blog-modal,
.eapps-modal {
  background: rgba(0, 0, 0, 0.95) !important;
  backdrop-filter: blur(20px) !important;
}

.eapps-blog-modal-content,
.eapps-modal-content {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 16px !important;
  color: #ffffff !important;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .eapps-blog-posts-item,
  .eapps-blog-post-card {
    margin-bottom: 16px !important;
  }
  
  .eapps-blog-post-button,
  .eapps-blog-posts-item-button {
    width: 100% !important;
    text-align: center !important;
  }
}

/* Grid Layout Enhancement */
.eapps-blog-posts-grid {
  gap: 24px !important;
}

/* Animation for new items */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.eapps-blog-posts-item,
.eapps-blog-post-card {
  animation: fadeInUp 0.5s ease-out !important;
}
```

## Custom JavaScript
Füge diesen JS Code in Elfsight ein:

```javascript
// Wait for Elfsight widget to load
(function() {
  'use strict';
  
  // Add ripple animation CSS
  var style = document.createElement('style');
  style.textContent = '\n    @keyframes ripple {\n      to {\n        transform: scale(4);\n        opacity: 0;\n      }\n    }\n  ';
  document.head.appendChild(style);
  
  // Add enhancements to blog cards
  function addCardEnhancements(card) {
    if (card.dataset.enhanced) return;
    card.dataset.enhanced = 'true';
    
    // Add ripple effect on click
    card.addEventListener('click', function(e) {
      var ripple = document.createElement('span');
      var rect = card.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var x = e.clientX - rect.left - size / 2;
      var y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = '\n        position: absolute;\n        width: ' + size + 'px;\n        height: ' + size + 'px;\n        left: ' + x + 'px;\n        top: ' + y + 'px;\n        background: radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%);\n        border-radius: 50%;\n        transform: scale(0);\n        animation: ripple 0.6s ease-out;\n        pointer-events: none;\n        z-index: 10;\n      ';
      
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(ripple);
      
      setTimeout(function() {
        ripple.remove();
      }, 600);
    });
  }
  
  // Add enhancements to buttons
  function addButtonEnhancements(button) {
    if (button.dataset.enhanced) return;
    button.dataset.enhanced = 'true';
    
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  }
  
  // Add smooth scroll for pagination
  function addPaginationEnhancements(button) {
    if (button.dataset.enhanced) return;
    button.dataset.enhanced = 'true';
    
    button.addEventListener('click', function() {
      // Find the widget container dynamically
      var widget = document.querySelector('[class*="elfsight-app"]');
      if (widget) {
        setTimeout(function() {
          widget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  }
  
  // Enhance new elements with animations and interactions
  function enhanceNewElements(nodes) {
    nodes.forEach(function(node) {
      if (node.nodeType !== 1) return; // Skip non-element nodes
      
      // Add hover effects to cards
      var cards = node.querySelectorAll ? node.querySelectorAll('.eapps-blog-posts-item, .eapps-blog-post-card') : [];
      cards.forEach(addCardEnhancements);
      
      // Enhance buttons
      var buttons = node.querySelectorAll ? node.querySelectorAll('.eapps-blog-post-button, .eapps-blog-posts-item-button') : [];
      buttons.forEach(addButtonEnhancements);
      
      // Add smooth scroll to pagination
      var paginationButtons = node.querySelectorAll ? node.querySelectorAll('.eapps-blog-pagination-button, .eapps-pagination-button') : [];
      paginationButtons.forEach(addPaginationEnhancements);
    });
  }
  
  // Function to initialize custom styling
  function initCustomStyling() {
    // Find widget dynamically by class pattern
    var widget = document.querySelector('[class*="elfsight-app"]');
    
    if (!widget) {
      // Retry after a short delay if widget not found
      setTimeout(initCustomStyling, 500);
      return;
    }
    
    console.log('✅ Elfsight widget found - applying custom styles');
    
    // Add custom class to widget container
    widget.classList.add('elfsight-custom-styled');
    
    // Observe for dynamically added content
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
          enhanceNewElements(mutation.addedNodes);
        }
      });
    });
    
    observer.observe(widget, {
      childList: true,
      subtree: true
    });
    
    // Initial enhancement
    enhanceNewElements([widget]);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomStyling);
  } else {
    initCustomStyling();
  }
  
  // Also try when window loads (fallback)
  window.addEventListener('load', function() {
    setTimeout(initCustomStyling, 1000);
  });
})();
```

## Anleitung zum Einfügen:

### So fügst du den Code in Elfsight ein:

1. **Öffne dein [Elfsight Dashboard](https://dash.elfsight.com/apps)**
   
2. **Wähle dein Blog Widget aus**
   - Klicke auf das Widget mit der ID `0718991f-510b-4b8c-adc6-7badc2d6cc7b`

3. **Gehe zu den Einstellungen**
   - Klicke auf "Edit" oder "Bearbeiten"
   - Scrolle zum Tab "Settings" oder "Einstellungen"

4. **Custom CSS hinzufügen**
   - Suche nach "Custom CSS" oder "Benutzerdefiniertes CSS"
   - Kopiere den **kompletten CSS Code** von oben
   - Füge ihn in das CSS-Feld ein

5. **Custom JavaScript hinzufügen** 
   - Suche nach "Custom JavaScript" oder "Benutzerdefiniertes JavaScript"
   - Kopiere den **kompletten JavaScript Code** von oben
   - Füge ihn in das JS-Feld ein

6. **Speichern & Testen**
   - Klicke auf "Save" oder "Speichern"
   - Das Widget wird automatisch aktualisiert
   - Teste das Widget auf deiner Webseite

### Features nach Anpassung:
- 🎨 **Primary Color #FF6B35** - Passend zu deinem Theme
- 🌙 **Dunkler transparenter Hintergrund** - Fügt sich nahtlos ein
- ✨ **Smooth Hover-Effekte** - Professionelle Animationen
- 🎭 **Backdrop Blur** - Glassmorphism-Effekt
- 📱 **Mobile-responsive** - Optimiert für alle Geräte
- 🎯 **Ripple-Effekte** - Interaktive Click-Animation
- 🔄 **Smooth Scrolling** - Bei Pagination
- 🎬 **Fade-In Animationen** - Für neue Blog-Posts

### Troubleshooting:
- **Widget lädt nicht?** → Überprüfe, ob das Script auf deiner Seite eingebunden ist
- **Styles werden nicht angewendet?** → Leere deinen Browser-Cache
- **JavaScript funktioniert nicht?** → Prüfe die Browser-Konsole auf Fehler (F12)
