export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied:", text);
  } catch (err) {
    console.error("Failed to copy!", err);
  }
};
