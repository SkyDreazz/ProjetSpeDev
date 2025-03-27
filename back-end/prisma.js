import fs from "fs"
const data = JSON.parse(fs.readFileSync('./data/rarity.json', 'utf8'));
const metadata = JSON.parse(fs.readFileSync('./data/metadatas.json', 'utf8'));
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const newData = [];


// for (const [key, value] of Object.entries(data)) {
//     const attribute = {trait_type:key,}
//     value.forEach((att)=>{
//         newData.push({...attribute,value: att.trait_type,rarity: parseInt(att.rarity, 10)})
//     })
//   }

// metadata.forEach((
//     card) => {
//         const newImageUrl = `https://ipfs.io/ipfs/${card.image.split("//")[1]}`
//     const newCard = { token_id: card.token_id, name: card.name, description: card.description, image: newImageUrl }
//     newData.push(newCard)
// })


// async function linkAttrToCard() {
//   try {
//     const attributInBDD = await prisma.attribut.findMany();

//     if (!attributInBDD) {
//       throw new Error("ERROR_GET_ATTRIBUTES");
//     }
//     for (const card of metadata) {
//       const { attributes } = card;
//       const updateAttr = [];

//       attributes.forEach((att) => {
//         const findAttr = attributInBDD.find(
//           (attribut) =>
//             attribut.trait_type === att.trait_type &&
//             attribut.value === att.value
//         );

//         if (findAttr) {
//           updateAttr.push(findAttr.id);
//         }
//       });

//       const update = await prisma.card.update({
//         where: { token_id: card.token_id },
//         data: {
//           attributes: {
//             connect: updateAttr.map((id) => ({
//               id,
//             })),
//           },
//         },
//       });

//       if (!update) {
//         throw new Error("ERR_UPDATE_LINK");
//       }
//       console.log(`Création du lien en BDD pour la carte ${card.name}`);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// linkAttrToCard();

// async function getCard(id) {
//   try {
//     const card = await prisma.card.findFirst({
//       where: { id },
//       select: {
//         name: true,
//         token_id: true,
//         attributes: {
//           select: {
//             trait_type: true,
//             value: true,
//             rarity: true,
//           },
//         },
//       },
//     });

//     if (!card) {
//       console.log("aucune carte");
//     }

//     console.log("La carte", JSON.stringify(card, null, 2));
//   } catch (error) {
//     console.error(error);
//   }
// }

// getCard(200);

// try {
//     const newAttributs = await prisma.attribut.createMany({
//         data: newData
//     })
// } catch (error) {
//     console.log(error)
// }
