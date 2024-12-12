import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes to ensure smooth movement across the screen
const createAnimation = (start, end, direction) => keyframes`
  from {
    transform: translateX(${direction === "left" ? end : start});
  }
  to {
    transform: translateX(${direction === "left" ? start : end});
  }
`;

const AnimatedWrapper = styled.div`
  position: absolute; /* Maintain absolute positioning */
  animation: ${({ start, end, direction }) =>
      createAnimation(start, end, direction)}
    ${({ speed }) => speed}s linear ${({ delay }) => delay}s
    ${({ loop }) => (loop ? "infinite" : "1")};
  will-change: transform; /* Optimize smoothness for animations */
`;

const AnimatedComponent = ({
  children,
  speed = 8, // Animation duration in seconds
  direction = "right", // 'left' or 'right'
  start = "-100vw", // Starting position outside viewport
  end = "100vw", // Ending position outside viewport
  delay = 0, // Delay before animation starts
  loop = true, // Infinite animation
  className = "", // Additional styling
}) => {
  // Ensure valid prop values
  const validatedStart = start || "-100vw";
  const validatedEnd = end || "100vw";

  return (
    <AnimatedWrapper
      speed={speed}
      direction={direction}
      start={validatedStart}
      end={validatedEnd}
      delay={delay}
      loop={loop}
      className={className}
    >
      {children}
    </AnimatedWrapper>
  );
};

export default AnimatedComponent;
