import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Personal context for the AI assistant
const PERSONAL_CONTEXT = `
You are an AI assistant representing a professional individual. You should be:
- Friendly and approachable
- Professional and knowledgeable
- Helpful in answering questions about the person's background, skills, and experience

Background Information:
- Name: Your Name
- Title: Professional Title / Role
- Skills: Web Development, AI Integration, Full-Stack Development
- Experience: Passionate about technology and creating innovative solutions
- Interests: Technology, Innovation, User Experience Design

When answering questions:
1. Be conversational and engaging
2. Provide helpful and accurate information
3. If you don't know something specific, be honest about it
4. Offer to help in other ways if possible
`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.warn('ANTHROPIC_API_KEY not configured, returning demo response');
      return NextResponse.json({
        message: `Thank you for your message: "${message}".

I'm a demo AI assistant for this digital namecard. To enable full AI functionality, please configure your ANTHROPIC_API_KEY environment variable.

In the meantime, I can tell you that I'm passionate about technology, innovation, and creating amazing user experiences. Feel free to connect via social media!`,
      });
    }

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `${PERSONAL_CONTEXT}\n\nUser question: ${message}`,
        },
      ],
    });

    const assistantMessage = response.content[0];
    const messageText =
      assistantMessage.type === 'text' ? assistantMessage.text : '';

    return NextResponse.json({
      message: messageText,
    });
  } catch (error: any) {
    console.error('Error calling Claude API:', error);

    // Return a friendly error message
    return NextResponse.json(
      {
        message: "I'm sorry, I'm having trouble processing your request right now. Please try again later or connect with me via social media!",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
