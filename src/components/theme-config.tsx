import type { ReactElement } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/hooks/use-theme';
import { type ColorScheme, fontSizeValues, radiusValues } from '@/lib/themes';

export function ThemeConfig(): ReactElement {
  const {
    config,
    setTheme,
    setColorScheme,
    setRadius,
    setFontSize,
    resetTheme,
  } = useTheme();

  const colorSchemes: ColorScheme[] = [
    'neutral',
    'slate',
    'gray',
    'zinc',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
  ];

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Theme Configuration</CardTitle>
        <CardDescription>
          Customize the appearance of your application
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <Tabs defaultValue='theme' className='w-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='theme'>Theme</TabsTrigger>
            <TabsTrigger value='colors'>Colors</TabsTrigger>
            <TabsTrigger value='style'>Style</TabsTrigger>
          </TabsList>

          <TabsContent value='theme' className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='theme'>Theme Mode</Label>
              <Select value={config.theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue placeholder='Select theme' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='light'>Light</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value='colors' className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='color-scheme'>Color Scheme</Label>
              <Select value={config.colorScheme} onValueChange={setColorScheme}>
                <SelectTrigger>
                  <SelectValue placeholder='Select color scheme' />
                </SelectTrigger>
                <SelectContent>
                  {colorSchemes.map(scheme => (
                    <SelectItem key={scheme} value={scheme}>
                      {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value='style' className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='radius'>Border Radius</Label>
              <Select value={config.radius} onValueChange={setRadius}>
                <SelectTrigger>
                  <SelectValue placeholder='Select radius' />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(radiusValues).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {key.toUpperCase()} ({value})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='font-size'>Font Size</Label>
              <Select value={config.fontSize} onValueChange={setFontSize}>
                <SelectTrigger>
                  <SelectValue placeholder='Select font size' />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(fontSizeValues).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {key.toUpperCase()} ({value})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>

        <div className='flex justify-between items-center pt-4 border-t'>
          <Button variant='outline' onClick={resetTheme}>
            Reset to Default
          </Button>
          <div className='text-sm text-muted-foreground'>
            Settings saved automatically
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
