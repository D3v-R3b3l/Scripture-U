export interface TheologicalMotif {
  id: string;
  theme: string;
  tagline: string;
  originalTerms: {
    term: string;
    transliteration: string;
    language: 'Hebrew' | 'Greek' | 'Aramaic';
    meaning: string;
    theologicalSignificance: string;
  }[];
  covenantArc: string;
  otRoots: {
    passage: string;
    context: string;
  }[];
  ntFulfillment: {
    passage: string;
    christologicalFocus: string;
  }[];
  synthesis: string;
  suggestedQuestions: string[];
}

export const THEOLOGICAL_MOTIFS: TheologicalMotif[] = [
  {
    id: 'hesed-agape',
    theme: 'Covenant Love & Steadfast Mercy (Hesed → Agape)',
    tagline: 'The unbreakable, loyal commitment of God to His people across generations.',
    originalTerms: [
      {
        term: 'חֶסֶד',
        transliteration: 'Chesed / Hesed',
        language: 'Hebrew',
        meaning: 'Steadfast covenant love, loyalty, lovingkindness, mercy',
        theologicalSignificance: 'Describes God’s relentless fidelity to His covenant promises despite human unfaithfulness (Exodus 34:6; Psalm 136).'
      },
      {
        term: 'ἀγάπη',
        transliteration: 'Agapē',
        language: 'Greek',
        meaning: 'Self-sacrificial, unconditional divine love',
        theologicalSignificance: 'The ultimate manifestation of Hesed demonstrated when Christ laid down His life for His enemies (Romans 5:8; 1 John 4:10).'
      }
    ],
    covenantArc: 'Edenic pledge -> Abrahamic unconditional oath -> Mosaic mercy seat -> Davidic steadfast mercies -> Incarnate Agape on the cross.',
    otRoots: [
      { passage: 'Exodus 34:6-7', context: 'The self-proclamation of Yahweh on Sinai: "abounding in steadfast love (hesed) and faithfulness."' },
      { passage: 'Psalm 136:1-26', context: 'Liturgical antiphonal refrain celebrating hesed across creation and redemption: "for his hesed endures forever."' },
      { passage: 'Hosea 2:19-20', context: 'Prophetic betrothal promise of God re-marrying unfaithful Israel in justice and steadfast love.' }
    ],
    ntFulfillment: [
      { passage: 'John 1:14, 17', christologicalFocus: 'The Word became flesh full of "grace and truth" (Greek: charis kai aletheia translating Hebrew hesed ve-emet).' },
      { passage: 'Romans 8:38-39', christologicalFocus: 'Nothing in creation can separate the believer from the love of God in Christ Jesus our Lord.' }
    ],
    synthesis: 'Hesed is the core gravitational pull of the Old Testament storyline. It is not merely emotional affection, but an enacted, binding covenant loyalty. When Israel turned away to false gods, Yahweh’s hesed pursued them into exile. In the New Testament, this covenant faithfulness takes on flesh in Jesus Christ, where divine hesed reaches its incandescent zenith at Golgotha: dying not for righteous friends, but for traitorous enemies to adopt them as sons.',
    suggestedQuestions: [
      'How does Hebrew Hesed translate into New Testament Greek theology?',
      'Why is Psalm 136 structured around recurring covenant mercy?',
      'How does Hosea’s marriage illustrate God’s relentless fidelity?'
    ]
  },
  {
    id: 'temple-presence',
    theme: 'Temple & Divine Presence (Shekinah → Incarnation → Church → New Jerusalem)',
    tagline: 'The dwelling place of God with man, moving from sanctuary tent to living stones and cosmic city.',
    originalTerms: [
      {
        term: 'מִשְׁכָּן',
        transliteration: 'Mishkan',
        language: 'Hebrew',
        meaning: 'Dwelling place / Tabernacle (from shakan: to settle, abide)',
        theologicalSignificance: 'The portable desert sanctuary manifesting God’s desire to pitch His tent in the camp of redeemed sinners.'
      },
      {
        term: 'ἐσκήνωσεν',
        transliteration: 'Eskēnōsen',
        language: 'Greek',
        meaning: 'Tabernacled / pitched tent',
        theologicalSignificance: 'John 1:14 deliberately uses this verb: the eternal Logos pitched His tent in human flesh among us.'
      },
      {
        term: 'שְׁכִינָה',
        transliteration: 'Shekinah',
        language: 'Hebrew',
        meaning: 'The visible radiance or cloud of the Divine Glory',
        theologicalSignificance: 'The cloud that filled Solomon’s temple and rested upon Christ on the Mount of Transfiguration.'
      }
    ],
    covenantArc: 'Garden of Eden (archetypal sanctuary) -> Wilderness Tabernacle -> Solomon’s Temple -> Second Temple -> Body of Jesus -> Indwelling Church -> New Jerusalem (no temple, for God and the Lamb are its temple).',
    otRoots: [
      { passage: 'Genesis 3:8', context: 'Yahweh walking (mithalek) in the garden in the cool of the day—the same verb used for God moving in the Tabernacle (Lev 26:12).' },
      { passage: 'Exodus 40:34-35', context: 'The cloud covers the tent of meeting and the glory of Yahweh fills the Mishkan.' },
      { passage: 'Ezekiel 10:18-19; 43:1-5', context: 'The painful departure of the Shekinah due to temple abominations, followed by the vision of its eschatological return.' }
    ],
    ntFulfillment: [
      { passage: 'John 2:19-21', christologicalFocus: 'Jesus identifies His own crucified and risen physical body as the true, indestructible Temple.' },
      { passage: '1 Corinthians 6:19', christologicalFocus: 'The believer’s body and the assembled ecclesia become the temple of the Holy Spirit.' },
      { passage: 'Revelation 21:22', christologicalFocus: 'In the New Jerusalem, no physical temple building exists because the Lord God Almighty and the Lamb are its temple.' }
    ],
    synthesis: 'The entire biblical canon is framed by Temple architecture. Eden was designed as the original temple-garden where heaven and earth overlapped. The Tabernacle and Jerusalem Temple were miniature architectural recapitulations of Eden with pomegranates, cherubim, and the Menorah resembling the tree of life. When Jesus arrived, He declared Himself greater than the Temple. At His death, the 60-foot veil separating humanity from the Holy of Holies tore from top to bottom. Today, the church is a holy temple built of living stones, culminating in Revelation 21 where the entire cosmos becomes the Holy of Holies (a perfect cube of 12,000 stadia).',
    suggestedQuestions: [
      'Why is the Garden of Eden understood as the first sanctuary?',
      'How does John 1:14 connect the Incarnation to the Tabernacle?',
      'Why is there no temple building in the New Jerusalem?'
    ]
  },
  {
    id: 'kinsman-redeemer-blood',
    theme: 'The Kinsman-Redeemer & Substitutionary Atonement (Goel & Kipper)',
    tagline: 'A near relative who pays the price of liberation, ransoming the enslaved and restoring the inheritance.',
    originalTerms: [
      {
        term: 'גֹּאֵל',
        transliteration: 'Goel',
        language: 'Hebrew',
        meaning: 'Kinsman-Redeemer, vindicator, defender of family rights',
        theologicalSignificance: 'Under Mosaic law, a redeemer had to be a near kinsman, possess the ransom price, and have the willingness to act (Leviticus 25; Ruth 3-4).'
      },
      {
        term: 'כִּפֶּר',
        transliteration: 'Kipper',
        language: 'Hebrew',
        meaning: 'To make atonement, cover, wipe clean, appease',
        theologicalSignificance: 'The Day of Atonement (Yom Kippur) ritual where blood cleansed the sanctuary and the scapegoat carried transgressions into the wilderness.'
      },
      {
        term: 'ἱλαστήριον',
        transliteration: 'Hilastērion',
        language: 'Greek',
        meaning: 'Propitiation, mercy seat, atoning sacrifice',
        theologicalSignificance: 'Romans 3:25 describes Christ as the true Hilasterion where God’s holy justice and redeeming mercy meet.'
      }
    ],
    covenantArc: 'Passover deliverance -> Levitical substitution -> Boaz redeeming Ruth -> Christ taking on human blood to become our near Kinsman and Lamb.',
    otRoots: [
      { passage: 'Leviticus 25:25, 47-49', context: 'The legal statutes governing the redemption of impoverished family property and enslaved kin by a near relative.' },
      { passage: 'Ruth 4:1-12', context: 'Boaz stepping forward before the city elders of Bethlehem to redeem Naomi’s land and wed Ruth the Moabite.' },
      { passage: 'Isaiah 53:5-6', context: 'Yahweh laying upon the innocent Servant the iniquity of us all as a penal substitute.' }
    ],
    ntFulfillment: [
      { passage: 'Hebrews 2:14-17', christologicalFocus: 'Because the children share in flesh and blood, He Himself likewise partook of the same, that He might be a merciful and faithful high priest.' },
      { passage: 'Titus 2:14', christologicalFocus: 'He gave Himself for us to redeem us from all lawlessness and purify for Himself a people for His own possession.' }
    ],
    synthesis: 'The theological genius of the Goel archetype is that God could not redeem humanity at a detached distance without becoming our brother. In the Incarnation, the second Person of the Trinity assumed true human flesh and blood, qualifying Him under the cosmic court of divine justice as our near Kinsman. Because He was sinless, He owed no debt of His own; because He was infinite God, the currency of His blood was of infinite purchasing power to redeem every nation, tribe, and tongue.',
    suggestedQuestions: [
      'What were the three biblical qualifications for a Kinsman-Redeemer?',
      'How does the Book of Ruth foreshadow gentile inclusion into Christ’s bride?',
      'How does Hebrews 2 explain why Jesus had to take on human blood?'
    ]
  },
  {
    id: 'kingdom-and-exile',
    theme: 'Exile, Restoration & The Kingdom of God (Malkuth → Basileia)',
    tagline: 'The drama of wandering in exile and the grand homecoming under the King of kings.',
    originalTerms: [
      {
        term: 'מַלְכוּת',
        transliteration: 'Malkuth',
        language: 'Hebrew',
        meaning: 'Reign, sovereignty, royal rule, kingdom',
        theologicalSignificance: 'The active exercise of Yahweh’s kingship over Zion and the nations (Psalm 145:11-13).'
      },
      {
        term: 'βασιλεία τοῦ θεοῦ',
        transliteration: 'Basileia tou Theou',
        language: 'Greek',
        meaning: 'Kingdom of God',
        theologicalSignificance: 'The core message of Jesus’ proclamation: the dynamic sovereign reign of God breaking into the present evil age (Mark 1:15).'
      },
      {
        term: 'שְׁבוּת',
        transliteration: 'Shevut',
        language: 'Hebrew',
        meaning: 'Restoration of fortunes, return from captivity',
        theologicalSignificance: 'The prophetic promise that God will gather His scattered flock from the four corners of the earth.'
      }
    ],
    covenantArc: 'Fall as cosmic exile from Eden -> Babylonian exile -> Post-exilic partial return -> Spiritual exile broken by Christ -> Consummated Kingdom.',
    otRoots: [
      { passage: 'Deuteronomy 30:1-6', context: 'Moses predicts exile for covenant infidelity, followed by Yahweh circumcising their hearts upon return.' },
      { passage: 'Jeremiah 29:10-14', context: 'The 70-year limit on Babylonian captivity and plans to give a future and a hope.' },
      { passage: 'Daniel 7:13-14', context: 'The Son of Man receiving an everlasting dominion that shall not pass away, overcoming beasts.' }
    ],
    ntFulfillment: [
      { passage: 'Mark 1:14-15', christologicalFocus: 'Jesus comes into Galilee announcing: "The time is fulfilled, and the kingdom of God is at hand; repent and believe the gospel."' },
      { passage: 'Colossians 1:13', christologicalFocus: 'He has delivered us from the domain of darkness and transferred us to the kingdom of His beloved Son.' },
      { passage: 'Revelation 11:15', christologicalFocus: 'The kingdom of the world has become the kingdom of our Lord and of His Christ, and He shall reign forever and ever.' }
    ],
    synthesis: 'Biblical history views the entire human condition after Genesis 3 as a state of cosmic exile. Even after the physical return from Babylon in 538 BC, prophets like Malachi and Daniel recognized that true spiritual exile persisted: the Shekinah glory had not visibly re-entered the Second Temple, and Israel remained under foreign pagan empires. Jesus announced the end of the true exile: the Kingdom of God has arrived not by sword or military chariot, but through the cross and empty tomb. The kingdom is "already" present spiritually in the hearts of believers, but "not yet" fully consummated until Christ returns in glory.',
    suggestedQuestions: [
      'Why is the Fall in Genesis 3 understood as the first exile?',
      'Why did Second Temple Jews feel they were still in spiritual exile?',
      'What does the "already and not yet" structure of the Kingdom mean?'
    ]
  }
];
