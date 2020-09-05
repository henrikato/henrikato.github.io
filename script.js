(function () {
  document.querySelector("span#ano").textContent = new Date().getFullYear();
  
  var btnTema = document.querySelector("button#btn-tema");
  btnTema.addEventListener("click", () => getTema())
  
  function getTema() {
    var tema = localStorage.getItem("theme") || "light";
    changeTema(tema);
  }
  
  function changeTema(tema) {
    var icone = btnTema.children.item(0);
    
    var css = document.querySelector("link#current-theme");
    var atual = css.getAttribute("href").split('.')[0];
    
    switch(atual){
      case "light":
        icone.classList.remove("fa-moon");
        icone.classList.add("fa-sun");
        css.setAttribute("href", "dark.css");
        break;
        
      case "dark":
          default:
        icone.classList.remove("fa-sun");
        icone.classList.add("fa-moon");
        css.setAttribute("href", "light.css");
        break;
    }
    
    localStorage.setItem("theme", tema);
  }
  
  fetch("https://api.github.com/users/henrikato").then(data => data.text()).then(data => {
    getTema();
    data = data.replace(/\\r\\n/g, "<br/>");
    
    let { url, name, avatar_url, repos_url, bio, location } = JSON.parse(data);
    
    document.title = name;
    
    document.querySelector("img#avatar").setAttribute("src", avatar_url);
    
    document.querySelector("span#nome").textContent = name;
    
    document.querySelector("p#bio").innerHTML = bio;

    fetch(repos_url).then(data => data.text()).then(data => {
      var raw = JSON.parse(data);
      
      var repoList = raw.map(({name, description, created_at, updated_at, homepage, html_url}) => {
        created_at = moment(created_at).format("DD/MM/YYYY");
        updated_at = moment(updated_at).format("DD/MM/YYYY");
          return `
            <div class="projeto">
              <h3>${name}</h3>
              <p>${description}</p>
              <p>Criado em: ${created_at}</p>
              <p>Última atualização: ${updated_at}</p>
              <p class="repo-url">
                <a href="${homepage || html_url}" target="_blank">
                    <i class="fa-fw fab fa-github"></i> Acessar
                </a>
              </p>
            </div>
          `
      });
      repoList = repoList.join('');
      
      document.querySelector("div#lista-projetos").innerHTML = repoList;
      
    })
  })
}())