import Replicate from "replicate";

interface ReplicateImageOutput {
  url: () => string;
}

/**
 * Generates an image using the Replicate API.
 * @param imagePrompt The prompt to use for image generation.
 * @returns The URL of the generated image, or null if generation fails.
 */
export async function generateImageWithReplicate(
  imagePrompt: string
): Promise<string | null> {
  const replicateApiToken = process.env.REPLICATE_API_TOKEN;
  if (!replicateApiToken) {
    console.error("Replicate API token not provided.");
    return null;
  }

  try {
    const replicate = new Replicate({
      auth: replicateApiToken,
    });

    const imageModel = "google/imagen-4";
    const imageInput = {
      prompt: imagePrompt,
      aspect_ratio: "9:16",
    };

    const imageOutput = await replicate.run(imageModel, { input: imageInput });

    return (imageOutput as ReplicateImageOutput).url();
  } catch (error) {
    console.error("Error generating image with Replicate:", error);
    return null;
  }
}
