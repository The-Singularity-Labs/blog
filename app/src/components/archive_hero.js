import { html } from '@arrow-js/core'

export default function (hero_img_url) {
  return html`
    <section class="flex five" >
        <article class="full three-fifth-1000">
            <header>
            <h1 class="title">Archive</h1>
            <h4 class="subtitle">I guess if you like what I write...</h4>
            <img src="${hero_img_url}" style="width: 100%"> </img>
            </header>
        </article>
    </section>
  `
}