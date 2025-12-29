import { useState, useRef, useEffect } from "react";
import { Pill, Sparkles } from "lucide-react";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import TypingIndicator from "@/components/chat/TypingIndicator";
import SuggestionChips from "@/components/chat/SuggestionChips";
import { getMedicineInfo, MedicineInfo } from "@/data/medicineDatabase";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  medicineInfo?: MedicineInfo;
}

const suggestions = ["Paracetamol", "Ibuprofen", "Aspirin", "Amoxicillin", "Omeprazole"];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const medicineInfo = getMedicineInfo(text);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: medicineInfo
        ? `Here's the information about ${medicineInfo.name}:`
        : `I couldn't find specific information about "${text}". Please try searching for common medicines like Paracetamol, Ibuprofen, Aspirin, Amoxicillin, or Omeprazole. You can also ask me general questions about medicine usage.`,
      isUser: false,
      medicineInfo: medicineInfo || undefined,
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
              <Pill className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">MediGuide</h1>
              <p className="text-xs text-muted-foreground">Your trusted medicine information assistant</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-foreground">Welcome to MediGuide</h2>
                  <p className="text-muted-foreground max-w-md">
                    Ask me about any medicine to learn what it is, how to use it, when to take it, and important safety information.
                  </p>
                </div>
              </div>

              <div className="space-y-3 w-full max-w-md">
                <p className="text-sm text-muted-foreground">Try asking about:</p>
                <SuggestionChips suggestions={suggestions} onSelect={handleSend} />
              </div>

              <div className="bg-accent/50 rounded-xl p-4 max-w-md border border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-accent-foreground">Disclaimer:</strong> This chatbot provides general information only and is not a substitute for professional medical advice. Always consult a healthcare provider before taking any medication.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  medicineInfo={message.medicineInfo}
                />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="sticky bottom-0 bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <ChatInput onSend={handleSend} isLoading={isLoading} />
          <p className="text-xs text-center text-muted-foreground mt-3">
            Always verify medication information with a healthcare professional
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;