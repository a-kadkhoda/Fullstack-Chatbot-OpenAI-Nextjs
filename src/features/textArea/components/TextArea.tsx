import React, { useEffect, useRef } from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number;
  maxRows?: number;
  ref?: React.ForwardedRef<HTMLTextAreaElement>;
}

const TextArea: React.FC<TextAreaProps> = ({
  maxRows = 8,
  minRows = 3,
  ref,
  value,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      /*       textarea.style.height = "auto";

      const scrollHeight = textarea.scrollHeight;

      textarea.style.height = `${scrollHeight}px`; */
    }
  }, [value]);

  const setRefs = (element: HTMLTextAreaElement) => {
    textareaRef.current = element;
    if (typeof ref === "function") {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  };
  return (
    <textarea
      ref={setRefs}
      placeholder="Ask Me"
      value={value}
      rows={minRows}
      style={{ maxHeight: `${maxRows * 1.5 + 1.5}rem` }}
      {...props}
    />
  );
};

export default TextArea;
