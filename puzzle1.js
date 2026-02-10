document.addEventListener("DOMContentLoaded", () => {

  const botao = document.getElementById("btnDesvendar");
  const inputSenha = document.getElementById("senha");

  const mensagem = document.getElementById("mensagem");
  const erro = document.getElementById("erro");

  const audioSucesso = document.getElementById("audioSucesso");
  const audioErro = document.getElementById("audioErro");
  const bgm = document.getElementById("bgm");

  // 🔊 Volumes
  audioSucesso.volume = 1.0;
  audioErro.volume = 1.0;
  bgm.volume = 0.3;

  // 🔑 Palavra secreta
  const palavraSecreta = "zeckiram";

  let bgmIniciada = false;

  // ▶️ Libera áudio no primeiro clique do usuário
  document.body.addEventListener("click", () => {
    if (!bgmIniciada) {
      bgm.play()
        .then(() => {
          bgm.pause();
          bgm.currentTime = 0;
          bgmIniciada = true;
          console.log("Áudio liberado");
        })
        .catch(err => {
          console.log("Bloqueio de autoplay:", err);
        });
    }
  }, { once: true });

  botao.addEventListener("click", () => {

    // 🎵 Inicia BGM após liberação
    if (bgmIniciada && bgm.paused) {
      bgm.play().catch(() => {});
    }

    const resposta = inputSenha.value.toLowerCase().trim();

    mensagem.style.display = "none";
    erro.style.display = "none";

    audioSucesso.pause();
    audioErro.pause();
    audioSucesso.currentTime = 0;
    audioErro.currentTime = 0;

    bgm.volume = 0.15;

    if (resposta === palavraSecreta) {
      mensagem.style.display = "block";

      audioSucesso.play();

      audioSucesso.onended = () => {
        bgm.volume = 0.3;
      };

    } else {
      erro.style.display = "block";

      audioErro.play();

      audioErro.onended = () => {
        bgm.volume = 0.3;
      };

      if (navigator.vibrate) navigator.vibrate(200);
    }
  });

});
