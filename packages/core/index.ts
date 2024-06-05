import { makeInstaller } from '@crizz-ui/utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import components from './components'
import printLogo from './printLogo'
import '@crizz-ui/theme/index.css'

printLogo()

library.add(fas)
const installer = makeInstaller(components)

export * from '@crizz-ui/components'
export default installer
