document.addEventListener("alpine:init", () => {
  Alpine.data("menu", () => ({
    items: [
      {
        id: 1,
        name: "Midnight Brew",
        img: "m1.jpg",
        price: 42,
        disc: -50,
        rating: 122,
      },
      {
        id: 2,
        name: "Essence Series",
        img: "m2.jpg",
        price: 87,
        disc: -34,
        rating: 71,
      },
      {
        id: 3,
        name: "Bean & Brew",
        img: "m3.jpg",
        price: 24,
        disc: -25,
        rating: 182,
      },
      {
        id: 4,
        name: "Greenleaf Blend",
        img: "m4.jpg",
        price: 50,
        disc: -25,
        rating: 14,
      },
      {
        id: 5,
        name: "Noir Roast",
        img: "m5.jpg",
        price: 82,
        disc: -50,
        rating: 61,
      },
      {
        id: 6,
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
    add(newItem) {
      const wlItem = this.items.find((item) => item.id === newItem.id);

      if (!wlItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += parseFloat(
          newItem.price - newItem.price * (Math.abs(newItem.disc) / 100)
        );
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += parseFloat(
              item.price - item.price * (Math.abs(item.disc) / 100)
            );
            return item;
          }
        });
      }
    },
    remove(id) {
      const wlItem = this.items.find((item) => item.id === id);
      if (wlItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= parseFloat(
              item.price - item.price * (Math.abs(item.disc) / 100)
            );
            return item;
          }
        });
      } else if (wlItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= wlItem.price;
      }
    },
  });
});
