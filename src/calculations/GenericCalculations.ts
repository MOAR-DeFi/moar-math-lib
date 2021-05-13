import { evaluate } from 'mathjs';

export function mul(arg1: string, arg2: string): string {
    return evaluate(`${arg1} * ${arg2}`);
}

export function div(arg1: string, arg2: string): string {
    return evaluate(`${arg1} / ${arg2}`);
}

export function add(arg1: string, arg2: string): string {
    return evaluate(`${arg1} + ${arg2}`);
}

export function sub(arg1: string, arg2: string): string {
    return evaluate(`${arg1} - ${arg2}`);
}

export function pow(arg1: string, arg2: string): string {
    return evaluate(`${arg1} ^ ${arg2}`);
}