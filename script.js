(function () {
  document.querySelector("span#ano").textContent = new Date().getFullYear();
  
  fetch("https://api.github.com/users/henrikato").then(data => data.text()).then(data => {
    data = data.replace(/\\r\\n/g, "<br/>");
    
    let { url, name, avatar_url, repos_url, bio, location } = JSON.parse(data);
    
    document.title = name;
    
    document.querySelector("img#avatar").setAttribute("src", avatar_url);
    
    document.querySelector("span#nome").textContent = name;
    
    document.querySelector("p#bio").innerHTML = bio;

    fetch(repos_url).then(data => data.text()).then(data => {
      var raw = JSON.parse(data);
      repos = raw.map(repo => ({
        html_url: repo.html_url,
        name: repo.name,
        description: repo.description || "(Sem descrição)",
        created_at: repo.created_at,
        updated_at: repo.updated_at
      }));
      
      var repoList = repos.map(repo => `
        <div class="projeto">
          <h3>${repo.name}</h3>
          <p>${repo.description}</p>
          <p>Criado em: ${repo.created_at}</p>
          <p>Última atualização: ${repo.updated_at}</p>
          <p class="repo-url"><a href="${repo.html_url}" target="_blank"><i class="fa-fw fab fa-github"></i> Acessar</a></p>
        </div>
      `);
      repoList = repoList.join('');
      
      document.querySelector("div#lista-projetos").innerHTML = repoList;
      
    })
  })
}())