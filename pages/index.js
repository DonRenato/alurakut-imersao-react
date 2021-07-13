import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations"
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AluraKutCommons"


function ProfileSideBar(props){
  return(
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}} />
    </Box>
  )
}

export default function Home() {
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
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            Pessoas da comunidade ({favoritos.length})
            </h2>
            <ul>
            {favoritos.map(favorito => (
              <li>
                 <a href={`/users/${favorito}`} key={favorito}>
                  <img src={`https://github.com/${favorito}.png`}  />
                  <span>{favorito}</span>
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
