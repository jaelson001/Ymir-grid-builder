const gridContainer = document.getElementById('grid-container');
const addDivButton = document.getElementById('add-div');
const deleteDivButton = document.getElementById('delete-div');
const selectedDivInfo = document.getElementById('selected-div-info');
let selectedDiv = null;

const copyResButton = document.getElementById('copy-res');

// Adiciona evento ao botão para criar uma nova div clicável
addDivButton.addEventListener('click', () => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('grid-item');
    newDiv.style.gap = '10px';
    newDiv.style.gridRowStart = 1;
    newDiv.style.gridColumnStart = 1;
    newDiv.style.gridRowEnd = 'span 1';
    newDiv.style.gridColumnEnd = 'span 1';

    // Torna a nova div clicável
    newDiv.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que o clique afete outros elementos
        selectDiv(newDiv);
    });

    // Adiciona a nova div ao contêiner selecionado ou ao grid principal
    if (selectedDiv) {
        selectedDiv.appendChild(newDiv); // Adiciona como filho da div selecionada
    } else {
        gridContainer.appendChild(newDiv); // Adiciona ao contêiner principal
    }
});

// Função para selecionar uma div
function selectDiv(div) {
    if (selectedDiv) {
        selectedDiv.classList.remove('selected');
    }
    selectedDiv = div;
    selectedDiv.classList.add('selected');
    updateSelectedDivInfo();
    updateInputFields(); // Atualiza os campos de input com os valores da div selecionada
}

// Atualiza as informações da div selecionada
function updateSelectedDivInfo() {
    if (selectedDiv) {
        const rowStart = selectedDiv.style.gridRowStart || 1;
        const columnStart = selectedDiv.style.gridColumnStart || 1;
        const rowEnd = selectedDiv.style.gridRowEnd.replace('span ', '') || 1;
        const columnEnd = selectedDiv.style.gridColumnEnd.replace('span ', '') || 1;

        
    }
}

// Atualiza os campos de input com os valores da div selecionada
function updateInputFields() {
    if (selectedDiv) {
        document.getElementById('adjust-row').value = selectedDiv.style.gridRowStart || 1;
        document.getElementById('adjust-column').value = selectedDiv.style.gridColumnStart || 1;
        document.getElementById('adjust-row-span').value = selectedDiv.style.gridRowEnd.replace('span ', '') || 1;
        document.getElementById('adjust-column-span').value = selectedDiv.style.gridColumnEnd.replace('span ', '') || 1;
    }
}

// Limpa os campos de input
function clearInputFields() {
    document.getElementById('adjust-row').value = '';
    document.getElementById('adjust-column').value = '';
    document.getElementById('adjust-row-span').value = '';
    document.getElementById('adjust-column-span').value = '';
}

// Ajusta as propriedades da div selecionada
document.getElementById('adjust-row').addEventListener('input', (event) => {
    if (selectedDiv) {
        selectedDiv.style.gridRowStart = event.target.value;
        updateSelectedDivInfo();
    }
});

document.getElementById('adjust-column').addEventListener('input', (event) => {
    if (selectedDiv) {
        selectedDiv.style.gridColumnStart = event.target.value;
        updateSelectedDivInfo();
    }
});

document.getElementById('adjust-row-span').addEventListener('input', (event) => {
    if (selectedDiv) {
        selectedDiv.style.gridRowEnd = `span ${event.target.value}`;
        updateSelectedDivInfo();
    }
});

document.getElementById('adjust-column-span').addEventListener('input', (event) => {
    if (selectedDiv) {
        selectedDiv.style.gridColumnEnd = `span ${event.target.value}`;
        updateSelectedDivInfo();
    }
});

// Adiciona evento ao botão para excluir a div selecionada
deleteDivButton.addEventListener('click', () => {
    if (selectedDiv) {
        selectedDiv.remove(); // Remove a div selecionada
        selectedDiv = null; // Limpa a referência à div selecionada
        updateSelectedDivInfo(); // Atualiza as informações da div selecionada
        clearInputFields(); // Limpa os campos de input
    } else {
        alert('Nenhuma div selecionada para excluir.');
    }
});

// Função para desselecionar a div ao clicar no grid-container
gridContainer.addEventListener('click', () => {
    if (selectedDiv) {
        selectedDiv.classList.remove('selected');
        selectedDiv = null;
        updateSelectedDivInfo();
        clearInputFields(); // Limpa os campos de input
    }
});

// Adiciona evento ao botão para copiar o HTML do grid-container
copyResButton.addEventListener('click', () => {
    const gridHTML = gridContainer.outerHTML; // Obtém o HTML do grid-container
    copyToClipboard(gridHTML); // Copia o HTML para a área de transferência
    alert('HTML do grid copiado para a área de transferência!');
});

// Função para copiar texto para a área de transferência
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}