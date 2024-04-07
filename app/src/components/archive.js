import { html } from '@arrow-js/core'


export default function (articles) {

  return html`
    <section >
      <div class="container-fluid .grid-container">
            <h6> Previous Posts:  </h6>
            <ul>
            ${() => articles.map(
              article => html`<li><a href="#article?slug=${article.slug}">${article.title}</a> - ${article.date}</li>`.key(article.id)
            )}
            </ul>
      </div>
    </section>
  `
}