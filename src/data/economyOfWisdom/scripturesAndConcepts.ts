export interface WisdomScripturePassage {
  id: string;
  reference: string;
  theme: 'Organizing' | 'Formation Pattern' | 'Source' | 'Center' | 'Purpose' | 'Formation' | 'Expression' | 'Stewardship';
  translation: 'World English Bible (WEB — Public Domain)';
  exactText: string;
  contextNote: string;
  theologicalRelation: string;
  distinctionNote: string;
}

export interface ConceptualDefinition {
  id: string;
  term: string;
  shortDefinition: string;
  expandedExplanation: string;
  philosophicalOrTheologicalNote: string;
  relatedScriptures: string[];
}

export interface CoreDistinction {
  id: string;
  principle: string;
  explanation: string;
  safeguardWarning?: string;
  scenarioConnection: string;
}

export interface MotiveOption {
  id: string;
  name: string;
  category: 'Survival & Practical' | 'Social & Self-Protective' | 'Transcendent & Relational';
  description: string;
  questionsAsked: string[];
  evidenceNoticed: string;
  blindSpots: string;
  whenOrderedByLove: string;
}

export interface OrdinaryVocationCard {
  id: string;
  domain: string;
  title: string;
  ordinaryIntegrity: string;
  stewardshipAndNeighborLove: string;
  antiReductionismNote: string;
}

export interface KnowledgeMapNode {
  id: string;
  label: string;
  category: 'Epistemic Process' | 'Formative Anchor' | 'Discernment & Action';
  x: number;
  y: number;
  definition: string;
  example: string;
  roleDistinction: string;
  scriptureRefs: string[];
  scenarioLinks: string[];
}

export interface KnowledgeFeedbackLoop {
  id: string;
  title: string;
  summary: string;
  nodePath: string[];
  healthyDynamic: string;
  distortedDynamic: string;
  exampleInLife: string;
}

export const ORGANIZING_CONVICTION = {
  title: 'The Economy of Wisdom',
  subtitle: 'Knowing truth. Becoming wise. Growing in love.',
  centralQuestion: '“Is what I am learning teaching me to know God more deeply and love more faithfully?”',
  enduringQuestion: '“Is what I know becoming love in how I live?”',
  pillars: [
    { label: 'Source', statement: 'God is the source.' },
    { label: 'Center', statement: 'Christ is the center.' },
    { label: 'Formation', statement: 'The Holy Spirit forms and empowers.' },
    { label: 'Purpose', statement: 'Love is the purpose and fruit.' },
    { label: 'Direction', statement: 'God’s glory is the ultimate direction.' }
  ]
};

