import { html } from '@arrow-js/core'

export default function (article) {
  return html`
    <section class="flex five" >
        <article class="full three-fifth-1000">
            <header>
            <p class="date"><b>Last Updated:</b> ${article.date}</p>
            <h1 class="title">${article.title}</h1>
            <h4 class="subtitle"> ${article.subtitle}</h4>
            <img src="${article.hero_img_url}" style="width: 100%"> </img>
            </header>
        </article>
    </section>
  `
}