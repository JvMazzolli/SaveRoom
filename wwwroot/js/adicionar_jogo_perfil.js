const API_BASE_URL = "http://localhost:5209/api"; 
document.addEventListener("DOMContentLoaded", () => {
  const addGameForm = document.getElementById("add-game-form");

  if (addGameForm) {
    addGameForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const idPerfil = parseInt(document.getElementById("idPerfil").value);
      const nomeJogo = document.getElementById("nomeJogo").value;
      const status = document.getElementById("status").value;

      try {
        const response = await fetch(`${API_BASE_URL}/Backlog/adicionar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idPerfil, nomeJogo, status })
        });

        if (!response.ok) throw new Error("Falha ao adicionar jogo");

        const data = await response.json();

        document.getElementById("response-message").innerHTML = `
          <p><strong>${data.mensagem}</strong></p>
          <p>ID Backlog: ${data.idBacklog}</p>
          <p>Status: ${data.status}</p>
        `;
      } catch (error) {
        document.getElementById("response-message").innerHTML = `
          <p style="color:red;">Erro ao adicionar jogo: ${error.message}</p>
        `;
      }
    });
  }
});
