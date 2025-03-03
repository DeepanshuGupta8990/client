import { Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const XCustomTooltip: React.FC<{ text: string; children: React.ReactNode }> = ({
  text,
  children,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [text]);

  return (
    <Tooltip title={isTruncated ? text : ""} arrow placement="top">
      <div
        ref={textRef}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </div>
    </Tooltip>
  );
};

export default XCustomTooltip;
