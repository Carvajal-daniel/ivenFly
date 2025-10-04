export const formatCpf = (value: string) => {
  let cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 11) {
    cleaned = cleaned.replace(/(\d{3})(\d)/, "$1.$2");
    cleaned = cleaned.replace(/(\d{3})(\d)/, "$1.$2");
    cleaned = cleaned.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return cleaned;
};

export const formatPhone = (value: string) => {
  let cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 11) {
    cleaned = cleaned.replace(/^(\d{2})(\d)/, "($1) $2");
    cleaned = cleaned.replace(/(\d{4,5})(\d)/, "$1-$2");
  }
  return cleaned;
};
