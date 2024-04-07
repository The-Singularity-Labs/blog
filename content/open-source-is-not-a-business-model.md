---
slug: open-source-is-not-a-business-model
author: pescennius
title: 👏👏👏 Open Source is not a business model 👏👏👏
subtitle: "tl;dr: stop bitching about not getting paid for your pet projects"
hero_img_url: "https://qc5xczczyendfjcu6m6sehtmkmw7yub756u75siwrky7xkcdbjxa.arweave.net/gLtxZFnBGjKkVPM9Ih5sUy38UD_vqf7JFoqx-6hDCm4"
published: 2023-09-08T11:21:00Z
updated: 2023-09-08T11:21:00Z
tags: ["tech", "open source", "singularity labs"]
---

Open source and its licensing implications have been a [pivotal topic in the software industry](https://opencoreventures.com/blog/2023-08-23-hashicorp-switching-bsl-shows-need-for-open-charter-companies/), with notable examples like [Redis](https://arstechnica.com/information-technology/2024/04/redis-license-change-and-forking-are-a-mess-that-everybody-can-feel-bad-about/#:~:text=Redis%2C%20a%20tremendously%20popular%20tool,in%20why%20they%20did%20this.), [Elastic](https://www.zdnet.com/article/elastic-changes-open-source-license-to-monetize-cloud-service-use/) and [Hashicorp](https://zeet.co/blog/the-impact-of-hashicorps-license-change-on-terraform-users-and-providers-what-you-need-to-know) adjusting product licenses to ward off competitors. Today, I aim to share my thoughts on what I believe open source truly signifies, its alignment with business models, and the innovative approaches within the industry.

## What is Open Source?

I believe Open source signifies a commitment to shared software accessibility, and is a spectrum ranging from merely "source available" to "free as in speech". This philosophy promotes visible, usable, and potentially modifiable software, ensuring its democratization.

## Open Source ≠ Business Model

One common misconception is equating open source with a direct revenue stream. Calling a project "open source" should not imply anything about how the contributors of the project sustain themselves. In the vast realm of software, only a few business models really hold: selling ads, selling licenses, selling support, or renting compute. To yield more than a marginal profit on any of these, requires some restrictive licensing. Without such restrictions, the permissive licensing pushes the market closer to perfect competition.

## Valuable Technology Gets Funded

It's rare to find truly indispensable open source projects that aren't backed by some foundation or major consortium. Most discourse around open source financing, concerns VC-backed startups. These startups often pivot between their entrepreneurial ambitions and the genuine essence of open source, leading to diverging philosophies. Ultimately I think this is where the crux of the conflict occurs. VC backed companies just don't have the incentives to rely on to build open source software that is more than "source available". I believe a number of "open core" startups will figure it out with source available licenses. I also believe startups need to be more upfront and transparent about these conflicts of interest when they start the projects, as not to lure in contributors who will then get "baited and switched". It can be as simple as launching projects with the Elastic license or AGPL from the beginning and advertising them as "Source Available". 

## Support Based Revenue

[DuckDB](https://duckdb.org/), a project birthed from an academic team in Europe, offers an illuminating perspective. [They've opted for crowdfunding](https://duckdblabs.com/), seeking backing from enterprises that find value in the open source project. I personally believe the support based financing model remains the best financing model for more "pure" open source projects. Open source teams can leverage their most value asset, expertise, to generate revenue. If the expertise doesn't command a high enough price to support the team, I'd argue the project itself isn't valuable enough to merit financial support for its existence. At that point its something that is better funded via public goods funding for the arts or research. 

This support model has been used for decades, notably by the [SQLite team](https://www.sqlite.org/consortium.html). Companies are happy to spend money on software, or else we wouldn't have a software industry to begin with. But companies want the money they spend to actually solve the problems they have. With most open source software, the challenges are not in running the software, its fixing and altering the software. A company paying DuckDB is receiving prioritization of their bugs and features, this is material value. While companies influencing project direction might raise eyebrows, it's essential to recognize that these contributors possess the highest stake in the project – hence their financial backing. Their investment isn't just monetary but also strategic, intertwining their success with the project's trajectory. VC backed startups avoid this model because it does lead to the juicy SaaS style margins and high growth trajectories.

Open source teams just need to accept the reality that if they want their software to be freely available to all, they are not going to be making unicorn types of money doing it. This is a tradeoff that must be accepted so that teams can start to make the decision more directly. The DuckDB team has opted for distribution over monetization, while [MotherDuck](https://motherduck.com/), who is building a SaaS platform on DuckDB, has chosen the opposite. This is what a free market can offer us and neither team is "right" or "wrong" for their choice. 


## Why do I contribute to open source?

As I conclude these thoughts on open source, a question I often encounter is, "Why do you contribute to open source?" Let me lay down my motivations:

* **Professional Synergy:** Interestingly, I am paid to contribute to open source as part of my day job. The company I work for deeply integrates open-source solutions into its tech framework. Upstreaming changes is a no-brainer for us, primarily because the open-source projects we depend on are peripheral to our unique value proposition.
* **Accelerating Technological Advancement:** Every contribution I make is with the hope that it acts as a catalyst for other engineers and teams. The vision is straightforward - if I can assist other individuals or corporate teams in overcoming a challenge, the collective pace of technological development surges.
* **Passion for Projects like OSM:** My contributions aren't limited to just code. I actively contribute to projects like [OpenStreetMap (OSM)](https://streetcomplete.app/?lang=en) with a similar ethos – driving global technological progress and shared knowledge.
* **(Almost) No Strings Attached:** Here's a sentiment I hold firmly: if someone erects a billion-dollar startup leveraging my open-source contributions, kudos to them! I've donned multiple hats in the startup ecosystem, even co-founding ventures. I can vouch that while the code is crucial, it's seldom the magic ingredient that propels a startup into the billion-dollar club. The journey to such monumental success comprises strategic decisions, market positioning, team dynamics, and sometimes, a sprinkle of serendipity. However I'm not an open source "maxi" and I draw the line at my contributions being used for activities I find morally reprehensible. I enforce this through use of an Ethical Source License called the [Hippocratic License](https://firstdonoharm.dev/learn/). 

