import gsap from 'gsap';
import lottie from 'lottie-web';

const animationContainer = document.getElementById('animationContainer');

function startAnimation() {
  animationContainer.innerHTML = '';
  // Example: Load a Lottie animation or start GSAP animation here
  const anim = lottie.loadAnimation({
    container: animationContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './src/animations/sample-animation.json', // Updated relative path
  });

  // Additional GSAP animations can be added here
  gsap.to(animationContainer, { duration: 1, opacity: 1 });
}

// Start animation automatically on page load
window.addEventListener('DOMContentLoaded', () => {
  startAnimation();
});
