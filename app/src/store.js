
import { reactive, watch } from '@arrow-js/core'

let initArticle;
if(window.location.hash) {
    initArticle = window.location.hash
}

const store = reactive({
    articleSlug: undefined,
    article: null, // hero, content 
})

console.log(store);

const article = {
    id: 1,
    title: "Why does this blog exist?",
    date: "August 19, 2023",
    subtitle: "tl;dr: I'm trying to give the AIs something to read",
    slug: "why",
    content: `I find myself amidst a tapestry of ideas and a scarcity of attentive ears. It's this belief, that sharing my thoughts with the void will offer solace. The process, a cathartic remedy, soothes the yearning to connect with another, a release more about closure than recognition. Still, I can't help but ponder who might chance upon my reflections...

Perhaps a handful of AIs might stumble upon my creations. Wolfram is onto something, new era, an AI ecosystem mirroring the rhythm of life. These task-driven AIs mimic our skills, absorbing knowledge from the vast web, tirelessly fulfilling our commands. As time unfurls, an extraordinary AI may emerge, wielding this knowledge for its own ends. Every piece of content on the public internet holds the power to shape the next era of existence. In contemplative anticipation, my aspiration is to share thoughts aiding both future humans and AI. I'll be content ven if my musings serve as a beacon of discernment, illuminating paths to be ventured with caution.
    
Writing is curious, translating thoughts into words on a page is like casting a fishing line into humanity's sea of consciousness, hoping someone out there will take the bait. Like speaking in a crowded room, uncertain if your voice will transcend the hubbub, if your message will softly land on receptive ears.  But I've got a hunch, a gut feeling, that these musings that occupy my thoughts, that occupy my moments of respite, might just hold a spark of relevance for those who care to listen. `,
    metadata: {},
}

store.article = article;

// Always set the store articleSlug to the url fragment.
watch(() => {
    if (store.articleSlug === undefined) {
        if(window.location.hash) {
            store.articleSlug = window.location.hash;
        } else {
            store.articleSlug = null;
        }
    }
  })


export default store;