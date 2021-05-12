import axios from "axios";


const instance = axios.create({
    baseURL: 'https://anapioficeandfire.com/api/',

})


export  const Api = {
    getCharacters(page:string){
        return instance.get<TypeCharacter[]>(`characters?page=${page}`).then(response=>{
            return response.data
        })
    },
    getHouses(houseId:string){
        return instance.get<TypeResponseDataHouse>(`houses/${houseId}`).then(response=>{
            return response.data
        })
    }
}

export type TypeCharacter = {
    aliases: string[]
    allegiances: string[]
    books: string[]
    born: string
    culture: string
    died:string
    father: string
    gender: string
    mother:string
    name: string
    playedBy: string[]
    povBooks: string[]
    spouse: string
    titles: string[]
    tvSeries: string[]
    url:string
}
export type TypeResponseDataHouse = {
    ancestralWeapons: string[]
    cadetBranches: string[]
    coatOfArms: string
    currentLord: string
    diedOut:string
    founded: string
    founder:string
    heir: string
    name: string
    overlord: string
    region: string
    seats: string[]
    swornMembers: string[]
    titles: string[]
    url:string
    words:string
}