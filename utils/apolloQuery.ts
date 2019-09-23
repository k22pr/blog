import Apollo from "./apollo";

export default class ApolloQuery {
  public static async Query(model: any) {
    return await Apollo.query(model)
      .then((res) => res.data)
      .catch((err) => err);
  }
}
