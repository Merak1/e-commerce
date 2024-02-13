import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import Categories from "../components/nav/Categories";

const categories = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <Categories />
    </Container>
  );
};

export default categories;
