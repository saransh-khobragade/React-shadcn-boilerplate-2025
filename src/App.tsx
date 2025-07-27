import './App.css';
import { type ReactElement, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ComponentShowcase } from '@/components/component-showcase';
import { ThemeConfig } from '@/components/theme-config';
import { Toaster } from '@/components/ui/sonner';
import { useTheme } from '@/hooks/use-theme';

function App(): ReactElement {
  const [count, setCount] = useState(0);
  const [showConfig, setShowConfig] = useState(false);
  const { resolvedTheme } = useTheme();

  return (
    <div className='min-h-screen bg-background flex flex-col'>
      {/* Header */}
      <header className='border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <h1 className='text-xl font-bold'>shadcn/ui Demo</h1>
            <span className='text-sm text-muted-foreground'>
              {resolvedTheme} mode
            </span>
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => {
                setShowConfig(!showConfig);
              }}
            >
              {showConfig ? 'Hide' : 'Show'} Config
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Theme Config */}
          {showConfig && (
            <div className='lg:col-span-1'>
              <div className='sticky top-8'>
                <ThemeConfig />
              </div>
            </div>
          )}

          {/* Right Column - Component Showcase */}
          <div className={showConfig ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <ComponentShowcase />
          </div>
        </div>

        {/* Simple Demo Section */}
        <div className='mt-12 text-center space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome to</h2>
            <h3 className='text-xl font-semibold text-muted-foreground'>
              Vite + React + shadcn/ui
            </h3>
          </div>

          <div className='space-y-4'>
            <div className='flex items-center justify-center space-x-4'>
              <Button
                onClick={() => {
                  setCount(count => count + 1);
                }}
                size='lg'
              >
                Count is {count}
              </Button>
            </div>

            <div className='flex flex-wrap gap-2 justify-center'>
              <Button variant='outline'>Outline</Button>
              <Button variant='secondary'>Secondary</Button>
              <Button variant='destructive'>Destructive</Button>
              <Button variant='ghost'>Ghost</Button>
              <Button variant='link'>Link</Button>
            </div>
          </div>

          <p className='text-sm text-muted-foreground'>
            Edit{' '}
            <code className='bg-muted px-1 py-0.5 rounded text-xs'>
              src/App.tsx
            </code>{' '}
            and save to test HMR
          </p>
        </div>
      </main>

      {/* Toast Container */}
      <Toaster />
    </div>
  );
}

export default App;
