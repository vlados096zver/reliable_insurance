var swiper = new Swiper(".swiper", {
    slidesPerView: 3,
    spaceBetween: 40,
    loop: true,

    navigation: {
        nextEl: ".benefits-next",
        prevEl: ".benefits-prev",
    },
    breakpoints: {

        0: {
            centeredSlides: true,
            slidesPerView: 1.2,
            spaceBetween: 15,
        },

        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },

        1180: {
            slidesPerView: 3,
            spaceBetween: 40,
        }
    }
});

// serrvices

const serviceItems = document.querySelectorAll('.services__item'),
    servicesItemTxt = document.querySelectorAll('.services__item-text span');

serviceItems.forEach((selectedItem, i) => {
    selectedItem.addEventListener('click', () => {
        if (selectedItem.classList.contains('services__item--active')) return;

        servicesItemTxt.forEach(item => item.style.maxHeight = `0px`);
        serviceItems.forEach(item => item.classList.remove('services__item--active'));

        selectedItem.classList.add('services__item--active');
        servicesItemTxt[i].style.maxHeight = `${servicesItemTxt[i].scrollHeight}px`;
        
    });
});


// modal

let mainForm = document.querySelector('#modal-form');


const modalTriggers = document.querySelectorAll('[data-modal-trigger="true"]'),
    modalWindow = document.querySelector('.modal-window'),
    modalBtnClose = document.querySelector('.modal-close'),
    modalInner = document.querySelector('.modal-inner');

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        modalWindow.classList.add('modal-window--active');
    });
});

modalBtnClose.addEventListener('click', () => {
    modalWindow.classList.remove('modal-window--active');

    let formTitleSuccess = document.querySelector('.form__title--success');
    if (formTitleSuccess) {
        mainForm.classList.remove('modal__form--hidden');
        mainForm.reset();
        modalInner.removeChild(formTitleSuccess);
    }

});


// form valid


mainForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let nameField = mainForm.querySelector('input[name="name"]');
    let phoneField = mainForm.querySelector('input[name="phone"]');

    let nameValue = nameField.value.trim();
    let phoneValue = phoneField.value.trim();

    let isValid = true;

    clearErrors();

    let namePattern = /^[a-zA-Z]{2,15}$/;
    if (nameValue === '') {
        showError(nameField, 'Name cannot be empty');
        isValid = false;
    } else if (!namePattern.test(nameValue)) {
        showError(nameField, 'Name must contain 2 to 15 Latin letters');
        isValid = false;
    }

    let phonePattern = /^[+]?[0-9]{6,}$/;
    if (phoneValue === '') {
        showError(phoneField, 'Phone cannot be empty');
        isValid = false;
    } else if (!phonePattern.test(phoneValue)) {
        showError(phoneField, 'Phone must contain at least 6 digits and may start with a plus sign');
        isValid = false;
    }

    if (isValid) {
        console.log('form send...');
        mainForm.classList.add('modal__form--hidden');

        let successAnswer = document.createElement('h2');
        successAnswer.classList.add('form__title', 'form__title--success');
        successAnswer.textContent = 'Form submitted successfully!';

        modalInner.appendChild(successAnswer);

        // mainForm.submit();
    }
});

function showError(input, message) {
    let error = document.createElement('span');
    error.classList.add('error-message');
    error.innerText = message;
    input.parentElement.appendChild(error);

    input.addEventListener('input', function () {
        let value = input.value.trim();
        if (value) {
            if (input === mainForm.querySelector('input[name="name"]') && /^[a-zA-Z]{2,15}$/.test(value)) {
                error.remove();
            }
            if (input === mainForm.querySelector('input[name="phone"]') && /^[+]?[0-9]{6,}$/.test(value)) {
                error.remove();
            }
        }
    });
}

function clearErrors() {
    let errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
}



// burgerr

const headerBurgerIcon = document.querySelector('.header__burger');
const headerMobMenu = document.querySelector('.header__main');
const headerMobBtnClose = document.querySelector('.header__main-btn_close');

headerBurgerIcon.addEventListener('click', () => {
    toggleMenu(true);
});

headerMobBtnClose.addEventListener('click', () => {
    toggleMenu(false);
});

headerMobMenu.addEventListener('click', (e) => {

    if (!e.target.classList.contains('header__main')) {
        toggleMenu(false);
    }
});


function toggleMenu(isOpen) {
    headerMobMenu.classList.toggle('header__main--active', isOpen);
}


document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 600,
  })
})