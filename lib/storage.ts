import fetch from "node-fetch";
import { supabase } from "./supabase";

/**
 * Downloads an image from a URL and uploads it to Supabase Storage.
 * @param imageUrl The URL of the image to download.
 * @param slug The slug of the blog post, used for the filename.
 * @returns {Promise<string>} The public URL of the uploaded image.
 * @throws Error if download or upload fails.
 */
export async function uploadImageToSupabase(
  imageUrl: string,
  slug: string
): Promise<string> {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Determine file extension from Content-Type
    const contentType = response.headers.get("content-type");
    let extension = ".jpg"; // Default extension
    if (contentType) {
      if (contentType.includes("image/png")) {
        extension = ".png";
      } else if (contentType.includes("image/jpeg")) {
        extension = ".jpg";
      } else if (contentType.includes("image/gif")) {
        extension = ".gif";
      } else if (contentType.includes("image/webp")) {
        extension = ".webp";
      }
    }

    const filename = `images/${slug}${extension}`; // Store images in an 'images' folder within the bucket

    const { data, error } = await supabase.storage
      .from("blog-images") // Use a dedicated bucket for images
      .upload(filename, buffer, {
        contentType: contentType || undefined,
        upsert: true, // Overwrite if file with same name exists
      });

    if (error) {
      throw new Error(`Failed to upload image to Supabase: ${error.message}`);
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filename);

    return publicUrlData.publicUrl;
  } catch (error: any) {
    console.error("Error uploading image to Supabase:", error);
    throw error;
  }
}
