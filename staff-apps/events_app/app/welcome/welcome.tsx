import React from 'react';
import logoDark from './logo-dark.svg';
import logoLight from './logo-light.svg';
import { isBlank } from '@food-mono/common';

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <p>undefined isBlank - {isBlank(undefined) ? 'true' : 'false'}</p>
          <p>false isBlank - {isBlank(false) ? 'true' : 'false'}</p>
          <p>true isBlank - {isBlank(true) ? 'true' : 'false'}</p>
          <p>Empty object isBlank - {isBlank({}) ? 'true' : 'false'}</p>
        </div>
      </div>
    </main>
  );
}
