import { createVuetify } from 'vuetify'
import type { VuetifyOptions } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'
import { VTextarea } from 'vuetify/components/VTextarea'
import { VCheckbox } from 'vuetify/components/VCheckbox'
import { VCombobox } from 'vuetify/components/VCombobox'
import { VIcon } from 'vuetify/components/VIcon'
 
const vuetifyOptions: VuetifyOptions = {
  components: {
    VBtn,
    VTextarea,
    VCheckbox,
    VCombobox,
    VIcon
  },
  directives: {}
}
 
const vuetify = createVuetify(vuetifyOptions)

export default vuetify
