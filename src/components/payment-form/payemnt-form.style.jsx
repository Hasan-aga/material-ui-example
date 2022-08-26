import styled from "styled-components";
import { SpinnerContainer } from "../spinner/spinner.styles";

export const SmallSpinner = styled(SpinnerContainer)`
  width: 10px;
  height: 10px;
  padding: 10px;
  margin: 0 auto;
`;

export const PaymentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
`;

export const FormContainer = styled.form`
  min-width: 500px;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  margin-bottom: 30px;
`;
