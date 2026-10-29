const {
  JSON
} = require("sequelize");

var swiper = new Swiper('.mySwiper', {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper('.mySwiper2', {
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: swiper,
  },
});

const alertAddCartSuccess = () => {
  const elementAlert = document.querySelector("[alert-add-cart-success]");

  elementAlert.classList.remove("alert-hidden");

  setTimeout(() => {
    elementAlert.classList.add("alert-hidden");
  }, 3000);

  const closeAlert = elementAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    elementAlert.classList.add("alert-hidden");
  });
};

const showMiniCart = () => {
 const cart = JSON.parse(localStorage.getItem("cart"));
 if(cart){
   const totalQuantity = cart.reduce((sum , item) => sum + item.quantity, 0);
  
   const miniCart = document.querySelector("[mini-cart]");
   miniCart.innerHTML= totalQuantity;
 }
}
showMiniCart();

const cart = localStorage.getItem("cart");
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}

const formAddToCart = document.querySelector("[form-add-to-card]");
if (formAddToCart) {
  formAddToCart.addEventListener("submit", (event) => {
    event.preventDefault();

    const quantity = parseInt(event.target.elements.quantity.value);
    const tourId = parseInt(formAddToCart.getAttribute("tour-id"));

    if (quantity > 0 && tourId) {
      const cart = JSON.parse(localStorage.getItem("cart"));

      const isExitTour = card.findIndex(item => item.tourId == tourId);

      if (isExitTour == -1) {
        cart.push({
          tourId: tourId,
          quantity: quantity
        });

      } else {
        card[isExitTour].quantity = card[isExitTour].quantity + quantity;
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alertAddCartSuccess();

      showMiniCart();
    }
  });
};