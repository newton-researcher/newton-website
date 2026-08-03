const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menu?.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}));

document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const search = document.querySelector('[data-publication-search]');
const yearFilter = document.querySelector('[data-year-filter]');
const publications = [...document.querySelectorAll('[data-publication]')];
const count = document.querySelector('[data-publication-count]');
const empty = document.querySelector('[data-empty-state]');

function filterPublications() {
  const query = search?.value.trim().toLowerCase() ?? '';
  const year = yearFilter?.value ?? 'all';
  let visible = 0;
  publications.forEach((item) => {
    const textMatch = item.textContent.toLowerCase().includes(query);
    const yearMatch = year === 'all' || item.dataset.publicationYear === year;
    item.hidden = !(textMatch && yearMatch);
    if (!item.hidden) visible += 1;
  });
  if (count) count.textContent = `${visible} publication${visible === 1 ? '' : 's'}`;
  if (empty) empty.hidden = visible !== 0;
}

search?.addEventListener('input', filterPublications);
yearFilter?.addEventListener('change', filterPublications);
