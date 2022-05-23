const nodeTemplate = (...args) => `
    <div class='tree-item'>
        <p>
            <span>${args[0]} ${args[1]}</span>
            <i class="fa-solid fa-trash"></i>
        </p>
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

function createNodeElement(nodeData, elParent){
    let template = document.createElement('template')
    const isFolder = Array.isArray(nodeData.items)
    const icon = isFolder ? '📂' : '📄'
    template.innerHTML = nodeTemplate(icon, nodeData.label)
    let elNode = elParent.appendChild(template.content.firstElementChild)
    
    // Add click handling
    elNode.addEventListener('click', e => {
        e.stopPropagation()
        e.target.parentNode.classList.toggle('closed')
    })
    
    return elNode;
}

function createSubNodeElements(nodeData, elParent){
    nodeData.items.forEach( node => {
        createNode(node, elParent)
    })
}

function createNode(nodeData, elParent) {
    if ( !nodeData || !nodeData.label ) return
    
    // Init DOM element
    let elNode = createNodeElement(nodeData, elParent)
    
    // Add sub-nodes
    const isFolder = Array.isArray(nodeData.items)
    if (isFolder) {
        createSubNodeElements(nodeData, elNode)
    }
}

const elTree = document.getElementById('tree-component')
createNode(serverData, elTree)

console.log(serverData)