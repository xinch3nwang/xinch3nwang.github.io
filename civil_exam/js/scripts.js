// document.addEventListener('DOMContentLoaded', function() {
//     const currentPath = window.location.pathname;
//     const links = document.querySelectorAll('.nav-bar a');
//     links.forEach(link => {
//         if (link.getAttribute('href') === currentPath.split('/').pop() || 
//             (currentPath.split('/').pop() === '' && link.getAttribute('href') === 'index.html')) {
//             link.classList.add('active');
//         }
//     });
// });