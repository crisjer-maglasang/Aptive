import { UserActionButton } from "@/components/common";
import React from "react";

const Actions = ({ onActionCompleted, userId }) => (
  <UserActionButton onActionCompleted={onActionCompleted} userId={userId} className="mt-2" type="restore" />
)

export default Actions
