export interface TimelineEra {
  id: string;
  name: string;
  period: string;
  testament: 'OT' | 'NT' | 'Intertestamental';
  covenantFocus: string;
  keyFigures: string[];
  canonicalBooks: string[];
  summary: string;
  milestones: {
    year: string;
    event: string;
    scripture: string;
    description: string;
    isPropheticFulfillment?: boolean;
  }[];
}

export const TIMELINE_ERAS: TimelineEra[] = [
  {
    id: 'era-primeval-patriarchs',
    name: 'Primeval & Patriarchal Era',
    period: 'Creation – c. 1800 BC',
    testament: 'OT',
    covenantFocus: 'Edenic, Noahic, and Abrahamic Covenants',
    keyFigures: ['Adam', 'Noah', 'Abraham', 'Sarah', 'Isaac', 'Jacob', 'Joseph'],
    canonicalBooks: ['Genesis', 'Job'],
    summary: 'From cosmic genesis and the catastrophic rupture of the Fall to the divine call of Abraham out of Ur and the preservation of the covenant family in Egypt.',
    milestones: [
      {
        year: 'Primeval',
        event: 'Creation & Protoevangelium',
        scripture: 'Genesis 1:1; 3:15',
        description: 'Cosmic creation followed by the moral rebellion at the Tree; the foundational promise of the Serpent-Crusher announced.'
      },
      {
        year: 'c. 2100 BC',
        event: 'Call of Abraham & Genesis 15 Covenant',
        scripture: 'Genesis 12:1-3; 15:5-6',
        description: 'Yahweh pledges universal blessing through Abraham’s seed; faith counted as righteousness.'
      },
      {
        year: 'c. 2000 BC',
        event: 'The Akedah: Binding of Isaac on Mount Moriah',
        scripture: 'Genesis 22:1-14',
        description: 'Abraham prepares to offer the son of promise; Yahweh provides the substitute ram, declaring "Yahweh Yireh".'
      },
      {
        year: 'c. 1876 BC',
        event: 'Joseph Exalted in Egypt & Jacob’s Descent',
        scripture: 'Genesis 45:7-8; 50:20',
        description: 'Providential preservation of the 70 souls of Israel through famine: "You meant evil against me, but God meant it for good."'
      }
    ]
  },
  {
    id: 'era-exodus-wilderness',
    name: 'Exodus, Sinai & Wilderness Wanderings',
    period: 'c. 1446 – 1406 BC',
    testament: 'OT',
    covenantFocus: 'Mosaic Covenant',
    keyFigures: ['Moses', 'Aaron', 'Miriam', 'Joshua', 'Caleb'],
    canonicalBooks: ['Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'],
    summary: 'Deliverance of Israel from Egyptian bondage by mighty hand and outstretched arm; institution of Passover, giving of the Decalogue at Sinai, Tabernacle construction, and 40 years of wilderness wandering.',
    milestones: [
      {
        year: 'c. 1446 BC',
        event: 'The First Passover & Red Sea Crossing',
        scripture: 'Exodus 12:1-13; 14:21-31',
        description: 'Unblemished lamb blood on lintels shields Israel from the angel of death; Pharaoh’s army submerged in the Sea.'
      },
      {
        year: 'c. 1446 BC',
        event: 'Sinai Theophany & Tabernacle Dedication',
        scripture: 'Exodus 19:16-20; 40:34-35',
        description: 'Ten Words spoken in thunder and smoke; the Shekinah glory fills the newly constructed sanctuary among the 12 tribes.'
      },
      {
        year: 'c. 1420 BC',
        event: 'The Bronze Serpent Raised on a Pole',
        scripture: 'Numbers 21:8-9',
        description: 'Fiery serpent judgment cured by looking in faith upon the lifted bronze serpent.'
      },
      {
        year: 'c. 1406 BC',
        event: 'Deuteronomy Renewal & Death of Moses on Pisgah',
        scripture: 'Deuteronomy 34:1-10',
        description: 'Moses preaches farewell sermons on Plains of Moab, glimpses Promised Land from Mount Nebo, and dies.'
      }
    ]
  },
  {
    id: 'era-conquest-judges',
    name: 'Conquest, Tribal Settlement & Judges',
    period: 'c. 1406 – 1050 BC',
    testament: 'OT',
    covenantFocus: 'Abrahamic Land Promise Fulfillment & Need for a King',
    keyFigures: ['Joshua', 'Deborah', 'Gideon', 'Samson', 'Ruth', 'Boaz', 'Samuel'],
    canonicalBooks: ['Joshua', 'Judges', 'Ruth', 'Early 1 Samuel'],
    summary: 'Crossing of the Jordan and fall of Jericho; division of tribal allotments; repetitive cycle of idolatry, oppression, repentance, and charismatic deliverers under the Judges.',
    milestones: [
      {
        year: 'c. 1406 BC',
        event: 'Jordan River Parting & Jericho’s Walls Fall',
        scripture: 'Joshua 3:14-17; 6:20',
        description: 'Ark of the Covenant halts Jordan flood waters; Jericho falls after seven days of liturgical procession.'
      },
      {
        year: 'c. 1200 BC',
        event: 'Deborah & Barak Overthrow Sisera',
        scripture: 'Judges 4:4-16; 5:1-31',
        description: 'Prophetess Deborah rallies Israel against Canaanite iron chariots at Mount Tabor.'
      },
      {
        year: 'c. 1100 BC',
        event: 'Ruth’s Redemption by Boaz in Bethlehem',
        scripture: 'Ruth 4:13-17',
        description: 'Moabite widow Ruth grafted into covenant community; birth of Obed, grandfather of King David.'
      }
    ]
  },
  {
    id: 'era-united-monarchy',
    name: 'United Monarchy: Saul, David & Solomon',
    period: 'c. 1050 – 930 BC',
    testament: 'OT',
    covenantFocus: 'Davidic Covenant',
    keyFigures: ['Samuel', 'Saul', 'David', 'Jonathan', 'Nathan', 'Solomon'],
    canonicalBooks: ['1 & 2 Samuel', '1 Kings 1-11', '1 Chronicles', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Songs'],
    summary: 'Israel transitions to kingship; David establishes Jerusalem as capital and receives the covenant promise of an eternal dynasty; Solomon builds the First Temple in unprecedented imperial splendor.',
    milestones: [
      {
        year: 'c. 1010 BC',
        event: 'David Anointed King & Jerusalem Captured',
        scripture: '2 Samuel 5:1-7',
        description: 'David unites the 12 tribes, captures Jebusite fortress of Zion, making it City of David.'
      },
      {
        year: 'c. 1000 BC',
        event: 'The Davidic Covenant Oracle (2 Samuel 7)',
        scripture: '2 Samuel 7:12-16',
        description: 'Nathan delivers God’s pledge: "Your throne shall be established forever"—the bedrock of Messianic expectation.'
      },
      {
        year: 'c. 960 BC',
        event: 'Dedication of Solomon’s Temple',
        scripture: '1 Kings 8:10-11',
        description: 'The Ark brought into the Holy of Holies; cloud of divine glory fills the house so priests cannot stand.'
      }
    ]
  },
  {
    id: 'era-divided-kingdom',
    name: 'Divided Kingdom & Prophetic Witness',
    period: 'c. 930 – 586 BC',
    testament: 'OT',
    covenantFocus: 'Mosaic Covenant Sanctions & Future Messianic Hope',
    keyFigures: ['Elijah', 'Elisha', 'Hezekiah', 'Josiah', 'Isaiah', 'Jeremiah', 'Micah', 'Hosea'],
    canonicalBooks: ['1 & 2 Kings', '2 Chronicles 10-36', 'Isaiah', 'Jeremiah', 'Hosea', 'Amos', 'Micah', 'Habakkuk', 'Zephaniah'],
    summary: 'Ten northern tribes rebel to form Israel (Samaria), while two remain as Judah (Jerusalem); prophetic calls to repentance; fall of Samaria to Assyria (722 BC); Babylonian siege of Jerusalem (586 BC).',
    milestones: [
      {
        year: '930 BC',
        event: 'Schism of the Kingdom Under Rehoboam & Jeroboam',
        scripture: '1 Kings 12:16-20',
        description: 'Taxes spark division: Northern Kingdom (10 tribes) establishes golden calves at Dan and Bethel.'
      },
      {
        year: '722 BC',
        event: 'Fall of Northern Israel to Assyria',
        scripture: '2 Kings 17:6-18',
        description: 'Sargon II captures Samaria and deports the northern tribes into exile due to persistent idolatry.'
      },
      {
        year: 'c. 700 BC',
        event: 'Isaiah Prophesies Suffering Servant & Virgin Birth',
        scripture: 'Isaiah 7:14; 53:1-12',
        description: 'Peak of canonical OT prophecy: Immanuel conceived, pierced for transgressions, buried with rich.'
      },
      {
        year: '586 BC',
        event: 'Destruction of Solomon’s Temple & Exile to Babylon',
        scripture: '2 Kings 25:8-12',
        description: 'Nebuchadnezzar razes Jerusalem, burns the temple, breaks down the walls, and leads Judah captive.'
      }
    ]
  },
  {
    id: 'era-exile-return',
    name: 'Babylonian Exile & Persian Restoration',
    period: 'c. 586 – 400 BC',
    testament: 'OT',
    covenantFocus: 'Covenant Faithfulness & Second Temple Rebuilding',
    keyFigures: ['Daniel', 'Ezekiel', 'Cyrus the Great', 'Zerubbabel', 'Joshua the Priest', 'Ezra', 'Nehemiah', 'Esther', 'Malachi'],
    canonicalBooks: ['Ezekiel', 'Daniel', 'Ezra', 'Nehemiah', 'Esther', 'Haggai', 'Zechariah', 'Malachi'],
    summary: '70 years of captivity in Babylon; prophetic visions of Daniel and Ezekiel; decree of Cyrus permitting Jewish return; rebuilding of the altar, temple, and Jerusalem’s stone walls.',
    milestones: [
      {
        year: 'c. 550 BC',
        event: 'Daniel’s Vision of the Son of Man & 70 Weeks',
        scripture: 'Daniel 7:13-14; 9:24-27',
        description: 'Daniel beholds universal dominion granted to One like a Son of Man; timeline for Messiah’s arrival revealed.'
      },
      {
        year: '538 BC',
        event: 'Edict of Cyrus & First Wave of Exiles Return',
        scripture: 'Ezra 1:1-4; 2 Chronicles 36:22-23',
        description: 'Persian emperor Cyrus decrees rebuild of Yahweh’s house; Zerubbabel leads 42,000 back to Judah.'
      },
      {
        year: '516 BC',
        event: 'Completion of the Second Temple',
        scripture: 'Ezra 6:15-18; Haggai 2:9',
        description: 'Temple rebuilt despite opposition; Haggai prophesies that latter glory will surpass Solomon’s.'
      },
      {
        year: '445 BC',
        event: 'Nehemiah Rebuilds Jerusalem’s Walls in 52 Days',
        scripture: 'Nehemiah 6:15; 8:1-8',
        description: 'Armed workers rebuild security perimeter; Ezra reads Torah aloud from wood podium with tears and joy.'
      }
    ]
  },
  {
    id: 'era-intertestamental',
    name: 'Second Temple & Intertestamental Period',
    period: 'c. 400 – 4 BC',
    testament: 'Intertestamental',
    covenantFocus: 'The "400 Years of Silence" & Messianic Expectation',
    keyFigures: ['Alexander the Great', 'Antiochus IV Epiphanes', 'Judas Maccabeus', 'Herod the Great'],
    canonicalBooks: ['Canonical OT closes with Malachi 4 awaiting Elijah'],
    summary: 'Ptolemaic and Seleucid Greek rule; Septuagint (LXX) translation in Alexandria; Maccabean Revolt against desecration of the temple; Roman conquest under Pompey (63 BC); Herod rebuilds temple complex.',
    milestones: [
      {
        year: 'c. 332 BC',
        event: 'Alexander the Great Conquers Judea',
        scripture: 'Anticipated in Daniel 8:5-8, 21',
        description: 'Rapid Hellenization of the Mediterranean basin spreads Greek language, preparing vehicle for New Testament transmission.'
      },
      {
        year: 'c. 250 BC',
        event: 'Septuagint (LXX) Greek Old Testament Translated',
        scripture: 'Historical Milestone',
        description: 'Hebrew Scriptures translated into Greek at Alexandria, becoming the primary Bible quoted by Christ and Apostles.'
      },
      {
        year: '167–164 BC',
        event: 'Maccabean Revolt & Hanukkah Temple Cleansing',
        scripture: 'Anticipated in Daniel 11:31',
        description: 'Antiochus Epiphanes desecrates altar with swine; Judas Maccabeus reconquers temple mount, rededicating holy place.'
      },
      {
        year: '63 BC',
        event: 'Roman General Pompey Enters Jerusalem',
        scripture: 'Historical Milestone',
        description: 'Judea becomes Roman client state; Herod the Great appointed "King of the Jews" by Roman Senate.'
      }
    ]
  },
  {
    id: 'era-incarnation-gospels',
    name: 'The Incarnation & Earthly Ministry of Christ',
    period: 'c. 4 BC – 33 AD',
    testament: 'NT',
    covenantFocus: 'Inauguration of the New Covenant in His Blood',
    keyFigures: ['Jesus of Nazareth', 'Mary', 'Joseph', 'John the Baptist', 'The Twelve Apostles', 'Pontius Pilate'],
    canonicalBooks: ['Matthew', 'Mark', 'Luke', 'John'],
    summary: 'The eternal Word becomes flesh; virgin birth in Bethlehem; baptism by John; three years of kingdom proclamation, healings, and signs; betrayal, crucifixion outside Jerusalem, bodily resurrection, and ascension.',
    milestones: [
      {
        year: 'c. 4 BC',
        event: 'Birth of Jesus in Bethlehem Ephrathah',
        scripture: 'Micah 5:2 / Luke 2:1-20',
        description: 'Angels announce tidings of great joy to shepherds; the Word made flesh laid in a feed-trough.',
        isPropheticFulfillment: true
      },
      {
        year: 'c. 29 AD',
        event: 'Baptism in Jordan & Temptation in Wilderness',
        scripture: 'Matthew 3:13-17; 4:1-11',
        description: 'The Spirit descends like a dove; Father testifies "This is my beloved Son"; Jesus succeeds where Israel failed.'
      },
      {
        year: '33 AD',
        event: 'The Upper Room & Last Supper',
        scripture: 'Jeremiah 31:31 / Luke 22:19-20',
        description: 'Jesus institutes Lord’s Supper: "This cup is the new covenant in my blood, which is poured out for you."',
        isPropheticFulfillment: true
      },
      {
        year: '33 AD',
        event: 'Crucifixion at Golgotha & Bodily Resurrection',
        scripture: 'Psalm 22:16 / Isaiah 53:5 / Matthew 28:1-10',
        description: 'Christ cries "It is finished", temple veil torn top to bottom; raises imperishable on the third day, conquering death.',
        isPropheticFulfillment: true
      }
    ]
  },
  {
    id: 'era-apostolic-missions',
    name: 'The Apostolic Era & Expansion of the Church',
    period: '33 – 100 AD',
    testament: 'NT',
    covenantFocus: 'Gentile Inclusion into the Abrahamic Family',
    keyFigures: ['Peter', 'Stephen', 'Philip', 'Paul', 'Barnabas', 'James the Just', 'John'],
    canonicalBooks: ['Acts', 'Pauline Epistles (13)', 'Hebrews', 'General Epistles (7)', 'Revelation'],
    summary: 'Pentecost baptism in the Holy Spirit; martyrdom of Stephen and dispersal of believers; conversion of Paul and three epic missionary journeys through Roman world; destruction of Jerusalem Temple (70 AD); completion of canonical Revelation on Patmos.',
    milestones: [
      {
        year: '33 AD',
        event: 'Day of Pentecost: Spirit Poured on All Flesh',
        scripture: 'Joel 2:28 / Acts 2:1-41',
        description: 'Tongues of fire appear; 3,000 baptized; the New Covenant international community of disciples launched.',
        isPropheticFulfillment: true
      },
      {
        year: 'c. 34 AD',
        event: 'Martyrdom of Stephen & Damascus Road Conversion of Saul',
        scripture: 'Acts 7:54-60; 9:1-19',
        description: 'Stephen sees the Son of Man standing at right hand of God; Saul encounters the risen Christ in blinding light.'
      },
      {
        year: '49 AD',
        event: 'Jerusalem Council (Acts 15)',
        scripture: 'Amos 9:11 / Acts 15:13-19',
        description: 'Apostles confirm gentiles enter the covenant through grace by faith without submitting to Mosaic circumcision.'
      },
      {
        year: '70 AD',
        event: 'Roman Destruction of Jerusalem & Herod’s Temple',
        scripture: 'Daniel 9:26 / Mark 13:1-2',
        description: 'Titus besieges Jerusalem; the Second Temple burned and dismantled stone by stone exactly as Jesus foretold.',
        isPropheticFulfillment: true
      },
      {
        year: 'c. 95 AD',
        event: 'The Apocalypse on Patmos: Vision of New Jerusalem',
        scripture: 'Revelation 1:9; 21:1-4',
        description: 'Exiled apostle John receives the unveiling of the reigning Christ and the descent of the New Jerusalem.'
      }
    ]
  }
];
