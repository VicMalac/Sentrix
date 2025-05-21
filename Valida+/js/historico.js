const firebaseConfig = {
      apiKey: "AIzaSyAzh7grLVeDUCsW00y4-B7w2waEtnM6RzA",
      authDomain: "validamais-54b99.firebaseapp.com",
      projectId: "validamais-54b99",
      storageBucket: "validamais-54b99.appspot.com",
      messagingSenderId: "554575483890",
      appId: "1:554575483890:web:3d66599c3b834c62c9116b"
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    let usuarioAtual = null;
    let cartoes = [];
    let cartaoIndexAtual = null;
    const modalSenha = new bootstrap.Modal(document.getElementById("modalSenha"));

    firebase.auth().onAuthStateChanged(async user => {
      if (!user) return window.location.href = "login.html";
      usuarioAtual = user;
      const snap = await db.collection("usuarios").doc(user.uid).collection("cartoes").orderBy("criadoEm", "desc").get();
      cartoes = snap.docs.map(doc => ({ id: doc.id, ...doc.data(), revelado: false }));
      renderizarCartoes();
    });

    function renderizarCartoes() {
      const container = document.getElementById("listaCartoes");
      container.innerHTML = "";

      cartoes.forEach((cartao, index) => {
        const nome = cartao.nome || "TITULAR";
        const numero = cartao.numero || "**** **** **** ****";
        const validade = cartao.novaValidade || "**/**";
        const cvv = cartao.cvv || "***";

        const wrapper = document.createElement("div");
        wrapper.className = "cartao-realista";
        wrapper.innerHTML = `
          <div class="cartao-inner ${cartao.revelado ? 'virado' : ''}" id="cartao-${index}">
            <div class="cartao-frente">
              <div class="d-flex justify-content-between">
                <img height="50px" src="logo.png" class="logo">
                <img src="mastercard.png" class="mastercard">
              </div>
              <div>
                <img src="chip.png" class="chip mb-2">
                <div class="fs-5">${nome}</div>
              </div>
            </div>
            <div class="cartao-verso">
              <div class="banda-magnetica"></div>
              <div class="linha-dados">
                <div>
                  <div class="campo-label">Número</div>
                  <div class="numero-cartao">${numero}</div>
                </div>
                <div>
                  <div class="campo-label">Validade</div>
                  <div class="validade-cartao">${validade}</div>
                </div>
                <div>
                  <div class="campo-label">CVV</div>
                  <div class="cvv-cartao">${cvv}</div>
                </div>
              </div>
              <div class="info-menor">
                platinum<br>
                Precisa de ajuda?<br>
                Mastercard Global Service 0800 759 124
              </div>
            </div>
          </div>
        `;

        const cartaoEl = wrapper.querySelector(".cartao-inner");
        cartaoEl.addEventListener("click", () => {
          if (!cartao.revelado) {
            cartaoIndexAtual = index;
            document.getElementById("senhaUsuario").value = "";
            modalSenha.show();
          } else {
            cartaoEl.classList.toggle("virado");
          }
        });

        container.appendChild(wrapper);
      });
    }

    document.getElementById("verificarSenha").addEventListener("click", async () => {
      const senha = document.getElementById("senhaUsuario").value.trim();
      if (!senha || usuarioAtual === null || cartaoIndexAtual === null) return alert("Digite sua senha");

      const cred = firebase.auth.EmailAuthProvider.credential(usuarioAtual.email, senha);
      try {
        await usuarioAtual.reauthenticateWithCredential(cred);
        cartoes[cartaoIndexAtual].revelado = true;
        renderizarCartoes();
        modalSenha.hide();
        document.getElementById(`cartao-${cartaoIndexAtual}`).classList.add("virado");
      } catch (e) {
        alert("Senha incorreta.");
      }
    });

    document.getElementById("logoutLink")?.addEventListener("click", e => {
      e.preventDefault();
      firebase.auth().signOut().then(() => window.location.href = "login.html");
    });