import { Action, ExtendedUser, User } from "../@types/blog"
import { defaultRoles } from "../utils/blogData"


/**actiontypes checker */


export const actionType = {
    CREATE_USER: "CREATE_USER",
    ADD_POST: "ADD_POST",
    REMOVE_POST: "REMOVE_POST",
    ADD_COMMENT: "ADD_COMMENT",
    REMOVE_COMMENT: "REMOVE_COMMENT"
}

export const initialState: ExtendedUser[] = [
    {
        username: "Andres",
        rol: defaultRoles[0],
        id: 1,
        posts: [
            {
                id: 1,
                slug: "que-es-react"
            },
            {
                id: 2,
                slug: "que-es-angular"
            }
        ]
    }
]

export const userDataReducer = (state: ExtendedUser[], action: Action) => {
    switch (action.type) {
        case actionType.CREATE_USER:
            if (!action.payload) return state;

            console.log("payload", [...state, action.payload])
            return [...state, action.payload]

        case actionType.ADD_POST:
            


        default:
            return state
    }
}

