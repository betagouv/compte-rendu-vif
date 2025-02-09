import { createCanvas, loadImage } from "canvas";

export const applyLinesToPicture = async ({
  pictureUrl,
  lines,
}: {
  pictureUrl: string;
  lines: Array<{ points: { x: number; y: number }[]; color: string }>;
}) => {
  try {
    const image = await loadImage(pictureUrl);

    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0);

    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    lines.forEach((line) => {
      ctx.strokeStyle = line.color;
      if (line.points.length > 0) {
        ctx.beginPath();

        ctx.moveTo(line.points[0]!.x, line.points[0]!.y);

        for (let i = 1; i < line.points.length; i++) {
          ctx.lineTo(line.points[i]!.x, line.points[i]!.y);
        }

        ctx.stroke();
      }
    });

    return canvas.toBuffer("image/png");
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};
