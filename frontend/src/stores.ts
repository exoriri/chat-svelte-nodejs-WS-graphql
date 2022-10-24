import { writable, Writable } from 'svelte/store';
import { User } from './generated';

const cachedUser = localStorage.getItem('user');
export const user = writable<User | null>(cachedUser !== null ? JSON.parse(cachedUser) : null);