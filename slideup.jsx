document.addEventListener("scroll", function() {
  const sections = document.querySelectorAll("section");

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 50) {
      section.classList.add("show");
    }
  });
});