function abrirModal(titulo, htmlContenido) {
  document.getElementById('modal-title').textContent = titulo;
  document.getElementById('modal-body').innerHTML = htmlContenido;
  document.getElementById('modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  document.getElementById('modal').classList.remove('active');
  document.body.style.overflow = '';
}

/* Cerrar al pulsar el fondo oscuro */
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) cerrarModal();
});

/* Cerrar con tecla Escape (teclados físicos) */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') cerrarModal();
});

/* ── Swipe hacia abajo para cerrar (móvil) ── */
(function() {
  const overlay = document.getElementById('modal');
  const modal   = overlay.querySelector('.modal');
  let startY = 0;
  let dragging = false;

  modal.addEventListener('touchstart', function(e) {
    if (modal.scrollTop > 0) return;   /* solo desde el borde superior */
    startY   = e.touches[0].clientY;
    dragging = true;
  }, { passive: true });

  modal.addEventListener('touchmove', function(e) {
    if (!dragging) return;
    const dy = e.touches[0].clientY - startY;
    if (dy > 0) {
      modal.style.transform = `translateY(${dy}px)`;
      modal.style.transition = 'none';
    }
  }, { passive: true });

  modal.addEventListener('touchend', function(e) {
    if (!dragging) return;
    const dy = e.changedTouches[0].clientY - startY;
    modal.style.transition = '';
    modal.style.transform  = '';
    dragging = false;
    if (dy > 90) cerrarModal();   /* umbral: 90 px hacia abajo */
  });
})();
