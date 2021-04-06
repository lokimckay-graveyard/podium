# Podium

Discord bot / web interface that provides Smash results data

:blue_book: [About](https://smashpodium.vercel.app/about)  
:question: [Help](https://smashpodium.vercel.app/help)  
:chart_with_upwards_trend: [Analytics](https://sneyed-analytics.vercel.app/share/1j1KI1Fn/podium)

## Roadmap

- Fuzzy matching player/crew names
- Use database to associate player names with discord identity
- Instead of passing strings of player/crew names, supply users in discord server
- Associate an emoji with a player

## Stack

- [NextJS](https://nextjs.org/)
- [Discord Slash Commands API](https://discord.com/developers/docs/interactions/slash-commands)
- [SmashGG API](https://developer.smash.gg/)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)
- [LRU cache](https://github.com/isaacs/node-lru-cache)
- [Umami (analytics)](https://umami.is/)
- [Supabase (analytics)](https://supabase.io/)

## Limitations / Caveats

- [Vercel does not support FAF background tasks after response is sent](https://docs-git-add-fire-and-forget-zeit.vercel.app/docs/v2/platform/limits?query=fire-and-forget#streaming-responses). Currently using hacky 100ms sleep at end of /interactions call to fire another call to /results to process second half of request. This means request could hang if second request doesn't make it to /results
