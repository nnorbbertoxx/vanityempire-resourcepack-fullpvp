# VanityEmpire Resource Pack – Cloudflare Pages

Ez a projekt arra készült, hogy a Minecraft resource packet ingyenesen, fix HTTPS címen szolgálja ki.

## Cloudflare Pages első beállítás

1. Hozz létre egy GitHub repository-t, és töltsd fel ennek a mappának a tartalmát.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Válaszd ki a repository-t.
4. Build command: `npm run build`
5. Build output directory: `dist`
6. Deploy.
7. A deploy után a manifest címe például:
   `https://PROJECT.pages.dev/manifest.json`
8. Minecraft szerveren egyszer futtasd:
   `/rp setmanifest https://PROJECT.pages.dev/manifest.json`

## Későbbi resource-pack frissítés

Csak cseréld ki a repository gyökerében a `pack.zip` fájlt, majd commit/push.

A Cloudflare build automatikusan:
- kiszámolja az új SHA1-et;
- elkészíti a `manifest.json` fájlt;
- publikálja az új `pack.zip`-et.

Az NBTXResourcePack plugin 30 másodpercenként ellenőrzi a manifestet, és SHA1 változáskor automatikusan elküldi az új packet az online játékosoknak.

Nem kell:
- MCPacks kézi feltöltés;
- SHA1 kézi számolás;
- `server.properties` módosítás;
- szerver restart packfrissítéskor.
