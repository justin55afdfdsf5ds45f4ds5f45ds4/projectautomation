"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Heading {
  text: string;
  id: string;
}

interface InArticleLinksProps {
  headings: Heading[];
}

const InArticleLinks: React.FC<InArticleLinksProps> = ({ headings }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || headings.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-md">
      <h2 className="text-lg font-bold text-gray-900 mb-4">In This Article</h2>
      <ul className="list-disc px-4">
        {headings.map(({ text, id }, index) => (
          <li key={index} className="mb-2 text-red-500">
            <Link
              href={`#${id}`}
              className="hover:underline"
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.getElementById(id);
                if (targetElement) {
                  const navbarHeight = 80;
                  const targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;
                  window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                  });
                }
              }}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InArticleLinks;
