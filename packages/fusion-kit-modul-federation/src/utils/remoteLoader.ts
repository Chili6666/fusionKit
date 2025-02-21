import {
  __federation_method_getRemote as getRemote,
  __federation_method_setRemote as setRemote,
  __federation_method_unwrapDefault as unwrapModule,
  // @ts-expect-error test
} from '__federation__';

//https://vite.dev/guide/api-plugin#virtual-modules-convention

//https://github.com/originjs/vite-plugin-federation/blob/main/packages/examples/vue3-demo-esm/layout/src/Layout.vue

//https://github.com/originjs/vite-plugin-federation?tab=readme-ov-file

/**
 *
 * @param url 'http://localhost:9000/assets/remoteEntry.js'
 * @param name 'remoteA'
 * @param module './RemoteARoot'
 * @returns
 */
export const loadDynamicRemoteModule = async (url: string, name: string, module: string, format?: 'esm' | 'systemjs' | 'var', bundler?: 'vite' | 'webpack') => {
  setRemote(name, {
    url: () => Promise.resolve(url),
    format: format ? format : 'esm',
    from: bundler ? bundler : 'vite',
  });

  const remoteModule = await getRemote(name, module);
  //to access the default export of the module
  //return await unwrapModule(remoteModule);
  return remoteModule;
};

export const loadDynamicRemoteComponent = async (url: string, name: string, module: string, format?: 'esm' | 'systemjs' | 'var', bundler?: 'vite' | 'webpack') => {
  const remoteModule = loadDynamicRemoteModule(url, name, module, format, bundler);
  //to access the default export of the module
  return await unwrapModule(remoteModule);
};
