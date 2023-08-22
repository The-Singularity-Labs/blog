import { html } from '@arrow-js/core'

export default function (feedURL) {
  return html`
    <nav>
        <a href="https://github.com/The-Singularity-Labs"  target="_blank"  class="brand">
            <span>Singularity Labs</span>
        </a>
        <input id="bmenu" type="checkbox" class="show">
        <label for="bmenu" class="burger toggle pseudo button">menu</label>
        <div class="menu">
            <a href="https://github.com/The-Singularity-Labs"class="pseudo button icon-g">📚 Archive</a>
            <a href="${feedURL}"  target="_blank" class="button icon-file-code">📡 Subscribe</a>
        </div>
    </nav>
  `
}