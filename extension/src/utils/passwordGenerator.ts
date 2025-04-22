import generator from "generate-password-ts";

export function generatePassword({
  totalLength = 12,
  numSymbols = 2,
  numNumbers = 3,
}: {
  totalLength?: number;
  numSymbols?: number;
  numNumbers?: number;
}) {
  const symbolCount = Math.max(0, numSymbols ?? 0);
  const numberCount = Math.max(0, numNumbers ?? 0);
  const letterCount = Math.max(0, totalLength - symbolCount - numberCount);

  const symbols =
    symbolCount > 0
      ? generator.generateMultiple(symbolCount, {
          length: 1,
          symbols: "!@#$%^&*",
          numbers: false,
          uppercase: false,
          lowercase: false,
        })
      : [];

  const numbers =
    numberCount > 0
      ? generator.generateMultiple(numberCount, {
          length: 1,
          symbols: false,
          numbers: true,
          uppercase: false,
          lowercase: false,
        })
      : [];

  const letters =
    letterCount > 0
      ? generator.generateMultiple(letterCount, {
          length: 1,
          symbols: false,
          numbers: false,
          uppercase: true,
          lowercase: true,
        })
      : [];

  const all = [...symbols, ...numbers, ...letters];

  if (all.length === 0) return "";

  return all.sort(() => Math.random() - 0.5).join("");
}
