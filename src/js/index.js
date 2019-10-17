const yall = require('yall-js');
const SmoothScroll = require('./smooth-scroll.polyfills.min');
const axios = require('axios');

(function IIFE(global) {
  function isIE() {
    const ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones */
    const isIe = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;

    return isIe;
  }

  const contentLoaded = function() {
    // Inizializza yall
    yall.default();
    const ie_component = document.getElementById('ie');
    const ie_button = document.getElementById('ie-button');

    if (isIE()) {
      console.log('È IE');
      ie_component.classList.remove('u-show-hide');

      ie_button.addEventListener(
        'click',
        function(e) {
          ie_component.classList.add('u-show-hide');
        },
        false
      );
    }

    const scroll = new SmoothScroll('a[href*="#"]', {
      speed: 100,
      easing: 'easeOutQuad',
    });
  };

  //  Form Validazione

  const submitBtn = document.getElementById('js-submitBtn');

  const submit = e => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const city = document.getElementById('city');
    const message = document.getElementById('message');

    const inputs = [name, email, city, message];

    let emailRe = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    let isValid = 0;

    inputs.forEach(el => {
      if (!el.value) {
        el.classList.add('input--error');
        el.nextElementSibling.classList.remove('u-show-hide');
        isValid--;
        return false;
      } else {
        el.classList.remove('input--error');
        el.nextElementSibling.classList.add('u-show-hide');
        isValid++;
        if (el.id === 'email') {
          if (!emailRe.test(el.value)) {
            el.classList.add('input--error');
            el.nextElementSibling.nextElementSibling.classList.remove(
              'u-show-hide'
            );
            isValid--;
            return false;
          } else {
            el.classList.remove('input--error');
            el.nextElementSibling.nextElementSibling.classList.add(
              'u-show-hide'
            );
          }
        }
      }
    });

    if (isValid >= 4) {
      const data = {
        name: name.value,
        email: email.value,
        city: city.value,
        message: message.value,
      };

      let bodyFormData = new FormData();

      for (let key in data) {
        bodyFormData.append(key, data[key]);
      }

      axios
        .post(
          'http://www.fiorellabonfantisports.it/landing/test_form.php',
          bodyFormData,
          {
            config: {
              headers: {
                'Content-Type': 'application/ x-www-form-urlencoded',
              },
            },
          }
        )
        .then((response) => {
          console.log(response);
          const form = document.getElementById("form");
          const confirmationMessage = document.getElementById("confirmation-message");
          form.innerHTML = '';
          form.classList.add("u-show-hide");
          confirmationMessage.classList.remove("u-show-hide");

        })
        .catch((error) => {
          alert("Error: please try again; Errore: ritenta")
          console.log(error);
        });
    } else {
      return false;
    }
  };

  submitBtn.addEventListener('click', submit);

  // Fine Form

  global.addEventListener('DOMContentLoaded', contentLoaded);
})(window);
