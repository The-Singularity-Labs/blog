import { html } from '@arrow-js/core'

export default function (article) {
  return html`
    <section >
      <hgroup>
        <small><p class="date"><b>Last Updated:</b> ${article.date}</p></small>
        <h1 class="title">${article.title}</h1>
        <p> ${article.subtitle}</p>
        
      </hgroup>
      <img src="${article.hero_img_url}" style="max-width: 100%; width: auto; max-height: 300px; height:auto; hobject-fit: contain;"> </img>
    </section>
    <hr />
  `
}