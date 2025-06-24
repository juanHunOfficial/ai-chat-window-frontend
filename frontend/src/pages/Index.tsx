
import React, { useState } from 'react';
import ToolSelector, { ToolType } from '@/components/ToolSelector';
import ChatWindow from '@/components/ChatWindow';
import ChatInput from '@/components/ChatInput';
import { Message } from '@/components/MessageBubble';
import { useOllama } from '@/hooks/useOllama';

const Index = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('general');
  const [messages, setMessages] = useState<Message[]>([]);
  const { sendMessage, isLoading } = useOllama();

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    const typingMessage: Message = {
      id: `${Date.now()}-typing`,
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isTyping: true
    };

    setMessages(prev => [...prev, userMessage, typingMessage]);

    try {
      const response = await sendMessage(content, activeTool);
      
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        const assistantMessage: Message = {
          id: `${Date.now()}-response`,
          content: response,
          role: 'assistant',
          timestamp: new Date()
        };
        return [...withoutTyping, assistantMessage];
      });
    } catch (error) {
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        const errorMessage: Message = {
          id: `${Date.now()}-error`,
          content: 'Sorry, I encountered an error. Please make sure Ollama is running on localhost:11434.',
          role: 'assistant',
          timestamp: new Date()
        };
        return [...withoutTyping, errorMessage];
      });
    }
  };

  const getPlaceholder = () => {
    const placeholders = {
      general: 'Ask me anything...',
      code: 'Ask me about programming, debugging, or code generation...',
      image: 'Describe an image you want me to generate...',
      search: 'What would you like me to search for?',
      research: 'What topic should I research in depth?'
    };
    return placeholders[activeTool];
  };

  return (
    <div className="min-h-screen flex flex-col bg-shepherd-landscape bg-cover bg-center bg-fixed">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Tool Selector */}
        <ToolSelector activeTool={activeTool} onToolChange={setActiveTool} />
        
        {/* Chat Window */}
        <ChatWindow messages={messages} />
        
        {/* Chat Input */}
        <ChatInput 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          placeholder={getPlaceholder()}
        />
      </div>
    </div>
  );
};

export default Index;
