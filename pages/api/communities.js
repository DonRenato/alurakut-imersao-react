import { SiteClient }  from 'datocms-client';

export default async function requestReceptor(req, res){
  if(req.method === 'POST'){
    const TOKEN = "fb72047c24e0e95b980e09b0fe05f0"

  const client = new SiteClient(TOKEN)
  const record = await client.items.create({
    itemType: '967688',
    ...req.body
  })

  res.json({
    data: '',
    record: record
  })
  return
  }
  
  res.status(404).json({
    message: "Ainda n temos nada no GET, mas no POST tem!!!"
  })

}