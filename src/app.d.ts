// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
        namespace App {
                // interface Error {}
                // interface Locals {}
                // interface PageData {}
                // interface PageState {}
                // interface Platform {}
        }
}

declare module 'lucide-svelte' {
        import type { SvelteComponentTyped } from 'svelte';

        type IconProps = {
                color?: string;
                size?: string | number;
                strokeWidth?: string | number;
                absoluteStrokeWidth?: boolean;
                [key: string]: unknown;
        };

        type IconEvents = Record<string, CustomEvent<unknown>>;

        type IconSlots = {
                default: unknown;
        };

        class LucideIcon extends SvelteComponentTyped<IconProps, IconEvents, IconSlots> {}

        export const ArrowLeft: typeof LucideIcon;
        export const Settings: typeof LucideIcon;
        export const Database: typeof LucideIcon;
        export const Shield: typeof LucideIcon;
        export const Zap: typeof LucideIcon;
        export const Github: typeof LucideIcon;
        export const Sun: typeof LucideIcon;
        export const Moon: typeof LucideIcon;
        export const CheckCircle: typeof LucideIcon;
        export const Download: typeof LucideIcon;
        export const Code: typeof LucideIcon;
}

export {};
