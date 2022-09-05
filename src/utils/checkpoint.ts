import { CheckpointConfig } from '../types';

export const getContractsFromConfig = (config: CheckpointConfig): string[] => {
  return (config.sources || []).map(source => source.contract);
};

export const toPlural = (str: string): string => {
  let plural = '';

  if (str[str.length - 1].toLowerCase() === 'y') {
    plural = 'ies';
    return str.slice(0, -1) + plural;
  } else plural = 's';
  return str + plural;
};
