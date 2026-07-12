const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Abrir menu");
        });
    });
}

const form = document.getElementById('form');

if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Enviando...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert("Mensagem enviada com sucesso!");
                form.reset();
            } else {
                alert("Erro: " + data.message);
            }
        } catch (error) {
            alert("Algo deu errado. Tente novamente.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
