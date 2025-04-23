'use client'
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

export default function LoginForm(){
    const searchParams = useSearchParams();
        const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard';
        const [errorMessage, formAction, isPending] = useActionState(
          authenticate,
          undefined,
        );
        return (
            <form action={formAction} className="space-y-3 h-[60vh]">
          <div className="flex-1 rounded-lg bg-gray-50 pt-40 px-50">
            <h1 className={`mb-3 text-2xl`}>
              Please log in to continue.
            </h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={6}
                  />
                  <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></div>
                </div>
              </div>
            </div>
            <input type="hidden" name="redirectTo" value={callbackUrl} />
            <button type='submit' aria-disabled={isPending} className='border-2 px-6 py-3 mt-10 rounded-2xl cursor-pointer bg-primary text-white font-bold '>
              Log in 
            </button>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <div className="h-5 w-5 text-red-500">!</div>
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </div>
        </form>
        )
}