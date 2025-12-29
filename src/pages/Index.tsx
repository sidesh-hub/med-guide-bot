import { useState, useRef, useEffect } from "react";
import { Pill, Sparkles, Database } from "lucide-react";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import TypingIndicator from "@/components/chat/TypingIndicator";
import SuggestionChips from "@/components/chat/SuggestionChips";
import { searchMedicine, MedicineInfo } from "@/services/medicineApi";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  medicineInfo?: MedicineInfo;
}

const suggestions = ["Aspirin", "Ibuprofen", "Tylenol", "Advil", "Benadryl"];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

    try {
      const medicineInfo = await searchMedicine(text);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: medicineInfo
          ? `Here's the information about ${medicineInfo.name}:`
          : `I couldn't find specific information about "${text}" in the FDA database. This could mean:
          
• The medicine might be spelled differently
• It may not be available in the US market
• Try searching with the generic name instead of brand name

Please try another medicine name or check the spelling.`,
        isUser: false,
        medicineInfo: medicineInfo || undefined,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Connection Error",
        description: "Unable to fetch medicine data. Please try again.",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting to the medicine database. Please try again in a moment.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
                <Pill className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">MediGuide</h1>
                <p className="text-xs text-muted-foreground">Your trusted medicine information assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-accent/50 px-2.5 py-1.5 rounded-full">
              <Database className="w-3 h-3" />
              <span>Powered by OpenFDA</span>
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
                    Search any medicine from the FDA database to learn what it is, how to use it, when to take it, and important safety information.
                  </p>
                </div>
              </div>

              <div className="space-y-3 w-full max-w-md">
                <p className="text-sm text-muted-foreground">Try asking about:</p>
                <SuggestionChips suggestions={suggestions} onSelect={handleSend} />
              </div>

              <div className="bg-accent/50 rounded-xl p-4 max-w-md border border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-accent-foreground">Disclaimer:</strong> This chatbot uses the OpenFDA database for general information only and is not a substitute for professional medical advice. Always consult a healthcare provider before taking any medication.
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
            Data from FDA • Always verify with a healthcare professional
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;