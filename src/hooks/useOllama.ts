
import { useState, useCallback } from 'react';
import { ToolType } from '@/components/ToolSelector';

interface OllamaResponse {
  reply: string
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

      const response = await fetch('http://localhost:8000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'user', content: message }
          ],
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: OllamaResponse = await response.json();
      return data.reply.trim();
    } catch (error) {
      console.error('Error connecting to Ollama:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendMessage, isLoading };
};
