export type GraphNodeType = 'Person' | 'Covenant' | 'Theme' | 'Event' | 'Place' | 'Prophecy';

export interface GraphNode {
  id: string;
  label: string;
  type: GraphNodeType;
  testament: 'OT' | 'NT' | 'Both';
  summary: string;
  scriptures: string[];
  era: string;
  theologicalSignificance: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  radius?: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  relationship: string;
  theologicalType: 'covenant' | 'typology' | 'fulfillment' | 'genealogy' | 'presence' | 'redemption';
  weight: number;
}

export const GRAPH_NODES: GraphNode[] = [
  // COVENANTS
  {
    id: 'cov-edenic',
    label: 'Edenic Covenant',
    type: 'Covenant',
    testament: 'OT',
    summary: 'Creation mandate, tree of life, fellowship in paradise, and initial seed promise (Protoevangelium).',
    scriptures: ['Genesis 1:28-30', 'Genesis 2:15-17', 'Genesis 3:15'],
    era: 'Creation & Patriarchs',
    theologicalSignificance: 'Establishes humanity as image-bearers and introduces the cosmic conflict between the serpent and the seed.'
  },
  {
    id: 'cov-noahic',
    label: 'Noahic Covenant',
    type: 'Covenant',
    testament: 'OT',
    summary: 'Universal covenant preserving the cosmic order and seasonal rhythm with the bow in the clouds.',
    scriptures: ['Genesis 8:21-22', 'Genesis 9:8-17'],
    era: 'Creation & Patriarchs',
    theologicalSignificance: 'Common grace foundation guaranteeing earth’s stability until the final consummation.'
  },
  {
    id: 'cov-abrahamic',
    label: 'Abrahamic Covenant',
    type: 'Covenant',
    testament: 'Both',
    summary: 'Promise of land, multitude of descendants, and universal blessing to all families through the Seed.',
    scriptures: ['Genesis 12:1-3', 'Genesis 15:5-6', 'Genesis 17:1-8', 'Galatians 3:16'],
    era: 'Creation & Patriarchs',
    theologicalSignificance: 'The root of redemptive election; righteousness imputed through faith alone.'
  },
  {
    id: 'cov-mosaic',
    label: 'Mosaic Covenant',
    type: 'Covenant',
    testament: 'OT',
    summary: 'Suzerainty treaty at Sinai with the Decalogue, Levitical priesthood, and Tabernacle presence.',
    scriptures: ['Exodus 19:5-6', 'Exodus 20:1-17', 'Exodus 24:7-8'],
    era: 'Exodus & Sinai',
    theologicalSignificance: 'The schoolmaster revealing the holiness of God, the depth of sin, and the necessity of atoning sacrifice.'
  },
  {
    id: 'cov-davidic',
    label: 'Davidic Covenant',
    type: 'Covenant',
    testament: 'Both',
    summary: 'Unconditional dynastic promise of an everlasting throne, royal sonship, and cosmic reign.',
    scriptures: ['2 Samuel 7:12-16', 'Psalm 89:3-4', 'Luke 1:32-33'],
    era: 'United Kingdom',
    theologicalSignificance: 'Grounds Messianic hope in an eternal King from the tribe of Judah.'
  },
  {
    id: 'cov-new',
    label: 'New Covenant',
    type: 'Covenant',
    testament: 'Both',
    summary: 'Internal law written on the heart, total forgiveness of sins, and indwelling Spirit sealed by Christ’s blood.',
    scriptures: ['Jeremiah 31:31-34', 'Luke 22:20', 'Hebrews 8:6-13'],
    era: 'New Testament & Consummation',
    theologicalSignificance: 'The climax and fulfillment of all preceding covenants through the sacrifice and resurrection of Christ.'
  },

  // KEY PERSONS
  {
    id: 'p-adam',
    label: 'Adam',
    type: 'Person',
    testament: 'OT',
    summary: 'The first man, federal head of humanity whose disobedience plunged creation into death and exile.',
    scriptures: ['Genesis 2:7', 'Genesis 3:6', 'Romans 5:12-19'],
    era: 'Creation & Patriarchs',
    theologicalSignificance: 'Typological figure of Christ ("The Last Adam" who brings life instead of condemnation).'
  },
  {
    id: 'p-abraham',
    label: 'Abraham',
    type: 'Person',
    testament: 'OT',
    summary: 'Called out of Ur; father of faith who believed Yahweh, counted as righteous, and offered Isaac on Moriah.',
    scriptures: ['Genesis 12:1-4', 'Genesis 15:6', 'Genesis 22:1-14', 'Romans 4:3'],
    era: 'Creation & Patriarchs',
    theologicalSignificance: 'The paradigm of justification by faith and recipient of the global seed promise.'
  },
  {
    id: 'p-isaac',
    label: 'Isaac',
    type: 'Person',
    testament: 'OT',
    summary: 'The miraculous son of promise bound on Mount Moriah with wood on his back, spared by the substitute ram.',
    scriptures: ['Genesis 21:1-3', 'Genesis 22:6-13', 'Hebrews 11:17-19'],
    era: 'Creation & Patriarchs',
    theologicalSignificance: 'Vivid typological shadow of Christ carrying His cross up Golgotha and substitutionary atonement.'
  },
  {
    id: 'p-joseph',
    label: 'Joseph',
    type: 'Person',
    testament: 'OT',
    summary: 'Beloved son betrayed for silver by his brothers, exalted to right hand of Pharaoh, saving the world from famine.',
    scriptures: ['Genesis 37:28', 'Genesis 41:40', 'Genesis 50:20'],
    era: 'Creation & Patriarchs',
    theologicalSignificance: 'Prototypical type of the rejected brother exalted to save those who betrayed him ("God meant it for good").'
  },
  {
    id: 'p-moses',
    label: 'Moses',
    type: 'Person',
    testament: 'OT',
    summary: 'Deliverer, mediator of the Old Covenant, author of the Torah, who beheld God at the burning bush and Sinai.',
    scriptures: ['Exodus 3:2-10', 'Deuteronomy 34:10-12', 'Hebrews 3:1-6'],
    era: 'Exodus & Sinai',
    theologicalSignificance: 'The archetype prophet and mediator whose office prepares the way for the greater Mediator, Christ.'
  },
  {
    id: 'p-boaz',
    label: 'Boaz',
    type: 'Person',
    testament: 'OT',
    summary: 'Righteous landowner of Bethlehem who fulfilled the duty of Goel (Kinsman-Redeemer) by wedding Ruth.',
    scriptures: ['Ruth 2:1', 'Ruth 4:9-10'],
    era: 'Judges',
    theologicalSignificance: 'Typifies Christ as the loving Redeemer paying the bride’s debt and bringing gentiles into the line.'
  },
  {
    id: 'p-david',
    label: 'David',
    type: 'Person',
    testament: 'OT',
    summary: 'The shepherd king according to God’s own heart, psalmist, victor over Goliath, founder of royal Zion.',
    scriptures: ['1 Samuel 16:11-13', '2 Samuel 7:8-16', 'Acts 13:22'],
    era: 'United Kingdom',
    theologicalSignificance: 'Royal archetype of the Anointed Messiah (Mashiach) whose dynasty is everlasting.'
  },
  {
    id: 'p-solomon',
    label: 'Solomon',
    type: 'Person',
    testament: 'OT',
    summary: 'Son of David who built the First Temple in Jerusalem and received supernatural wisdom.',
    scriptures: ['1 Kings 3:9-12', '1 Kings 6:1-14', 'Matthew 12:42'],
    era: 'United Kingdom',
    theologicalSignificance: 'Builder of the dwelling place of God’s glory; prefigures "One greater than Solomon is here."'
  },
  {
    id: 'p-isaiah',
    label: 'Isaiah',
    type: 'Person',
    testament: 'OT',
    summary: 'The "Fifth Evangelist" who saw Yahweh high and lifted up, prophesying Immanuel, the Suffering Servant, and New Creation.',
    scriptures: ['Isaiah 6:1-8', 'Isaiah 9:6', 'Isaiah 53:1-12'],
    era: 'Divided Kingdom',
    theologicalSignificance: 'Canonical summit of Messianic Christology in the Old Testament.'
  },
  {
    id: 'p-jeremiah',
    label: 'Jeremiah',
    type: 'Person',
    testament: 'OT',
    summary: 'Weeping prophet witnessing the fall of Jerusalem and temple burning, yet announcing the New Covenant.',
    scriptures: ['Jeremiah 1:4-10', 'Jeremiah 31:31-34'],
    era: 'Divided Kingdom & Exile',
    theologicalSignificance: 'Herald of the heart-inscribed covenant superseding the broken Sinaitic treaty.'
  },
  {
    id: 'p-john-baptist',
    label: 'John the Baptist',
    type: 'Person',
    testament: 'NT',
    summary: 'The forerunner Elijah preparing the way, preaching baptism of repentance, identifying Jesus as the Lamb of God.',
    scriptures: ['Malachi 3:1', 'Matthew 3:1-3', 'John 1:29'],
    era: 'Second Temple & Incarnation',
    theologicalSignificance: 'Hinge between Old and New Testaments; last and greatest of the Old Covenant prophets.'
  },
  {
    id: 'p-jesus',
    label: 'Jesus of Nazareth (The Christ)',
    type: 'Person',
    testament: 'Both',
    summary: 'The Incarnate Word (Logos), True God and True Man, crucified for sins, raised on the third day, exalted at the right hand of the Father.',
    scriptures: ['John 1:1-14', 'Philippians 2:5-11', 'Colossians 1:15-20', 'Revelation 1:17-18'],
    era: 'Second Temple & Incarnation',
    theologicalSignificance: 'The center, sum, and substance of all Scripture; True Prophet, Priest, and King.'
  },
  {
    id: 'p-peter',
    label: 'Simon Peter',
    type: 'Person',
    testament: 'NT',
    summary: 'Leader of the Twelve, confessor of Christ at Caesarea Philippi, preacher at Pentecost, apostle of the circumcision.',
    scriptures: ['Matthew 16:16-18', 'Acts 2:14-41', '1 Peter 1:3'],
    era: 'Apostolic Era',
    theologicalSignificance: 'Unlocks the kingdom doors to Jews, Samaritans, and Gentiles in Acts.'
  },
  {
    id: 'p-paul',
    label: 'Paul of Tarsus',
    type: 'Person',
    testament: 'NT',
    summary: 'Former Pharisee converted on the Damascus Road, apostle to the Gentiles, theological architect of the Epistles.',
    scriptures: ['Acts 9:1-19', 'Romans 1:1-7', 'Galatians 2:20'],
    era: 'Apostolic Era',
    theologicalSignificance: 'Expositor of the mystery hidden for ages: Gentiles fellow heirs in the one body of Christ.'
  },
  {
    id: 'p-john-apostle',
    label: 'John the Beloved',
    type: 'Person',
    testament: 'NT',
    summary: 'Apostle who leaned on Jesus’ chest, witness of the crucifixion, author of the Fourth Gospel, Epistles, and Revelation.',
    scriptures: ['John 19:26-27', '1 John 1:1-3', 'Revelation 1:9-19'],
    era: 'Apostolic Era',
    theologicalSignificance: 'Witness of the Incarnate Life and seer of the celestial throne and New Jerusalem.'
  },

  // THEMES
  {
    id: 'theme-atonement',
    label: 'Atonement & Substitution',
    type: 'Theme',
    testament: 'Both',
    summary: 'The transfer of guilt from sinner to innocent victim: from Edenic animal skins and Passover lamb to Golgotha.',
    scriptures: ['Genesis 3:21', 'Leviticus 16:15-16', 'Hebrews 9:12-14'],
    era: 'Canonical Motif',
    theologicalSignificance: 'Without the shedding of blood there is no forgiveness of sins.'
  },
  {
    id: 'theme-temple-presence',
    label: 'Temple & Divine Presence',
    type: 'Theme',
    testament: 'Both',
    summary: 'God dwelling with humanity: Eden Garden -> Tabernacle -> Solomon’s Temple -> Christ’s Body -> Church -> New Jerusalem.',
    scriptures: ['Exodus 40:34', 'John 2:19-21', '1 Corinthians 3:16', 'Revelation 21:3'],
    era: 'Canonical Motif',
    theologicalSignificance: 'The ultimate teleology of creation: "God Himself will be with them as their God."'
  },
  {
    id: 'theme-kingdom',
    label: 'The Kingdom of God',
    type: 'Theme',
    testament: 'Both',
    summary: 'The sovereign reign of Yahweh over all creation, announced as having broken into history through Christ.',
    scriptures: ['Psalm 103:19', 'Daniel 2:44', 'Mark 1:15', 'Revelation 11:15'],
    era: 'Canonical Motif',
    theologicalSignificance: 'Already inaugurated at the First Coming, awaiting cosmic consummation at the Parousia.'
  },
  {
    id: 'theme-resurrection',
    label: 'Resurrection & New Creation',
    type: 'Theme',
    testament: 'Both',
    summary: 'Defeat of bodily death and cosmic regeneration: foreshadowed in Firstfruits, realized in Christ, promised to all saints.',
    scriptures: ['Job 19:25', 'Daniel 12:2', '1 Corinthians 15:20-23', 'Romans 8:19-23'],
    era: 'Canonical Motif',
    theologicalSignificance: 'Redemption does not abandon the physical cosmos; it redeems and glorifies it.'
  },
  {
    id: 'theme-holy-spirit',
    label: 'The Holy Spirit (Ruach / Pneuma)',
    type: 'Theme',
    testament: 'Both',
    summary: 'Hovering over creation’s waters, empowering prophets, conceiving Christ, indwelling the Church at Pentecost.',
    scriptures: ['Genesis 1:2', 'Ezekiel 37:9', 'Acts 2:1-4', 'Romans 8:9-11'],
    era: 'Canonical Motif',
    theologicalSignificance: 'The agent of regeneration, illumination, and sanctification applying Christ’s work to the believer.'
  },

  // EVENTS
  {
    id: 'ev-creation-fall',
    label: 'Creation & The Fall',
    type: 'Event',
    testament: 'OT',
    summary: 'Universe spoken into being; humanity rebels at the Tree of Knowledge, introducing death and rupture.',
    scriptures: ['Genesis 1:1-31', 'Genesis 3:1-24'],
    era: 'Creation & Patriarchs',
    theologicalSignificance: 'Origin of moral catastrophe necessitating redemption history.'
  },
  {
    id: 'ev-exodus-sinai',
    label: 'The Exodus & Sinai Theophany',
    type: 'Event',
    testament: 'OT',
    summary: 'Plagues on Egypt, parting of Red Sea, thunderous delivery of the Law at Mount Sinai.',
    scriptures: ['Exodus 14:21-31', 'Exodus 19:16-25'],
    era: 'Exodus & Sinai',
    theologicalSignificance: 'Constitutive salvation event defining Israel’s covenant identity as a redeemed people.'
  },
  {
    id: 'ev-temple-dedication',
    label: 'Solomon’s Temple Dedication',
    type: 'Event',
    testament: 'OT',
    summary: 'Ark of Covenant placed in the Holy of Holies; Shekinah cloud fills the sanctuary with blinding glory.',
    scriptures: ['1 Kings 8:1-11', '2 Chronicles 7:1-3'],
    era: 'United Kingdom',
    theologicalSignificance: 'Peak of Old Testament theocracy and manifestation of divine immanence.'
  },
  {
    id: 'ev-babylonian-exile',
    label: 'Fall of Jerusalem & Babylonian Exile',
    type: 'Event',
    testament: 'OT',
    summary: 'Nebuchadnezzar destroys temple and walls (586 BC); Judah exiled beyond the Euphrates.',
    scriptures: ['2 Kings 25:1-12', 'Psalm 137:1-4', 'Lamentations 1:1'],
    era: 'Divided Kingdom & Exile',
    theologicalSignificance: 'Enactment of Deuteronomy covenant sanctions, purifying Israel and sparking Messianic longing.'
  },
  {
    id: 'ev-incarnation-crucifixion',
    label: 'The Crucifixion & Resurrection',
    type: 'Event',
    testament: 'NT',
    summary: 'Christ crucified outside Jerusalem walls on Passover; raised bodily on the third day, conquering Sheol.',
    scriptures: ['Matthew 27:45-56', 'Matthew 28:1-10', '1 Corinthians 15:3-8'],
    era: 'Second Temple & Incarnation',
    theologicalSignificance: 'The hinge of cosmic history; sin atoned, principalities disarmed, death abolished.'
  },
  {
    id: 'ev-pentecost',
    label: 'Pentecost Outpouring',
    type: 'Event',
    testament: 'NT',
    summary: 'Sound like a rushing mighty wind and tongues of fire over 120 disciples in Jerusalem.',
    scriptures: ['Acts 2:1-13'],
    era: 'Apostolic Era',
    theologicalSignificance: 'Birth of the New Covenant Church and reversal of the Tower of Babel’s linguistic division.'
  },
  {
    id: 'ev-new-creation',
    label: 'Consummation & New Jerusalem',
    type: 'Event',
    testament: 'NT',
    summary: 'Final descent of the holy city from heaven; sea of chaos no more; God dwells directly with redeemed humanity.',
    scriptures: ['Revelation 21:1-27', 'Revelation 22:1-5'],
    era: 'Consummation',
    theologicalSignificance: 'Teleological terminus of the biblical grand narrative.'
  },

  // PLACES
  {
    id: 'pl-eden',
    label: 'Garden of Eden',
    type: 'Place',
    testament: 'OT',
    summary: 'Original sanctuary-garden of God’s untarnished fellowship with man.',
    scriptures: ['Genesis 2:8-15'],
    era: 'Creation',
    theologicalSignificance: 'Archetype sanctuary prefiguring the Tabernacle and the New Jerusalem.'
  },
  {
    id: 'pl-moriah',
    label: 'Mount Moriah / Zion',
    type: 'Place',
    testament: 'Both',
    summary: 'Site of the Akedah (binding of Isaac), Araunah’s threshing floor, Solomon’s Temple, and adjacent Golgotha.',
    scriptures: ['Genesis 22:2', '2 Chronicles 3:1', 'Psalm 48:1-2'],
    era: 'All Eras',
    theologicalSignificance: 'The geographic focal point of substitutionary sacrifice in redemptive history.'
  },
  {
    id: 'pl-sinai',
    label: 'Mount Sinai (Horeb)',
    type: 'Place',
    testament: 'OT',
    summary: 'The mountain of God enveloped in smoke, fire, and trumpet blasts where Torah was given.',
    scriptures: ['Exodus 19:18-20', 'Galatians 4:24-25'],
    era: 'Exodus & Sinai',
    theologicalSignificance: 'Place of the Old Covenant law-giving, contrasted with heavenly Mount Zion in Hebrews 12:18-24.'
  },
  {
    id: 'pl-jerusalem',
    label: 'Jerusalem',
    type: 'Place',
    testament: 'Both',
    summary: 'City of Melchizedek, David’s capital, seat of the Sanhedrin, site of Christ’s crucifixion and resurrection.',
    scriptures: ['Psalm 122:1-6', 'Luke 13:34', 'Galatians 4:26'],
    era: 'All Eras',
    theologicalSignificance: 'The earthly shadow of the heavenly Jerusalem.'
  },
  {
    id: 'pl-babylon',
    label: 'Babylon',
    type: 'Place',
    testament: 'Both',
    summary: 'Babel’s origin and imperial oppressor of Israel, canonical symbol of haughty human rebellion against God.',
    scriptures: ['Genesis 11:1-9', 'Jeremiah 51:6-9', 'Revelation 18:2'],
    era: 'All Eras',
    theologicalSignificance: 'The antithesis of the City of God; the archetypal world system destined for destruction.'
  }
];

