const navToggle = document.querySelector('.nav-toggle');
  const dropdownMenu = document.querySelector('.nav-menu ul');

// Toggle dropdown menu on click
  navToggle.addEventListener('click', () => {
    dropdownMenu.style.display =
      dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
  });

// Zooming Block
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('gesturechange', (e) => e.preventDefault());
 