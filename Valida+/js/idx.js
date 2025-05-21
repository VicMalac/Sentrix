const swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      grabCursor: true,
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });

    const politicaTextoAuto = document.getElementById('politicaTextoAuto');
    const btnAceitarAuto = document.getElementById('btnAceitarAuto');
    const checkConfirmAuto = document.getElementById('checkConfirmAuto');
    const showModal = new bootstrap.Modal(document.getElementById('modalPoliticaAuto'));

    window.addEventListener('load', () => {
      const jaAceitou = localStorage.getItem('politica_aceita');
      if (!jaAceitou) {
        showModal.show();
      }
    });

    politicaTextoAuto?.addEventListener('scroll', function () {
      const scrollable = politicaTextoAuto.scrollHeight - politicaTextoAuto.clientHeight;
      const currentScroll = politicaTextoAuto.scrollTop;
      if (currentScroll >= scrollable - 10) {
        btnAceitarAuto.disabled = false;
      }
    });

    btnAceitarAuto?.addEventListener('click', () => {
      checkConfirmAuto.classList.remove('d-none');
      btnAceitarAuto.classList.add('d-none');
      setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalPoliticaAuto'));
        modal.hide();
        localStorage.setItem('politica_aceita', 'true');
        checkConfirmAuto.classList.add('d-none');
        btnAceitarAuto.classList.remove('d-none');
        btnAceitarAuto.disabled = true;
        politicaTextoAuto.scrollTop = 0;
      }, 3000);
    });