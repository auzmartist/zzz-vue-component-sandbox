<template>
  <div class="sandbox-prop" :invalid="invalid">
    <label>{{prop.name}}{{prop.required ? ' *' : ''}}</label>
    <textarea v-if="prop.type === 'object'" rows="2" columns="120"
      :class="{invalid: invalid}"
      v-model.trim="rawValue"
      :placeholder="prop.type"/>
    <input v-else :type="inputType"
      v-model="rawValue"
      :placeholder="prop.type"/>
    <br>
    <span style="display: none">{{value}}</span>
  </div>
</template>

<script>
export default {
  name: 'sandbox-prop',
  props: {
    prop: {
      type: Object,
      required: true,
    },
  },
  data: (vm) => {
    return {
      rawValue: (typeof vm.prop.default === 'function') ?
        JSON.stringify(vm.prop.default()) : vm.prop.default,
      invalid: vm.prop.required,
    }
  },
  computed: {
    inputType() {
      switch(this.prop.type) {
        case 'boolean': return 'checkbox'
        case 'number': return 'number'
        case 'string':
        default: return 'text'
      }
    },
    value() {
      if(typeof this.rawValue === 'function') return null
      const value = this.typeValidate(this.rawValue)
      this.$emit('input', value)
      return value
    },
  },
  methods: {
    typeValidate(value) {
      switch(this.prop.type) {
        case 'boolean': return !!value
        case 'number': return (value == null) ? null : Number(value)
        case 'object': return this._jsonValidate(value)
        case 'string':
        default: return value
      }
    },
    _jsonValidate(value) {
      if(value == null || value === '') {
        this.invalid = this.prop.required
        return null
      }
      let parsed = null
      value = value.replace(/'/gmi, '"')
      try {
        parsed = JSON.parse(value)
      } catch(err) {
        this.invalid = true
        return null
      }
      if(!parsed) {
        this.invalid = true
        return null
      }
      this.invalid = false
      return parsed
    },
  },
}
</script>

<style lang="stylus" scoped>
@require './variables.styl'
@require '~stylus-mixins/src/mixins.styl'

.sandbox-prop {
  position: relative
  flex(start, center)
  margin-right: 8px
  margin-bottom: 8px
  &:first-child {
    margin-left: 0
  }
  &::before {
    tooltip()
    font-family: 'Consolas', monospace
    background: white
  }
  & > label {
    font-weight: bold
    color: $label
    font-size: 0.9em
    margin-right: 6px
    & + div {
      min-height: 28px
      display: flex
      justify-content: flex-start
      align-items: center
    }
  }
  input, textarea {
    padding-left: 4px
    min-height: 24px
    border: 2px solid $border
    background: darken($border, 95%)
    border-radius: 4px
    transition-delay: 0s
    transition: 0.1s border linear
    &.invalid {
      border: 2px solid #d43
      transition-delay: 0.5s
      transition: 0.8s border ease-in
    }
  }
  input[type=text], textarea {
    width: 300px
  }
  input[type=number] {
    width: 100px
  }
  input[type="checkbox"]{
    square(16px)
  }
}
</style>
