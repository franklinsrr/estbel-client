'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/Input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { Separator } from '@radix-ui/react-separator';
import { forgotPasswordSchema } from '@/schemas/auth';
import { TForgotPassworSchema } from '@/interfaces/auth';
import { FORGOT_PASSWORD_DEFAULT_VALUES } from '@/constants/auth';

/**
 * ForgotPasswordPage is a page that allows the user to reset their password.
 * @returns {React.FC<ForgotPasswordPage>} ForgotPasswordPage component
 */
export default function ForgotPasswordPage() {
  const router = useRouter();
  const form = useForm<TForgotPassworSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: FORGOT_PASSWORD_DEFAULT_VALUES,
  });

  async function onSubmit(values: TForgotPassworSchema) {
    try {
      // TODO: Implement the actual password reset logic here
      console.log('Password reset requested for:', values.email);
      router.push('/auth/change-password');
    } catch (error) {
      form.setError('root', {
        message:
          'Se ha producido un error al reiniciar su contraseña, vuelva a intentarlo.' +
          error,
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Restablece tu contraseña</h1>
          <p className="mt-2 text-sm text-gray-600">
            Introduce tu e-mail y te enviaremos una contraseña temporal.
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
            {form.formState.errors.root && (
              <p className="text-sm text-red-500 text-center">
                {form.formState.errors.root.message}
              </p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? 'Procesando...'
                : 'Restablecer contraseña'}
            </Button>
            <Separator
              orientation="horizontal"
              className="my-4 h-0.5 bg-gray-100"
            />
            <p className="text-xs text-center">
              <Link href="/auth/signin" className="hover:underline">
                Back to login
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
