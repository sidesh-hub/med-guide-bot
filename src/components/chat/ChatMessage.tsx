import { Pill, Clock, AlertTriangle, Info, User, Bot } from "lucide-react";

interface MedicineInfo {
  name: string;
  description: string;
  howToUse: string;
  whenToUse: string;
  sideEffects: string;
  warnings: string;
}

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  medicineInfo?: MedicineInfo;
}

const ChatMessage = ({ message, isUser, medicineInfo }: ChatMessageProps) => {
  if (isUser) {
    return (
      <div className="flex justify-end animate-slide-up">
        <div className="flex items-start gap-3 max-w-[80%]">
          <div className="bg-primary text-primary-foreground px-4 py-3 rounded-2xl rounded-br-md shadow-soft">
            <p className="text-sm leading-relaxed">{message}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start animate-slide-up">
      <div className="flex items-start gap-3 max-w-[85%]">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-glow">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="space-y-3">
          {!medicineInfo ? (
            <div className="bg-card px-4 py-3 rounded-2xl rounded-bl-md shadow-soft border border-border">
              <p className="text-sm leading-relaxed text-card-foreground">{message}</p>
            </div>
          ) : (
            <div className="bg-card rounded-2xl rounded-bl-md shadow-medium border border-border overflow-hidden">
              {/* Header */}
              <div className="bg-primary/5 px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-card-foreground">{medicineInfo.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* What it is */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-info" />
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">What it is</span>
                  </div>
                  <p className="text-sm text-card-foreground leading-relaxed pl-6">{medicineInfo.description}</p>
                </div>

                {/* How to use */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-medical-green" />
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">How to use</span>
                  </div>
                  <p className="text-sm text-card-foreground leading-relaxed pl-6">{medicineInfo.howToUse}</p>
                </div>

                {/* When to use */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-medical-blue" />
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">When to use</span>
                  </div>
                  <p className="text-sm text-card-foreground leading-relaxed pl-6">{medicineInfo.whenToUse}</p>
                </div>

                {/* Side Effects */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Side Effects</span>
                  </div>
                  <p className="text-sm text-card-foreground leading-relaxed pl-6">{medicineInfo.sideEffects}</p>
                </div>

                {/* Warnings */}
                <div className="bg-destructive/5 rounded-lg p-3 border border-destructive/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wide text-destructive">Important Warning</span>
                      <p className="text-sm text-card-foreground leading-relaxed mt-1">{medicineInfo.warnings}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;