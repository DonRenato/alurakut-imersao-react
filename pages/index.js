import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations"
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AluraKutCommons"
import { useState } from "react"


function ProfileSideBar(props){
  return(
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
       </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const [communities, setCommunities] = useState([]);
  const githubUser = 'donrenato';
  const favoritos = ['omariosouto', 'juunegreiros', 'peas', 'diego3g', 'marcobrunodev']
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea"style={{gridArea: 'profileArea'}}>
          <ProfileSideBar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
            Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
             <h2 className="subTitle">O que você deseja fazer?</h2>

             <form onSubmit={(e)=>{
               e.preventDefault();
               const data = new FormData(e.target);
               const community = {
                 id: new Date().toISOString,
                 title: data.get('title'),
                 image: data.get('image')
               }
               const updatedCommunites = [...communities, community]
               setCommunities(updatedCommunites);
               }}>
               <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text">
                </input>
               </div>

               <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa">
                </input>
               </div>
               <button>
                 Criar comunidade
               </button>
             </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            Pessoas da comunidade ({favoritos.length})
            </h2>
            <ul>
            {favoritos.map(favorito => (
              <li key={favorito}>
                 <a href={`/users/${favorito}`} key={favorito}>
                  <img src={`https://github.com/${favorito}.png`}  />
                  <span>{favorito}</span>
                </a>
              </li>
            ))}
            </ul>
          </ProfileRelationsBoxWrapper >
       
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            Comunidades ({communities.length})
            </h2>
            <ul>
            {communities.map(community => (
              <li>
                 <a href={`${community.title}`} key={community.id}>
                  <img src={`${community.image}`}  />
                  <span>{community.title}</span>
                </a>
              </li>
            ))}
            </ul>
          </ProfileRelationsBoxWrapper >
        </div>
      </MainGrid>
    </>
  )
}