export const WISDOM_SCRIPTURES: WisdomScripturePassage[] = [
  // ORGANIZING PASSAGE & FORMATION PATTERN
  {
    id: 'phil-1-9-11',
    reference: 'Philippians 1:9–11',
    theme: 'Organizing',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      '9 This I pray, that your love may abound yet more and more in knowledge and all discernment, 10 so that you may approve the things that are excellent, that you may be sincere and blameless for the day of Christ, 11 being filled with the fruits of righteousness, which are through Jesus Christ, to the glory and praise of God.',
    contextNote:
      'Written by Paul from prison to the church at Philippi, opening his letter with thanksgiving and intercession for their maturation under pressure and partnership in the gospel.',
    theologicalRelation:
      'Serves as the architectural spine of this entire simulation: knowledge (epignōsis) and discernment (aisthēsis) are not ends in themselves, but the channels through which love abounds, enabling wise judgment and righteous fruit through Christ to God’s glory.',
    distinctionNote:
      'Exact text is from the WEB translation. The structural pairing of love → knowledge/discernment → testing what is excellent → righteous fruit is Paul’s explicit prayer.'
  },
  {
    id: 'phil-2-1-13',
    reference: 'Philippians 2:1–13',
    theme: 'Formation Pattern',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      '1 If therefore there is any exhortation in Christ, if any consolation of love, if any fellowship of the Spirit, if any tender mercies and compassion, 2 make my joy full by being like-minded, having the same love, being of one accord, of one mind; 3 doing nothing through rivalry or through conceit, but in humility, each counting others better than himself; 4 each of you not just looking to his own things, but each of you also to the things of others. 5 Have this in your mind, which was also in Christ Jesus, 6 who, existing in the form of God, didn’t consider equality with God a thing to be grasped, 7 but emptied himself, taking the form of a servant, being made in the likeness of men. 8 And being found in human form, he humbled himself, becoming obedient to death, yes, the death of the cross. 9 Therefore God also highly exalted him, and gave to him the name which is above every name, 10 that at the name of Jesus every knee should bow, of those in heaven, those on earth, and those under the earth, 11 and that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father. 12 So then, my beloved, even as you have always obeyed, not only in my presence, but now much more in my absence, work out your own salvation with fear and trembling. 13 For it is God who works in you both to will and to work, for his good pleasure.',
    contextNote:
      'Paul calls a community facing external opposition and internal friction to adopt the mindset (phroneō) of Christ, reciting the early Christian Christ-hymn (vv. 6–11).',
    theologicalRelation:
      'Establishes the pattern of Christian formation: rejecting rivalry and vain conceit, attending to the interests of others, being shaped by Christ’s self-emptying servant obedience, and relying on God who works within to shape both desire ("to will") and action ("to work").',
    distinctionNote:
      'Theological note: Counting others more significant (v. 3) describes posture of service and attentiveness, not surrendering truth, enabling mistreatment, or erasing moral agency.'
  },

  // SOURCE
  {
    id: 'prov-2-6',
    reference: 'Proverbs 2:6',
    theme: 'Source',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      'For Yahweh gives wisdom. Out of his mouth comes knowledge and understanding.',
    contextNote:
      'Part of a father’s wisdom poem (Proverbs 2:1–22) urging diligent search for wisdom while grounding its ultimate origin in God’s gift.',
    theologicalRelation:
      'Human inquiry and study matter (Proverbs 2:1–5), yet wisdom is never merely human cleverness—God Himself is its fountainhead.',
    distinctionNote:
      'WEB renders the Tetragrammaton (YHWH) as "Yahweh".'
  },
  {
    id: 'prov-9-10',
    reference: 'Proverbs 9:10',
    theme: 'Source',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      'The fear of Yahweh is the beginning of wisdom. The knowledge of the Holy One is understanding.',
    contextNote:
      'Concludes the opening nine chapters of Proverbs at the crossroads between Lady Wisdom’s feast and Folly’s counterfeit invitation.',
    theologicalRelation:
      'Reverence, awe, and right posture before God form the starting point and governing principle ("beginning" / reshith) of true wisdom.',
    distinctionNote:
      '"Fear of Yahweh" in Hebrew wisdom literature denotes reverent awe, worshipful trust, and moral accountability before the Creator, not cringing terror.'
  },
  {
    id: 'jas-1-5',
    reference: 'James 1:5',
    theme: 'Source',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      'But if any of you lacks wisdom, let him ask of God, who gives to all liberally and without reproach, and it will be given to him.',
    contextNote:
      'Addressed to scattered believers enduring trials that test their endurance and judgment (James 1:2–8).',
    theologicalRelation:
      'Invites believers who recognize the limits of their perspective to ask God in prayer—anchored in God’s generous, non-scolding character.',
    distinctionNote:
      'In this simulation, prayer is modeled as humble dependence and motive-alignment before God, not a mechanical button that unlocks secret scenario data.'
  },

  // CENTER
  {
    id: 'col-2-2-3',
    reference: 'Colossians 2:2–3',
    theme: 'Center',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      '2 that their hearts may be comforted, they being knit together in love, and gaining all riches of the full assurance of understanding, that they may know the mystery of God, both of the Father and of Christ, 3 in whom all the treasures of wisdom and knowledge are hidden.',
    contextNote:
      'Paul writes to counter speculative philosophies in Colossae by pointing to the sufficiency and supremacy of Christ.',
    theologicalRelation:
      'Wisdom is not an impersonal system; all treasures of wisdom and knowledge are centered in the person of Jesus Christ and accessed by communities knit together in love.',
    distinctionNote:
      '"Hidden" (apokryphos) here means stored up as a rich treasury in Christ, revealed through the gospel rather than locked away for an esoteric elite.'
  },
  {
    id: 'john-17-3',
    reference: 'John 17:3',
    theme: 'Center',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      'This is eternal life, that they should know you, the only true God, and him whom you sent, Jesus Christ.',
    contextNote:
      'Spoken by Jesus in His High Priestly Prayer on the night before His crucifixion.',
    theologicalRelation:
      'Defines the highest end of human knowing: relational, covenantal communion with the Father and the Son, not mere propositional accumulation.',
    distinctionNote:
      'Biblical "knowing" (ginōskō / yada) encompasses personal trust, fellowship, love, and allegiance alongside truth.'
  },
  {
    id: 'john-15-1-12',
    reference: 'John 15:1–12',
    theme: 'Center',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      '1 “I am the true vine, and my Father is the farmer. ... 4 Remain in me, and I in you. As the branch can’t bear fruit by itself unless it remains in the vine, so neither can you, unless you remain in me. 5 I am the vine. You are the branches. He who remains in me and I in him bears much fruit, for apart from me you can do nothing. ... 8 In this my Father is glorified, that you bear much fruit; and so you will be my disciples. 9 Even as the Father has loved me, I also have loved you. Remain in my love. 10 If you keep my commandments, you will remain in my love; even as I have kept my Father’s commandments, and remain in his love. 11 I have spoken these things to you, that my joy may remain in you, and that your joy may be made full. 12 This is my commandment, that you love one another, even as I have loved you.”',
    contextNote:
      'Jesus’ farewell discourse in the Upper Room, using the organic imagery of vine and branches.',
    theologicalRelation:
      'Grounds our visual tree/vine teaching metaphor: fruit is borne not by frantic self-manufacture, but by abiding in Christ’s love and walking in obedience.',
    distinctionNote:
      'Verses 1, 4–5, and 8–12 are quoted verbatim from WEB; ellipsis marks omitted intermediate verses (vv. 2–3, 6–7) for focused reading.'
  },

  // PURPOSE
  {
    id: 'matt-22-37-40',
    reference: 'Matthew 22:37–40',
    theme: 'Purpose',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      '37 Jesus said to him, “‘You shall love the Lord your God with all your heart, with all your soul, and with all your mind.’ 38 This is the first and great commandment. 39 A second likewise is this, ‘You shall love your neighbor as yourself.’ 40 The whole law and the prophets depend on these two commandments.”',
    contextNote:
      'Jesus answers a scribe testing Him in the Jerusalem Temple by uniting Deuteronomy 6:5 and Leviticus 19:18.',
    theologicalRelation:
      'Explicitly commands loving God "with all your mind" (dianoia) and loving neighbor as oneself—establishing love as the telos of all biblical instruction.',
    distinctionNote:
      'Loving God with the mind integrates rigorous intellectual honesty with devotion and neighbor-care.'
  },
  {
    id: '1cor-8-1-3',
    reference: '1 Corinthians 8:1–3',
    theme: 'Purpose',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      '1 Now concerning things sacrificed to idols: We know that we all have knowledge. Knowledge puffs up, but love builds up. 2 But if anyone thinks that he knows anything, he doesn’t yet know as he ought to know. 3 But anyone who loves God is known by him.',
    contextNote:
      'Paul addresses Christians in Corinth who possessed correct doctrinal facts (that idols have no real divine existence) but used that knowledge callously in ways that wounded vulnerable brothers and sisters.',
    theologicalRelation:
      'Illustrates a core distinction of this simulation: factually accurate knowledge, divorced from love, inflates pride and harms others; true knowing is humble and edificatory.',
    distinctionNote:
      'Paul does not reject knowledge; he critiques autonomous, loveless knowledge that ignores its impact on neighbors.'
  },
  {
    id: '1cor-13-1-7',
    reference: '1 Corinthians 13:1–7',
    theme: 'Purpose',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      '1 If I speak with the languages of men and of angels, but don’t have love, I have become sounding brass, or a clanging cymbal. 2 If I have the gift of prophecy, and know all mysteries and all knowledge; and if I have all faith, so as to remove mountains, but don’t have love, I am nothing. 3 If I give away all my goods to feed the poor, and if I give my body to be burned, but don’t have love, it profits me nothing. 4 Love is patient and is kind. Love doesn’t envy. Love doesn’t brag, is not proud, 5 doesn’t behave itself inappropriately, doesn’t seek its own way, is not provoked, takes no account of evil; 6 doesn’t rejoice in unrighteousness, but rejoices with the truth; 7 bears all things, believes all things, hopes all things, endures all things.',
    contextNote:
      'Placed at the center of Paul’s discussion of spiritual gifts and community life (1 Corinthians 12–14).',
    theologicalRelation:
      'Shows that even total knowledge ("know all mysteries and all knowledge") and dramatic sacrifice are empty without love—and that genuine love "rejoices with the truth" (v. 6), never trading truth away for sentimental enabling.',
    distinctionNote:
      'Note on v. 7 ("bears all things, believes all things"): in context with v. 6 ("doesn’t rejoice in unrighteousness, but rejoices with the truth"), this describes steadfast hope and refusal of cynicism, NOT gullibility or tolerating abuse.'
  },
  {
    id: '1john-4-7-12-19',
    reference: '1 John 4:7–12, 19',
    theme: 'Purpose',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      '7 Beloved, let’s love one another, for love is of God; and everyone who loves has been born of God, and knows God. 8 He who doesn’t love doesn’t know God, for God is love. 9 By this God’s love was revealed in us, that God has sent his only born Son into the world that we might live through him. 10 In this is love, not that we loved God, but that he loved us, and sent his Son as the atoning sacrifice for our sins. 11 Beloved, if God loved us in this way, we also ought to love one another. 12 No one has seen God at any time. If we love one another, God remains in us, and his love has been perfected in us. ... 19 We love him, because he first loved us.',
    contextNote:
      'John’s pastoral epistle countering loveless secessionists who claimed superior spiritual knowledge while neglecting brotherly love.',
    theologicalRelation:
      'Ties "knowing God" directly to loving others, while grounding all human love as a grateful response to God’s prior, initiating grace ("because he first loved us").',
    distinctionNote:
      'Prevents turning love into a Pelagian self-achievement score: grace precedes and empowers our response.'
  },

  // FORMATION
  {
    id: 'rom-12-1-2',
    reference: 'Romans 12:1–2',
    theme: 'Formation',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      '1 Therefore I urge you, brothers, by the mercies of God, to present your bodies a living sacrifice, holy, acceptable to God, which is your spiritual service. 2 Don’t be conformed to this world, but be transformed by the renewing of your mind, so that you may prove what is the good, well-pleasing, and perfect will of God.',
    contextNote:
      'The great transition in Romans from eleven chapters of expounding God’s redemptive mercies to practical ethical discernment.',
    theologicalRelation:
      'Shows that moral discernment ("proving what is good, well-pleasing, and perfect") flows from the ongoing renewal of the mind in response to God’s mercies.',
    distinctionNote:
      '"Spiritual service" (logikēn latreian) can also be rendered "reasonable/rational worship," engaging the whole thinking and acting person.'
  },
  {
    id: 'gal-5-22-23',
    reference: 'Galatians 5:22–23',
    theme: 'Formation',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      '22 But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, 23 gentleness, and self-control. Against such things there is no law.',
    contextNote:
      'Paul contrasts the destructive works of the flesh with the organic harvest produced by the Holy Spirit in believers walking by the Spirit.',
    theologicalRelation:
      'Defines the character traits that shape how a wise person investigates, speaks, waits, corrects, and acts.',
    distinctionNote:
      '"Fruit" (karpos) is singular in Greek, indicating a unified character formed by the Spirit rather than isolated badges.'
  },

  // EXPRESSION
  {
    id: 'jas-3-13-18',
    reference: 'James 3:13–18',
    theme: 'Expression',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      '13 Who is wise and understanding among you? Let him show by his good conduct that his deeds are done in gentleness of wisdom. 14 But if you have bitter jealousy and selfish ambition in your heart, don’t boast and don’t lie against the truth. 15 This wisdom is not that which comes down from above, but is earthly, sensual, demonic. 16 For where jealousy and selfish ambition are, there is confusion and every evil deed. 17 But the wisdom that is from above is first pure, then peaceful, gentle, reasonable, full of mercy and good fruits, without partiality, and without hypocrisy. 18 Now the fruit of righteousness is sown in peace by those who make peace.',
    contextNote:
      'James addresses teachers and aspiring leaders in the congregation who equated wisdom with sharp rhetoric and partisan dominance.',
    theologicalRelation:
      'Provides the diagnostic touchstone for wisdom in action: wisdom from above is pure, peaceable, gentle, open to reason (eupeithēs), impartial, and sincere.',
    distinctionNote:
      '"Reasonable" (eupeithēs) means willing to yield to reason, approachable, and open to persuasion when presented with truth.'
  },
  {
    id: '1john-3-16-18',
    reference: '1 John 3:16–18',
    theme: 'Expression',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      '16 By this we know love, because he laid down his life for us. And we ought to lay down our lives for the brothers. 17 But whoever has the world’s goods, and sees his brother in need, and closes his heart of compassion against him, how does the love of God remain in him? 18 My little children, let’s not love in word only, neither with the tongue only, but in deed and truth.',
    contextNote:
      'John moves from the supreme cross-shaped definition of love to the everyday test of material generosity and practical care.',
    theologicalRelation:
      'Anchors the Economy of Wisdom: resources, attention, and material goods are stewards’ tools to meet real human needs "in deed and truth."',
    distinctionNote:
      'Connects directly to Scenario 3 (The Person in Need) and Area 4 (The Economy).'
  },
  {
    id: 'eph-4-15',
    reference: 'Ephesians 4:15',
    theme: 'Expression',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      'but speaking truth in love, we may grow up in all things into him who is the head, Christ,',
    contextNote:
      'Part of Paul’s vision of the church maturing beyond gullibility and deceitful scheming (Ephesians 4:11–16).',
    theologicalRelation:
      'Refuses the false dichotomy between "harsh truth" and "dishonest niceness." Christian maturity holds truth and love together in speech and action.',
    distinctionNote:
      'In Greek (alētheuontes en agapē), the participle encompasses "truthing in love"—living and speaking truthfully within the sphere of love.'
  },

  // STEWARDSHIP
  {
    id: 'eph-5-15-17',
    reference: 'Ephesians 5:15–17',
    theme: 'Stewardship',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      '15 Therefore watch carefully how you walk, not as unwise, but as wise, 16 redeeming the time, because the days are evil. 17 Therefore don’t be foolish, but understand what the will of the Lord is.',
    contextNote:
      'Paul exhorts believers to wakeful, intentional living amid surrounding moral drift.',
    theologicalRelation:
      'Time and attention are finite gifts; walking wisely requires attentiveness ("watch carefully") and making the most of every opportunity ("redeeming the time" / kairos).',
    distinctionNote:
      '"Redeeming the time" uses marketplace stewardship imagery (exagorazomenoi ton kairon) as a metaphor for wise attentiveness.'
  },
  {
    id: '1pet-4-10',
    reference: '1 Peter 4:10',
    theme: 'Stewardship',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      'As each has received a gift, employ it in serving one another, as good stewards of the grace of God in its various forms.',
    contextNote:
      'Peter encourages suffering Christians in Asia Minor to practice mutual hospitality and faithful service.',
    theologicalRelation:
      'Introduces the biblical root of our metaphor: believers are "stewards" (oikonomoi — household managers, from which "economy" derives) of God’s varied grace for the good of others.',
    distinctionNote:
      'Clarifies why "Economy of Wisdom" is an organizing metaphor of stewardship (oikonomia), not a financial or mechanical transaction.'
  },
  {
    id: 'mark-8-36',
    reference: 'Mark 8:36',
    theme: 'Stewardship',
    translation: 'World English Bible (WEB — Public Domain)',
    exactText:
      'For what does it profit a man to gain the whole world, and forfeit his life?',
    contextNote:
      'Spoken by Jesus at Caesarea Philippi immediately after predicting His passion and calling disciples to take up their cross.',
    theologicalRelation:
      'Upends worldly cost-benefit calculations: career advancement, applause, or institutional power that compromises integrity and neighbor-love is a catastrophic loss.',
    distinctionNote:
      '"Life" (psychē) encompasses the whole person/soul before God.'
  }
];

