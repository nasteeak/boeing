const airplane = document.getElementById('airplaneWrapper');

// Начальные параметры
let x = -100; // Старт за левым краем
let y = window.innerHeight / 2; 
let targetY = y; 
let speed = 2.5; // Уменьшили скорость (было 5) для более плавного полета
let angle = 0; 

// Коэффициент плавности поворота
const smoothness = 0.02; 

function fly() {
    // Двигаем вперед
    x += speed;

    // Логика зигзагов:
    // Шанс смены цели чуть выше, чтобы движение было живее
    if (Math.random() < 0.03) { 
        // Новая цель - случайная высота в пределах экрана
        targetY = Math.random() * (window.innerHeight - 100) + 50;
    }

    // Плавное приближение к цели (Lerp)
    // Самолет всегда стремится к targetY, поэтому зигзаги начинаются сразу
    y += (targetY - y) * smoothness;

    // Если улетел за правый край -> телепорт влево
    if (x > window.innerWidth + 50) {
        x = -100;
        // При новом появлении сразу задаем новую высоту и цель
        y = Math.random() * (window.innerHeight - 100) + 50;
        targetY = y; 
    }

    // Вычисляем угол наклона
    const dy = targetY - y;
    // Немного уменьшили чувствительность наклона для красоты
    angle = dy * 0.4; 

    // Применяем стили
    airplane.style.left = `${x}px`;
    airplane.style.top = `${y}px`;
    airplane.style.transform = `rotate(${angle}deg)`;

    requestAnimationFrame(fly);
}

// Запуск анимации
fly();

// Реакция на скролл (ускорение)
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    // Теперь скорость меняется от 2.5 до 8 (было от 5 до 15)
    speed = 2.5 + (scrollPercent * 5.5);
}, { passive: true });