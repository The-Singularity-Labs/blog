import { html } from '@arrow-js/core'

export default function (hero_img_url) {
  return html`
    <section >
    <hgroup>
            <h1 class="title">Archive</h1>
            <p>I guess if you like what I write...</p>
            
            </hgroup>
            <img src="${hero_img_url}" style="max-width: 100%; width: auto; max-height: 300px; height:auto; hobject-fit: contain;" alt="hero image"> </img>
    </section>
  `
}