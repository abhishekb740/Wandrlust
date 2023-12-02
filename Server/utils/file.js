const { writeFile } = require("node:fs/promises");
const { join: joinPath } = require("node:path");

const downloadFile = async (filename, content) => {
  const baseDir = joinPath(__dirname, "..", "routes", "uploads");
  try {
    await writeFile(joinPath(baseDir, filename), content);
    return joinPath(baseDir, filename)
      .replace(baseDir, "/static/files")
      .replace(/\\/g, "/");
  } catch (e) {
    console.warn(e);
    return null;
  }
};

module.exports = { downloadFile };
