import {gql, useQuery, useReactiveVar} from "@apollo/client";
import {isLoggedInVar, logUserOut} from "../apollo";
import {useEffect} from "react";

const ME_QUERY = gql`
  query me{
    me {
      username
      avatar
    }
  }
`

function useUser() {
  const isHasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !isHasToken
  })
  useEffect(() => {
    if (data?.me !== null) {
      logUserOut();
    }
  }, [data]);
  return data;
}

export default useUser