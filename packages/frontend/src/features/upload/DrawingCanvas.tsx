import { Flex, styled } from "#styled-system/jsx";
import { useEffect, useRef, useState } from "react";

export const DrawingCanvas = ({ imageUrl }: { imageUrl: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#FF0000");
  const [lineWidth, setLineWidth] = useState(5);

  const getCoordinates = (e: DrawEvent) => {
    const canvas = canvasRef.current!;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        offsetX: (touch.clientX - rect.left) * scaleX,
        offsetY: (touch.clientY - rect.top) * scaleY,
      };
    }

    return {
      offsetX: (e.clientX - rect.left) * scaleX,
      offsetY: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: DrawEvent) => {
    const ctx = canvasRef.current!.getContext("2d")!;
    const { offsetX, offsetY } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);

    ctx.globalCompositeOperation = "source-over";

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
  };

  const stopDrawing = () => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.closePath();
  };

  const draw = (e: DrawEvent) => {
    const ctx = canvasRef.current!.getContext("2d")!;

    const { offsetX, offsetY } = getCoordinates(e);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current!.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = imageUrl;
  };

  useEffect(() => {
    clearCanvas();
  }, [imageUrl]);

  return (
    <Flex flexDir="column">
      <styled.canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      ></styled.canvas>
    </Flex>
  );
};

type DrawEvent = React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>;
