import { db } from "../db/db";
import canvas, { createCanvas, loadImage } from "canvas";
import fs from "fs/promises";

export const getPictureWithLines = async ({ pictureId }: { pictureId: string }) => {
  const picture = await db.pictures.findFirst({
    where: { id: pictureId },
  });

  const pictureLines = await db.picture_lines.findFirst({
    where: { pictureId },
  });

  const lines = JSON.parse(pictureLines?.lines || "[]");
  const buffer = await applyLinesToPicture({ pictureUrl: picture!.url!, lines });

  await fs.writeFile("./test.png", buffer);

  return buffer;
};

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
