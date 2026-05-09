const vendors = [
    {
        id: 1,
        name: "Aura Luxe Wigs",
        priceRange: "₦80k – ₦150k",
        distance: "15 mins away",
        tag: "Luxury",
        image: "vendor_preview_1_1778364930415.png",
        description: "Premium human hair sourced globally. Expert styling and customization."
    },
    {
        id: 2,
        name: "Silky Strands Studio",
        priceRange: "₦65k – ₦120k",
        distance: "30 mins away",
        tag: "Affordable",
        image: "vendor_preview_2_1778364945413.png",
        description: "Specializing in frontal installs and bone straight textures."
    }
];

let currentVendor = null;

function renderVendors() {
    const homePreview = document.getElementById('home-vendor-preview');
    const mainList = document.getElementById('main-vendor-list');
    
    const vendorHTML = vendors.map(v => `
        <div class="vendor-card" onclick="openVendor(${v.id})">
            <img src="${v.image}" alt="${v.name}">
            <div class="vendor-content">
                <h3>${v.name}</h3>
                <div class="vendor-meta">
                    <span>${v.priceRange} • ${v.distance}</span>
                    <span class="tag">${v.tag}</span>
                </div>
            </div>
        </div>
    `).join('');

    if (homePreview) homePreview.innerHTML = vendorHTML;
    if (mainList) mainList.innerHTML = vendorHTML;
}

function openVendor(id) {
    currentVendor = vendors.find(v => v.id === id);
    const details = document.getElementById('vendor-details');
    
    details.innerHTML = `
        <div style="margin-bottom: 24px">
            <img src="${currentVendor.image}" style="width: 100%; height: 240px; object-fit: cover; border-radius: 24px; margin-bottom: 24px">
            <h2>${currentVendor.name}</h2>
            <p style="color: var(--text-muted); margin: 12px 0">${currentVendor.description}</p>
            <div style="display: flex; gap: 12px; margin: 24px 0">
                <div style="flex: 1; padding: 16px; background: var(--bg-beige); border-radius: 12px; text-align: center">
                    <span style="display: block; font-size: 12px; color: var(--text-muted)">Price Range</span>
                    <strong style="color: var(--primary-brown)">${currentVendor.priceRange}</strong>
                </div>
                <div style="flex: 1; padding: 16px; background: var(--bg-beige); border-radius: 12px; text-align: center">
                    <span style="display: block; font-size: 12px; color: var(--text-muted)">Availability</span>
                    <strong style="color: var(--primary-brown)">Immediate</strong>
                </div>
            </div>
            <button class="btn btn-primary" onclick="navigateTo('order')">Order Now</button>
            <button class="btn btn-secondary">Chat Vendor</button>
        </div>
    `;
    
    navigateTo('vendor-page');
}

function navigateTo(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    // Show target screen
    const target = document.getElementById(`screen-${screenId}`);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderVendors();
});
