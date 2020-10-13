const TerserPlugin = require('terser-webpack-plugin');
module.exports = function() {
  return {
  
    optimization: {
      
      minimizer: [
        new TerserPlugin({
          cache: false,
          parallel: true,
        }),
      ],
      runtimeChunk:'single',
  
      splitChunks: {
        chunks (chunk) {
          return chunk.name;
        },
      },
      
      noEmitOnErrors: true,
  
      namedModules: true,
  
      namedChunks: true,
  
      moduleIds: 'hashed',
  
      mangleWasmImports: true,
  
      removeAvailableModules: true,
  
      removeEmptyChunks: true,
  
      mergeDuplicateChunks: true,
  
      flagIncludedChunks: true,
  
      providedExports: true,
  
      usedExports: true,
  
      concatenateModules: true,
  
      portableRecords: true,

    },
  
  };
};