export const CONCEPTUAL_DEFINITIONS: ConceptualDefinition[] = [
  {
    id: 'def-information',
    term: 'Information',
    shortDefinition: 'Claims, observations, and representations that may be true, false, incomplete, or misleading.',
    expandedExplanation:
      'Information is raw input—reports, messages, data points, rumors, or sensory impressions. Having more information does not guarantee clarity; unverified or out-of-context information can easily distort judgment.',
    philosophicalOrTheologicalNote:
      'In an age of constant notifications, mistaking high information volume for understanding is a primary barrier to wisdom.',
    relatedScriptures: ['Proverbs 18:13', 'Ephesians 4:14–15']
  },
  {
    id: 'def-belief',
    term: 'Belief',
    shortDefinition: 'What a person accepts as true, with varying degrees of confidence.',
    expandedExplanation:
      'A belief is a mental assent or conviction that something is the case. People can hold beliefs with high emotional certainty even when their evidence is thin, or hold true beliefs tentatively while seeking confirmation.',
    philosophicalOrTheologicalNote:
      'Confidence and accuracy can move in opposite directions. Subjective certainty is not proof of truth.',
    relatedScriptures: ['1 Corinthians 8:2', 'James 1:19']
  },
  {
    id: 'def-knowledge',
    term: 'Knowledge',
    shortDefinition: 'Truth understood with adequate grounds.',
    expandedExplanation:
      'To know something is more than guessing luckily or repeating a rumor: the claim must actually be true, and the knower must have sound reasons, reliable testimony, or appropriate evidence for holding it.',
    philosophicalOrTheologicalNote:
      'Philosophical note: The exact necessary and sufficient conditions of propositional knowledge (such as classical "justified true belief" and responses to Gettier cases, reliability, and epistemic virtues) remain actively debated in epistemology.',
    relatedScriptures: ['Proverbs 2:6', '1 Corinthians 8:1–3']
  },
  {
    id: 'def-understanding',
    term: 'Understanding',
    shortDefinition: 'Grasping meaning, relationships, causes, context, and significance.',
    expandedExplanation:
      'While isolated knowledge might register a single fact ("Elena missed rent"), understanding perceives how parts fit together—the underlying causes, pressures, historical background, and human meaning.',
    philosophicalOrTheologicalNote:
      'In Hebrew wisdom literature (binah / tevunah), understanding involves seeing between things—perceiving structure, context, and weight.',
    relatedScriptures: ['Proverbs 9:10', 'Colossians 2:2']
  },
  {
    id: 'def-discernment',
    term: 'Discernment',
    shortDefinition: 'Judging what is true, what matters, and what a situation requires.',
    expandedExplanation:
      'Discernment (aisthēsis / diakrisis) is trained moral and spiritual perception: sifting signal from noise, distinguishing primary obligations from secondary distractions, and recognizing what is fitting in a concrete moment.',
    philosophicalOrTheologicalNote:
      'Philippians 1:9–10 pairs knowledge with "all discernment" so that believers may test and approve what is genuinely excellent.',
    relatedScriptures: ['Philippians 1:9–10', 'Romans 12:2']
  },
  {
    id: 'def-wisdom',
    term: 'Wisdom',
    shortDefinition: 'Sound judgment and faithful living shaped by truth, reverence for God, the mind of Christ, love, and experience.',
    expandedExplanation:
      'Wisdom (chokmah / sophia) integrates truth and character into right action. It knows not only what is true in the abstract, but how to act, speak, wait, or set boundaries faithfully in complex, real-world conditions.',
    philosophicalOrTheologicalNote:
      'Biblical wisdom begins in reverence for God (Proverbs 9:10), is centered in Christ (Colossians 2:3), and is recognizable by its gentle, peaceable, merciful fruit (James 3:17).',
    relatedScriptures: ['Proverbs 9:10', 'James 3:13–18', 'Colossians 2:3']
  },
  {
    id: 'def-love',
    term: 'Love',
    shortDefinition: 'Seeking another person’s good in truth, expressed through appropriate care, patience, generosity, honesty, courage, correction, and service.',
    expandedExplanation:
      'Biblical love (agapē / hesed) is not mere warm sentiment or conflict avoidance. Because it wills the authentic good of the other before God, love listens carefully, gives sacrificially, speaks truthfully, protects the vulnerable, and upholds accountability.',
    philosophicalOrTheologicalNote:
      'Safeguard: Love rejoices with the truth (1 Corinthians 13:6); love never means enabling harm, covering up abuse, or abandoning justice.',
    relatedScriptures: ['1 Corinthians 13:1–7', 'Matthew 22:37–40', '1 John 3:16–18']
  },
  {
    id: 'def-knowing-god',
    term: 'Knowing God',
    shortDefinition: 'Relational knowledge involving trust, communion, love, and obedience.',
    expandedExplanation:
      'Knowing God is fundamentally different from cataloging facts about an object. It is personal covenant fellowship—receiving God’s self-revelation in Christ, trusting His character, abiding in His love, and walking in His ways.',
    philosophicalOrTheologicalNote:
      'As John 17:3 and 1 John 4:7–8 teach, one can possess extensive theological information while remaining relationally distant if love and reverence are absent.',
    relatedScriptures: ['John 17:3', '1 John 4:7–12', 'John 15:4–12']
  },
  {
    id: 'def-economy-of-wisdom',
    term: 'The Economy of Wisdom',
    shortDefinition: 'The stewardship of attention, time, abilities, opportunities, resources, and understanding in service to God and neighbor.',
    expandedExplanation:
      'Every human being lives within finite limits of time, attention, energy, and material means. How we allocate what we notice, what we verify, whom we listen to, and how we spend our abilities is a matter of stewardship.',
    philosophicalOrTheologicalNote:
      'IMPORTANT METAPHOR NOTE: "Economy of wisdom" is this application’s organizing metaphor (drawn from the Greek oikonomia, "household stewardship," as in 1 Peter 4:10). It is NOT a biblical technical term, nor is it a measurable spiritual law or transactional scoring system.',
    relatedScriptures: ['1 Peter 4:10', 'Ephesians 5:15–17', 'Mark 8:36']
  }
];

