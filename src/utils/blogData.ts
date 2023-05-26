import { Blog, Role, User } from "../@types/blog";

export const blogData: Blog[] = [
    {
        title: "¿Que es React?",
        slug: "que-es-react",
        content: "React es el mejor Framework de JavaScript, que lindo React",
        author: "Andres",
        id: 1,
        published: new Date(1998, 11, 17).toLocaleDateString(),
        comments: [],
    },
    {
        title: "¿Que es Angular?",
        slug: "que-es-angular",
        content: "Angular esta bien, que lindo React XD",
        author: "Andres",
        id: 2,
        published: new Date(1995, 11, 17).toLocaleDateString(),
        comments: [],
    },
    {
        title: "¿Que es Svelte?",
        slug: "que-es-svelte",
        content: "Svelte es el mejor Framework de JavaScript, que lindo Svelte",
        author: "Felipe Rodríguez",
        id: 3,
        published: new Date(1996, 11, 17).toLocaleDateString(),
        comments: [],
    },
];

export const defaultRoles: Role[] = [
    {
        name: "admin",
        permissions: {
            write: true,
            read: true,
            delete: true,
        },
    },
    {
        name: "editor",
        permissions: {
            write: true,
            read: true,
            delete: false,
        },
    },
    {
        name: "visitor",
        permissions: {
            write: false,
            read: true,
            delete: false,
        },
    },
];

// export const blogUsers: User[] = [
//     {
//         username: "Andres",
//         rol: defaultRoles[0],
//         id: 1
//     },
//     {
//         username: "Felipe",
//         rol: defaultRoles[1],
//         id: 2
//     },
// ];