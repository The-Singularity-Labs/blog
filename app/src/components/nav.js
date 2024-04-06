import { html } from '@arrow-js/core'

export default function (feedURL, isLightMode, lightModeTogle) {
  return html`
    <nav>
      <ul>
        <li>        <a href="https://github.com/The-Singularity-Labs"  target="_blank">
        <strong>Singularity Labs</strong>
    </a></li>
      </ul>
      <ul>
        <li><a href="#">📚 Archive</a></li>
        <li><a href="${feedURL}"  target="_blank">📡 Subscribe</a></li>
        <li     @click="${() => {lightModeTogle()}}">${() => {return isLightMode ? "☀️" : "🌙"}}</li>
      </ul>
    </nav>
    <nav>
  `
}