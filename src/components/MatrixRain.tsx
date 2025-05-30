import React, { useEffect, useRef } from 'react';

interface MatrixColumn {
  x: number;
  y: number;
  speed: number;
  characters: string[];
  opacity: number[];
}

interface MatrixProps {
  width?: number;
  height?: number;
  fontSize?: number;
  density?: number;
  speed?: number;
  className?: string;
}

const Matrix: React.FC<MatrixProps> = ({ 
  width = 800, 
  height = 600, 
  fontSize = 16,
  density = 0.02,
  speed = 1,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<MatrixColumn[]>([]);
  
  // Matrix characters - mix of katakana, numbers, and symbols
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Initialize columns
    const columnWidth = fontSize;
    const numColumns = Math.floor(width / columnWidth);
    columnsRef.current = [];
    
    for (let i = 0; i < numColumns; i++) {
      if (Math.random() < density) {
        const columnHeight = Math.floor(Math.random() * 15) + 10;
        columnsRef.current.push({
          x: i * columnWidth,
          y: -columnHeight * fontSize,
          speed: (Math.random() * 2 + 1) * speed,
          characters: Array(columnHeight).fill(0).map(() => getRandomChar()),
          opacity: Array(columnHeight).fill(0).map((_, idx) => 1 - (idx / columnHeight))
        });
      }
    }
    
    let animationId: number;
    
    const animate = () => {
      // Clear canvas with black background
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);
      
      // Set font properties
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.textAlign = 'center';
      
      // Update and draw columns
      columnsRef.current = columnsRef.current.map(column => {
        const newColumn = { ...column };
        newColumn.y += newColumn.speed;
        
        // Randomly change some characters
        if (Math.random() < 0.05) {
          const randomIndex = Math.floor(Math.random() * newColumn.characters.length);
          newColumn.characters = [...newColumn.characters];
          newColumn.characters[randomIndex] = getRandomChar();
        }
        
        return newColumn;
      }).filter(column => column.y < height + column.characters.length * fontSize);
      
      // Add new columns randomly
      for (let i = 0; i < numColumns; i++) {
        if (Math.random() < density * 0.1) {
          const hasColumn = columnsRef.current.some(col => Math.abs(col.x - i * columnWidth) < columnWidth);
          if (!hasColumn) {
            const columnHeight = Math.floor(Math.random() * 15) + 10;
            columnsRef.current.push({
              x: i * columnWidth,
              y: -columnHeight * fontSize,
              speed: (Math.random() * 2 + 1) * speed,
              characters: Array(columnHeight).fill(0).map(() => getRandomChar()),
              opacity: Array(columnHeight).fill(0).map((_, idx) => 1 - (idx / columnHeight))
            });
          }
        }
      }
      
      // Draw all columns
      columnsRef.current.forEach(column => {
        column.characters.forEach((char, index) => {
          const y = column.y + index * fontSize;
          if (y > 0 && y < height) {
            const opacity = column.opacity[index];
            
            if (index === column.characters.length - 1) {
              // Leading character is bright cyber green
              ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
            } else if (index >= column.characters.length - 3) {
              // Near-leading characters are medium cyber green
              ctx.fillStyle = `rgba(0, 230, 118, ${opacity})`;
            } else {
              // Trailing characters are darker cyber green
              ctx.fillStyle = `rgba(0, 180, 85, ${opacity * 0.7})`;
            }
            
            ctx.fillText(char, column.x + fontSize / 2, y);
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [width, height, fontSize, density, speed]);
  
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`block ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

export default Matrix;