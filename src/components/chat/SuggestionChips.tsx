interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

const SuggestionChips = ({ suggestions, onSelect }: SuggestionChipsProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          className="px-4 py-2 text-sm bg-accent text-accent-foreground rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-soft hover:shadow-glow"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;