import { CreateMLCEngine } from '@mlc-ai/web-llm';

const MODEL = 'Qwen2.5-0.5B-Instruct-q4f16_1-MLC';
const PROMPT = [
  {
    role: 'system',
    content:
      'You are code generator. Your task is to return code requested by user. You CANNOT return text, explanations and markdown'
  }
];

type ReadyCallback = () => void;

interface ProgressReport {
  progress: number;
  timeElapsed: number;
  text: string;
}

type LoadingCallback = (report: ProgressReport) => void;

type Listener = {
  event: 'ready' | 'loading';
  callback: ReadyCallback | LoadingCallback;
};

let listers: Listener[] = [];

const initCallback = (report: ProgressReport) => {
  callListeners('loading', report);
};

let chat;

(async () => {
  const engine = await CreateMLCEngine(MODEL, {
    initProgressCallback: initCallback
  });

  chat = new Chat(engine);
  callListeners('ready');
})();

export function addListener(event: 'ready', callback: ReadyCallback): void;
export function addListener(event: 'loading', callback: LoadingCallback): void;
export function addListener(
  event: 'ready' | 'loading',
  callback: (...args: any) => void
) {
  listers.push({
    event,
    callback
  });
}

function callListeners(event: 'ready' | 'loading', ...data: any[]) {
  listers.forEach((listener) => {
    if (listener.event !== event) {
      return;
    }

    //@ts-ignore
    listener.callback(...data);
  });
}

export function getChat(): Promise<Chat> {
  return new Promise((resolve) => {
    addListener('ready', () => {
      resolve(chat);
    });
  });
}

class Chat {
  constructor(private engine) {}

  async sendPrompt(prompt: string) {
    const reply = await this.engine.chat.completions.create({
      messages: [
        ...PROMPT,
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const content = reply.choices[0].message.content as string;
    let polishedContent = '';

    let index = 0;
    if (content.startsWith('```')) {
      for (let i = 0; i < content.length; i++) {
        index = i;

        if (content[i] === '\n') {
          break;
        }
      }
    }

    polishedContent = content.slice(index);

    if (polishedContent.endsWith('```')) {
      polishedContent = polishedContent.slice(0, -3);
    }

    return polishedContent;
  }
}
