const swiper = new Swiper('.about__picture-swiper', {

  direction: 'horizontal',
  loop: true,
  containerModifierClass: 'swiper-wrapper',
  slidesPerView: 1,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 1000,
  },
});

const album = new Swiper('.album__slider', {
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 4000
  },
  navigation: {
    nextEl: '.album__slider-right',
    prevEl: '.album__slider-left',
  },
  slidesPerView: 'auto',
});

const btnHeaderMenu = document.querySelector('.header__menu-button');
const headerMenu = document.querySelector('.header__menu');
const listMenu = document.querySelector('.header__menu-list');

btnHeaderMenu.addEventListener('click', (event) => {
  event.stopPropagation();
  headerMenu.classList.toggle('header__menu_active');
});

document.addEventListener('click', (event) => {
  const target = event.target;
  const isMenuClicked = headerMenu.contains(target);
  const isButtonClicked = btnHeaderMenu.contains(target);

  if (!isMenuClicked && !isButtonClicked) {
    headerMenu.classList.remove('header__menu_active');
  }

  if (target.className === 'header__menu-list-item-link') {
    headerMenu.classList.remove('header__menu_active');
  }
});

const items = document.querySelectorAll('.travel__accordion-item');
const textWrapper = document.querySelectorAll('.travel__accordion-item-text-wrapper');
textWrapper[0].style.height = '206px';

items.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    items.forEach((_, idx) => {
      const wrapper = textWrapper[idx];


      if (index === idx) {
        if (items[idx].classList.contains('travel__accordion-item-active')) {
          wrapper.style.height = '0';
        } else {
          wrapper.style.height = `${wrapper.scrollHeight}px`;
        }
        items[idx].classList.toggle('travel__accordion-item-active');
      } else {
        wrapper.style.height = '0';
        items[idx].classList.remove('travel__accordion-item-active');
      }
    });
  });
});

const slideRight = document.querySelector('.album__slider-right');
const sliderLeft = document.querySelector('.album__slider-left');
const slider = document.querySelector('.album__slider-list')

const hoverZoneLeft = document.querySelector('.hover-zone-left');
const hoverZoneRight = document.querySelector('.hover-zone-right');

hoverZoneRight.addEventListener('mouseenter', (e) => {
  slideRight.classList.add('album__slider-visible');
  sliderLeft.classList.remove('album__slider-visible');
});


hoverZoneLeft.addEventListener('mouseenter', (e) => {
  slideRight.classList.remove('album__slider-visible');
  sliderLeft.classList.add('album__slider-visible');
});


const selects = document.querySelectorAll('.calculator__form-select-wrapper');
const selectMoth = document.querySelectorAll('.calculator__form-list-month');
const listDay = document.querySelectorAll('.calculator__form-list-day');
const countpeople = document.querySelectorAll('.list-people-item');
const btnReady = document.querySelectorAll('.btn-calc');
const inputText = document.querySelectorAll('.calculator__form-select-wrapper-input-text');
const checkboxes = document.querySelectorAll('.wrapper-options-checkbox-list-label input[type="checkbox"]');
const totalPrice = document.querySelector('.booking__price');
const infoCalc = document.querySelector('.calculator__form-button');
const info = document.querySelector('.booking__data');
const fromDate = document.querySelector('#booking__date');
const fromPeople = document.querySelector('#booking__people');
const fromOptions = document.querySelector('#booking__options');

const addInfo = () => {
  info.textContent = '';

  const day = inputText[0].textContent;
  const peoples = inputText[1].textContent
  if (Number(peoples)) {
    const people = peoples > 4 ? 'человек' : 'человека';
    info.textContent = `${day}, ${peoples} ${people}`;
    fromDate.textContent = day;
    fromPeople.textContent = peoples;
    fromOptions.textContent = inputText[2].textContent;

  }
};

const renderList = (date) => {
  const days = listDate[date].map(elem => {
    const createLi = document.createElement('li');
    createLi.classList.add('calculator__form-list-day');
    createLi.textContent = elem;
    return createLi;
  });
  return days;
};

const selectDay = (list) => {
  list.forEach(elem => {
    elem.addEventListener('click', (e) => {
      const target = e.target.textContent;
      inputText[0].textContent = target;
      inputText[0].dataset.total = Math.floor(Math.random() * 50000);
      inputText[0].style.opacity = 1;
    })
  })
};


const closeSelect = (target) => {
  target.closest('.active-select-date')
    .classList.remove('active-select-date');
  calc();
  addInfo();
};

const calc = () => {
  let total = 0;
  let allFilled = true;

  inputText.forEach(elem => {
    if (elem.dataset.total === "0" || elem.dataset.total === undefined) {
      allFilled = false;
    } else {
      total += Number(elem.dataset.total);
      console.log('total: ', total);
    }
  });
  infoCalc.textContent = total + ' &#36;';
  totalPrice.innerHTML = total + ' &#36;';
};

const listDate = {
  novembar: ['4.11 - 18.11', '7.11 - 21.11', '12.11 - 26.11', '20.11 - 6.12'],
  decembar: ['4.12 - 18.12', '7.12 - 21.12', '12.12 - 26.12', '20.12 - 6.01'],
  january: ['4.01 - 18.01', '7.01 - 21.01', '12.01 - 26.01', '20.01 - 6.02'],
  february: ['4.02 - 18.02', '7.02 - 21.02', '12.02 - 26.02', '20.02 - 6.03'],
  march: ['4.03 - 18.03', '7.03 - 21.03', '12.03 - 26.03', '20.03 - 6.04'],
  april: ['4.04 - 18.04', '7.04 - 21.04', '12.04 - 26.04', '20.04 - 6.05'],
  may: ['4.05 - 18.05', '7.05 - 21.05', '12.05 - 26.05', '20.05 - 6.06'],
};

