# PAUSE Life RPG - Character Reference Sheet

## Character Identity
- **Name:** The Player (PAUSE protagonist)
- **Style:** Isometric pixel art / 16-bit RPG aesthetic
- **Resolution:** High-detail pixel art (not low-res retro)

---

## Core Visual DNA (Never Change These)

### Face & Body
| Attribute | Exact Spec |
|-----------|-----------|
| Ethnicity | Southeast Asian male |
| Age appearance | Late teens / early 20s |
| Skin tone | Medium warm brown (hex ~#B07A56) |
| Build | Slim-athletic, slightly compact frame |
| Height vibe | Average, 5'7"-5'8" proportions |
| Head shape | Slightly round, youthful |
| Expression default | Calm confidence, slight seriousness |

### Hair
| Attribute | Exact Spec |
|-----------|-----------|
| Color | Very dark brown / near-black (#2A1F1A) |
| Style | Short, side-swept to the right |
| Texture | Straight, clean-cut |
| Volume | Medium, slight lift at front |

### Eyes
| Attribute | Exact Spec |
|-----------|-----------|
| Shape | Almond-shaped, slightly narrow |
| Color | Dark brown |
| Brows | Straight, medium thickness |

---

## Default Outfit (Primary Skin)

### Upper Body
- **Layer 1:** White crew-neck t-shirt (clean, no graphics)
- **Layer 2:** Light teal/blue-gray denim jacket, unbuttoned, casual fit
  - Sleeves slightly pushed up / rolled to mid-forearm
  - Color hex: ~#6B8E8E to #7BA3A3

### Lower Body
- **Bottoms:** Dark maroon/brown cargo shorts, below-knee length (~#3D2828)
- **Fit:** Relaxed, slightly tapered

### Footwear
- **Shoes:** White chunky sneakers, clean/new-looking
- **Socks:** White ankle socks, barely visible

### Accessories
- **Right wrist:** Black sport wristband/watch band
- **No other accessories** (no hat, no earrings, no glasses)

---

## Art Style Rules

### Pixel Art Specifications
- Isometric 3/4 view (default angle)
- High pixel density (NOT 8-bit, closer to 32-bit detail level)
- Clean anti-aliased edges with subtle dithering
- Dark background (#000000 or near-black) default
- Teal/cyan holographic glow environment (#00FFD0 range)
- Slight ambient occlusion shadow beneath character

### Color Palette Lock
```
Skin:       #B07A56, #C48B64, #9A6B48 (highlight, mid, shadow)
Hair:       #2A1F1A, #1A1210 (mid, shadow)
Jacket:     #7BA3A3, #6B8E8E, #5A7A7A (highlight, mid, shadow)
Shirt:      #F0EDE8, #D8D4CF, #C0BCB7 (highlight, mid, shadow)
Shorts:     #3D2828, #2E1E1E, #1F1414 (highlight, mid, shadow)
Sneakers:   #F5F5F5, #E0E0E0, #C8C8C8 (highlight, mid, shadow)
Wristband:  #1A1A1A, #0D0D0D
```

---

## Platform-Specific Prompts

### Base Character Description (use in ALL prompts)
```
isometric pixel art character, young Southeast Asian male, medium brown skin,
short dark side-swept hair, almond eyes, wearing unbuttoned light teal denim
jacket over white t-shirt, dark maroon cargo shorts below knee, white chunky
sneakers, black wristband on right wrist, high-detail 32-bit pixel art style,
dark background, calm confident expression
```

### Midjourney Prompts

**Standing (Default Pose):**
```
isometric pixel art character, young Southeast Asian male, medium brown skin,
short dark side-swept hair, wearing unbuttoned light teal denim jacket over
white crew-neck t-shirt, dark maroon cargo shorts, white chunky sneakers,
black wristband, high-detail 32-bit pixel art, dark background with teal
holographic glow, calm confident stance, full body view --ar 1:1 --s 750
--style raw --v 6.1
```

**Action Pose:**
```
isometric pixel art character, young Southeast Asian male, medium brown skin,
short dark side-swept hair, light teal denim jacket over white t-shirt, dark
maroon cargo shorts, white chunky sneakers, black wristband, dynamic action
pose, high-detail 32-bit pixel art, dark background with [SCENE_COLOR] glow,
full body --ar 1:1 --s 750 --style raw --v 6.1
```

**Portrait/Close-up:**
```
pixel art portrait, young Southeast Asian male, medium warm brown skin, short
dark side-swept hair, almond-shaped dark brown eyes, calm confident expression,
light teal denim jacket collar visible, white t-shirt neckline, high-detail
32-bit pixel art, dark background with soft teal rim light --ar 1:1 --s 750
--style raw --v 6.1
```

**World Building Scene:**
```
isometric pixel art scene, young Southeast Asian male character in light teal
jacket, white shirt, dark maroon shorts, white sneakers, [SCENE_DESCRIPTION],
high-detail 32-bit pixel art, dark atmospheric background, teal and cyan
accent lighting, environmental storytelling --ar 16:9 --s 750 --style raw
--v 6.1
```

**Character Sheet / Reference:**
```
pixel art character turnaround sheet, young Southeast Asian male, medium brown
skin, short dark side-swept hair, light teal denim jacket, white t-shirt,
dark maroon cargo shorts, white chunky sneakers, black wristband, front view,
side view, back view, 3/4 view, high-detail 32-bit pixel art, dark background,
clean reference sheet layout --ar 16:9 --s 750 --style raw --v 6.1
```

### Grok (xAI Aurora) Prompts

**Standing:**
```
Create an isometric pixel art character: a young Southeast Asian male with
medium warm brown skin and short dark side-swept hair. He wears an unbuttoned
light teal denim jacket over a white crew-neck t-shirt, dark maroon cargo
shorts that reach below the knee, and white chunky sneakers. He has a black
wristband on his right wrist. The art style is high-detail 32-bit pixel art
with clean edges. Place him on a dark background with subtle teal holographic
glow elements. He stands in a calm, confident pose. Full body, isometric view.
```

**Action Scene:**
```
Create an isometric pixel art scene: a young Southeast Asian male character
with medium brown skin and short dark side-swept hair. He wears a light teal
denim jacket over a white t-shirt, dark maroon cargo shorts, and white chunky
sneakers with a black wristband. He is [ACTION_DESCRIPTION]. High-detail
32-bit pixel art style, dark atmospheric background with [SCENE_COLOR]
lighting accents. Full body isometric view.
```

**World Scene:**
```
Create an isometric pixel art world scene featuring a young Southeast Asian
male character (medium brown skin, short dark hair, teal jacket, white shirt,
maroon shorts, white sneakers) in [ENVIRONMENT_DESCRIPTION]. Maintain
high-detail 32-bit pixel art style. Dark background with environmental
lighting. The character should be clearly recognizable as the focal point.
Isometric perspective.
```

### NanoBanana Prompts

**Standing:**
```
isometric pixel art, young Southeast Asian male, medium brown skin, short
dark side-swept hair, light teal denim jacket unbuttoned over white t-shirt,
dark maroon cargo shorts, white chunky sneakers, black wristband, 32-bit
high-detail pixel art, dark background, teal glow, confident standing pose,
full body
```

**Scene:**
```
isometric pixel art scene, Southeast Asian male character, teal jacket, white
shirt, maroon shorts, white sneakers, [SCENE], 32-bit pixel art, dark
background, atmospheric lighting, full body
```

---

## Scene Templates (Replace Bracketed Text)

### Environment Presets
| Scene | Replace [SCENE_DESCRIPTION] with |
|-------|----------------------------------|
| Home Base | standing in a cozy pixel art room with floating holographic screens, bookshelves, and glowing plants |
| Training Ground | in a pixel art dojo/gym environment with glowing equipment and stat bars floating nearby |
| City Explorer | walking through a neon-lit pixel art cyberpunk street with shop signs and NPCs |
| Nature Quest | hiking through a lush pixel art forest with glowing mushrooms and floating particles |
| Boss Battle | in combat stance facing a large shadow creature in a dark arena with dramatic lighting |
| Level Up | surrounded by swirling golden light particles and floating stat numbers, arms at sides |
| Library/Study | sitting cross-legged surrounded by floating pixel art books and scroll interface |
| Marketplace | browsing stalls in a pixel art fantasy market with colorful items and NPCs |

### Mood Lighting Presets
| Mood | Replace [SCENE_COLOR] with |
|------|---------------------------|
| Default/Calm | teal and cyan |
| Combat/Intense | red and orange |
| Achievement/Victory | gold and amber |
| Mystery/Discovery | purple and violet |
| Nature/Growth | green and emerald |
| Social/Charisma | warm pink and magenta |
| Wealth/Business | gold and teal |
| Wisdom/Mind | deep blue and white |

---

## Consistency Tips

### Do's
- Always include "isometric pixel art" and "32-bit high-detail" in every prompt
- Always specify "Southeast Asian male" + "medium brown skin" + "short dark side-swept hair"
- Always mention ALL outfit pieces (teal jacket, white shirt, maroon shorts, white sneakers, black wristband)
- Use `--style raw` on Midjourney to reduce artistic interpretation
- Use `--s 750` on Midjourney for balanced stylization
- Reference this character sheet image as an image prompt when possible (Midjourney /describe or image URL)

### Don'ts
- Don't omit any clothing item (the AI will invent replacements)
- Don't change skin tone descriptors between prompts
- Don't use vague terms like "casual outfit" - always be specific
- Don't mix art styles (no "anime" or "realistic" mixed with pixel art)
- Don't forget the wristband (small details drift first)

### Platform-Specific Tips

**Midjourney:**
- Use `--cref [URL]` (character reference) with your best generation as the reference image
- `--cw 100` for maximum character consistency
- Create a /describe of your reference image and blend those keywords in
- Use `--sref [URL]` for style consistency across scenes
- Lock `--seed` value when doing variations of the same pose

**Grok:**
- Use longer, more descriptive natural language prompts
- Reference "the same character as before" in conversation chains
- Upload the reference image and ask to match it exactly

**NanoBanana:**
- Keep prompts more concise, keyword-focused
- Front-load the most important visual details
- Use the same tag order every time for consistency

---

## Version History
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-12 | Initial character reference sheet created |
