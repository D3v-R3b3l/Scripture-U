export interface ProphecyLink {
  id: string;
  title: string;
  category: 'Messianic Prophecy' | 'Typological Shadow' | 'Covenant Promise' | 'Eschatological';
  otBookId: string;
  otPassage: string;
  otText: string;
  ntBookId: string;
  ntPassage: string;
  ntText: string;
  theologicalSignificance: string;
  covenant: 'Edenic' | 'Abrahamic' | 'Mosaic' | 'Davidic' | 'New Covenant';
  originalLanguageTerms: {
    term: string;
    language: 'Hebrew' | 'Greek';
    transliteration: string;
    meaning: string;
  }[];
  helixPairIndex: number; // 0 to 26 mapping across the helix
}

export const PROPHECY_LINKS: ProphecyLink[] = [
  {
    id: 'protoevangelium',
    title: 'The Protoevangelium: Seed of the Woman Crushing the Serpent',
    category: 'Messianic Prophecy',
    otBookId: 'GEN',
    otPassage: 'Genesis 3:15',
    otText: 'I will put enmity between you and the woman, and between your offspring and her offspring; he shall bruise your head, and you shall bruise his heel.',
    ntBookId: 'GAL',
    ntPassage: 'Galatians 4:4-5 / Romans 16:20',
    ntText: 'When the fullness of time had come, God sent forth his Son, born of woman, born under the law... The God of peace will soon crush Satan under your feet.',
    theologicalSignificance: 'The foundational Gospel promise directly after the Fall, anticipating a male descendant of the woman who conquers evil at great personal cost.',
    covenant: 'Edenic',
    originalLanguageTerms: [
      { term: 'זֶרַע', language: 'Hebrew', transliteration: 'Zera', meaning: 'Seed / Offspring / Lineage' },
      { term: 'יְשׁוּפְךָ', language: 'Hebrew', transliteration: 'Yeshufecha', meaning: 'Shall crush / bruise / shatter' }
    ],
    helixPairIndex: 0
  },
  {
    id: 'abrahamic-blessing',
    title: 'All Nations Blessed Through Abraham’s Singular Seed',
    category: 'Covenant Promise',
    otBookId: 'GEN',
    otPassage: 'Genesis 22:18',
    otText: 'And in your offspring shall all the nations of the earth be blessed, because you have obeyed my voice.',
    ntBookId: 'GAL',
    ntPassage: 'Galatians 3:16',
    ntText: 'Now the promises were made to Abraham and to his offspring. It does not say, "And to offsprings," referring to many, but referring to one, "And to your offspring," who is Christ.',
    theologicalSignificance: 'The covenant promise expands beyond ethnic boundary markers to encompass universal gentile redemption through the Messiah.',
    covenant: 'Abrahamic',
    originalLanguageTerms: [
      { term: 'בְּרָכָה', language: 'Hebrew', transliteration: 'Berakhah', meaning: 'Blessing / Covenant Favor' },
      { term: 'σπέρμα', language: 'Greek', transliteration: 'Sperma', meaning: 'Seed / Heir' }
    ],
    helixPairIndex: 1
  },
  {
    id: 'passover-lamb',
    title: 'The Paschal Lamb: Unblemished Sacrifice & Shielding Blood',
    category: 'Typological Shadow',
    otBookId: 'EXO',
    otPassage: 'Exodus 12:5-7, 13',
    otText: 'Your lamb shall be without blemish, a male a year old... And when I see the blood, I will pass over you, and no plague will befall you to destroy you.',
    ntBookId: '1CO',
    ntPassage: '1 Corinthians 5:7 / John 1:29',
    ntText: 'For Christ, our Passover lamb, has been sacrificed... Behold, the Lamb of God, who takes away the sin of the world!',
    theologicalSignificance: 'The historical deliverance from Egyptian judgment prefigures cosmic liberation from death and sin by Christ’s blood.',
    covenant: 'Mosaic',
    originalLanguageTerms: [
      { term: 'פֶּסַח', language: 'Hebrew', transliteration: 'Pesach', meaning: 'Passover / Exemption' },
      { term: 'ἀμνὸς τοῦ θεοῦ', language: 'Greek', transliteration: 'Amnos tou Theou', meaning: 'Lamb of God' }
    ],
    helixPairIndex: 2
  },
  {
    id: 'bronze-serpent',
    title: 'The Bronze Serpent: Lifted Up for Life',
    category: 'Typological Shadow',
    otBookId: 'NUM',
    otPassage: 'Numbers 21:8-9',
    otText: 'Make a fiery serpent and set it on a pole, and everyone who is bitten, when he sees it, shall live.',
    ntBookId: 'JHN',
    ntPassage: 'John 3:14-15',
    ntText: 'And as Moses lifted up the serpent in the wilderness, so must the Son of Man be lifted up, that whoever believes in him may have eternal life.',
    theologicalSignificance: 'The instrument bearing the curse itself becomes the means of healing and eternal rescue when gazed upon in faith.',
    covenant: 'Mosaic',
    originalLanguageTerms: [
      { term: 'נְחַשׁ נְחֹשֶׁת', language: 'Hebrew', transliteration: 'Nechash Nechoshet', meaning: 'Bronze Serpent' },
      { term: 'ὑψωθῆναι', language: 'Greek', transliteration: 'Hypsōthēnai', meaning: 'To be lifted up / exalted' }
    ],
    helixPairIndex: 3
  },
  {
    id: 'prophet-like-moses',
    title: 'The Prophet Like Moses with Words in His Mouth',
    category: 'Messianic Prophecy',
    otBookId: 'DEU',
    otPassage: 'Deuteronomy 18:18-19',
    otText: 'I will raise up for them a prophet like you from among their brothers. And I will put my words in his mouth, and he shall speak to them all that I command him.',
    ntBookId: 'ACT',
    ntPassage: 'Acts 3:22-23 / John 12:49',
    ntText: 'Moses said, "The Lord God will raise up for you a prophet like me from your brothers. You shall listen to him in whatever he tells you."',
    theologicalSignificance: 'Anticipates an authoritative lawgiver and mediator greater than Moses whose words carry final divine judgment and salvation.',
    covenant: 'Mosaic',
    originalLanguageTerms: [
      { term: 'נָבִיא', language: 'Hebrew', transliteration: 'Navi', meaning: 'Spokesman / Prophet' }
    ],
    helixPairIndex: 4
  },
  {
    id: 'kinsman-redeemer',
    title: 'Boaz & Ruth: The Goel (Kinsman-Redeemer) Acquiring the Bride',
    category: 'Typological Shadow',
    otBookId: 'RUT',
    otPassage: 'Ruth 4:9-10',
    otText: 'You are witnesses this day that I have bought all that belonged to Elimelech... Also Ruth the Moabite, I have bought to be my wife.',
    ntBookId: 'EPH',
    ntPassage: 'Ephesians 5:25-27 / Titus 2:14',
    ntText: 'Christ loved the church and gave himself up for her... to redeem us from all lawlessness and to purify for himself a people for his own possession.',
    theologicalSignificance: 'The Goel must be kin, able to pay, and willing to redeem. Christ took on human flesh to pay the ransom and unite with His gentile-inclusive bride.',
    covenant: 'Davidic',
    originalLanguageTerms: [
      { term: 'גֹּאֵל', language: 'Hebrew', transliteration: 'Goel', meaning: 'Kinsman-Redeemer / Avenger' },
      { term: 'λυτρόω', language: 'Greek', transliteration: 'Lytroō', meaning: 'To ransom / redeem at a price' }
    ],
    helixPairIndex: 5
  },
  {
    id: 'davidic-eternal-throne',
    title: 'The Davidic Dynastic Promise: An Unending Kingdom',
    category: 'Covenant Promise',
    otBookId: '2SA',
    otPassage: '2 Samuel 7:12-13, 16',
    otText: 'I will raise up your offspring after you... I will establish the throne of his kingdom forever. Your house and your kingdom shall be made sure forever.',
    ntBookId: 'LUK',
    ntPassage: 'Luke 1:32-33',
    ntText: 'He will be great and will be called the Son of the Most High. And the Lord God will give to him the throne of his father David, and he will reign over the house of Jacob forever.',
    theologicalSignificance: 'The physical kingdom of David finds cosmic, indestructible fulfillment in the eternal reign of Jesus of Nazareth.',
    covenant: 'Davidic',
    originalLanguageTerms: [
      { term: 'מַמְלָכָה', language: 'Hebrew', transliteration: 'Mamlakhah', meaning: 'Reign / Sovereign Kingdom' },
      { term: 'βασιλεία', language: 'Greek', transliteration: 'Basileia', meaning: 'Kingdom / Royal Dominion' }
    ],
    helixPairIndex: 6
  },
  {
    id: 'living-redeemer-job',
    title: 'The Living Redeemer Standing Upon the Earth',
    category: 'Typological Shadow',
    otBookId: 'JOB',
    otPassage: 'Job 19:25-26',
    otText: 'For I know that my Redeemer lives, and at the last he will stand upon the earth. And after my skin has been thus destroyed, yet in my flesh I shall see God.',
    ntBookId: '1CO',
    ntPassage: '1 Corinthians 15:52-54',
    ntText: 'For the trumpet will sound, and the dead will be raised imperishable, and we shall be changed. Then shall come to pass the saying: "Death is swallowed up in victory."',
    theologicalSignificance: 'The patriarch Job’s steadfast intuition of personal bodily resurrection grounded in a living Divine Vindicator.',
    covenant: 'Edenic',
    originalLanguageTerms: [
      { term: 'חַי', language: 'Hebrew', transliteration: 'Chai', meaning: 'Living / Vital' }
    ],
    helixPairIndex: 7
  },
  {
    id: 'psalm-22-crucifixion',
    title: 'Psalm 22: The Pierced Hands, Mocking Crowd, and Cast Lots',
    category: 'Messianic Prophecy',
    otBookId: 'PSA',
    otPassage: 'Psalm 22:1, 16-18',
    otText: 'They have pierced my hands and feet—I can count all my bones—they stare and gloat over me; they divide my garments among them, and for my clothing they cast lots.',
    ntBookId: 'MAT',
    ntPassage: 'Matthew 27:35, 46 / John 19:24',
    ntText: 'And when they had crucified him, they divided his garments among them by casting lots... And Jesus cried out with a loud voice, "Eli, Eli, lema sabachthani?"',
    theologicalSignificance: 'Penned centuries before Roman crucifixion was invented, depicting the specific physiological and psychological agony of Golgotha.',
    covenant: 'Davidic',
    originalLanguageTerms: [
      { term: 'כָּאֲרִי / כָּרוּ', language: 'Hebrew', transliteration: 'Kaaru / Pierced', meaning: 'Pierced / dug through' }
    ],
    helixPairIndex: 8
  },
  {
    id: 'psalm-110-melchizedek',
    title: 'Priest Forever in the Order of Melchizedek',
    category: 'Messianic Prophecy',
    otBookId: 'PSA',
    otPassage: 'Psalm 110:1, 4',
    otText: 'The LORD says to my Lord: "Sit at my right hand, until I make your enemies your footstool." The LORD has sworn: "You are a priest forever after the order of Melchizedek."',
    ntBookId: 'HEB',
    ntPassage: 'Hebrews 7:17, 24-25',
    ntText: 'For it is witnessed of him, "You are a priest forever, after the order of Melchizedek." Consequently, he is able to save to the uttermost those who draw near to God through him.',
    theologicalSignificance: 'A royal-priestly office independent of and superior to the Levitical line, uniting the crowns of King and High Priest.',
    covenant: 'Davidic',
    originalLanguageTerms: [
      { term: 'מַלְכִּי־צֶדֶק', language: 'Hebrew', transliteration: 'Malki-Tzedek', meaning: 'King of Righteousness' }
    ],
    helixPairIndex: 9
  },
  {
    id: 'virgin-birth-immanuel',
    title: 'Immanuel: God With Us Born of the Virgin',
    category: 'Messianic Prophecy',
    otBookId: 'ISA',
    otPassage: 'Isaiah 7:14',
    otText: 'Therefore the Lord himself will give you a sign. Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel.',
    ntBookId: 'MAT',
    ntPassage: 'Matthew 1:22-23',
    ntText: 'All this took place to fulfill what the Lord had spoken by the prophet: "Behold, the virgin shall conceive and bear a son, and they shall call his name Immanuel" (which means, God with us).',
    theologicalSignificance: 'The miraculous incarnation wherein the transcendent Yahweh establishes His dwelling within human reality.',
    covenant: 'Davidic',
    originalLanguageTerms: [
      { term: 'עַלְמָה', language: 'Hebrew', transliteration: 'Almah', meaning: 'Young Maiden / Virgin' },
      { term: 'עִמָּנוּאֵל', language: 'Hebrew', transliteration: 'Immanu-El', meaning: 'With us is God' }
    ],
    helixPairIndex: 10
  },
  {
    id: 'suffering-servant-isaiah53',
    title: 'The Pierced Servant: Penal Substitutionary Atonement',
    category: 'Messianic Prophecy',
    otBookId: 'ISA',
    otPassage: 'Isaiah 53:4-6, 11',
    otText: 'Surely he has borne our griefs and carried our sorrows... he was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace.',
    ntBookId: '1PE',
    ntPassage: '1 Peter 2:24-25 / Acts 8:32-35',
    ntText: 'He himself bore our sins in his body on the tree, that we might die to sin and live to righteousness. By his wounds you have been healed.',
    theologicalSignificance: 'The heart of canonical soteriology: an innocent substitute willingly bears divine wrath to justify the unrighteous.',
    covenant: 'Davidic',
    originalLanguageTerms: [
      { term: 'מְחֹלָל', language: 'Hebrew', transliteration: 'Mekholal', meaning: 'Pierced through / Wounded' },
      { term: 'אָשָׁם', language: 'Hebrew', transliteration: 'Asham', meaning: 'Guilt offering / Reparation' }
    ],
    helixPairIndex: 11
  },
  {
    id: 'new-covenant-jeremiah',
    title: 'The New Covenant Written Upon Human Hearts',
    category: 'Covenant Promise',
    otBookId: 'JER',
    otPassage: 'Jeremiah 31:31-34',
    otText: 'I will make a new covenant... I will put my law within them, and I will write it on their hearts. And I will be their God, and they shall be my people... For I will forgive their iniquity.',
    ntBookId: 'HEB',
    ntPassage: 'Hebrews 8:8-12 / Luke 22:20',
    ntText: 'This cup that is poured out for you is the new covenant in my blood... In speaking of a new covenant, he makes the first one obsolete.',
    theologicalSignificance: 'The definitive transition from external stony tablets to internal regeneration, sealed by Christ’s covenant blood.',
    covenant: 'New Covenant',
    originalLanguageTerms: [
      { term: 'בְּרִית חֲדָשָׁה', language: 'Hebrew', transliteration: 'Berith Chadashah', meaning: 'New Covenant' },
      { term: 'διαθήκη καινή', language: 'Greek', transliteration: 'Diatheke Kaine', meaning: 'New / Renewed Covenant' }
    ],
    helixPairIndex: 12
  },
  {
    id: 'heart-of-flesh-ezekiel',
    title: 'The Heart of Flesh and Indwelling Holy Spirit',
    category: 'Covenant Promise',
    otBookId: 'EZK',
    otPassage: 'Ezekiel 36:26-27',
    otText: 'And I will give you a new heart, and a new spirit I will put within you. And I will remove the heart of stone from your flesh and give you a heart of flesh. And I will put my Spirit within you.',
    ntBookId: '2CO',
    ntPassage: '2 Corinthians 3:3 / Titus 3:5',
    ntText: 'Written not with ink but with the Spirit of the living God, not on tablets of stone but on tablets of human hearts.',
    theologicalSignificance: 'Spiritual resurrection through the Holy Spirit empowering obedience and heartfelt union with God.',
    covenant: 'New Covenant',
    originalLanguageTerms: [
      { term: 'רוּחַ חֲדָשָׁה', language: 'Hebrew', transliteration: 'Ruach Chadashah', meaning: 'New Spirit / Breath' }
    ],
    helixPairIndex: 13
  },
  {
    id: 'son-of-man-daniel7',
    title: 'The Son of Man Coming with the Clouds of Heaven',
    category: 'Messianic Prophecy',
    otBookId: 'DAN',
    otPassage: 'Daniel 7:13-14',
    otText: 'I saw in the night visions, and behold, with the clouds of heaven there came one like a son of man... to him was given dominion and glory and a kingdom, that all peoples should serve him.',
    ntBookId: 'MRK',
    ntPassage: 'Mark 14:61-62 / Matthew 26:64',
    ntText: 'Jesus said, "I am, and you will see the Son of Man seated at the right hand of Power, and coming with the clouds of heaven."',
    theologicalSignificance: 'Jesus’ preferred self-designation, claiming divine prerogative, heavenly throne ascension, and universal kingship.',
    covenant: 'Davidic',
    originalLanguageTerms: [
      { term: 'כְּבַר אֱנָשׁ', language: 'Hebrew', transliteration: 'Kebar Enash (Aramaic)', meaning: 'One like a son of man' },
      { term: 'υἱὸς τοῦ ἀνθρώπου', language: 'Greek', transliteration: 'Huios tou Anthropou', meaning: 'Son of Man' }
    ],
    helixPairIndex: 14
  },
  {
    id: 'pentecost-spirit-joel',
    title: 'The Spirit Poured Out Upon All Flesh',
    category: 'Messianic Prophecy',
    otBookId: 'JOL',
    otPassage: 'Joel 2:28-29',
    otText: 'And it shall come to pass afterward, that I will pour out my Spirit on all flesh; your sons and your daughters shall prophesy... even on the male and female servants.',
    ntBookId: 'ACT',
    ntPassage: 'Acts 2:16-18',
    ntText: 'This is what was uttered through the prophet Joel: "And in the last days it shall be, God declares, that I will pour out my Spirit on all flesh..."',
    theologicalSignificance: 'The democratic distribution of prophetic endowment to all believers at Pentecost, inaugurating the Last Days.',
    covenant: 'New Covenant',
    originalLanguageTerms: [
      { term: 'אֶשְׁפּוֹךְ אֶת־רוּחִי', language: 'Hebrew', transliteration: 'Eshpoch et-Ruchi', meaning: 'I will pour out My Spirit' }
    ],
    helixPairIndex: 15
  },
  {
    id: 'sign-of-jonah',
    title: 'Jonah in the Belly of Sheol: Three Days and Three Nights',
    category: 'Typological Shadow',
    otBookId: 'JON',
    otPassage: 'Jonah 1:17; 2:2',
    otText: 'And Jonah was in the belly of the fish three days and three nights... Out of the belly of Sheol I cried, and you heard my voice.',
    ntBookId: 'MAT',
    ntPassage: 'Matthew 12:40',
    ntText: 'For just as Jonah was three days and three nights in the belly of the great fish, so will the Son of Man be three days and three nights in the heart of the earth.',
    theologicalSignificance: 'The historical deliverance of Jonah becomes the foundational prophetic typological sign of the physical bodily resurrection of Christ.',
    covenant: 'Mosaic',
    originalLanguageTerms: [
      { term: 'שְׁאוֹל', language: 'Hebrew', transliteration: 'Sheol', meaning: 'Abode of the dead / The deep' }
    ],
    helixPairIndex: 16
  },
  {
    id: 'bethlehem-birth-micah',
    title: 'The Ancient Ruler Arising from Bethlehem Ephrathah',
    category: 'Messianic Prophecy',
    otBookId: 'MIC',
    otPassage: 'Micah 5:2',
    otText: 'But you, O Bethlehem Ephrathah, who are too little to be among the clans of Judah, from you shall come forth for me one who is to be ruler in Israel, whose coming forth is from of old, from ancient days.',
    ntBookId: 'MAT',
    ntPassage: 'Matthew 2:5-6 / Luke 2:4-7',
    ntText: 'For so it is written by the prophet: "And you, O Bethlehem, in the land of Judah, are by no means least among the rulers of Judah; for from you shall come a ruler who will shepherd my people Israel."',
    theologicalSignificance: 'The eternal pre-existence of Messiah coupled with His humble geographic origin in David’s ancestral town.',
    covenant: 'Davidic',
    originalLanguageTerms: [
      { term: 'מִקֶּדֶם מִימֵי עוֹלָם', language: 'Hebrew', transliteration: 'Mikkedem Miyme Olam', meaning: 'From antiquity, from days of eternity' }
    ],
    helixPairIndex: 17
  },
  {
    id: 'righteous-live-by-faith',
    title: 'Habakkuk’s Watchtower: The Righteous Shall Live by Faith',
    category: 'Covenant Promise',
    otBookId: 'HAB',
    otPassage: 'Habakkuk 2:4',
    otText: 'Behold, his soul is puffed up; it is not upright within him, but the righteous shall live by his faith.',
    ntBookId: 'ROM',
    ntPassage: 'Romans 1:17 / Galatians 3:11',
    ntText: 'For in it the righteousness of God is revealed from faith for faith, as it is written, "The righteous shall live by faith."',
    theologicalSignificance: 'The definitive scriptural bedrock of justification through trusting reliance upon God rather than self-merit.',
    covenant: 'Abrahamic',
    originalLanguageTerms: [
      { term: 'אֱמוּנָה', language: 'Hebrew', transliteration: 'Emunah', meaning: 'Steadfast fidelity / Trust / Faith' },
      { term: 'πίστις', language: 'Greek', transliteration: 'Pistis', meaning: 'Faith / Trustworthiness' }
    ],
    helixPairIndex: 18
  },
  {
    id: 'king-on-donkey-zechariah',
    title: 'The Humble King Entering Zion Mounted on a Donkey',
    category: 'Messianic Prophecy',
    otBookId: 'ZEC',
    otPassage: 'Zechariah 9:9',
    otText: 'Rejoice greatly, O daughter of Zion! Behold, your king is coming to you; righteous and having salvation is he, humble and mounted on a donkey, on a colt, the foal of a donkey.',
    ntBookId: 'MAT',
    ntPassage: 'Matthew 21:4-5 / John 12:14-15',
    ntText: 'This took place to fulfill what was spoken by the prophet, saying, "Say to the daughter of Zion, Behold, your king is coming to you, humble, and mounted on a donkey..."',
    theologicalSignificance: 'The contrast of the Messianic king arriving not as a brutal conquering general on a warhorse, but in gentle peace and humility.',
    covenant: 'Davidic',
    originalLanguageTerms: [
      { term: 'עָנִי', language: 'Hebrew', transliteration: 'Ani', meaning: 'Humble / Afflicted / Poor' }
    ],
    helixPairIndex: 19
  },
  {
    id: 'thirty-pieces-silver',
    title: 'Thirty Pieces of Silver Thrown into the Potter’s Field',
    category: 'Messianic Prophecy',
    otBookId: 'ZEC',
    otPassage: 'Zechariah 11:12-13',
    otText: 'So they weighed out as my wages thirty pieces of silver. Then the LORD said to me, "Throw it to the potter"—the lordly price at which I was priced by them.',
    ntBookId: 'MAT',
    ntPassage: 'Matthew 26:15; 27:7-10',
    ntText: 'And they paid him thirty pieces of silver... Then was fulfilled what had been spoken by the prophet: "And they took the thirty pieces of silver, the price of him on whom a price had been set..."',
    theologicalSignificance: 'The covenant shepherd is insulted with the compensation of a common gored slave (Exodus 21:32).',
    covenant: 'Mosaic',
    originalLanguageTerms: [
      { term: 'שְׁלֹשִׁים כָּסֶף', language: 'Hebrew', transliteration: 'Sheloshim Kesef', meaning: 'Thirty silver pieces' }
    ],
    helixPairIndex: 20
  },
  {
    id: 'pierced-one-mourned',
    title: 'Looking on the One Whom They Have Pierced',
    category: 'Messianic Prophecy',
    otBookId: 'ZEC',
    otPassage: 'Zechariah 12:10',
    otText: 'And I will pour out on the house of David and the inhabitants of Jerusalem a spirit of grace and pleas for mercy, so that, when they look on me, on him whom they have pierced, they shall mourn for him.',
    ntBookId: 'JHN',
    ntPassage: 'John 19:37 / Revelation 1:7',
    ntText: 'And again another Scripture says, "They will look on him whom they have pierced." Behold, he is coming with the clouds, and every eye will see him, even those who pierced him.',
    theologicalSignificance: 'Yahweh identifies directly with the pierced victim, provoking deep national and global repentance.',
    covenant: 'Davidic',
    originalLanguageTerms: [
      { term: 'דָּקָרוּ', language: 'Hebrew', transliteration: 'Daqaru', meaning: 'Pierced / Thrust through' }
    ],
    helixPairIndex: 21
  },
  {
    id: 'elijah-forerunner-malachi',
    title: 'The Forerunner Preparing the Way of the Lord',
    category: 'Messianic Prophecy',
    otBookId: 'MAL',
    otPassage: 'Malachi 3:1; 4:5',
    otText: 'Behold, I send my messenger, and he will prepare the way before me. And the Lord whom you seek will suddenly come to his temple... Behold, I will send you Elijah the prophet before the great and awesome day of the LORD comes.',
    ntBookId: 'MAT',
    ntPassage: 'Matthew 11:13-14; 17:12-13 / Luke 1:17',
    ntText: 'For all the Prophets and the Law prophesied until John, and if you are willing to accept it, he is Elijah who is to come.',
    theologicalSignificance: 'John the Baptist fulfills the ministry of Elijah, turning hearts in repentance prior to the Messiah’s manifestation.',
    covenant: 'Mosaic',
    originalLanguageTerms: [
      { term: 'מַלְאָכִי', language: 'Hebrew', transliteration: 'Mal\'akhi', meaning: 'My Messenger' }
    ],
    helixPairIndex: 22
  },
  {
    id: 'eden-temple-new-jerusalem',
    title: 'Eden Restored: The River of Life and Tree of Life in New Jerusalem',
    category: 'Eschatological',
    otBookId: 'GEN',
    otPassage: 'Genesis 2:9-10; Ezekiel 47:1-12',
    otText: 'The tree of life was in the midst of the garden... A river flowed out of Eden to water the garden... and on both sides of the river shall grow all kinds of trees for food.',
    ntBookId: 'REV',
    ntPassage: 'Revelation 22:1-3',
    ntText: 'Then the angel showed me the river of the water of life, bright as crystal, flowing from the throne of God and of the Lamb... on either side of the river, the tree of life with its twelve kinds of fruit... No longer will there be anything accursed.',
    theologicalSignificance: 'The canonical envelope closes: what was lost in Genesis 3 is not merely restored but gloriously consummated in Revelation 22.',
    covenant: 'New Covenant',
    originalLanguageTerms: [
      { term: 'עֵץ הַחַיִּים', language: 'Hebrew', transliteration: 'Etz HaChayim', meaning: 'Tree of Life' },
      { term: 'ξύλον ζωῆς', language: 'Greek', transliteration: 'Xylon Zoes', meaning: 'Tree of Life' }
    ],
    helixPairIndex: 23
  }
];
