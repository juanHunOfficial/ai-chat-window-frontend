
import React, { useRef, useEffect } from 'react';
import MessageBubble, { Message } from './MessageBubble';

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto bg-transparent"
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="min-h-full py-8">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md mx-auto px-4">
              <div className="w-16 h-16 bg-electric-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-electric-blue rounded-full"></div>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">Ready to assist</h2>
              <p className="text-white/80 text-lg">Start a conversation with your AI assistant</p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((message) => (
              <div key={message.id} className="animate-fade-in">
                <MessageBubble message={message} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