export const CORE_DISTINCTIONS: CoreDistinction[] = [
  {
    id: 'dist-1',
    principle: 'Information accumulation does not automatically produce wisdom.',
    explanation:
      'Collecting more data, articles, or arguments can coexist with foolishness, impatience, or pride unless truth is digested through reflection, humility, and love.',
    scenarioConnection: 'Tested across all five scenarios when raw reports must be weighed rather than merely stockpiled.'
  },
  {
    id: 'dist-2',
    principle: 'Confidence and accuracy can move in different directions.',
    explanation:
      'A person can feel 100% certain of an assumption that is completely false, or feel appropriately cautious about a complex truth.',
    scenarioConnection: 'Central in "The Rumor" and "The Challenged Conviction."'
  },
  {
    id: 'dist-3',
    principle: 'True knowledge can be used for selfish or destructive purposes.',
    explanation:
      'Even factually accurate information can be weaponized to humiliate a rival, gain leverage, or shift burdens onto the vulnerable.',
    scenarioConnection: 'Explored in "The Rumor" and "The Opportunity."'
  },
  {
    id: 'dist-4',
    principle: 'Loving intentions still require accurate understanding.',
    explanation:
      'Warm feelings without careful listening and verification can lead to paternalistic interventions that miss what a neighbor actually needs.',
    scenarioConnection: 'Central in "The Person in Need" and Philippians 1:9.'
  },
  {
    id: 'dist-5',
    principle: 'Wisdom may call for action, further inquiry, silence, correction, boundaries, patient waiting, or admitting uncertainty.',
    explanation:
      'There is no single mechanical rule ("always act immediately" or "always stay silent"). Discernment reads what the concrete situation requires.',
    scenarioConnection: 'Tested in branching choices across all five Crossroads scenarios.'
  },
  {
    id: 'dist-6',
    principle: 'Love includes truth, justice, accountability, and protection.',
    explanation:
      'When harm or wrongdoing is present, protecting the vulnerable and pursuing fair accountability is an act of love, not a failure of grace.',
    safeguardWarning: 'Never equate love with enabling harm or sweeping wrongdoing under the rug.',
    scenarioConnection: 'Explored in "The Rumor" and "The Person in Need."'
  },
  {
    id: 'dist-7',
    principle: 'Humility allows a person to receive correction without surrendering responsible judgment.',
    explanation:
      'Biblical humility is teachable and free from ego-defensiveness, yet it remains anchored in truth and moral responsibility.',
    safeguardWarning: 'Never equate humility with accepting abuse, manipulation, or dehumanizing treatment.',
    scenarioConnection: 'Explored in "The Challenged Conviction" and "The Opportunity."'
  },
  {
    id: 'dist-8',
    principle: 'Faithful choices can be costly and have painful outcomes.',
    explanation:
      'Doing what is truthful and loving may cost a promotion, invite misunderstanding, or require difficult repair. Painful consequences are not proof that a choice was unfaithful.',
    safeguardWarning: 'Never equate suffering or external difficulty with evidence of spiritual failure.',
    scenarioConnection: 'Reflected in the outcome evaluations of "The Opportunity" and "The Challenged Conviction."'
  },
  {
    id: 'dist-9',
    principle: 'Immediate success does not establish moral goodness.',
    explanation:
      'A shortcut, cover-up, or exploitative workflow may produce impressive short-term metrics while eroding trust and harming neighbors.',
    scenarioConnection: 'Central in "The Opportunity" and "The Unseen Service."'
  },
  {
    id: 'dist-10',
    principle: 'Grace is God’s gift; spiritual growth is not a transaction.',
    explanation:
      'We do not earn God’s love or manipulate divine favor by accumulating "wisdom points." We love and seek wisdom because God first loved us.',
    scenarioConnection: 'Why this simulation refuses numerical holiness, salvation, or wisdom scores.'
  },
  {
    id: 'dist-11',
    principle: 'Human knowledge remains partial and open to correction.',
    explanation:
      'In this life we see and know in part (1 Corinthians 13:9, 12). Recognizing what remains uncertain is a mark of mature wisdom.',
    scenarioConnection: 'Embedded in the Interpret stage and Reflection protocol of every scenario.'
  }
];

