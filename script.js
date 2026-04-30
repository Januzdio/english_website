const pageMap = {
  "index.html": "home",
  "case-study.html": "case",
  "reflection.html": "reflection"
};

const currentPath = window.location.pathname.split("/").pop() || "index.html";
const currentPage = pageMap[currentPath];

document.querySelectorAll(".nav-links a").forEach((link) => {
  if (link.dataset.page === currentPage) {
    link.classList.add("active");
  }
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("show"));
}

const shirtRange = document.getElementById("shirtRange");
const shirtCount = document.getElementById("shirtCount");
const impactMessage = document.getElementById("impactMessage");

function updateImpactMessage(count) {
  if (!impactMessage || !shirtCount) return;

  shirtCount.textContent = String(count);

  if (document.getElementById("statWater")) {
    document.getElementById("statWater").textContent = (count * 2700).toLocaleString() + " L";
    document.getElementById("statWaste").textContent = (count * 0.2).toFixed(1) + " kg";
    document.getElementById("statCo2").textContent = (count * 3.5).toFixed(1) + " kg";
  }

  if (count <= 5) {
    impactMessage.textContent = "Lower frequency buying reduces pressure on fast production and lowers potential waste over time.";
  } else if (count <= 15) {
    impactMessage.textContent = "Moderate buying can still create large effects when millions of people follow the same pattern.";
  } else {
    impactMessage.textContent = "High-frequency buying strongly reinforces the throwaway model: more production pressure, more waste, and more hidden costs.";
  }
}

if (shirtRange) {
  shirtRange.addEventListener("input", () => updateImpactMessage(Number(shirtRange.value)));
  updateImpactMessage(Number(shirtRange.value));
}

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  const bar = document.getElementById("progress-bar");
  if (bar) bar.style.width = progress + "%";
});