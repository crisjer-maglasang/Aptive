import { mergeClassName } from '@/lib'
import { v4 as uuidv4 } from 'uuid'

export default class Props {
  constructor(props) {
    Object.keys(props).forEach(key => {
      this[key] = props[key]
    })
  }

  withClassName(...classes) {
    return this.withProp('className', mergeClassName(...classes, this.className), true)
  }

  withKey(key) {
    return this.withProp('key', key || uuidv4())
  }

  withProp(name, value, override = false) {
    this[name] = override ? value : this[name] || value

    return this
  }
}
