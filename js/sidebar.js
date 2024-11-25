const sidebar = document.getElementById('side-bar');

// Show sidebar
function showSideBar(e) {
    event.preventDefault();
    sidebar.style.transform = 'translateX(0)';
    sidebar.style.opacity = '1';
    sidebar.style.pointerEvents = 'auto';
}

// Hide sidebar
function closeSideBar(e) {
    event.preventDefault();
    sidebar.style.transform = 'translateX(100%)';
    sidebar.style.opacity = '0';
    sidebar.style.pointerEvents = 'none';
}