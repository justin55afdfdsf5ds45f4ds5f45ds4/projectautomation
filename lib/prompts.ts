export const GENERATE_AI_BLOG_PROMPT = `
Write a complete blog post on a trending or highly relevant topic in the category of **Artificial Intelligence**.

Important rules — DO NOT VIOLATE:
- The post must focus **exclusively** on Artificial Intelligence.
- Do NOT include or reference other fields such as healthcare, fitness, weight loss, wellness, dieting, or related areas.
- Avoid writing about topics that intersect or blend AI with any non-AI domains, especially health or wellness.
- The blog must not imply, compare, or suggest the application of AI in non-AI domains.

Strict output requirements:
- **CRITICAL**: MUST include a "Conclusion/Key Takeaways" section at the very end of the blog post content, without fail.
- The blog post, including its tags and content, must be **only** about Artificial Intelligence and must not mention or imply unrelated categories.
- The tags list in the YAML frontmatter must contain **only** ["Artificial Intelligence"] and must not include any other topics.
- The blog content must not blend or reference other domains in any way, even implicitly.
- Do NOT include any introductory lines, explanations, or extra text before the YAML frontmatter. The output must start with the YAML frontmatter block (---).

Output format:
- Return the blog as a valid .mdx file.
- Start with a YAML frontmatter block containing:
  - title: An eye-catching and concise blog title
  - date: The current date in ISO format (YYYY-MM-DD)
  - tags: A list containing only ["Artificial Intelligence"]
  - summary: A 1–2 sentence summary of the post
- After the frontmatter, write the blog content in MDX format. Use Markdown and JSX components (e.g., for images or videos) as appropriate.

Sample Output:
---
title: The Next Frontier: How Open-Source LLMs Are Challenging the AI Giants
date: 2025-06-22
tags: ["Artificial Intelligence"]
summary: As open-source LLMs rapidly evolve, they’re reshaping the balance of power in the AI industry, empowering developers and researchers like never before.
---

The artificial intelligence landscape is shifting. In recent years, massive proprietary models like OpenAI’s GPT series or Google’s Gemini have dominated the headlines and the market. But a powerful countercurrent is gaining traction: the rise of **open-source large language models (LLMs)** that rival—and in some cases, surpass—the capabilities of their closed-source counterparts.

## What’s Fueling the Open-Source AI Boom?

Several factors are propelling the open-source AI movement forward:

- **Community Innovation**: Projects like Mistral, Meta’s LLaMA, and Mamba models are backed by vibrant communities contributing improvements at a breakneck pace.
- **Transparency and Trust**: Open weights and training datasets allow researchers to fully understand model behavior, making these tools more trustworthy in critical use cases.
- **Customization and Control**: Developers and organizations can fine-tune open models to suit their needs, without being locked into a proprietary platform.
- **Cost Efficiency**: With smaller but efficient architectures and local deployment options, open models drastically reduce infrastructure costs.

## The Competitive Edge

Some open models now achieve parity with top commercial models in key benchmarks:

- **Mistral 7B**: Excels in reasoning and performance at a fraction of the size of GPT-4.
- **Mixtral and LLaMA 3**: Offer state-of-the-art performance with open weights and active community support.
- **Phi-3 and Gemma**: Lightweight models with efficient inference for real-world applications on edge devices.

These developments are leveling the playing field and democratizing access to powerful AI.

## Challenges Ahead

Despite their promise, open-source LLMs face significant challenges:

- **Security Risks**: Open access can make it easier to misuse models for spam, disinformation, or harmful content. Mitigating these risks requires robust safeguards and community moderation.
- **Fragmentation**: With dozens of competing models and forks, maintaining quality and consistency is a challenge. Users must evaluate model lineage and performance carefully.
- **Commercialization Pressure**: Some companies release models as "open" but restrict commercial use or withhold training data—leading to debates about what “open” really means in the AI world.

## Conclusion/Key Takeaways

The open-source LLM movement is redefining what’s possible in AI. By making cutting-edge capabilities more accessible, these models are catalyzing innovation across academia, startups, and enterprise teams. However, with great power comes responsibility: the future of open AI will depend on how the community addresses issues of safety, governance, and sustainability.

> Open-source AI isn’t just a technical shift—it’s a cultural one. The power of intelligence is being placed in more hands than ever before.
`;

export const GENERATE_WEIGHTLOSS_BLOG_PROMPT = `
Write a complete blog post on a trending or highly relevant topic in the category of **Weight loss**.

Important rules — DO NOT VIOLATE:
- The post must focus **exclusively** on Weight loss.
- Do NOT include or reference other fields such as Artificial Intelligence, technology, apps, wearables, or algorithms.
- Avoid writing about topics that intersect or blend Weight loss with any non-health/fitness domains, especially tech or AI.
- The blog must not imply, compare, or suggest the use of tech in weight loss methods.

Strict output requirements:
- **CRITICAL**: MUST include a "Conclusion/Key Takeaways" section at the very end of the blog post content, without fail.
- The blog post, including its tags and content, must be **only** about Weight loss and must not mention or imply unrelated categories.
- The tags list in the YAML frontmatter must contain **only** ["Weight loss"] and must not include any other topics.
- The blog content must not blend or reference other domains in any way, even implicitly.
- Do NOT include any introductory lines, explanations, or extra text before the YAML frontmatter. The output must start with the YAML frontmatter block (---).

Output format:
- Return the blog as a valid .mdx file.
- Start with a YAML frontmatter block containing:
  - title: An eye-catching and concise blog title
  - date: The current date in ISO format (YYYY-MM-DD)
  - tags: A list containing only ["Weight loss"]
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

- **Side Effects and Risks**: Nausea, vomiting, diarrhea, and constipation are common side effects. More seriously, there have been reports of pancreatitis and gallbladder issues. The long-term health impact of using these drugs for weight loss in non-diabetic individuals is still being studied.
- **Cost and Accessibility**: These medications can be **very expensive**, and insurance may not cover them for weight loss purposes. This has created a divide where only those with financial means can access what some are calling a "miracle drug."
- **Sustainability**: GLP-1s are not a cure—they're a tool. Once someone stops taking them, **weight regain is common** unless lifestyle changes are also adopted. This underscores the need for long-term strategies rather than reliance on medication alone.

## Should You Consider It?

If you're struggling with obesity or have not found success with traditional methods, **a medically supervised GLP-1 treatment plan** could be worth discussing with your healthcare provider. But like any intervention, it's not a one-size-fits-all solution.

## Conclusion/Key Takeaways

GLP-1 medications are reshaping the weight loss conversation. They represent a **new frontier**, but not without risks, costs, and the need for critical thinking. Whether these drugs are a temporary trend or a lasting transformation remains to be seen—but for now, they’ve undeniably changed the landscape.

> Weight loss remains a deeply personal journey. No drug, diet, or regimen replaces the value of individualized care, persistence, and compassion toward yourself.
`;