export const MOTIVE_OPTIONS: MotiveOption[] = [
  {
    id: 'mot-wonder',
    name: 'Wonder & Delight',
    category: 'Transcendent & Relational',
    description: 'Beholding the beauty, intricacy, and order of creation, human life, and God’s character.',
    questionsAsked: ['How does this work?', 'What makes this so intricate and fitting?', 'What does this reveal about reality?'],
    evidenceNoticed: 'Patterns, subtle details, unexpected harmonies, and anomalies that invite deeper contemplation.',
    blindSpots: 'Can remain detached or aesthetic if it never moves from admiring complexity to caring for suffering neighbors.',
    whenOrderedByLove: 'Cultivates grateful worship of the Creator and patient, attentive respect for the world He made.'
  },
  {
    id: 'mot-survival',
    name: 'Survival & Practical Necessity',
    category: 'Survival & Practical',
    description: 'Learning what is required to sustain life, health, shelter, and daily work.',
    questionsAsked: ['Is this safe?', 'What will solve this immediate problem?', 'How do we secure food, shelter, or repair?'],
    evidenceNoticed: 'Immediate physical causes, urgent risks, and actionable remedies.',
    blindSpots: 'Under chronic stress, urgency can narrow vision to the next hour and crowd out long-term consequences.',
    whenOrderedByLove: 'Honors the embodied life God gave us and equips practical competence to sustain families and communities.'
  },
  {
    id: 'mot-security',
    name: 'Security & Risk Avoidance',
    category: 'Survival & Practical',
    description: 'Seeking predictability and protection from surprise, loss, or vulnerability.',
    questionsAsked: ['What could go wrong?', 'How can I protect myself or my group from liability?'],
    evidenceNoticed: 'Threats, inconsistencies, legal or reputational exposures.',
    blindSpots: 'Can harden into self-protective defensiveness that refuses costly hospitality or honest admission of fault.',
    whenOrderedByLove: 'Transformed into wise prudence and protective care for the vulnerable rather than institutional self-preservation.'
  },
  {
    id: 'mot-belonging',
    name: 'Belonging & Group Loyalty',
    category: 'Social & Self-Protective',
    description: 'Learning the shared language and convictions that bind a community or peer group together.',
    questionsAsked: ['What do the people I trust believe about this?', 'Will questioning this alienate me from my community?'],
    evidenceNoticed: 'Evidence that confirms in-group consensus and highlights out-group flaws.',
    blindSpots: 'High vulnerability to groupthink, echo chambers, and silencing uncomfortable truths to keep superficial peace.',
    whenOrderedByLove: 'Tempered by Ephesians 4:15: loving a community enough to seek truth together rather than flattering shared prejudices.'
  },
  {
    id: 'mot-mastery',
    name: 'Competence & Craft Mastery',
    category: 'Survival & Practical',
    description: 'Developing deep skill, precision, and excellence in a discipline, trade, art, or profession.',
    questionsAsked: ['How can this be done more accurately and reliably?', 'Where are the flaws in my current method?'],
    evidenceNoticed: 'Technical feedback, edge cases, structural tolerances, and craft standards.',
    blindSpots: 'Can slip into technocratic pride that looks down on novices or treats human problems as purely mechanical puzzles.',
    whenOrderedByLove: 'Offers high-integrity work—bridges that hold, diagnoses that heal, teaching that clarifies—as concrete neighbor-love.'
  },
  {
    id: 'mot-recognition',
    name: 'Recognition & Status',
    category: 'Social & Self-Protective',
    description: 'Desiring to be seen as smart, insightful, credentialed, or authoritative.',
    questionsAsked: ['What insight will sound impressive?', 'Who will credit me for this discovery?'],
    evidenceNoticed: 'Novel talking points, rhetorical ammunition, and visible achievements.',
    blindSpots: 'Puffs up pride (1 Cor 8:1), resists correction when wrong in public, and neglects unglamorous homework.',
    whenOrderedByLove: 'Surrendered to Christ’s humility (Phil 2:3), freeing a person to value legitimate encouragement without depending on applause.'
  },
  {
    id: 'mot-control',
    name: 'Control & Leverage',
    category: 'Social & Self-Protective',
    description: 'Acquiring information to gain the upper hand over circumstances or other people.',
    questionsAsked: ['What do I have on them?', 'How can I use this information to force the outcome I want?'],
    evidenceNoticed: 'Other people’s weaknesses, secrets, and leverage points.',
    blindSpots: 'Treats people as instruments rather than image-bearers; breeds suspicion and manipulation.',
    whenOrderedByLove: 'Repented of and replaced by transparent stewardship, consent, and shared accountability.'
  },
  {
    id: 'mot-service',
    name: 'Service & Stewardship',
    category: 'Transcendent & Relational',
    description: 'Seeking understanding in order to solve real problems and shoulder responsibilities for others.',
    questionsAsked: ['What is actually needed here?', 'How can our resources and skills best help?'],
    evidenceNoticed: 'Practical bottlenecks, unvoiced burdens, and second-order effects on neighbors.',
    blindSpots: 'Can drift into fixer-activism or burnout if it forgets to listen first or abide in God’s strength.',
    whenOrderedByLove: 'Produces durable, humble, attentive care that respects the dignity and agency of those served.'
  },
  {
    id: 'mot-love',
    name: 'Love for Neighbor',
    category: 'Transcendent & Relational',
    description: 'Wanting to understand another person’s reality accurately so you can care for them faithfully.',
    questionsAsked: ['What is this person experiencing?', 'What am I assuming that I have not asked?', 'What serves their true good?'],
    evidenceNoticed: 'Human testimony, emotional and material realities, and overlooked perspectives.',
    blindSpots: 'If detached from truth and discernment, affectionate sympathy can be misled by incomplete stories.',
    whenOrderedByLove: 'Abounds in knowledge and all discernment (Phil 1:9), uniting deep empathy with truthful clarity.'
  },
  {
    id: 'mot-communion',
    name: 'Communion with God',
    category: 'Transcendent & Relational',
    description: 'Seeking to know God Himself—His character, His ways, His works, and His heart.',
    questionsAsked: ['Lord, what is true?', 'How does this reflect Your justice, mercy, and wisdom?', 'How are You forming me to love?'],
    evidenceNoticed: 'Both scriptural truth and honest empirical reality, received with reverence and teachability.',
    blindSpots: 'Can be counterfeited by pious jargon if someone claims spiritual shortcuts instead of doing honest study and listening.',
    whenOrderedByLove: 'Anchors all learning in reverence (Prov 9:10) and directs every form of understanding toward love and God’s glory.'
  }
];

