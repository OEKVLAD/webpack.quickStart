exports.publishManifest = () => {
  const ManifestPlugin = require('webpack-assets-manifest');
  
  return {
    plugins: [
      new ManifestPlugin({
        customize: retainOnlyJSAndCSS,
        done: augmentManifestWithEntrypoints,
        publicPath: true,
      }),
    ],
  }
};

// …

// Manifest helper functions
// -------------------------

// If the plugin handled this, we wouldn't need to rewrite, we could take the existing
// manifest and set(…) in there pre-emit.
async function addEntrypointsToManifest(data, path) {
  const readFile = promisify(fs.readFile);
  const writeFile = promisify(fs.writeFile);
  const orig = JSON.parse(await readFile(path));
  orig.entryPoints = data;
  await writeFile(path, JSON.stringify(orig, setsAsArrays, 2), {
    encoding: 'utf-8',
  });
  console.log(
    `[Manifest] Augmented manifest (with entrypoints data) written to ${path}`
  )
}

// This is the core issue.
function augmentManifestWithEntrypoints(manifest, stats) {
  // Stay consistent with the main behavior of the plugin's `publicPath` option.
  let prefix = manifest.options.publicPath;
  if (prefix === true) {
    prefix = stats.compilation.options.output.publicPath
  }
  if (!prefix) {
    prefix = ''
  }
  // Accrue entry points chunk listing info
  const entrypoints = {};
  for (const [entry, { chunks }] of stats.compilation.entrypoints) {
    const files = chunks.reduce(
      (acc, { files }) => {
        for (const file of files) {
          if (file.endsWith('.js')) {
            acc.js.add(Path.join(prefix, file))
          } else if (file.endsWith('.css')) {
            acc.css.add(Path.join(prefix, file))
          }
        }
        return acc
      },
      { css: new Set(), js: new Set() }
    );
    entrypoints[entry] = files
  }
  
  // Update file
  addEntrypointsToManifest(entrypoints, manifest.getOutputPath())
}

const REGEX_SOURCE = /\.(?:css|jsx?)$/i;

function retainOnlyJSAndCSS(key, value) {
  if (!REGEX_SOURCE.test(key)) {
    return false
  }
  
  return { key, value }
}

// Sets do not have a useful `toJSON()` implementation. Turn them into arrays.
function setsAsArrays(key, value) {
  if (value instanceof Set) {
    return [...value]
  }
  
  return value
}
