import axios from "axios";


const instance = axios.create({
    baseURL: 'https://anapioficeandfire.com/api/',

})


export  const Api = {
    getCharacters(){
        return instance.get<TypeCharacter[]>('characters?page=59').then(response=>{
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
