---
slug: 2024-roadmap
author: pescennius
title: Singularity Labs Roadmap
subtitle: "tl;dr: I'm dabbling into web3 apps"
hero_img_url: "https://pensieve.ngrok.io/lq2dCofQlPM0Zxe08NQg5n0ZBJJGAGlRVsekQVV_vOc"
published: 2024-04-14T09:21:00Z
updated: 2024-04-14T09:21:00Z
tags: ["open source", "arweave", "algorand", "defi", "sql"]
---

As we get deeper 2024, I'm excited to share my roadmap for a series of ambitious projects aimed at enhancing personal sovereignty over the software we use daily. My initiatives are centered around developing solutions that prioritize decentralized technologies and local-first approaches, giving individuals greater control and autonomy. From pioneering a decentralized database system with **ReduceDB** to innovating on the Algorand blockchain for secure, user-empowered applications, each project is crafted to empower users to own their data and the tools they use. Not every one of these projects I plan to take on myself. Some I hope to push other ambitious teams into incorporating into their roadmaps. 

#### ReduceDB

**ReduceDB** is a proposed local-first application database that leverages decentralized storage, aiming to be the structural core for numerous future projects. It draws inspiration from solutions like [Electric SQL](https://electric-sql.com/), but sets itself apart by being open-source and requiring only the user's bring a object storage keys.

#### Arweave Protomaps Deployment Tool

A CLI tool to simplify the deployment of [Protomaps](https://protomaps.com/) to the Arweave platform, enhancing accessibility and integration for developers seeking to leverage decentralized, permanent web hosting for their map data. Since I enabled range queries on Arweave gateways, this is a feasible use case. 

#### Algogator Replicator

A toolchain designed to replicate data from the Algorand blockchain to S3 compatible storage. It would feature customizable filters for data by applications or users and store data in Parquet format, allowing efficient queries via DuckDB clients. This mirrors the objectives of protomaps but with a focus on decentralizing the replication process to minimize developer overhead. 

#### Cornelius

A user-friendly UI for S3-backed storage and a syncing service to replicate data between S3 storage buckets and Arweave, enhancing data availability and redundancy. When paired with ReduceDB, this becomes a way for users to have high confidence using decnetralized object storage providers as they can be certain they'll have backups to restore from.

#### Rover

**Rover** is envisioned as a versatile postmarketOS image that bundles several essential services (Arweave gateway, Minio, Tailscale, etc.) into one easily deployable package, ideal for quickly setting up robust homelabs on recycled mobile phones. I might also make some more tweaks to the arweave gateway to enable auto caching of a certain accounts files. 

#### FloppyDrive

**FloppyDrive** will be an SPA deployed via Arweave. It will be a generic s3 compatible browsing app made to have an easy UI with robust preview support. If done properly, it will eliminate my usage of [NextCloud](https://nextcloud.com/). The goal is to leverage Cornelius to do manual backups to Arweave. 

#### StraphangerDB

**StraphangerDB** is an open data project dedicated to collecting and organizing mass transit data into a user-friendly format, initially focused on NYC but designed for global scalability.

#### Data Based Train Control (DBTC)

An application built on StraphangerDB that allows interactive data manipulation and insight discovery, aimed at transit enthusiasts and researchers. The goal is to give the public an easier way to understand the details of their local system's operations

#### Play for Action 2.0

We have our own fork of [Brand New Subway](https://github.com/The-Singularity-Labs/play-for-action) called Play for Action. I have been working on elements of 2.0 for over a year and it is going to be a complete overhaul of the game, utilizing StraphangerDB to have very current data. 

#### Mumblr Upgrade

An enhancement for my Arweave-based blog **Mumblr**, transforming it into a full-fledged tumble blogging platform backed by decentralized storage. This upgrade is likely to utilize ReduceDB to manage its data needs efficiently.

#### Decentralized Escrow for Algorand

A decentralized escrow application on the Algorand blockchain, similar to Nexus but without an associated token. This contract will form the foundation for some other applications I'd like to build. It would introduce some novel new features:

-  allowing arbitration powers to be optionally assigned to a third party, enhancing transaction security and trust.
- Community escrows where either side of the transaction is a group of wallets rather than an individual wallet
- option to require payments by one or both parties to sustain escrow

#### Algorand E-Commerce Protocol

A protocol on Algorand designed for listing and auctioning items, employing Dutch auctions and utilizing smart contracts for secure payment processing through the decentralized escrow application.

#### Contract Auction App

This application would enable consumers to post jobs and contractors to bid through Dutch auctions. Consumer approval is necessary for bids to be valid, thus empowering consumers in the transaction process. Payment for jobs would be handled via onchain decentralized escrow.

#### Algorand Smart Contract Explainer

An LLM-powered application that explains Algorand smart contracts and checks them against a database of audited contracts for detailed security insights. 

#### Arweave Web Pinning Extension

An extension to pin web content to Arweave, utilizing Singlefile to create a single HTML file for archival. This could integrate with Mumblr for reblogging purposes.

#### Algorand Ticketing App

A basic event ticketing application leveraging Algorand's blockchain. It would function similarly to Eventbrite, with integration to Perawallet for seamless ticket purchasing.

#### Algomax

Algomax will be a DeFi platform replicating [Impermax's](https://www.impermax.finance/) leveraged liquidity pool borrowing.

#### Algo The Table (ATC)

A DeFi platform that utilizes my decentralized escrow project to enable p2p swaps of arbitrary ASAs. The goal would be to enable users to swap into collateral that could be used to mint decentralized stablecoins. That way a user could take say [chips](https://explorer.perawallet.app/asset/388592191/)], agree to swap for [GOLD](https://explorer.perawallet.app/asset/246516580/) and then use GOLD to . This would fundamentally increase the amount of liquidity in the ecosystem, decreasing transaction prices and increasing opportunities for yield. 

### Final thoughts
 All of these projects will be fully open source and I have no plans to monetize any of them. If any of these look interesting to you, feel free to reach out to me on [Reddit](https://old.reddit.com/user/pescennius/) or [Github](https://github.com/The-Singularity-Labs) about helping out.