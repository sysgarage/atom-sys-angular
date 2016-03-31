Dialog = require './dialog'

module.exports =
class NewDialog extends Dialog

  constructor: (type) ->
    this.type = type
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

      # create

      @close()
    else
      @showError('You need to specify a name for the ' + this.type)
