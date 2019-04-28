# CryptoTrack

Otvaranje nove stranice kada se klikne na ime kriptovalute nije zavrseno/uradjeno.
Napravljen je demo server jer browser ne moze direktno da salje zahteve na CoinMarketCap api.

Server kesira svake minute crypto listing i na svaki browserov zahtev odgovara sa keshiranim podacima pa i usled konstantnog refresa stranice
podaci nikad nisu stariji od 1 minute (browser dobija kesirane podatke - ne salje zahtev direktno na coinmarketcap).

Problemi sa gulp-om. Prestao da radi usred projekta (verovatno ne moze da nadje fajlove koje treba da nadje) nisam uspeo da debagujem stvar blagovremeno, pa babel 
nije uradio svoj deo posla, Eslint takodje nije dodat...
Css processore jos nisam radio tako da ih nema u projektu.
Css styling generalno ne zavrsen. 

Pokretanje projekta:
U terminalu uci u 'server' direktorijum.
Pokrenuti server u localu sa : `node server.js`
U browseru pristupiti demo aplikaciji na adresi `localhost:4500`


