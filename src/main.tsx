import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
// filtre resoudre animation erreur
const originalError = console.error;
console.error = (...args: unknown[]) => {
  const firstArg = args[0];
  if (
    typeof firstArg === "string" &&
    firstArg.includes("Failed to load animation with id")
  ) {
    return;
  }
  originalError(...(args as Parameters<typeof console.error>));
};
ModuleRegistry.registerModules([AllCommunityModule]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
