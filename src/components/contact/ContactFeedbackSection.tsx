
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  type: z.enum(['contact', 'feedback']),
});

const ContactFeedbackSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'feedback'>('contact');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      type: 'contact',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_feedback')
        .insert([
          { 
            name: values.name,
            email: values.email,
            message: values.message,
            type: values.type
          },
        ]);
      
      if (error) throw error;
      
      toast({
        title: "Message sent!",
        description: values.type === 'contact' 
          ? "Thank you for contacting us. We'll get back to you soon." 
          : "Thank you for your feedback!",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold text-roomify-purple mb-6">
            Get In Touch
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Have questions, feedback, or just want to say hello? We'd love to hear from you! Choose the option below that best fits your needs.
          </p>
          
          <div className="flex space-x-4 mb-8">
            <Button
              variant={activeTab === 'contact' ? 'default' : 'outline'}
              className={activeTab === 'contact' ? 'bg-roomify-purple' : ''}
              onClick={() => {
                setActiveTab('contact');
                form.setValue('type', 'contact');
              }}
            >
              <Mail className="mr-2 h-4 w-4" /> Contact Us
            </Button>
            <Button
              variant={activeTab === 'feedback' ? 'default' : 'outline'}
              className={activeTab === 'feedback' ? 'bg-roomify-purple' : ''}
              onClick={() => {
                setActiveTab('feedback');
                form.setValue('type', 'feedback');
              }}
            >
              <MessageSquare className="mr-2 h-4 w-4" /> Give Feedback
            </Button>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-roomify-purple-light p-3 rounded-full mr-4">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-gray-600">support@roomify.app</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-roomify-purple-light p-3 rounded-full mr-4">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-roomify-purple-light p-3 rounded-full mr-4">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Address</h3>
                <p className="text-gray-600">
                  123 Roommate St.<br />
                  San Francisco, CA 94105
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-roomify-purple">
              {activeTab === 'contact' ? 'Contact Us' : 'Share Your Feedback'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {activeTab === 'contact' ? 'Message' : 'Feedback'}
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={
                            activeTab === 'contact' 
                              ? "How can we help you?" 
                              : "Tell us what you think about Roomify..."
                          }
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-roomify-purple hover:bg-roomify-purple-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactFeedbackSection;
