---
slug: xbacked-reviewed
author: pescennius
title: Understanding xBacked on Algorand
subtitle: "tl;dr: A Wildcat bank on Algorand with potential, but risks."
hero_img_url: "https://4bmj5l7hj4p2ri6fv7k5q622kxkgig2ogouqa37fs5nunk5osuaa.arweave.net/4Fier-dPH6ijxa_V2HtaVdRkG04zqQBv5ZdbRquulQA"
published: 2024-03-30T11:01:00Z
updated: 2024-04-01T15:42:00Z
tags: ["crypto", "stablecoins", "investing", "algorand", "defi"]
---

## What is xBacked?

xBacked is a collateralized lending platform on the Algorand blockchain that is very similar to Maker in the Ethereum ecosystem. xBacked allows users borrow a digital dollar, named xUSD, by locking up other digital assets as collateral. This process resembles a securitized loan you might take from a bank, but in the digital world, it's known as a [Collateralized Debt Position (CDP)](https://coinmarketcap.com/academy/glossary/collateralized-debt-position-cdp). Each xUSD is pegged to $1, backed by a $1 worth of collateral in xBacked's smart contracts on the Algorand blockchain.

## The Mechanics: How Does xBacked Work?

Let's bring this to life, with an example. Imagine you have a prized comic book collection. It's valuable, and you're proud of it, but right now, you need a new laptop for work. Selling your collection doesn't sound appealing because you hope to pass it on to your kids. So, you find a trusted friend who is a comic book enthusiast and make a deal: you'll lend him your collection to keep and enjoy for a while, and in exchange, he gives you a laptop to use.

In this scenario, your comic book collection is the collateral—something valuable you temporarily hand over to secure something else you need, the laptop. Your friend agrees because he knows if you don't return the laptop, he gets to keep the collection, which is worth more.

Translating this to xBacked: your digital assets (like cryptocurrency) are the comic book collection, and the xUSD you receive is like the laptop. You're not selling your assets but using them to get something else you need, with the plan to reclaim them later by repaying the xUSD you borrowed, plus a small fee, akin to giving the laptop back to get your collection once again. This system allows you to leverage your assets without permanently parting with them, mirroring how collateralized lending works in the real world, but within the digital financial landscape of xBacked.

There is a critical difference between how xBacked works and how the example works. The xUSD you borrowed did not exist before you borrowed it. You are not borrowing it from someone who already owns xUSD, the xUSD you borrowed was actually minted out of thin air. This works because the xUSD you are borrowing is being borrowed from your future self. The loan is "over-collateralized" because you have more collateral than the value of the loan. So you are essentially prepaying back the loan and its interest. If you don't make payments, its fine because the smart contract can use your collateral as payment.  As long as the debt is less than the asset, then everything nets out positive. This is actually very similar to how real world [commercial banks create virtual US dollars](https://www.youtube.com/watch?v=cDNSNX48Kmo&t=297s).

## Why would someone use xBacked?

xBacked and other lending platforms like Folks Finance give DeFi users the opportunity to "be their own bank". This is a permissionless platform where its possible to execute lending activities without any prior approval. In theory, as these platforms mature, we can have versions of our existing financail services that are far less suceptible to manipulation and corruption.  

### Opportunities:

**Leverage:** This is the most quintessential trade on any crypto lending market. Deposit ALGO, borrow xUSD. Swap the xUSD for ALGO. Deposit ALGO...repeat ad naseum. As you do this, you build up leverage. This can allow for spectacular returns or spectacular losses. Because rats are fixed to 3% on xBacked, this is the cheapest place to make this trade on chain right now.

**Carry Trades:** With a flat 3% fee, xBacked offers a relatively inexpensive way to borrow money. The Fed Funds Rate is currently north of 5%, meaning its cheaper to borrow on xBacked than it is for the US government to borrow USD. Investors have found ways to exploit this, borrowing xUSD, exchange it for another stablecoin like USDC, and invest it in places where they can earn more than 3%, netting a profit. This is what's known as a carry trade—borrowing at a lower rate to invest in something with a higher return.

**Debt refinancing:** Borrowing xUSD to pay back debts that have higher interest rates than 3% has the same benefits as a carry trade. Credit card debts, mortages, student loans, etc can all be refinanced by borrowing xUSD, exchanging it for USDC and then USD, and finally using that cash to pay off the loan.

**Commodity Collateral:** The interest spreads can be exploited further by using stable assets like Meld Gold and Silver as collateral. Unlike native cryptos, they experience far less price volatility and so therefore far less chance of a margin call. These are among the most popular collaterals on xBacked, partly because they offer a predictable way to engage in carry trades. These can also be leveraged the same way as ALGO.

**Yield Farming:** xUSD can be bought on the open market without borrowing via a vault. Buying and holding xUSD is buying a claim on the underlying assets and therefore the risk those assets lose value. In exchange, there are opportunities to earn yield via liquidity pools. 

**Arbitrage:** The price of xUSD will oscillate above and below its $1 peg depending on the supply and demand at any given time. Users with high confidence in the long term stability can buy when the price is under $1 and sell when it is above $1 as an arbitrage trade.

### Risks:

Most of the catostrophic risks are concentrated around scenarios where xUSD depegs and isn't tradable for $1 worth of assets or where lender collateral is lost and the protocol defaults. Like with any investing, there are also risks of losing money on bad trades. 

