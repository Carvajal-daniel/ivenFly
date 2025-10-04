export const validateCpf = (cpf: string) => cpf.replace(/\D/g, "").length === 11;

export const validatePhone = (phone: string) => {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 10 && cleaned.length <= 11;
};

export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
