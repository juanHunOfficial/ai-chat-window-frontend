
import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isTyping = message.isTyping;

  return (
    <div className={cn(
      "flex gap-3 max-w-4xl mx-auto px-4 py-6",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm",
        isUser
          ? "bg-electric-blue text-white ml-auto"
          : "bg-white/90 backdrop-blur-sm text-graphite-dark border border-gray-200/50"
      )}>
        {isTyping ? (
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-graphite rounded-full animate-pulse-typing"></div>
              <div className="w-2 h-2 bg-graphite rounded-full animate-pulse-typing" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-graphite rounded-full animate-pulse-typing" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm text-graphite ml-2">Thinking...</span>
          </div>
        ) : (
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-orange-accent rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
