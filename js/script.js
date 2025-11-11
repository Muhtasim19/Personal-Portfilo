// Smooth scroll for anchor links + active nav highlight
document.addEventListener('DOMContentLoaded', () => {
  // set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  const navLinks = document.querySelectorAll('.nav-link');

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // update active nav (small delay for UX)
      setTimeout(() => {
        navLinks.forEach(n => n.classList.remove('active'));
        if (a.classList.contains('nav-link')) a.classList.add('active');
      }, 300);
    });
  });

  // reveal elements on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // ABOUT toggle
  const aboutToggle = document.getElementById('about-toggle');
  const aboutFull = document.getElementById('about-full');
  const aboutPreview = document.getElementById('about-preview');
  let aboutOpen = false;

  aboutToggle.addEventListener('click', () => {
    aboutOpen = !aboutOpen;
    if (aboutOpen) {
      aboutFull.style.display = 'block';
      aboutPreview.style.webkitLineClamp = 'none';
      aboutToggle.textContent = 'Show less';
      aboutFull.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      aboutFull.style.display = 'none';
      aboutPreview.style.webkitLineClamp = '2';
      aboutToggle.textContent = 'Read more';
    }
  });

  // Projects toggle: simple expand (this is a placeholder for more projects)
  const projectsToggle = document.getElementById('projects-toggle');
  const projectsGrid = document.getElementById('projects-grid');
  let projectsExpanded = false;
  projectsToggle.addEventListener('click', () => {
    projectsExpanded = !projectsExpanded;
    if (projectsExpanded) {
      // Add a small placeholder additional card (or you can load dynamically)
      const moreCard = document.createElement('div');
      moreCard.className = 'project-card extra';
      moreCard.innerHTML = `
        <a href="https://github.com/Muhtasim19" target="_blank" rel="noopener noreferrer">
          <div class="project-media"><div class="media-placeholder">More on GitHub</div></div>
          <div class="project-body"><h3>Explore more</h3><p class="short-desc">View additional projects and source code on my GitHub.</p><div class="project-actions"><span class="tag">GitHub</span></div></div>
        </a>
      `;
      projectsGrid.appendChild(moreCard);
      projectsToggle.textContent = 'Show less';
      moreCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      // remove extras
      const extras = projectsGrid.querySelectorAll('.project-card.extra');
      extras.forEach(e => e.remove());
      projectsToggle.textContent = 'View more projects';
    }
  });

  // small helper: update active nav on scroll (optional)
  const sections = document.querySelectorAll('main section, header');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.id) {
        navLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));
});
const readMoreBtn = document.querySelector('.read-more-btn');
const aboutText = document.querySelector('.about-text');

readMoreBtn.addEventListener('click', () => {
  aboutText.classList.toggle('expanded');
  aboutText.classList.toggle('about-expanded');
  readMoreBtn.textContent = aboutText.classList.contains('expanded')
    ? 'Show Less'
    : 'Read More';
});
