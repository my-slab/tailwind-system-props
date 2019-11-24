const fs = require('fs')

const colors = [
  ['text', 'color'],
  ['bg', 'bg']
]

function upper(str) {
  return str.toUpperCase()
}

function join(arr, separator = '') {
  return arr.join(separator)
}

function toClasses(tailwindKey, systemProp) {
  return props => {
    const prop = props[systemProp]

    if (prop) {
      if (Array.isArray(prop)) {
        const responsives = ['sm:', 'md:', 'lg:', 'xl:']

        return prop
          .map((value, i) =>
            join([responsives[i], join([tailwindKey, value], '-')])
          )
          .reduce((acc, value) => join([acc, value], ' ').trim())
      }

      return join([tailwindKey, prop], '-')
    }

    return ''
  }
}

const directiveTemplate = (tailwindKey, systemProp) => `
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[${systemProp}]'
})
export class ${upper(systemProp)}Directive implements OnInit {
  private elRef: ElementRef;

  @Input() ${systemProp}: any | any[];

  constructor(elRef: ElementRef) {
    this.elRef = elRef;
  }

  ngOnInit() {
    this.elRef.nativeElement.classList.add(toClasses(
      '${tailwindKey}',
      '${systemProp}'
    )(this.${systemProp}))
  }
}
`

;(() => {
  colors.map(([tailwindKey, systemProp]) => {
    // console.log({ tailwindKey, systemProp })
    // console.log(directiveTemplate(tailwindKey, systemProp))
    fs.writeFile(
      `${systemProp}.directive.ts`,
      directiveTemplate(tailwindKey, systemProp),
      function(err) {
        if (err) throw err
        console.log('File is created successfully.')
      }
    )
  })
})()

function createPropDirective() {}
