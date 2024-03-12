function Checkbox(args) {
  const {
    checked = false,
    icon = 'unchecked.svg',
    iconChecked = null,
    type = null
  } = args
  return html`
    <div class="checkbox ${checked ? 'checked' : 'unchecked'}">
      <!--img class="icon off" src="media/unchecked.svg" /-->
      <!--img class="icon on" src="media/checked.svg" /-->
      <img class="icon" src="media/${icon}" />
    </div>
  `
}
