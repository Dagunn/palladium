document.querySelectorAll('.design__option').forEach(option => {
  option.addEventListener('mouseenter', (e) => {
    const banner = document.querySelector('.design__banner');
    const titleText = document.querySelector('.design__title-text');

    if (e.target.classList.contains('design__option--red')) {

      titleText.innerHTML = `Услуги по ремонту <br> <span> в Москве и Московской области</span>`;

      banner.style.backgroundImage = "url('../../img/repair-bg.jpg')";
      banner.style.backgroundPosition = "bottom";
    } else if (e.target.classList.contains('design__option--green')) {
      titleText.innerHTML = `Виды работ <br> <span> в Москве и Московской области</span>`;
      banner.style.backgroundImage = "url('../../img/work-bg.jpg')";
      banner.style.backgroundPosition = "center";
    } else if (e.target.classList.contains('design__option--blue')) {
      titleText.innerHTML = `Дизайн интерьера <br><span> в Москве и Московской области</span>`;
      banner.style.backgroundImage = "url('../../img/design-bg.jpg')";
      banner.style.backgroundPosition = "center";
    } else if (e.target.classList.contains('design__option--purple')) {
      titleText.innerHTML = `Ремонт помещений <br><span> в Москве и Московской области</span>`;
      banner.style.backgroundImage = "url('../../img/repair-2.jpg')";
      banner.style.backgroundPosition = "center";
    }
  });

  option.addEventListener('mouseleave', () => {
    const banner = document.querySelector('.design__banner');
    const titleText = document.querySelector('.design__title-text');


    titleText.innerHTML = `Ремонт <span>и</span> дизайн <br><span>в Москве и Московской области</span>`;
    banner.style.backgroundImage = "url('../../img/main-bg.jpg')";
  });
});
