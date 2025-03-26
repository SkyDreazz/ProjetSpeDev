import fs from "fs"
const data = JSON.parse(fs.readFileSync('./data/rarity.json', 'utf8'));
const metadata = JSON.parse(fs.readFileSync('./data/metadatas.json', 'utf8'));
import { PrismaClient } from '@prisma/client' 
const prisma = new PrismaClient()

const newData = [];


// for (const [key, value] of Object.entries(data)) {
//     const attribute = {trait_type:key,}
//     value.forEach((att)=>{
//         newData.push({...attribute,value: atnotrait_type,rarity: parseInt(att.rarity, 10)})
//     })
//   }

  metadata.forEach((
    card)=>{
        const newCard = {token_id: card.token_id, name: card.name, description: card.description, image: card.image}
    })

  try {
    const newAttributs = await prisma.attribut.createMany({
        data:newData
    })
  } catch (error) {
    console.log(error)
  }
