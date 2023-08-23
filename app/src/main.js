import "./assets/css/picnic.min.css";
import "./assets/css/local.css";
import feedURL from "url:./assets/db/feed.atom";
import store from "./store.js";
import nav from './components/nav.js';
import archive from './components/archive.js';
import archiveHero from './components/archive_hero.js';
import archiveHeroImg from "url:./assets/images/library.webp";
import post from './components/post.js';
import postHero from './components/post_hero.js';

import { html } from '@arrow-js/core'


const appElement = document.getElementById('app');

const template = html`
${() => nav(feedURL)}
<main id="home" class="app">
    ${() => {
        if (store.articleSlug && store.article) {
            return postHero(store.article);
        } else {
            return archiveHero(archiveHeroImg);
        }
    }}
    ${() => {
        if (store.articleSlug && store.article) {
            return post(store.article);
        } else {
            return archive(store.archive);
        }
    }}
</section>
</main>
`

template(appElement)