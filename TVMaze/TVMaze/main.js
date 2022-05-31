window.onload = ()=>{

  const popup = document.querySelector(".pop")
  popup.addEventListener("click", () => {
    popup.style.display = "none"
  })
  const body = document.querySelector("main")
  
  function Create(data){
    body.innerHTML = ""
    for(let i = 0; i < data.length; i++){
      let DIV = document.createElement("div")

      //Add name title
      let title = document.createElement("h2")
      title.innerText = data[i].show.name
      DIV.append(title)

      //Add image
      let IMG = document.createElement("img")
      try{
        IMG.setAttribute("src", data[i].show.image.medium)
      }
      catch(e){
        IMG.setAttribute("src", "https://demofree.sirv.com/nope-not-here.jpg")
      }
      DIV.append(IMG)

      //Add descripition
      let P_text = document.createElement("p")
      P_text.innerHTML = data[i].show.summary
      DIV.append(P_text)

      DIV.addEventListener("click", () => {
        let id = data[i].show.id
        $.ajax({
          url: "https://api.tvmaze.com/shows/"+id+"/episodes",
          type: "get",
          success: (data) => {
            popup.innerText = ""
            for (var i in data) {
              let div = document.createElement("div")

              let season = document.createElement("h2")
              season.innerText = "Temporada: "+data[i].season
              div.append(season)

              let number = document.createElement("h3")
              number.innerText = "Episodio: "+data[i].number
              div.append(number)
              

              let nome = document.createElement("h4") 
              nome.innerText = "Nome: "+data[i].name
              div.append(nome)
              
              let imagem = document.createElement("img")
              try{
                imagem.setAttribute("src", data[i].image.medium)
              }
              catch(e){
                imagem.setAttribute("src", "https://demofree.sirv.com/nope-not-here.jpg")
              }
              div.append(imagem)

              let summary = document.createElement("h5")
              summary.innerHTML = data[i].summary
              div.append(summary)
              

              let dataep = document.createElement("p")
              dataep.innerText = "Postado em: " + data[i].airdate + " as " + data[i].airtime
              div.append(dataep)

              let url = document.createElement("a")
              let p = document.createElement("p")
              p.innerText = "ASSISTIR"
              url.setAttribute("href",data[i].url)
              url.append(p)
              div.append(url)
              
              div.append(document.createElement("hr"))
              
              popup.append(div)
            }
            popup.style.display = "inline-block";
          }
        })
      })

      //Add these to body
      body.append(DIV)
    }
  }

  function getMovies(name){
    $.ajax({
      url: `https://api.tvmaze.com/search/shows?q=${name}`,
      type: "get",
      success: Create,
    })
  }

  const form = document.querySelector("form")
  form.addEventListener("submit", (e)=>{
    e.preventDefault()
  })

  const input = document.querySelector("input")
  input.addEventListener("keyup", ()=>{
    getMovies(input.value)
  })
}


