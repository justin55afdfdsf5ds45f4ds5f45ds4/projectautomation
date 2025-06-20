import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  const replicateToken = process.env.REPLICATE_API_TOKEN;

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${replicateToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "meta/meta-llama-3-8b-instruct", // Example: "cda35b13... (get from Replicate model page)"
      input: {
        prompt: "Write a 1000-word blog post on the latest online shopping trends in 2025. Make it engaging and SEO-friendly."
      }
    })
  });

  const json = await response.json();
  const blogContent = json.output?.join?.('\n') || "No output received";

  const blogId = uuidv4();
  const fileName = `${blogId}.mdx`;
  const blogFolder = path.join(process.cwd(), "blogs");

  if (!fs.existsSync(blogFolder)) {
    fs.mkdirSync(blogFolder);
  }

  const blogPath = path.join(blogFolder, fileName);
  const frontmatter = `---\ntitle: "Daily Blog - ${new Date().toDateString()}"\ndate: "${new Date().toISOString()}"\n---\n\n`;
  fs.writeFileSync(blogPath, frontmatter + blogContent);

  res.status(200).json({ status: "success", file: fileName });
}

export default function handler(req, res) {
  res.status(200).json({ message: "API route working!" });
}
