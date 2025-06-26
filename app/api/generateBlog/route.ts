import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateAndUploadUniqueBlog } from "../../../lib/blogGenerator";

export async function GET(request: NextRequest) {
  try {
    let uploadedBlog = null;
    const maxRetries = 5; // Set a maximum number of retries
    let retries = 0;

    while (!uploadedBlog && retries < maxRetries) {
      uploadedBlog = await generateAndUploadUniqueBlog();
      if (!uploadedBlog) {
        retries++;
      }
    }

    if (uploadedBlog) {
      return NextResponse.json({
        message: "Blog uploaded successfully",
        filename: uploadedBlog.filename,
        path: uploadedBlog.path,
        blog: uploadedBlog.blog,
      });
    } else {
      return NextResponse.json(
        {
          error: `Failed to generate and upload a unique blog after ${maxRetries} attempts.`,
        },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("Error in GET handler:", err);
    return NextResponse.json(
      {
        error: err.message || "Unexpected error",
        details: err.details || err,
      },
      { status: 500 }
    );
  }
}
