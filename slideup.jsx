window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');

        sections.forEach((section) => {
            const sectionPosition = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // If the section is in the viewport, add the "show" class
            if (sectionPosition < windowHeight - 100) {
                section.classList.add('show');
            } else {
                section.classList.remove('show');
            }
        });
    });