import { UserInterface } from "@/types/User";
import { toPersianNumbers } from "@/utils/numConvertor";
import { ListItem } from "@mui/material";
import React from "react";
import Custom_list from "../ui/Custom_list";
import { StylesTypo } from "@/styles/Typo";

const UsersList = ({ allUsers }: { allUsers: UserInterface[] | null }) => {
  return (
    <div className="min-w-full max-w-full bg-secondary-800 rounded-[5px] drop-shadow-2xl min-h-full">
      <Custom_list
        bgcolor="inherit"
        title="لیست کاربران"
        classname="min-w-full"
        callToAction={{
          link: "/admin/users",
          text: "مشاهده همه",
        }}
      >
        {allUsers?.map((user) => {
          return <UserListItem user={user} key={user._id} />;
        })}
      </Custom_list>
    </div>
  );
};

export default UsersList;

export const UserListItem = ({ user }: { user: UserInterface }) => {
  return (
    <ListItem
      sx={{
        minWidth: "100%",
        maxWidth: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        fontSize: ".8rem",
      }}
    >
      <div className="min-w-fit flex items-center justify-start gap-2">
        <StylesTypo
          sx={{
            minWidth: "250px",
            maxWidth: "250px",
            textAlign: "start",
            paddingInline: "5px",
            overflow: "hidden",
          }}
          variant="subtitle2"
        >
          {user.name}
        </StylesTypo>
        {user.name.toUpperCase() !== user.email.toUpperCase() && (
          <StylesTypo
            sx={{
              maxWidth: "100px",
              minWidth: "100px",
              textAlign: "start",
              display: { xs: "none", md: "block" },
            }}
            variant="subtitle2"
          >
            {user.email}
          </StylesTypo>
        )}
      </div>
      <StylesTypo
        className="max-w-fit max-h-fit rounded-lg drop-shadow-2xl px-2 py-1"
        sx={{
          background:
            user.role === "ADMIN"
              ? "rgb(var(--color-primary-900))"
              : "rgb(var(--color-secondary-900))",
        }}
        variant="subtitle2"
      >
        {user.role === "ADMIN" ? "ادمین" : "کاربر"}
      </StylesTypo>
    </ListItem>
  );
};
