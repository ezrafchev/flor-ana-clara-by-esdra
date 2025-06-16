import gsap from 'gsap';
import lottie from 'lottie-web';

const animationContainer = document.getElementById('animationContainer');

function startAnimation() {
  animationContainer.innerHTML = '';

  try {
    const anim = lottie.loadAnimation({
      container: animationContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: './animations/sample-animation.json', // Adjusted path for GitHub Pages
    });

    anim.addEventListener('data_failed', () => {
      console.error('Failed to load Lottie animation data.');
    });

    anim.addEventListener('error', (e) => {
      console.error('Lottie animation error:', e);
    });
  } catch (error) {
    console.error('Error initializing Lottie animation:', error);
  }

  // Simple GSAP fallback animation: fade in container background color
  gsap.to(animationContainer, { duration: 1, backgroundColor: '#fbb6ce', opacity: 1 });
}

window.addEventListener('DOMContentLoaded', () => {
  startAnimation();
});
