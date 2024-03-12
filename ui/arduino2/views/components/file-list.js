function DiskFileList(state, emit) {
  
  function onKeyEvent(e) {
    if(e.key.toLowerCase() === 'enter') {
      e.target.blur()
    }
    if(e.key.toLowerCase() === 'escape') {
      e.target.value = null
      e.target.blur()
    }
  }

  function DiskFileItem(item, i) {

    if (item.type === 'folder') {
      const isChecked = state.selectedFiles.find(f => f.fileName === item.fileName && f.source === 'disk')
      return html`
        <div class="item ${isChecked ? 'checked' : ''}" onclick=${(e) => emit('toggle-file-selection', item, 'disk', e)} ondblclick=${() => emit('navigate-disk-folder', item.fileName)}>
          ${Checkbox({
            checked: isChecked,
            type: 'folder',
            icon: 'folder.svg',
            iconChecked: 'folder-checked.svg'
          })}
          <div class="text">${item.fileName}</div>
          <div class="options" onclick=${() => console.log('options', item)}>
            <img src="media/falafel.svg" />
          </div>
        </div>
      `
    } else {
      const isChecked = state.selectedFiles.find(f => f.fileName === item.fileName && f.source === 'disk')
      return html`
        <div class="item ${isChecked ? 'checked' : ''}" onclick=${(e) => emit('toggle-file-selection', item, 'disk', e)} ondblclick=${() => emit('open-single-file', item, 'disk')}>
          ${Checkbox({
            checked: isChecked,
            type: 'file',
            icon: 'file.svg',
            iconChecked: 'file-checked.svg'
          })}
          
          <div class="text">${item.fileName}</div>
          <div class="options">
            <img src="media/falafel.svg" />
          </div>
        </div>
      `
    }
  }

  const newFolderItem = html`
    <div class="item">
      <img class="icon" src="media/folder.svg" />
      <div class="text">
        <input type="text" onkeydown=${onKeyEvent} onblur=${(e) => emit('finish-creating', e.target.value)}/>
      </div>
    </div>
  `
  const newFileItem = html`
    <div class="item">
      <img class="icon" src="media/file.svg" />
      <div class="text">
        <input type="text" onkeydown=${onKeyEvent} onblur=${(e) => emit('finish-creating', e.target.value)}/>
      </div>
    </div>
  `

  const list = html`
    <div class="file-list">
      <div class="list">
        <div class="item" onclick=${() => emit('navigate-disk-parent')}>..</div>
        ${state.creatingFile == 'disk' ? newFileItem : null}
        ${state.creatingFolder == 'disk' ? newFolderItem : null}
        ${state.diskFiles.map(DiskFileItem)}
      </div>
    </div>
  `

  // Mutation observer
  const observer = new MutationObserver((mutations) => {
    const el = list.querySelector('input')
    if (el) {
      el.focus()
    }
  })
  observer.observe(list, { childList: true, subtree:true })

  return list
}

function BoardFileList(state, emit) {

  function onKeyEvent(e) {
    if(e.key.toLowerCase() === 'enter') {
      e.target.blur()
    }
    if(e.key.toLowerCase() === 'escape') {
      e.target.value = null
      e.target.blur()
    }
  }

  function BoardFileItem(item, i) {
    if (item.type === 'folder') {
      const isChecked = state.selectedFiles.find(f => f.fileName === item.fileName && f.source === 'board')
      return html`
        <div class="item ${isChecked ? 'checked' : ''}" onclick=${(e) => emit('toggle-file-selection', item, 'board', e)} ondblclick=${() => emit('navigate-board-folder', item.fileName)}>
          ${Checkbox({
            checked: isChecked,
            type: 'folder',
            icon: 'folder.svg',
            iconChecked: 'folder-checked.svg'
          })}
          <div class="text">${item.fileName}</div>
          <div class="options" onclick=${() => console.log('options', item)}>
            <img src="media/falafel.svg" />
          </div>
        </div>
      `
    } else {
      const isChecked = state.selectedFiles.find(f => f.fileName === item.fileName && f.source === 'board')
      return html`
        <div class="item ${isChecked ? 'checked' : ''}" onclick=${(e) => emit('toggle-file-selection', item, 'board', e)} ondblclick=${() => emit('open-single-file', item, 'board')}>
          ${Checkbox({
            checked: isChecked,
            type: 'file',
            icon: 'file.svg',
            iconChecked: 'file-checked.svg'
          })}
          <div class="text">${item.fileName}</div>
          <div class="options" onclick=${() => console.log('options', item)}>
            <img src="media/falafel.svg" />
          </div>
        </div>
      `
    }
  }

  const newFolderItem = html`
    <div class="item">
      <img class="icon" src="media/folder.svg" />
      <div class="text">
        <input type="text" onkeydown=${onKeyEvent} onblur=${(e) => emit('finish-creating', e.target.value)}/>
      </div>
    </div>
  `

  const newFileItem = html`
    <div class="item">
      <img class="icon" src="media/file.svg" />
      <div class="text">
        <input type="text" onkeydown=${onKeyEvent}  onblur=${(e) => emit('finish-creating', e.target.value)}/>
      </div>
    </div>
  `

  const list = html`
    <div class="file-list">
      <div class="list">
        <div class="item" onclick=${() => emit('navigate-board-parent')}>..</div>
        ${state.creatingFile == 'serial' ? newFileItem : null}
        ${state.creatingFolder == 'serial' ? newFolderItem : null}
        ${state.boardFiles.map(BoardFileItem)}
      </div>
    </div>
  `
  // Mutation observer
  const observer = new MutationObserver((mutations) => {
    const el = list.querySelector('input')
    if (el) {
      el.focus()
    }
  })
  observer.observe(list, { childList: true, subtree:true })

  return list
}
