(function () {
    function initProcess() {
        const accordion = document.querySelector(".process__accordion");
        if (!accordion || accordion.dataset.initialized === "true") return;

        accordion.dataset.initialized = "true";
        const steps = Array.from(accordion.querySelectorAll(".process__step"));
        let activeIndex = 0;

        function activate(index) {
            activeIndex = (index + steps.length) % steps.length;
            accordion.dataset.activeIndex = String(activeIndex);

            steps.forEach((step, stepIndex) => {
                const isActive = stepIndex === activeIndex;
                const tab = step.querySelector(".process__tab");

                step.classList.toggle("is-active", isActive);
                step.setAttribute("aria-hidden", String(!isActive));
                tab.setAttribute("aria-selected", String(isActive));

                if (!isActive) {
                    step.querySelectorAll("video, audio").forEach((media) => {
                        media.pause();
                    });
                }
            });
        }

        steps.forEach((step, index) => {
            const tab = step.querySelector(".process__tab");
            tab.addEventListener("click", () => {
                activate(index);
            });
        });

        activate(activeIndex);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initProcess);
    } else {
        initProcess();
    }

    const observer = new MutationObserver(initProcess);
    observer.observe(document.body, { childList: true, subtree: true });
})();
