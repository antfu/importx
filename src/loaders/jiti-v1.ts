import JITI from 'jiti-v1'
import type { ImportxModuleInfo, ImportxOptions } from '../types'

export async function loader(info: ImportxModuleInfo, options: ImportxOptions): Promise<any> {
  const jiti = JITI(info.parentPath, {
    esmResolve: true,
    ...(info.cache === false
      ? {
          cache: false,
          requireCache: false,
        }
      : {}),
    ...options.loaderOptions?.jitiV1,
  })
  const mod = jiti(info.specifier)
  info.dependencies = Object
    .values(jiti.cache || {})
    .map((i: any) => i.filename)
    .filter(Boolean)
  return mod
}
