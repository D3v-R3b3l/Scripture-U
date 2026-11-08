export interface ChapterSummary {
  chapter: number;
  title: string;
  keyPassage: string;
  theologicalFocus: string;
  notableVerses: { verse: number; text: string }[];
}

export const BOOK_CHAPTER_DATA: Record<string, Record<number, ChapterSummary>> = {
  GEN: {
    1: {
      chapter: 1,
      title: 'The Sovereign Creation of the Cosmos',
      keyPassage: 'Genesis 1:1, 26-27',
      theologicalFocus: 'Creation ex nihilo by divine fiat; humanity established as imago Dei and vice-regents.',
      notableVerses: [
        { verse: 1, text: 'In the beginning, God created the heavens and the earth.' },
        { verse: 2, text: 'The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.' },
        { verse: 27, text: 'So God created man in his own image, in the image of God he created him; male and female he created them.' },
        { verse: 31, text: 'And God saw everything that he had made, and behold, it was very good.' }
      ]
    },
    2: {
      chapter: 2,
      title: 'The Garden Sanctuary & The First Marriage',
      keyPassage: 'Genesis 2:7, 15, 24',
      theologicalFocus: 'Eden as archetype cosmic temple; covenant of works and sacred union of husband and wife.',
      notableVerses: [
        { verse: 7, text: 'Then the LORD God formed the man of dust from the ground and breathed into his nostrils the breath of life, and the man became a living creature.' },
        { verse: 15, text: 'The LORD God took the man and put him in the garden of Eden to work it and keep it.' },
        { verse: 24, text: 'Therefore a man shall leave his father and his mother and hold fast to his wife, and they shall become one flesh.' }
      ]
    },
    3: {
      chapter: 3,
      title: 'The Fall of Humanity & The Protoevangelium',
      keyPassage: 'Genesis 3:15, 21',
      theologicalFocus: 'The entrance of sin, shame, and death; the inaugural seed promise of the Serpent-Crusher.',
      notableVerses: [
        { verse: 6, text: 'She took of its fruit and ate, and she also gave some to her husband who was with her, and he ate.' },
        { verse: 15, text: 'I will put enmity between you and the woman, and between your offspring and her offspring; he shall bruise your head, and you shall bruise his heel.' },
        { verse: 21, text: 'And the LORD God made for Adam and for his wife garments of skins and clothed them.' }
      ]
    },
    12: {
      chapter: 12,
      title: 'The Call of Abram & The Seed Promise',
      keyPassage: 'Genesis 12:1-3',
      theologicalFocus: 'The sovereign election of Abraham; blessing to all nations through the singular Seed.',
      notableVerses: [
        { verse: 1, text: 'Now the LORD said to Abram, "Go from your country and your kindred and your father\'s house to the land that I will show you."' },
        { verse: 2, text: 'And I will make of you a great nation, and I will bless you and make your name great, so that you will be a blessing.' },
        { verse: 3, text: 'I will bless those who bless you, and him who dishonors you I will curse, and in you all the families of the earth shall be blessed.' }
      ]
    },
    15: {
      chapter: 15,
      title: 'The Covenant Ceremony & Justification by Faith',
      keyPassage: 'Genesis 15:6, 17',
      theologicalFocus: 'Righteousness imputed through belief; the self-maledictory covenant oath sworn by God alone.',
      notableVerses: [
        { verse: 6, text: 'And he believed the LORD, and he counted it to him as righteousness.' },
        { verse: 17, text: 'When the sun had gone down and it was dark, behold, a smoking fire pot and a flaming torch passed between these pieces.' },
        { verse: 18, text: 'On that day the LORD made a covenant with Abram, saying, "To your offspring I give this land."' }
      ]
    },
    22: {
      chapter: 22,
      title: 'The Akedah: Binding of Isaac on Mount Moriah',
      keyPassage: 'Genesis 22:8, 14',
      theologicalFocus: 'The test of sacrificial obedience; Yahweh Yireh provides the substitute ram.',
      notableVerses: [
        { verse: 8, text: 'Abraham said, "God will provide for himself the lamb for a burnt offering, my son."' },
        { verse: 13, text: 'And Abraham lifted up his eyes and looked, and behold, behind him was a ram, caught in a thicket by his horns.' },
        { verse: 14, text: 'So Abraham called the name of that place, "The LORD will provide"; as it is said to this day, "On the mount of the LORD it shall be provided."' }
      ]
    }
  },
  EXO: {
    3: {
      chapter: 3,
      title: 'The Burning Bush & The Divine Name Ehyeh',
      keyPassage: 'Exodus 3:14',
      theologicalFocus: 'The self-existent, eternal God revealed as YHWH to commission Moses for redemption.',
      notableVerses: [
        { verse: 5, text: 'Then he said, "Do not come near; take your sandals off your feet, for the place on which you are standing is holy ground."' },
        { verse: 14, text: 'God said to Moses, "I AM WHO I AM." And he said, "Say this to the people of Israel: \'I AM has sent me to you.\'"' }
      ]
    },
    12: {
      chapter: 12,
      title: 'The Passover Lamb & The Midnight Deliverance',
      keyPassage: 'Exodus 12:13',
      theologicalFocus: 'The blood of the unblemished yearling male shields the household from divine wrath.',
      notableVerses: [
        { verse: 5, text: 'Your lamb shall be without blemish, a male a year old. You may take it from the sheep or from the goats.' },
        { verse: 13, text: 'The blood shall be a sign for you, on the houses where you are. And when I see the blood, I will pass over you, and no plague will befall you.' }
      ]
    },
    20: {
      chapter: 20,
      title: 'The Ten Commandments at Sinai',
      keyPassage: 'Exodus 20:1-3',
      theologicalFocus: 'The moral law of God given in thunder and smoke to the redeemed covenant people.',
      notableVerses: [
        { verse: 2, text: 'I am the LORD your God, who brought you out of the land of Egypt, out of the house of slavery.' },
        { verse: 3, text: 'You shall have no other gods before me.' }
      ]
    }
  },
  PSA: {
    22: {
      chapter: 22,
      title: 'The Suffering King & The Pierced One',
      keyPassage: 'Psalm 22:1, 16-18',
      theologicalFocus: 'Davidic prophetic lament anticipating the exact details of Christ’s crucifixion and global victory.',
      notableVerses: [
        { verse: 1, text: 'My God, my God, why have you forsaken me? Why are you so far from saving me, from the words of my groaning?' },
        { verse: 16, text: 'For dogs encompass me; a company of evildoers encircles me; they have pierced my hands and feet.' },
        { verse: 18, text: 'They divide my garments among them, and for my clothing they cast lots.' },
        { verse: 27, text: 'All the ends of the earth shall remember and turn to the LORD, and all the families of the nations shall worship before you.' }
      ]
    },
    23: {
      chapter: 23,
      title: 'The Lord is My Shepherd',
      keyPassage: 'Psalm 23:1-4',
      theologicalFocus: 'The steadfast covenant care, protection, and eternal hospitality of Yahweh the Good Shepherd.',
      notableVerses: [
        { verse: 1, text: 'The LORD is my shepherd; I shall not want.' },
        { verse: 4, text: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.' },
        { verse: 6, text: 'Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the house of the LORD forever.' }
      ]
    },
    110: {
      chapter: 110,
      title: 'The King-Priest After Melchizedek',
      keyPassage: 'Psalm 110:1, 4',
      theologicalFocus: 'The exaltation of the Davidic Lord to God’s right hand and the eternal royal priesthood.',
      notableVerses: [
        { verse: 1, text: 'The LORD says to my Lord: "Sit at my right hand, until I make your enemies your footstool."' },
        { verse: 4, text: 'The LORD has sworn and will not change his mind, "You are a priest forever after the order of Melchizedek."' }
      ]
    }
  },
  ISA: {
    7: {
      chapter: 7,
      title: 'The Sign of Immanuel',
      keyPassage: 'Isaiah 7:14',
      theologicalFocus: 'The virgin maiden conceives the divine child who is "God With Us".',
      notableVerses: [
        { verse: 14, text: 'Therefore the Lord himself will give you a sign. Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel.' }
      ]
    },
    9: {
      chapter: 9,
      title: 'Unto Us a Child is Born',
      keyPassage: 'Isaiah 9:6-7',
      theologicalFocus: 'The Prince of Peace on David’s throne possessing divine titles and an unending reign.',
      notableVerses: [
        { verse: 6, text: 'For to us a child is born, to us a son is given; and the government shall be upon his shoulder, and his name shall be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace.' },
        { verse: 7, text: 'Of the increase of his government and of peace there will be no end, on the throne of David and over his kingdom, to establish it and to uphold it with justice and with righteousness.' }
      ]
    },
    53: {
      chapter: 53,
      title: 'The Pierced Servant: Penal Substitutionary Atonement',
      keyPassage: 'Isaiah 53:4-6, 11',
      theologicalFocus: 'The innocent Servant of Yahweh crushed for transgressions to justify the many.',
      notableVerses: [
        { verse: 4, text: 'Surely he has borne our griefs and carried our sorrows; yet we esteemed him stricken, smitten by God, and afflicted.' },
        { verse: 5, text: 'But he was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace, and with his wounds we are healed.' },
        { verse: 6, text: 'All we like sheep have gone astray; we have turned—every one—to his own way; and the LORD has laid on him the iniquity of us all.' },
        { verse: 11, text: 'Out of the anguish of his soul he shall see and be satisfied; by his knowledge shall the righteous one, my servant, make many to be accounted righteous, and he shall bear their iniquities.' }
      ]
    }
  },
  JHN: {
    1: {
      chapter: 1,
      title: 'The Eternal Word (Logos) Made Flesh',
      keyPassage: 'John 1:1, 14, 29',
      theologicalFocus: 'Cosmic deity of the Logos; tabernacling among humanity; the Lamb of God.',
      notableVerses: [
        { verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
        { verse: 14, text: 'And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth.' },
        { verse: 29, text: 'The next day he saw Jesus coming toward him, and said, "Behold, the Lamb of God, who takes away the sin of the world!"' }
      ]
    },
    3: {
      chapter: 3,
      title: 'The New Birth & The Lifted Bronze Serpent',
      keyPassage: 'John 3:14-16',
      theologicalFocus: 'Regeneration by the Spirit; the cross prefigured by Numbers 21; eternal life through faith.',
      notableVerses: [
        { verse: 3, text: 'Jesus answered him, "Truly, truly, I say to you, unless one is born again he cannot see the kingdom of God."' },
        { verse: 14, text: 'And as Moses lifted up the serpent in the wilderness, so must the Son of Man be lifted up,' },
        { verse: 16, text: 'For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.' }
      ]
    },
    19: {
      chapter: 19,
      title: 'The Crucifixion & Tetelestai',
      keyPassage: 'John 19:30, 36-37',
      theologicalFocus: 'The Passover Lamb slain; Scripture fulfilled in the unbroker bones and pierced side.',
      notableVerses: [
        { verse: 30, text: 'When Jesus had received the sour wine, he said, "It is finished," and he bowed his head and gave up his spirit.' },
        { verse: 34, text: 'But one of the soldiers pierced his side with a spear, and at once there came out blood and water.' },
        { verse: 37, text: 'And again another Scripture says, "They will look on him whom they have pierced."' }
      ]
    }
  },
  ROM: {
    3: {
      chapter: 3,
      title: 'Universal Guilt & The Propitiation (Hilasterion)',
      keyPassage: 'Romans 3:23-25',
      theologicalFocus: 'All have sinned; justification by grace through the redemption that is in Christ Jesus.',
      notableVerses: [
        { verse: 23, text: 'For all have sinned and fall short of the glory of God,' },
        { verse: 24, text: 'and are justified by his grace as a gift, through the redemption that is in Christ Jesus,' },
        { verse: 25, text: 'whom God put forward as a propitiation by his blood, to be received by faith.' }
      ]
    },
    8: {
      chapter: 8,
      title: 'Life in the Spirit & Inseparable Love',
      keyPassage: 'Romans 8:1, 28, 38-39',
      theologicalFocus: 'No condemnation in Christ; cosmic groaning for redemption; unbreakable golden chain of salvation.',
      notableVerses: [
        { verse: 1, text: 'There is therefore now no condemnation for those who are in Christ Jesus.' },
        { verse: 28, text: 'And we know that for those who love God all things work together for good, for those who are called according to his purpose.' },
        { verse: 38, text: 'For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers,' },
        { verse: 39, text: 'nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord.' }
      ]
    }
  },
  HEB: {
    8: {
      chapter: 8,
      title: 'Mediator of a Better Covenant',
      keyPassage: 'Hebrews 8:6-12',
      theologicalFocus: 'Christ ministers in the true heavenly sanctuary, fulfilling Jeremiah 31’s New Covenant.',
      notableVerses: [
        { verse: 6, text: 'But as it is, Christ has obtained a ministry that is as much more excellent than the old as the covenant he mediates is better, since it is enacted on better promises.' },
        { verse: 10, text: 'For this is the covenant that I will make with the house of Israel after those days, declares the Lord: I will put my laws into their minds, and write them on their hearts.' }
      ]
    },
    11: {
      chapter: 11,
      title: 'The Great Cloud of Witnesses & The Hall of Faith',
      keyPassage: 'Hebrews 11:1-2',
      theologicalFocus: 'Faith as assurance of things hoped for; the patriarchs and prophets seeking a heavenly homeland.',
      notableVerses: [
        { verse: 1, text: 'Now faith is the assurance of things hoped for, the conviction of things not seen.' },
        { verse: 6, text: 'And without faith it is impossible to please him, for whoever would draw near to God must believe that he exists and that he rewards those who seek him.' }
      ]
    }
  },
  REV: {
    21: {
      chapter: 21,
      title: 'The New Heaven, New Earth & The New Jerusalem',
      keyPassage: 'Revelation 21:1-5',
      theologicalFocus: 'The descent of the holy bride city; God dwelling directly with humanity; death banished forever.',
      notableVerses: [
        { verse: 1, text: 'Then I saw a new heaven and a new earth, for the first heaven and the first earth had passed away, and the sea was no more.' },
        { verse: 3, text: 'And I heard a loud voice from the throne saying, "Behold, the dwelling place of God is with man. He will dwell with them, and they will be his people."' },
        { verse: 4, text: 'He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore.' },
        { verse: 5, text: 'And he who was seated on the throne said, "Behold, I am making all things new."' }
      ]
    },
    22: {
      chapter: 22,
      title: 'The River of Life & The Eden Restored',
      keyPassage: 'Revelation 22:1-3, 20',
      theologicalFocus: 'The Tree of Life bears twelve fruits; the curse is no more; "Come, Lord Jesus!"',
      notableVerses: [
        { verse: 1, text: 'Then the angel showed me the river of the water of life, bright as crystal, flowing from the throne of God and of the Lamb.' },
        { verse: 2, text: 'On either side of the river, the tree of life with its twelve kinds of fruit, yielding its fruit each month. The leaves of the tree were for the healing of the nations.' },
        { verse: 3, text: 'No longer will there be anything accursed, but the throne of God and of the Lamb will be in it, and his servants will worship him.' },
        { verse: 20, text: 'He who testifies to these things says, "Surely I am coming soon." Amen. Come, Lord Jesus!' }
      ]
    }
  }
};

export function getChapterExcerpt(bookId: string, chapter: number, bookName: string, bookTheme: string): ChapterSummary {
  if (BOOK_CHAPTER_DATA[bookId] && BOOK_CHAPTER_DATA[bookId][chapter]) {
    return BOOK_CHAPTER_DATA[bookId][chapter];
  }

  // Graceful generative fallback for any of the 1,189 biblical chapters
  return {
    chapter,
    title: `${bookName} Chapter ${chapter}`,
    keyPassage: `${bookName} ${chapter}:1`,
    theologicalFocus: `Canonical development within ${bookName}, contributing to the broader biblical arc of ${bookTheme}.`,
    notableVerses: [
      { verse: 1, text: `The narrative and theological discourse of ${bookName} chapter ${chapter} continues the historical and covenantal revelation of God.` },
      { verse: 2, text: `Key thematic patterns reflect divine sovereignty, covenant fidelity, and prophetic anticipation of redemption.` }
    ]
  };
}
