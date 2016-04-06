Dialog = require './dialog'

module.exports =
class NewDialog extends Dialog

  constructor: (type, cb, options) ->
    this.type = type
    this.cb = cb
    this.options = options
    input = 'sys-' + type

    super
      prompt: 'Enter name of ' + this.type
      input: input
      select: true
      iconClass: 'icon-arrow-right'


  onConfirm: (input) ->
    if input
      properties =
        input: input

      this.cb(input, this.options)

      @close()
    else
      @showError('You need to specify a name for the ' + this.type)
