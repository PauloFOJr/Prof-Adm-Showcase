(function () {
  var root = document.documentElement;

  // Tema claro/escuro
  var btn = document.getElementById('theme');
  function current() {
    return root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function label() { if (btn) btn.textContent = current() === 'dark' ? 'Claro' : 'Escuro'; }
  if (btn) {
    label();
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      label();
    });
  }

  // Ano no rodapé
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  // Visualizador de telas
  var viewer = document.getElementById('viewer');
  var vimg = document.getElementById('viewer-img');
  document.querySelectorAll('.gallery button').forEach(function (b) {
    b.addEventListener('click', function () {
      vimg.src = b.dataset.full;
      vimg.alt = b.dataset.alt || '';
      viewer.showModal();
    });
  });
  if (viewer) viewer.addEventListener('click', function (e) { if (e.target === viewer) viewer.close(); });

  // Formulário de contato (abre o e-mail do usuário)
  var form = document.getElementById('contact');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var body = d.get('msg') + '\n\n— ' + d.get('nome') + ' (' + d.get('email') + ')';
      location.href = 'mailto:' + form.dataset.email +
        '?subject=' + encodeURIComponent('ProfAdm: ' + d.get('assunto')) +
        '&body=' + encodeURIComponent(body);
    });
  }
})();
