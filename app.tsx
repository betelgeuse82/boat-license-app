"use client"

import { useState, useEffect, useMemo } from "react"
import { Anchor, Book, Home, FileQuestion, Award, Menu, X, ChevronRight, Check, Clock } from "lucide-react"

// Struktura podataka za pitanja
const categories = [
  { id: 1, name: "Navigacija", icon: "🧭" },
  { id: 2, name: "Motoristika", icon: "⚙️" },
  { id: 3, name: "Pomorstvo", icon: "⚓" },
  { id: 4, name: "Sigurnost i manevriranje", icon: "🛟" },
  { id: 5, name: "Radiotelefonija", icon: "📻" },
]

// Sva pitanja iz dokumenata s multiple choice opcijama
const questions = [
  // NAVIGACIJA
  {
    id: 1,
    category: 1,
    question: "Izmjerite udaljenost između dvije točke na nautičkoj karti?",
    correctAnswer: "Nautičkim šestarom na skali geografske širine",
    options: [
      "Nautičkim šestarom na skali geografske širine",
      "Nautičkim šestarom na skali geografske dužine",
      "Ravnalom direktno na karti",
      "Kutomjerom na kompasnoj ruži",
    ],
    explanation:
      "Udaljenost između dvije točke na nautičkoj karti mjeri se pomoću nautičkog šestara tako da se šestarom obuhvati razmak između točaka te se isti prenese na skalu geografske širine u visini mjerene udaljenosti.",
  },
  {
    id: 2,
    category: 1,
    question: "Što na nautičkoj karti predstavlja oznaka +?",
    correctAnswer: "Hrid ili greben na nepoznatoj dubini",
    options: ["Hrid ili greben na nepoznatoj dubini", "Mjesto za sidrenje", "Navigacijska oznaka", "Podmorski kabel"],
    explanation: "Oznaka + predstavlja hrid ili greben na nepoznatoj dubini – opasnost za plovidbu.",
  },
  {
    id: 3,
    category: 1,
    question: "Kako se označavaju geografska širina i dužina?",
    correctAnswer: "φ (fi) - geografska širina, λ (lambda) - geografska dužina",
    options: [
      "φ (fi) - geografska širina, λ (lambda) - geografska dužina",
      "λ (lambda) - geografska širina, φ (fi) - geografska dužina",
      "α (alfa) - geografska širina, β (beta) - geografska dužina",
      "N - geografska širina, E - geografska dužina",
    ],
    explanation: "Geografska širina označava se grčkim slovom φ (fi), a geografska dužina grčkim slovom λ (lambda).",
  },
  {
    id: 4,
    category: 1,
    question: "Kojim simbolima se na nautičkoj karti označavaju podmorski kablovi?",
    correctAnswer: "Ljubičasta valovita linija",
    options: ["Ljubičasta valovita linija", "Crna isprekidana linija", "Crvena ravna linija", "Plava točkasta linija"],
    explanation: "Simbol koji označava podmorski kabel je ljubičasta valovita linija koja spaja dvije obale.",
  },
  {
    id: 5,
    category: 1,
    question: "Što je to kabel u nautičkoj terminologiji?",
    correctAnswer: "1/10 nautičke milje = 185,2 m",
    options: ["1/10 nautičke milje = 185,2 m", "1 nautička milja = 1852 m", "100 metara", "1/2 nautičke milje = 926 m"],
    explanation: "Kabel je deseti dio nautičke milje i iznosi 185,2 metra.",
  },
  {
    id: 6,
    category: 1,
    question: "Što je kurs?",
    correctAnswer: "Kut između N smjera meridijana i smjera pramčanice brodice",
    options: [
      "Kut između N smjera meridijana i smjera pramčanice brodice",
      "Kut između E smjera i smjera brodice",
      "Brzina kojom brodica plovi",
      "Udaljenost između dvije točke na karti",
    ],
    explanation: "Kurs je kut između sjevernog smjera meridijana i smjera u kojem je postavljen pramac brodice.",
  },
  {
    id: 7,
    category: 1,
    question: "Što je azimut?",
    correctAnswer: "Kut između N smjera meridijana i smjera prema odabranom objektu",
    options: [
      "Kut između N smjera meridijana i smjera prema odabranom objektu",
      "Kut između pramčanice i objekta",
      "Udaljenost do objekta",
      "Visina objekta iznad mora",
    ],
    explanation: "Azimut je kut između N smjera meridijana i smjera prema odabranom objektu, mjeri se od 0° do 360°.",
  },
  {
    id: 8,
    category: 1,
    question: "Koliko iznosi 1 nautička milja?",
    correctAnswer: "1852 metra",
    options: ["1852 metra", "1000 metara", "1609 metara", "2000 metara"],
    explanation: "1 nautička milja iznosi 1852 metra i jednaka je 1 minuti geografske širine.",
  },
  {
    id: 9,
    category: 1,
    question: "Što znače plavo obojene površine na nautičkoj karti?",
    correctAnswer: "Dubine od 20 m do 0 m",
    options: ["Dubine od 20 m do 0 m", "Dubine veće od 20 m", "Zabranjena zona", "Područje za sidrenje"],
    explanation:
      "Površine obojane plavom bojom predstavljaju područja dubine od 20 m do 0 m, svijetloplava 20-10 m, tamnoplava 10-0 m.",
  },
  {
    id: 10,
    category: 1,
    question: "Što znači simbol sidra na karti?",
    correctAnswer: "Preporučeno sidrište",
    options: ["Preporučeno sidrište", "Zabranjeno sidrenje", "Marina", "Luka"],
    explanation: "Simbol sidra označava područje gdje je preporučeno sidrenje.",
  },
  {
    id: 11,
    category: 1,
    question: "S koje strane se može obići oznaka usamljene opasnosti?",
    correctAnswer: "S bilo koje strane",
    options: ["S bilo koje strane", "Samo s lijeve strane", "Samo s desne strane", "Ne smije se približavati"],
    explanation: "Oznaka usamljene opasnosti može se zaobići s bilo koje strane.",
  },
  {
    id: 12,
    category: 1,
    question: "Koja je razlika između magnetskog kompasa i žirokompasa?",
    correctAnswer: "Magnetski pokazuje magnetski sjever, žiro pokazuje geografski sjever",
    options: [
      "Magnetski pokazuje magnetski sjever, žiro pokazuje geografski sjever",
      "Oba pokazuju magnetski sjever",
      "Oba pokazuju geografski sjever",
      "Nema razlike",
    ],
    explanation: "Magnetski kompas pokazuje smjer magnetskih polova, dok žirokompas uvijek pokazuje geografski sjever.",
  },
  {
    id: 13,
    category: 1,
    question: "Što je magnetska varijacija?",
    correctAnswer: "Kutna razlika između pravog i magnetskog meridijana",
    options: [
      "Kutna razlika između pravog i magnetskog meridijana",
      "Greška kompasa zbog željeza na brodu",
      "Promjena kursa zbog vjetra",
      "Razlika između kompasa i GPS-a",
    ],
    explanation: "Magnetska varijacija je kutna razlika između pravog (geografskog) i magnetskog meridijana.",
  },
  {
    id: 14,
    category: 1,
    question: "Čemu služi Peljar?",
    correctAnswer: "Daje informacije o lukama, zaljevima i plovidbi",
    options: [
      "Daje informacije o lukama, zaljevima i plovidbi",
      "Pokazuje samo dubine mora",
      "Služi za mjerenje udaljenosti",
      "Sadrži samo meteorološke podatke",
    ],
    explanation:
      "Peljar daje razne vrste informacija o pojedinom području obale, lukama, zaljevima, kanalima i sidrištima.",
  },
  {
    id: 15,
    category: 1,
    question: "Što je dubinomjer i kako radi?",
    correctAnswer: "Mjeri dubinu ultrazvučnim impulsima",
    options: [
      "Mjeri dubinu ultrazvučnim impulsima",
      "Mjeri dubinu konopom s utegom",
      "Mjeri dubinu laserskim zrakama",
      "Mjeri dubinu tlakom vode",
    ],
    explanation:
      "Dubinomjer mjeri dubinu ispod dna brodice emitiranjem ultrazvučnih impulsa (30-50 kHz) i mjerenjem vremena do povratka.",
  },
  {
    id: 16,
    category: 1,
    question: "Što su to lateralne oznake?",
    correctAnswer: "Oznake lijeve i desne strane plovnog puta",
    options: [
      "Oznake lijeve i desne strane plovnog puta",
      "Oznake sjevera i juga",
      "Oznake dubine",
      "Oznake zabrane plovidbe",
    ],
    explanation: "Lateralne oznake označavaju lijevu (crvena) i desnu (zelena) stranu plovnog puta ili kanala.",
  },
  {
    id: 17,
    category: 1,
    question: "Što označavaju kardinalne oznake?",
    correctAnswer: "Siguran kvadrant u odnosu na opasnost",
    options: ["Siguran kvadrant u odnosu na opasnost", "Smjer vjetra", "Dubinu mora", "Ulaz u luku"],
    explanation:
      "Kardinalne oznake označavaju siguran kvadrant (područje) u odnosu na opasnost, nazivaju se po strani svijeta.",
  },
  {
    id: 18,
    category: 1,
    question: "Kakve boje je oznaka sigurnih voda?",
    correctAnswer: "Crveno-bijele okomite pruge",
    options: ["Crveno-bijele okomite pruge", "Zeleno-bijele vodoravne pruge", "Potpuno bijela", "Potpuno crvena"],
    explanation:
      "Oznaka sigurnih voda ima crveno-bijele okomite pruge i označava da su vode oko oznake plovne bez opasnosti.",
  },
  {
    id: 19,
    category: 1,
    question: "Koja svjetla pokazuje pomorski svjetionik?",
    correctAnswer: "Karakteristična svjetla prema Popisu svjetala",
    options: [
      "Karakteristična svjetla prema Popisu svjetala",
      "Uvijek samo bijelo svjetlo",
      "Uvijek samo crveno svjetlo",
      "Nasumična svjetla",
    ],
    explanation: "Svaki svjetionik ima svoju karakteristiku (boja, karakter, period) navedenu u Popisu svjetala.",
  },
  {
    id: 20,
    category: 1,
    question: "Što je IALA sustav?",
    correctAnswer: "Međunarodni sustav pomorskih oznaka",
    options: [
      "Međunarodni sustav pomorskih oznaka",
      "Sustav GPS navigacije",
      "Sustav radio veza",
      "Sustav mjerenja dubine",
    ],
    explanation: "IALA je međunarodni sustav pomorskih oznaka koji definira lateralne, kardinalne i druge oznake.",
  },

  // MOTORISTIKA
  {
    id: 21,
    category: 2,
    question: "Gdje na brodici mora biti smješten akumulator?",
    correctAnswer: "Na suhom, prozračnom mjestu, daleko od topline",
    options: [
      "Na suhom, prozračnom mjestu, daleko od topline",
      "Što bliže motoru",
      "U podvodnom dijelu brodice",
      "Na palubi izložen suncu",
    ],
    explanation: "Akumulator se smješta na suhim, prozračnim mjestima, udaljen od izvora topline i dobro učvršćen.",
  },
  {
    id: 22,
    category: 2,
    question: "Koje protupožarne mjere se moraju poduzeti na brodici?",
    correctAnswer: "Imati propisanu opremu i izbjegavati otvoreni plamen",
    options: [
      "Imati propisanu opremu i izbjegavati otvoreni plamen",
      "Samo imati vodu na brodici",
      "Dovoljno je imati mobitel za poziv",
      "Nisu potrebne posebne mjere",
    ],
    explanation: "Brodica mora imati protupožarnu opremu, izbjegavati otvoreni plamen, kontrolirati curenje goriva.",
  },
  {
    id: 23,
    category: 2,
    question: "Kako bi gasili požar na brodskom motoru?",
    correctAnswer: "Protupožarnim aparatom s pjenom, prahom ili CO2",
    options: [
      "Protupožarnim aparatom s pjenom, prahom ili CO2",
      "Vodom iz mora",
      "Prekrivanjem plahtom",
      "Čekanjem da se sam ugasi",
    ],
    explanation: "Požar zapaljivih tekućina gasi se prijenosnim aparatima s pjenom, prahom ili CO2.",
  },
  {
    id: 24,
    category: 2,
    question: "Koji sustavi hlađenja brodskog motora postoje?",
    correctAnswer: "Otvoreni i zatvoreni sustav",
    options: ["Otvoreni i zatvoreni sustav", "Samo zračno hlađenje", "Samo vodeno hlađenje", "Uljno hlađenje"],
    explanation: "Koriste se otvoreni (direktni) i zatvoreni (indirektni) sustav vodenog hlađenja.",
  },
  {
    id: 25,
    category: 2,
    question: "Kako se obavlja punjenje goriva (benzin) na brodicu?",
    correctAnswer: "Ugasiti motor, spojiti uzemljenje, provjetriti",
    options: [
      "Ugasiti motor, spojiti uzemljenje, provjetriti",
      "Motor može raditi tijekom punjenja",
      "Nije potrebno posebno paziti",
      "Samo paziti da ne curi",
    ],
    explanation: "Kod punjenja: ugasiti motor, spojiti uzemljenje, iskrcati putnike, provjetriti, otvoriti odušak.",
  },
  {
    id: 26,
    category: 2,
    question: "Čime se podmazuje četverotaktni motor?",
    correctAnswer: "Uljem iz kartera",
    options: ["Uljem iz kartera", "Uljem u gorivu", "Ne treba podmazivanje", "Vodom"],
    explanation: "Četverotaktni motori podmazuju se uljem koje se nalazi u posebnom spremniku (karteru).",
  },
  {
    id: 27,
    category: 2,
    question: "Čime se podmazuje dvotaktni motor?",
    correctAnswer: "Uljem koje se dodaje u gorivo (1-4%)",
    options: ["Uljem koje se dodaje u gorivo (1-4%)", "Uljem iz kartera", "Ne treba podmazivanje", "Posebnim mazivom"],
    explanation: "Dvotaktni motori podmazuju se uljem koje se dodaje u gorivo u omjeru 1-4%.",
  },
  {
    id: 28,
    category: 2,
    question: "Koji je radni takt kod četverotaktnog motora?",
    correctAnswer: "3. takt - ekspanzija",
    options: ["3. takt - ekspanzija", "1. takt - usis", "2. takt - kompresija", "4. takt - ispuh"],
    explanation: "Radni takt četverotaktnog motora je 3. takt (ekspanzija/širenje).",
  },
  {
    id: 29,
    category: 2,
    question: "Što se treba učiniti ako se ulje prolije po brodu?",
    correctAnswer: "Upiti sredstvima za upijanje i spriječiti ulazak u more",
    options: [
      "Upiti sredstvima za upijanje i spriječiti ulazak u more",
      "Isprati vodom u more",
      "Ostaviti da se samo osuši",
      "Pokriti plahtom",
    ],
    explanation:
      "Ulje se upija posebnim sredstvima, sprječava istjecanje u more, a upotrijebljena sredstva se odlažu u posebne spremnike.",
  },
  {
    id: 30,
    category: 2,
    question: "Kakva je razlika između otvorenog i zatvorenog sustava hlađenja?",
    correctAnswer: "Otvoreni koristi morsku vodu direktno, zatvoreni ima dva kruga",
    options: [
      "Otvoreni koristi morsku vodu direktno, zatvoreni ima dva kruga",
      "Nema razlike",
      "Otvoreni je samo za male motore",
      "Zatvoreni ne koristi vodu",
    ],
    explanation:
      "Otvoreni sustav koristi morsku vodu direktno, zatvoreni ima zatvoreni krug slatke vode koji hladi morska voda.",
  },
  {
    id: 31,
    category: 2,
    question: "Što sadrži instrument ploča motora?",
    correctAnswer: "Pokazivače temperature, pritiska ulja, napona, goriva",
    options: [
      "Pokazivače temperature, pritiska ulja, napona, goriva",
      "Samo pokazivač brzine",
      "Samo sat",
      "Samo kompas",
    ],
    explanation:
      "Instrument ploča sadrži pokazivače za sve sustave: hlađenje, podmazivanje, napajanje strujom, gorivo.",
  },
  {
    id: 32,
    category: 2,
    question: "Što treba učiniti prije paljenja motora?",
    correctAnswer: "Provjeriti sve sustave motora",
    options: ["Provjeriti sve sustave motora", "Ništa posebno", "Samo provjeriti gorivo", "Samo upaliti ključ"],
    explanation: "Prije paljenja provjeriti: struju, gorivo, hlađenje, razinu ulja.",
  },
  {
    id: 33,
    category: 2,
    question: "Podjela motora s unutrašnjim izgaranjem?",
    correctAnswer: "Po ciklusima, gorivu i montaži",
    options: ["Po ciklusima, gorivu i montaži", "Samo po snazi", "Samo po veličini", "Po boji"],
    explanation: "Motori se dijele po broju ciklusa (2/4-taktni), vrsti goriva (diesel/benzin) i načinu montaže.",
  },
  {
    id: 34,
    category: 2,
    question: "Ako se motor dimi, što treba napraviti?",
    correctAnswer: "Zaustaviti motor, zatvoriti gorivo, gasiti ako se zapali",
    options: [
      "Zaustaviti motor, zatvoriti gorivo, gasiti ako se zapali",
      "Nastaviti vožnju",
      "Dodati više ulja",
      "Povećati brzinu",
    ],
    explanation: "Ako motor dimi: zaustaviti, zatvoriti dovod goriva, gasiti aparatom ako se zapali.",
  },
  {
    id: 35,
    category: 2,
    question: "Što je to MARPOL konvencija?",
    correctAnswer: "Međunarodna konvencija o zaštiti mora od onečišćenja",
    options: [
      "Međunarodna konvencija o zaštiti mora od onečišćenja",
      "Pravila o brzini plovidbe",
      "Propisi o veličini brodica",
      "Zakon o ribolovu",
    ],
    explanation: "MARPOL 73/78 je konvencija o zaštiti mora od onečišćenja s brodova.",
  },

  // POMORSTVO
  {
    id: 36,
    category: 3,
    question: "Napravi čvor pašnjak?",
    correctAnswer: "Formira omču koja se ne steže",
    options: [
      "Formira omču koja se ne steže",
      "Služi za spajanje dva konopa",
      "Koristi se za skraćivanje",
      "Veže se na kraju konopa",
    ],
    explanation: "Pašnjak se koristi za formiranje omče koja se ne steže, za nametanje na bitvu.",
  },
  {
    id: 37,
    category: 3,
    question: "Što je kobilica?",
    correctAnswer: "Najniža uzdužna veza broda",
    options: ["Najniža uzdužna veza broda", "Vrh jarbola", "Kormilo broda", "Sidro"],
    explanation: "Kobilica je najniža uzdužna veza broda, prostire se od krme do pramca.",
  },
  {
    id: 38,
    category: 3,
    question: "Što je gaz brodice?",
    correctAnswer: "Dubina do koje je brodica uronjena u vodu",
    options: [
      "Dubina do koje je brodica uronjena u vodu",
      "Visina brodice iznad vode",
      "Širina brodice",
      "Dužina brodice",
    ],
    explanation: "Gaz je najveći razmak od vodene linije do najniže točke podvodnog dijela brodice.",
  },
  {
    id: 39,
    category: 3,
    question: "Tko je nadležan za red u lukama?",
    correctAnswer: "Lučka kapetanija",
    options: ["Lučka kapetanija", "Policija", "Carina", "Nitko"],
    explanation: "Nadzor nad redom u lukama obavlja Lučka kapetanija.",
  },
  {
    id: 40,
    category: 3,
    question: "Što je brodica - definicija?",
    correctAnswer: "Plovni objekt 2,5-15m, >5kW, <12 putnika",
    options: [
      "Plovni objekt 2,5-15m, >5kW, <12 putnika",
      "Svaki plovni objekt",
      "Plovilo duže od 15m",
      "Samo motorne brodice",
    ],
    explanation: "Brodica je plovni objekt 2,5-15 metara, snage veće od 5 kW, koji prevozi manje od 12 putnika.",
  },
  {
    id: 41,
    category: 3,
    question: "Što je stabilitet brodice?",
    correctAnswer: "Sposobnost vraćanja u uspravan položaj",
    options: ["Sposobnost vraćanja u uspravan položaj", "Brzina brodice", "Nosivost brodice", "Čvrstoća konstrukcije"],
    explanation: "Stabilitet je osobina brodice da se iz nagnutog položaja sama vrati u uspravan položaj.",
  },
  {
    id: 42,
    category: 3,
    question: "Gdje se upisuju brodice?",
    correctAnswer: "U Upisnik brodica kod Lučke kapetanije",
    options: ["U Upisnik brodica kod Lučke kapetanije", "U policiji", "U općini", "Nigdje"],
    explanation: "Brodice se upisuju u Upisnik brodica one Lučke kapetanije na čijem području se nalaze.",
  },
  {
    id: 43,
    category: 3,
    question: "Koje područje plovidbe označava kategorija III?",
    correctAnswer: "Do 12 nautičkih milja od obale",
    options: ["Do 12 nautičkih milja od obale", "Do 3 nautičke milje", "Do 20 nautičkih milja", "Neograničeno"],
    explanation: "Područje plovidbe III obuhvaća plovidbu do 12 Nm od najbliže obale.",
  },
  {
    id: 44,
    category: 3,
    question: "Gdje je dozvoljeno glisirati?",
    correctAnswer: "Više od 300 m od obale",
    options: ["Više od 300 m od obale", "Više od 50 m od obale", "Više od 150 m od obale", "Svugdje"],
    explanation: "Glisiranje je dozvoljeno više od 300 m od obale ili ograđenog kupališta.",
  },
  {
    id: 45,
    category: 3,
    question: "Koje su karakteristike bure?",
    correctAnswer: "NE vjetar, hladan, suh, mahovit",
    options: ["NE vjetar, hladan, suh, mahovit", "SE vjetar, topao, vlažan", "NW vjetar, umjeren", "S vjetar, jak"],
    explanation: "Bura je NE vjetar, hladan i suh, izrazito mahovit, traje 1-7 dana.",
  },
  {
    id: 46,
    category: 3,
    question: "Koje su karakteristike juga?",
    correctAnswer: "SE vjetar, topao, vlažan, dugo se razvija",
    options: [
      "SE vjetar, topao, vlažan, dugo se razvija",
      "NE vjetar, hladan, suh",
      "NW vjetar, umjeren",
      "W vjetar, jak",
    ],
    explanation: "Jugo je SE vjetar, topao i vlažan, dugo se razvija (12-24 sata).",
  },
  {
    id: 47,
    category: 3,
    question: "Što je maestral?",
    correctAnswer: "NW ljetni vjetar umjerene jačine",
    options: ["NW ljetni vjetar umjerene jačine", "Zimski olujni vjetar", "Jutarnji vjetar", "Noćni vjetar"],
    explanation: "Maestral je stalni vlažni ljetni vjetar umjerene jačine iz NW smjera.",
  },
  {
    id: 48,
    category: 3,
    question: "Koliki je raspon plime i oseke na Jadranu?",
    correctAnswer: "Oko 1 metar",
    options: ["Oko 1 metar", "Oko 5 metara", "Oko 10 metara", "Nema plime i oseke"],
    explanation: "Raspon plime i oseke na Jadranu je oko 1m (0,35m južni, 1m sjeverni Jadran).",
  },
  {
    id: 49,
    category: 3,
    question: "Kojim brodicom smije upravljati voditelj brodice B kategorije?",
    correctAnswer: "Do 15m, neograničene snage, do 12 putnika",
    options: ["Do 15m, neograničene snage, do 12 putnika", "Do 7m, do 15kW", "Samo jedrilice", "Sve brodice"],
    explanation: "Voditelj B kategorije može upravljati brodicama do 15m, neograničene snage, do 12 putnika.",
  },
  {
    id: 50,
    category: 3,
    question: "Što je mrtvo more?",
    correctAnswer: "Valovi nakon prestanka vjetra",
    options: ["Valovi nakon prestanka vjetra", "More bez života", "Plitko more", "Mirno more"],
    explanation: "Mrtvo more su valovi koji su uznapredovali izvan zone vjetra koji ih je stvorio.",
  },

  // SIGURNOST I MANEVRIRANJE
  {
    id: 51,
    category: 4,
    question: "Koja svjetla ima jedrenjak do 20 m dužine?",
    correctAnswer: "Bočna i krmeno, opcijski kružna crveno/zeleno",
    options: [
      "Bočna i krmeno, opcijski kružna crveno/zeleno",
      "Samo bijelo svjetlo",
      "Jarbolno i bočna",
      "Samo crveno svjetlo",
    ],
    explanation: "Jedrenjak do 20m mora imati bočna i krmeno svjetlo, može imati kružna (crveno iznad zelenog).",
  },
  {
    id: 52,
    category: 4,
    question: "Koja svjetla ima tegljač?",
    correctAnswer: "Bočna, krmeno, žuto za tegljenje, 2-3 jarbolna",
    options: [
      "Bočna, krmeno, žuto za tegljenje, 2-3 jarbolna",
      "Samo bijela svjetla",
      "Samo žuto svjetlo",
      "Kao obična motorna brodica",
    ],
    explanation: "Tegljač ima bočna, krmeno, žuto svjetlo za tegljenje i 2-3 jarbolna (ovisno o dužini teglja).",
  },
  {
    id: 53,
    category: 4,
    question: "Koja svjetla ima usidreni brod?",
    correctAnswer: "Jedno ili dva bijela kružna",
    options: ["Jedno ili dva bijela kružna", "Bočna svjetla", "Crvena svjetla", "Nema svjetla"],
    explanation: "Usidreni brod pokazuje jedno bijelo kružno (do 50m) ili dva (preko 50m).",
  },
  {
    id: 54,
    category: 4,
    question: "Koji su zvučni signali za skretanje?",
    correctAnswer: "1 kratki desno, 2 kratka lijevo, 3 kratka krmom",
    options: [
      "1 kratki desno, 2 kratka lijevo, 3 kratka krmom",
      "1 dugi desno, 2 duga lijevo",
      "Samo sirena",
      "Nema signala",
    ],
    explanation: "Zvučni signali: 1 kratki - desno, 2 kratka - lijevo, 3 kratka - vožnja krmom.",
  },
  {
    id: 55,
    category: 4,
    question: "Koja je dnevna oznaka za usidreni brod?",
    correctAnswer: "Crna kugla",
    options: ["Crna kugla", "Crni čunj", "Crvena zastava", "Bijela zastava"],
    explanation: "Dnevna oznaka za usidreni brod je crna kugla na pramčanom dijelu.",
  },
  {
    id: 56,
    category: 4,
    question: "Tko ima prednost - brodica iz luke ili u luku?",
    correctAnswer: "Brodica koja isplovljava iz luke",
    options: ["Brodica koja isplovljava iz luke", "Brodica koja uplovljava u luku", "Veća brodica", "Brža brodica"],
    explanation: "Pri ograničenom manevriranju, prednost imaju brodovi koji isplovljavaju.",
  },
  {
    id: 57,
    category: 4,
    question: "Brodovi idu jedan prema drugome, što činiti?",
    correctAnswer: "Oba skreću desno i mimoilaze se lijevim bokovima",
    options: ["Oba skreću desno i mimoilaze se lijevim bokovima", "Oba skreću lijevo", "Jedan staje", "Nastave ravno"],
    explanation: "U protukursu oba broda skreću desno i mimoilaze se lijevim bokovima.",
  },
  {
    id: 58,
    category: 4,
    question: "Kako se pretječe druga brodica?",
    correctAnswer: "S bilo koje strane, ali se mora skloniti s puta",
    options: [
      "S bilo koje strane, ali se mora skloniti s puta",
      "Samo s lijeve strane",
      "Samo s desne strane",
      "Ne smije se pretjecati",
    ],
    explanation: "Brod koji pretječe mora se skloniti s puta brodu kojeg pretječe.",
  },
  {
    id: 59,
    category: 4,
    question: "Koliko traje kratki zvučni signal?",
    correctAnswer: "1 sekunda",
    options: ["1 sekunda", "4-6 sekundi", "10 sekundi", "Pola sekunde"],
    explanation: "Kratki zvučni signal traje 1 sekundu, dugi 4-6 sekundi.",
  },
  {
    id: 60,
    category: 4,
    question: "Što je četverovez?",
    correctAnswer: "Krma vezana za obalu, pramac na mooring/sidro",
    options: [
      "Krma vezana za obalu, pramac na mooring/sidro",
      "Četiri konopa za privez",
      "Bočni privez",
      "Vezivanje za plutaču",
    ],
    explanation: "Četverovez je način priveza gdje je krma vezana za obalu, a pramac na mooring ili sidro.",
  },
  {
    id: 61,
    category: 4,
    question: "Koliko dugo treba biti sidrenjak na dubini od 4m?",
    correctAnswer: "12-24 metra (3-6 puta dubina)",
    options: ["12-24 metra (3-6 puta dubina)", "4 metra", "40 metara", "2 metra"],
    explanation: "Dužina sidrenjaka treba biti 3-6 puta veća od dubine, na 4m to je 12-24m.",
  },
  {
    id: 62,
    category: 4,
    question: "Kako se sidri?",
    correctAnswer: "Pramcem u vjetar, spustiti sidro, voziti krmom",
    options: [
      "Pramcem u vjetar, spustiti sidro, voziti krmom",
      "Baciti sidro u brzini",
      "Bokom prema vjetru",
      "Krmom u vjetar",
    ],
    explanation: "Sidrenje: doći pramcem u vjetar, zaustaviti, spustiti sidro, voziti krmom dok se ukopa.",
  },
  {
    id: 63,
    category: 4,
    question: "Nabrojite tipove sidara?",
    correctAnswer: "Admiralitetsko, Hall, Danforth, CQR, Bruce, Mačak",
    options: [
      "Admiralitetsko, Hall, Danforth, CQR, Bruce, Mačak",
      "Samo jedno univerzalno",
      "Kamen s konopom",
      "Betonski blok",
    ],
    explanation: "Tipovi: Admiralitetsko, Hall, Danforth, CQR plužno, Bruce, Mačak, olujno sidro.",
  },
  {
    id: 64,
    category: 4,
    question: "Koje privezne konope treba imati za bočni vez?",
    correctAnswer: "Pramčani, krmeni i pramčani špring",
    options: ["Pramčani, krmeni i pramčani špring", "Samo jedan konop", "Samo špringovi", "Pet konopa"],
    explanation: "Za bočni vez minimum: pramčani konop, krmeni konop, pramčani špring.",
  },
  {
    id: 65,
    category: 4,
    question: "Vidiš čovjeka u moru, što činiti?",
    correctAnswer: "Prilaziti sporo, baciti kolut, ugasiti motor pri dizanju",
    options: [
      "Prilaziti sporo, baciti kolut, ugasiti motor pri dizanju",
      "Skočiti za njim",
      "Voziti brzo do njega",
      "Zvati samo pomoć",
    ],
    explanation: "Čovjeku u moru: prilaziti sporo, baciti kolut za spašavanje, ugasiti motor pri podizanju.",
  },
  {
    id: 66,
    category: 4,
    question: "Navedi signale opasnosti?",
    correctAnswer: "MAYDAY, rakete, dim, SOS, dizanje ruku",
    options: ["MAYDAY, rakete, dim, SOS, dizanje ruku", "Samo mahanje", "Samo poziv telefonom", "Glasno vikanje"],
    explanation: "Signali: MAYDAY, crvene rakete, dim, SOS svjetlom, dizanje/spuštanje ruku, pucnjevi.",
  },
  {
    id: 67,
    category: 4,
    question: "Kako izgleda prsluk za spašavanje?",
    correctAnswer: "Narančast s reflektirajućim trakama",
    options: ["Narančast s reflektirajućim trakama", "Bilo koje boje", "Uvijek crven", "Proziran"],
    explanation: "Prsluk je narančaste boje sa samoreflektirajućim trakama, drži glavu iznad vode.",
  },
  {
    id: 68,
    category: 4,
    question: "Kako se bočno privezati?",
    correctAnswer: "Ukoso prema gatu, voziti krmom, uhvatiti špring",
    options: [
      "Ukoso prema gatu, voziti krmom, uhvatiti špring",
      "Paralelno uz obalu",
      "Krmom prema obali",
      "Punom brzinom",
    ],
    explanation: "Bočni privez: ukoso 45° prema gatu, zaustaviti vožnjom krmom, špring zaustavlja i privlači.",
  },
  {
    id: 69,
    category: 4,
    question: "Koje sidro je najbolje za pjeskovito dno?",
    correctAnswer: "CQR plužno, Bruce ili Delta",
    options: ["CQR plužno, Bruce ili Delta", "Admiralitetsko", "Kamen", "Bilo koje"],
    explanation: "Za pjeskovito dno najbolja su plužna sidra: CQR, Bruce, Delta.",
  },
  {
    id: 70,
    category: 4,
    question: "Kako se pobrinuti za pothlađenu osobu?",
    correctAnswer: "Postupno zagrijati, ne masirati, tople napitke",
    options: ["Postupno zagrijati, ne masirati, tople napitke", "Staviti na sunce", "Dati alkohol", "Masirati snažno"],
    explanation: "Hipotermija: postupno zagrijavanje, ne masirati, tople napitke ako je pri svijesti.",
  },

  // RADIOTELEFONIJA
  {
    id: 71,
    category: 5,
    question: "Koji broj zovemo za pomoć u slučaju pogibelji?",
    correctAnswer: "195 ili 112, VHF kanal 16",
    options: ["195 ili 112, VHF kanal 16", "Samo 911", "Samo kanal 9", "Bilo koji broj"],
    explanation: "Za pomoć: tel. 195 (MRCC Rijeka), 112, ili VHF kanal 16.",
  },
  {
    id: 72,
    category: 5,
    question: "Za koju vrstu nezgode koristimo PAN PAN?",
    correctAnswer: "Poruka hitnosti (pad u more, kvar motora)",
    options: ["Poruka hitnosti (pad u more, kvar motora)", "Samo za pogibelj", "Za vrijeme", "Za pozdravljanje"],
    explanation: "PAN PAN se koristi za poruke hitnosti koje ne ugrožavaju neposredno život.",
  },
  {
    id: 73,
    category: 5,
    question: "Koja su tri prioritetna poziva?",
    correctAnswer: "MAYDAY, PAN PAN, SECURITE",
    options: ["MAYDAY, PAN PAN, SECURITE", "HELP, SOS, ALARM", "1, 2, 3", "Nema prioriteta"],
    explanation: "Tri prioritetna poziva: MAYDAY (pogibelj), PAN PAN (hitnost), SECURITE (sigurnost).",
  },
  {
    id: 74,
    category: 5,
    question: "Što je MAYDAY?",
    correctAnswer: "Signal pogibelji s apsolutnim prioritetom",
    options: ["Signal pogibelji s apsolutnim prioritetom", "Pozdrav", "Završetak veze", "Provjera veze"],
    explanation: "MAYDAY je poziv pogibelji koji ima apsolutni prioritet nad svim drugim porukama.",
  },
  {
    id: 75,
    category: 5,
    question: "Što je HAKOM?",
    correctAnswer: "Hrvatska agencija koja dodjeljuje pozivne znakove",
    options: [
      "Hrvatska agencija koja dodjeljuje pozivne znakove",
      "Proizvođač radija",
      "Lučka kapetanija",
      "Servis za radio",
    ],
    explanation: "HAKOM je Hrvatska regulatorna agencija za mrežne djelatnosti, dodjeljuje pozivne znakove.",
  },
  {
    id: 76,
    category: 5,
    question: "Koji su dijelovi radiotelefonske postaje?",
    correctAnswer: "Predajnik, prijemnik, antena, napajanje",
    options: ["Predajnik, prijemnik, antena, napajanje", "Samo mikrofon", "Samo antena", "Samo baterija"],
    explanation: "Radio postaja: predajnik, prijemnik, zvučnik, mikrofon, antena, napajanje.",
  },
  {
    id: 77,
    category: 5,
    question: "Što je GMDSS?",
    correctAnswer: "Svjetski pomorski sustav za pogibelj i sigurnost",
    options: [
      "Svjetski pomorski sustav za pogibelj i sigurnost",
      "Vrsta kompasa",
      "Navigacijski uređaj",
      "Vrsta sidra",
    ],
    explanation: "GMDSS - Global Maritime Distress and Safety System, sustav za sigurnost.",
  },
  {
    id: 78,
    category: 5,
    question: "Kada i koliko dugo možemo biti na kanalu 16?",
    correctAnswer: "Za poziv max 1 minuta, stalno za bdijenje",
    options: ["Za poziv max 1 minuta, stalno za bdijenje", "Neograničeno", "Nikada", "Samo noću"],
    explanation: "Kanal 16: poziv max 1 minuta (ako nije pogibelj), ali stalno bdijenje.",
  },
  {
    id: 79,
    category: 5,
    question: "Smije li se radiostanica koristiti u luci?",
    correctAnswer: "Samo za sigurnost plovidbe i komunikaciju s lukom",
    options: [
      "Samo za sigurnost plovidbe i komunikaciju s lukom",
      "Da, neograničeno",
      "Ne, nikada",
      "Samo za razgovor",
    ],
    explanation: "U luci radio samo za sigurnost plovidbe i komunikaciju s lučkim vlastima.",
  },
  {
    id: 80,
    category: 5,
    question: "Čemu služi regulator SQ (squelch)?",
    correctAnswer: "Uklanja šumove u prijemu",
    options: ["Uklanja šumove u prijemu", "Pojačava signal", "Mijenja kanal", "Pali uređaj"],
    explanation: "Squelch blokira šumove i omogućava čišći prijem signala.",
  },
  {
    id: 81,
    category: 5,
    question: "Što znači tipka D/W na VHF?",
    correctAnswer: "Dual Watch - slušanje dva kanala istovremeno",
    options: ["Dual Watch - slušanje dva kanala istovremeno", "Isključivanje", "Pojačavanje", "Snimanje"],
    explanation: "D/W omogućava istovremeno slušanje kanala 16 i drugog radnog kanala.",
  },
  {
    id: 82,
    category: 5,
    question: "Čemu služi tipka DISTRESS na VHF DSC?",
    correctAnswer: "Slanje digitalnog poziva pogibelji",
    options: ["Slanje digitalnog poziva pogibelji", "Isključivanje alarma", "Provjera baterije", "Promjena kanala"],
    explanation: "DISTRESS tipka šalje digitalni poziv pogibelji na kanalu 70 s pozicijom.",
  },
  {
    id: 83,
    category: 5,
    question: "Koji je pozivni znak za Hrvatsku?",
    correctAnswer: "9A",
    options: ["9A", "HR", "CRO", "YU"],
    explanation: "Pozivni znak za Hrvatsku je 9A, nakon čega slijede brojevi/slova.",
  },
  {
    id: 84,
    category: 5,
    question: "Što je MMSI?",
    correctAnswer: "Digitalni identifikacijski broj plovila",
    options: ["Digitalni identifikacijski broj plovila", "Vrsta antene", "Kanal za razgovor", "Snaga odašiljača"],
    explanation: "MMSI je Maritime Mobile Service Identity, za HR počinje s 238.",
  },
  {
    id: 85,
    category: 5,
    question: "Koliko VHF kanala postoji?",
    correctAnswer: "57 kanala (1-28 i 60-88)",
    options: ["57 kanala (1-28 i 60-88)", "16 kanala", "100 kanala", "10 kanala"],
    explanation: "VHF ima 57 kanala: 1-28 i 60-88, kanal 16 za bdijenje, 70 za DSC.",
  },
  {
    id: 86,
    category: 5,
    question: "Koja je frekvencija kanala 16?",
    correctAnswer: "156,8 MHz",
    options: ["156,8 MHz", "100 MHz", "27 MHz", "2182 kHz"],
    explanation: "Kanal 16 radi na frekvenciji 156,8 MHz.",
  },
  {
    id: 87,
    category: 5,
    question: "Što su simpleks i dupleks kanali?",
    correctAnswer: "Simpleks - naizmjence, dupleks - istovremeno",
    options: ["Simpleks - naizmjence, dupleks - istovremeno", "Oba ista", "Simpleks brži", "Dupleks sporiji"],
    explanation: "Simpleks - govori jedan pa drugi, dupleks - mogu govoriti istovremeno.",
  },
  {
    id: 88,
    category: 5,
    question: "Koje Zone postoje u GMDSS sustavu?",
    correctAnswer: "A1 (VHF), A2 (MF), A3 (satelit), A4 (HF)",
    options: ["A1 (VHF), A2 (MF), A3 (satelit), A4 (HF)", "Samo jedna zona", "Zone 1, 2, 3", "Nema zona"],
    explanation: "GMDSS zone: A1 do 30M (VHF), A2 do 100M (MF), A3 satelit, A4 polarni (HF).",
  },
  {
    id: 89,
    category: 5,
    question: "Što je EPIRB?",
    correctAnswer: "Plutača za označavanje pozicije u pogibelji",
    options: ["Plutača za označavanje pozicije u pogibelji", "Vrsta radija", "Kompas", "GPS uređaj"],
    explanation: "EPIRB je Emergency Position Indicating Radio Beacon, šalje poziciju 48 sati.",
  },
  {
    id: 90,
    category: 5,
    question: "Primjer poziva pogibelji?",
    correctAnswer: "MAYDAY 3x, OVDJE, ime 3x, pozicija, vrsta opasnosti",
    options: ["MAYDAY 3x, OVDJE, ime 3x, pozicija, vrsta opasnosti", "Samo HELP", "SOS morzom", "Bilo kako"],
    explanation: "MAYDAY, MAYDAY, MAYDAY, ovdje [ime] 3x, pozicija, vrsta pogibelji, broj osoba.",
  },
]

