// Smooth scrolling
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Active link highlight
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollY = window.scrollY;

  sections.forEach(sec => {
    const top = sec.offsetTop - 80;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (scrollY >= top && scrollY < top + height) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
});

// About Me Read More popup
const readMoreBtn = document.getElementById("readMoreBtn");
const aboutFull = document.getElementById("aboutFull");
const closeAbout = document.getElementById("closeAbout");

readMoreBtn.addEventListener("click", () => {
  document.body.classList.add("blurred");
  aboutFull.classList.add("active");
});

closeAbout.addEventListener("click", () => {
  document.body.classList.remove("blurred");
  aboutFull.classList.remove("active");
});

// Click outside to close About popup
aboutFull.addEventListener("click", (e) => {
  if (e.target === aboutFull) {
    document.body.classList.remove("blurred");
    aboutFull.classList.remove("active");
  }
});
