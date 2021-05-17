import { create, all, BigNumber, bignumber } from 'mathjs';

const config = {
    number: 'BigNumber',
    precision: 18,
};
const mathjs = create(all, config);

export { BigNumber, bignumber, mathjs };