// Pojmovnik
const glossary = [
  { term: "Nautička milja", definition: "Jedinica za mjerenje udaljenosti na moru = 1852 metra" },
  { term: "Kabel", definition: "1/10 nautičke milje = 185,2 metra" },
  { term: "Azimut", definition: "Kut između N smjera meridijana i smjera prema odabranom objektu" },
  { term: "Kurs", definition: "Kut između N smjera meridijana i smjera u kojem je postavljen pramac brodice" },
  { term: "Geografska širina (φ)", definition: "Luk meridijana od ekvatora do paralele nekog mjesta" },
  {
    term: "Geografska dužina (λ)",
    definition: "Kraći luk ekvatora između Greenwich meridijana i meridijana nekog mjesta",
  },
  { term: "Magnetska varijacija", definition: "Razlika između pravog i magnetskog meridijana" },
  {
    term: "Magnetska devijacija",
    definition: "Razlika između kompasnog i magnetskog meridijana zbog brodskog magnetizma",
  },
  { term: "Peljar", definition: "Priručnik s informacijama o lukama, zaljevima, kanalima i plovidbi" },
  { term: "IALA sustav", definition: "Međunarodni sustav pomorskih oznaka za sigurnu plovidbu" },
  { term: "Lateralne oznake", definition: "Bočne oznake plovnog puta - crvena lijevo, zelena desno pri uplovljavanju" },
  { term: "Kardinalne oznake", definition: "Oznake koje pokazuju siguran kvadrant u odnosu na opasnost" },
  { term: "Kobilica", definition: "Najniža uzdužna veza broda od krme do pramca" },
  { term: "Gaz", definition: "Dubina do koje je brodica uronjena u vodu" },
  { term: "Nadvođe", definition: "Visina boka brodice od vodene linije do palube" },
  { term: "Stabilitet", definition: "Sposobnost brodice da se vrati u uspravan položaj nakon naginjanja" },
  { term: "Metacentar", definition: "Točka u kojoj okomica iz centra uzgona siječe uzdužnicu brodice" },
  { term: "Deplasman", definition: "Težina brodice jednaka težini istisnute vode" },
  { term: "MAYDAY", definition: "Signal pogibelji - ima apsolutni prioritet" },
  { term: "PAN PAN", definition: "Signal hitnosti" },
  { term: "SECURITE", definition: "Signal sigurnosti" },
  { term: "Bura", definition: "NE vjetar, hladan i suh, mahovit, 1-7 dana" },
  { term: "Jugo", definition: "SE vjetar, topao i vlažan, dugo se razvija" },
  { term: "Maestral", definition: "NW ljetni vjetar, umjerene jačine" },
  { term: "Tramontana", definition: "N vjetar, hladan i suh" },
  { term: "Lebić/Garbin", definition: "SW vjetar, može biti razoran" },
  { term: "Pulenat", definition: "W vjetar" },
  { term: "Oštro", definition: "S vjetar, topao i vlažan" },
  { term: "Levant", definition: "E vjetar, umjeren" },
  { term: "GMDSS", definition: "Svjetski pomorski sustav za pogibelj i sigurnost" },
  { term: "VHF", definition: "Very High Frequency - pomorski radio 155-174 MHz" },
  { term: "DSC", definition: "Digital Selective Call - digitalni selektivni poziv" },
  { term: "MMSI", definition: "Maritime Mobile Service Identity - identifikacijski broj plovila" },
  { term: "EPIRB", definition: "Emergency Position Indicating Radio Beacon - plutača za pogibelj" },
  { term: "SART", definition: "Search and Rescue Transponder - radarski transponder za spašavanje" },
  { term: "MRCC", definition: "Maritime Rescue Coordination Centre - centar za koordinaciju spašavanja" },
  { term: "Špring", definition: "Konop za privez koji sprječava pomicanje brodice naprijed/natrag" },
  { term: "Bitva", definition: "Uređaj za privez konopa na brodici ili obali" },
  { term: "Bokobran", definition: "Zaštita boka brodice pri pristajanju" },
  { term: "Četverovez", definition: "Privez gdje je krma vezana za obalu, pramac na sidro/mooring" },
  { term: "Sidrenjak", definition: "Sidreni lanac ili konop" },
  { term: "Orepina", definition: "Konop s plutačom vezan za vrh sidra za oslobađanje" },
  { term: "Pašnjak", definition: "Čvor koji formira omču koja se ne steže" },
  { term: "Muški uzao", definition: "Čvor za spajanje dva konopa iste debljine" },
  { term: "Zastavni uzao", definition: "Čvor za spajanje konopa različite debljine" },
  { term: "Vrzni uzao", definition: "Čvor za vezivanje bokobrana ili opreme" },
  { term: "Plutačni uzao", definition: "Čvor za vezivanje na prsten" },
  { term: "Sidreni uzao", definition: "Čvor za vezivanje na prsten sidra" },
  { term: "Hipotermija", definition: "Gubitak tjelesne temperature zbog hladnoće" },
  { term: "Mrtvo more", definition: "Valovi nakon prestanka vjetra koji ih je stvorio" },
  { term: "Squat efekt", definition: "Povećanje gaza pri plovidbi u plitkoj vodi" },
  { term: "MARPOL", definition: "Međunarodna konvencija o sprječavanju onečišćenja s brodova" },
  { term: "HAKOM", definition: "Hrvatska regulatorna agencija za mrežne djelatnosti" },
]

