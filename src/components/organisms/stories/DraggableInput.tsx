"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { twMerge } from "tailwind-merge";
import { StoryFilter, StoryOverlay } from "@/types/Story.types";
import { showAlert } from "@/utils/ui/openCustomAlert";

type DraggableInputProps = {
  texts: StoryOverlay[];
  setTexts: React.Dispatch<React.SetStateAction<StoryOverlay[]>>;
  selectedFilter: StoryFilter;
};

const DraggableInput = ({
  texts,
  setTexts,
  selectedFilter,
}: DraggableInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("text-white");
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleSave = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const newPosition = {
      x: position.x + 4,
      y: position.y + 2,
    };
    const newText = {
      text,
      position: newPosition,
      filter: selectedFilter,
      textColor,
    };
    setTexts([...texts, newText]);
    setText("");

    if (inputRef.current) {
      inputRef.current.style.top = `${position.y + 20}px`;
      setPosition({ x: position.x, y: position.y + 20 });
      inputRef.current.focus();
    }
  };
  const handleDelete = () => {
    setTexts((prev) => prev.slice(0, -1));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleReset = () => {
    setTexts([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleTextColor = () => {
    setTextColor((prev) =>
      prev === "text-white" ? "text-black" : "text-white",
    );
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      if (divRef.current) {
        setPosition({
          x: divRef.current.clientWidth / 8,
          y: divRef.current.clientHeight / 8,
        });
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }, 0);
  }, []);

  useEffect(() => {
    if (text) {
      if (text.length > 20) {
        showAlert("caution", "20자 이하로 작성해주세요.");
        setText("");
      }
    }
  }, [text]);

  return (
    <div className="absolute h-full w-full" ref={divRef}>
      <div className="absolute top-0 right-1/2 z-10 flex translate-x-1/2 flex-row gap-1">
        <button
          type="button"
          onClick={handleTextColor}
          className={twMerge(
            "relative rounded-md px-2 py-1 font-bold",
            textColor === "text-white"
              ? "bg-grayscale-color-400 text-white"
              : "bg-white text-black",
          )}
        >
          A
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="relative rounded-md bg-primary-color-300 px-2 py-1 text-white"
        >
          삭제
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="relative rounded-md bg-primary-color-300 px-2 py-1 text-white"
        >
          리셋
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="relative rounded-md bg-main-color px-2 py-1 text-white"
          ref={buttonRef}
        >
          완료
        </button>
      </div>
      <Draggable
        scale={2}
        position={position}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <form
          className="absolute z-10 flex flex-row gap-1"
          onSubmit={handleSave}
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={inputRef}
            style={{
              top: position.y,
              left: position.x,
            }}
            className={twMerge(
              "relative rounded-none border-b-1 bg-transparent px-0 py-1 font-bold ring-offset-background placeholder:text-muted-foreground focus:rounded-none focus:border-b-1 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-white focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              textColor === "text-white" ? "text-white" : "text-black",
            )}
          />
        </form>
      </Draggable>
      {texts.map((text, index) => (
        <p
          key={index}
          className="absolute z-10 font-bold text-lg"
          style={{
            top: text.position.y,
            left: text.position.x,
            color: text.textColor === "text-white" ? "white" : "black",
            transform: `translate(${text.position.x}px, ${text.position.y}px)`,
          }}
        >
          {text.text}
        </p>
      ))}
    </div>
  );
};

export default DraggableInput;
