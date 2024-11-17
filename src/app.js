document.addEventListener("alpine:init", () => {
  Alpine.data("menu", () => ({
    items: [
      {
        id: 135903,
        name: "Midnight Brew",
        img: "m1.jpg",
        price: 42,
        disc: -50,
        rating: 122,
      },
      {
        id: 443624,
        name: "Essence Series",
        img: "m2.jpg",
        price: 87,
        disc: -34,
        rating: 71,
      },
      {
        id: 515139,
        name: "Bean & Brew",
        img: "m3.jpg",
        price: 24,
        disc: -25,
        rating: 182,
      },
      {
        id: 721299,
        name: "Greenleaf Blend",
        img: "m4.jpg",
        price: 50,
        disc: -25,
        rating: 14,
      },
      {
        id: 799942,
        name: "Noir Roast",
        img: "m5.jpg",
        price: 82,
        disc: -50,
        rating: 61,
      },
      {
        id: 965030,
        name: "Autumn Aroma",
        img: "m6.jpg",
        price: 152,
        disc: -50,
        rating: 152,
      },
    ],
  }));

  Alpine.store("wl", {
    items: [], // Array of items in the cart
    total: 0, // Total cost of checked items
    quantity: 0, // Total quantity of items

    // Utility function to calculate discounted price
    calculateDiscountedPrice(price, discount) {
      return price - price * (Math.abs(discount) / 100);
    },

    // Recalculate total only for checked items
    recalculateTotal() {
      this.total = this.items.reduce(
        (sum, item) =>
          item.checked // Only include checked items
            ? sum +
              this.calculateDiscountedPrice(item.price, item.disc) *
                item.quantity
            : sum,
        0
      );
    },

    add(newItem) {
      const wlItem = this.items.find((item) => item.id === newItem.id);

      if (!wlItem) {
        const discountedPrice = this.calculateDiscountedPrice(
          newItem.price,
          newItem.disc
        );
        this.items.push({
          ...newItem,
          quantity: 1,
          total: discountedPrice,
          checked: true, // Default to checked when added
        });
        this.quantity++;
      } else {
        wlItem.quantity++;
        wlItem.total =
          this.calculateDiscountedPrice(wlItem.price, wlItem.disc) *
          wlItem.quantity;
      }

      this.recalculateTotal();
    },

    remove(id) {
      const wlItem = this.items.find((item) => item.id === id);
      if (wlItem) {
        if (wlItem.quantity > 1) {
          wlItem.quantity--;
          wlItem.total =
            this.calculateDiscountedPrice(wlItem.price, wlItem.disc) *
            wlItem.quantity;
        } else {
          this.items = this.items.filter((item) => item.id !== id);
        }

        this.recalculateTotal();
        this.quantity = this.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      }
    },

    delete(id) {
      this.items = this.items.filter((item) => item.id !== id);
      this.recalculateTotal();
      this.quantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    toggleCheck(id) {
      const wlItem = this.items.find((item) => item.id === id);
      if (wlItem) {
        wlItem.checked = !wlItem.checked; // Toggle the checked state
        this.recalculateTotal(); // Recalculate the total
      }
    },
  });
});

function valCustomerForm() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneMinLength = 8;
  let isValid = true;

  // Reset styles
  nameInput.style.border = "";
  emailInput.style.border = "";
  phoneInput.style.border = "";

  // Validate form fields
  if (!name) {
    nameInput.style.border = "1px inset rgb(220, 80, 80)";
    isValid = false;
  }

  if (!emailPattern.test(email)) {
    emailInput.style.border = "1px inset rgb(220, 80, 80)";
    isValid = false;
  }

  if (phone.length < phoneMinLength) {
    phoneInput.style.border = "1px inset rgb(220, 80, 80)";
    isValid = false;
  }

  if (isValid) {
    // Collect checked items
    const selectedItems = Alpine.store("wl").items.filter(
      (item) => item.checked
    );

    // Create the object
    const data = {
      name: name,
      email: email,
      phone: phone,
      items: selectedItems.map((item) => ({
        id: item.id,
        productName: item.name,
        productQty: item.quantity,
        totalPrice: removeDecimalPoint(item.total.toFixed(2)),
      })),
      total: removeDecimalPoint(
        selectedItems.reduce((sum, item) => sum + item.total, 0).toFixed(2)
      ),
    };

    console.log(data);

    try {
      fetch("http://localhost:5501/app", {
        method: "POST",
        mode: "cors", // Ensure CORS is enabled
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send data as JSON
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json(); // Parse response to JSON
        })
        .then((responseData) => {
          const Ttoken = responseData.transaction_token;
          snap.pay(Ttoken);
        })
        .catch((err) => {
          console.log("Error:", err.message); // Log any error that occurs
        });
    } catch (err) {
      console.log("Error:", err.message);
    }

    // Use the data to call placeOrder

    // Open WhatsApp link
    // window.open(
    //   "http://wa.me/6282322991181?text=" + encodeURIComponent(pesanWA(data))
    // );
  }
}

function removeDecimalPoint(num) {
  return parseInt(num.toString().replace(".", ""));
}

const pesanWA = (obj) => {
  return `Data Customer:
Name: ${obj.nama}
Email: ${obj.email}
No: ${obj.nomor}

Order:
${obj.items
  .map((item) => `- ${item.namaProduk} (${item.jumlah} x $${item.totalHarga})`)
  .join("\n")}

Total: $${obj.total}

Thank you!`;
};
