import { html } from '@arrow-js/core'


export default function (articles) {

  return html`
    <section class="flex five" >
        <article class="full three-fifth-1000">
            </h2> Previous Posts:  </h2>
            <ul>
            ${() => articles.map(
              article => html`<li><a href="#article?slug=${article.slug}">${article.title}</a> - ${article.date}</li>`.key(article.id)
            )}
            </ul>
        </article>
    </section>
  `
}