export const ORDINARY_VOCATIONS: OrdinaryVocationCard[] = [
  {
    id: 'voc-science',
    domain: 'Empirical Science & Research',
    title: 'Observing the Created Order with Integrity',
    ordinaryIntegrity:
      'Studying soil chemistry, epidemiology, or astrophysics requires rigorous empirical methods, controlled testing, peer review, and statistical honesty.',
    stewardshipAndNeighborLove:
      'Accurate scientific understanding prevents crop failure, halts disease transmission, and stewards ecosystems that vulnerable communities depend upon.',
    antiReductionismNote:
      'A chemist testing water purity does not need to turn every titration into a sermon illustration; doing honest, accurate laboratory work for the public good is already a faithful exercise of stewardship.'
  },
  {
    id: 'voc-craft',
    domain: 'Craftsmanship, Engineering & Trade',
    title: 'Building Things That Hold and Serve',
    ordinaryIntegrity:
      'Carpentry, structural engineering, software architecture, and electrical work rely on material tolerances, physical laws, and disciplined skill.',
    stewardshipAndNeighborLove:
      'A well-built roof that does not leak and a brake system that does not fail protect human life and honor neighbors through dependable craft.',
    antiReductionismNote:
      'Competence matters morally: pious intentions cannot substitute for checking load-bearing calculations.'
  },
  {
    id: 'voc-care',
    domain: 'Clinical Care, Counseling & Education',
    title: 'Attending to Embodied Human Reality',
    ordinaryIntegrity:
      'Requires patient observation, developmental understanding, diagnostic accuracy, and listening to the particular person in front of you.',
    stewardshipAndNeighborLove:
      'Combines technical knowledge with patience and respect for human dignity, refusing to reduce patients or students to diagnostic labels.',
    antiReductionismNote:
      'Prayer and medical/educational skill are partners, not rivals; asking God for wisdom goes hand in hand with careful clinical assessment.'
  },
  {
    id: 'voc-civic',
    domain: 'Administration, Accounting & Household Economy',
    title: 'Fairness, Clarity, and Trustworthy Records',
    ordinaryIntegrity:
      'Auditing ledgers, scheduling work shifts, and managing budgets require arithmetic accuracy, clear documentation, and realistic forecasting.',
    stewardshipAndNeighborLove:
      'Honest accounting protects charities from scandal, ensures workers are paid fairly, and keeps promises reliable.',
    antiReductionismNote:
      'Small administrative faithfulness often protects neighbors more effectively than grand public speeches.'
  }
];

