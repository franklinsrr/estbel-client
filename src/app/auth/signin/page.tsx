'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/Input';
import { formSignInSchema } from '@/schemas/auth';
import { SIGNIN_DEFAULT_VALUES } from '@/constants/auth';
import { Separator } from '@radix-ui/react-separator';
import Link from 'next/link';
import { TSignInSchema } from '@/interfaces/auth';

/**
 * SignInPage is a page that allows the user to sign in to their account.
 * @returns {React.FC<SignInPage>} SignInPage component
 */
export default function SignInPage() {
  const form = useForm<TSignInSchema>({
    resolver: zodResolver(formSignInSchema),
    defaultValues: SIGNIN_DEFAULT_VALUES,
  });

  function onSubmit(values: TSignInSchema) {
    // Handle form submission here
    console.log(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Bienvenido a Estbel</h1>
          <p className="mt-2 text-sm text-gray-600">
            Introduzca sus credenciales de acceso a su cuenta.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Introduzca su email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Introduzca su contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator
              orientation="horizontal"
              className="my-4 h-0.5 bg-gray-100"
            />
            <p className="text-xs text-right">
              <Link href="/auth/forgot-password" className="hover:underline">
                Olvidaste tu contraseña
              </Link>
            </p>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
