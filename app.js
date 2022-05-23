const nodeTemplate = (...args) => `
    <div class='tree-item'>
        <p>${args[0]} ${args[1]}</p>
    </div>
`


let serverData = {
    label: 'Mappa1',
    items: [
        { label: 'Fájl1' },
        {
            label: 'Mappa2',
            items: [
                { label: 'Fájl2 ' },
                { label: 'Fájl3 ' },
            ]
        },
        { label: 'Fájl4' }
    ]
}

function createNode(nodeData, elParent) {
    if ( !nodeData || !nodeData.label ) return
    const isFolder = Array.isArray(nodeData.items)
    
    // Init DOM element
    let template = document.createElement('template')
    const icon = isFolder ? '📂' : '📄'
    template.innerHTML = nodeTemplate(icon, nodeData.label)
    let elNode = elParent.appendChild(template.content.firstElementChild)

    // Add click handling
    elNode.addEventListener('click', e => {
        e.stopPropagation()
        e.target.parentNode.classList.toggle('closed')
    })

    // Add sub-nodes
    if (isFolder) {
        nodeData.items.forEach( node => {
            createNode(node, elNode)
        })
    }
}

const elTree = document.getElementById('tree-component')
createNode(serverData, elTree)

console.log(serverData)