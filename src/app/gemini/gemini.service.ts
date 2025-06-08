import { Injectable } from '@angular/core';
import { GoogleGenerativeAI, ChatSession  } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private generativeAI: GoogleGenerativeAI;
  private chat: ChatSession | null = null;
  constructor() {
    this.generativeAI = new GoogleGenerativeAI(
      'AIzaSyA1BPp7pDoU3dkTpX3TDOhLb34Ds2BbKsw'
    );
  }

  async initChat() {
    if (!this.chat) {
      const model = this.generativeAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
      this.chat = model.startChat();
    }
  }

  async generateText(prompt: string): Promise<string> {
    await this.initChat();
    const result = await this.chat!.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }

  resetChat() {
  this.chat = null;
}
}
