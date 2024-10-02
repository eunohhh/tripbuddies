'use client';
import React, { DragEvent, TouchEvent, useRef, useState } from 'react';

type Position = {
  top: number;
  left: number;
};

const DraggableComponent: React.FC = () => {
  const [position, setPosition] = useState<Position>({ top: 100, left: 100 });
  const [offset, setOffset] = useState<{ offsetX: number; offsetY: number }>({
    offsetX: 0,
    offsetY: 0,
  });
  const draggableRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (draggableRef.current) {
      const rect = draggableRef.current.getBoundingClientRect();
      e.dataTransfer.setData(
        'text/plain',
        JSON.stringify({
          offsetX: e.clientX - rect.left,
          offsetY: e.clientY - rect.top,
        }),
      );
      setTimeout(() => {
        if (draggableRef.current) {
          // draggableRef.current.style.display = 'none';
          draggableRef.current.style.opacity = '0';
        }
      }, 0);
    }
  };

  const handleDragEnd = () => {
    if (draggableRef.current) {
      // draggableRef.current.style.display = 'block';
      draggableRef.current.style.opacity = '1';
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (data) {
      const { offsetX, offsetY } = JSON.parse(data);
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left - offsetX;
        const y = e.clientY - rect.top - offsetY;
        setPosition({ top: y, left: x });
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (draggableRef.current) {
      const touch = e.touches[0];
      const rect = draggableRef.current.getBoundingClientRect();
      setOffset({
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      });
      setTimeout(() => {
        if (draggableRef.current) {
          // draggableRef.current.style.display = 'none';
          draggableRef.current.style.opacity = '0';
        }
      }, 0);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = touch.clientX - rect.left - offset.offsetX;
      const y = touch.clientY - rect.top - offset.offsetY;
      setPosition({ top: y, left: x });
    }
  };

  const handleTouchEnd = () => {
    if (draggableRef.current) {
      // draggableRef.current.style.display = 'block';
      draggableRef.current.style.opacity = '1';
    }
  };

  return (
    <div
      id="container"
      ref={containerRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: '100%',
        height: '100dvh',
        position: 'relative',
        border: '1px solid #ccc',
      }}
    >
      <div
        id="draggable"
        ref={draggableRef}
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'red',
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
          cursor: 'grab',
        }}
      ></div>
    </div>
  );
};

export default DraggableComponent;
