import { CreateMLCEngine } from '@mlc-ai/web-llm';
import { findFirstCode } from './stringParsing.js';

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
    if (chat) {
      resolve(chat);
      return;
    }

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

    return findFirstCode(reply.choices[0].message.content);
  }
}
