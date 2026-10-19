
import de from './de.json';
import pt from './pt.json';
import en from './en.json';

export type ControlRoomLanguage = 'auto' | 'de' | 'pt' | 'en';

type TranslationLanguage = Exclude<ControlRoomLanguage, 'auto'>;

const translations = { de, pt, en };

export function resolveLanguage(
  selected: ControlRoomLanguage = 'auto',
  homeAssistantLanguage?: string
): TranslationLanguage {
  const language = selected === 'auto'
    ? (homeAssistantLanguage || navigator.language || 'en')
    : selected;

  const normalized = language.toLowerCase().split(/[-_]/)[0];

  if (normalized === 'de' || normalized === 'pt') {
    return normalized;
  }

  return 'en';
}

export function translate(
  key: string,
  selected: ControlRoomLanguage = 'auto',
  homeAssistantLanguage?: string
): string {
  const language = resolveLanguage(selected, homeAssistantLanguage);

  const lookup = (dictionary: object): string | undefined => {
    let current: unknown = dictionary;

    for (const part of key.split('.')) {
      if (
        typeof current !== 'object' ||
        current === null ||
        !(part in current)
      ) {
        return undefined;
      }

      current = (current as Record<string, unknown>)[part];
    }

    return typeof current === 'string' ? current : undefined;
  };

  return lookup(translations[language]) ?? lookup(en) ?? key;
}
