(function () {
    function initVideoControls() {
        document.querySelectorAll("video").forEach((video) => {
            video.removeAttribute("controls");

            if (video.dataset.customControls === "true") return;
            video.dataset.customControls = "true";

            const shell = document.createElement("div");
            shell.className = "video-shell";
            video.before(shell);
            shell.appendChild(video);

            const playButton = document.createElement("button");
            playButton.type = "button";
            playButton.className = "video-control video-control--play";
            playButton.setAttribute("aria-label", "Lire la vidéo");

            shell.appendChild(playButton);

            function togglePlayback() {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }

            playButton.addEventListener("click", togglePlayback);
            video.addEventListener("click", togglePlayback);
            video.addEventListener("play", () => {
                playButton.classList.add("is-playing");
                playButton.setAttribute("aria-label", "Mettre en pause");
            });
            video.addEventListener("pause", () => {
                playButton.classList.remove("is-playing");
                playButton.setAttribute("aria-label", "Lire la vidéo");
            });

        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initVideoControls);
    } else {
        initVideoControls();
    }

    const observer = new MutationObserver(initVideoControls);
    observer.observe(document.body, { childList: true, subtree: true });
})();
