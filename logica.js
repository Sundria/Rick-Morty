let paginaAtual = 1;
let totalPaginas = 1;

function carregarPersonagens(pagina) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`)
        .then(res => res.json())
        .then(data => {
            const showcase = document.querySelector('.showcase')
            showcase.innerHTML = "";

            console.log(data.results)

            document.querySelector('.sobre .personagens').innerHTML = `PERSONAGENS: ${data.info.count}`

            data.results.map(personagem => {

                showcase.innerHTML += `
        <article class="cartao-personagem"> 

            <div class="imagem-single">
                <img src="${personagem.image}" alt="">
            </div>

            <div class="conteudo-personagem">
                <div class="section">
                    <h1>${personagem.name}</h1>
                    <span class="status">
                    <span class="status-icon ${personagem.status.toLowerCase()}"></span>
                    ${personagem.status}
                    </span>
                </div>

                <div class="section">
                    <span class="cor-cinza">Last known location:</span>
                    <h2>${personagem.location.name}</h2>
                </div>

                <div class="section">
                    <span class="cor-cinza">Specie:</span>
                    <h2>${personagem.species}</h2>
                </div>
            </div>

        </article>`

            });

            totalPaginas = data.info.pages;

            document.getElementById('pagina').innerHTML = `${paginaAtual} de ${totalPaginas}`
            document.getElementById('anterior').disabled = paginaAtual === 1;
            document.getElementById('proximo').disabled = paginaAtual === totalPaginas;

        })
}

document.getElementById('anterior').addEventListener('click', () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        carregarPersonagens(paginaAtual);
    }
});

document.getElementById('proximo').addEventListener('click', () => {
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        carregarPersonagens(paginaAtual);
    }
});

carregarPersonagens(paginaAtual)
