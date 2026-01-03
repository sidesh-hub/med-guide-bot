import { useState, forwardRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = forwardRef<HTMLFormElement, ChatInputProps>(
  ({ onSend, isLoading }, ref) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        onSend(input.trim());
        setInput("");
      }
    };

    return (
      <form ref={ref} onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-2 bg-card border border-border rounded-2xl p-2 shadow-soft focus-within:shadow-medium focus-within:border-primary/30 transition-all duration-200">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about any medicine..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow disabled:opacity-50 disabled:shadow-none transition-all duration-200"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </form>
    );
  }
);

ChatInput.displayName = "ChatInput";

export default ChatInput;