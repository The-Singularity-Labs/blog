import { html } from '@arrow-js/core'
import showdown from 'showdown';
showdown.setFlavor('github');
showdown.setOption('openLinksInNewWindow', true);
showdown.setOption('metadata', true);
showdown.setOption('emoji', true);

export default function (article) {
  var converter = new showdown.Converter();
  const convertedHtml  = converter.makeHtml(article.content);

  return html`
    <section class="flex five" >
        <article class="full three-fifth-1000">
            ${convertedHtml}
            <br>
            ${() => article.tags.map(
              tag => html`<button type="button" class="pseudo">${tag}</button>`.key(tag)
            )}
        </article>
    </section>
  `
}