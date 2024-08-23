document.addEventListener('DOMContentLoaded', () => {
    const pokemonNameInput = document.getElementById('pokemonNameInput');
    
    // Adiciona o evento de pressionar "Enter" para buscar Pokémon
    pokemonNameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita o comportamento padrão de submit
            getPokemon();
        }
    });

    // Adiciona o evento de clique para o botão de reset
    document.getElementById('resetButton').addEventListener('click', () => {
        document.getElementById('pokemonNameInput').value = '';
        document.getElementById('pokemonInfo').style.display = 'none';
        document.getElementById('loadingIndicator').style.display = 'none';
    });
    
    // Adiciona o evento de clique para abrir e fechar a sidebar
    document.getElementById('openSidebar').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });
    
    document.getElementById('loginButton').addEventListener('click', () => {
        alert('Login clicado!');
    });
});

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Função principal para buscar e exibir informações do Pokémon
function getPokemon() {
    const pokemonName = document.getElementById('pokemonNameInput').value.toLowerCase();
    
    const pokemonInfo = document.getElementById('pokemonInfo');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    pokemonInfo.style.display = 'none';
    loadingIndicator.style.display = 'block';

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado!');
            }
            return response.json();
        })
        .then(data => {
            const { name, height, weight, types, abilities, stats, sprites } = data;

            const tipos = types.map(type => capitalize(type.type.name)).join(', ');
            const habilidades = abilities.map(ability => capitalize(ability.ability.name)).join(', ');

            pokemonInfo.innerHTML = `
                <h2>${capitalize(name)}</h2>
                <img src="${sprites.front_default}" alt="${name}">
                <p><strong>Altura:</strong> ${height / 10} m</p>
                <p><strong>Peso:</strong> ${weight / 10} kg</p>
                <p><strong>Tipos:</strong> ${tipos}</p>
                <p><strong>Habilidades:</strong> ${habilidades}</p>
                <h3>Estatísticas:</h3>
                <ul>
                    <li><strong>HP:</strong> ${stats[0].base_stat}</li>
                    <li><strong>Ataque:</strong> ${stats[1].base_stat}</li>
                    <li><strong>Defesa:</strong> ${stats[2].base_stat}</li>
                    <li><strong>Ataque Especial:</strong> ${stats[3].base_stat}</li>
                    <li><strong>Defesa Especial:</strong> ${stats[4].base_stat}</li>
                    <li><strong>Velocidade:</strong> ${stats[5].base_stat}</li>
                </ul>
            `;

            loadingIndicator.style.display = 'none';
            pokemonInfo.style.display = 'block';
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
            pokemonInfo.innerHTML = `<p style="color: red;">${error.message}</p>`;
            loadingIndicator.style.display = 'none';
            pokemonInfo.style.display = 'block';
        });
}
