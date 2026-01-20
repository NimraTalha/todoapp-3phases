'use client';

import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { UserMenu } from '@/components/ui/UserMenu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ChatProvider from '@/components/chatbot/ChatProvider';
import ChatButton from '@/components/chatbot/ChatButton';
import ChatPanel from '@/components/chatbot/ChatPanel';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatProvider>
      <div className="min-h-screen bg-background transition-colors duration-500">
        {/* Main content */}
        <main>
          {children}
        </main>

        {/* Chatbot components - positioned on the right side of the screen */}
        <ChatButton />
        <ChatPanel />
      </div>
    </ChatProvider>
  );
}
