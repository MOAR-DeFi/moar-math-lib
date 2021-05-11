import { calculateLiquidity } from '../index';
import {
  calculateLiquidityBasicAccount,
  calculateLiquidityBasicAccountMultipleCOPsMultipleBorrows,
  calculateLiquidityBasicAccountWithCOPMTM,
  calculateLiquidityBasicAccountWithCOPNotLocked,
  calculateLiquidityBasicAccountWithCOPs,
  calculateLiquidityBasicAccountWithCOPsWithBorrow, calculateLiquidityBasicAccountWithOutdatedCOP
} from './testData';

describe('calculate liquidity', () => {
  it('calculates basic liquidy', () => {
    const liquidity = calculateLiquidity(calculateLiquidityBasicAccount);
    expect(liquidity).toEqual(3178);
  });

  it('calculates liquidity with added cops', () => {
    const liquidity = calculateLiquidity(calculateLiquidityBasicAccountWithCOPs);
    expect(liquidity).toEqual(3928);
  });

  it('calculates liquidity with added cops but no locked value', () => {
    const liquidity = calculateLiquidity(calculateLiquidityBasicAccountWithCOPNotLocked);
    expect(liquidity).toEqual(3178);
  });

  it('calculates liquidity with added cop that is outdated', () => {
    const liquidity = calculateLiquidity(calculateLiquidityBasicAccountWithOutdatedCOP);
    expect(liquidity).toEqual(3178);
  });

  it('calculates liquidity with added cops with strike price lower than spot price', () => {
    const liquidity = calculateLiquidity(calculateLiquidityBasicAccountWithCOPMTM);
    expect(liquidity).toEqual( 5011.333333333333);
  });

  it('calculates liquidity with added cops and with borrow', () => {
    const liquidity = calculateLiquidity(calculateLiquidityBasicAccountWithCOPsWithBorrow);
    expect(liquidity).toEqual(3808);
  });

  it('calculates liquidity with added cops and with many borrows', () => {
    const liquidity = calculateLiquidity(calculateLiquidityBasicAccountMultipleCOPsMultipleBorrows);
    expect(liquidity).toEqual(19438);
  });
});
