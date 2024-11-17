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
const wishlist = document.querySelector(".wishlist");
const menuCardImages = document.querySelectorAll(".menu-card-img");

// Add event listener to reset background on input
document.querySelectorAll(".form-container input").forEach((input) => {
  input.addEventListener("input", () => {
    input.style.border = "1px transparent inset";
  });
});

document.querySelector("#search").onclick = () => {
  if (!searchbox.classList.contains("active")) {
    seachbokss.classList.add("active");
    setTimeout(() => {
      searchbox.classList.add("active");
      setTimeout(() => {
        seachboxinput.focus();
      }, 200);
    }, 20);
  } else {
    searchbox.classList.remove("active");
    setTimeout(() => {
      seachbokss.classList.remove("active");
    }, 20);
  }
};

document.querySelector("#shopping-cart").onclick = () => {
  wishlist.classList.toggle("active");
};

// document.addEventListener("click", function (e) {
//   if (
//     !wishlist.contains(e.target) &&
//     !document.querySelector("#shopping-cart").contains(e.target)
//   ) {
//     wishlist.classList.remove("active");
//   }
// });

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
    if (wishlist.classList.contains("active")) {
      wishlist.classList.remove("active");
    }
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

async function ClientToken() {
  try {
    const response = await fetch("http://localhost:5501/get-midtrans-key", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.clientKey);
    return data.clientKey; // Return the clientKey properly
  } catch (error) {
    console.error("Error fetching Midtrans key:", error);
    throw error; // Re-throw the error if necessary
  }
}

function helworld() {
  console.log("fuck");
}
