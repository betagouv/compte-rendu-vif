import { Flex, Stack, styled } from "#styled-system/jsx";
import { fr } from "@codegouvfr/react-dsfr";
import React, { useState, useRef, useEffect } from "react";
import { css, cva } from "#styled-system/css";
import Button from "@codegouvfr/react-dsfr/Button";
import { db } from "../../db";
import { v4 } from "uuid";
import { Picture_lines } from "@cr-vif/electric-client/frontend";

type DrawEvent = React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>;
export type Line = { points: Array<{ x: number; y: number }>; color: string };
export const ImageCanvas = ({
  url,
  pictureId,
  lines: dbLines,
  containerRef,
  closeModal,
  notifyPictureLines,
}: {
  url: string;
  containerRef: any;
  pictureId: string;
  lines: Array<Line>;
  closeModal: () => void;
  notifyPictureLines: (args: { pictureId: string; lines: Array<Line> }) => void;
}) => {
  const [tool, setTool] = useState("draw");
  const [lines, setLines] = useState<Array<{ points: Array<{ x: number; y: number }>; color: string }>>([]);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [state, setState] = useState<"idle" | "drawing" | "hold">("idle");
  const [startPan, setStartPan] = useState<{ x: number; y: number } | null>(null);
  const [activeColor, setActiveColor] = useState(colors[0]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const isDrawing = state === "drawing" || state === "hold";

  useEffect(() => {
    if (dbLines) {
      setLines(dbLines);
    }
  }, [dbLines]);

  const setColor = (color: string) => {
    contextRef.current!.strokeStyle = color;
    setActiveColor(color);
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    const boundingRect = containerRef?.current?.getBoundingClientRect();
    if (!boundingRect) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = boundingRect.width * dpr;
    canvas.height = boundingRect.height * dpr;
    context.scale(dpr, dpr);
    context.strokeStyle = activeColor;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    contextRef.current = context;

    const image = new Image();
    image.src = url;
    image.onload = () => {
      imageRef.current = image;
      const boundingRect = containerRef?.current?.getBoundingClientRect();

      const scaleX = boundingRect.width / image.width;
      const scaleY = boundingRect.height / image.height;
      const initialScale = Math.min(scaleX, scaleY);

      const xOffset = (boundingRect.width - image.width * initialScale) / 2;
      const yOffset = (boundingRect.height - image.height * initialScale) / 2;

      setScale(initialScale);
      setOffset({ x: xOffset, y: yOffset });
      drawCanvas();
    };
  }, [url]);

  const drawCanvas = () => {
    const ctx = contextRef.current!;
    const canvas = canvasRef.current!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    const width = imageRef.current?.width || 0;
    const height = imageRef.current?.height || 0;

    if (imageRef.current) {
      ctx.drawImage(imageRef.current, 0, 0, width, height);
    }

    lines.forEach((line) => {
      ctx.beginPath();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 5 / scale;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      line.points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    });

    ctx.restore();
  };

  useEffect(() => {
    drawCanvas();
  }, [scale, offset, lines]);

  const isWithinImageBounds = (x: number, y: number) => {
    if (!imageRef.current) return false;

    return x >= 0 && x <= imageRef.current.width && y >= 0 && y <= imageRef.current.height;
  };

  // const getMousePos = (e) => {
  //   const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;
  //   const clientY = "clientY" in e ? e.clientY : e.touches[0].clientY;

  //   const canvas = canvasRef.current!;
  //   const rect = canvas.getBoundingClientRect();
  //   const x = (clientX - rect.left - offset.x) / scale;
  //   const y = (clientY - rect.top - offset.y) / scale;
  //   return { x, y };
  // };
  const getMousePos = (e) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) * (canvas.width / rect.width / dpr) - offset.x) / scale;
    const y = ((clientY - rect.top) * (canvas.height / rect.height / dpr) - offset.y) / scale;

    return { x, y };
  };
  const handleMouseDown = (e) => {
    const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;
    const clientY = "clientY" in e ? e.clientY : e.touches[0].clientY;
    const pos = getMousePos(e);

    if (tool === "draw") {
      if (!isWithinImageBounds(pos.x, pos.y)) {
        return;
      }

      setState("drawing");
      setLines([...lines, { points: [pos], color: activeColor }]);
    } else if (tool === "move") {
      setStartPan({ x: clientX - offset.x, y: clientY - offset.y });
    }
  };

  const handleMouseMove = (e) => {
    const pos = getMousePos(e);

    if (isDrawing) {
      if (!isWithinImageBounds(pos.x, pos.y)) {
        setState("hold");
        return;
      }

      setState("drawing");

      const lastLine = [...lines];
      lastLine[lastLine.length - 1].points.push(pos);
      setLines(lastLine);
    } else if (startPan) {
      const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;
      const clientY = "clientY" in e ? e.clientY : e.touches[0].clientY;

      setOffset({
        x: clientX - startPan.x,
        y: clientY - startPan.y,
      });
    }
  };

  const handleMouseUp = () => {
    setState("idle");
    setStartPan(null);
  };

  const handleWheel = (e) => {
    // e.preventDefault();
    // const scaleBy = 1.1;
    // const newScale = e.deltaY < 0 ? scale * scaleBy : scale / scaleBy;
    // // Calculate zoom point
    // const pos = getMousePos(e);
    // const newOffset = {
    //   x: offset.x - pos.x * (newScale - scale),
    //   y: offset.y - pos.y * (newScale - scale),
    // };
    // setScale(newScale);
    // setOffset(newOffset);
  };

  const handleUndo = () => {
    setLines(lines.slice(0, -1));
  };

  // const [lastDistance, setLastDistance] = useState<number | null>(null);
  // const getDistance = (touches) => {
  //   return Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
  // };

  const handleTouchStart = (e) => {
    // if (e.touches.length === 2) {
    //   e.preventDefault();
    //   setLastDistance(getDistance(e.touches));
    // } else {
    handleMouseDown(e);
    // }
  };

  const handleTouchMove = (e) => {
    // if (e.touches.length === 2) {
    //   e.preventDefault();

    //   const newDistance = getDistance(e.touches);
    //   if (lastDistance) {
    //     const delta = newDistance - lastDistance;
    //     const scaleChange = delta > 0 ? 1.01 : 0.99;
    //     setScale(scale * scaleChange);
    //   }
    //   setLastDistance(newDistance);
    // } else {
    handleMouseMove(e);
    // }
  };

  const handleTouchEnd = (e) => {
    // setLastDistance(null);
    handleMouseUp(e);
  };

  const handleSave = async () => {
    const existingLines = await db.picture_lines.findFirst({ where: { pictureId } });
    if (existingLines) {
      console.log("updating lines", existingLines, lines);
      await db.picture_lines.update({
        where: { id: existingLines.id },
        data: { lines: JSON.stringify(lines) },
      });
    } else {
      console.log("creating lines", lines);
      await db.picture_lines.create({
        data: { id: v4(), pictureId, lines: JSON.stringify(lines) },
      });
    }
    notifyPictureLines({ pictureId, lines });
    closeModal();
  };

  return (
    <styled.div display="flex" flexDirection="column" width="100%" h="100%">
      {/* 
          onClick={() => setScale(scale * 1.1)}
          <i className={fr.cx("fr-icon--md", "ri-zoom-in-line")} />

          onClick={() => setScale(scale / 1.1)}
          <i className={fr.cx("fr-icon--md", "ri-zoom-out-line")} />

          onClick={handleUndo}
          disabled={lines.length === 0}
          <i className={fr.cx("fr-icon--md", "ri-arrow-go-back-line")} />
*/}
      <Stack pos="absolute" top="26px" right="16px" gap="18px" flexDir="row" alignItems="center">
        {/* @ts-ignore */}
        <Button
          className={css({ bgColor: "white" })}
          type="button"
          priority="secondary"
          iconId="ri-arrow-go-back-line"
          onClick={handleUndo}
          disabled={lines.length === 0}
        />
        {/* <i className={fr.cx("fr-icon--md", "ri-arrow-go-back-line")} /> */}
        {/* </Button> */}
        <Button className={css({ bgColor: "white" })} type="button" priority="secondary" onClick={handleSave}>
          OK
        </Button>
      </Stack>

      <styled.div flex="1" border="1px solid #e5e7eb" borderRadius="0.25rem" overflow="hidden">
        <styled.canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          touchAction="none"
          userSelect="none"
        />
      </styled.div>
      <Flex justifyContent="center" alignItems="center">
        <Stack gap="20px" flexDir="row" justifyContent="center" alignItems="center" p="18px">
          {colors.map((color) => (
            <styled.button
              type="button"
              key={color}
              onClick={() => setColor(color)}
              display="flex"
              justifyContent="center"
              alignItems="center"
              w="40px"
              h="40px"
            >
              <styled.div
                className={colorButtton({ active: activeColor === color })}
                style={{ backgroundColor: color }}
                border={color === "white" ? "1px solid black" : "none"}
              >
                <styled.i
                  className={fr.cx("fr-icon--md", "ri-pencil-line")}
                  style={{ display: activeColor === color ? "block" : "none" }}
                  color={color === "white" ? "black" : "white"}
                />
              </styled.div>
            </styled.button>
          ))}
        </Stack>
      </Flex>
    </styled.div>
  );
};

const colorButtton = cva({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    w: "20px",
    h: "20px",
  },
  variants: {
    active: {
      true: {
        w: "40px",
        h: "40px",
      },
    },
  },
});

const colors = ["#000AFF", "#FF3F3F", "#FF8A00", "#FFD600", "#3DFF7F", "white", "black"];