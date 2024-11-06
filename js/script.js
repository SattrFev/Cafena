// Toggle class active
const navnav = document.querySelector(".nav-nav");
// When menu is clicked
document.querySelector("#hamburger-menu").onclick = () => {
  navnav.classList.toggle("active");
};

// Hide Hamburger menu
const hamg = document.querySelector("#hamburger-menu");
document.addEventListener("click", function (e) {
  if (!hamg.contains(e.target) && !navnav.contains(e.target)) {
    navnav.classList.remove("active");
  }
});

// Toggle class active
const searchbox = document.querySelector(".search-boks");
const seachbokss = document.querySelector(".search-boks-bg");
const seachboxinput = document.querySelector(".search-boks input");

document.querySelector("#search").onclick = () => {
  if (!searchbox.classList.contains("active")) {
    seachbokss.classList.add("active");
    setTimeout(() => {
      searchbox.classList.add("active");
      seachboxinput.focus();
    }, 20);
  } else {
    searchbox.classList.remove("active");
    setTimeout(() => {
      seachbokss.classList.remove("active");
    }, 20);
  }
};

// Hide
const seachboks = document.querySelector("#search");
document.addEventListener("click", function (e) {
  if (!seachboks.contains(e.target) && !searchbox.contains(e.target)) {
    searchbox.classList.remove("active");
    setTimeout(() => {
      seachbokss.classList.remove("active");
    }, 20);
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    // If the Escape key is pressed and the searchbox has the 'active' class
    seachboxinput.blur();
    if (searchbox.classList.contains("active")) {
      searchbox.classList.remove("active");
      setTimeout(() => {
        seachbokss.classList.remove("active");
      }, 20);
    }
  }
  // Use 'else if' and the correct key for Slash ('/'):
  else if (e.key === "/") {
    if (document.activeElement !== seachboxinput) {
      seachbokss.classList.add("active");
      setTimeout(() => {
        searchbox.classList.add("active");
        seachboxinput.focus();
        seachboxinput.value = ""; // Clear value only when activating
      }, 20);
    }
  }
});

function HeroVisibility() {
  const heroElement = document.querySelector(".hero");
  if (!heroElement) return true;

  const rect = heroElement.getBoundingClientRect();
  const isNonVisible =
    rect.bottom <= 0 ||
    rect.top >= (window.innerHeight || document.documentElement.clientHeight) ||
    rect.right <= 0 ||
    rect.left >= (window.innerWidth || document.documentElement.clientWidth);

  return isNonVisible;
}

const navbarx = document.querySelector(".navbar");
window.addEventListener("scroll", function () {
  if (HeroVisibility()) {
    navbarx.style.backgroundColor = "#1c1a1a";
  } else {
    navbarx.style.backgroundColor = "#1c1a1acc";
  }
});
