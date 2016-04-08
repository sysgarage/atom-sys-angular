Dialog = require './dialog'

module.exports =
class NewDialog extends Dialog

  constructor: (type, cb) ->
    this.type = type
    this.cb = cb

    super
      prompt: 'Enter name of ' + this.type
      input: ''
      select: true
      iconClass: 'icon-arrow-right'

  showDialog: (folderPath) ->
    this.folderPath = folderPath
    @attach()

  onConfirm: (input) ->
    if input
      properties =
        input: input
      this.cb(input, this.folderPath)

      @close()
    else
      @showError('You need to specify a name for the ' + this.type)
