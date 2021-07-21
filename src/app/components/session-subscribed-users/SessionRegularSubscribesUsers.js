import React from "react";
import { useRoute } from "@react-navigation/native";
import { STGContainer } from "stg-ui";
import SessionSubscribedUsers from "./List";
import { SessionRegularService } from "../../services";

export default function SessionRegularSubscribesUsers() {
  const { params } = useRoute();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  const getSessionsRegularSubscribedUsers = async () => {
    setLoading(true);
    const {
      data,
      status,
    } = await SessionRegularService.getSessionsRegularSubscribedUsersService(
      params.sessionId
    );
    setData(status === 200 ? data : []);
    setLoading(false);
  };

  React.useEffect(() => {
    getSessionsRegularSubscribedUsers();
  }, []);

  return (
    <STGContainer loading={loading}>
      <SessionSubscribedUsers data={data} />
    </STGContainer>
  );
}