let options = [];

selects.forEach(elem => {
  elem.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.calculator__form-select-wrapper-select')) {
      e.stopPropagation();
      return;
    };

    selects.forEach(el => {
      const select = el.querySelector('.calculator__form-select-wrapper-select');
      if (el !== elem) {
        select.classList.remove('active-select-date');
      }
    });

    const select = elem.querySelector('.calculator__form-select-wrapper-select');
    select.classList.toggle('active-select-date');
  });
});

selectMoth.forEach(elem => {
  elem.addEventListener('click', e => {
    const target = e.target;
    const listDays = document.querySelector('.date-list-days');
    selectMoth.forEach(item => item.classList.remove('month-active'));
    target.classList.add('month-active');
    listDays.remove();
    const li = renderList(target.dataset.value);
    const ul = document.createElement('ul');
    ul.classList.add('date-list-days', 'calculator__form-select-wrapper-date-list');
    ul.append(...li);
    target.closest('.calculator__form-select-wrapper-date-lists').
      append(ul);

    selectDay(li);
  });
});

selectDay(listDay);

btnReady[0].addEventListener('click', (e) => {
  closeSelect(e.target);

});


countpeople.forEach(elem => {
  elem.addEventListener('click', (e) => {
    const target = e.target;
    inputText[1].textContent = target.textContent;
    inputText[1].style.opacity = 1;
    inputText[1].dataset.total = Math.floor(Math.random() * (target.textContent * 50000));
    closeSelect(target);
  })
});



checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    const target = e.target;
    if (target.checked) {
      if (!options.includes(target.name)) {
        options.push(target.name);
      }
    } else {
      options = options.filter(option => option !== target.name);
    }
    if (!options.length) {
      inputText[2].textContent = 'Выбери нужные опции';
      inputText[2].dataset.total = 0;
    } else {
      inputText[2].textContent = options.length > 1 ? `${options.length} опции` : '1 опция';
      inputText[2].dataset.total = Math.floor(Math.random() * (options.length * 90000));
      inputText[2].style.opacity = 1;
    }
  });
});

btnReady[1].addEventListener('click', (e) => {
  closeSelect(e.target);
});

const URL = 'https://jsonplaceholder.typicode.com/posts';

const sendServer = async (url, {
  method,
  calback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };
    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      if (calback) return calback(null, data);
      return;
    };
    throw new Error(response.statusText);
  } catch (err) {
    return calback(err);
  };
};

const form = document.querySelector('.booking__form');
const reservationDate = document.querySelectorAll('.booking__form-select');
const buttonForm = document.querySelector('.booking__form-button');
const inputName = document.querySelector('#booking__name');
const inputEmail = document.querySelector('#booking__email');
const inputPhone = document.querySelector('#booking__phone');

reservationDate.forEach(elem => {
  elem.addEventListener('click', () => {
    document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
  });
});


inputName.addEventListener('input', () => {

  const validInputName = inputName.value.split(/\s+/).length >= 3 ? '.+' : '';
  inputName.setAttribute('pattern', validInputName);
  inputName.value = inputName.value.replace(/[^А-Яа-я\s]/g, '');
});

inputPhone.addEventListener('input', () => {
  inputPhone.value = inputPhone.value.replace(/[^\d\+]/g, '');
});


form.addEventListener('submit', async e => {
  e.preventDefault();
  const title = form.querySelector('.booking__form-title');
  const target = e.target;
  const formData = new FormData(target);
  formData.set('nameContact', target.booking__name.value);
  formData.set('emailContact', target.booking__email.value);
  formData.set('phoneContact', target.booking__phone.value);
  formData.set('totalPrice', totalPrice.textContent);
  const newReservation = Object.fromEntries(formData);
  if (target.classList.contains('booking__form')) {
    await sendServer(URL, {
      method: 'POST',
      body: {
        title: target.children[0].textContent,
        body: newReservation,
      },
      calback(err, data) {
        if (err) {
          console.warn(err, data);
        }
      },
      headers: {
        'Content-Type': 'application/json',
      }
    });
    title.textContent = 'Ваши заявка принята';
    totalPrice.textContent = '';
    reservationDate[0].textContent = '';
    reservationDate[1].textContent = '';
    reservationDate[2].textContent = '';
    target.booking__phone.value = '';
    target.booking__name.value = '';
    target.booking__email.value = '';
    target.booking__phone.setAttribute('disabled', true);
    target.booking__name.setAttribute('disabled', true);
    target.booking__email.setAttribute('disabled', true);
    buttonForm.setAttribute('disabled', true);
  };
});


const footerForm = document.querySelector('.footer__grid-container-form');
const footerEmail = document.querySelector('.footer__form-input');

const createFooterMesage = () => {
  const createh2 = document.createElement('h2');
  const createP = document.createElement('p');
  createh2.classList.add('footer__title', 'footer__grid-container-form-title');
  createh2.textContent = 'Ваша заявка успешно отправлена';
  createP.classList.add('footer__grid-container-form-text');
  createP.textContent = 'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней';

  return { createh2, createP };
};

footerForm.addEventListener('submit', async e => {
  e.preventDefault();
  const email = footerEmail.value
  const { createh2, createP } = createFooterMesage();
  await sendServer(URL, {
    method: 'POST',
    body: {
      title: 'Вопросы по туру',
      body: email,
    },
    calback(err, data) {
      if (err) {
        console.warn(err, data);
        footerForm.textContent = `Ошибка отправки формы ${err}`;
        return;
      }
      footerForm.innerHTML = '';
      footerForm.append(createh2, createP);
    },
    headers: {
      'Content-Type': 'application/json',
    }
  })

  footerForm.reset();
});





