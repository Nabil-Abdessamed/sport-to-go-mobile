import React from "react";
import { useRoute } from "@react-navigation/native";
import { STGContainer } from "stg-ui";
import SessionSubscribedUsers from "./List";
import { SessionUniqueService } from "../../services";

export default function SessionUniqueSubscribesUsers() {
  const { params } = useRoute();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  const getSessionsUniqueSubscribedUsers = async () => {
    setLoading(true);
    const {
      data,
      status,
    } = await SessionUniqueService.getSessionsUniqueSubscribedUsersService(
      params.sessionId
    );
    setData(status === 200 ? data : []);
    setLoading(false);
  };

  React.useEffect(() => {
    getSessionsUniqueSubscribedUsers();
  }, []);

  return (
    <STGContainer loading={loading}>
      <SessionSubscribedUsers data={data} />
    </STGContainer>
  );
}
