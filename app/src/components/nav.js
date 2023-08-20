import { html } from '@arrow-js/core'

export default function () {
  return html`
    <nav>
        <a href="/" class="brand">
            <span>Singularity Labs</span>
        </a>
        <input id="bmenu" type="checkbox" class="show">
        <label for="bmenu" class="burger toggle pseudo button">menu</label>
        <div class="menu">
            <a href="https://github.com/The-Singularity-Lab" target="_blank" class="pseudo button icon-g">GitHub</a>
            <a href="./post" class="button icon-file-code">rss</a>
        </div>
    </nav>
  `
}