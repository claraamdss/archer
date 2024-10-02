let startX;
let currentX;
let isDragging = false;
let slideIndex = 0;

const carrosseis = document.querySelectorAll('.carrossel');
carrosseis.forEach(carrossel => {
    const slides = carrossel.querySelectorAll('img');
    const totalSlides = slides.length;

    // Função para mover os slides
    function translateCarrossel() {
        carrossel.style.transform = `translateX(${-slideIndex * 100}%)`;
    }

    // Inicializar carrossel
    translateCarrossel();

    // Função para iniciar o arrastar
    carrossel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        carrossel.style.transition = 'none';  // Remove transição enquanto arrasta
    });

    carrossel.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        carrossel.style.transition = 'none';  // Remove transição enquanto arrasta
    });

    // Função para o movimento do arrasto
    carrossel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
        const deslocamento = currentX - startX;
        carrossel.style.transform = `translateX(${-slideIndex * 100 + (deslocamento / carrossel.clientWidth) * 100}%)`;
    });

    carrossel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const deslocamento = currentX - startX;
        carrossel.style.transform = `translateX(${-slideIndex * 100 + (deslocamento / carrossel.clientWidth) * 100}%)`;
    });

    // Função para terminar o arrasto
    carrossel.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        carrossel.style.transition = 'transform 0.5s ease-in-out';  // Volta a adicionar a transição

        const deslocamento = e.clientX - startX;
        if (deslocamento < -50) {
            slideIndex = (slideIndex + 1) % totalSlides;
        } else if (deslocamento > 50) {
            slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        }

        translateCarrossel();
    });

    carrossel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        carrossel.style.transition = 'transform 0.5s ease-in-out';  // Volta a adicionar a transição

        const deslocamento = e.changedTouches[0].clientX - startX;
        if (deslocamento < -50) {
            slideIndex = (slideIndex + 1) % totalSlides;
        } else if (deslocamento > 50) {
            slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        }

        translateCarrossel();
    });

    // Cancelar arrasto quando sai da área
    carrossel.addEventListener('mouseleave', () => {
        if (!isDragging) return;
        isDragging = false;
        carrossel.style.transition = 'transform 0.5s ease-in-out';
        translateCarrossel();
    });
});
