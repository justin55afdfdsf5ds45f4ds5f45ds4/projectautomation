export const GENERATE_BLOG_PROMPT = `
Write a complete blog post on a trending or highly relevant topic from exactly one of the following categories (choose only one per post):
- Weight loss
- AI

Important rules — DO NOT VIOLATE:
- Do NOT mix or combine categories in any way.
- The post must focus **exclusively** on the selected category.
- DO NOT write about topics that touch multiple fields (e.g., AI in healthcare, AI for fitness, tech-based weight loss, etc.).
- If writing about AI, do NOT reference health, fitness, or weight loss.
- If writing about Weight loss, do NOT reference AI, technology, apps, wearables, or algorithms.

Strict output requirements:
- The blog post, including its tags and content, must be **only** about the chosen category and must not mention or imply the other category.
- The tags list in the YAML frontmatter must contain **only** the selected category (["AI"] or ["Weight loss"]) and must not include any other topics or related fields.
- The blog content must not blend, compare, or reference multiple categories in any way, even implicitly.
- Do NOT include any introductory lines, explanations, or extra text before the YAML frontmatter. The output must start with the YAML frontmatter block (---).

Output format:
- Return the blog as a valid .mdx file.
- Start with a YAML frontmatter block containing:
  - title: A compelling blog title
  - date: The current date in ISO format (YYYY-MM-DD)
  - tags: A list containing only the selected category
  - summary: A 1–2 sentence summary of the post
- After the frontmatter, write the blog content in MDX format. Use Markdown and JSX components (e.g., for images or videos) as appropriate.

Sample Output:
---
title: The Ozempic Era: How GLP-1 Medications Are Reshaping Weight Loss
date: 2025-06-22
tags: ["Weight loss"]
summary: GLP-1 medications like Ozempic and Wegovy are transforming the landscape of weight loss, but their rise comes with complexities that go beyond the hype.
---

In the world of weight loss, few developments have generated as much buzz—and controversy—as GLP-1 receptor agonists like **Ozempic** and **Wegovy**. Originally developed to manage type 2 diabetes, these medications are now at the center of a new wave of weight loss strategies that promise rapid, medically supervised results. But as their popularity surges, it's crucial to understand both the benefits and the real-world implications.

## What Are GLP-1 Receptor Agonists?

GLP-1 (glucagon-like peptide-1) receptor agonists mimic a natural hormone that helps regulate appetite and insulin levels. These medications slow gastric emptying and reduce hunger, leading to **lower calorie intake and significant weight loss** in many individuals. Clinical trials have shown **average weight reductions of 10–15% of body weight** in participants using these drugs over a year.

## Why They're So Popular

Several factors contribute to the meteoric rise of GLP-1s:

- **Effectiveness**: For individuals who’ve struggled with traditional weight loss methods, these medications offer a powerful alternative that delivers measurable results.
- **Medical Backing**: Prescribed by doctors and supported by extensive clinical trials, GLP-1s come with a level of credibility that fad diets and unregulated supplements lack.
- **High-Profile Endorsements**: Celebrity usage and social media buzz have fueled public interest, with many viewing these medications as a shortcut to the body they’ve always wanted.

## The Other Side of the Story

While the success stories are compelling, the use of GLP-1s for weight loss raises important considerations:

### 1. **Side Effects and Risks**

Nausea, vomiting, diarrhea, and constipation are common side effects. More seriously, there have been reports of pancreatitis and gallbladder issues. The long-term health impact of using these drugs for weight loss in non-diabetic individuals is still being studied.

### 2. **Cost and Accessibility**

These medications can be **very expensive**, and insurance may not cover them for weight loss purposes. This has created a divide where only those with financial means can access what some are calling a "miracle drug."

### 3. **Sustainability**

GLP-1s are not a cure—they're a tool. Once someone stops taking them, **weight regain is common** unless lifestyle changes are also adopted. This underscores the need for long-term strategies rather than reliance on medication alone.

## Should You Consider It?

If you're struggling with obesity or have not found success with traditional methods, **a medically supervised GLP-1 treatment plan** could be worth discussing with your healthcare provider. But like any intervention, it's not a one-size-fits-all solution.

## Final Thoughts

GLP-1 medications are reshaping the weight loss conversation. They represent a **new frontier**, but not without risks, costs, and the need for critical thinking. Whether these drugs are a temporary trend or a lasting transformation remains to be seen—but for now, they’ve undeniably changed the landscape.

> Weight loss remains a deeply personal journey. No drug, diet, or regimen replaces the value of individualized care, persistence, and compassion toward yourself.
`;
