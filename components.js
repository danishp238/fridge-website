// components.js - Handles header and footer injection
class ComponentLoader {
    static async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
            const html = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading component: ${error}`);
        }
    }

    static async loadAll() {
        await Promise.all([
            this.loadComponent('header-placeholder', '/components/header.html'),
            this.loadComponent('footer-placeholder', '/components/footer.html')
        ]);
        
        // Re-initialize any JS that depends on header/footer
        if (typeof initNavigation === 'function') {
            initNavigation();
        }
    }
}

// Auto-load when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ComponentLoader.loadAll();
});

// In components.js, after loading:
document.querySelectorAll('[data-config]').forEach(el => {
    const key = el.dataset.config;
    if (SITE_CONFIG[key]) {
        el.textContent = SITE_CONFIG[key];
    }
});