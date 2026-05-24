---
title: "Style guide: every element, every state"
description: "A test post that exercises headings, code, quotes, lists, tables, and tags — used to validate the blog's typography and TOC."
pubDate: 2026-05-23
tags: ["meta", "design", "typography", "css"]
---

This post exists to validate the blog's styling end-to-end. It contains every
element the prose stylesheet should handle, plus enough headings to trigger
the table of contents.

If you're reading this on a wide screen, the TOC should be floating to the
right. Try scrolling — the active section should highlight in accent color.

## Headings and hierarchy

The H2 above introduces a new section. Headings below it should nest visually
in the TOC, indented one step per level.

### A nested subsection

H3s appear here. They share the heading family but with smaller size and
tighter margins to feel subordinate.

#### Going one deeper

H4s are rarely needed in blog writing, but they should still render cleanly
and appear in the TOC.

##### And once more

H5 — almost never used, but supported.

## Inline elements

This paragraph mixes a few inline treatments. You can render `inline code`
naturally, link to [external sites](https://astro.build), or **bold a phrase**
when it deserves emphasis. *Italic text* should use the Fraunces italic
variant, which is a true italic rather than a slant.

Mixed CJK and Latin text should also flow naturally: 写代码的时候，we often
switch between languages mid-sentence.

## Blockquotes

A blockquote should feel like a deliberate pause. The default style is a
left accent rule with italic serif:

> Programs must be written for people to read, and only incidentally for
> machines to execute.
>
> — Harold Abelson, *Structure and Interpretation of Computer Programs*

Multi-paragraph quotes should hold together as a single visual block.

## Code blocks

Fenced code blocks use Shiki with the dual `github-light` / `github-dark`
themes. They should swap automatically when you toggle the theme.

```typescript
interface Post {
  title: string;
  pubDate: Date;
  tags: string[];
  draft?: boolean;
}

function isPublished(post: Post, now = new Date()): boolean {
  if (post.draft) return false;
  return post.pubDate.valueOf() <= now.valueOf();
}

const post: Post = {
  title: "Hello",
  pubDate: new Date("2026-05-23"),
  tags: ["meta"],
};

console.log(isPublished(post));
```

A second block in a different language, to verify syntax highlighting:

```rust
fn fibonacci(n: u32) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    for i in 0..10 {
        println!("fib({}) = {}", i, fibonacci(i));
    }
}
```

A shell snippet:

```sh
pnpm install
pnpm dev
pnpm build
```

## Lists

### Unordered lists

Bullets should use the accent color and align cleanly:

- The first item, fairly short.
- A longer item that wraps across multiple lines to verify that the hanging
  indent looks correct and the bullet stays aligned with the first line.
- Another item.
- A final item.

### Ordered lists

Numbered lists should use accent-colored counters in the sans font:

1. Read the source.
2. Write the test.
3. Make the test pass.
4. Refactor once it's green.

### Nested lists

Mixing nesting:

- Top-level item
  - Nested item A
  - Nested item B
- Another top-level
  1. Ordered child
  2. Another ordered child

## Tables

Tables should have minimal styling — just a bottom border per row.

| Language   | Year | Paradigm        |
| :--------- | ---: | :-------------- |
| C          | 1972 | Imperative      |
| Smalltalk  | 1980 | Object-oriented |
| Haskell    | 1990 | Functional      |
| Rust       | 2010 | Multi-paradigm  |
| TypeScript | 2012 | Multi-paradigm  |

## Math

Inline math works with single dollar signs: the quadratic formula gives $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.

Block equations use double dollar signs:

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

A summation:

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

Euler's identity in a block:

$$
e^{i\pi} + 1 = 0
$$

## Horizontal rules

A horizontal rule should appear as a thin line in the rule color:

---

After the rule, normal text resumes.

## Long-form paragraph for rhythm check

This paragraph is intentionally long, to give the reader's eye somewhere to
settle and to verify that the measure feels right. A reading column that is
too wide makes long paragraphs exhausting; one that is too narrow makes the
text feel jumpy. The current measure of 44rem sits comfortably in the
middle. With Fraunces at 18px and a line-height around 1.75, paragraphs
should read like they were typeset on purpose rather than dumped through a
default stylesheet. If anything here feels off — letter spacing, leading,
word spacing — that's a signal worth tuning rather than ignoring.

## Wrap-up

If everything above renders cleanly:

- Headings and TOC are working.
- Inline code, links, and emphasis are correctly styled.
- Blockquotes feel deliberate.
- Shiki swaps themes correctly when you toggle the moon/sun.
- Lists, nested lists, and tables hold their shape.
- The reading rhythm is comfortable from start to finish.

That's the bar. Anything that doesn't pass deserves a follow-up commit.
