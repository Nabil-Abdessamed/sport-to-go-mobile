import React from "react";
import { useRoute } from "@react-navigation/native";
import { STGContainer } from "stg-ui";
import LikesList from "../session-subscribed-users/List";
import { getLikesUsersService } from "@services";

export default function LikesUsers() {
  const { params } = useRoute();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  const getLikesUsers = async () => {
    setLoading(true);
    const { data, status } = await getLikesUsersService(params.postId);
    setData(status === 200 ? data : []);
    setLoading(false);
  };

  React.useEffect(() => {
    getLikesUsers();
  }, []);

  return (
    <STGContainer loading={loading}>
      <LikesList data={data} />
    </STGContainer>
  );
}