export const KNOWLEDGE_MAP_NODES: KnowledgeMapNode[] = [
  // Epistemic Process
  {
    id: 'node-attention',
    label: 'Attention',
    category: 'Epistemic Process',
    x: 80,
    y: 190,
    definition: 'Where we direct our finite mental focus and what we allow to claim our notice.',
    example: 'Choosing to put away a glowing phone to listen undistractedly to a colleague’s concern.',
    roleDistinction: 'Gatekeeper of all learning: we cannot observe or understand what we refuse to attend to.',
    scriptureRefs: ['Ephesians 5:15–16', 'Philippians 2:4'],
    scenarioLinks: ['The Person in Need', 'The Opportunity']
  },
  {
    id: 'node-observation',
    label: 'Observation',
    category: 'Epistemic Process',
    x: 210,
    y: 120,
    definition: 'Direct noticing of events, behaviors, physical evidence, and context.',
    example: 'Checking the actual bank ledger and receipts rather than relying on a summary rumor.',
    roleDistinction: 'Empirical claims require suitable observation and verification, not guesswork.',
    scriptureRefs: ['Proverbs 18:13'],
    scenarioLinks: ['The Rumor', 'The Challenged Conviction']
  },
  {
    id: 'node-testimony',
    label: 'Testimony',
    category: 'Epistemic Process',
    x: 210,
    y: 260,
    definition: 'Receiving knowledge from the reports, witness, and lived experience of others.',
    example: 'Listening directly to the warehouse workers affected by a proposed schedule change.',
    roleDistinction: 'Most human knowledge depends on testimony; wisdom weighs a witness’s reliability, vantage point, and motives.',
    scriptureRefs: ['James 1:19', 'Proverbs 18:17'],
    scenarioLinks: ['The Rumor', 'The Opportunity', 'The Person in Need']
  },
  {
    id: 'node-study',
    label: 'Study',
    category: 'Epistemic Process',
    x: 350,
    y: 120,
    definition: 'Disciplined investigation of texts, history, data, and primary sources.',
    example: 'Reading an entire historical document or biblical chapter in context rather than a clipped quote.',
    roleDistinction: 'Honors truth by doing the patient work of checking context and methodology.',
    scriptureRefs: ['Proverbs 2:1–6', 'Romans 12:2'],
    scenarioLinks: ['The Challenged Conviction', 'The Rumor']
  },
  {
    id: 'node-experience',
    label: 'Experience',
    category: 'Epistemic Process',
    x: 350,
    y: 260,
    definition: 'What is learned through lived participation, practice, trial, and consequence.',
    example: 'Discovering through years of service how overcommitment quietly erodes patience.',
    roleDistinction: 'Raw experience can either mature into wisdom or harden into biased cynicism depending on how it is interpreted.',
    scriptureRefs: ['Romans 5:3–4', 'Philippians 1:9–10'],
    scenarioLinks: ['The Unseen Service', 'The Person in Need']
  },
  {
    id: 'node-reasoning',
    label: 'Reasoning',
    category: 'Epistemic Process',
    x: 490,
    y: 190,
    definition: 'Tracing logical connections, weighing evidence, and testing whether conclusions follow from premises.',
    example: 'Recognizing that a late deposit date does not automatically prove personal theft.',
    roleDistinction: 'God-given tool for coherence and critical analysis, though always dependent on the quality of its starting premises.',
    scriptureRefs: ['Matthew 22:37', 'James 3:17'],
    scenarioLinks: ['The Rumor', 'The Challenged Conviction']
  },
  {
    id: 'node-belief',
    label: 'Belief',
    category: 'Epistemic Process',
    x: 620,
    y: 190,
    definition: 'What a person currently accepts as true, along with their level of confidence.',
    example: 'Holding a tentative working hypothesis while remaining open to further evidence.',
    roleDistinction: 'Must remain proportionate to evidence; mistaking a hunch for a settled certainty leads to rash judgment.',
    scriptureRefs: ['1 Corinthians 8:2'],
    scenarioLinks: ['The Rumor', 'The Challenged Conviction']
  },
  {
    id: 'node-testing',
    label: 'Testing',
    category: 'Epistemic Process',
    x: 750,
    y: 120,
    definition: 'Checking beliefs against primary evidence, counter-examples, and ethical fruit.',
    example: 'Asking "What evidence would show my current assumption is wrong?"',
    roleDistinction: 'Separates resilient truth from fragile wishful thinking.',
    scriptureRefs: ['Philippians 1:10', 'Romans 12:2'],
    scenarioLinks: ['The Challenged Conviction', 'The Rumor']
  },
  {
    id: 'node-correction',
    label: 'Correction',
    category: 'Epistemic Process',
    x: 750,
    y: 260,
    definition: 'Revising beliefs, assumptions, or courses of action when shown to be mistaken or incomplete.',
    example: 'Publicly acknowledging an error in an earlier teaching rather than doubling down defensively.',
    roleDistinction: 'Requires humility; receiving correction is a strength of sound judgment, not its surrender.',
    scriptureRefs: ['Proverbs 9:8–9', 'James 3:17'],
    scenarioLinks: ['The Challenged Conviction', 'The Person in Need']
  },

  // Discernment & Action
  {
    id: 'node-understanding',
    label: 'Understanding',
    category: 'Discernment & Action',
    x: 890,
    y: 190,
    definition: 'Grasping the deeper meaning, causes, human context, and relational weight of a matter.',
    example: 'Seeing how a neighbor’s housing crisis, health strain, and pride interact.',
    roleDistinction: 'Bridges factual accuracy and compassionate insight.',
    scriptureRefs: ['Proverbs 2:6', 'Colossians 2:2'],
    scenarioLinks: ['The Person in Need', 'The Opportunity']
  },
  {
    id: 'node-judgment',
    label: 'Judgment / Discernment',
    category: 'Discernment & Action',
    x: 1020,
    y: 190,
    definition: 'Deciding what matters most and what faithful, proportionate response the situation calls for.',
    example: 'Choosing an independent audit and temporary protective pause rather than either gossip or cover-up.',
    roleDistinction: 'Where truth, reverence for God, and love for neighbor converge into a concrete decision.',
    scriptureRefs: ['Philippians 1:9–10', 'James 3:17–18'],
    scenarioLinks: ['The Rumor', 'The Opportunity', 'The Unseen Service']
  },
  {
    id: 'node-action',
    label: 'Action & Fruit',
    category: 'Discernment & Action',
    x: 1140,
    y: 190,
    definition: 'Embodied choices—speaking, serving, waiting, correcting, or setting boundaries—that affect real people.',
    example: 'Restructuring a project timeline and sharing credit so junior staff are protected.',
    roleDistinction: 'Produces new lived consequences and experience, feeding back into future attention and learning.',
    scriptureRefs: ['1 John 3:18', 'Philippians 1:11', 'John 15:8'],
    scenarioLinks: ['The Opportunity', 'The Unseen Service', 'The Person in Need']
  },

  // Formative Anchors (Top & Bottom Rail)
  {
    id: 'node-scripture',
    label: 'Scripture',
    category: 'Formative Anchor',
    x: 420,
    y: 40,
    definition: 'God’s self-revelation witnessing to Christ, shaping our moral vision, reverence, and love.',
    example: 'Allowing Philippians 2:3–4 to expose selfish ambition in how we evaluate a promotion.',
    roleDistinction: 'Norms our theological convictions, character, and moral priorities; does not replace empirical investigation of local facts (such as who signed a receipt).',
    scriptureRefs: ['Proverbs 2:6', 'Colossians 2:2–3', 'Romans 12:2'],
    scenarioLinks: ['All Five Scenarios']
  },
  {
    id: 'node-prayer',
    label: 'Prayer',
    category: 'Formative Anchor',
    x: 620,
    y: 40,
    definition: 'Humble communion with God—asking for wisdom, confessing mixed motives, and seeking the mind of Christ.',
    example: 'Pausing before replying to a hostile critic to ask God to quiet defensiveness and grant clarity.',
    roleDistinction: 'Re-centers the heart in reverence and love; personal impressions during prayer remain subject to wise discernment and do not bypass factual verification.',
    scriptureRefs: ['James 1:5', 'Philippians 1:9–11'],
    scenarioLinks: ['All Five Scenarios']
  },
  {
    id: 'node-community',
    label: 'Christian Community',
    category: 'Formative Anchor',
    x: 820,
    y: 40,
    definition: 'Fellow believers, mentors, and witnesses who deliberate, counsel, encourage, and hold one another accountable.',
    example: 'Consulting a seasoned, independent elder and listening to those without institutional power.',
    roleDistinction: 'Crucial check against solo blind spots—yet communities are also fallible and can either challenge error in love or amplify group prejudice.',
    scriptureRefs: ['Colossians 2:2', 'Ephesians 4:15'],
    scenarioLinks: ['The Rumor', 'The Challenged Conviction', 'The Unseen Service']
  }
];

