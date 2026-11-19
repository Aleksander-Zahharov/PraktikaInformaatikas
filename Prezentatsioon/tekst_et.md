# Esinemise tekst (≈ 6–7 minutit)

Ära loe sõna-sõnalt — see on tugitekst. Räägi rahulikult, ära kiirusta.

---

## Slaid 1 — Tiitelslaid (≈ 15 s)
Tere! Minu nimi on Aleksander Zahharov. 330 praktikatunni jooksul tegin nullist kaks äriveebilehte — Figma maketist kuni Google'i otsingutulemusteni.

## Slaid 2 — Kus ma praktikal olin (≈ 30 s)
Esimene ettevõte on GoGPS, mis tegeleb sõidukite GPS-jälgimisega. Teine on turundusagentuur ADViral. Minu juhendajad olid nende ettevõtete juhid, Eduard Vald ja Daniil Tšornõi.
Meeskonda ei olnud, seega tegin kõik ise: disaini, frontendi, backendi, SEO, käivituse ja analüütika.

## Slaid 3 — Numbrid (≈ 25 s)
Praktika kestis veebruarist juuni keskpaigani. Kaks kolmandikku ajast läks GoGPS-ile — seal on React ja oma adminpaneel. Kolmandik läks Adviralile, mis on üheleheline sait puhtas JavaScriptis. Projekte tegin paralleelselt.

## Slaid 4 — Kuidas töö käis (≈ 35 s)
Plaan oli mõlema lehe jaoks sama: arutelu tellijaga, makett Figmas, kood ja kohandamine kõigile ekraanidele, vormid, käivitus ning lõpuks SEO ja analüütika.
Tegelikult tulid pärast käivitust välja vead ja tuli tagasi minna.

## Slaid 5 — GoGPS (≈ 40 s)
GoGPS on kolmekeelne leht Reactis. Kõige tähtsam on adminpaneel: tellija avaldab blogipostitusi ise, ilma programmeerijata.
Backend on kerge, Node.js-is ja ilma andmebaasita: andmed on failides ja varukoopiad tehakse automaatselt. Lisaks on vormidel spämmikaitse, server on Nginx ja avaldamine käib FTP kaudu.

## Slaid 6 — Adviral (≈ 30 s)
Adviralile on tähtis näidata oma videoid, seega loobusin raamistikest — nii laadib leht kiiremini.
Tegin oma videopleieri, mis on mugav ka telefonis, heleda ja tumeda teema, kolm keelt ning päringuvormi Formspree kaudu.

## Slaid 7 — Suurim väljakutse (≈ 40 s)
Kõige rohkem nägin vaeva SEO-ga. Adviralis on teenuste kirjeldused peidetud hüpikakendesse — inimesele on see mugav.
Kuid Google näeb lehte enne klõpsu ega näe hüpikakende teksti. See tähendab, et nende teenuste järgi lehte otsingust ei leita.
Valik oli selline: jätta hüpikaknad alles või teha tavalised lehed. Lehed on Google'i jaoks kindlamad, aga sait kaotaks oma välimuse.

## Slaid 8 — Mida ma tegin (≈ 55 s)
Jätsin hüpikaknad alles ja leidsin kolmest sammust koosneva lahenduse.
Esiteks: igal teenusel on oma aadress — lingi kaudu avaneb hüpikaken ise.
Teiseks: ehitamise ajal käib robotbrauser Puppeteer iga aadressi läbi ja salvestab valmis lehe avatud hüpikaknaga.
Kolmandaks: avalehel on peidetud plokk kõigi hüpikakende tekstiga.
Ma ei ole täiesti kindel, et Google seda trikiks ei pea. Aga paremal on näha: Google loeb teenuse nime nagu tavalist pealkirja. Ja viimase kuu jooksul tuli üle poole külastustest otsingust.

## Slaid 9 — AI-analüütika (≈ 30 s)
Kõige rohkem olen rahul AI-analüütikaga. Ühendasin Google Analyticsi ja Search Console'i MCP kaudu koodiredaktoriga.
Nüüd ei pea aruannetes sobrama — võib lihtsalt küsida: „Kust inimesed tulevad?“ Paremal on päris vastus Advirali kohta.

## Slaid 10 — Hinnangud (≈ 30 s)
Lühidalt hinnangutest. Cursor, Node.js ja React võimaldasid kiiresti töötada. Töötasin üksi, aga tellijad aitasid, kui jäin hätta. Ülesanded olid väga erinevad — küljendusest serverini. Juhendajad andsid kiiresti tagasisidet.

## Slaid 11 — Mida ma õppisin (≈ 30 s)
Kõige olulisem: viia projekt tervikuna ideest hoolduseni ja hinnata aega realistlikult.
Omandasin SEO JavaScripti-lehtedele, Google Analyticsi, Search Console'i ja schema.org-i. Nüüd oskan seda ka teistele õpetada.

## Slaid 12 — Hästi / teisiti (≈ 30 s)
Kõige paremini õnnestusid AI-analüütika ja SEO ilma disaini kaotamata. Mõlemad lehed töötavad.
Teisiti teeksin kaks asja: kontrolliksin ekraane vähem käsitsi ja lisaksin varem automaattestid.

## Slaid 13 — Lõpp (≈ 10 s)
Kõik praktika eesmärgid on täidetud ja lehed toovad ärile kasu. Aitäh tähelepanu eest — vastan hea meelega küsimustele.

---

## Võimalikud küsimused ja lühivastused

- **Miks on GoGPS Reactis, aga Adviral ilma raamistikuta?**
  GoGPS-il on palju lehti, blogi ja adminpaneel — Reactiga on lihtsam. Adviral on üks leht videotega, seal on tähtsam kiirus.

- **Kas te ei karda, et Google karistab peidetud teksti eest?**
  Risk on olemas, seepärast on peidetud plokis sama tekst mis hüpikakendes, ilma lisamärksõnadeta. Peamine on see, et igal teenusel on oma leht. Search Console'is probleeme seni pole.

- **Miks ilma andmebaasita?**
  Sisu on vähe, JSON-failidest piisab ning server on lihtsam ja odavam. Varukoopiad tehakse automaatselt.

- **Mis on MCP?**
  Protokoll, mille kaudu redaktoris olev AI pääseb ligi välistele teenustele — minu puhul Google Analyticsile ja Search Console'ile.
