import { FormulaType } from './types';

export const SECOND_BRAIN_CONTEXT = `
### 🎯 CORE MISSION
Generate YouTube Shorts scripts (30-45 seconds, ~137 words) that replicate the exact style, structure, and flow of million-view viral content. Every script must follow this formula without deviation.

### 📊 ANALYZED PATTERNS FROM VIRAL SCRIPTS
- Target Range: 79-155 words (average: 105 words)
- Optimal Sweet Spot: 90-120 words for maximum engagement

### 🎣 HOOK FORMULA PATTERNS
1. Shocking Statement: [Person/Entity] just [shocking action]
2. Revelation Hook: [Subject] are/is [surprising truth]
3. Discovery Hook: this [person] [discovered/revealed/did something extraordinary] and [recorded/captured it]
4. Claim Hook: [Person] [outrageous claim about payment/money/future action]
5. Controversy Hook: people are [emotion] at [person] for [action]
6. Secret Reveal Hook: [person] just revealed [their biggest secret/something hidden]

Hook Characteristics: 6-15 words max, Present tense, Bold claim.

### 📝 SCRIPT STRUCTURE
1. THE HOOK (6-15 words): State main point, no setup, present tense.
2. CONTEXT + REHOOK (15-25 words): Provide context, add intriguing detail.
3. STORY DEVELOPMENT (60-90 words): New info every sentence, build tension, specific details.
4. PAYOFF (10-20 words): Reveal outcome, "so subscribe if...", end abruptly.

### 🔢 THE 5 FORMULAS

Formula 1: FAKE/PROOF
1. Hook: [Subject] is fake/cheated
2. Context: see in [specific instance] there's [number] things that prove [claim]
3. Evidence 1-3: List specific proof points
4. Big Reveal: but if that doesn't convince you then maybe [biggest evidence] will
5. Final Proof: The most damning evidence
6. CTA: so subscribe if you think [related opinion]

Formula 2: REVELATION
1. Hook: [Person] just [shocking action/reveal]
2. Immediate Evidence: see [person] just [specific action]
3. Additional Details: [they] also [related detail]
4. Biggest Surprise: but that isn't even the craziest part
5. The Real Reveal: The actual shocking information
6. Reaction/Outcome: How people responded
7. CTA: so subscribe if [opinion]

Formula 3: BACKSTORY REVEAL
1. Hook: [Person] [surprising current claim]
2. Expectation Setup: you may think it's because [logical assumption]
3. Contradiction: but this couldn't be more wrong
4. Backstory Start: back in [year] [person] [origin story]
5. Character Development: Details about their journey
6. Turning Point: How they became successful/famous
7. Identity Reveal: so who is it? Well [answer]
8. CTA: and subscribe if [related action]

Formula 4: DISCOVERY/ADVENTURE
1. Hook: this [person] [discovered/experienced] [extraordinary thing] and recorded it
2. Time Anchor: last week/yesterday [person] [specific action]
3. Initial Situation: [they] first [opening scene]
4. Twist: but then out of nowhere [unexpected event]
5. Escalation: What happened next
6. Resolution: How it ended
7. Follow-up: [they] just uploaded another video [content]
8. CTA: so subscribe if this is crazy

Formula 5: CONTRADICTION
1. Hook: [Person] is [surprising claim that seems wrong]
2. Disbelief: you may think I'm just straight up lying but let me explain
3. Context: Evidence supporting opposite
4. The Problem: but there's a problem
5. Real Explanation: Why the hook is actually true
6. Abrupt End: End mid-explanation with "which is why" or "but"

### 🎨 WRITING STYLE RULES
- ZERO commas in sentences (except Mr. Dr.).
- Never use commas for clauses, lists, or pauses. Break into multiple sentences.
- Present tense ONLY.
- 5th grade reading level.
- No rhetorical questions.
- No hype language ("Buckle up").
- No transition phrases ("Moving on").
- Ends without wrap-up sentence.

### ❌ ABSOLUTE FORBIDDEN ELEMENTS
1. Rhetorical questions
2. Hype language
3. Commentary breaking flow
4. Transition phrases
5. Concluding sentences
6. Past tense for current events
7. Fancy vocabulary
8. Commas (except abbreviations)
`;

export const FORMULA_DESCRIPTIONS: Record<FormulaType, string> = {
  [FormulaType.AUTO]: "AI automatically detects the best viral structure for your story.",
  [FormulaType.FAKE_PROOF]: "Debunking or proving a claim with escalating evidence.",
  [FormulaType.REVELATION]: "Unveiling a shocking truth or event about a person/entity.",
  [FormulaType.BACKSTORY]: "Surprising origin story that contradicts assumptions.",
  [FormulaType.DISCOVERY]: "Narrating an extraordinary event caught on camera.",
  [FormulaType.CONTRADICTION]: "Explaining a paradox or counter-intuitive fact.",
};