export const KNOWLEDGE_FEEDBACK_LOOPS: KnowledgeFeedbackLoop[] = [
  {
    id: 'loop-choices-experience',
    title: '1. Choices Produce Experience',
    summary: 'How we act today shapes the world we inhabit and the experiences we encounter tomorrow.',
    nodePath: ['node-judgment', 'node-action', 'node-experience', 'node-attention'],
    healthyDynamic:
      'Faithful, truthful choices build habits of attentiveness and create opportunities for deeper trust and learning.',
    distortedDynamic:
      'Avoidant or manipulative choices create fragile environments where people hide truth from us.',
    exampleInLife:
      'If a leader punishes honest questions, staff stop reporting problems—starving the leader’s future observation.'
  },
  {
    id: 'loop-experience-prejudice',
    title: '2. Experience: Understanding vs. Prejudice',
    summary: 'Past experience can either deepen empathetic understanding or calcify into unexamined prejudice.',
    nodePath: ['node-experience', 'node-reasoning', 'node-belief', 'node-attention'],
    healthyDynamic:
      'Reflected experience teaches patterns while keeping us attentive to what is unique about the next person.',
    distortedDynamic:
      'One painful encounter is over-generalized ("Everyone asking for help is gaming the system"), filtering out contrary evidence.',
    exampleInLife:
      'Assuming Elena’s request in "The Person in Need" is identical to a past disappointment without listening to her actual story.'
  },
  {
    id: 'loop-correction-belief',
    title: '3. Correction Revises Belief',
    summary: 'Testing and humble correction update faulty beliefs into truer understanding.',
    nodePath: ['node-belief', 'node-testing', 'node-correction', 'node-understanding'],
    healthyDynamic:
      'When evidence disproves an assumption, humility welcomes the correction as a gift that brings us closer to truth.',
    distortedDynamic:
      'When ego is fused with a belief, correction is treated as a personal attack, triggering defensive rationalization.',
    exampleInLife:
      'In "The Challenged Conviction," examining primary sources and revising an overstated claim strengthens long-term credibility.'
  },
  {
    id: 'loop-habits-attention',
    title: '4. Habits Shape Attention',
    summary: 'Repeated daily actions train what we automatically notice or overlook.',
    nodePath: ['node-action', 'node-attention', 'node-observation'],
    healthyDynamic:
      'Practicing gratitude, sabbath rest, and unhurried listening trains the eye to notice quiet human needs.',
    distortedDynamic:
      'Habits of constant hurry and platform-seeking train attention to scan only for high-visibility rewards.',
    exampleInLife:
      'In "The Unseen Service," habitual craving for applause makes quiet, foundational mentoring feel invisible.'
  },
  {
    id: 'loop-desires-interpretation',
    title: '5. Desires Influence Interpretation',
    summary: 'What we want often tilts how we weigh ambiguous evidence.',
    nodePath: ['node-prayer', 'node-reasoning', 'node-belief', 'node-judgment'],
    healthyDynamic:
      'Naming our desires honestly before God in prayer helps us apply the same evidentiary standard to claims we dislike as to claims we prefer.',
    distortedDynamic:
      'Motivated reasoning: demanding airtight proof for inconvenient truths while accepting thin rumors that flatter our ambition.',
    exampleInLife:
      'In "The Opportunity," wanting the promotion tempts a candidate to minimize evidence of how the timeline crushes junior staff.'
  },
  {
    id: 'loop-community-error',
    title: '6. Community: Challenging vs. Amplifying Error',
    summary: 'Shared fellowship can either widen our perspective or accelerate a rumor cascade.',
    nodePath: ['node-community', 'node-testimony', 'node-testing', 'node-correction'],
    healthyDynamic:
      'A community committed to speaking truth in love (Eph 4:15) asks "Have we verified this?" and protects the voiceless.',
    distortedDynamic:
      'Partisan loyalty treats repeating an unverified accusation as a badge of group solidarity.',
    exampleInLife:
      'In "The Rumor," community members either slow down to verify the ledger or forward the accusation in group chats.'
  },
  {
    id: 'loop-love-listening',
    title: '7. Love Motivates Careful Listening & Investigation',
    summary: 'Genuine love refuses lazy shortcuts because the other person’s reality matters.',
    nodePath: ['node-scripture', 'node-attention', 'node-testimony', 'node-study', 'node-understanding'],
    healthyDynamic:
      'Because you care about both the accused and the vulnerable, you invest the time to listen carefully and verify facts.',
    distortedDynamic:
      'Indifference settles for quick stereotypes because it does not want to pay the cost of attention.',
    exampleInLife:
      'Philippians 1:9 in action: love abounding in knowledge and depth of insight so that care actually fits the need.'
  }
];
