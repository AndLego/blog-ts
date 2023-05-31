import React from 'react';
import { Role } from '../@types/blog';
import { useAPI } from '../utils/blogAPI';

const defaultRoles: Role[] = [
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

const Register: React.FC = () => {
    const roles: Role[] = defaultRoles
    const userRef = React.useRef<HTMLInputElement>(null);
    const [showDetails, setShowDetails] = React.useState<Role | null>(roles[0])

    // const { registerUser } = useAuth()
    const { registerUser } = useAPI()

    const handleDetails = (currentRol: string) => {
        const currentDetails = roles.find(role => role.name === currentRol)
        setShowDetails(currentDetails || null)
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newUser = {
            username: userRef.current?.value || "",
            rol: showDetails || roles[0],
            posts: []
        }

        registerUser(newUser)
    };

    return (
        <section className="LogIn">
            <h1>Register</h1>

            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        ref={userRef}
                        type="text"
                        id="username"
                        name="username"
                        required
                        minLength={3}
                    />
                </div>

                <div>
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={showDetails?.name || ""}
                        onChange={(e) => handleDetails(e.target.value)}
                        required
                    >
                        {roles.map((role, i) => (
                            <option key={i} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Create</button>
            </form>

            <h5>{showDetails?.name}</h5>
            <ul>
                <li className={`${showDetails?.permissions.delete ? "green" : "red"}`}>
                    {showDetails?.permissions.delete ? "Can" : "Cant"} delete posts.
                </li>
                <li className={`${showDetails?.permissions.write ? "green" : "red"}`}>
                    {showDetails?.permissions.write ? "Can" : "Cant"} edit and write new posts.
                </li>
                <li className={`${showDetails?.permissions.read ? "green" : "red"}`}>
                    {showDetails?.permissions.read ? "Can" : "Cant"} read and comment posts.
                </li>
            </ul>

        </section>
    );
}

export default Register;