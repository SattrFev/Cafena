// Toggle class active
const navnav = document.querySelector('.nav-nav');
// When menu is clicked
document.querySelector('#hamburger-menu').onclick = ( ) => {
    navnav.classList.toggle('active');
};

// Hide Hamburger menu
const hamg = document.querySelector('#hamburger-menu');
document.addEventListener('click', function(e) {
    if(!hamg.contains(e.target) && !navnav.contains(e.target)) {
        navnav.classList.remove('active');
    }
});