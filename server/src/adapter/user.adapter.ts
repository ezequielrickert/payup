// import {prisma} from "./client";
// import {User} from "@prisma/client";
// import {User as DomainUser } from "../domain/entity/User";
//
// export class UserAdapter {
//     static toDomain(user: User): DomainUser {
//         return new DomainUser(
//             user.id,
//             user.name,
//             user.email,
//             user.role as 'admin' | 'user',
//             user.createdAt,
//         );
//     }
//
//     static toPrisma(user: DomainUser): User {
//         return {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             createdAt: user.createdAt,
//         };
//     }
// }
//