// Funkcija za miješanje array-a
function shuffleArray(array) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

function App() {
  const [currentView, setCurrentView] = useState("home")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [testMode, setTestMode] = useState(false)
  const [testQuestions, setTestQuestions] = useState([])
  const [userAnswers, setUserAnswers] = useState({})
  const [testCompleted, setTestCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Timer za test mode
  useEffect(() => {
    let interval
    if (testMode && !testCompleted) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [testMode, testCompleted])

  // Generiraj test sa random pitanjima
  const startTest = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 30) // 30 pitanja za test
    setTestQuestions(selected)
    setTestMode(true)
    setCurrentView("test")
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setTestCompleted(false)
    setScore(0)
    setTimeElapsed(0)
  }

  // Završi test
  const finishTest = () => {
    let correctAnswers = 0
    testQuestions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        correctAnswers++
      }
    })
    setScore(correctAnswers)
    setTestCompleted(true)
  }

  // Format vrijeme
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Navigacija
  const NavBar = () => (
    <nav className="bg-blue-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Anchor className="h-8 w-8" />
          <h1 className="text-xl font-bold">Voditelj Brodice B</h1>
        </div>

        {/* Desktop meni */}
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => {
              setCurrentView("home")
              setTestMode(false)
            }}
            className="hover:text-blue-200 transition"
          >
            <Home className="inline h-5 w-5 mr-1" />
            Početna
          </button>
          <button
            onClick={() => {
              setCurrentView("glossary")
              setTestMode(false)
            }}
            className="hover:text-blue-200 transition"
          >
            <Book className="inline h-5 w-5 mr-1" />
            Pojmovnik
          </button>
          <button
            onClick={() => {
              setCurrentView("practice")
              setTestMode(false)
            }}
            className="hover:text-blue-200 transition"
          >
            <FileQuestion className="inline h-5 w-5 mr-1" />
            Vježbaj
          </button>
          <button onClick={startTest} className="bg-orange-500 px-4 py-1 rounded hover:bg-orange-600 transition">
            <Award className="inline h-5 w-5 mr-1" />
            Test
          </button>
        </div>

        {/* Mobile meni toggle */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile meni */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <button
            onClick={() => {
              setCurrentView("home")
              setTestMode(false)
              setMobileMenuOpen(false)
            }}
            className="block w-full text-left py-2 hover:bg-blue-800 px-4 rounded"
          >
            <Home className="inline h-5 w-5 mr-1" />
            Početna
          </button>
          <button
            onClick={() => {
              setCurrentView("glossary")
              setTestMode(false)
              setMobileMenuOpen(false)
            }}
            className="block w-full text-left py-2 hover:bg-blue-800 px-4 rounded"
          >
            <Book className="inline h-5 w-5 mr-1" />
            Pojmovnik
          </button>
          <button
            onClick={() => {
              setCurrentView("practice")
              setTestMode(false)
              setMobileMenuOpen(false)
            }}
            className="block w-full text-left py-2 hover:bg-blue-800 px-4 rounded"
          >
            <FileQuestion className="inline h-5 w-5 mr-1" />
            Vježbaj
          </button>
          <button
            onClick={() => {
              startTest()
              setMobileMenuOpen(false)
            }}
            className="block w-full text-left py-2 bg-orange-500 hover:bg-orange-600 px-4 rounded"
          >
            <Award className="inline h-5 w-5 mr-1" />
            Test
          </button>
        </div>
      )}
    </nav>
  )

  // Početna stranica
  const HomeView = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-900">Dobrodošli u aplikaciju za učenje</h2>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">O aplikaciji</h3>
          <p className="text-gray-700 mb-4">
            Ova aplikacija vam pomaže pripremiti se za ispit za voditelja brodice kategorije B. Sadrži sve potrebne
            materijale organizirane po kategorijama prema službenom programu.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-semibold mb-2">📚 Pojmovnik</h4>
              <p className="text-sm">Preko 60 pomorskih pojmova s objašnjenjima</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-semibold mb-2">❓ Vježbanje</h4>
              <p className="text-sm">90 pitanja organiziranih u 5 kategorija</p>
            </div>
            <div className="bg-orange-50 p-4 rounded">
              <h4 className="font-semibold mb-2">📝 Test mod</h4>
              <p className="text-sm">Simulacija ispita sa 30 nasumičnih pitanja</p>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-semibold mb-2">📱 Multi-platforma</h4>
              <p className="text-sm">Radi na svim uređajima - mobitel, tablet, računalo</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Kategorije pitanja</h3>
          <div className="space-y-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{cat.icon}</span>
                  <span className="font-medium">{cat.name}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {questions.filter((q) => q.category === cat.id).length} pitanja
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-yellow-50 rounded">
            <p className="text-sm text-gray-700">
              <strong>Napomena:</strong> Za prolaz ispita potrebno je najmanje 70% točnih odgovora (21 od 30 pitanja).
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  // Pojmovnik
  const GlossaryView = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-900">Pojmovnik</h2>
        <p className="text-gray-600 mb-6">Svi važni pomorski pojmovi na jednom mjestu</p>
        <div className="space-y-4">
          {glossary.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <h3 className="font-bold text-lg text-blue-800">{item.term}</h3>
              <p className="text-gray-700 mt-1">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Vježbanje po kategorijama
  const PracticeView = () => {
    if (!selectedCategory) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Vježbanje po kategorijama</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id)
                    setCurrentQuestionIndex(0)
                    setShowAnswer(false)
                    setSelectedAnswer(null)
                  }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-left"
                >
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">{cat.icon}</span>
                    <h3 className="text-xl font-semibold">{cat.name}</h3>
                  </div>
                  <p className="text-gray-600">{questions.filter((q) => q.category === cat.id).length} pitanja</p>
                  <ChevronRight className="mt-2 h-5 w-5 text-blue-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }

    const categoryQuestions = questions.filter((q) => q.category === selectedCategory)
    const currentQuestion = categoryQuestions[currentQuestionIndex]

    if (!currentQuestion) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Završili ste sve pitanja u ovoj kategoriji!</h3>
            <button
              onClick={() => setSelectedCategory(null)}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Povratak na kategorije
            </button>
          </div>
        </div>
      )
    }

    // Miješaj opcije odgovora
    const shuffledOptions = showAnswer ? currentQuestion.options : shuffleArray(currentQuestion.options)

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setSelectedCategory(null)} className="text-blue-600 hover:text-blue-800">
              ← Povratak
            </button>
            <span className="text-gray-600">
              Pitanje {currentQuestionIndex + 1} od {categoryQuestions.length}
            </span>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>

            {!showAnswer ? (
              <div className="space-y-3">
                {shuffledOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(option)}
                    className={`w-full text-left p-4 rounded border-2 transition ${
                      selectedAnswer === option
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}

                {selectedAnswer && (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                  >
                    Provjeri odgovor
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded border-2 ${
                      option === currentQuestion.correctAnswer
                        ? "border-green-500 bg-green-50"
                        : option === selectedAnswer
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start">
                      {option === currentQuestion.correctAnswer && (
                        <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      )}
                      {option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                        <X className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                      )}
                      <span>{option}</span>
                    </div>
                  </div>
                ))}

                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Objašnjenje:</strong> {currentQuestion.explanation}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCurrentQuestionIndex((prev) => prev + 1)
                    setShowAnswer(false)
                    setSelectedAnswer(null)
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                >
                  Sljedeće pitanje
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Test mod
  const TestView = () => {
    if (testCompleted) {
      const percentage = Math.round((score / testQuestions.length) * 100)
      const passed = percentage >= 70

      return (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-3xl font-bold mb-6">Test završen!</h2>

              <div className={`text-6xl mb-6 ${passed ? "text-green-600" : "text-red-600"}`}>{percentage}%</div>

              <p className="text-xl mb-4">
                Točno odgovorenih: {score} od {testQuestions.length}
              </p>

              <p className="text-lg mb-4">Vrijeme: {formatTime(timeElapsed)}</p>

              <div className={`p-4 rounded mb-6 ${passed ? "bg-green-100" : "bg-red-100"}`}>
                <p className="text-lg font-semibold">{passed ? "✅ POLOŽENO!" : "❌ NIJE POLOŽENO"}</p>
                <p className="text-sm mt-2">
                  {passed ? "Čestitamo! Uspješno ste položili test." : "Potrebno je najmanje 70% (21/30) za prolaz."}
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setTestMode(false)
                    setCurrentView("home")
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                >
                  Povratak na početnu
                </button>
                <button
                  onClick={startTest}
                  className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 transition"
                >
                  Novi test
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    const currentQuestion = testQuestions[currentQuestionIndex]

    if (!currentQuestion) {
      return null
    }

    const shuffledOptions = useMemo(() => {
      return shuffleArray(currentQuestion.options)
    }, [currentQuestion.id])

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-100 p-4 rounded-lg mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Clock className="h-5 w-5" />
              <span className="font-mono">{formatTime(timeElapsed)}</span>
            </div>
            <span className="font-semibold">
              Pitanje {currentQuestionIndex + 1} od {testQuestions.length}
            </span>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>

            <div className="space-y-3">
              {shuffledOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: option })
                    if (currentQuestionIndex < testQuestions.length - 1) {
                      setCurrentQuestionIndex((prev) => prev + 1)
                    } else {
                      finishTest()
                    }
                  }}
                  className={`w-full text-left p-4 rounded border-2 transition ${
                    userAnswers[currentQuestionIndex] === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => {
                  if (window.confirm("Jeste li sigurni da želite prekinuti test?")) {
                    setTestMode(false)
                    setCurrentView("home")
                  }
                }}
                className="text-red-600 hover:text-red-800"
              >
                Prekini test
              </button>

              <div className="space-x-4">
                {currentQuestionIndex > 0 && (
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ← Prethodno
                  </button>
                )}

                {currentQuestionIndex === testQuestions.length - 1 && (
                  <button
                    onClick={finishTest}
                    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
                  >
                    Završi test
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / testQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      {currentView === "home" && <HomeView />}
      {currentView === "glossary" && <GlossaryView />}
      {currentView === "practice" && !testMode && <PracticeView />}
      {currentView === "test" && testMode && <TestView />}
    </div>
  )
}

export default App
