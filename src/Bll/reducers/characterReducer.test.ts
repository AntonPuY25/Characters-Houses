import CharacterReducer, {
    getCharactersAC,
    getStatusAC,
    setErrorAC,
    TypeInitialStateCharacter
} from "./characterReducer";

let state: TypeInitialStateCharacter

beforeEach(() => {
    state = {
        characters: [],
        error: '',
        status: 'free',

    }
})
test('setErrorAC', () => {
    const action = setErrorAC('Some Error')
    const result = CharacterReducer(state, action)
    expect(result.error.length > 0).toBe(true)
    expect(result.error).toBe('Some Error')
})
test('getStatusAC', () => {
    const action = getStatusAC('success')
    const result = CharacterReducer(state, action)

    expect(result.status).toBe('success')

})

test('getCharactersAC', () => {
    const action = getCharactersAC([{
        aliases:['TestOne'],
        allegiances: ['TestOne'],
        books: ['1','2'],
        born: 'Yes',
        culture: 'American',
        died:'No',
        father: 'BigFather',
        gender: 'Male',
        mother:'GoodMother',
        name: 'Jhon Snow',
        playedBy: ['TestOne'],
        povBooks: ['TestOne'],
        spouse: 'Yes',
        titles: ['TestOne'],
        tvSeries:['TestOne'],
        url:'string'
    },
        {
            aliases:['TestTwo'],
            allegiances: ['TestTwo'],
            books: ['1','2','3'],
            born: 'No',
            culture: 'French',
            died:'Yes',
            father: 'BigFather',
            gender: 'Male',
            mother:'GoodMother',
            name: 'Arnolf Karstark',
            playedBy: ['TestTwo'],
            povBooks: ['TestTwo'],
            spouse: 'Yes',
            titles: ['TestTwo'],
            tvSeries:['TestTwo'],
            url:'string'
        }])
    const result = CharacterReducer(state, action)

    expect(result.characters.length===2).toBe(true)
    expect(result.characters[0].name).toBe('Jhon Snow')
    expect(result.characters[0].titles[0]).toBe('TestOne')
    expect(result.characters[1].name).toBe('Arnolf Karstark')
    expect(result.characters[1].titles[0]).toBe('TestTwo')
})