**Smart Contract Risk:** While not unique to xBacked, this is a real and relevant risk in the space. [Someone has at least looked at some of these contracts](https://github.com/xBacked-DAO/xbacked-audits), but its not clear if there has been more recent audits than 2022.

**Rates Will Change:** While borrowing costs are currently attractive, they can and almost certainly will increase, potentially eliminating the profitability of a number of trades. 3% is not a long term sustainable rate and likely only exists as a way to attract users. In the long run, the xUSD rate can't vary too much from the market USDC borrowing rate. As the rate stays low, people generate more xUSD to arbitrage it, the peg will eventually break.

**Weak Demand:** A significant portion of xUSD is being exchanged for USDC. This is evident in looking at how the balance of [goUSD has shifted](https://basket.algomint.io/analytics). [Gresham's law](https://www.wikiwand.com/en/Gresham%27s_law) is playing out, with the bad money (xUSD) driving out the good (USDC), suggesting that xUSD needs more direct utility and acceptance across more platforms. Lack of demand for xUSD could lead to a depeg incident, where holders of xUSD can't actually get 1 USDC or $1 worth of other crypto in open markets

**No Debt Ceilings:** Ultimately the belief in xUSD actually being worth $1 is tied to belief that if given $1 worth of assets for that token, one could actually exchange for a real physical dollar from those assets. This requires enough liquidity, or people trading dollars for those assets, for that to be credible. If the amount of xUSD backed by gALGO grows larger than the amount of USDC trading against gALGO, it becomes harder to believe that one could actually liquidate their xUSD and get an equivalent amount of physical dollars.

**Centralized Governance:** Currently, the decision-making process within xBacked is centralized, with plans to move towards a decentralized governance model. Events like a shutdown could be enacted at anytime. The team can also add support for additional ASAs as collateral via adding new vaults. They have solicited feedback from the community when it comes to deploying new vaults, but this is still ultimately a centralized process.

## Where I'd like to see xBacked go next

Addressing the debt ceiling risk is paramount for xBacked to ensure the stability of the xUSD and maintain confidence in the platform. Establishing a limit to how much can be borrowed based on the underlying asset's breadth and depth of liquidity is prudent risk management. Offering ways for participants to lock up USDC for emergency liquidity in exchange for yield (from protocol revenues) is another great way to boost confidence. My interactions with the xBacked team on Discord have revealed they are  open to discussions around improving liquidity and risk management. They've acknowledged the importance of these aspects and are planning to introduce a stability pool as an initial step toward addressing these concerns, indicating a promising direction for the platform's evolution.

Next I'd like to see a governance model that relies more on market-driven decisions rather than traditional voting. I believe this to be  a more dynamic and responsive system. This model would adjust key parameters like interest rates and debt ceilings based on real-time market signals rather than by allowing token holders to vote on them. Why move all this on chain if we're just going to recreate centralized committees trying to pick an interest rate? The extent of voting should be limited to directing incentives, financed from the treasury, to AMM pools that help maintain the peg. Token holders could even choose a pool that is xUSD paired with the xBacked token as a form of a dividend. This would allow the token to both have an intrinsic value as well as not require the formation of a complex DAO structure. If the shutdowns and vault cration could be handled via onchain governance or algorithmic detection, then the system could be operated fully on chain, truly as a protocol.

I hope to see xUSD be the solution to critical inefficiency in the current DeFi landscape on Algorand. The governance rewards system tends to make ALGO, and consequently USDC, more costly across DeFi operations. If one can earn 5% risk free in governance, than liquidity pools have to be yielding something similar if not more for users to be willing to take on the risk of impermanent loss. This drag on liquidity directly translates into higher swap fees and more expensive liquidity pools, as participants are incentivized to hold or stake their ALGO to earn rewards rather than provide liquidity. Leveraging assets to acquire ALGO exacerbates this, cascading the problem into assets borrowed for leveraging like USDC or USDT. xUSD, by nature of enabling users to rehypothecate, xUSD offers a solution to this problem. The user can insert xUSD into liquidity pools, that they acquired by borrowing xUSD against a liquid staking token like mALGO. In this example, the user is using the same assets to earn governance rewards and provide liquidity at the same time. This strategic positioning of xUSD would make it an indispensable liquidity provider, enabling Algorand to not only have the fastest swaps, but also the cheapest.

## How I'm using xBacked:

**Leveraged Gold and Silver Trades:** I do like to have exposure to gold but I prefer to hold my long term holdings physically. I still see risks with Meld gold but I don't mind holding small amounts of it as collateral for some short term leveraged gold trades. That's gone well for me this year as central banks have been on a gold buying spree.

**Leveraged Liquid Governance:** xBacked is the cheapest platform I trust, where I can make leveraged ALGO buys. I can also use liquid staking tokens like mALGO as collateral, raising potential earnings. 

**Carry trades:** Borrowing xUSD to invest in high-return, low-risk venues outside of DeFi has been some of the easiest money I've made in a while. For example borrowing xUSD and cashing that out into a money market fund for a 2% spread. I have doubts this will remain the case because as the market catches on, rates are going to have to increase to defend the peg. 

## Final Thoughts:

xBacked is new, a bit raw, but could be promising. That being said, I wouldn't put any money into it you aren't fully comfortable losing. I think the core challenge for the team now is avoiding the pitfalls other projects have made. Namely not being conservative enough on risk management and trying to manage the system parameters through voting based governance system rather than algorithmically. Separately, I'm trying my hand at writing something like this just to exercise my own understanding. Maybe I'll do one for Algomint or Meld Gold if there ends up being any interest.

