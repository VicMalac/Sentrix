document.addEventListener('DOMContentLoaded', () => {
    const db = firebase.firestore();
    const listaCartoes = document.getElementById('listaCartoes');
  
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        window.location.href = "";
        return;
      }
  
      try {
        const cartoesSnapshot = await db
          .collection('usuarios')
          .doc(user.uid)
          .collection('cartoes')
          .orderBy('criadoEm', 'desc')
          .get();
  
        if (cartoesSnapshot.empty) {
          listaCartoes.innerHTML = "<p>Nenhum cartão validado ainda.</p>";
          return;
        }
  
        let html = "<div style='display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;'>";
  
        cartoesSnapshot.forEach(doc => {
          const data = doc.data();
          html += `
            <div class="cartao-historico" data-numero="${data.numero}" data-nome="${data.nome}" data-validade="${data.novaValidade}">
              <div class="frente-cartao">
                <div class="numero-cartao">0000 0000 0000 0000</div>
                <div class="nome-cartao">Clique para ver</div>
                <div class="validade-cartao">MM/AAAA</div>
              </div>
            </div>
          `;
        });
        
  
        html += "</div>";
        listaCartoes.innerHTML = html;
  
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        listaCartoes.innerHTML = "<p>Erro ao carregar histórico.</p>";
      }
    });
  
    // Função logout no histórico
    const logoutLink = document.getElementById('logoutLink');
    logoutLink?.addEventListener('click', (e) => {
      e.preventDefault();
      firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
      }).catch((error) => {
        console.error('Erro ao sair:', error);
      });
    });
  });
  