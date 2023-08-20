import { html, reactive } from '@arrow-js/core'

const data = reactive({
  items: [
    { id: 17, task: 'Check email' },
    { id: 21, task: 'Get groceries' },
    { id: 44, task: 'Make dinner' },
  ]
})

function addItem(e) {
  e.preventDefault()
  const input = document.getElementById('new-item')
  data.items.push({
    id: Math.random(),
    task: input.value,
  })
  input.value = ''
}

html`
<ul>
  ${() => data.items.map(
      item => html`<li>${item.task}</li>`.key(item.id)
    )}
</ul>

<form @submit="${addItem}">
  <input type="text" id="new-item">
  <button>Add</button>
</form>`