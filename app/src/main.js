import "./assets/css/picnic.min.css";
import "./assets/css/local.css";
import Store from './store.js'
import nav from './components/nav.js';
import hero from './components/hero.js';
import post from './components/post.js';

import { html } from '@arrow-js/core'
import store from "./store.js";

const appElement = document.getElementById('app');

const template = html`
${() => nav()}
<main id="home" class="app">
    ${() => {
        if (store.articleSlug) {
            return hero(store.article)
        }
    }}
    ${() => {
        if (store.articleSlug) {
            return post(store.article)
        } else {
            return "No article selected"
        }
    }}
</section>
</main>
`

template(appElement)