export const GRAPH_EDGES: GraphEdge[] = [
  // Covenants to Covenants & Christ
  { source: 'cov-edenic', target: 'cov-abrahamic', relationship: 'narrows seed promise to Abraham', theologicalType: 'covenant', weight: 3 },
  { source: 'cov-abrahamic', target: 'cov-mosaic', relationship: 'adds tutor until promised seed arrives', theologicalType: 'covenant', weight: 3 },
  { source: 'cov-abrahamic', target: 'cov-davidic', relationship: 'royal line promises narrowed to David', theologicalType: 'covenant', weight: 4 },
  { source: 'cov-davidic', target: 'cov-new', relationship: 'eternal King established in New Covenant', theologicalType: 'covenant', weight: 5 },
  { source: 'cov-mosaic', target: 'cov-new', relationship: 'superseded and fulfilled by better covenant', theologicalType: 'covenant', weight: 5 },
  { source: 'p-jesus', target: 'cov-new', relationship: 'Mediator and Blood Guarantee of New Covenant', theologicalType: 'covenant', weight: 5 },
  { source: 'p-jesus', target: 'cov-davidic', relationship: 'Eternal Son of David on the Throne', theologicalType: 'fulfillment', weight: 5 },
  { source: 'p-jesus', target: 'cov-abrahamic', relationship: 'Singular Seed blessing all nations', theologicalType: 'fulfillment', weight: 5 },

  // Persons to Covenants
  { source: 'p-adam', target: 'cov-edenic', relationship: 'covenant party and recipient of Gen 3:15', theologicalType: 'covenant', weight: 4 },
  { source: 'p-abraham', target: 'cov-abrahamic', relationship: 'covenant recipient of Genesis 15 & 17', theologicalType: 'covenant', weight: 5 },
  { source: 'p-moses', target: 'cov-mosaic', relationship: 'covenant mediator at Mount Sinai', theologicalType: 'covenant', weight: 5 },
  { source: 'p-david', target: 'cov-davidic', relationship: 'recipient of 2 Samuel 7 dynastic oracle', theologicalType: 'covenant', weight: 5 },
  { source: 'p-jeremiah', target: 'cov-new', relationship: 'prophesied the New Covenant (Jer 31)', theologicalType: 'fulfillment', weight: 4 },

  // Typology to Jesus
  { source: 'p-adam', target: 'p-jesus', relationship: 'First Adam typifies the Last Adam', theologicalType: 'typology', weight: 4 },
  { source: 'p-isaac', target: 'p-jesus', relationship: 'Offered on Moriah typifies Christ on Golgotha', theologicalType: 'typology', weight: 5 },
  { source: 'p-joseph', target: 'p-jesus', relationship: 'Betrayed, suffering brother exalted to save nations', theologicalType: 'typology', weight: 4 },
  { source: 'p-moses', target: 'p-jesus', relationship: 'Lawgiver mediator typifies the Prophet like Moses', theologicalType: 'typology', weight: 4 },
  { source: 'p-boaz', target: 'p-jesus', relationship: 'Kinsman-Redeemer (Goel) buying gentile bride', theologicalType: 'typology', weight: 4 },
  { source: 'p-david', target: 'p-jesus', relationship: 'Shepherd King typifies the Good Shepherd & Messiah', theologicalType: 'typology', weight: 5 },
  { source: 'p-solomon', target: 'p-jesus', relationship: 'Wise Temple Builder typifies Greater than Solomon', theologicalType: 'typology', weight: 3 },
  { source: 'p-john-baptist', target: 'p-jesus', relationship: 'Forerunner announcing the Lamb of God', theologicalType: 'fulfillment', weight: 5 },

  // Persons to Events & Places
  { source: 'p-adam', target: 'ev-creation-fall', relationship: 'central actor in Creation and Fall', theologicalType: 'redemption', weight: 4 },
  { source: 'p-abraham', target: 'pl-moriah', relationship: 'bound Isaac on Moriah', theologicalType: 'presence', weight: 4 },
  { source: 'p-moses', target: 'ev-exodus-sinai', relationship: 'led Israel out of Egypt and up Sinai', theologicalType: 'presence', weight: 5 },
  { source: 'p-moses', target: 'pl-sinai', relationship: 'received Torah on Sinai', theologicalType: 'presence', weight: 4 },
  { source: 'p-solomon', target: 'ev-temple-dedication', relationship: 'dedicated First Temple', theologicalType: 'presence', weight: 4 },
  { source: 'p-jeremiah', target: 'ev-babylonian-exile', relationship: 'prophesied during fall of Jerusalem', theologicalType: 'redemption', weight: 4 },
  { source: 'p-jesus', target: 'ev-incarnation-crucifixion', relationship: 'crucified and bodily raised', theologicalType: 'redemption', weight: 5 },
  { source: 'p-peter', target: 'ev-pentecost', relationship: 'proclaimed Pentecost sermon', theologicalType: 'fulfillment', weight: 4 },
  { source: 'p-paul', target: 'p-peter', relationship: 'apostolic colleagues in expanding the Gospel', theologicalType: 'fulfillment', weight: 3 },
  { source: 'p-john-apostle', target: 'ev-new-creation', relationship: 'received Revelation vision of New Jerusalem', theologicalType: 'fulfillment', weight: 4 },

  // Themes to Nodes
  { source: 'theme-atonement', target: 'p-isaac', relationship: 'substitute ram on Moriah', theologicalType: 'typology', weight: 4 },
  { source: 'theme-atonement', target: 'ev-incarnation-crucifixion', relationship: 'supreme substitutionary sacrifice', theologicalType: 'redemption', weight: 5 },
  { source: 'theme-temple-presence', target: 'pl-eden', relationship: 'first sanctuary of divine presence', theologicalType: 'presence', weight: 4 },
  { source: 'theme-temple-presence', target: 'ev-temple-dedication', relationship: 'Shekinah glory occupies holy of holies', theologicalType: 'presence', weight: 4 },
  { source: 'theme-temple-presence', target: 'p-jesus', relationship: 'Word tabernacled among us (John 1:14)', theologicalType: 'presence', weight: 5 },
  { source: 'theme-temple-presence', target: 'ev-new-creation', relationship: 'Dwelling place of God with man', theologicalType: 'presence', weight: 5 },
  { source: 'theme-kingdom', target: 'cov-davidic', relationship: 'kingdom throne covenant with David', theologicalType: 'covenant', weight: 4 },
  { source: 'theme-kingdom', target: 'p-jesus', relationship: 'herald and King of the Kingdom of God', theologicalType: 'fulfillment', weight: 5 },
  { source: 'theme-resurrection', target: 'ev-incarnation-crucifixion', relationship: 'third day bodily resurrection', theologicalType: 'fulfillment', weight: 5 },
  { source: 'theme-resurrection', target: 'ev-new-creation', relationship: 'cosmic bodily renewal of believers', theologicalType: 'fulfillment', weight: 4 },
  { source: 'theme-holy-spirit', target: 'ev-pentecost', relationship: 'Pentecost baptism and permanent indwelling', theologicalType: 'fulfillment', weight: 5 },
  { source: 'theme-holy-spirit', target: 'cov-new', relationship: 'agent of regeneration in New Covenant', theologicalType: 'covenant', weight: 4 },

  // Places
  { source: 'pl-moriah', target: 'pl-jerusalem', relationship: 'Temple Mount within Jerusalem', theologicalType: 'presence', weight: 4 },
  { source: 'pl-jerusalem', target: 'ev-incarnation-crucifixion', relationship: 'crucified outside gate of Jerusalem', theologicalType: 'presence', weight: 4 },
  { source: 'pl-babylon', target: 'ev-babylonian-exile', relationship: 'destination of Judah’s captivity', theologicalType: 'redemption', weight: 4 },
  { source: 'pl-babylon', target: 'ev-new-creation', relationship: 'fallen Babylon replaced by New Jerusalem', theologicalType: 'fulfillment', weight: 3 }
];
