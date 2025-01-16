import { ObjectDirective } from 'vue';

declare const createSeparatedDirectives: <T>(ctxSetup: () => T, callback: (ctx: T) => ObjectDirective & {
    bindingMounted?: ObjectDirective["updated"];
}) => ObjectDirective<any, any, string, string> & {
    bindingMounted?: ObjectDirective["updated"];
};

export { createSeparatedDirectives };
