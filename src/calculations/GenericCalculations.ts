import { mathjs, bignumber } from '../mathjs';

export function mul(arg1: string, arg2: string): string {
    const result = bignumber(arg1).mul(arg2);
    return mathjs.format(result, { notation: 'fixed' });
}

export function div(arg1: string, arg2: string): string {
    const result = bignumber(arg1).div(arg2);
    return mathjs.format(result, { notation: 'fixed' });
}

export function add(arg1: string, arg2: string): string {
    const result = bignumber(arg1).add(arg2);
    return mathjs.format(result, { notation: 'fixed' });
}

export function sub(arg1: string, arg2: string): string {
    const result = bignumber(arg1).sub(arg2);
    return mathjs.format(result, { notation: 'fixed' });
}

export function pow(arg1: string, arg2: string): string {
    const result = bignumber(arg1).pow(arg2);
    return mathjs.format(result, { notation: 'fixed' });
}

export function round(value: string, precision: number): string {
    return mathjs.format(bignumber(value), { notation: 'fixed', precision });
}
