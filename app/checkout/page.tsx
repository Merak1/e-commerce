import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckoutClient from "./CheckoutClient";

const Checkout = async () => {
  const currentUser = await getCurrentUser();
  const email = currentUser?.email;
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <CheckoutClient currentUserEmail={email} />
        </FormWrap>
      </Container>
    </div>
  );
};

export default Checkout;
