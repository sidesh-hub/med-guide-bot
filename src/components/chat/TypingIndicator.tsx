import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-glow">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="bg-card px-4 py-3 rounded-2xl rounded-bl-md shadow-soft border border-border">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;