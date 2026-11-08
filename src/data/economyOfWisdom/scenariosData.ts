export interface ScenarioResourcePool {
  timeHours: number;
  attentionUnits: number;
  fundsDollars: number;
  opportunityNote: string;
}

export interface ScenarioInvestigationItem {
  id: string;
  category: 'Evidence & Source' | 'Affected Person' | 'Wise Counsel' | 'Prayer & Reflection';
  title: string;
  actionLabel: string;
  timeCost: number;
  attentionCost: number;
  fundsCost: number;
  sourceReliability: string;
  distinctionType: 'Fictional Scenario Fact' | 'Character Belief / Testimony' | 'Contemplative Alignment';
  revealedContent: string;
  epistemicNote: string;
  scriptureAnchor?: string;
}

export interface ScenarioInterpretClaim {
  id: string;
  statement: string;
  requiresInvestigationId?: string;
  correctCategory: 'Verified Fact' | 'Unverified Assumption' | 'Open Uncertainty';
  explanation: string;
}

export interface ScenarioRepairOption {
  id: string;
  label: string;
  description: string;
  repairOutcome: string;
  whoBearsCost: string;
  whoReceivesBenefit: string;
}

export interface ScenarioDecisionOption {
  id: string;
  title: string;
  subtitle: string;
  actionType: 'Proportionate Action' | 'Patient Waiting / Further Inquiry' | 'Hasty / Defensive' | 'Self-Protective / Avoidant';
  description: string;
  fundsRequired?: number;
  consequenceTimeline: {
    immediate: string;
    nearTermWeeks: string;
    longTermMonths: string;
  };
  costBearerAnalysis: {
    whoBearsCost: string;
    whoReceivesBenefit: string;
    hiddenOrDelayedEffects: string;
  };
  narrativeEvidenceOfCare: string;
  judgmentEvaluation: {
    qualityOfJudgment: string;
    outcomeDistinction: string;
    roleOfOtherAgentsAndCircumstances: string;
  };
  uninvestigatedMissedFactsNote: string;
  scripturalIllumination: {
    reference: string;
    insight: string;
  }[];
  repairOption: ScenarioRepairOption;
}

export interface WisdomScenario {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  coreThemes: string[];
  contestedInterpretationNote: string;
  initialResources: ScenarioResourcePool;
  encounterNarrative: string[];
  competingResponsibilities: string[];
  stakeholders: {
    name: string;
    role: string;
    vulnerabilityOrStake: string;
  }[];
  investigations: ScenarioInvestigationItem[];
  interpretClaims: ScenarioInterpretClaim[];
  decisions: ScenarioDecisionOption[];
  reflectionPrompts: {
    knownVsAssumed: string;
    motivePrompt: string;
    overlookedVoicePrompt: string;
    repentanceAndRepairPrompt: string;
  };
}

export interface EconomyPrincipleModule {
  id: string;
  title: string;
  coreTension: string;
  explanation: string;
  whoBearsCostExample: string;
  whoReceivesBenefitExample: string;
  scriptureReference: string;
  nonUtilitarianDutyNote: string;
}

export const ECONOMY_PRINCIPLES: EconomyPrincipleModule[] = [
  {
    id: 'econ-verification-cost',
    title: '1. The Cost of Verification vs. The Cost of Being Wrong',
    coreTension: 'Checking facts takes finite time and social courage today; acting on a falsehood inflicts deep relational damage tomorrow.',
    explanation:
      'Verification is never free: it consumes hours, delays the satisfaction of immediate reaction, and may feel awkward. Yet when a community treats verification as "too slow," the cost is shifted onto the innocent who are slandered or the vulnerable who are left unprotected.',
    whoBearsCostExample: 'In "The Rumor," the verifier spends 3 hours of quiet evening time; if skipped, Marcus or the benevolence recipients bear months of broken trust.',
    whoReceivesBenefitExample: 'Both the accused (protected from false claims) and the community (protected by real financial transparency).',
    scriptureReference: 'Proverbs 18:13, 17; Ephesians 4:15',
    nonUtilitarianDutyNote:
      'Bearing truthful witness is a moral obligation before God (Exodus 20:16), not merely a calculation of reputational efficiency.'
  },
  {
    id: 'econ-opportunity-cost',
    title: '2. Opportunity Cost of Pursuing One Question Over Another',
    coreTension: 'Every hour spent dissecting a secondary controversy is an hour unavailable for listening to a neighbor in crisis.',
    explanation:
      'Human attention is strictly finite. Even true propositions vary wildly in weight. Wisdom asks not only "Is this interesting?" but "Is this what love and stewardship require of my attention right now?"',
    whoBearsCostExample: 'Neighbors and family members whose quiet needs go unnoticed while we chase online arguments or status projects.',
    whoReceivesBenefitExample: 'When attention is stewarded wisely, those without loud megaphones receive patient presence.',
    scriptureReference: 'Ephesians 5:15–17; Philippians 1:9–10',
    nonUtilitarianDutyNote:
      'Approving "what is excellent" (Phil 1:10) requires ordering our curiosity around love rather than novelty.'
  },
  {
    id: 'econ-advantage-vs-shared-good',
    title: '3. Personal Advantage vs. Shared Good',
    coreTension: 'Decisions that look efficient on an executive summary often succeed by shifting uncompensated burdens onto people with less power.',
    explanation:
      'Worldly ambition measures success by visible output and upward mobility. The mind of Christ (Philippians 2:3–5) asks who is carrying the weight underneath the stage.',
    whoBearsCostExample: 'In "The Opportunity," hourly warehouse staff lose family weekends and safety margins so a director can report a 30-day launch.',
    whoReceivesBenefitExample: 'When leaders slow the timeline and share credit, the whole team flourishes in sustainable trust.',
    scriptureReference: 'Philippians 2:3–5; Mark 8:36',
    nonUtilitarianDutyNote:
      'Every worker is an image-bearer whose dignity cannot be traded away for aggregate organizational metrics.'
  },
  {
    id: 'econ-sharing-knowledge',
    title: '4. How Sharing Knowledge Increases Its Usefulness',
    coreTension: 'Hoarded knowledge functions as private leverage; shared understanding equips a whole body to serve.',
    explanation:
      'Unlike material currency that diminishes when divided, truth and practical skill multiply when taught to others with patience and humility.',
    whoBearsCostExample: 'The mentor invests unglamorous hours training others and surrenders the ego-boost of being the "indispensable expert."',
    whoReceivesBenefitExample: 'Emerging servants gain competence and confidence, making the community resilient.',
    scriptureReference: '1 Peter 4:10; Colossians 2:2',
    nonUtilitarianDutyNote:
      'Gifts of knowledge are given by God for the common good (1 Corinthians 12:7), never for private monopoly.'
  },
  {
    id: 'econ-overload-attention',
    title: '5. How Information Overload Weakens Attention',
    coreTension: 'Consuming ten fragments of outrage leaves the mind too exhausted for one act of careful discernment.',
    explanation:
      'When we flood our minds with unvetted claims, our capacity for deep reading, prayerful silence, and empathetic listening fractures into reactive impulsiveness.',
    whoBearsCostExample: 'Our own capacity for wise judgment and the people closest to us who receive only our distracted leftovers.',
    whoReceivesBenefitExample: 'Practicing deliberate restraint restores clarity, gentleness, and presence.',
    scriptureReference: 'James 1:19; Romans 12:2',
    nonUtilitarianDutyNote:
      'Accepting creaturely limits is an act of reverence: only God is omniscient.'
  },
  {
    id: 'econ-wise-boundaries',
    title: '6. How Wise Boundaries Sustain Service',
    coreTension: 'Saying "yes" to every demand without discernment leads to resentment, exhaustion, or enabling harm.',
    explanation:
      'Christlike service is purposeful and truthful, not boundaryless people-pleasing. Setting clear, honest limits—and refusing to enable destructive patterns—protects both the servant and the community.',
    whoBearsCostExample: 'In the short moment, setting a boundary may disappoint someone’s immediate expectation.',
    whoReceivesBenefitExample: 'Over time, clear boundaries preserve integrity, prevent burnout, and foster genuine agency rather than dependency.',
    scriptureReference: 'Galatians 6:2, 5; John 15:4–5',
    nonUtilitarianDutyNote:
      'Safeguard: Humility never means accepting abuse, and love never means enabling harm.'
  },
  {
    id: 'econ-admitting-error',
    title: '7. How Admitting Error Creates Opportunities for Repair',
    coreTension: 'Hiding a mistake protects short-term pride at the price of long-term falsehood; honest confession opens the door to healing.',
    explanation:
      'Because human knowledge is partial, even careful people misjudge. When we value truth and love above ego, admitting "I was wrong" stops compounding harm and models grace-filled accountability.',
    whoBearsCostExample: 'Our pride bears the temporary sting of embarrassment.',
    whoReceivesBenefitExample: 'Those harmed by our misjudgment receive vindication, and the community learns that truth is safer than saving face.',
    scriptureReference: 'James 3:17; 1 Corinthians 13:6',
    nonUtilitarianDutyNote:
      'Repentance and repair are grounded in God’s forgiving grace, not in calculating whether an apology will poll well.'
  }
];

