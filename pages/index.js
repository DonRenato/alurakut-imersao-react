import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations"
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AluraKutCommons"
import { useEffect, useState } from "react"


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

function ProfileRelationsBox(props){
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
      {props.title} ({props.items.length})
    </h2>
    <ul>
            {props.items.slice(0,6).map(item => (
              <li key={item.id}>
                 <a href={item.html_url} >
                  <img src={item.avatar_url}  />
                  <span>{item.login}</span>
                </a>
              </li>
            ))}
            </ul>
    <hr />
    <a className="seemAll" href="" >Ver todos</a>
  </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [communities, setCommunities] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const githubUser = 'donrenato';
  
  

  useEffect(()=>(
    fetch('https://api.github.com/users/donrenato/following')
    .then(async res =>{
      const resp = await res.json();
      setFavorites(resp);
   })
 
  ), [])

  useEffect(()=>(
    fetch('https://api.github.com/users/donrenato/followers')
    .then(async res =>{
       const resp = await res.json();
       setFollowers(resp);
    })
  ), [])

  useEffect(()=>(
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '342fa2e69edc0e28c61563880dc144',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ "query": `query{
        allCommunities{
          title
          id
          image
          creatorSlug
        }
      }`})
    })
    .then ( async res =>{
       const resp = await res.json();
       const community = resp.data.allCommunities;
       setCommunities(community); 
    })
    .then(resp =>{
     
    })
  ), [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
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
                 title: data.get('title'),
                 image: data.get('image'),
                 creatorSlug: githubUser
               }

               fetch('/api/communities', {
                 method: 'POST',
                 headers:{
                  'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(community)
               })
               .then( async (res) =>{
                  const data  = await res.json();
                  const community = data.record;
                  console.log(community)
                  const updatedCommunities = [...communities, community]
                  setCommunities(updatedCommunities);
                })
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
          <ProfileRelationsBox title="Pessoas da comunidade" items={favorites} />
           
          <ProfileRelationsBox title="Seguidores" items={followers} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            Comunidades ({communities.length})
            </h2>
            <ul>
            {communities.slice(0,6).map(community => (
              <li  key={community.id}>
                 <a href={`${community.title}`}>
                  <img src={`${community.image}`}  />
                  <span>{community.title}</span>
                </a>
              </li>
            ))}
            </ul>
            <hr />
            <a className="seemAll" href="" >Ver todos</a>
          </ProfileRelationsBoxWrapper >
         
      
        </div>
      </MainGrid>
    </>
  )
}
