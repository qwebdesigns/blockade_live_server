document.addEventListener('mousemove', function(e) {
    const pointer = document.getElementById('pointer');
    pointer.style.left = e.pageX + 'px';
    pointer.style.top = e.pageY + 'px';
});
const settingsButton = document.getElementById('settingsButton');

const sett_pan = document.querySelector('.Settings_Panel');

settingsButton.addEventListener('mouseenter', () => {
    pointer.style.width = '0px';
    pointer.style.height = '0px';
});
sett_pan.addEventListener('mouseenter', () => {
    pointer.style.width = '0px';
    pointer.style.height = '0px';
});



settingsButton.addEventListener('mouseleave', () => {
    pointer.style.width = '2vw'; // Вернуть к исходным размерам
    pointer.style.height = '2vw';
});
sett_pan.addEventListener('mouseleave', () => {
    pointer.style.width = '2vw'; // Вернуть к исходным размерам
    pointer.style.height = '2vw';
});










