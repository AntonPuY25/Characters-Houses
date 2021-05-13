import HousesReducer, {setErrorAC, TypeInitialStateHouses, getStatusAC, getHousesAC} from './housesReducer'

let state: TypeInitialStateHouses

beforeEach(() => {
    state = {
        house: null,
        status: 'free',
        error: ''

    }
})
test('setErrorAC', () => {
    const action = setErrorAC('Some Error')
    const result = HousesReducer(state, action)
    expect(result.error.length > 0).toBe(true)
    expect(result.error).toBe('Some Error')
})
test('getStatusAC', () => {
    const action = getStatusAC('success')
    const result = HousesReducer(state, action)

    expect(result.status).toBe('success')

})

test('getCharactersAC', () => {
    const action = getHousesAC({
            ancestralWeapons: ['testOne'],
            cadetBranches: ['testOne'],
            coatOfArms: 'testOne',
            currentLord: 'Lord of the SandshipLord',
            diedOut: 'No',
            founded: 'string',
            founder: 'string',
            heir: 'string',
            name: 'House Nymeros Martell of Sunspear',
            overlord: 'string',
            region: 'string',
            seats: ['testOne'],
            swornMembers: ['testOne'],
            titles: ['testOne'],
            url: 'string',
            words: 'string',
        }
    )
    const result = HousesReducer(state, action)

    expect(result.house?.name).toBe('House Nymeros Martell of Sunspear')
    expect(result.house?.currentLord).toBe('Lord of the SandshipLord')

})