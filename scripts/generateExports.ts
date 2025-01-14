import { readdir } from "node:fs/promises";

async function listAllExports() {
  //Get all typescript files
  const tsFiles = (await readdir("./src", { recursive: true })).filter(file =>
    [".ts", ".tsx"].some(ext => file.endsWith(ext)),
  );

  //Split paths into [directory, filename]
  const filesToExport = tsFiles.map(path => {
    const split = path.split("/");
    const directory = split.slice(0, split.length - 1).join("/");
    const file = split.slice(-1)[0];

    return [directory, file];
  });

  //Get all unique directoies
  const directories = new Set<string>();
  for (const dir of filesToExport.map(([dir]) => dir).filter(dir => !dir.includes("routes"))) {
    directories.add(dir);
  }

  //Map directories to export lines
  const directoryExportLines = await Promise.all(
    Array.from(directories).map(async dir => {
      const dirFiles = await Promise.all(
        filesToExport
          .filter(([_dir]) => _dir === dir)
          .map(async ([_, filename]) => {
            return [dir, filename, await Bun.file(`./src/${dir}/${filename}`).text()];
          }),
      );

      return [
        `/**\n * ${dir}\n */`,
        dirFiles
          .map(([dir, filename, content]) => {
            const name = filename.split(".").slice(0, -1).join(".");
            const hasDefaultExports = content.includes("export default ") && !name.includes(".");

            return `export * from "./${dir}/${name}";${
              hasDefaultExports ? `\nexport { default as ${name} } from "./${dir}/${name}";` : ""
            }`;
          })
          .join("\n"),
        "",
      ].join("\n");
    }),
  );

  return directoryExportLines.join("\n");
}

await Bun.write("./src/index.generated.ts", await listAllExports());
