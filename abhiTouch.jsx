document.addEventListener("click", function(e) {
  // Create ripple element
  const ripple = document.createElement("div");
  ripple.classList.add("ripple");

  // Set the position of the ripple
  ripple.style.left = `${e.clientX - 10}px`;
  ripple.style.top = `${e.clientY - 10}px`;

  // Append ripple to the body
  document.body.appendChild(ripple);

  // Remove ripple after animation ends
  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
});