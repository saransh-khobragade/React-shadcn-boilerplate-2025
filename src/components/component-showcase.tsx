import { type ReactElement, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export function ComponentShowcase(): ReactElement {
  const [checked, setChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);

  const handleToast = (): void => {
    toast('This is a toast notification!', {
      description: 'You can customize the appearance and behavior.',
    });
  };

  const handleCheckedChange = (value: boolean): void => {
    setChecked(value);
  };

  return (
    <div className='space-y-8'>
      <div className='text-center space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>
          Component Showcase
        </h2>
        <p className='text-muted-foreground'>
          Explore all available shadcn/ui components
        </p>
      </div>

      <Tabs defaultValue='buttons' className='w-full'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='buttons'>Buttons</TabsTrigger>
          <TabsTrigger value='forms'>Forms</TabsTrigger>
          <TabsTrigger value='cards'>Cards</TabsTrigger>
          <TabsTrigger value='feedback'>Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value='buttons' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>
                Different button styles and states
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex flex-wrap gap-2'>
                <Button>Default</Button>
                <Button variant='secondary'>Secondary</Button>
                <Button variant='destructive'>Destructive</Button>
                <Button variant='outline'>Outline</Button>
                <Button variant='ghost'>Ghost</Button>
                <Button variant='link'>Link</Button>
              </div>
              <div className='flex flex-wrap gap-2'>
                <Button size='sm'>Small</Button>
                <Button size='default'>Default</Button>
                <Button size='lg'>Large</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='forms' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Form Components</CardTitle>
              <CardDescription>
                Input fields, labels, and form controls
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' placeholder='Enter your email' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='message'>Message</Label>
                <Textarea id='message' placeholder='Enter your message' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='country'>Country</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a country' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='us'>United States</SelectItem>
                    <SelectItem value='ca'>Canada</SelectItem>
                    <SelectItem value='uk'>United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='terms'
                  checked={checked}
                  onCheckedChange={handleCheckedChange}
                />
                <Label htmlFor='terms'>Accept terms and conditions</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Switch
                  id='notifications'
                  checked={switchChecked}
                  onCheckedChange={setSwitchChecked}
                />
                <Label htmlFor='notifications'>Enable notifications</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='cards' className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the card content. You can put any content here.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Another Card</CardTitle>
                <CardDescription>With different content</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Cards are great for organizing content into sections.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='feedback' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Feedback Components</CardTitle>
              <CardDescription>
                Toast notifications and other feedback elements
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <Button onClick={handleToast}>Show Toast Notification</Button>
              <p className='text-sm text-muted-foreground'>
                Click the button above to see a toast notification in action.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
