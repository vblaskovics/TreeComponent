const elTree = document.getElementById('tree-component')

const nodeTemplate = (...args) => `
    <div class="tree-item">
        <p>${args[0]} ${args[1]}</p>
    </div>
`

let data = {
    label: 'Mappa1',
    items: [
        {
            label: "Fájl1"
        },
        {
            label: "Mappa2",
            items: [
                {
                    label: "Fájl2"
                },
                {
                    label: "Fájl3"
                }
            ]
        },
        {
            label: "Fájl4"
        },
        {
            label: "Fájl5"
        }
    ]
}


function createNode(node, elParent) {
    if (!node || !node.label) return
    const isFolder = Array.isArray(node.items)

    let template = document.createElement('template');
    const icon = isFolder ? '📁' : '📄'
    template.innerHTML = nodeTemplate(icon, node.label);
    const elNode = elParent.appendChild(template.content.firstElementChild)

    elNode.addEventListener('click', e => {
        e.stopPropagation()
        e.target.parentNode.classList.toggle('closed')
    })

    if (isFolder) {
        node.items.forEach(node => {
            createNode(node, elNode)
        })
    }

}

createNode(data, elTree)

