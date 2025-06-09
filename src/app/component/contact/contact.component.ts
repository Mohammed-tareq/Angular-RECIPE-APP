import { Component, inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../../gemini/gemini.service';
import { Nl2brPipe } from '../../pipes/nl2br.pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, Nl2brPipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  loading: boolean = false;
  prompt: string = '';
  messages: { from: 'user' | 'ai', text: string }[] = [
    { from: 'ai', text: 'Hello! I\'m your food assistant. I can help you with questions about recipes, ingredients, cooking techniques, and nutrition. What would you like to know?' }
  ];

  geminiService: GeminiService = inject(GeminiService);

  // Keywords related to food
  private foodKeywords: string[] = [
    'recipe', 'food', 'cook', 'ingredient', 'meal', 'dish', 'cuisine', 'eat',
    'kitchen', 'bake', 'nutrition', 'diet', 'vegetable', 'fruit', 'meat',
    'breakfast', 'lunch', 'dinner', 'snack', 'appetizer', 'dessert',
    'restaurant', 'menu', 'taste', 'flavor', 'spice', 'herb',
    'healthy', 'protein', 'carb', 'fat', 'vitamin', 'mineral',
    'organic', 'vegan', 'vegetarian', 'gluten', 'dairy', 'seafood',
    'grill', 'roast', 'fry', 'boil', 'steam', 'sauce', 'marinade'
  ];

  // Check if the query is food-related
  private isFoodRelated(query: string): boolean {
    const lowercaseQuery = query.toLowerCase();
    return this.foodKeywords.some(keyword =>
      lowercaseQuery.includes(keyword) ||
      lowercaseQuery.includes(keyword + 's') || // plural form
      lowercaseQuery.includes(keyword + 'ing') // verb form
    );
  }

  async sendData() {
    const userInput = this.prompt.trim();
    if (!userInput) return;

    this.messages.push({ from: 'user', text: userInput });
    this.prompt = '';
    this.loading = true;

    try {
      if (this.isFoodRelated(userInput)) {
        // Modify the prompt to ensure food-focused response
        const enhancedPrompt = `As a food and cooking expert, please answer this question: ${userInput}`;
        const aiResponse = await this.geminiService.generateText(enhancedPrompt);
        this.messages.push({ from: 'ai', text: aiResponse });
      } else {
        this.messages.push({
          from: 'ai',
          text: "I apologize, but I can only assist with questions related to food, cooking, recipes, ingredients, nutrition, and dining. Please feel free to ask me anything about these topics!"
        });
      }
    } catch (error) {
      this.messages.push({
        from: 'ai',
        text: 'Sorry, I encountered an error while processing your food-related query. Please try again.'
      });
    } finally {
      this.loading = false;
    }
  }

  resetChat() {
    this.messages = [
      { from: 'ai', text: 'Hello! I\'m your food assistant. I can help you with questions about recipes, ingredients, cooking techniques, and nutrition. What would you like to know?' }
    ];
    this.geminiService.resetChat();
  }

  exportChatAsText() {
    const chatText = this.messages
      .map(m => `${m.from === 'ai' ? 'Food Assistant' : 'You'}: ${m.text}`)
      .join('\n\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'food-chat-history.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }
}
