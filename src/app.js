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
    items: [],
    total: 0,
    quantity: 0,

    // Utility function to calculate discounted price
    calculateDiscountedPrice(price, discount) {
      return price - price * (Math.abs(discount) / 100);
    },

    // Recalculate total from all items
    recalculateTotal() {
      this.total = this.items.reduce(
        (sum, item) =>
          sum +
          this.calculateDiscountedPrice(item.price, item.disc) * item.quantity,
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
        this.items.push({ ...newItem, quantity: 1, total: discountedPrice });
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
  });
});
