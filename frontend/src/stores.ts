import { writable, Writable } from 'svelte/store';
import { User, Chat } from './generated';

interface IChatStore {
    selectedChat: Chat | null;
    loadingSelectedChat: boolean;
    lastSentMessage: ''
};

const cachedUser = localStorage.getItem('user');
export const user = writable<User | null>(cachedUser !== null ? JSON.parse(cachedUser) : null);

export const chat = writable<IChatStore>({
    selectedChat: null,
    loadingSelectedChat: false,
    lastSentMessage: ''
});