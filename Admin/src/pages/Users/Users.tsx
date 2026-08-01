import "./Users.css";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    ChevronDown,
    Search,
    Trash2,
    UserRound,
} from "lucide-react";

import {
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

import { db } from "../../services/firebase";

import { DeleteUserModal } from "../../components/DeleteUserModal/DeleteUserModal";
import { deleteUser } from "../../services/api";

interface User {

    id: string;

    fullName: string;

    email: string;

    phone: string;

    cpf: string;

    role: string;

    createdAt?: any;

}

export function Users() {

    const [users, setUsers] =
        useState<User[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [orderFilter, setOrderFilter] =
        useState("recent");

    const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    const [deleteLoading, setDeleteLoading] =
        useState(false);

    useEffect(() => {

        const unsubscribe =
            onSnapshot(

                query(

                    collection(
                        db,
                        "users"
                    ),

                    where(
                        "role",
                        "==",
                        "user"
                    )

                ),

                (snapshot) => {

                    const data =
                        snapshot.docs.map(doc => ({

                            id: doc.id,

                            ...doc.data(),

                        })) as User[];

                    setUsers(data);

                    setLoading(false);

                },

                (error) => {

                    console.error(error);

                    setLoading(false);

                }

            );

        return () => {

            unsubscribe();

        };

    }, []);

    const filteredUsers =
        useMemo(() => {

            let data =
                users.filter(user =>

                    user.fullName
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )

                    ||

                    user.email
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )

                );

            if (
                orderFilter === "old"
            ) {

                data = [...data].reverse();

            }

            return data;

        }, [

            users,

            search,

            orderFilter,

        ]);

        async function handleDelete() {

            if (!selectedUser) {

                return;

            }

            try {

                setDeleteLoading(true);

                await deleteUser(selectedUser.id);

                setDeleteModalOpen(false);

                setSelectedUser(null);

            } catch (error) {

                console.error(error);

            } finally {

                setDeleteLoading(false);

            }

        }

    return (

        <section className="users">

            <div className="users-header">

                <div>

                    <h1>

                        Usuários

                    </h1>

                    <p>

                        Gerencie todos os usuários cadastrados na plataforma.

                    </p>

                </div>

            </div>

            <div className="users-filters">

                <div className="users-search">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Pesquisar usuário..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="users-filter">

                    <select
                        value={orderFilter}
                        onChange={(e) =>
                            setOrderFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="recent">

                            Mais recentes

                        </option>

                        <option value="old">

                            Mais antigos

                        </option>

                    </select>

                    <ChevronDown size={18} />

                </div>

            </div>

            <div className="users-list">

                {loading && (

                    <p>

                        Carregando usuários...

                    </p>

                )}

                {!loading &&
                    filteredUsers.length === 0 && (

                    <div className="users-empty">

                        <UserRound size={44} />

                        <h3>

                            Nenhum usuário encontrado

                        </h3>

                        <p>

                            Não existem usuários cadastrados no momento.

                        </p>

                    </div>

                )}

                {!loading &&

                    filteredUsers.map(user => (

                        <div
                            key={user.id}
                            className="user-card"
                        >

                            <div className="user-top">

                                <div className="user-info">

                                    <div className="user-avatar">

                                        <UserRound size={28} />

                                    </div>

                                    <div>

                                        <h2>

                                            {user.fullName}

                                        </h2>

                                        <p>

                                            {user.email}

                                        </p>

                                    </div>

                                </div>

                                <button

                                className="user-delete"

                                onClick={() => {

                                    setSelectedUser(user);

                                    setDeleteModalOpen(true);

                                }}

                            >

                                <Trash2 size={18} />

                            </button>

                            </div>

                            <div className="user-bottom">

                                <div>

                                    <span>

                                        Telefone

                                    </span>

                                    <strong>

                                        {user.phone}

                                    </strong>

                                </div>

                                <div>

                                    <span>

                                        CPF

                                    </span>

                                    <strong>

                                        {user.cpf}

                                    </strong>

                                </div>

                                <div>

                                    <span>

                                        Cadastro

                                    </span>

                                    <strong>

                                        {user.createdAt
                                            ?.toDate()
                                            .toLocaleDateString(
                                                "pt-BR"
                                            ) || "-"}

                                    </strong>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>


            <DeleteUserModal

            open={deleteModalOpen}

            loading={deleteLoading}

            userName={selectedUser?.fullName}

            onCancel={() => {

                setDeleteModalOpen(false);

                setSelectedUser(null);

            }}

            onConfirm={handleDelete}

        />

        </section>

    );

}