import { api } from "../api";

export const CheckoutReservation = async (payload) => {
  try {
    const res = await api.post("Payments/checkout", payload);
    const redirectUrl = res.data;
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }

    console.log(res);
  } catch (error) {
    console.error("Erro ao criar checkout:", error);
    throw error;
  }
};
