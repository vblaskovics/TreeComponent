const nodeTemplate = (...args) => `
    <div class='tree-item'>
        <p>
            <span>${args[0]} ${args[1]}</span>
            <a>❎</a>
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

let serverData2 = {
    label: 'Mappa1',
    items: [
        { label: 'Fájl1' },
        { label: 'Fájl2 ' },
        {
            label: 'Mappa2',
            items: [
                { label: 'Fájl3 ' },
            ]
        },
        { label: 'Fájl4' }
    ]
}

function createNodeElement(nodeData, elParent) {
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

    // Add delete handling
    elNode.getElementsByTagName('a')[0].addEventListener('click', e => {
        deleteService(elNode.parentData, nodeData.label)
    })

    return elNode;
}


// Dummy server service
function deleteService(nodeData, childName) {
    if (!nodeData || !nodeData.items) return
    nodeData.items = nodeData.items.filter(item => item.label !== childName)
    render()
}

// Dummy server service
function saveService() {
    console.log(JSON.stringify(serverData, null, 4))
}

// Dummy server service
function updateService() {
    serverData = { ...serverData2 }
    render()
}

function createSubNodeElements(nodeData, elParent) {
    nodeData.items.forEach(childNode => {
        createNode(childNode, nodeData, elParent)
    })
}

function createNode(nodeData, parentData, elParent) {
    if (!nodeData || !nodeData.label) return

    // Init DOM element
    let elNode = createNodeElement(nodeData, elParent)

    // Dummy solution!!
    elNode.parentData = parentData

    // Add sub-nodes
    const isFolder = Array.isArray(nodeData.items)
    if (isFolder) {
        createSubNodeElements(nodeData, elNode)
    }
}

const elTree = document.getElementById('tree-component')

function render() {
    elTree.replaceChildren()
    createNode(serverData, null, elTree)
}

render()
