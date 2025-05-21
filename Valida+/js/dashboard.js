document.addEventListener('DOMContentLoaded', () => {
  const boasVindas = document.getElementById('boas-vindas');
  const logoutLink = document.getElementById('logoutLink');
  const validarCartaoCard = document.getElementById('validarCartaoCard');
  const historicoCard = document.getElementById('historicoCard');

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const db = firebase.firestore();
      try {
        const doc = await db.collection('usuarios').doc(user.uid).get();
        if (doc.exists && doc.data().nome) {
          boasVindas.textContent = `Bem-vindo, ${doc.data().nome}!`;
        } else {
          boasVindas.textContent = `Bem-vindo, ${user.email}!`;
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        boasVindas.textContent = `Bem-vindo, ${user.email}!`;
      }
    } else {
      window.location.href = "login.html";
    }
  });

  logoutLink?.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      window.location.href = "login.html";
    }).catch((error) => {
      console.error('Erro ao sair:', error);
    });
  });

  validarCartaoCard?.addEventListener('click', () => {
    window.location.href = "validador.html";
  });

  historicoCard?.addEventListener('click', () => {
    window.location.href = "historico.html";
  });
});
const indicaMaisCard = document.getElementById('indicaMaisCard');
indicaMaisCard?.addEventListener('click', () => {
  alert('O recurso Indica+ estará disponível em breve!');
});
const planisCard = document.getElementById('planisCard');
planisCard?.addEventListener('click', () => {
  alert("O recurso Planos estará disponível em breve!");
});
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