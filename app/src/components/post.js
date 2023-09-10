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
    <section class="flex justify-center items-center h-screen" >
        <article>
            ${convertedHtml}
            <br>
            ${() => article.tags.map(
              tag => html`<button onclick="location.href='./#archive?tag=${tag}'" type="button" class="pseudo">${tag}</button>`.key(tag)
            )}
        </article>
    </section>
  `
}