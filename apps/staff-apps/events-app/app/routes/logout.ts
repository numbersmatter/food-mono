import type { ActionFunctionArgs } from 'react-router';
import { signOut } from '../services/auth-funcs.server';

export async function action({ request }: ActionFunctionArgs) {
  return await signOut({ request });
}
