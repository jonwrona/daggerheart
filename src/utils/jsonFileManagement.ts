export const saveJSONToFile = (
  data: Record<string, unknown> | Array<unknown>,
  filename: string = "daggerheart-toolset-json"
) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.daggerheart`; // custom daggerheart extension
  a.click();

  URL.revokeObjectURL(url);
};
