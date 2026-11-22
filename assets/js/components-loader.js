(async () => {
    const components = document.querySelectorAll("[data-component]");

    await Promise.all(Array.from(components).map(async (placeholder) => {
        const name = placeholder.dataset.component;

        try {
            const response = await fetch(`components/${name}.html`);
            if (!response.ok) {
                throw new Error(`Impossible de charger le composant ${name}`);
            }

            placeholder.outerHTML = await response.text();
        } catch (error) {
            placeholder.textContent = "Erreur lors du chargement de cette section.";
            console.error(error);
        }
    }));
})();
