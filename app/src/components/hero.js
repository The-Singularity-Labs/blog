import { html } from '@arrow-js/core'

export default function (article) {
  return html`
    <section class="flex five" >
        <article class="full four-fifth-1000">
            <header>
            <p class="date"> ${article.date}</p>
            <h1 class="title">${article.title}</h1>
            <h4 class="subtitle"> ${article.subtitle}</h4>
            </header>
        </article>
    </section>
  `
}