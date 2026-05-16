/**
 * 权限统一入口
 * 所有后台判断都从这里走
 */

export type UserRole =
  | "member"
  | "moderator"
  | "admin"
  | "banned";

export function canAccessAdmin(
  role?: string
) {
  return (
    role==="admin" ||
    role==="moderator"
  );
}

export function isBanned(
 role?:string
){

return role==="banned"

}