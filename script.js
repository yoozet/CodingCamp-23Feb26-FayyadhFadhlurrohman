if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.addEventListener("load", () => {
  window.scrollTo({ top: 0, behavior: "instant" });
});

const fadeEls = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

fadeEls.forEach((el) => observer.observe(el));

const sections = document.querySelectorAll("section[id], nav[id]");
const navLinks = document.querySelectorAll(".nav-link");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const active = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`,
        );
        if (active) active.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" },
);

sections.forEach((s) => navObserver.observe(s));

function formatDate(dateString) {
  if (!dateString) return "-";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function getCurrentTimeString() {
  const now = new Date();
  return now.toLocaleString("id-ID", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
}

function validateForm() {
  let valid = true;

  const fields = [
    { id: "nama", errMsg: "Nama wajib diisi." },
    { id: "tanggal", errMsg: "Tanggal lahir wajib diisi." },
    { id: "pesan", errMsg: "Pesan wajib diisi." },
  ];

  fields.forEach(({ id, errMsg }) => {
    const el = document.getElementById(id);
    const err = el.parentElement.querySelector(".error-msg");
    if (!el.value.trim()) {
      el.classList.add("error", "border-red-400");
      err.classList.add("show");
      err.textContent = errMsg;
      valid = false;
    } else {
      el.classList.remove("error", "border-red-400");
      err.classList.remove("show");
    }
  });

  const selected = document.querySelector('input[name="kelamin"]:checked');
  const kelaminErr = document
    .querySelector("#lakiLaki")
    .closest(".form-group")
    .querySelector(".error-msg");
  if (!selected) {
    kelaminErr.classList.add("show");
    kelaminErr.textContent = "Jenis kelamin wajib dipilih.";
    valid = false;
  } else {
    kelaminErr.classList.remove("show");
  }

  return valid;
}

const form = document.getElementById("messageForm");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validateForm()) return;

  submitBtn.classList.add("loading");
  submitBtn.textContent = "Mengirim...";

  setTimeout(() => {
    const nama = document.getElementById("nama").value.trim();
    const tanggal = document.getElementById("tanggal").value;
    const kelamin = document.querySelector(
      'input[name="kelamin"]:checked',
    ).value;
    const pesan = document.getElementById("pesan").value.trim();

    document.getElementById("resultTime").textContent =
      " " + getCurrentTimeString();
    document.getElementById("resultNama").textContent = nama;
    document.getElementById("resultTanggal").textContent = formatDate(tanggal);
    document.getElementById("resultKelamin").textContent = kelamin;
    document.getElementById("resultPesan").textContent = pesan;

    document.getElementById("emptyState").classList.add("hidden");
    document.getElementById("resultCard").classList.remove("hidden");

    submitBtn.classList.remove("loading");
    submitBtn.textContent = "Submit";

    if (window.innerWidth < 1024) {
      document
        .getElementById("previewBox")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 600);
});

["nama", "tanggal", "pesan"].forEach((id) => {
  const el = document.getElementById(id);
  const err = el.parentElement.querySelector(".error-msg");
  el.addEventListener("input", () => {
    el.classList.remove("error", "border-red-400");
    err.classList.remove("show");
  });
});

document.querySelectorAll('input[name="kelamin"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const err = radio.closest(".form-group").querySelector(".error-msg");
    err.classList.remove("show");
  });
});
