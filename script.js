const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const counters = document.querySelectorAll('.counter');
const revealElements = document.querySelectorAll('.reveal');
const calculateBtn = document.getElementById('calculateBtn');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const bmiResult = document.getElementById('bmiResult');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.18,
});

revealElements.forEach((element) => observer.observe(element));

const runCounters = () => {
  counters.forEach((counter) => {
    const target = +counter.dataset.target;
    const speed = 120;
    const update = () => {
      const current = +counter.innerText.replace('+', '').replace('%', '');
      const increment = Math.ceil(target / speed);
      if (current < target) {
        counter.innerText = `${Math.min(current + increment, target)}`;
        setTimeout(update, 20);
      } else {
        if (counter.innerText.includes('%')) {
          counter.innerText = `${target}`;
        } else {
          counter.innerText = `${target}`;
        }
      }
    };
    update();
  });
};

const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      runCounters();
      obs.disconnect();
    }
  });
}, { threshold: 0.8 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) counterObserver.observe(statsSection);

const calculateBMI = () => {
  const height = Number(heightInput.value);
  const weight = Number(weightInput.value);
  if (!height || !weight) {
    bmiResult.textContent = 'Enter both height and weight to calculate.';
    return;
  }
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  let category = 'Balanced';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Strong focus required';
  bmiResult.textContent = `BMI ${bmi} — ${category}`;
};

calculateBtn.addEventListener('click', (event) => {
  event.preventDefault();
  calculateBMI();
});

window.addEventListener('load', () => {
  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 50}ms`;
  });
});
