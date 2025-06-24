
import { useState, useCallback } from 'react';
import { ToolType } from '@/components/ToolSelector';

interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

const modelMap: Record<ToolType, string> = {
  general: 'llama2',
  code: 'codellama',
  image: 'llava',
  search: 'llama2',
  research: 'mistral'
};

export const useOllama = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (message: string, tool: ToolType): Promise<string> => {
    setIsLoading(true);
    
    try {
      const model = modelMap[tool];
      console.log(`Sending message to Ollama with model: ${model}`);
      
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          prompt: message,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }

      const data: OllamaResponse = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error connecting to Ollama:', error);
      
      // Return a mock response for development/demo purposes
      return `I'm simulating a response from the ${tool} model. To connect to your actual Ollama instance, make sure it's running on localhost:11434 and the CORS settings allow browser requests. Your message was: "${message}"`;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendMessage, isLoading };
};
