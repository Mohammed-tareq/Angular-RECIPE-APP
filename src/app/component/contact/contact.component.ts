import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../../gemini/gemini.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  loading: boolean = false;
  prompt: string = '';
  messages: { from: 'user' | 'ai', text: string }[] = [
    { from: 'ai', text: 'Hello! How can I assist you today?' }
  ];

  geminiService: GeminiService = inject(GeminiService);

  async sendData() {
    const userInput = this.prompt.trim();
    if (!userInput) return;

    this.messages.push({ from: 'user', text: userInput });
    this.prompt = '';
    this.loading = true;

    try {
    const aiResponse = await this.geminiService.generateText(userInput);
    this.messages.push({ from: 'ai', text: aiResponse });
  } catch (error) {
    this.messages.push({ from: 'ai', text: 'Sorry, something went wrong.' });
  } finally {
    this.loading = false;
  }
  }

  resetChat() {
  this.messages = [
    { from: 'ai', text: 'Hello! How can I assist you today?' }
  ];
  this.geminiService.resetChat();
}

exportChatAsText() {
  const chatText = this.messages.map(m => `${m.from === 'ai' ? 'AI' : 'You'}: ${m.text}`).join('\n\n');
  const blob = new Blob([chatText], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'chat-history.txt';
  a.click();
  window.URL.revokeObjectURL(url);
}
}
