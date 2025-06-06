"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/Input";
import { formChangePasswordSchema } from "@/schemas/auth";
import { TChangePasswordSchema } from "@/interfaces/auth";
import { CHANGE_PASSWORD_DEFAULT_VALUES } from "@/constants/auth";

export default function ChangePasswordPage() {
  const form = useForm<TChangePasswordSchema>({
    resolver: zodResolver(formChangePasswordSchema),
    defaultValues: CHANGE_PASSWORD_DEFAULT_VALUES
  });

  function onSubmit(values: TChangePasswordSchema) {
    // Handle form submission here
    console.log(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Cambiar Contraseña</h1>
          <p className="mt-2 text-sm text-gray-600">
            Introduzca su contraseña temporaria y su nueva contraseña.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="provisionalPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña Provisional</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Introduzca su contraseña provisional"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Introduzca su nueva contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Cambiar Contraseña
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}