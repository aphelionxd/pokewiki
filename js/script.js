function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Função principal para buscar e exibir informações do Pokémon
function getPokemon() {
    const pokemonName = document.getElementById('pokemonNameInput').value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            // Verifica se a requisição foi bem-sucedida
            if (!response.ok) {
                throw new Error('Pokémon não encontrado!');
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(data => {
            // Extrai e formata os dados do Pokémon
            const { name, height, weight, types, abilities, stats, sprites } = data;

            // Formata os tipos do Pokémon em uma string legível
            const tipos = types.map(type => capitalize(type.type.name)).join(', ');

            // Formata as habilidades do Pokémon em uma string legível
            const habilidades = abilities.map(ability => capitalize(ability.ability.name)).join(', ');

            // Monta o HTML para exibir as informações do Pokémon
            const pokemonInfo = document.getElementById('pokemonInfo');
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

            // Exibe a animação de explosão da Pokébola
            const pokeball = document.getElementById('pokeball');
            pokeball.style.animation = 'explode 1s forwards';

            // Mostra as informações do Pokémon após a animação
            setTimeout(() => {
                pokemonInfo.style.display = 'block';
                pokeball.style.display = 'none';
            }, 1000);
        })
        .catch(error => {
            // Trata erros na requisição ou processamento dos dados
            console.error('Erro ao buscar dados:', error);
            const pokemonInfo = document.getElementById('pokemonInfo');
            pokemonInfo.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
}
