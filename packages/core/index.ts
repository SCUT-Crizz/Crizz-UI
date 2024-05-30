import { makeInstaller } from '@crizz-ui/utils'
import components from './components'
import '@crizz-ui/theme/index.css'

const installer = makeInstaller(components)

export * from '@crizz-ui/components'
export default installer