export const WISDOM_SCENARIOS: WisdomScenario[] = [
  // ============================================================================
  // SCENARIO 1: THE RUMOR
  // ============================================================================
  {
    id: 'scenario-rumor',
    number: 1,
    title: 'The Rumor',
    subtitle: 'Truth, verification, confidentiality, accountability, and protecting the vulnerable.',
    coreThemes: ['Verification vs. Gossip', 'Accountability & Protection', 'Source Reliability', 'Speaking Truth in Love'],
    contestedInterpretationNote:
      'Christians often wrestle with how to balance Matthew 18:15 (private inquiry), 1 Timothy 5:19 (requiring multiple witnesses/corroboration), and the urgent moral duty to protect vulnerable people from potential financial or relational harm. This scenario explores why quiet verification and protective safeguards must work together rather than being pitted against each other.',
    initialResources: {
      timeHours: 6,
      attentionUnits: 8,
      fundsDollars: 150,
      opportunityNote: '48 hours before the quarterly diaconal & neighborhood benevolence board meeting.'
    },
    encounterNarrative: [
      'You serve on the oversight committee for a neighborhood benevolence fund that provides emergency rent and utility assistance to families in crisis.',
      'Late Tuesday afternoon, Devon—a passionate volunteer—sends you a urgent message with a cropped screenshot of a bank ledger: “Marcus Vance withdrew $1,800 in cash from the benevolence account last Friday with no recipient name listed. Someone told me Marcus was seen at an expensive restaurant that same evening. We need to expose this before Thursday’s public meeting or we’re complicit!”',
      'At the same time, if money is genuinely missing or procedures are being bypassed, vulnerable applicants waiting on this month’s disbursements could be harmed.'
    ],
    competingResponsibilities: [
      'Protect the integrity of funds meant for families in acute need.',
      'Refuse to spread an unverified accusation that could destroy Marcus’s reputation if false or incomplete.',
      'Ensure genuine accountability without using secrecy as a cover-up if policies were violated.',
      'Respect confidentiality for benevolence recipients whose dignity depends on discretion.'
    ],
    stakeholders: [
      { name: 'Marcus Vance', role: 'Benevolence Coordinator', vulnerabilityOrStake: 'Reputation, livelihood, and trust built over six years of service.' },
      { name: 'Devon', role: 'Volunteer Whistleblower', vulnerabilityOrStake: 'Zealous for justice, but relying on a cropped screenshot and secondhand hearsay.' },
      { name: 'Benevolence Recipients', role: 'Families in Crisis', vulnerabilityOrStake: 'Need both their privacy protected and the benevolence fund kept intact.' },
      { name: 'The Community', role: 'Donors & Neighbors', vulnerabilityOrStake: 'Trusts the committee to be both truthful and fair.' }
    ],
    investigations: [
      {
        id: 'rumor-inv-ledger',
        category: 'Evidence & Source',
        title: 'Inspect the Uncropped Ledger & Voucher Safe',
        actionLabel: 'Audit physical receipts & full ledger entry',
        timeCost: 2,
        attentionCost: 2,
        fundsCost: 0,
        sourceReliability: 'High (Primary Documentary Evidence)',
        distinctionType: 'Fictional Scenario Fact',
        revealedContent:
          'In the locked voucher binder, you find Voucher #409 signed by two diaconal deacons authorizing an emergency $1,800 cash payment to a domestic-violence shelter landlord on behalf of a mother fleeing abuse. Under privacy rules, the recipient’s name is kept in the sealed paper file rather than typed into the digital spreadsheet. However, Marcus failed to enter the voucher reference number (#409) into the digital memo column, violating dual-entry protocol.',
        epistemicNote: 'Distinguishes a procedural recording lapse from embezzlement—something invisible in Devon’s cropped screenshot.'
      },
      {
        id: 'rumor-inv-marcus',
        category: 'Affected Person',
        title: 'Meet Directly & Privately with Marcus Vance',
        actionLabel: 'Hold a direct, non-accusatory inquiry with Marcus',
        timeCost: 2,
        attentionCost: 2,
        fundsCost: 0,
        sourceReliability: 'Medium-High (Direct Firsthand Testimony, subject to verification)',
        distinctionType: 'Character Belief / Testimony',
        revealedContent:
          'Marcus looks exhausted. When asked about Friday’s entry, he immediately opens the safe logbook showing the two deacons’ signatures and the shelter landlord’s signed receipt. He admits: “I was rushing to get the cash to the shelter before 5 PM and forgot to log the voucher number online. And the dinner? My sister paid to take me out for my 40th birthday.”',
        epistemicNote: 'Direct conversation tests whether Marcus has corroborating documentation and explains the context of the restaurant sighting.'
      },
      {
        id: 'rumor-inv-devo-source',
        category: 'Affected Person',
        title: 'Ask Devon About the Source of the Screenshot',
        actionLabel: 'Trace how Devon obtained the cropped image',
        timeCost: 1,
        attentionCost: 1,
        fundsCost: 0,
        sourceReliability: 'Medium (Reveals chain of transmission & motives)',
        distinctionType: 'Character Belief / Testimony',
        revealedContent:
          'Devon admits he didn’t pull the ledger himself; another committee member who clashed with Marcus over budget priorities texted him the cropped image and added the restaurant rumor.',
        epistemicNote: 'Reveals how rivalry (Philippians 2:3) and selective cropping shaped the information Devon received.'
      },
      {
        id: 'rumor-inv-counsel',
        category: 'Wise Counsel',
        title: 'Consult Miriam, a Retired Nonprofit Auditor & Elder',
        actionLabel: 'Seek independent procedural counsel ($50 audit template review)',
        timeCost: 1,
        attentionCost: 1,
        fundsCost: 50,
        sourceReliability: 'High (Experienced, impartial governance counsel)',
        distinctionType: 'Character Belief / Testimony',
        revealedContent:
          'Miriam advises: “Never adjudicate an allegation by group chat. Verify the paper trail with two witnesses. If the funds went to a confidential shelter case, you must protect the family’s anonymity while still correcting the missing voucher number and requiring dual sign-off on digital logs going forward.”',
        epistemicNote: 'Models how wise counsel integrates truth, confidentiality, and structural safeguards.'
      },
      {
        id: 'rumor-inv-prayer',
        category: 'Prayer & Reflection',
        title: 'Pause for Prayer & Motive Examination',
        actionLabel: 'Pray for discernment, impartiality, and courage (Phil 1:9–10)',
        timeCost: 1,
        attentionCost: 0,
        fundsCost: 0,
        sourceReliability: 'Spiritual Formation & Motive Alignment (Does not reveal empirical facts)',
        distinctionType: 'Contemplative Alignment',
        revealedContent:
          'In stillness before God, you ask whether you are more tempted by the drama of a scandal or the cowardice of avoiding conflict. You are reminded of James 3:17: wisdom from above is first pure, then peaceable, gentle, open to reason, and impartial.',
        epistemicNote: 'Prayer steadies your heart to care equally about truth, the vulnerable, and fairness to Marcus—without magically telling you what is inside the safe.',
        scriptureAnchor: 'James 3:17'
      }
    ],
    interpretClaims: [
      {
        id: 'rumor-claim-1',
        statement: 'A $1,800 cash withdrawal was recorded on Friday without a recipient name in the digital memo field.',
        correctCategory: 'Verified Fact',
        explanation: 'This specific observation is visible on the ledger itself, though its meaning requires further context.'
      },
      {
        id: 'rumor-claim-2',
        statement: 'Marcus stole benevolence money to pay for an expensive dinner.',
        requiresInvestigationId: 'rumor-inv-ledger',
        correctCategory: 'Unverified Assumption',
        explanation: 'Conflates a missing memo field and a secondhand restaurant sighting into an accusation of theft without checking the voucher safe.'
      },
      {
        id: 'rumor-claim-3',
        statement: 'Whether other past confidential disbursements also lacked voucher numbers in the digital log.',
        correctCategory: 'Open Uncertainty',
        explanation: 'Even after verifying Friday’s voucher #409, a broader review of past logs is needed to know if this clerical omission happened before.'
      }
    ],
    decisions: [
      {
        id: 'rumor-dec-proportionate',
        title: 'Verify Documentation, Protect Confidentiality, and Institute Dual-Log Reform',
        subtitle: 'Confirm Voucher #409 with co-signers, clear Marcus of theft privately with Devon, and tighten memo protocols.',
        actionType: 'Proportionate Action',
        description:
          'Together with Miriam, you verify the physical shelter receipt and the two deacons’ signatures. You meet with Devon to show that the funds were legitimately disbursed under privacy rules (without exposing the shelter family’s identity), correct Marcus on the missing voucher number, and institute a rule that confidential cases must log a redacted Voucher ID in the digital sheet.',
        consequenceTimeline: {
          immediate: 'Devon is initially embarrassed but grateful he did not post a false accusation publicly. Marcus feels heard yet rightly accountable for clerical accuracy.',
          nearTermWeeks: 'At Thursday’s board meeting, you present a clean audit summary and the updated Voucher ID policy. The committeemember who leaked the cropped screenshot quietly drops the rivalry.',
          longTermMonths: 'The domestic-violence survivor remains safe and anonymous, donors’ trust in the fund deepens, and Marcus works with renewed care and humility.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'You and Miriam invest evening hours verifying records; Marcus accepts correction on his rushed bookkeeping.',
          whoReceivesBenefit: 'The shelter family (privacy kept), Marcus (saved from false slander), Devon (saved from bearing false witness), and the whole community.',
          hiddenOrDelayedEffects: 'Establishing a clear redaction protocol prevents future misunderstandings without compromising survivor safety.'
        },
        narrativeEvidenceOfCare:
          'Marcus tells you two weeks later: “Thank you for actually looking at the voucher book instead of either firing me on a rumor or sweeping the question under the rug.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'High epistemic and relational faithfulness: united love and truth by verifying primary evidence while protecting vulnerable confidentiality.',
          outcomeDistinction: 'Both judgment and outcome align well here, though Devon’s initial hurt pride required patient conversation.',
          roleOfOtherAgentsAndCircumstances: 'Marcus’s willingness to own his clerical haste and the deacons’ clear paper receipts made swift verification possible.'
        },
        uninvestigatedMissedFactsNote:
          'If you chose this without inspecting the ledger first, you had to scramble at the meeting to verify the facts on the spot.',
        scripturalIllumination: [
          { reference: 'Ephesians 4:15', insight: 'Speaking the truth in love protected both Marcus’s name and the integrity of the benevolence stewardship.' },
          { reference: 'James 3:17', insight: 'Impartial, reasonable inquiry defused bitter rivalry before it fractured the community.' }
        ],
        repairOption: {
          id: 'rumor-rep-1',
          label: 'Follow Up with the Committee Member Who Cropped the Screenshot',
          description: 'Hold a private, constructive conversation addressing the breach of board trust and inviting honest dialogue about budget disagreements.',
          repairOutcome: 'Brings hidden faction-building into the light with gentleness and firm boundaries.',
          whoBearsCost: 'Requires an uncomfortable 45-minute conversation.',
          whoReceivesBenefit: 'Restores healthier board culture.'
        }
      },
      {
        id: 'rumor-dec-wait',
        title: 'Place a Temporary Hold & Commission a 48-Hour Two-Elder Audit Before Speaking',
        subtitle: 'Refuse to circulate the rumor, ask Devon to pause, and formally audit the last quarter’s vouchers.',
        actionType: 'Patient Waiting / Further Inquiry',
        description:
          'Recognizing that you do not yet have the full picture, you ask Devon to hold strict silence for 48 hours while two independent elders audit the physical safe and bank statements before any public statement is made.',
        consequenceTimeline: {
          immediate: 'Devon feels tense about waiting 48 hours, and Marcus senses formality during the audit.',
          nearTermWeeks: 'The audit confirms Voucher #409 is completely legitimate and finds two other rushed memo omissions, which are corrected.',
          longTermMonths: 'The thoroughness of the 48-hour review establishes an unassailable standard of fairness and transparency.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'Two days of emotional suspense for Devon and administrative time for the two elders.',
          whoReceivesBenefit: 'Complete documentary clarity before a single word is spoken in public.',
          hiddenOrDelayedEffects: 'Slows down reactive panic and trains the committee in patient due process.'
        },
        narrativeEvidenceOfCare:
          'Devon reflects afterward: “Waiting 48 hours felt agonizing on Tuesday, but it kept me from slandering an innocent man.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Sound, prudent restraint that honors due process and refuses to be stampeded by artificial urgency.',
          outcomeDistinction: 'Even though waiting created 48 hours of tension, the judgment was wise and protective.',
          roleOfOtherAgentsAndCircumstances: 'Devon’s willingness to honor your request for a 48-hour pause prevented a leak.'
        },
        uninvestigatedMissedFactsNote: 'The formal audit surfaces the missing context systematically.',
        scripturalIllumination: [
          { reference: 'Proverbs 2:6', insight: 'Seeking understanding patiently rather than reacting to raw information.' },
          { reference: '1 Corinthians 13:4–6', insight: 'Love is patient and rejoices with the truth.' }
        ],
        repairOption: {
          id: 'rumor-rep-2',
          label: 'Affirm Marcus Publicly at the Board Meeting',
          description: 'Once the audit clears him, explicitly thank Marcus for his six years of faithful care so no lingering cloud remains.',
          repairOutcome: 'Rebuilds relational warmth after a formal audit process.',
          whoBearsCost: 'None—requires intentional gratitude.',
          whoReceivesBenefit: 'Marcus and his family.'
        }
      },
      {
        id: 'rumor-dec-hasty',
        title: 'Confront Marcus Publicly & Demand Immediate Suspension at the Meeting',
        subtitle: 'Act immediately on Devon’s screenshot to show zero tolerance for financial impropriety.',
        actionType: 'Hasty / Defensive',
        description:
          'Wanting to prove that the committee takes stewardship seriously, you circulate Devon’s screenshot to the whole board and call for Marcus’s suspension before checking the locked voucher binder.',
        consequenceTimeline: {
          immediate: 'The boardroom erupts. To defend himself, Marcus has to pull out Voucher #409 in front of twelve people—inadvertently revealing details that allow two attendees to guess which family fled to the domestic-violence shelter.',
          nearTermWeeks: 'Marcus is completely vindicated of theft, leaving you and Devon deeply discredited. Worse, the shelter family hears that their case was discussed in a heated meeting and feels terrified and betrayed.',
          longTermMonths: 'Marcus resigns out of grief over how quickly he was condemned without a private conversation; vulnerable neighbors hesitate to ask the church for confidential help.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'Marcus (public humiliation) and the domestic-violence survivor (compromised confidentiality and safety).',
          whoReceivesBenefit: 'Only a fleeting 10-minute illusion of moral crusading for you and Devon.',
          hiddenOrDelayedEffects: 'Destroys the psychological safety required for confidential benevolence care.'
        },
        narrativeEvidenceOfCare:
          'One of the deacons who co-signed Voucher #409 says quietly: “If you had walked ten feet to the safe and asked us, none of this harm would have happened.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Poor judgment: mistook raw, cropped information for verified knowledge and prioritized performative toughness over loving care.',
          outcomeDistinction: 'Demonstrates how zeal without knowledge and discernment (Phil 1:9) inflicts real harm on innocent people.',
          roleOfOtherAgentsAndCircumstances: 'The partisan committee member who cropped the screenshot exploited your haste.'
        },
        uninvestigatedMissedFactsNote:
          'Because Voucher #409 was not inspected beforehand, the truth came out only through a painful public collision.',
        scripturalIllumination: [
          { reference: '1 Corinthians 8:1–2', insight: 'Acting with high confidence on partial information wounded multiple neighbors.' },
          { reference: 'James 3:14–16', insight: 'Hasty zeal fueled by background rivalry produced disorder rather than righteousness.' }
        ],
        repairOption: {
          id: 'rumor-rep-3',
          label: 'Offer Full Public Confession, Apologize to Marcus & the Shelter Family, and Step Back to Make Amends',
          description: 'Own the failure to verify without making excuses, fund secure relocation support for the family, and ask Marcus’s forgiveness.',
          repairOutcome: 'Does not erase the pain, but honest repentance stops defensive spin and begins genuine restoration.',
          whoBearsCost: 'You bear the humbling cost of public confession and restitution.',
          whoReceivesBenefit: 'Marcus’s good name is publicly cleared and the family receives tangible protection.'
        }
      },
      {
        id: 'rumor-dec-dismiss',
        title: 'Dismiss Devon’s Concern Out of Hand to Protect Harmony',
        subtitle: 'Tell Devon that questioning a longtime servant like Marcus is divisive and unloving.',
        actionType: 'Self-Protective / Avoidant',
        description:
          'Assuming Marcus would never make a mistake—and wanting to avoid an uncomfortable conversation—you rebuke Devon for bringing up the ledger and refuse to look into the Friday entry at all.',
        consequenceTimeline: {
          immediate: 'Surface calm is preserved for 24 hours, but Devon feels silenced and concludes the board is running a cover-up.',
          nearTermWeeks: 'Frustrated by your refusal to look at the ledger, the rival committee member leaks the screenshot wider. Meanwhile, because nobody corrected Marcus’s missing memo numbers, three more entries go unindexed.',
          longTermMonths: 'When the annual external review arrives, the unindexed entries trigger a much larger crisis of confidence that a simple 2-hour check would have prevented.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'Future donors, recipients, and Marcus himself (who was denied timely, constructive administrative feedback).',
          whoReceivesBenefit: 'Only your immediate desire for an easy Tuesday evening.',
          hiddenOrDelayedEffects: 'Confuses conflict-avoidance with Christian peace, breeding cynicism among volunteers.'
        },
        narrativeEvidenceOfCare:
          'Devon tells a peer: “I tried to raise a legitimate governance question through proper channels, and I was treated like an enemy for asking.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Flawed judgment: equated love with refusing accountability and mistook loyalty to a friend for faithfulness to truth.',
          outcomeDistinction: 'Even though Marcus was not stealing, refusing to verify left both Marcus and the fund vulnerable.',
          roleOfOtherAgentsAndCircumstances: 'Unaddressed rumors rarely vanish when suppressed without truthful verification.'
        },
        uninvestigatedMissedFactsNote: 'You never discovered either the shelter voucher or the clerical gap that needed fixing.',
        scripturalIllumination: [
          { reference: '1 Corinthians 13:6', insight: 'Love rejoices with the truth; it never fears honest verification.' },
          { reference: 'Philippians 1:9–10', insight: 'Affection without discernment fails to test what is excellent.' }
        ],
        repairOption: {
          id: 'rumor-rep-4',
          label: 'Apologize to Devon for Dismissing Him & Conduct the Proper Audit Together',
          description: 'Acknowledge that asking for verification was legitimate, inspect the voucher log transparently, and update the policy.',
          repairOutcome: 'Regains Devon’s trust and establishes healthy accountability.',
          whoBearsCost: 'Requires admitting your defensive reaction was wrong.',
          whoReceivesBenefit: 'Devon, Marcus, and the integrity of the board.'
        }
      }
    ],
    reflectionPrompts: {
      knownVsAssumed: 'When you first saw the message about the $1,800 withdrawal, what did you actually know from the screenshot versus what story did your mind immediately supply?',
      motivePrompt: 'Were you more drawn toward the urgency of exposing wrongdoing, the comfort of avoiding conflict, or the patient work of protecting both truth and neighbor?',
      overlookedVoicePrompt: 'How easily did the domestic-violence survivor—whose name could not appear on the digital ledger—get overlooked in the initial debate?',
      repentanceAndRepairPrompt: 'Where have you either repeated an unverified claim or shut down a legitimate question to keep superficial peace?'
    }
  },

  // ============================================================================
  // SCENARIO 2: THE OPPORTUNITY
  // ============================================================================
  {
    id: 'scenario-opportunity',
    number: 2,
    title: 'The Opportunity',
    subtitle: 'Ambition, stewardship, service, and the hidden costs shifted onto people with less power.',
    coreThemes: ['Ambition vs. Stewardship', 'Hidden Costs & Power Asymmetry', 'Mind of Christ (Phil 2)', 'Honest Forecasting'],
    contestedInterpretationNote:
      'Christians hold varied perspectives on professional ambition and leadership advancement. Scripture commends diligent stewardship of talents (1 Peter 4:10; Matthew 25), yet sharply warns against selfish ambition (eritheia, Philippians 2:3; James 3:14) that advances oneself by exploiting or overlooking those with less institutional power.',
    initialResources: {
      timeHours: 7,
      attentionUnits: 8,
      fundsDollars: 200,
      opportunityNote: 'Executive Vice President expects your proposal and acceptance by Friday noon.'
    },
    encounterNarrative: [
      'You have been invited to step into the Regional Operations Director role at a medical-supply distribution organization that serves rural clinics.',
      'The promotion carries a 25% salary increase, a seat on the executive council, and real influence to expand clinic partnerships. However, the Vice President attaches a condition: to impress the board at next month’s summit, you must pledge to complete the warehouse automation transition in 30 days instead of the 90 days originally scheduled.',
      'You know the high-level software dashboard looks ready, but you have not yet examined what a 30-day compression will do to the 18 hourly night-shift packers and drivers—many of whom are parents working second jobs.'
    ],
    competingResponsibilities: [
      'Steward your leadership gifts to serve rural clinics and provide for your household.',
      'Attend to the safety, family life, and fair compensation of hourly warehouse workers who have no voice in the executive suite.',
      'Give the Vice President an honest assessment rather than promising a flattering number that hides operational and human risks.',
      'Ensure rural clinics do not suffer shipment errors caused by a rushed transition.'
    ],
    stakeholders: [
      { name: 'Night-Shift Warehouse Team (led by Tomas)', role: '18 Hourly Packers & Drivers', vulnerabilityOrStake: 'Have no overtime buffer; forced 60-hour weeks or scanner bugs will jeopardize their childcare, health, and safety.' },
      { name: 'Rural Clinic Nurses', role: 'Downstream Recipients', vulnerabilityOrStake: 'Depend on accurate cold-chain insulin and vaccine deliveries.' },
      { name: 'Vice President Vance', role: 'Hiring Executive', vulnerabilityOrStake: 'Eager for a headline win at next month’s board summit.' },
      { name: 'Your Household', role: 'Family Dependents', vulnerabilityOrStake: 'Would genuinely benefit from the increased income, but also needs your integrity intact.' }
    ],
    investigations: [
      {
        id: 'opp-inv-floor',
        category: 'Affected Person',
        title: 'Walk the Night-Shift Floor & Listen to Tomas (Shift Lead)',
        actionLabel: 'Spend 2 hours with the night-shift crew at 10 PM',
        timeCost: 2,
        attentionCost: 2,
        fundsCost: 0,
        sourceReliability: 'High (Direct operational reality from frontline workers)',
        distinctionType: 'Fictional Scenario Fact',
        revealedContent:
          'Tomas shows you the handheld scanners in the cold-storage bay: the new software patch currently drops barcode reads below 38°F, forcing workers to manually key in 300 serial numbers per pallet. Compressing the rollout into 30 days without fixing the cold-bay bug would require mandatory 14-hour Saturday shifts for four weeks—and three workers will lose their childcare and have to quit.',
        epistemicNote: 'Frontline workers possess crucial empirical knowledge that never appears on executive slide decks.'
      },
      {
        id: 'opp-inv-clinics',
        category: 'Evidence & Source',
        title: 'Review Cold-Chain Error Logs from the Pilot Site',
        actionLabel: 'Analyze pilot data from the Northern depot',
        timeCost: 2,
        attentionCost: 2,
        fundsCost: 0,
        sourceReliability: 'High (Empirical quality-control telemetry)',
        distinctionType: 'Fictional Scenario Fact',
        revealedContent:
          'When the Northern depot tried a 30-day blitz last year, manual-entry fatigue caused a 4.2% mis-shipment rate on temperature-sensitive medications, spoiling $18,000 of rural clinic supplies.',
        epistemicNote: 'Reveals that an "efficient" 30-day timeline actually creates severe downstream waste and patient risk.'
      },
      {
        id: 'opp-inv-vp',
        category: 'Affected Person',
        title: 'Probe the Vice President’s Underlying Goal for the Summit',
        actionLabel: 'Ask the VP what the board actually needs to see next month',
        timeCost: 1,
        attentionCost: 1,
        fundsCost: 0,
        sourceReliability: 'Medium-High (Clarifies institutional incentives)',
        distinctionType: 'Character Belief / Testimony',
        revealedContent:
          'In a candid moment, the VP admits the board itself never mandated 30 days—he invented the 30-day target because he wants proof that the project isn’t stalling. What the board actually cares about is zero cold-chain spoilage and verifiable milestone progress.',
        epistemicNote: 'Distinguishes an arbitrary status deadline from the organization’s true mission.'
      },
      {
        id: 'opp-inv-counsel',
        category: 'Wise Counsel',
        title: 'Discuss the Offer with Your Spouse & a Seasoned Mentor',
        actionLabel: 'Weigh financial desires against long-term calling',
        timeCost: 1,
        attentionCost: 1,
        fundsCost: 0,
        sourceReliability: 'High (Relational & ethical grounding)',
        distinctionType: 'Character Belief / Testimony',
        revealedContent:
          'Your spouse says: “The extra income would help us, but not if it comes by crushing Tomas’s crew or signing your name to a timeline you know is unsafe. Propose a truthful plan—even if the VP passes you over.”',
        epistemicNote: 'Helps separate legitimate family provision from the fear of losing status.'
      },
      {
        id: 'opp-inv-prayer',
        category: 'Prayer & Reflection',
        title: 'Pause for Prayer on Philippians 2:3–5 & Mark 8:36',
        actionLabel: 'Pray over ambition, service, and the interests of others',
        timeCost: 1,
        attentionCost: 0,
        fundsCost: 0,
        sourceReliability: 'Spiritual Formation & Motive Alignment',
        distinctionType: 'Contemplative Alignment',
        revealedContent:
          'Meditating on Philippians 2:3–4 (“not just looking to his own things, but each of you also to the things of others”), you recognize the temptation to treat the warehouse staff as invisible stepping stones for your resume.',
        epistemicNote: 'Prayer clarifies moral priority so you don’t rationalize away what you learn on the warehouse floor.',
        scriptureAnchor: 'Philippians 2:3–5'
      }
    ],
    interpretClaims: [
      {
        id: 'opp-claim-1',
        statement: 'The handheld scanners currently fail in the sub-38°F cold-storage bay, requiring manual entry.',
        requiresInvestigationId: 'opp-inv-floor',
        correctCategory: 'Verified Fact',
        explanation: 'Directly demonstrated on the warehouse floor by Tomas and corroborated by pilot logs.'
      },
      {
        id: 'opp-claim-2',
        statement: 'The warehouse crew is simply resistant to modern technology and just needs firmer management pressure.',
        correctCategory: 'Unverified Assumption',
        explanation: 'A convenient executive stereotype that blames workers for a hardware/firmware temperature bug.'
      },
      {
        id: 'opp-claim-3',
        statement: 'Whether the VP will accept a staged 60-day rollout with paid overtime or offer the role to another candidate.',
        correctCategory: 'Open Uncertainty',
        explanation: 'You can make a truthful, well-evidenced proposal, but you do not control the VP’s final choice.'
      }
    ],
    decisions: [
      {
        id: 'opp-dec-principled-proposal',
        title: 'Accept Conditionally with a Truthful 60-Day Staged Plan & Paid Worker Protections',
        subtitle: 'Present the cold-bay data, propose a 30-day dry-goods phase + 60-day cold-chain fix, and invite Tomas to co-present.',
        actionType: 'Proportionate Action',
        description:
          'You tell the VP you are eager to lead, but cannot in good conscience sign a 30-day full-blitz pledge that risks clinic insulin spoilage and unpaid worker burnout. Instead, you present a documented 2-phase plan: complete dry-goods automation by the 30-day summit (giving the board a real, honest milestone), fix the cold-bay firmware in days 31–60, and allocate budget for paid shift coverage.',
        consequenceTimeline: {
          immediate: 'The VP bristles for ten minutes at having his 30-day slogan challenged, then pauses when he sees the $18,000 Northern depot spoilage data.',
          nearTermWeeks: 'He accepts your 2-phase proposal—though he trims your first-year bonus by half to fund the temporary shift coverage. Tomas’s crew sees that you stood up for them before you even took the title.',
          longTermMonths: 'At the board summit, the dry-goods phase succeeds with zero cold-chain errors. All 18 warehouse staff remain employed, and rural clinics receive uninterrupted deliveries.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'You sacrifice half of your potential signing bonus and risk the VP’s initial displeasure.',
          whoReceivesBenefit: 'The 18 warehouse workers (protected from uncompensated weekend crunches) and rural clinic patients.',
          hiddenOrDelayedEffects: 'Workers begin reporting technical glitches early because they trust you won’t punish the messenger.'
        },
        narrativeEvidenceOfCare:
          'Tomas tells the night crew: “For the first time in five years, someone upstairs came down here at 10 PM, listened, and put our names on the solution.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Exemplary stewardship: combined empirical homework, structural problem-solving, and Christlike attention to those with less power.',
          outcomeDistinction: 'Notice that faithfulness still carried a real cost (a smaller bonus and a tense meeting), yet produced lasting fruit.',
          roleOfOtherAgentsAndCircumstances: 'The Northern depot’s historical data gave the VP concrete reasons to reconsider.'
        },
        uninvestigatedMissedFactsNote:
          'Without visiting the night shift first, you would not have known why the 30-day timeline was dangerous.',
        scripturalIllumination: [
          { reference: 'Philippians 2:3–4', insight: 'Refused to build personal advancement on the unexamined burdens of others.' },
          { reference: '1 Peter 4:10', insight: 'Used leadership access and analytical skill to serve the team.' }
        ],
        repairOption: {
          id: 'opp-rep-1',
          label: 'Establish a Permanent Frontline Advisory Seat with Tomas',
          description: 'Ensure warehouse leads review all future software rollouts before timelines are promised to executives.',
          repairOutcome: 'Embeds listening into the institution’s ongoing governance.',
          whoBearsCost: 'Adds one hour to monthly planning meetings.',
          whoReceivesBenefit: 'Prevents future blind-spot mandates.'
        }
      },
      {
        id: 'opp-dec-decline',
        title: 'Decline the Promotion & Submit the Safety Report to Protect the Team',
        subtitle: 'Refuse the role if tied to an unsafe mandate, while filing a formal cold-chain risk memo.',
        actionType: 'Patient Waiting / Further Inquiry',
        description:
          'Concluding that the executive culture is too pressured to allow a safe rollout right now, you respectfully decline the promotion, submit the cold-bay bug documentation to Quality Assurance, and remain in your current role.',
        consequenceTimeline: {
          immediate: 'The VP hires an external candidate who promises the 30-day blitz. Your household foregoes the 25% raise.',
          nearTermWeeks: 'Because you filed the formal Quality Assurance memo before declining, QA blocks the external director from rushing the cold-storage bay—saving the insulin shipments and sparing the crew the worst of the crunch.',
          longTermMonths: 'Six months later, after the external candidate leaves for another company, the board chair asks why you predicted the exact cold-bay issue and invites you to advise on operations.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'You and your household bear the real financial cost of turning down the promotion.',
          whoReceivesBenefit: 'Your conscience remains clear, and your QA memo still shields the cold-chain supplies.',
          hiddenOrDelayedEffects: 'Shows that faithful choices do not always result in immediate career advancement.'
        },
        narrativeEvidenceOfCare:
          'A clinic nurse writes to thank the QA team for preventing a repeat of the Northern depot insulin spoilage.',
        judgmentEvaluation: {
          qualityOfJudgment: 'High integrity and self-restraint, though a conditional counter-proposal might have allowed you to protect the crew from inside the role.',
          outcomeDistinction: 'Separates moral faithfulness from career victory: losing the promotion was not a spiritual failure.',
          roleOfOtherAgentsAndCircumstances: 'The QA department’s independence allowed your written report to have protective teeth.'
        },
        uninvestigatedMissedFactsNote: 'Had you spoken further with the VP, you might have discovered he was open to a 2-phase counter-proposal.',
        scripturalIllumination: [
          { reference: 'Mark 8:36', insight: 'Refused to trade integrity and neighbor-care for upward mobility.' }
        ],
        repairOption: {
          id: 'opp-rep-2',
          label: 'Support Tomas & the New Director Constructively Without Bitterness',
          description: 'Share your technical notes generously with the incoming director so the night crew isn’t caught in a turf war.',
          repairOutcome: 'Proves your decision was motivated by love for the team rather than wounded pride.',
          whoBearsCost: 'Requires humility to help a successor succeed.',
          whoReceivesBenefit: 'The warehouse crew and rural clinics.'
        }
      },
      {
        id: 'opp-dec-accept-blitz',
        title: 'Accept the 30-Day Mandate Unconditionally to Secure the Role',
        subtitle: 'Sign the pledge, push the night crew through mandatory Saturdays, and hope to fix bugs later.',
        actionType: 'Hasty / Defensive',
        description:
          'Telling yourself that "once I have the title I can do a lot of good," you promise the VP the 30-day completion and mandate 60-hour weeks for the warehouse staff to hit the summit deadline.',
        consequenceTimeline: {
          immediate: 'You get the promotion, the 25% raise, and applause at the executive announcement.',
          nearTermWeeks: 'In week three, the cold-bay scanner bug forces exhausted packers to type serial numbers by hand at 2 AM. Two single parents lose their childcare and quit; a mis-packed pallet spoils $14,000 of rural clinic vaccines.',
          longTermMonths: 'At the board summit, you have to report the vaccine loss and staff turnover. Even worse, the warehouse crew now views your Christian profession as hollow ambition.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'The hourly warehouse workers (lost jobs, exhaustion) and rural clinic patients (spoiled vaccines).',
          whoReceivesBenefit: 'You received the salary bump and four weeks of executive praise.',
          hiddenOrDelayedEffects: 'Deep cynicism among staff who see that upward mobility was purchased with their exhaustion.'
        },
        narrativeEvidenceOfCare:
          'Tomas says quietly as he hands in his overtime sheet: “You got your seat at the table, but my people paid the bill.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Poor judgment: allowed ambition and the rationalizing promise of "future influence" to override present truthfulness and neighbor-love.',
          outcomeDistinction: 'Initial applause masked structural harm that surfaced three weeks later.',
          roleOfOtherAgentsAndCircumstances: 'Physical reality (sub-38°F scanner failures and human fatigue) cannot be overruled by executive slogans.'
        },
        uninvestigatedMissedFactsNote:
          'Because you did not heed the floor reality or pilot logs, foreseeable harm struck the most vulnerable.',
        scripturalIllumination: [
          { reference: 'Philippians 2:3–4', insight: 'Acting from selfish ambition shifted heavy burdens onto those with less power.' },
          { reference: 'James 3:14–16', insight: 'Boasting against the operational truth produced disorder and real harm.' }
        ],
        repairOption: {
          id: 'opp-rep-3',
          label: 'Take Full Executive Responsibility Before the Board, Pause the Cold-Bay Rollout, and Rehire Affected Staff with Back Pay',
          description: 'Refuse to blame the warehouse crew for the vaccine spoilage; confess to the board that you compressed the timeline against floor warnings, and redirect your bonus to emergency shift relief.',
          repairOutcome: 'Costly to your executive image, but stops the scapegoating of hourly workers and begins rebuilding moral credibility.',
          whoBearsCost: 'You bear the board’s reprimand and surrender your bonus.',
          whoReceivesBenefit: 'Tomas’s team is vindicated and rehired.'
        }
      },
      {
        id: 'opp-dec-delegate-blame',
        title: 'Accept the Role & Outsource the Crunch to a Temporary Agency Without Auditing Quality',
        subtitle: 'Hit the 30-day metric on paper by bringing in untrained temp workers for the cold bay.',
        actionType: 'Self-Protective / Avoidant',
        description:
          'Trying to avoid pushing Tomas’s crew while still telling the VP "yes," you spend the contingency budget on an unvetted temp agency to run the cold bay for 30 days.',
        consequenceTimeline: {
          immediate: 'The 30-day chart looks green at the board summit.',
          nearTermWeeks: 'Untrained temp workers, unfamiliar with cold-chain handling, leave insulated crates unsealed. Tomas’s crew has to spend double hours fixing mislabeled shipments behind the scenes.',
          longTermMonths: 'The total cost exceeds the original 90-day budget by 40%, and clinic trust erodes due to erratic deliveries.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'Tomas’s crew (cleaning up hidden errors) and the organization’s long-term stewardship.',
          whoReceivesBenefit: 'Short-term optics at the summit.',
          hiddenOrDelayedEffects: 'Illustrates how optimizing for a surface metric ("30-day launch") corrupts the actual work.'
        },
        narrativeEvidenceOfCare:
          'A rural clinic director calls: “Your dashboard says 100% automated, but half our boxes arrived with wrong packing slips.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Weak judgment: prioritized the appearance of compliance over speaking truthful limits to the VP.',
          outcomeDistinction: 'Demonstrates Core Distinction #9: immediate metric success does not establish moral or operational goodness.',
          roleOfOtherAgentsAndCircumstances: 'Complex craft cannot be replaced by unvetted shortcuts.'
        },
        uninvestigatedMissedFactsNote: 'Missed the opportunity to address the root firmware and timeline issue honestly.',
        scripturalIllumination: [
          { reference: 'Colossians 3:22–23', insight: 'Working for the Lord rather than merely for eye-service and summit optics.' }
        ],
        repairOption: {
          id: 'opp-rep-4',
          label: 'Retire the Artificial Metric, Audit the Cold-Chain Directly with Tomas, and Report Accurate Numbers',
          description: 'Admit to the VP that the temp workaround masked underlying errors and reset the schedule honestly.',
          repairOutcome: 'Restores operational honesty and relieves the permanent crew.',
          whoBearsCost: 'You absorb the embarrassment of revising a "completed" milestone.',
          whoReceivesBenefit: 'Clinic patients and warehouse staff.'
        }
      }
    ],
    reflectionPrompts: {
      knownVsAssumed: 'What was the difference between what the executive dashboard showed and what the night-shift workers knew on the floor?',
      motivePrompt: 'How easily can the desire to "have greater influence for good" become a rationalization for compromising truth or overlooking people with less power right now?',
      overlookedVoicePrompt: 'Why are hourly night-shift workers and rural clinic nurses so often invisible when timelines are negotiated in daytime conference rooms?',
      repentanceAndRepairPrompt: 'When a decision you made has shifted unfair weight onto someone beneath you in authority, what does concrete repair (not just private regret) require?'
    }
  },

  // ============================================================================
  // SCENARIO 3: THE PERSON IN NEED
  // ============================================================================
  {
    id: 'scenario-need',
    number: 3,
    title: 'The Person in Need',
    subtitle: 'Listening, dignity, practical care, wise boundaries, and the temptation to assume understanding.',
    coreThemes: ['Listening Before Fixing', 'Human Dignity', 'Practical Care & Wise Boundaries', 'Accurate Understanding in Love'],
    contestedInterpretationNote:
      'Christians often debate the relationship between immediate unconditional generosity (Matthew 5:42; 1 John 3:17) and wise stewardship that avoids paternalism or enabling harmful dynamics (2 Thessalonians 3:10–13; Galatians 6:2, 5). This scenario explores how patient listening discovers that many apparent "chronic dependency" cases actually involve structural obstacles that a quick stereotype completely misses.',
    initialResources: {
      timeHours: 5,
      attentionUnits: 7,
      fundsDollars: 300,
      opportunityNote: 'Saturday morning; Elena’s landlord has threatened a lockout notice by Monday at 9 AM.'
    },
    encounterNarrative: [
      'Elena, a single mother of an 8-year-old boy (Mateo) in your neighborhood, approaches you after a Saturday morning community breakfast. She is visibly shaking and asks if you can lend or give her $250 in cash today toward her rent.',
      'Two months ago, a neighbor helped Elena with $150 for groceries, and you overheard someone remark last week: “Elena is sweet, but she just can’t manage a budget—if you give her cash, she’ll be back every month.”',
      'Elena looks exhausted, avoids eye contact, and says quickly: “I’m sorry to bother you. If it’s too much trouble, please forget I asked.”'
    ],
    competingResponsibilities: [
      'Respond with genuine compassion and material care to a neighbor in acute distress (1 John 3:17–18).',
      'Honor Elena’s dignity as an image-bearer rather than treating her as a project or lecturing her based on neighborhood gossip.',
      'Understand what is actually causing the crisis so your help solves the real problem rather than masking a deeper hazard.',
      'Steward your household’s finite time and $300 benevolent margin wisely.'
    ],
    stakeholders: [
      { name: 'Elena', role: 'Neighbor & Certified Nursing Assistant', vulnerabilityOrStake: 'Facing Monday eviction threat while hiding a deeper crisis out of shame.' },
      { name: 'Mateo (age 8)', role: 'Elena’s Son', vulnerabilityOrStake: 'Has suffered three asthma ER visits this autumn due to apartment conditions.' },
      { name: 'Mr. Halvorsen', role: 'Property Landlord', vulnerabilityOrStake: 'Demanding full cash rent while ignoring municipal heating/mold repair orders.' },
      { name: 'Neighborhood Helpers', role: 'Community Members', vulnerabilityOrStake: 'Some want to help; others have grown fatigued and judgmental.' }
    ],
    investigations: [
      {
        id: 'need-inv-listen',
        category: 'Affected Person',
        title: 'Sit Down Over Tea & Listen Unhurriedly to Elena’s Full Story',
        actionLabel: 'Invite Elena to sit somewhere quiet and ask what she & Mateo have been carrying',
        timeCost: 2,
        attentionCost: 2,
        fundsCost: 0,
        sourceReliability: 'High (Firsthand relational listening when safety and dignity are established)',
        distinctionType: 'Fictional Scenario Fact',
        revealedContent:
          'Once Elena realizes you aren’t going to lecture her, she breaks down: she hasn’t been overspending—she lost six shifts at the nursing home this month because Mateo was hospitalized twice with severe asthma triggered by black mold from a leaking pipe in their apartment. Worse, her state Nursing Assistant renewal fee ($85) expires Wednesday; without it, she loses her job altogether.',
        epistemicNote: 'Unmasks the neighborhood gossip ("bad at budgeting") as completely false: the root causes are an unaddressed mold leak, pediatric asthma, and an $85 license renewal cliff.'
      },
      {
        id: 'need-inv-apartment',
        category: 'Evidence & Source',
        title: 'Walk Over to Inspect the Apartment Leak & Lease Notice',
        actionLabel: 'Check the pipe leak, mold damage, and the landlord’s notice',
        timeCost: 1,
        attentionCost: 2,
        fundsCost: 0,
        sourceReliability: 'High (Direct physical & documentary observation)',
        distinctionType: 'Fictional Scenario Fact',
        revealedContent:
          'You see black dampness behind Mateo’s bedroom wall and inspect the "Monday Lockout Notice." The notice is not a court eviction at all—it is an illegal intimidation note slipped under the door by the landlord after Elena asked him in writing to fix the leaking pipe.',
        epistemicNote: 'Empirical inspection reveals that handing $250 cash to the landlord without documenting the illegal notice and mold violation would leave Mateo in a toxic room with no legal receipt.'
      },
      {
        id: 'need-inv-legal-counsel',
        category: 'Wise Counsel',
        title: 'Call David, a Legal-Aid Housing Advocate in the Congregation',
        actionLabel: 'Consult David on tenant repair rights and traceable payment',
        timeCost: 1,
        attentionCost: 1,
        fundsCost: 0,
        sourceReliability: 'High (Domain expertise in housing law & neighbor advocacy)',
        distinctionType: 'Character Belief / Testimony',
        revealedContent:
          'David explains: “Under city code, a landlord cannot lock out a tenant without a court order, nor retaliate for a habitability repair request. Never pay him in untraced cash! Pay the balance by cashier’s check accompanied by a co-signed repair & non-retaliation notice—I can come with you Monday morning at 8:30 AM for free.”',
        epistemicNote: 'Shows how domain expertise turns well-meaning charity into effective protection.'
      },
      {
        id: 'need-inv-prayer',
        category: 'Prayer & Reflection',
        title: 'Pause for Prayer: Seeing Elena as a Sister, Not a Problem',
        actionLabel: 'Pray for gentleness, humility, and practical love (1 John 3:17–18)',
        timeCost: 1,
        attentionCost: 0,
        fundsCost: 0,
        sourceReliability: 'Spiritual Formation & Motive Alignment',
        distinctionType: 'Contemplative Alignment',
        revealedContent:
          'You confess how easy it is to feel superior when someone asks for money. You ask God to help you listen to Elena with the same respect and attentiveness you would want if your own child were sick.',
        epistemicNote: 'Prepares your posture so Elena feels safe enough to share the truth about Mateo’s asthma and her CNA license.',
        scriptureAnchor: '1 John 3:17–18'
      }
    ],
    interpretClaims: [
      {
        id: 'need-claim-1',
        statement: 'Elena is asking for $250 because she is careless with her monthly grocery and household budget.',
        requiresInvestigationId: 'need-inv-listen',
        correctCategory: 'Unverified Assumption',
        explanation: 'Secondhand neighborhood speculation that ignores the missed work shifts from Mateo’s asthma hospitalizations.'
      },
      {
        id: 'need-claim-2',
        statement: 'Elena’s $85 CNA license renewal expires Wednesday, and Mateo’s bedroom has an active pipe leak causing mold.',
        requiresInvestigationId: 'need-inv-listen',
        correctCategory: 'Verified Fact',
        explanation: 'Confirmed by listening to Elena and inspecting the apartment and renewal paperwork.'
      },
      {
        id: 'need-claim-3',
        statement: 'Whether the landlord will repair the pipe promptly once presented with the legal-aid notice or require a city inspection.',
        correctCategory: 'Open Uncertainty',
        explanation: 'David’s legal notice creates strong leverage, but the landlord’s response will still require follow-up.'
      }
    ],
    decisions: [
      {
        id: 'need-dec-holistic',
        title: 'Renew Her $85 CNA License Today, Issue a Traceable $215 Rent Check with Legal-Aid Accompaniment, and Remediate the Leak',
        subtitle: 'Address both the immediate rent threat, the employment cliff, and the toxic mold harming Mateo.',
        actionType: 'Proportionate Action',
        fundsRequired: 300,
        description:
          'After listening to Elena, you pay her $85 CNA license renewal online immediately so her nursing-home job is secure. You place the remaining $215 into a traceable cashier’s check (combined with $35 Elena has saved), arrange for David (the housing advocate) to accompany Elena on Monday morning with a formal repair & receipt notice, and bring a volunteer plumber on Tuesday to fix the valve.',
        consequenceTimeline: {
          immediate: 'Elena weeps with relief—not just because the rent is covered, but because someone believed her and protected her nursing license.',
          nearTermWeeks: 'Faced with a traceable cashier’s check and David’s legal-aid letter on Monday, the landlord backs down from his illegal lockout threat, signs the receipt, and allows the pipe repair.',
          longTermMonths: 'With the mold remediated, Mateo’s asthma stabilizes. Elena works full shifts with her renewed CNA license and, three months later, volunteers at the Saturday breakfast to help another family navigate housing forms.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'You invest your full $300 benevolence margin and 4 hours of Saturday/Monday attentiveness; David contributes pro-bono legal advocacy.',
          whoReceivesBenefit: 'Elena (dignity and job preserved) and 8-year-old Mateo (health and home secured).',
          hiddenOrDelayedEffects: 'Paying the $85 CNA renewal prevented a total income collapse that would have cost thousands next month.'
        },
        narrativeEvidenceOfCare:
          'Elena says: “Everyone else either looked at me with pity or acted like I was lazy. You asked about Mateo and helped me keep my profession.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Wise, loving discernment: refused both stingy cynicism and thoughtless cash handoffs, uniting empathy with accurate root-cause understanding.',
          outcomeDistinction: 'Demonstrates Core Distinction #4: loving intentions require accurate understanding to truly help.',
          roleOfOtherAgentsAndCircumstances: 'Elena’s hard work as a CNA and David’s housing-law expertise worked together with your generosity.'
        },
        uninvestigatedMissedFactsNote:
          'Without listening first, the $85 CNA license cliff and the mold triggering Mateo’s asthma would have remained completely hidden.',
        scripturalIllumination: [
          { reference: '1 John 3:17–18', insight: 'Loved not in word or slogan only, but in concrete deed and truth.' },
          { reference: 'Philippians 1:9', insight: 'Love abounded in knowledge and insight to see what was actually needed.' }
        ],
        repairOption: {
          id: 'need-rep-1',
          label: 'Gently Correct the Neighbor Who Spread the "Bad at Budgeting" Rumor',
          description: 'Without violating Elena’s medical privacy, share how hard Elena works and invite the neighbor to join the practical repair team.',
          repairOutcome: 'Replaces neighborhood gossip with mutual respect.',
          whoBearsCost: 'A brief, honest conversation.',
          whoReceivesBenefit: 'Restores Elena’s standing in the community.'
        }
      },
      {
        id: 'need-dec-quick-cash',
        title: 'Hand Elena $250 Cash Quickly Without Asking Questions',
        subtitle: 'Give the money immediately so she doesn’t feel interrogated, and move on with your Saturday.',
        actionType: 'Hasty / Defensive',
        fundsRequired: 250,
        description:
          'Wanting to be generous and avoid an awkward conversation, you hand Elena $250 in cash at the door with a warm smile and a quick “God bless you!” without sitting down to hear what is happening.',
        consequenceTimeline: {
          immediate: 'Elena thanks you profusely, and you feel a warm glow of generosity—having spent only 5 minutes.',
          nearTermWeeks: 'Elena hands the $250 cash to the landlord, who gives her no written receipt and still refuses to fix the leaking pipe. Three days later, Elena’s $85 CNA license expires because she had no money left to renew it—and the nursing home takes her off the schedule.',
          longTermMonths: 'Now unemployed and still living with black mold, Elena faces an even deeper crisis next month, and cynical neighbors say, “See? Giving her money didn’t help.”'
        },
        costBearerAnalysis: {
          whoBearsCost: 'You spent $250, the unscrupulous landlord pocketed untraced cash without fixing the leak, and Elena lost her job over an unaddressed $85 fee.',
          whoReceivesBenefit: 'The landlord profited from the lack of accountability; you got a quick feeling of charity without investing attention.',
          hiddenOrDelayedEffects: 'Shows how generosity without attentive listening can leave a neighbor trapped in an exploitative situation.'
        },
        narrativeEvidenceOfCare:
          'Elena says quietly a month later: “You were so kind to give me that cash, and I felt too ashamed to tell you my nursing license was expiring three days later.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Kind-hearted motive, but thin discernment: substituted a quick financial transaction for relational attention.',
          outcomeDistinction: 'Illustrates Core Distinction #4: loving intentions still require accurate understanding.',
          roleOfOtherAgentsAndCircumstances: 'The landlord’s predatory behavior exploited the lack of a traceable receipt and repair demand.'
        },
        uninvestigatedMissedFactsNote:
          'Because you didn’t sit down to listen, you never learned about the $85 CNA renewal or the illegal lockout note.',
        scripturalIllumination: [
          { reference: 'Philippians 1:9–10', insight: 'Love needs to abound in knowledge and discernment so that care truly builds up.' }
        ],
        repairOption: {
          id: 'need-rep-2',
          label: 'Sit Down with Elena Now, Help Reinstate Her CNA License, and Connect Her with David for Legal-Aid Protection',
          description: 'Admit that you rushed the first conversation, cover the $85 reinstatement fee, and bring in housing advocacy.',
          repairOutcome: 'Gets Elena back on the nursing-home roster and stops the landlord’s intimidation.',
          whoBearsCost: 'Requires the time and attention you skipped the first time, plus $85.',
          whoReceivesBenefit: 'Elena and Mateo.'
        }
      },
      {
        id: 'need-dec-paternalistic-lecture',
        title: 'Refuse Cash & Require a 6-Week Budgeting Class Before Offering Any Aid',
        subtitle: 'Assume the neighborhood rumor is true and insist on "tough love" financial literacy first.',
        actionType: 'Self-Protective / Avoidant',
        fundsRequired: 0,
        description:
          'Believing the remark that Elena "just can’t manage a budget," you tell her that giving money enables dependency and offer instead to sign her up for a Tuesday night budgeting workbook class.',
        consequenceTimeline: {
          immediate: 'Elena’s face falls. She whispers “Thank you anyway,” walks out with Mateo, and does not return.',
          nearTermWeeks: 'With no help for the $85 CNA renewal or the Monday confrontation, Elena pawns her late mother’s wedding ring at predatory rates to pay the landlord and still misses two shifts.',
          longTermMonths: 'Mateo is hospitalized again from the unaddressed mold, and Elena stops attending community gatherings altogether because she feels judged and unseen.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'Elena and 8-year-old Mateo bear the crushing physical, financial, and emotional cost of your unverified assumption.',
          whoReceivesBenefit: 'You kept $300 in your pocket and felt superior about enforcing "stewardship principles."',
          hiddenOrDelayedEffects: 'Demonstrates how unexamined prejudice masquerading as "wisdom" wounds the vulnerable.'
        },
        narrativeEvidenceOfCare:
          'Another single mother in the neighborhood remarks: “When Elena asked for help while her son had asthma, she got a lecture on workbooks.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Severely flawed judgment: accepted secondhand gossip as fact, failed to listen, and used theological language to justify closing your heart.',
          outcomeDistinction: 'A textbook case of how experience/hearsay can harden into prejudice (Feedback Loop #2).',
          roleOfOtherAgentsAndCircumstances: 'The landlord’s neglect and medical bills were structural realities that a budgeting class could never solve.'
        },
        uninvestigatedMissedFactsNote:
          'You lectured a hardworking nursing assistant about budgeting while her son was breathing black mold.',
        scripturalIllumination: [
          { reference: '1 John 3:17–18', insight: 'Closing one’s heart of compassion against a brother or sister in need contradicts the love of God.' },
          { reference: 'James 2:15–16', insight: 'Offering pious advice without attending to real bodily needs is dead faith.' }
        ],
        repairOption: {
          id: 'need-rep-3',
          label: 'Go to Elena’s Home, Confess Your Arrogance Without Excuse, and Provide the Full Practical & Legal Support',
          description: 'Humbly apologize for lecturing her instead of listening, ask permission to help with the CNA license and mold repair.',
          repairOutcome: 'Elena is understandably guarded at first, but your honest humility begins to heal the wound.',
          whoBearsCost: 'Your pride must be surrendered completely.',
          whoReceivesBenefit: 'Elena’s dignity is honored and Mateo’s room is repaired.'
        }
      },
      {
        id: 'need-dec-partial-voucher',
        title: 'Offer a $150 Grocery Gift Card & Promise to Pray, Without Checking the Housing Issue',
        subtitle: 'Give a safe, bounded token of help while avoiding getting involved in her landlord dispute.',
        actionType: 'Patient Waiting / Further Inquiry',
        fundsRequired: 150,
        description:
          'Wanting to help somewhat without getting entangled in a complicated housing crisis, you give Elena a $150 grocery store card and assure her of your prayers.',
        consequenceTimeline: {
          immediate: 'The grocery card helps feed Mateo for two weeks, which Elena genuinely appreciates.',
          nearTermWeeks: 'However, because grocery cards cannot pay the state CNA board or force the landlord to fix the mold pipe, Elena still scrambles painfully to keep her nursing license active.',
          longTermMonths: 'The relationship remains cordial, and when you check in two weeks later, you finally learn about the pipe leak and help connect her to David.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'You contributed $150; Elena still carried the scary Monday confrontation alone.',
          whoReceivesBenefit: 'Mateo’s nutrition is supported, though the root housing and license hazards were delayed.',
          hiddenOrDelayedEffects: 'Shows the difference between generic charity and attentive understanding.'
        },
        narrativeEvidenceOfCare:
          'Elena says: “The groceries truly helped us get through the week—thank you for checking back in on us.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Compassionate but incomplete: helped at the surface level while stopping short of the listening that would have uncovered the $85 CNA renewal.',
          outcomeDistinction: 'Partial good was done, and keeping the relationship warm allowed a second chance to listen.',
          roleOfOtherAgentsAndCircumstances: 'Elena’s resilience kept her afloat until you followed up.'
        },
        uninvestigatedMissedFactsNote: 'Listening for 20 more minutes on Saturday would have multiplied the usefulness of your help.',
        scripturalIllumination: [
          { reference: 'Galatians 6:2', insight: 'Bearing one another’s burdens invites us to understand the actual weight our neighbor is carrying.' }
        ],
        repairOption: {
          id: 'need-rep-4',
          label: 'Follow Up Mid-Week to Cover the $85 CNA Renewal & Coordinate the Pipe Repair',
          description: 'Build on the initial kindness by listening to the rest of her story and addressing the root causes.',
          repairOutcome: 'Completes the work of care and secures her employment.',
          whoBearsCost: 'An additional $85 and 2 hours of coordination.',
          whoReceivesBenefit: 'Elena and Mateo.'
        }
      }
    ],
    reflectionPrompts: {
      knownVsAssumed: 'How did the overheard remark ("Elena just can’t manage a budget") shape what you initially thought Elena needed?',
      motivePrompt: 'When someone asks us for help, how much of our response is shaped by wanting to protect our own time and emotional comfort?',
      overlookedVoicePrompt: 'What happens to a person’s dignity when helpers decide what their problem is without asking them?',
      repentanceAndRepairPrompt: 'How can wise boundaries and thorough listening work together to serve a neighbor’s real agency rather than either abandoning them or patronizing them?'
    }
  },

  // ============================================================================
  // SCENARIO 4: THE CHALLENGED CONVICTION
  // ============================================================================
  {
    id: 'scenario-conviction',
    number: 4,
    title: 'The Challenged Conviction',
    subtitle: 'Humility, careful study, counsel, intellectual honesty, and faithfulness vs. defensiveness.',
    coreThemes: ['Intellectual Honesty', 'Humility & Correction', 'Faithfulness vs. Ego-Defensiveness', 'Partial Human Knowledge'],
    contestedInterpretationNote:
      'Throughout church history, faithful believers have distinguished between primary gospel foundations (such as the deity, death, and resurrection of Christ) and secondary historical, scientific, or interpretive models where our understanding is partial and open to correction (1 Corinthians 13:9, 12). Confusing our personal interpretive reputation with the authority of God’s truth itself is a perennial temptation.',
    initialResources: {
      timeHours: 7,
      attentionUnits: 8,
      fundsDollars: 100,
      opportunityNote: 'Next edition of your curriculum / seminar series goes to print in 10 days.'
    },
    encounterNarrative: [
      'For the past four years, you have taught a popular adult education seminar and authored a widely shared study guide on Christian history and ethics. One of your signature chapters relies heavily on a striking historical claim and a specific Greek lexical argument that always draws enthusiastic applause.',
      'This week, Dr. Hannah Lin—a quiet, meticulous biblical and historical scholar in your wider fellowship—sends you a private, respectful 4-page letter with primary manuscript scans and archival records. Her evidence shows that the famous historical anecdote in Chapter 3 is a 19th-century fabrication, and that your Greek word-study commits a classic "root fallacy" that distorts the verse’s contextual meaning.',
      'Meanwhile, your co-organizer urges you: “Don’t change a word! People love Chapter 3, and if you print a retraction now, critics will use it to question our whole ministry.”'
    ],
    competingResponsibilities: [
      'Honor God as the God of truth by refusing to knowingly teach a fabricated quote or flawed exegesis (James 3:14, 17).',
      'Shepherd your students faithfully so their faith rests on solid truth rather than fragile myths.',
      'Respond to Dr. Hannah Lin with humility and gratitude rather than shooting the messenger.',
      'Distinguish between correcting a flawed argument and abandoning the core biblical truth the chapter was trying to illustrate.'
    ],
    stakeholders: [
      { name: 'Dr. Hannah Lin', role: 'Historian & Biblical Scholar', vulnerabilityOrStake: 'Approached you privately in good faith; often dismissed by platform speakers who resent correction.' },
      { name: 'Seminar Students', role: 'Learners & Small-Group Leaders', vulnerabilityOrStake: 'Trust you to give them reliable scholarship they can share without embarrassment.' },
      { name: 'Marcus / Co-Organizer', role: 'Ministry Partner', vulnerabilityOrStake: 'Anxious that any admission of error will hurt enrollment and reputation.' },
      { name: 'Your Own Integrity', role: 'Teacher & Steward of Truth', vulnerabilityOrStake: 'Tempted to fuse your ego with your past curriculum.' }
    ],
    investigations: [
      {
        id: 'conv-inv-primary',
        category: 'Evidence & Source',
        title: 'Verify the Primary Archival Sources & Greek Context Yourself',
        actionLabel: 'Spend 3 hours in the library checking the manuscripts and lexicons ($40 interlibrary scans)',
        timeCost: 3,
        attentionCost: 3,
        fundsCost: 40,
        sourceReliability: 'High (Primary textual & historical verification)',
        distinctionType: 'Fictional Scenario Fact',
        revealedContent:
          'Checking the standard academic lexicons (BDAG) and the 16th-century primary sources confirms Dr. Lin is 100% right: the popular quote first appeared in an unsourced 1884 pamphlet, and the Greek word in context means "steadfast endurance," not the sensational metaphor you built your illustration around. Yet the underlying biblical doctrine of endurance is even stronger when grounded in the actual context of the whole paragraph!',
        epistemicNote: 'Careful study shows that surrendering a false argument actually strengthens, rather than weakens, the true scriptural point.'
      },
      {
        id: 'conv-inv-hannah',
        category: 'Affected Person',
        title: 'Invite Dr. Hannah Lin for Coffee to Discuss Her Findings',
        actionLabel: 'Meet Hannah with a teachable spirit and ask how she would frame the chapter',
        timeCost: 2,
        attentionCost: 2,
        fundsCost: 20,
        sourceReliability: 'High (Peer scholarly testimony & collaborative wisdom)',
        distinctionType: 'Character Belief / Testimony',
        revealedContent:
          'Hannah is visibly relieved by your warmth—she admits two other speakers berated her when she sent them similar corrections. She shares two authentic 4th-century patristic letters and a richer contextual reading of the Greek passage that illuminates the text far better than the fabricated 1884 anecdote ever did.',
        epistemicNote: 'Humility turns a perceived "threat" into a rich partnership in truth.'
      },
      {
        id: 'conv-inv-mentor',
        category: 'Wise Counsel',
        title: 'Consult Pastor Samuel, Who Publicly Corrected a Book 10 Years Ago',
        actionLabel: 'Ask an older teacher how learners respond to honest revisions',
        timeCost: 1,
        attentionCost: 1,
        fundsCost: 0,
        sourceReliability: 'High (Tested pastoral & pedagogical experience)',
        distinctionType: 'Character Belief / Testimony',
        revealedContent:
          'Pastor Samuel smiles: “Our co-organizer is afraid that admitting a mistake destroys authority. In reality, pretending to be infallible is what destroys trust! When you show students how to love truth more than your own ego, you teach them a lesson worth ten lectures.”',
        epistemicNote: 'Reframes public correction from a "PR crisis" into a formative teaching moment.'
      },
      {
        id: 'conv-inv-prayer',
        category: 'Prayer & Reflection',
        title: 'Pause for Prayer: Separating God’s Truth from Personal Pride',
        actionLabel: 'Pray through 1 Corinthians 8:1–2 and James 3:17',
        timeCost: 1,
        attentionCost: 0,
        fundsCost: 0,
        sourceReliability: 'Spiritual Formation & Motive Alignment',
        distinctionType: 'Contemplative Alignment',
        revealedContent:
          'In prayer, you confront the sting in your chest: why did learning that the quote was fake feel like a loss instead of a gain? Only because your pride was attached to the applause that quote always received.',
        epistemicNote: 'Helps you distinguish faithfulness to Scripture from defensiveness about your own past performance.',
        scriptureAnchor: '1 Corinthians 8:1–2'
      }
    ],
    interpretClaims: [
      {
        id: 'conv-claim-1',
        statement: 'The popular historical quote in Chapter 3 originated in an unsourced 1884 pamphlet, and the Greek word-study relied on an etymological fallacy.',
        requiresInvestigationId: 'conv-inv-primary',
        correctCategory: 'Verified Fact',
        explanation: 'Demonstrated conclusively by primary archival records and standard Greek lexicons.'
      },
      {
        id: 'conv-claim-2',
        statement: 'Dr. Hannah Lin sent the letter because she is trying to undermine the ministry and embarrass you.',
        correctCategory: 'Unverified Assumption',
        explanation: 'Defensive projection: she wrote privately and respectfully to help you avoid printing an error.'
      },
      {
        id: 'conv-claim-3',
        statement: 'How every individual reader or critic will react when you publish the corrected edition with an errata note.',
        correctCategory: 'Open Uncertainty',
        explanation: 'While most honest learners respect candor, you cannot control every reaction—yet truthfulness remains your duty.'
      }
    ],
    decisions: [
      {
        id: 'conv-dec-transparent-revision',
        title: 'Revise Chapter 3, Publish a Clear Errata Note Crediting Dr. Lin, and Model How to Update Beliefs',
        subtitle: 'Replace the fabricated quote with verified history, correct the Greek exegesis, and explain why to your students.',
        actionType: 'Proportionate Action',
        fundsRequired: 40,
        description:
          'You delay the print run by three days to rewrite Chapter 3 using the authentic historical sources and sound contextual exegesis. You include an explicit "Author’s Note on Revision" thanking Dr. Hannah Lin by name, explaining why the earlier quote and word-study were mistaken, and showing how the actual biblical text stands on firmer ground.',
        consequenceTimeline: {
          immediate: 'Your co-organizer is nervous on day one, and re-typesetting Chapter 3 costs a weekend of focused work.',
          nearTermWeeks: 'At the opening seminar session, when you walk students through why you corrected Chapter 3, the room is riveted. Two university students tell you afterward that your honesty resolved their cynicism about whether Christian teachers care about real historical evidence.',
          longTermMonths: 'Dr. Lin joins your curriculum review board, elevating the quality of the entire series. Your students learn by example that humility and rigorous truth-seeking belong together.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'Your pride bears a brief humbling, and you invest weekend hours and $40 in typesetting revisions.',
          whoReceivesBenefit: 'Dr. Lin (honored for her scholarship), your students (equipped with accurate truth and a model of intellectual honesty), and the credibility of the gospel witness.',
          hiddenOrDelayedEffects: 'Sharing credit and owning error creates a culture where learners feel safe asking hard questions.'
        },
        narrativeEvidenceOfCare:
          'Dr. Lin writes: “I have rarely seen a teacher welcome correction so graciously and use it to teach the whole congregation how to love truth.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'High wisdom and humility: demonstrated that receiving correction strengthens responsible judgment rather than surrendering it.',
          outcomeDistinction: 'Even if a few partisan voices grumbled about changing a favorite story, the decision was deeply faithful.',
          roleOfOtherAgentsAndCircumstances: 'Dr. Lin’s generous collaboration made the revised chapter far richer than the original.'
        },
        uninvestigatedMissedFactsNote:
          'Checking the primary sources yourself ensured your revision was grounded in firsthand understanding.',
        scripturalIllumination: [
          { reference: 'James 3:14, 17', insight: 'Refused to "boast and lie against the truth," showing wisdom that is pure and open to reason.' },
          { reference: '1 Corinthians 13:6', insight: 'Love rejoices with the truth, never with a convenient fabrication.' }
        ],
        repairOption: {
          id: 'conv-rep-1',
          label: 'Send a Free Digital Errata Sheet to Alumni of the Previous Four Years',
          description: 'Proactively equip past students who may still be quoting the 1884 fabrication in their own small groups.',
          repairOutcome: 'Extends your stewardship to those who learned the error from you earlier.',
          whoBearsCost: 'An afternoon drafting the alumni email.',
          whoReceivesBenefit: ' hundreds of past participants.'
        }
      },
      {
        id: 'conv-dec-quiet-swap',
        title: 'Quietly Delete the Quote in the New Edition Without Explaining or Crediting Dr. Lin',
        subtitle: 'Fix the liability silently so future printings are clean, but avoid admitting you taught an error for four years.',
        actionType: 'Self-Protective / Avoidant',
        description:
          'Realizing Dr. Lin’s evidence is undeniable, you quietly delete the 1884 anecdote and tweak the Greek paragraph before sending the file to the printer—but you include no errata note, never mention the change to your class, and send Dr. Lin a one-line "Thanks for the feedback."',
        consequenceTimeline: {
          immediate: 'You avoid the awkwardness of public confession while protecting the new print run from scholarly embarrassment.',
          nearTermWeeks: 'Longtime group leaders using the older edition keep repeating the false quote in class, confused as to why their page numbers no longer match yours. Dr. Lin notices her research was used without acknowledgment or transparency.',
          longTermMonths: 'You missed a golden opportunity to form your students in intellectual humility, leaving them with the impression that teachers never make mistakes.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'Past students (left repeating the error) and Dr. Lin (whose scholarly labor and courage were treated as an inconvenience).',
          whoReceivesBenefit: 'Your ego avoided public vulnerability.',
          hiddenOrDelayedEffects: 'Models image-management rather than repentance and candor.'
        },
        narrativeEvidenceOfCare:
          'A small-group leader asks: “Why did Chapter 3 change without any note? I just taught that 1884 story at my workplace last week and got fact-checked.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Mixed/Self-protective: accepted the factual correction privately, but let pride block honest repair and gratitude.',
          outcomeDistinction: 'Better than continuing to print a falsehood, yet fell short of the love and candor that builds up the body.',
          roleOfOtherAgentsAndCircumstances: 'Previous editions remain in circulation whenever errors are corrected stealthily.'
        },
        uninvestigatedMissedFactsNote: 'Failed to consider the downstream impact on four years of alumni still using Edition 1.',
        scripturalIllumination: [
          { reference: 'James 3:17', insight: 'Wisdom from above is "without hypocrisy" (anhypokritos — unfeigned, transparent).' }
        ],
        repairOption: {
          id: 'conv-rep-2',
          label: 'Acknowledge the Revision Openly in Class & Publicly Thank Dr. Lin',
          description: 'Step past the image-management, explain why the text was updated, and credit Hannah’s scholarship.',
          repairOutcome: 'Transforms a stealth edit into genuine transparency and honors Dr. Lin.',
          whoBearsCost: 'Surrendering the illusion of effortless infallibility.',
          whoReceivesBenefit: 'Your students and Dr. Lin.'
        }
      },
      {
        id: 'conv-dec-double-down',
        title: 'Reject the Correction, Keep Chapter 3 Unchanged, and Dismiss "Academic Nitpicking"',
        subtitle: 'Follow your co-organizer’s advice: the story inspires people, so don’t let "dry scholarship" ruin a good sermon illustration.',
        actionType: 'Hasty / Defensive',
        description:
          'Telling yourself that "the spiritual point is true even if the history is shaky," you print the guide unchanged and tell your team that Dr. Lin is prioritizing academic pedantry over spiritual fruit.',
        consequenceTimeline: {
          immediate: 'The print deadline is met easily, and Chapter 3 gets its usual applause from people who don’t know the history.',
          nearTermWeeks: 'A local skeptic attends the seminar, looks up the Chapter 3 quote on his phone during the break, and posts the 1884 fabrication receipts online—asking, “If they knowingly lie about verifiable history, why trust them about the gospel?”',
          longTermMonths: 'Several earnest learners feel deeply disillusioned when they discover you had been privately warned by Dr. Lin before printing and chose to keep the fabrication anyway.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'The credibility of the gospel witness in your community, your students’ trust, and Dr. Lin (who was unfairly disparaged).',
          whoReceivesBenefit: 'Only short-term ego comfort and printing convenience.',
          hiddenOrDelayedEffects: 'Using falsehood to promote truth dishonors the God of truth (Job 13:7).'
        },
        narrativeEvidenceOfCare:
          'A young believer in your class says with tears: “It wasn’t the mistake that shook me—anybody can make a mistake. It was finding out you knew it wasn’t true and taught it to us anyway.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Severely flawed judgment: subordinated truth to rhetorical utility and treated pious ends as justifying dishonest means.',
          outcomeDistinction: 'Demonstrates Core Distinction #9 & #2: immediate applause does not establish truthfulness.',
          roleOfOtherAgentsAndCircumstances: 'In an open world, verifiable historical fabrications eventually come to light.'
        },
        uninvestigatedMissedFactsNote:
          'Refused to verify primary evidence because the existing story was rhetorically convenient.',
        scripturalIllumination: [
          { reference: '1 Corinthians 13:6', insight: 'Love does not rejoice in unrighteousness, but rejoices with the truth.' },
          { reference: 'James 3:14', insight: 'Do not boast and lie against the truth.' }
        ],
        repairOption: {
          id: 'conv-rep-3',
          label: 'Issue a Full Public Retraction, Apologize to Dr. Lin & the Class, and Pulp the Uncorrected Chapter',
          description: 'Confess openly that ego and fear of losing applause led you to ignore Dr. Lin’s valid evidence, and replace the booklets at your own expense.',
          repairOutcome: 'Painful and humbling, yet the only path that restores moral honesty.',
          whoBearsCost: 'You bear the financial and reputational cost of the reprint and public apology.',
          whoReceivesBenefit: 'Restores integrity to the teaching ministry and vindicates Dr. Lin.'
        }
      },
      {
        id: 'conv-dec-pause-collab',
        title: 'Insert a Temporary Addendum & Co-Host an Open Workshop on "How We Study & Test Claims"',
        subtitle: 'Use the moment to invite Dr. Lin to co-teach a session on historical and biblical discernment.',
        actionType: 'Patient Waiting / Further Inquiry',
        description:
          'While you verify all the footnotes across the rest of the workbook, you hold the main print run, print a transparent addendum for Chapter 3, and invite Dr. Lin to co-lead a workshop showing students how primary sources and Greek context are tested.',
        consequenceTimeline: {
          immediate: 'Students receive loose-leaf binders for the first two weeks while the full audit completes.',
          nearTermWeeks: 'The joint workshop with Dr. Lin becomes the highest-rated evening of the entire term, equipping laypeople to spot root fallacies and check sources themselves.',
          longTermMonths: 'The revised guide is published with rock-solid citations across all eight chapters.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'Temporary inconvenience of binder inserts and shared platform time.',
          whoReceivesBenefit: 'The entire congregation gains practical tools for biblical and historical discernment.',
          hiddenOrDelayedEffects: 'Multiplies the usefulness of knowledge by sharing the method, not just the conclusion.'
        },
        narrativeEvidenceOfCare:
          'Your co-organizer admits: “I was terrified that admitting an error would sink us. Instead, bringing Dr. Lin onto the platform built more trust than anything we’ve done in years.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Creative, humble, and edifying stewardship that turned a private correction into communal growth.',
          outcomeDistinction: 'Aligns means and ends around truth and love.',
          roleOfOtherAgentsAndCircumstances: 'Dr. Lin’s gift for clear teaching enriched the whole seminar.'
        },
        uninvestigatedMissedFactsNote: 'Auditing the remaining chapters caught two minor citation typos before press.',
        scripturalIllumination: [
          { reference: 'Colossians 2:2–3', insight: 'Hearts knit together in love growing in the riches of assured understanding.' },
          { reference: '1 Peter 4:10', insight: 'Stewarding diverse gifts in the body to serve one another.' }
        ],
        repairOption: {
          id: 'conv-rep-4',
          label: 'Institutionalize Peer Scholarly Review Before Future Publications',
          description: 'Set aside budget and lead-time so every guide is reviewed by a historian and biblical specialist before printing.',
          repairOutcome: 'Builds humble accountability into future work.',
          whoBearsCost: 'Modest review stipends and earlier draft deadlines.',
          whoReceivesBenefit: 'All future readers and teachers.'
        }
      }
    ],
    reflectionPrompts: {
      knownVsAssumed: 'Why is it so easy to assume a quote or argument is true simply because we have repeated it many times and people nodded when we said it?',
      motivePrompt: 'When someone points out an error in our thinking, what helps us distinguish between defending the truth and defending our own ego?',
      overlookedVoicePrompt: 'How often are quiet, careful researchers like Dr. Lin treated as "unspiritual critics" when they point out factual errors in popular teaching?',
      repentanceAndRepairPrompt: 'Think of a conviction or claim you once held with high confidence that later required revision. What helped you become teachable?'
    }
  },

  // ============================================================================
  // SCENARIO 5: THE UNSEEN SERVICE
  // ============================================================================
  {
    id: 'scenario-service',
    number: 5,
    title: 'The Unseen Service',
    subtitle: 'Motives, sustainable service, legitimate recognition, wise boundaries, and love that does not depend on applause.',
    coreThemes: ['Unseen Faithfulness vs. Platform Applause', 'Sustainable Boundaries', 'Shared Credit', 'Abiding in Christ (John 15)'],
    contestedInterpretationNote:
      'Jesus warns against practicing righteousness in order to be seen by others (Matthew 6:1–4), yet also calls disciples to let their light shine (Matthew 5:16) and instructs communities to give honor and recognition where due (Romans 13:7; 1 Thessalonians 5:12–13). Meanwhile, Christian service requires wise boundaries: humility is never a license for organizations to exploit unseen volunteers to the point of collapse.',
    initialResources: {
      timeHours: 6,
      attentionUnits: 7,
      fundsDollars: 100,
      opportunityNote: 'Annual Citywide Youth & Literacy Mentoring Initiative begins next Monday.'
    },
    encounterNarrative: [
      'Your community coalition is launching its annual Youth Literacy & Mentoring Initiative. Two roles urgently need to be filled for the coming semester, and you only have bandwidth for one:',
      'Option A is chairing the Public Keynote & Donor Gala Committee—a high-visibility role where you will introduce the mayor, appear in the regional newsletter, and receive warm public thanks.',
      'Option B is coordinating the Tuesday-evening volunteer background checks, literacy curriculum packets, and mentor support calls—the unseen backbone of the program, currently in disarray after the previous coordinator burned out from working 25 unpaid hours a week without support or boundaries.'
    ],
    competingResponsibilities: [
      'Examine your own motives honestly: are you drawn to the Gala role for the applause, or to the Coordinator role out of genuine love (or out of martyr-complex guilt)?',
      'Ensure the vulnerable youth in the literacy program have properly vetted, well-supported mentors.',
      'Establish healthy, sustainable boundaries so taking on the unseen coordination role does not repeat the previous coordinator’s burnout or neglect your own family/health.',
      'Honor and recognize unseen workers fairly rather than letting visible platform speakers take all the credit.'
    ],
    stakeholders: [
      { name: '45 Neighborhood Youth', role: 'Literacy Students', vulnerabilityOrStake: 'If background checks and mentor packets fail, the tutoring sessions cannot safely open.' },
      { name: 'Claire (Previous Coordinator)', role: 'Exhausted Volunteer', vulnerabilityOrStake: 'Stepped down last week in tears after months of carrying invisible administrative work alone.' },
      { name: 'Coalition Board', role: 'Program Organizers', vulnerabilityOrStake: 'Focused heavily on the Donor Gala while under-resourcing the Tuesday night operations.' },
      { name: 'Your Own Household & Health', role: 'Personal Stewardship', vulnerabilityOrStake: 'You have 6 hours/week of sustainable margin, NOT 25 hours.' }
    ],
    investigations: [
      {
        id: 'serv-inv-claire',
        category: 'Affected Person',
        title: 'Check In on Claire (the Outgoing Coordinator) & Listen to Why She Burned Out',
        actionLabel: 'Bring Claire coffee and ask what made the role unsustainable ($15)',
        timeCost: 2,
        attentionCost: 2,
        fundsCost: 15,
        sourceReliability: 'High (Firsthand testimony of lived operational reality)',
        distinctionType: 'Fictional Scenario Fact',
        revealedContent:
          'Claire shares gratefully: “The core mentoring coordination actually takes about 5 hours a week. What crushed me was that three board members kept dumping their personal clerical errands on me at 9 PM with zero boundaries, and the Gala committee took all the budget while leaving me to buy printer paper out of my own pocket.”',
        epistemicNote: 'Crucial discovery: the unseen role isn’t inherently a 25-hour trap—it became unsustainable because of boundary violations and resource neglect.'
      },
      {
        id: 'serv-inv-packets',
        category: 'Evidence & Source',
        title: 'Inspect the Background-Check Queue & Literacy Curriculum Box',
        actionLabel: 'Audit the actual Tuesday night readiness status',
        timeCost: 1,
        attentionCost: 2,
        fundsCost: 0,
        sourceReliability: 'High (Direct operational inspection)',
        distinctionType: 'Fictional Scenario Fact',
        revealedContent:
          'You find 14 volunteer background checks awaiting final verification clicks and 45 student reading folders half-assembled. Without 6 hours of focused coordination this week, 18 children will have no cleared tutor on opening night—no matter how impressive the Donor Gala speeches are.',
        epistemicNote: 'Shows where the real bottleneck for neighbor-love lies.'
      },
      {
        id: 'serv-inv-volunteers',
        category: 'Affected Person',
        title: 'Speak with Two College Volunteers (Maya & Ben) Who Offered to Help',
        actionLabel: 'Ask Maya and Ben what skills they want to contribute',
        timeCost: 1,
        attentionCost: 1,
        fundsCost: 0,
        sourceReliability: 'High (Uncovers untapped community gifts)',
        distinctionType: 'Character Belief / Testimony',
        revealedContent:
          'Maya and Ben tell you they volunteered two weeks ago to help with curriculum prep and scheduling, but nobody ever called them back! Simultaneously, an experienced event planner on the board is already eager to chair the Gala if you step aside.',
        epistemicNote: 'Sharing responsibility with Maya and Ben makes the Tuesday coordination completely sustainable within a 5–6 hour weekly boundary.'
      },
      {
        id: 'serv-inv-prayer',
        category: 'Prayer & Reflection',
        title: 'Pause for Prayer on John 15:4–5 & Philippians 2:3–7',
        actionLabel: 'Pray about applause, hiddenness, and abiding in Christ’s love',
        timeCost: 1,
        attentionCost: 0,
        fundsCost: 0,
        sourceReliability: 'Spiritual Formation & Motive Alignment',
        distinctionType: 'Contemplative Alignment',
        revealedContent:
          'In quiet prayer, you reflect that Jesus washed His disciples’ feet without a press release—yet He also frequently withdrew to lonely places to pray and rest. Serving in hiddenness is freedom from applause, not an obligation to let others mistreat you.',
        epistemicNote: 'Distinguishes Christlike servant-heartedness from both vanity (needing the stage) and martyrdom (refusing healthy boundaries).',
        scriptureAnchor: 'John 15:4–5'
      }
    ],
    interpretClaims: [
      {
        id: 'serv-claim-1',
        statement: 'Fourteen mentor background checks are currently pending, and 18 students will lack cleared tutors on Monday if the coordination role is left vacant.',
        requiresInvestigationId: 'serv-inv-packets',
        correctCategory: 'Verified Fact',
        explanation: 'Directly verified by inspecting the registration queue and curriculum folders.'
      },
      {
        id: 'serv-claim-2',
        statement: 'Being humble and loving means taking the unseen Coordinator role and silently accepting the same 25-hour-a-week overload and 9 PM errands that broke Claire.',
        requiresInvestigationId: 'serv-inv-claire',
        correctCategory: 'Unverified Assumption',
        explanation: 'A false and harmful assumption: biblical humility never means accepting exploitation or refusing wise, sustainable boundaries.'
      },
      {
        id: 'serv-claim-3',
        statement: 'How many donors at the Gala will ultimately renew their pledges for next year.',
        correctCategory: 'Open Uncertainty',
        explanation: 'Fundraising outcomes depend on many external economic factors beyond any single committee chair’s control.'
      }
    ],
    decisions: [
      {
        id: 'serv-dec-bounded-unseen',
        title: 'Take the Unseen Coordination Role with Clear 6-Hour Boundaries, Equip Maya & Ben, and Honor Claire',
        subtitle: 'Step into the vital Tuesday backbone role, charter a 3-person team with dedicated budget, and refuse off-hours errand dumping.',
        actionType: 'Proportionate Action',
        fundsRequired: 0,
        description:
          'You pass the Gala chair to the event planner and step into the Tuesday Literacy Coordinator role—with a written charter agreed to by the board: (1) a $400 supply budget so no volunteer pays out of pocket, (2) Maya and Ben onboarded as co-coordinators so the workload stays at a sustainable 5 hours/week, (3) a firm boundary against 9 PM clerical errands, and (4) public recognition of Claire’s past work.',
        consequenceTimeline: {
          immediate: 'All 14 background checks and 45 reading folders are completed on time. On Monday evening, every child is paired with a cleared, prepared mentor.',
          nearTermWeeks: 'When a board member tries to text you an unrelated clerical task at 9:30 PM, you calmly point to the agreed role charter. Maya and Ben flourish as emerging leaders.',
          longTermMonths: 'The Tuesday program runs with joyful, unhurried steadiness all semester. Even though your face isn’t on the Gala brochure, watching 45 children learn to read brings deep, quiet joy.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'You surrender the spotlight of the Gala stage and invest 5 steady hours a week.',
          whoReceivesBenefit: '45 neighborhood children, their mentors, Maya and Ben (who gain real leadership skill), and Claire (who sees her feedback respected).',
          hiddenOrDelayedEffects: 'Setting healthy structural boundaries makes the unseen role sustainable for years to come.'
        },
        narrativeEvidenceOfCare:
          'Claire visits on week four and smiles: “Seeing you, Maya, and Ben running this together—with a real budget and healthy boundaries—healed something in me.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Exemplary wisdom: united unseen servant-heartedness with truthful boundaries and shared stewardship.',
          outcomeDistinction: 'Demonstrates that love does not depend on applause, and humility does not mean accepting burnout.',
          roleOfOtherAgentsAndCircumstances: 'Maya and Ben’s enthusiasm and Claire’s honest debrief made the team design possible.'
        },
        uninvestigatedMissedFactsNote:
          'Talking to Claire first prevented you from walking blindly into the boundary dysfunction that burned her out.',
        scripturalIllumination: [
          { reference: 'John 15:4–5, 8', insight: 'Abiding in the Vine produces lasting fruit without frantic self-exhaustion.' },
          { reference: '1 Peter 4:10', insight: 'Employed gifts to serve one another while mobilizing Maya and Ben’s gifts too.' }
        ],
        repairOption: {
          id: 'serv-rep-1',
          label: 'Invite the Gala Committee to Visit a Tuesday Tutoring Session',
          description: 'Reconnect the public fundraising side of the coalition with the everyday mentors and students.',
          repairOutcome: 'Bridges the divide between visible and unseen service across the organization.',
          whoBearsCost: 'One evening of hosting.',
          whoReceivesBenefit: 'The whole coalition.'
        }
      },
      {
        id: 'serv-dec-martyr-burnout',
        title: 'Take the Unseen Role Alone Without Boundaries or Help ("I’ll Just Sacrifice Quietly")',
        subtitle: 'Step into the coordination role solo, say yes to every 9 PM demand, and never ask for budget or volunteers.',
        actionType: 'Hasty / Defensive',
        description:
          'Equating Christian humility with never saying "no," you take on the Tuesday Coordinator role completely alone, don’t call Maya or Ben, buy supplies out of your own pocket, and stay up until midnight answering last-minute board errands.',
        consequenceTimeline: {
          immediate: 'People praise you for being "such a tireless servant" during the first two weeks.',
          nearTermWeeks: 'By week five, chronic sleep deprivation erodes your patience at home and work. You snap at a new tutor and miss a background-check renewal deadline because you are juggling too many tasks alone.',
          longTermMonths: 'By mid-semester you are exhausted and quietly resentful of the people at the Gala—repeating the exact burnout cycle Claire suffered.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'Your health, your household, the tutors who receive your frayed temper, and Maya & Ben (who were denied the chance to serve).',
          whoReceivesBenefit: 'Unhealthy organizational habits were enabled for another semester.',
          hiddenOrDelayedEffects: 'Proves that refusing wise boundaries is not true humility; it starves sustainable love.'
        },
        narrativeEvidenceOfCare:
          'Your close friend observes gently: “You took the hidden role to serve in love, but because you refused to share the load or set limits, you’re running on bitter fumes.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Sincere desire to serve, but poor discernment: confused boundaryless overfunctioning with the mind of Christ.',
          outcomeDistinction: 'Illustrates Core Distinction #7 & Area 4 Principle #6: wise boundaries are essential to sustain service.',
          roleOfOtherAgentsAndCircumstances: 'Organizations will often keep overloading a volunteer until honest limits are spoken in love.'
        },
        uninvestigatedMissedFactsNote:
          'Because you didn’t talk to Claire or onboard Maya and Ben, you carried a 3-person load solo.',
        scripturalIllumination: [
          { reference: 'Ephesians 4:15–16', insight: 'The body grows when every part does its share—not when one part tries to be the whole body.' }
        ],
        repairOption: {
          id: 'serv-rep-2',
          label: 'Admit Your Overextension, Onboard Maya & Ben Immediately, and Present a Clear Role Charter to the Board',
          description: 'Humbly acknowledge that trying to do everything solo was unwise, apologize for your frayed patience, and reset sustainable boundaries.',
          repairOutcome: 'Restores your health and brings Maya and Ben into meaningful service.',
          whoBearsCost: 'Letting go of the "indispensable martyr" identity.',
          whoReceivesBenefit: 'You, your family, the mentors, and the students.'
        }
      },
      {
        id: 'serv-dec-gala-platform',
        title: 'Choose the High-Profile Gala Chair for the Visibility & Leave the Tuesday Role Unfilled',
        subtitle: 'Take the stage role that advances your public profile and assume "someone else will figure out the packets."',
        actionType: 'Self-Protective / Avoidant',
        description:
          'Drawn to the networking with civic leaders and the newsletter feature, you accept the Gala Chair and tell the board you don’t have time to look into the Tuesday background-check backlog.',
        consequenceTimeline: {
          immediate: 'You enjoy a prestigious planning luncheon and get your photo in the community bulletin.',
          nearTermWeeks: 'On opening Monday, 18 children arrive with their parents only to be told there are no cleared mentors for them. Three families walk away disappointed and never return.',
          longTermMonths: 'At the Donor Gala, while you are on stage celebrating the literacy mission, two tutors in the back row whisper about how half the Tuesday classrooms sat empty for the first month.'
        },
        costBearerAnalysis: {
          whoBearsCost: '18 neighborhood children who missed a month of tutoring and the credibility of the program.',
          whoReceivesBenefit: 'Your personal visibility and networking.',
          hiddenOrDelayedEffects: 'Highlights the hollowness of public applause when the unseen work of love is neglected.'
        },
        narrativeEvidenceOfCare:
          'A parent says outside the center: “I saw the fancy Gala photos online, but when I brought my son on Tuesday night, nobody had even processed the tutor paperwork.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Poor judgment: prioritized platform recognition over urgent neighbor-need when another qualified event planner was already available for the Gala.',
          outcomeDistinction: 'Demonstrates Core Distinction #9: visible applause does not equal faithful fruit.',
          roleOfOtherAgentsAndCircumstances: 'Without a coordinator, the volunteer backlog could not clear itself.'
        },
        uninvestigatedMissedFactsNote:
          'You never checked the background-check queue or learned that an event planner was ready to cover the Gala.',
        scripturalIllumination: [
          { reference: 'Philippians 2:3–4', insight: 'Doing nothing from vain conceit, looking to the interests of others.' },
          { reference: '1 Corinthians 13:1–3', insight: 'Public eloquence without concrete love is a clanging cymbal.' }
        ],
        repairOption: {
          id: 'serv-rep-3',
          label: 'Hand Daily Gala Logistics to the Co-Chair, Spend Two Weeks Clearing the Mentor Backlog with Maya & Ben, and Publicly Credit the Tutors',
          description: 'Redirect your energy to getting the 18 children paired with tutors and use your Gala microphone to honor Claire and the Tuesday night volunteers rather than yourself.',
          repairOutcome: 'Gets the children into tutoring and re-centers the Gala on those who do the work.',
          whoBearsCost: 'Requires stepping out of the spotlight and doing urgent catch-up work.',
          whoReceivesBenefit: 'The 18 students and the volunteer team.'
        }
      },
      {
        id: 'serv-dec-co-design',
        title: 'Propose a 2-Week Stabilization Sprint Before Committing to the Full Semester Role',
        subtitle: 'Clear the immediate Monday backlog with Maya & Ben first, then evaluate the board’s willingness to fund the charter.',
        actionType: 'Patient Waiting / Further Inquiry',
        description:
          'Wanting to make sure the board will genuinely honor healthy boundaries before you commit for four months, you agree to lead a 2-week stabilization sprint with Maya and Ben to get all 45 students paired for opening night, contingent on the board ratifying the support charter at week two.',
        consequenceTimeline: {
          immediate: 'All 45 students start on time on Monday night.',
          nearTermWeeks: 'Seeing the concrete results of the 2-week sprint, the board gladly ratifies the $400 supply budget and boundary charter.',
          longTermMonths: 'You, Maya, and Ben complete the semester with clear expectations and mutual trust.'
        },
        costBearerAnalysis: {
          whoBearsCost: 'Two weeks of focused sprint energy while holding long-term commitment conditional on healthy governance.',
          whoReceivesBenefit: 'The students (protected immediately) and the coordinator team (protected structurally).',
          hiddenOrDelayedEffects: 'Models how prudent testing and proportionate commitment work together.'
        },
        narrativeEvidenceOfCare:
          'Maya says: “Testing the workflow together for two weeks gave Ben and me the confidence that we could really do this.”',
        judgmentEvaluation: {
          qualityOfJudgment: 'Prudent, discerning judgment that protected the children immediately while testing institutional trustworthiness.',
          outcomeDistinction: 'Balanced urgent care with wise stewardship of long-term capacity.',
          roleOfOtherAgentsAndCircumstances: 'The board responded positively once shown a clear, workable model.'
        },
        uninvestigatedMissedFactsNote: 'Built directly on Claire’s insights and the readiness audit.',
        scripturalIllumination: [
          { reference: 'Ephesians 5:15–17', insight: 'Walking wisely and stewarding time and capacity with care.' }
        ],
        repairOption: {
          id: 'serv-rep-4',
          label: 'Document the Co-Coordinator Playbook for Next Year’s Team',
          description: 'Write down the 5-hour/week shared workflow so future volunteers never have to reinvent it.',
          repairOutcome: 'Turns personal learning into shared institutional wisdom.',
          whoBearsCost: 'Two hours at the end of the term.',
          whoReceivesBenefit: 'Next year’s coordinators and students.'
        }
      }
    ],
    reflectionPrompts: {
      knownVsAssumed: 'Before checking in with Claire and inspecting the folders, what did you assume about why the unseen role was vacant?',
      motivePrompt: 'How do both the desire for public applause AND the desire to feel like an indispensable martyr subtly pull us away from simple, faithful love?',
      overlookedVoicePrompt: 'Who bears the cost when an organization celebrates visible platform events while starving unseen operational care?',
      repentanceAndRepairPrompt: 'What boundaries or shared-credit practices would help you serve more sustainably and lovingly in your own responsibilities?'
    }
  }
];
